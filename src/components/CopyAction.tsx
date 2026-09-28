import { useEffect, useRef, useState } from 'react';

type Props = {
  email: string;
  label: string;
  pendingLabel: string;
  copiedMessage: string;
  errorMessage: string;
};

type CopyState = 'idle' | 'pending' | 'copied' | 'error';
const FEEDBACK_RESET_DELAY_MS = 8_000;

function copyWithLegacyApi(value: string): boolean {
  const previousFocus = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  try {
    const execCommand = (document as unknown as { execCommand: (command: string) => boolean }).execCommand;
    return execCommand.call(document, 'copy');
  } finally {
    textarea.remove();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus({ preventScroll: true });
    }
  }
}

export default function CopyAction({ email, label, pendingLabel, copiedMessage, errorMessage }: Props) {
  const [state, setState] = useState<CopyState>('idle');
  const copyInProgress = useRef(false);

  useEffect(() => {
    if (state !== 'copied' && state !== 'error') return;
    const timeout = window.setTimeout(() => setState('idle'), FEEDBACK_RESET_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [state]);

  async function handleCopy() {
    if (copyInProgress.current) return;
    copyInProgress.current = true;
    setState('pending');
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          setState('copied');
          return;
        } catch {
          // Use the legacy API once when the preferred API rejects the request.
        }
      }
      if (!copyWithLegacyApi(email)) throw new Error('Clipboard copy was rejected');
      setState('copied');
    } catch {
      setState('error');
    } finally {
      copyInProgress.current = false;
    }
  }

  const feedback = state === 'copied' ? copiedMessage : state === 'error' ? errorMessage : '';

  return (
    <div className="copy-action">
      <button className="button button-secondary" type="button" onClick={handleCopy} aria-disabled={state === 'pending'}>
        {state === 'pending' ? pendingLabel : label}
      </button>
      <span className="copy-action-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback}
      </span>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export interface CaseStudyContentsItem {
  id: string;
  text: string;
  depth: number;
  kind: 'section' | 'markdown';
}

interface Props {
  lang: 'es' | 'en';
  title: string;
  triggerLabel: string;
  items: CaseStudyContentsItem[];
}

function ContentsLinks({
  items,
  activeId,
  onSelect,
}: {
  items: CaseStudyContentsItem[];
  activeId: string;
  onSelect?: (item: CaseStudyContentsItem) => void;
}) {
  return (
    <ol className="case-study-contents-list">
      {items.map((item) => (
        <li key={item.id} data-depth={item.depth}>
          <a
            href={`#${encodeURIComponent(item.id)}`}
            aria-current={activeId === item.id ? 'location' : undefined}
            onClick={() => onSelect?.(item)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudyContents({ lang, title, triggerLabel, items }: Props) {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selectedTargetRef = useRef<HTMLElement | null>(null);
  const label = lang === 'es' ? 'Índice del caso' : 'Case study contents';
  const description = lang === 'es'
    ? 'Enlaces a las secciones de este caso de estudio.'
    : 'Links to sections in this case study.';
  const closeLabel = lang === 'es' ? 'Cerrar contenido' : 'Close contents';

  useEffect(() => {
    setEnhanced(true);
  }, []);

  useEffect(() => {
    if (open) return;
    const target = selectedTargetRef.current;
    if (!target) return;

    let frame = 0;
    const restoreSelectedTargetFocus = () => {
      const popup = document.querySelector('.case-study-contents-sheet');
      if (!target.isConnected || (popup && !popup.hasAttribute('hidden')) || target.closest('[inert], [aria-hidden="true"]')) {
        frame = requestAnimationFrame(restoreSelectedTargetFocus);
        return;
      }
      // Native anchors can execute while the Sheet still holds scroll lock.
      // Position the heading after the Sheet exits, using the same offset as
      // CSS scroll-padding. An explicit scroll also avoids a browser restoring
      // the pre-dialog position after the focus handoff.
      const scrollPadding = Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
      const scrollTop = window.scrollY + target.getBoundingClientRect().top - scrollPadding;
      window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'instant' });
      target.focus({ preventScroll: true });
      if (document.activeElement === target) {
        setActiveId(target.id);
        selectedTargetRef.current = null;
      }
      else frame = requestAnimationFrame(restoreSelectedTargetFocus);
    };
    frame = requestAnimationFrame(restoreSelectedTargetFocus);

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => target instanceof HTMLElement);
    if (targets.length === 0) return;

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerBottom = Math.max(0, document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0);
        // Track the section under the reader's upper-quarter focus line, not just
        // headings that have already passed the sticky header. This keeps the
        // highlight aligned when a new heading is prominent but still below it.
        // Never position the reading line above the browser's native anchor
        // landing point. In short mobile viewports the 25% rule can otherwise
        // equal scroll-padding exactly and rounding can reselect the prior item.
        const rootPadding = Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
        const boundary = Math.max(
          headerBottom + 56,
          rootPadding + 12,
          Math.min(window.innerHeight * 0.25, headerBottom + 160),
        );
        const scrollingElement = document.scrollingElement ?? document.documentElement;
        const atDocumentEnd = scrollingElement.scrollTop + scrollingElement.clientHeight
          >= scrollingElement.scrollHeight - 3;
        if (atDocumentEnd) {
          setActiveId(targets[targets.length - 1].id);
          return;
        }
        const preceding = [...targets].reverse().find((target) => target.getBoundingClientRect().top <= boundary);
        setActiveId(preceding?.id ?? targets[0].id);
      });
    };
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(updateActive, {
          rootMargin: '0px 0px -75% 0px',
          threshold: [0, 1],
        });
    targets.forEach((target) => observer?.observe(target));
    // Browser layout can settle after responsive changes or a modal releases
    // scroll locking. Recheck on scroll completion and document size changes.
    const sizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updateActive);
    sizeObserver?.observe(document.documentElement);
    window.addEventListener('scroll', updateActive, { passive: true });
    document.addEventListener('scrollend', updateActive);
    window.addEventListener('resize', updateActive);
    window.addEventListener('hashchange', updateActive);
    window.addEventListener('popstate', updateActive);
    updateActive();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      sizeObserver?.disconnect();
      window.removeEventListener('scroll', updateActive);
      document.removeEventListener('scrollend', updateActive);
      window.removeEventListener('resize', updateActive);
      window.removeEventListener('hashchange', updateActive);
      window.removeEventListener('popstate', updateActive);
    };
  }, [items]);

  const finalFocus = useCallback(() => selectedTargetRef.current ?? triggerRef.current, []);
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };
  const selectItem = (item: CaseStudyContentsItem) => {
    // Keep the chosen entry selected during Sheet close and native anchor navigation.
    setActiveId(item.id);
    const target = document.getElementById(item.id);
    if (target) {
      target.setAttribute('tabindex', '-1');
      selectedTargetRef.current = target;
    }
    setOpen(false);
  };

  return (
    <aside
      className="case-study-contents"
      data-contents-enhanced={enhanced ? 'true' : 'false'}
    >
      <div className="case-study-contents-desktop" role="navigation" aria-label={label}>
        <p className="case-study-contents-heading">{title}</p>
        <ContentsLinks items={items} activeId={activeId} onSelect={(item) => setActiveId(item.id)} />
      </div>

      <details className="case-study-contents-fallback">
        <summary>{triggerLabel}</summary>
        <div role="navigation" aria-label={label}>
          <ContentsLinks items={items} activeId="" />
        </div>
      </details>

      <div className="case-study-contents-mobile">
        <Sheet
          open={open}
          onOpenChange={handleOpenChange}
        >
          <SheetTrigger
            ref={triggerRef}
            className="button button-secondary case-study-contents-trigger"
            aria-expanded={open}
          >
            <span aria-hidden="true">☷</span>
            <span>{triggerLabel}</span>
          </SheetTrigger>
          <SheetContent
            className="case-study-contents-sheet"
            side="right"
            initialFocus={closeRef}
            finalFocus={finalFocus}
          >
            <SheetHeader className="case-study-contents-sheet-header">
              <div>
                <SheetTitle className="case-study-contents-sheet-title">{title}</SheetTitle>
                <SheetDescription className="case-study-contents-sheet-description">
                  {description}
                </SheetDescription>
              </div>
              <SheetClose ref={closeRef} className="mobile-nav-close" aria-label={closeLabel}>
                <span aria-hidden="true">×</span>
              </SheetClose>
            </SheetHeader>
            <div role="navigation" aria-label={label}>
              <ContentsLinks items={items} activeId={activeId} onSelect={selectItem} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </aside>
  );
}

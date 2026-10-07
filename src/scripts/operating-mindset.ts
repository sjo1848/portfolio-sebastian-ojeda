const root = document.querySelector<HTMLElement>('[data-operating-mindset]');

if (root) {
  const triggers = [...root.querySelectorAll<HTMLButtonElement>('[data-mindset-trigger]')];
  const label = root.querySelector<HTMLElement>('[data-mindset-label]');
  const copy = root.querySelector<HTMLElement>('[data-mindset-copy]');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

  const items = triggers.map((trigger, index) => {
    const fallback = root.querySelector<HTMLElement>(`#operating-mindset-detail-${index + 1}`);
    return {
      label: trigger.textContent?.trim().replace(/\.$/, '') ?? '',
      description: fallback?.querySelector('p')?.textContent?.trim() ?? '',
    };
  });

  const activate = (index: number) => {
    const item = items[index];
    if (!item || !label || !copy) return;

    triggers.forEach((trigger, triggerIndex) => {
      trigger.setAttribute('aria-selected', triggerIndex === index ? 'true' : 'false');
    });

    label.textContent = item.label;
    copy.textContent = item.description;
  };

  root.dataset.mindsetEnhanced = 'true';
  activate(0);

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => activate(index));
    trigger.addEventListener('focus', () => activate(index));
    trigger.addEventListener('pointerenter', () => {
      if (hoverCapable.matches) activate(index);
    });
  });
}

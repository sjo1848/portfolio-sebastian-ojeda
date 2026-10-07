const root = document.querySelector<HTMLElement>('[data-operating-mindset]');

if (root) {
  const triggers = [...root.querySelectorAll<HTMLAnchorElement>('[data-mindset-trigger]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-mindset-panel]')];
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

  const activate = (index: number) => {
    triggers.forEach((trigger, triggerIndex) => {
      trigger.setAttribute('aria-expanded', triggerIndex === index ? 'true' : 'false');
    });
    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === index;
      panel.dataset.state = active ? 'active' : 'idle';
      panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  };

  root.dataset.mindsetEnhanced = 'true';
  activate(0);

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      activate(index);
    });
    trigger.addEventListener('focus', () => activate(index));
    trigger.addEventListener('pointerenter', () => {
      if (hoverCapable.matches) activate(index);
    });
  });
}

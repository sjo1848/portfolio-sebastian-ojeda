const section = document.querySelector<HTMLElement>('#projects');
const index = section?.querySelector<HTMLElement>('.selected-work-index');
const rows = [...(index?.querySelectorAll<HTMLElement>('[data-project-index-item]') ?? [])];
const panel = index?.querySelector<HTMLElement>('[data-selected-evidence]');

if (section && index && rows.length && panel) {
  const evidencePanel = panel;
  const desktopQuery = window.matchMedia('(min-width: 48rem)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const handoffObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.dataset.handoffVisible = 'true';
        handoffObserver.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
    section.dataset.handoffEnhanced = 'true';
    handoffObserver.observe(section);
  } else {
    section.dataset.handoffVisible = 'true';
  }

  // The image is concealed only after it has loaded and only while below the
  // viewport. Direct links, failed scripts and reduced motion show it at once.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const proofFrames = [...index.querySelectorAll<HTMLElement>(
      '.selected-work-evidence-image-frame, .selected-work-mobile-image-frame',
    )];
    const proofObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const frame = entry.target as HTMLElement;
        frame.dataset.proofReveal = 'revealing';
        proofObserver.unobserve(frame);
      }
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

    for (const frame of proofFrames) {
      const image = frame.querySelector('img');
      if (!image) continue;
      const arm = () => {
        if (reducedMotion.matches || frame.dataset.proofReveal) return;
        const bounds = frame.getBoundingClientRect();
        if (bounds.height > 0 && bounds.top <= window.innerHeight * 0.86) return;
        frame.dataset.proofReveal = 'waiting';
        proofObserver.observe(frame);
      };
      frame.addEventListener('animationend', (event) => {
        if (event.animationName === 'selected-proof-uncover') frame.dataset.proofReveal = 'complete';
      });
      if (image.complete && image.naturalWidth > 0) arm();
      else image.addEventListener('load', arm, { once: true });
    }

    const completeActiveReveal = () => {
      for (const frame of proofFrames) {
        if (frame.dataset.proofReveal === 'revealing') frame.dataset.proofReveal = 'complete';
      }
    };
    desktopQuery.addEventListener('change', completeActiveReveal);
    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches) return;
      proofObserver.disconnect();
      for (const frame of proofFrames) {
        if (frame.dataset.proofReveal) frame.dataset.proofReveal = 'complete';
      }
    });
  }

  const image = evidencePanel.querySelector<HTMLImageElement>('[data-evidence-image]');
  const empty = evidencePanel.querySelector<HTMLElement>('[data-evidence-empty]');
  const figure = evidencePanel.querySelector<HTMLElement>('.selected-work-evidence-figure');
  const title = evidencePanel.querySelector<HTMLElement>('[data-evidence-title]');
  const status = evidencePanel.querySelectorAll<HTMLElement>('.selected-work-evidence-heading > span')[1];
  const count = evidencePanel.querySelector<HTMLElement>('.selected-work-evidence-index');
  const caption = evidencePanel.querySelector<HTMLElement>('[data-evidence-caption]');
  const role = evidencePanel.querySelector<HTMLElement>('[data-evidence-role]');
  const stack = evidencePanel.querySelector<HTMLElement>('[data-evidence-stack]');
  const limitation = evidencePanel.querySelector<HTMLElement>('[data-evidence-limitation]');
  const proofAction = evidencePanel.querySelector<HTMLElement>('[data-proof-action]');
  const proofState = evidencePanel.querySelector<HTMLElement>('[data-proof-state]');
  const proofLink = evidencePanel.querySelector<HTMLAnchorElement>('[data-proof-link]');
  let revision = 0;

  function revealEvidence(row: HTMLElement, showFallback: boolean, fallbackText?: string) {
    if (!image || !empty || !figure || !title || !status || !count || !caption || !role || !stack || !limitation || !proofAction || !proofState || !proofLink) return;
    const current = ++revision;
    evidencePanel.setAttribute('aria-busy', 'true');
    const src = row.dataset.evidenceSrc;

    const update = (hasImage: boolean) => {
      if (current !== revision) return;
      title.textContent = row.querySelector<HTMLElement>('.selected-work-title')?.innerText ?? '';
      status.textContent = row.dataset.status ?? '';
      count.textContent = `${row.dataset.index ?? '01'} / ${String(rows.length).padStart(2, '0')}`;
      role.textContent = row.dataset.role ?? '';
      stack.textContent = row.dataset.stack ?? '';
      limitation.textContent = row.dataset.proofLimitation ?? '';
      const proofHref = row.dataset.proofHref;
      const proofLabel = row.dataset.proofLinkLabel;
      const currentProofState = row.dataset.proofState;
      if (proofHref && proofLabel && currentProofState) {
        proofAction.hidden = false;
        proofState.textContent = currentProofState;
        proofLink.href = proofHref;
        proofLink.textContent = proofLabel;
      } else {
        proofAction.hidden = true;
        proofState.textContent = '';
        proofLink.removeAttribute('href');
        proofLink.textContent = '';
      }
      caption.textContent = hasImage ? (row.dataset.proofCaption ?? '') : (row.dataset.emptyCaption ?? '');
      image.alt = hasImage ? (row.dataset.evidenceAlt ?? '') : '';
      image.hidden = !hasImage;
      empty.hidden = hasImage || !showFallback;
      if (!hasImage && showFallback) empty.textContent = fallbackText ?? row.dataset.emptyCaption ?? '';
      figure.removeAttribute('data-evidence-changing');
      if (!reducedMotion.matches) {
        requestAnimationFrame(() => {
          if (current === revision) figure.dataset.evidenceChanging = 'true';
        });
      }
      evidencePanel.removeAttribute('aria-busy');
    };

    if (!src) {
      image.removeAttribute('src');
      update(false);
      return;
    }

    const preload = new Image();
    preload.decoding = 'async';
    const applyLoadedImage = () => {
      if (current !== revision) return;
      image.width = Number(row.dataset.evidenceWidth) || image.width;
      image.height = Number(row.dataset.evidenceHeight) || image.height;
      image.src = src;
      update(true);
    };
    preload.onload = applyLoadedImage;
    preload.onerror = () => {
      image.removeAttribute('src');
      update(false);
      if (empty) empty.textContent = fallbackText ?? row.dataset.emptyCaption ?? '';
    };
    preload.src = src;
    if (preload.complete && preload.naturalWidth > 0) applyLoadedImage();
  }

  function activate(row: HTMLElement) {
    if (row.dataset.active === 'true') return;
    for (const item of rows) item.dataset.active = item === row ? 'true' : 'false';
    revealEvidence(row, true, row.dataset.imageError);
  }

  for (const row of rows) row.addEventListener('pointerenter', () => {
    if (desktopQuery.matches) activate(row);
  });
  index.addEventListener('focusin', (event) => {
    if (!desktopQuery.matches) return;
    const row = (event.target as HTMLElement).closest<HTMLElement>('[data-project-index-item]');
    if (row && rows.includes(row)) activate(row);
  });
}

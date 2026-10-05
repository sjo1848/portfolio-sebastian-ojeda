const hero = document.querySelector<HTMLElement>('[data-sequence-progress]');
const stage = hero?.querySelector<HTMLElement>('[data-sequence-stage]');
const proof = hero?.querySelector<HTMLElement>('[data-proof-bridge]');
const proofImage = proof?.querySelector<HTMLImageElement>('[data-proof-project="hms-cloudflare"]');
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const projectSection = document.querySelector<HTMLElement>('#projects');

type GlyphGeometry = { x: number; y: number; width: number; height: number; fontSize: string; targetX: number; targetY: number; scaleX: number; scaleY: number };
type Viewport = 'wide' | 'compact';
type VisualState = {
  composition: 'identity' | 'travel' | 'resolved' | 'transition' | 'proof' | 'handoff' | 'static';
  progress: number;
  proofProgress: number;
  visibleSignature: boolean;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

function deriveVisualState(progress: number, viewport: Viewport, isReduced: boolean): VisualState {
  if (isReduced) return { composition: 'static', progress: 0, proofProgress: 0, visibleSignature: true };
  const composition = progress < 0.15 ? 'identity'
    : progress < 0.39 ? 'travel'
      : progress < 0.68 ? 'resolved'
        : progress < 0.72 ? 'transition'
          : progress < 0.97 ? 'proof' : 'handoff';
  // The proof owns one direct, reversible scroll interval. The compact layout
  // uses the same state but its CSS keeps the evidence within safe insets.
  const proofProgress = viewport === 'wide' ? range(progress, 0.72, 0.9) : range(progress, 0.72, 0.86);
  return {
    composition,
    progress,
    proofProgress: composition === 'proof' ? proofProgress : 0,
    visibleSignature: progress >= 0.39,
  };
}

if (hero && stage && projectSection) {
  const origins = new Map([...hero.querySelectorAll<HTMLElement>('[data-origin-glyph]')]
    .map((element) => [element.dataset.originGlyph ?? '', element]));
  const destinations = new Map([...hero.querySelectorAll<HTMLElement>('[data-destination-glyph]')]
    .map((element) => [element.dataset.destinationGlyph ?? '', element]));
  const travellers = new Map([...hero.querySelectorAll<HTMLElement>('[data-flight-glyph]')]
    .map((element) => [element.dataset.flightGlyph ?? '', element]));

  if (origins.size === 2 && destinations.size === 2 && travellers.size === 2) {
    let geometry = new Map<string, GlyphGeometry>();
    let frame = 0;

    function measure() {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height;
      if (headerHeight) hero!.style.setProperty('--hero-header-offset', `${headerHeight}px`);
      const stageRect = stage!.getBoundingClientRect();
      const next = new Map<string, GlyphGeometry>();
      for (const key of ['s', 'o']) {
        const origin = origins.get(key);
        const destination = destinations.get(key);
        if (!origin || !destination) continue;
        const from = origin.getBoundingClientRect();
        const to = destination.getBoundingClientRect();
        next.set(key, {
          x: from.left - stageRect.left,
          y: from.top - stageRect.top,
          width: from.width,
          height: from.height,
          fontSize: getComputedStyle(origin).fontSize,
          targetX: to.left - stageRect.left,
          targetY: to.top - stageRect.top,
          scaleX: to.width / Math.max(from.width, 1),
          scaleY: to.height / Math.max(from.height, 1),
        });
      }
      geometry = next;
    }

    function clearMotionStyles() {
      hero!.style.removeProperty('--sequence-progress');
      hero!.style.removeProperty('--opening-opacity');
      hero!.style.removeProperty('--opening-recession');
      hero!.style.removeProperty('--proof-progress');
      hero!.style.removeProperty('--proof-opacity');
      hero!.style.removeProperty('--proof-left');
      hero!.style.removeProperty('--proof-width');
      hero!.style.removeProperty('--proof-top');
      for (const line of hero!.querySelectorAll<HTMLElement>('[data-thesis-line]')) {
        line.style.removeProperty('--line-clip');
      }
      for (const origin of origins.values()) delete origin.dataset.departed;
      for (const destination of destinations.values()) delete destination.dataset.arrived;
      for (const glyph of travellers.values()) {
        glyph.removeAttribute('style');
        delete glyph.dataset.inFlight;
      }
      for (const rest of hero!.querySelectorAll<HTMLElement>('[data-destination-rest]')) delete rest.dataset.arrived;
      if (proof) proof.hidden = true;
      hero!.dataset.sequenceProgress = '0';
      hero!.dataset.motionState = 'reduced';
      hero!.dataset.sequenceComposition = 'static';
      hero!.dataset.thesisResolved = 'true';
      delete root.dataset.heroMotionPending;
      root.dataset.heroSignatureVisible = 'true';
    }

    function render() {
      frame = 0;
      if (reducedMotion.matches || window.location.hash) {
        clearMotionStyles();
        hero!.dataset.motionState = reducedMotion.matches ? 'reduced' : 'static';
        return;
      }

      const sectionTop = hero!.getBoundingClientRect().top + window.scrollY;
      const scrollLength = Math.max(1, hero!.offsetHeight - stage!.offsetHeight);
      const stageWidth = stage!.getBoundingClientRect().width;
      const progress = clamp((window.scrollY - sectionTop) / scrollLength);
      const viewport: Viewport = window.matchMedia('(min-width: 64rem)').matches ? 'wide' : 'compact';
      const state = deriveVisualState(progress, viewport, false);
      hero!.dataset.motionState = 'active';
      hero!.dataset.sequenceProgress = progress.toFixed(4);
      hero!.dataset.sequenceComposition = state.composition;
      hero!.style.setProperty('--sequence-progress', progress.toFixed(4));
      hero!.style.setProperty('--opening-opacity', String(1 - range(progress, 0.15, 0.22)));
      hero!.style.setProperty('--opening-recession', String(range(progress, 0.15, 0.22)));
      hero!.style.setProperty('--proof-progress', state.proofProgress.toFixed(4));
      hero!.style.setProperty('--proof-opacity', String(range(progress, 0.69, 0.73)));
      if (state.composition === 'proof' && viewport === 'wide') {
        const startWidth = Math.min(stageWidth * 0.4, 512);
        const endWidth = Math.min(window.innerWidth * 0.82, 1088);
        const amount = state.proofProgress;
        const left = (stageWidth - startWidth) / stageWidth * (1 - amount) + (stageWidth - endWidth) / (2 * stageWidth) * amount;
        const width = startWidth / stageWidth * (1 - amount) + endWidth / stageWidth * amount;
        hero!.style.setProperty('--proof-left', `${left * 100}%`);
        hero!.style.setProperty('--proof-width', `${width * 100}%`);
        hero!.style.setProperty('--proof-top', `${14 - amount * 8}%`);
      } else {
        hero!.style.removeProperty('--proof-left');
        hero!.style.removeProperty('--proof-width');
        hero!.style.removeProperty('--proof-top');
      }

      const thesisClip = progress >= 0.39 ? '0%' : '100%';
      for (const line of hero!.querySelectorAll<HTMLElement>('[data-thesis-line]')) line.style.setProperty('--line-clip', thesisClip);

      const travel = range(progress, 0.15, 0.39);
      const eased = travel * travel * (3 - 2 * travel);
      for (const key of ['s', 'o']) {
        const glyph = travellers.get(key);
        const origin = origins.get(key);
        const destination = destinations.get(key);
        const path = geometry.get(key);
        if (!glyph || !origin || !destination || !path) continue;
        const x = path.x + (path.targetX - path.x) * eased;
        const arc = viewport === 'wide' ? 12 : key === 's' ? 6 : -6;
        const y = path.y + (path.targetY - path.y) * eased - Math.sin(eased * Math.PI) * arc;
        const scaleX = 1 + (path.scaleX - 1) * eased;
        const scaleY = 1 + (path.scaleY - 1) * eased;
        glyph.style.width = `${path.width}px`;
        glyph.style.height = `${path.height}px`;
        glyph.style.fontSize = path.fontSize;
        glyph.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
        glyph.dataset.inFlight = String(progress >= 0.15 && progress < 0.39);
        origin.dataset.departed = String(progress >= 0.15);
        destination.dataset.arrived = String(progress >= 0.39);
        const rest = hero!.querySelector<HTMLElement>(`[data-destination-rest="${key}"]`);
        if (rest) rest.dataset.arrived = String(progress >= 0.39);
      }

      if (proof) proof.hidden = state.composition !== 'proof';
      if (proofImage && !proofImage.getAttribute('src') && state.composition === 'proof') {
        proofImage.src = proofImage.dataset.src ?? '';
      }
      root.dataset.heroSignatureVisible = String(state.visibleSignature);
      delete root.dataset.heroMotionPending;
      hero!.dataset.thesisResolved = String(progress >= 0.39);
    }

    function scheduleRender() {
      if (reducedMotion.matches || window.location.hash) return;
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    function onMotionChange() {
      if (reducedMotion.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        clearMotionStyles();
      }
      else {
        hero!.dataset.motionState = 'active';
        measure();
        scheduleRender();
      }
    }

    function onHashChange() {
      if (!window.location.hash && !reducedMotion.matches) {
        hero!.dataset.motionState = 'active';
        measure();
      }
      scheduleRender();
    }

    hero.dataset.motionState = reducedMotion.matches || window.location.hash ? 'static' : 'active';
    if (!reducedMotion.matches && !window.location.hash) measure();
    render();
    window.addEventListener('scroll', scheduleRender, { passive: true });
    window.addEventListener('resize', () => { measure(); scheduleRender(); }, { passive: true });
    window.addEventListener('orientationchange', () => { measure(); scheduleRender(); }, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    window.addEventListener('pageshow', onHashChange);
    reducedMotion.addEventListener('change', onMotionChange);
    root.dataset.heroMotionInitialized = 'true';
  } else {
    delete root.dataset.heroMotionPending;
    root.dataset.heroSignatureVisible = 'true';
    hero.dataset.motionState = 'static';
  }
}

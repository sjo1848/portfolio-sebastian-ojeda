const hero = document.querySelector<HTMLElement>('[data-sequence-progress]');
const stage = hero?.querySelector<HTMLElement>('[data-sequence-stage]');
const projectSection = document.querySelector<HTMLElement>('#projects');
const proofBridge = hero?.querySelector<HTMLElement>('[data-proof-bridge]');
const proofBridgeImage = proofBridge?.querySelector<HTMLImageElement>('[data-proof-bridge-image]');
const root = document.documentElement;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && stage && projectSection && !motionPreference.matches) {
  const origins = new Map(
    [...hero.querySelectorAll<HTMLElement>('[data-origin-glyph]')]
      .map((element) => [element.dataset.originGlyph ?? '', element]),
  );
  const destinations = new Map(
    [...hero.querySelectorAll<HTMLElement>('[data-destination-glyph]')]
      .map((element) => [element.dataset.destinationGlyph ?? '', element]),
  );
  const travellers = new Map(
    [...hero.querySelectorAll<HTMLElement>('[data-flight-glyph]')]
      .map((element) => [element.dataset.flightGlyph ?? '', element]),
  );

  if (origins.size === 2 && destinations.size === 2 && travellers.size === 2) {
    type FlightGeometry = { x: number; y: number; width: number; height: number; fontSize: string; targetX: number; targetY: number; scaleX: number; scaleY: number };
    let geometry = new Map<string, FlightGeometry>();
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

    function setProofHandoff(state: 'entering' | 'dominant' | 'settling' | 'settled' | null) {
      if (!proofBridge || !projectSection) return;
      if (!state) {
        proofBridge.hidden = true;
        hero!.removeAttribute('data-proof-handoff-stage');
        projectSection.removeAttribute('data-signature-handoff');
        return;
      }

      hero!.dataset.proofHandoffStage = state;
      projectSection.dataset.signatureHandoff = state;
      if (state === 'settled') {
        proofBridge.hidden = true;
        return;
      }

      proofBridge.hidden = false;
      if (proofBridgeImage && !proofBridgeImage.getAttribute('src')) {
        const source = proofBridgeImage.dataset.src;
        if (source) proofBridgeImage.src = source;
      }
    }

    function measure() {
      const stageRect = stage!.getBoundingClientRect();
      const next = new Map<string, FlightGeometry>();
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

    function update() {
      frame = 0;
      const sectionTop = hero!.getBoundingClientRect().top + window.scrollY;
      const scrollLength = Math.max(1, hero!.offsetHeight - stage!.offsetHeight);
      const progress = clamp((window.scrollY - sectionTop) / scrollLength);
      hero!.style.setProperty('--sequence-progress', progress.toFixed(4));
      hero!.dataset.sequenceProgress = progress.toFixed(4);

      const thesisProgress = range(progress, 0.23, 0.46);
      for (const [index, line] of [...hero!.querySelectorAll<HTMLElement>('[data-thesis-line]')].entries()) {
        const lineStart = index / 3;
        const lineEnd = (index + 1.35) / 3;
        const reveal = range(thesisProgress, lineStart, lineEnd);
        line.style.setProperty('--line-reveal', reveal.toFixed(4));
        line.style.setProperty('--line-clip', `${(1 - reveal) * 100}%`);
      }

      const travel = range(progress, 0.15, 0.39);
      const eased = travel * travel * (3 - 2 * travel);
      const arc = window.matchMedia('(max-width: 47.99rem)').matches ? 7 : 17;
      for (const key of ['s', 'o']) {
        const glyph = travellers.get(key);
        const origin = origins.get(key);
        const destination = destinations.get(key);
        const path = geometry.get(key);
        if (!glyph || !origin || !destination || !path) continue;

        const startX = path.x;
        const startY = path.y;
        const x = startX + (path.targetX - startX) * eased;
        const y = startY + (path.targetY - startY) * eased - Math.sin(eased * Math.PI) * arc;
        const scaleX = 1 + (path.scaleX - 1) * eased;
        const scaleY = 1 + (path.scaleY - 1) * eased;
        glyph.style.width = `${path.width}px`;
        glyph.style.height = `${path.height}px`;
        glyph.style.fontSize = path.fontSize;
        glyph.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
        glyph.dataset.inFlight = String(progress >= 0.15 && progress < 0.39);
        origin.dataset.departed = String(progress >= 0.15);
        destination.dataset.arrived = String(progress >= 0.39);
        const destinationRest = hero!.querySelector<HTMLElement>(`[data-destination-rest="${key}"]`);
        if (destinationRest) destinationRest.dataset.arrived = String(progress >= 0.39);
      }

      // The full source name recedes as one identity instead of leaving a long-lived typo-shaped fragment.
      const openingFade = range(progress, 0.15, 0.22);
      hero!.style.setProperty('--opening-opacity', String(1 - openingFade));
      hero!.style.setProperty('--opening-recession', String(openingFade));
      hero!.dataset.thesisResolved = String(progress >= 0.46);
      if (progress >= 0.555) {
        root.removeAttribute('data-hero-motion-pending');
        root.dataset.heroSignatureVisible = 'true';
      } else {
        root.dataset.heroMotionPending = 'true';
        root.removeAttribute('data-hero-signature-visible');
      }
      const proofStage = progress < 0.685
        ? null
        : progress < 0.735
          ? 'entering'
          : progress < 0.89
            ? 'dominant'
            : progress < 0.985
              ? 'settling'
              : 'settled';
      setProofHandoff(proofStage);
      hero!.dataset.sequenceComplete = String(progress >= 1);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    hero.dataset.motionState = 'active';
    measure();
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      scheduleUpdate();
    }, { passive: true });
    window.addEventListener('orientationchange', () => {
      measure();
      scheduleUpdate();
    }, { passive: true });
    motionPreference.addEventListener('change', (event) => {
      if (event.matches) {
        window.removeEventListener('scroll', scheduleUpdate);
        hero!.dataset.motionState = 'reduced';
        delete root.dataset.heroMotionPending;
        root.dataset.heroSignatureVisible = 'true';
        setProofHandoff(null);
      }
    });
  } else {
    delete root.dataset.heroMotionPending;
  }
}

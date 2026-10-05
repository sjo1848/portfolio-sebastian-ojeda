const hero = document.querySelector<HTMLElement>('[data-sequence-progress]');
const stage = hero?.querySelector<HTMLElement>('[data-sequence-stage]');
const projectSection = document.querySelector<HTMLElement>('#projects');
const proofBridge = hero?.querySelector<HTMLElement>('[data-proof-bridge]');
const proofBridgeImage = proofBridge?.querySelector<HTMLImageElement>('[data-proof-bridge-image]');
const root = document.documentElement;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopHandoff = window.matchMedia('(min-width: 48rem)');

// Browser history may restore the URL fragment before the sticky Hero's
// scroll state has settled. Reassert the native section target after history
// traversal only when the target is actually outside the viewport.
function restoreProjectsFragmentVisibility() {
  if (window.location.hash !== '#projects' || !projectSection) return;
  window.setTimeout(() => window.requestAnimationFrame(() => {
    const bounds = projectSection!.getBoundingClientRect();
    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      projectSection!.scrollIntoView({ block: 'start', behavior: 'auto' });
      document.documentElement.style.scrollBehavior = previousBehavior;
    }
  }), 0);
}

window.addEventListener('hashchange', restoreProjectsFragmentVisibility);
window.addEventListener('popstate', restoreProjectsFragmentVisibility);
window.addEventListener('pageshow', restoreProjectsFragmentVisibility);

// A deep link must render the complete static Hero immediately. The inline
// bootstrap may have hidden the persistent header identity before this module
// runs, so normalize that state before native fragment positioning settles.
if (hero && projectSection && window.location.hash) {
  root.removeAttribute('data-hero-motion-pending');
  root.dataset.heroSignatureVisible = 'true';
  hero.dataset.motionState = 'static';
  restoreProjectsFragmentVisibility();
}

// A deep link must keep native fragment positioning stable. The long sticky
// sequence changes Hero height, so it only starts when the page has no anchor.
if (hero && stage && projectSection && !motionPreference.matches && !window.location.hash) {
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
    let proofObject: HTMLImageElement | null = null;
    let targetFrame: HTMLElement | null = null;
    let targetPlaceholder: HTMLElement | null = null;
    let proofObjectPortaled = false;
    let proofObjectTransferring = false;
    let proofObjectTransferred = false;
    let proofTransferGeneration = 0;
    let proofTransferAnimation: Animation | null = null;
    let cancelProofTransferDelay: (() => void) | null = null;
    let originalProofLoading: string | null = null;
    let handoffState: 'entering' | 'dominant' | 'settling' | 'waiting-for-selected-work' | null = null;
    let motionDisabled = false;
    const bridgeFigure = proofBridge?.querySelector<HTMLElement>('.hero-proof-bridge-figure');

    function adoptSelectedEvidenceImage() {
      if (!desktopHandoff.matches || proofObject || !bridgeFigure) return;
      const selectedImage = projectSection!.querySelector<HTMLImageElement>('[data-selected-evidence] [data-evidence-image]');
      const selectedFrame = selectedImage?.closest<HTMLElement>('.selected-work-evidence-image-frame');
      if (!selectedImage || !selectedFrame) return;

      targetFrame = selectedFrame;
      proofObject = selectedImage;
      originalProofLoading = selectedImage.getAttribute('loading');
      const targetBounds = selectedFrame.getBoundingClientRect();
      const stageBounds = stage!.getBoundingClientRect();
      hero!.style.setProperty('--proof-target-left', `${targetBounds.left - stageBounds.left}px`);
      hero!.style.setProperty('--proof-target-width', `${targetBounds.width}px`);
      targetPlaceholder = document.createElement('div');
      targetPlaceholder.className = 'selected-work-handoff-placeholder';
      targetPlaceholder.setAttribute('aria-hidden', 'true');
      targetPlaceholder.dataset.handoffPlaceholder = 'true';
      selectedImage.replaceWith(targetPlaceholder);
      proofBridgeImage?.remove();
      proofObject.dataset.proofBridgeImage = 'true';
      proofObject.dataset.handoffState = 'hero';
      proofObject.removeAttribute('loading');
      bridgeFigure.insertBefore(proofObject, bridgeFigure.querySelector('figcaption'));
      projectSection!.dataset.signatureHandoffOwner = 'shared-image';
    }

    function clearFixedPosition(image: HTMLImageElement) {
      for (const property of ['display', 'position', 'left', 'top', 'width', 'height', 'z-index', 'pointer-events', 'object-fit', 'transform', 'transform-origin']) {
        image.style.removeProperty(property);
      }
    }

    function cancelActiveProofTransfer() {
      proofTransferGeneration += 1;
      cancelProofTransferDelay?.();
      cancelProofTransferDelay = null;
      proofTransferAnimation?.cancel();
      proofTransferAnimation = null;
      proofObjectTransferring = false;
    }

    function waitForProofTransferDelay(duration: number): Promise<boolean> {
      return new Promise((resolve) => {
        let completed = false;
        let timeout = 0;
        const finish = (elapsed: boolean) => {
          if (completed) return;
          completed = true;
          window.clearTimeout(timeout);
          if (cancelProofTransferDelay === cancel) cancelProofTransferDelay = null;
          resolve(elapsed);
        };
        const cancel = () => finish(false);
        timeout = window.setTimeout(() => finish(true), duration);
        cancelProofTransferDelay = cancel;
      });
    }

    /** Restore the one shared evidence image to its server-rendered Selected Work frame. */
    function restoreProofObjectToSelectedWork(reason: 'reduced-motion' | 'mobile-breakpoint') {
      cancelActiveProofTransfer();
      if (proofObject && targetFrame && !proofObjectTransferred) {
        clearFixedPosition(proofObject);
        if (targetPlaceholder?.isConnected) {
          targetPlaceholder.replaceWith(proofObject);
        } else if (!targetFrame.contains(proofObject)) {
          targetFrame.append(proofObject);
        }
        targetPlaceholder = null;
        if (originalProofLoading === null) proofObject.removeAttribute('loading');
        else proofObject.setAttribute('loading', originalProofLoading);
        delete proofObject.dataset.proofBridgeImage;
        delete proofObject.dataset.handoffConvergenceErrorPx;
        proofObject.dataset.handoffState = 'restored';
        proofObjectPortaled = false;
        proofObjectTransferred = true;
        projectSection!.dataset.signatureHandoff = 'complete';
        projectSection!.removeAttribute('data-signature-handoff-owner');
      }
      proofBridge!.hidden = true;
      hero!.dataset.proofHandoffInterruptedBy = reason;
      hero!.dataset.proofHandoffStage = 'complete';
    }

    function returnProofObjectToHero() {
      if (!proofObjectPortaled || proofObjectTransferred || proofObjectTransferring || !proofObject || !bridgeFigure) return;
      clearFixedPosition(proofObject);
      proofObject.dataset.handoffState = 'hero';
      bridgeFigure.insertBefore(proofObject, bridgeFigure.querySelector('figcaption'));
      proofObjectPortaled = false;
      proofBridge!.hidden = false;
      projectSection!.dataset.signatureHandoff = 'settling';
    }

    function portalProofObject() {
      if (!desktopHandoff.matches || !proofObject || !targetFrame || proofObjectPortaled || proofObjectTransferred) return;
      const rect = proofObject.getBoundingClientRect();
      Object.assign(proofObject.style, {
        display: 'block',
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: '20',
        pointerEvents: 'none',
        objectFit: 'contain',
      });
      proofObject.dataset.handoffState = 'approaching-target';
      document.body.append(proofObject);
      proofObjectPortaled = true;
      proofBridge!.hidden = true;
    }

    async function transferProofObjectToTarget() {
      if (!proofObject || !targetFrame || !targetPlaceholder || !proofObjectPortaled || proofObjectTransferring || proofObjectTransferred) return;
      const transferGeneration = ++proofTransferGeneration;
      let target = targetFrame.getBoundingClientRect();
      const source = proofObject.getBoundingClientRect();
      const viewportHeight = document.documentElement.clientHeight;
      const headerBottom = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().bottom ?? 0;
      if (target.top < headerBottom || target.bottom > viewportHeight || Math.abs(target.top - source.top) > 160) return;

      proofObjectTransferring = true;
      proofObject.dataset.handoffState = 'target-aligned';
      projectSection!.dataset.signatureHandoff = 'target-aligned';
      if (!await waitForProofTransferDelay(320) || transferGeneration !== proofTransferGeneration) return;
      target = targetFrame.getBoundingClientRect();
      const settledSource = proofObject.getBoundingClientRect();
      if (target.top < headerBottom || target.bottom > viewportHeight || Math.abs(target.top - settledSource.top) > 160 || target.width < 1 || target.height < 1 || settledSource.width < 1 || settledSource.height < 1) {
        proofObjectTransferring = false;
        proofObject.dataset.handoffState = 'approaching-target';
        projectSection!.dataset.signatureHandoff = 'waiting-for-selected-work';
        return;
      }
      const dx = settledSource.left - target.left;
      const dy = settledSource.top - target.top;
      const sx = settledSource.width / target.width;
      const sy = settledSource.height / target.height;
      const startTransform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      Object.assign(proofObject.style, {
        left: `${target.left}px`,
        top: `${target.top}px`,
        width: `${target.width}px`,
        height: `${target.height}px`,
        transformOrigin: 'top left',
        transform: startTransform,
      });
      proofObject.dataset.handoffState = 'flipping';
      void proofObject.getBoundingClientRect();
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));

      const animation = proofObject.animate(
        [{ transform: startTransform }, { transform: 'translate(0px, 0px) scale(1, 1)' }],
        { duration: 440, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      );
      proofTransferAnimation = animation;
      try {
        await animation.finished;
      } catch {
        if (transferGeneration === proofTransferGeneration) proofObjectTransferring = false;
        return;
      }
      if (transferGeneration !== proofTransferGeneration) return;
      proofTransferAnimation = null;

      const converged = proofObject.getBoundingClientRect();
      const error = Math.max(
        Math.abs(converged.left - target.left),
        Math.abs(converged.top - target.top),
        Math.abs(converged.width - target.width),
        Math.abs(converged.height - target.height),
      );
      proofObject.dataset.handoffState = 'converged';
      proofObject.dataset.handoffConvergenceErrorPx = error.toFixed(3);
      projectSection!.dataset.signatureHandoff = 'converged';

      // Hold the shared object on the real target bounds for one brief beat, then restore normal flow.
      if (!await waitForProofTransferDelay(140) || transferGeneration !== proofTransferGeneration) return;
      animation.cancel();
      targetPlaceholder.remove();
      targetFrame.append(proofObject);
      clearFixedPosition(proofObject);
      proofObject.dataset.handoffState = 'complete';
      proofObject.removeAttribute('data-proof-bridge-image');
      proofObjectTransferred = true;
      proofObjectPortaled = false;
      proofObjectTransferring = false;
      proofBridge!.hidden = true;
      hero!.dataset.proofHandoffStage = 'complete';
      projectSection!.dataset.signatureHandoff = 'complete';
      projectSection!.removeAttribute('data-signature-handoff-owner');
    }

    function updateProofTarget() {
      if (proofObjectPortaled && !proofObjectTransferred) void transferProofObjectToTarget();
    }

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

    function setProofHandoff(state: 'entering' | 'dominant' | 'settling' | 'waiting-for-selected-work' | null) {
      if (!proofBridge || !projectSection) return;
      if (proofObjectTransferred && state !== null) {
        hero!.dataset.proofHandoffStage = 'complete';
        projectSection.dataset.signatureHandoff = 'complete';
        return;
      }
      if (!state) {
        returnProofObjectToHero();
        proofBridge.hidden = true;
        handoffState = null;
        hero!.removeAttribute('data-proof-handoff-stage');
        projectSection.removeAttribute('data-signature-handoff');
        projectSection.removeAttribute('data-signature-handoff-owner');
        return;
      }

      if (state === handoffState) {
        updateProofTarget();
        return;
      }
      if (state !== 'waiting-for-selected-work') returnProofObjectToHero();
      handoffState = state;
      hero!.dataset.proofHandoffStage = state;
      projectSection.dataset.signatureHandoff = state;
      if (state === 'waiting-for-selected-work') {
        portalProofObject();
        if (!desktopHandoff.matches || proofObjectPortaled) proofBridge.hidden = true;
        updateProofTarget();
        return;
      }

      proofBridge.hidden = false;
      if (state === 'entering' && desktopHandoff.matches) adoptSelectedEvidenceImage();
      if (proofBridgeImage?.isConnected && !proofBridgeImage.getAttribute('src')) {
        const source = proofBridgeImage.dataset.src;
        if (source) proofBridgeImage.src = source;
      }
      if (state === 'settling') returnProofObjectToHero();
    }

    function measure() {
      const stageRect = stage!.getBoundingClientRect();
      if (desktopHandoff.matches && targetFrame) {
        const targetRect = targetFrame.getBoundingClientRect();
        hero!.style.setProperty('--proof-target-left', `${targetRect.left - stageRect.left}px`);
        hero!.style.setProperty('--proof-target-width', `${targetRect.width}px`);
      }
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
      if (motionDisabled) return;
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
              : 'waiting-for-selected-work';
      setProofHandoff(proofStage);
      updateProofTarget();
      hero!.dataset.sequenceComplete = String(progress >= 1);
    }

    function scheduleUpdate() {
      if (!motionDisabled && !frame) frame = window.requestAnimationFrame(update);
    }

    function handleResize() {
      if (motionDisabled) return;
      measure();
      scheduleUpdate();
    }

    function handleDesktopHandoffChange(event: MediaQueryListEvent) {
      if (motionDisabled) return;
      if (!event.matches) {
        restoreProofObjectToSelectedWork('mobile-breakpoint');
      } else {
        delete hero!.dataset.proofHandoffInterruptedBy;
        measure();
        scheduleUpdate();
      }
    }

    function handleMotionPreferenceChange(event: MediaQueryListEvent) {
      if (!event.matches || motionDisabled) return;
      // Reduced motion is terminal for this page load. Resize, orientation,
      // and later preference changes must never restart the scroll sequence.
      motionDisabled = true;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      desktopHandoff.removeEventListener('change', handleDesktopHandoffChange);
      restoreProofObjectToSelectedWork('reduced-motion');
      hero!.dataset.motionState = 'reduced';
      delete root.dataset.heroMotionPending;
      root.dataset.heroSignatureVisible = 'true';
      handoffState = null;
      hero!.removeAttribute('data-proof-handoff-stage');
      projectSection!.removeAttribute('data-signature-handoff');
      projectSection!.removeAttribute('data-signature-handoff-owner');
    }

    hero.dataset.motionState = 'active';
    measure();
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    desktopHandoff.addEventListener('change', handleDesktopHandoffChange);
    motionPreference.addEventListener('change', handleMotionPreferenceChange);
  } else {
    delete root.dataset.heroMotionPending;
  }
}

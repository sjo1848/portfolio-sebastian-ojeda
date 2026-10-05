const hero = document.querySelector<HTMLElement>('[data-sequence-progress]');
const stage = hero?.querySelector<HTMLElement>('[data-sequence-stage]');
const projectSection = document.querySelector<HTMLElement>('#projects');
const proofBridge = hero?.querySelector<HTMLElement>('[data-proof-bridge]');
const proofBridgeImage = proofBridge?.querySelector<HTMLImageElement>('[data-proof-bridge-fallback]');
const root = document.documentElement;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
// Keep the same-node transfer for wide desktop layouts. Tablets use the
// self-contained proof panel to avoid compressing the choreography.
const desktopHandoff = window.matchMedia('(min-width: 64rem)');

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

// The inline pending bootstrap has a bounded fail-safe. If it fired first,
// the restored static page wins over late animation initialization.
if (root.dataset.heroMotionFallback === 'true') {
  delete root.dataset.heroMotionPending;
  root.dataset.heroSignatureVisible = 'true';
  if (hero) hero.dataset.motionState = 'static';
} else {

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
    let cancelProofTransferFrame: (() => void) | null = null;
    let previousProgress: number | null = null;
    let snapResolvedThesis = false;
    let travelLanding: 'identity' | 'resolved' | null = null;
    let forcedProgress: number | null = null;
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
      if (proofBridgeImage) proofBridgeImage.hidden = true;
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
      cancelProofTransferFrame?.();
      cancelProofTransferFrame = null;
      proofTransferAnimation?.cancel();
      proofTransferAnimation = null;
      proofObjectTransferring = false;
    }

    function waitForProofTransferFrame(): Promise<boolean> {
      return new Promise((resolve) => {
        let completed = false;
        let frameId = 0;
        const finish = (elapsed: boolean) => {
          if (completed) return;
          completed = true;
          if (cancelProofTransferFrame === cancel) cancelProofTransferFrame = null;
          resolve(elapsed);
        };
        const cancel = () => {
          window.cancelAnimationFrame(frameId);
          finish(false);
        };
        frameId = window.requestAnimationFrame(() => finish(true));
        cancelProofTransferFrame = cancel;
      });
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
      if (proofBridgeImage) proofBridgeImage.hidden = true;
      hero!.dataset.proofHandoffInterruptedBy = reason;
      hero!.dataset.proofHandoffStage = 'complete';
    }

    /** Rewind to the canonical server-rendered frame and allow a later replay. */
    function restoreProofObjectForRewind() {
      const hasActiveProof = Boolean(
        proofObject || targetPlaceholder || proofObjectPortaled || proofObjectTransferring ||
        proofTransferAnimation || cancelProofTransferDelay || cancelProofTransferFrame,
      );
      if (!hasActiveProof) return;

      cancelActiveProofTransfer();
      if (proofObject && targetFrame) {
        clearFixedPosition(proofObject);
        if (targetPlaceholder?.isConnected) {
          targetPlaceholder.replaceWith(proofObject);
        } else if (!targetFrame.contains(proofObject)) {
          targetFrame.append(proofObject);
        }
        if (originalProofLoading === null) proofObject.removeAttribute('loading');
        else proofObject.setAttribute('loading', originalProofLoading);
        delete proofObject.dataset.proofBridgeImage;
        delete proofObject.dataset.handoffState;
        delete proofObject.dataset.handoffConvergenceErrorPx;
      }

      targetPlaceholder?.remove();
      targetPlaceholder = null;
      proofObject = null;
      targetFrame = null;
      originalProofLoading = null;
      proofObjectPortaled = false;
      proofObjectTransferring = false;
      proofObjectTransferred = false;
      proofBridge!.hidden = true;
    }

    function returnProofObjectToHero() {
      if (proofObjectTransferred || !proofObject || !bridgeFigure) return;
      if (!proofObjectPortaled && !proofObjectTransferring && bridgeFigure.contains(proofObject)) return;

      // A backward stage transition wins over any pending target delay or FLIP.
      // Invalidate the async transfer before moving the shared node back into Hero.
      cancelActiveProofTransfer();
      clearFixedPosition(proofObject);
      proofObject.dataset.handoffState = 'hero';
      delete proofObject.dataset.handoffConvergenceErrorPx;
      bridgeFigure.insertBefore(proofObject, bridgeFigure.querySelector('figcaption'));
      proofObjectPortaled = false;
      proofBridge!.hidden = false;
    }

    function showBridgeFallback() {
      if (!proofBridgeImage?.isConnected) return;
      proofBridgeImage.hidden = false;
      const source = proofBridgeImage.dataset.src;
      if (source && !proofBridgeImage.getAttribute('src')) proofBridgeImage.src = source;
    }

    function hideBridgeFallback() {
      if (proofBridgeImage?.isConnected) proofBridgeImage.hidden = true;
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
      if (!await waitForProofTransferFrame() || transferGeneration !== proofTransferGeneration) return;

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
      // A completed desktop transfer must stay complete on desktop. After a
      // breakpoint rewind, however, the mobile Hero uses its static fallback.
      if (proofObjectTransferred && desktopHandoff.matches && state !== null) {
        hero!.dataset.proofHandoffStage = 'complete';
        projectSection.dataset.signatureHandoff = 'complete';
        return;
      }
      if (!state) {
        restoreProofObjectForRewind();
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
      if (desktopHandoff.matches && proofObject && !proofObjectTransferred) hideBridgeFallback();
      else showBridgeFallback();
      if (state === 'settling') returnProofObjectToHero();
    }

    function measure() {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height;
      if (headerHeight) hero!.style.setProperty('--hero-header-offset', `${headerHeight}px`);
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
      const measuredProgress = clamp((window.scrollY - sectionTop) / scrollLength);
      const progress = forcedProgress ?? measuredProgress;
      forcedProgress = null;
      const progressChanged = previousProgress === null || Math.abs(progress - previousProgress) > 0.0005;
      const fastJump = progressChanged && previousProgress !== null && Math.abs(progress - previousProgress) > 0.08;
      const reversing = progressChanged && previousProgress !== null && progress < previousProgress;
      // Scroll-linked motion may skip intermediate compositions. A large
      // sampled jump snaps directly to its derived state instead of visually
      // interpolating stale layers from the previous state.
      if (progressChanged) {
        hero!.dataset.sequenceSnap = String(fastJump);
        hero!.dataset.sequenceUpdateMode = fastJump ? 'jump' : 'continuous';
        if (fastJump) void stage!.getBoundingClientRect();
        previousProgress = progress;
        if (fastJump && progress >= 0.15 && progress < 0.39) {
          travelLanding = reversing ? 'identity' : 'resolved';
        } else if (
          (travelLanding === 'identity' && (progress < 0.15 || progress >= 0.39)) ||
          (travelLanding === 'resolved' && (progress <= 0.15 || progress >= 0.46))
        ) {
          travelLanding = null;
        }
        if (progress < 0.39 || (reversing && progress < 0.46)) snapResolvedThesis = false;
        else if (fastJump) snapResolvedThesis = true;
      }
      const visualProgress = travelLanding === 'identity'
        ? 0.149
        : travelLanding === 'resolved'
          ? 0.46
          : progress;
      hero!.style.setProperty('--sequence-progress', progress.toFixed(4));
      hero!.dataset.sequenceProgress = progress.toFixed(4);
      hero!.dataset.sequenceVisualProgress = visualProgress.toFixed(4);
      hero!.dataset.sequenceComposition = visualProgress < 0.15
        ? 'identity'
        : visualProgress < 0.39
          ? 'travel'
          : visualProgress < 0.675
            ? 'resolved'
            : visualProgress < 0.70
              ? 'transition'
              : 'proof';

      // Keep the thesis out of the glyph path. The S/O complete their travel
      // first; then the full words resolve around the landed glyphs.
      const resolvedProgress = snapResolvedThesis ? 0.46 : visualProgress;
      const resolvedThesisProgress = range(resolvedProgress, 0.39, 0.46);
      for (const [index, line] of [...hero!.querySelectorAll<HTMLElement>('[data-thesis-line]')].entries()) {
        const lineStart = index / 3;
        const lineEnd = Math.min(1, (index + 1.35) / 3);
        const reveal = range(resolvedThesisProgress, lineStart, lineEnd);
        line.style.setProperty('--line-reveal', reveal.toFixed(4));
        line.style.setProperty('--line-clip', `${(1 - reveal) * 100}%`);
      }

      const travel = range(visualProgress, 0.15, 0.39);
      const eased = travel * travel * (3 - 2 * travel);
      const tabletMotion = window.matchMedia('(max-width: 63.99rem)').matches;
      for (const key of ['s', 'o']) {
        const glyph = travellers.get(key);
        const origin = origins.get(key);
        const destination = destinations.get(key);
        const path = geometry.get(key);
        if (!glyph || !origin || !destination || !path) continue;

        const startX = path.x;
        const startY = path.y;
        const x = startX + (path.targetX - startX) * eased;
        // At tablet widths the two paths can converge on the same diagonal.
        // Split their shallow arcs in opposite directions so the glyphs never collide.
        const arc = tabletMotion ? (key === 's' ? 6 : -6) : 12;
        const y = startY + (path.targetY - startY) * eased - Math.sin(eased * Math.PI) * arc;
        const scaleX = 1 + (path.scaleX - 1) * eased;
        const scaleY = 1 + (path.scaleY - 1) * eased;
        glyph.style.width = `${path.width}px`;
        glyph.style.height = `${path.height}px`;
        glyph.style.fontSize = path.fontSize;
        glyph.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
        glyph.dataset.inFlight = String(visualProgress >= 0.15 && visualProgress < 0.39);
        origin.dataset.departed = String(visualProgress >= 0.15);
        destination.dataset.arrived = String(visualProgress >= 0.39);
        const destinationRest = hero!.querySelector<HTMLElement>(`[data-destination-rest="${key}"]`);
        if (destinationRest) destinationRest.dataset.arrived = String(visualProgress >= 0.39);
      }

      // The full source name recedes as one identity instead of leaving a long-lived typo-shaped fragment.
      const openingFade = range(visualProgress, 0.15, 0.22);
      hero!.style.setProperty('--opening-opacity', String(1 - openingFade));
      hero!.style.setProperty('--opening-recession', String(openingFade));
      const thesisResolved = resolvedProgress >= 0.46;
      hero!.dataset.thesisResolved = String(thesisResolved);
      if (visualProgress >= 0.555 || ((snapResolvedThesis || travelLanding === 'resolved') && thesisResolved && visualProgress >= 0.39)) {
        root.removeAttribute('data-hero-motion-pending');
        root.dataset.heroSignatureVisible = 'true';
      } else {
        root.dataset.heroMotionPending = 'true';
        root.removeAttribute('data-hero-signature-visible');
      }
      const proofStage = visualProgress < 0.70
        ? null
        : visualProgress < 0.76
          ? 'entering'
          : visualProgress < 0.89
            ? 'dominant'
            : visualProgress < 0.985
              ? 'settling'
              : 'waiting-for-selected-work';
      setProofHandoff(proofStage);
      updateProofTarget();
      hero!.dataset.sequenceComplete = String(visualProgress >= 1);
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
        forcedProgress = Number(hero!.dataset.sequenceProgress ?? 0);
        restoreProofObjectToSelectedWork('mobile-breakpoint');
        // The mobile composition owns its local fallback. Invalidate the old
        // desktop stage so the next scroll-derived frame reapplies that state,
        // even when the numeric progress itself did not change.
        handoffState = null;
        hero!.removeAttribute('data-proof-handoff-stage');
        projectSection!.removeAttribute('data-signature-handoff');
        projectSection!.removeAttribute('data-signature-handoff-owner');
        hero!.dataset.sequenceSnap = 'true';
        hero!.dataset.sequenceUpdateMode = 'jump';
        void stage!.getBoundingClientRect();
        measure();
        scheduleUpdate();
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
      // Reduced motion is an intentional static composition. Clear every
      // scroll-derived inline value so an interrupted travel/reveal/proof
      // frame cannot leak into the normal-flow Hero after the preference flips.
      hero!.style.removeProperty('--sequence-progress');
      hero!.style.removeProperty('--opening-opacity');
      hero!.style.removeProperty('--opening-recession');
      hero!.style.removeProperty('--proof-target-left');
      hero!.style.removeProperty('--proof-target-width');
      for (const line of hero!.querySelectorAll<HTMLElement>('[data-thesis-line]')) {
        line.style.removeProperty('--line-reveal');
        line.style.removeProperty('--line-clip');
      }
      for (const origin of origins.values()) delete origin.dataset.departed;
      for (const destination of destinations.values()) delete destination.dataset.arrived;
      for (const glyph of travellers.values()) {
        glyph.style.removeProperty('width');
        glyph.style.removeProperty('height');
        glyph.style.removeProperty('font-size');
        glyph.style.removeProperty('transform');
        delete glyph.dataset.inFlight;
      }
      for (const rest of hero!.querySelectorAll<HTMLElement>('[data-destination-rest]')) delete rest.dataset.arrived;
      hero!.dataset.sequenceProgress = '0';
      hero!.dataset.sequenceVisualProgress = '0';
      hero!.dataset.sequenceComposition = 'static';
      hero!.dataset.sequenceComplete = 'false';
      hero!.dataset.thesisResolved = 'true';
      hero!.removeAttribute('data-sequence-snap');
      previousProgress = null;
      snapResolvedThesis = false;
      travelLanding = null;
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
    root.dataset.heroMotionInitialized = 'true';
  } else {
    delete root.dataset.heroMotionPending;
    root.dataset.heroSignatureVisible = 'true';
    if (hero) hero.dataset.motionState = 'static';
  }
}
}

import AxeBuilder from '@axe-core/playwright';
import { expect, test, type ElementHandle, type Page } from '@playwright/test';
import fs from 'node:fs';

const evidenceDir = 'output/playwright/issue-129-signature-motion';
fs.mkdirSync(evidenceDir, { recursive: true });
test.describe.configure({ timeout: 60_000 });
const pageErrors = new WeakMap<Page, string[]>();

test.beforeEach(({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
});

test.afterEach(({ page }) => {
  expect(pageErrors.get(page) ?? []).toEqual([]);
});

const locales = [
  {
    lang: 'en', path: '/', name: 'Sebastián Ojeda', thesis: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS',
    role: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED',
    lead: 'I design and build systems where workflows, APIs, data and infrastructure have to work together.',
    metadata: 'Mendoza, Argentina · Remote-first', cta: 'View selected work',
  },
  {
    lang: 'es', path: '/es/', name: 'Sebastián Ojeda', thesis: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS',
    role: 'DESARROLLADOR FULL-STACK · FOCO BACKEND',
    lead: 'Diseño y construyo sistemas donde los flujos de trabajo, las API, los datos y la infraestructura deben funcionar en conjunto.',
    metadata: 'Mendoza, Argentina · Remoto prioritario', cta: 'Ver trabajo seleccionado',
  },
] as const;

async function moveToProgress(page: Page, progress: number) {
  await page.evaluate((targetProgress) => {
    document.documentElement.style.scrollBehavior = 'auto';
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    const length = hero.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: top + length * targetProgress, behavior: 'auto' });
  }, progress);
  await page.waitForFunction((targetProgress) => {
    const current = Number(document.querySelector<HTMLElement>('#hero')?.dataset.sequenceProgress ?? 0);
    return current >= targetProgress - 0.02;
  }, progress);
}

async function rewindToProgress(page: Page, progress: number) {
  await page.evaluate((targetProgress) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    const length = hero.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: top + length * targetProgress, behavior: 'auto' });
  }, progress);
  await page.waitForFunction((targetProgress) => {
    const current = Number(document.querySelector<HTMLElement>('#hero')?.dataset.sequenceProgress ?? 0);
    return Math.abs(current - targetProgress) <= 0.02;
  }, progress);
}

async function assertRewoundProofAndSelectedWorkInteraction(page: Page, proofNode: ElementHandle<HTMLElement | SVGElement> | null) {
  expect(proofNode).not.toBeNull();
  const restored = await page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('#projects [data-selected-evidence] [data-evidence-image]');
    const frame = image?.closest('.selected-work-evidence-image-frame');
    const bridge = document.querySelector<HTMLElement>('#hero [data-proof-bridge]');
    const section = document.querySelector<HTMLElement>('#projects');
    return {
      inActualFrame: Boolean(image && frame?.contains(image)),
      placeholderCount: document.querySelectorAll('[data-handoff-placeholder]').length,
      portaledCount: document.querySelectorAll('body > [data-proof-bridge-image]').length,
      bridgeImageCount: document.querySelectorAll('[data-proof-bridge-image]').length,
      bridgeHidden: bridge?.hidden,
      imageStyle: image?.getAttribute('style')?.trim() || null,
      imageHandoffState: image?.dataset.handoffState ?? null,
      imageLoading: image?.getAttribute('loading'),
      convergenceError: image?.dataset.handoffConvergenceErrorPx ?? null,
      owner: section?.dataset.signatureHandoffOwner ?? null,
      sectionHandoff: section?.dataset.signatureHandoff ?? null,
      proofStage: document.querySelector<HTMLElement>('#hero')?.dataset.proofHandoffStage ?? null,
      runningAnimations: image?.getAnimations().filter((animation) => animation.playState === 'running' || animation.playState === 'paused').length ?? -1,
    };
  });
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]')))
    .toBe(true);
  expect(restored).toMatchObject({
    inActualFrame: true,
    placeholderCount: 0,
    portaledCount: 0,
    bridgeImageCount: 0,
    bridgeHidden: true,
    imageStyle: null,
    imageHandoffState: null,
    imageLoading: 'lazy',
    convergenceError: null,
    owner: null,
    sectionHandoff: null,
    proofStage: null,
    runningAnimations: 0,
  });

  await page.locator('#projects').scrollIntoViewIfNeeded();
  const image = page.locator('#projects [data-selected-evidence] [data-evidence-image]');
  const alquileres = page.locator('#projects [data-project-index-item]').nth(1);
  await alquileres.hover();
  await expect(alquileres).toHaveAttribute('data-active', 'true');
  await expect(page.locator('[data-evidence-title]')).toHaveText('Alquileres Uspallata');
  await expect(image).toHaveAttribute('src', /catalog-results-desktop-1440x1200\.png$/);
  expect(await proofNode!.evaluate((node) => node === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]')))
    .toBe(true);
  expect(await image.evaluate((node) => node.closest('.selected-work-evidence-image-frame')?.contains(node))).toBe(true);
}

async function expectHeroProofAtStage(page: Page, proofNode: ElementHandle<HTMLElement | SVGElement> | null, stage: 'dominant' | 'settling') {
  expect(proofNode).not.toBeNull();
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', stage);
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', stage);
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff-owner', 'shared-image');
  await expect(page.locator('#hero [data-proof-bridge]')).toBeVisible();
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#hero [data-proof-bridge-image]')))
    .toBe(true);
  const state = await proofNode!.evaluate((node) => {
    const image = node as HTMLElement;
    return {
      parentIsHero: Boolean(image.closest('.hero-proof-bridge-figure')),
      state: image.dataset.handoffState,
      position: getComputedStyle(image).position,
      style: image.getAttribute('style')?.trim() || null,
      placeholderCount: document.querySelectorAll('[data-handoff-placeholder]').length,
      imageAnimations: image.getAnimations().length,
      sectionPlaceholderConnected: document.querySelector('[data-handoff-placeholder]')?.isConnected ?? false,
    };
  });
  expect(state).toMatchObject({
    parentIsHero: true,
    state: 'hero',
    style: null,
    placeholderCount: 1,
    imageAnimations: 0,
    sectionPlaceholderConnected: true,
  });
  expect(state.position).not.toBe('fixed');
  expect(await page.locator('#projects [data-selected-evidence] .selected-work-evidence-image-frame [data-evidence-image]')
    .count()).toBe(0);
}

async function waitForCapturedProofDelayCount(page: Page, count: number) {
  await page.waitForFunction((expected) => {
    const testWindow = window as Window & { __issue129ProofDelayCount?: () => number };
    return (testWindow.__issue129ProofDelayCount?.() ?? 0) >= expected;
  }, count);
}

async function releaseCapturedProofDelay(page: Page, index: number) {
  await page.evaluate((callbackIndex) => {
    const testWindow = window as Window & { __issue129ReleaseProofDelay?: (index: number) => void };
    testWindow.__issue129ReleaseProofDelay?.(callbackIndex);
  }, index);
}

async function bringSelectedProofNearPortal(page: Page) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const view = await page.evaluate(() => {
      const target = document.querySelector<HTMLElement>('#projects [data-selected-evidence] .selected-work-evidence-image-frame')!.getBoundingClientRect();
      const proof = document.querySelector<HTMLImageElement>('[data-proof-bridge-image]')!.getBoundingClientRect();
      const headerBottom = document.querySelector<HTMLElement>('.site-header')!.getBoundingClientRect().bottom;
      const viewportHeight = document.documentElement.clientHeight;
      const desiredTop = Math.max(headerBottom + 20, Math.min(proof.top, viewportHeight - target.height - 20));
      const delta = Math.max(-60, Math.min(60, target.top - desiredTop));
      const visible = target.top >= headerBottom + 12 && target.bottom <= viewportHeight - 12 && Math.abs(target.top - proof.top) <= 50;
      if (!visible) window.scrollTo(0, window.scrollY + delta);
      return { visible };
    });
    if (view.visible) return;
    await page.waitForTimeout(20);
  }
}

async function waitForActiveProofFlip(page: Page) {
  await expect.poll(() => page.locator('[data-proof-bridge-image]').getAttribute('data-handoff-state'), { timeout: 10_000 })
    .toBe('flipping');
  await expect.poll(() => page.locator('[data-proof-bridge-image]').evaluate((image) => image.getAnimations().length), { timeout: 5_000 })
    .toBeGreaterThan(0);
}

async function pauseProofFlipAtInitialization(page: Page) {
  await page.addInitScript(() => {
    const nativeAnimate = Element.prototype.animate;
    Element.prototype.animate = function (...args: Parameters<Element['animate']>) {
      const animation = nativeAnimate.apply(this, args);
      if (this instanceof HTMLImageElement && this.matches('[data-proof-bridge-image]')) {
        animation.pause();
        (window as Window & { __issue129PausedProofAnimation?: Animation }).__issue129PausedProofAnimation = animation;
      }
      return animation;
    };
  });
}

async function captureProofTransferDelays(page: Page) {
  await page.addInitScript(() => {
    type TestWindow = Window & {
      __issue129CapturedProofDelays?: Array<() => void>;
      __issue129ReleaseProofDelay?: (index: number) => void;
      __issue129ProofDelayCount?: () => number;
    };
    const testWindow = window as TestWindow;
    const captured: Array<() => void> = [];
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      if (timeout === 320 && typeof handler === 'function') {
        // Keep the native timer cancellable while exposing its callback so the
        // regression can deliberately deliver a stale timeout after rewind.
        captured.push(() => (handler as (...callbackArgs: unknown[]) => void)(...args));
        return nativeSetTimeout(() => {}, 60_000);
      }
      return nativeSetTimeout(handler, timeout, ...args);
    }) as typeof window.setTimeout;
    testWindow.__issue129CapturedProofDelays = captured;
    testWindow.__issue129ReleaseProofDelay = (index) => captured[index]?.();
    testWindow.__issue129ProofDelayCount = () => captured.length;
  });
}

async function captureBrowserEvidence(page: Page, testInfo: { project: { name: string } }, file: string) {
  if (testInfo.project.name === 'chromium') await page.screenshot({ path: `${evidenceDir}/${file}` });
}

test('#129 reduced motion remains terminal after resize and orientation change', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });

  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();
  await moveToProgress(page, 0.40);
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'active');
  await expect(page.locator('html')).toHaveAttribute('data-hero-motion-pending', 'true');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'reduced');
  await expect(page.locator('html')).not.toHaveAttribute('data-hero-motion-pending', 'true');
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.dispatchEvent(new Event('orientationchange')));
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));

  const finalState = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const root = document.documentElement;
    const image = document.querySelector<HTMLImageElement>('#projects [data-selected-evidence] [data-evidence-image]');
    const frame = image?.closest('.selected-work-evidence-image-frame');
    return {
      pending: root.hasAttribute('data-hero-motion-pending'),
      signatureVisible: root.dataset.heroSignatureVisible,
      motionState: hero.dataset.motionState,
      stagePosition: getComputedStyle(hero.querySelector('[data-sequence-stage]')!).position,
      proofInSelectedWorkFrame: Boolean(image && frame?.contains(image)),
      proofPosition: image ? getComputedStyle(image).position : null,
    };
  });
  // Confirm identity across the responsive change, not merely a replacement image.
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
  expect(finalState).toMatchObject({
    pending: false,
    signatureVisible: 'true',
    motionState: 'reduced',
    proofInSelectedWorkFrame: true,
  });
  expect(finalState.stagePosition).not.toBe('sticky');
  expect(finalState.proofPosition).not.toBe('fixed');
  await page.waitForTimeout(100);
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'reduced');
  await expect(page.locator('html')).not.toHaveAttribute('data-hero-motion-pending', 'true');
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('artifacts/visual/issue-129-final-findings', { recursive: true });
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/reduced-motion-resize-orientation.png', animations: 'disabled' });
  }
});

for (const locale of locales) {
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    test(`#129 ${locale.lang} signature composition fits ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      await expect(page.locator('[data-opening-name]')).toHaveText(locale.name);
      await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
      await expect(page.locator('#hero .hero-role')).toHaveText(locale.role);
      await expect(page.locator('#hero .hero-copy')).toHaveText(locale.lead);
      await expect(page.locator('#hero .hero-location')).toHaveText(locale.metadata);
      await expect(page.locator('#hero').getByRole('link', { name: locale.cta })).toHaveAttribute('href', '#projects');
      await expect(page.locator('#hero .hero-github-link')).toHaveAttribute('href', 'https://github.com/sjo1848');
      await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
      await expect(page.locator('#hero [data-proof-bridge-image]')).not.toHaveAttribute('src', /.+/);
      await expect(page.locator('#hero [data-selected-evidence], #hero .hero-proof-links')).toHaveCount(0);

      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        name: document.querySelector('[data-opening-name]')!.getBoundingClientRect().toJSON(),
        thesisLines: [...document.querySelectorAll<HTMLElement>('.hero-thesis-line')].map((line) => line.getBoundingClientRect().toJSON()),
      }));
      expect(geometry.document, 'document horizontal overflow').toBeLessThanOrEqual(width);
      expect(geometry.name.left).toBeGreaterThanOrEqual(0);
      expect(geometry.name.right).toBeLessThanOrEqual(width + 0.5);
      for (const line of geometry.thesisLines) {
        expect(line.left).toBeGreaterThanOrEqual(0);
        expect(line.right).toBeLessThanOrEqual(width + 0.5);
      }

      const sections = await page.locator('main > section').evaluateAll((nodes) => nodes.map((node) => (node as HTMLElement).id));
      expect(sections).toEqual(['hero', 'projects', 'operating-mindset', 'about', 'additional-work', 'contact']);
      expect(errors).toEqual([]);
    });
  }
}

test('#129 desktop S/O travel resolves into the thesis, then reveals the existing header identity', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const brand = page.locator('.site-header [data-signature-brand]');
  await expect(page.locator('[data-opening-name]')).toHaveText('Sebastián Ojeda');
  await expect(brand).toBeHidden();
  await captureBrowserEvidence(page, testInfo, 'en-desktop-identity.png');

  await moveToProgress(page, 0.27);
  await expect(page.locator('[data-flight-glyph="s"]')).toHaveAttribute('data-in-flight', 'true');
  await expect(page.locator('[data-flight-glyph="o"]')).toHaveAttribute('data-in-flight', 'true');
  await expect(page.locator('[data-origin-glyph="s"]')).toHaveAttribute('data-departed', 'true');
  await expect(page.locator('[data-destination-glyph="s"]')).toHaveAttribute('data-arrived', 'false');
  await expect(page.locator('[data-opening-name]')).toHaveCSS('opacity', '0');
  await expect(page.locator('[data-destination-glyph="s"]')).toHaveCSS('visibility', 'hidden');
  await expect(page.locator('[data-destination-rest="s"]')).toHaveCSS('visibility', 'hidden');
  await expect(page.locator('[data-destination-rest="o"]')).toHaveCSS('visibility', 'hidden');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-glyph-travel.png');

  await moveToProgress(page, 0.405);
  await expect(page.locator('[data-flight-glyph]')).toHaveCount(2);
  await expect(page.locator('[data-flight-glyph="s"]')).toHaveAttribute('data-in-flight', 'false');
  await expect(page.locator('[data-flight-glyph="o"]')).toHaveAttribute('data-in-flight', 'false');
  await expect(page.locator('[data-destination-glyph="s"]')).toHaveAttribute('data-arrived', 'true');
  await expect(page.locator('[data-destination-glyph="o"]')).toHaveAttribute('data-arrived', 'true');
  await expect(page.locator('[data-destination-rest="s"]')).toHaveCSS('visibility', 'visible');
  await expect(page.locator('[data-destination-rest="o"]')).toHaveCSS('visibility', 'visible');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-thesis-forming.png');

  await moveToProgress(page, 0.57);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(brand).toBeVisible();
  await expect(page.locator('[data-signature-brand]')).toHaveCount(1);
  await expect(brand).toHaveCSS('white-space', 'nowrap');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-signature-resolved.png');

  const bridge = page.locator('#hero [data-proof-bridge]');
  const bridgeImage = page.locator('[data-proof-bridge-image]');
  const selectedEvidenceImage = page.locator('#projects [data-selected-evidence] [data-evidence-image]');
  const approvedHmsEvidenceSrc = await selectedEvidenceImage.getAttribute('src');
  expect(approvedHmsEvidenceSrc).toBeTruthy();
  await moveToProgress(page, 0.70);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'entering');
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'entering');
  await expect(bridge).toBeVisible();
  await expect(bridge.locator('strong')).toHaveText('HMS Cloudflare');
  await expect(bridge.locator('figcaption')).toContainText('Local regression preview');
  await expect(bridge.locator('.hero-proof-bridge-limitation')).toContainText('do not show remote Product Acceptance or a production release');
  await expect(bridgeImage).toHaveAttribute('src', approvedHmsEvidenceSrc!);
  await expect(bridgeImage).toHaveJSProperty('naturalWidth', 1440);
  expect(await page.evaluate(() => {
    const bridgeObject = document.querySelector('[data-proof-bridge-image]');
    return bridgeObject === document.querySelector('[data-evidence-image]');
  }), 'Hero and Selected Work must share the same HMS proof image node').toBe(true);
  const enteringBox = await bridgeImage.boundingBox();
  expect(enteringBox).not.toBeNull();
  expect(enteringBox!.width).toBeGreaterThan(300);
  expect(enteringBox!.height).toBeGreaterThan(160);
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-entering.png');

  await moveToProgress(page, 0.80);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'dominant');
  await expect(bridge).toBeVisible();
  const dominantBox = await bridgeImage.boundingBox();
  expect(dominantBox).not.toBeNull();
  expect(dominantBox!.width).toBeGreaterThanOrEqual(1440 * 0.35);
  expect(dominantBox!.x + dominantBox!.width).toBeLessThanOrEqual(1441);
  expect(await bridgeImage.evaluate((img) => {
    const image = img as HTMLImageElement;
    return image.complete && image.naturalWidth === 1440;
  })).toBe(true);
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-dominant.png');

  await moveToProgress(page, 0.92);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'settling');
  await expect(bridge).toBeVisible();
  await page.waitForTimeout(520);
  const settlingBox = await bridgeImage.boundingBox();
  expect(settlingBox).not.toBeNull();
  expect(settlingBox!.x).toBeGreaterThan(enteringBox!.x - 20);
  expect(settlingBox!.width).toBeLessThan(dominantBox!.width);
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-settling.png');

  await moveToProgress(page, 0.995);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'waiting-for-selected-work');
  await expect(bridge).toBeHidden();
  await expect(bridgeImage).toHaveAttribute('data-handoff-state', 'approaching-target');
  await bringSelectedProofNearPortal(page);
  // Firefox can complete this short alignment beat between polls. Validate the
  // monotonic terminal outcome and its geometry, not a transient marker.
  await expect.poll(() => page.locator('#projects').getAttribute('data-signature-handoff'), { timeout: 10_000 })
    .toMatch(/^(target-aligned|converged|complete)$/);
  if (await page.locator('#projects').getAttribute('data-signature-handoff') === 'target-aligned') {
    await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-target-aligned.png');
  }
  await expect(selectedEvidenceImage).toHaveAttribute('data-handoff-state', 'complete', { timeout: 10_000 });
  const convergence = await selectedEvidenceImage.evaluate((img) => {
    const imageBounds = img.getBoundingClientRect();
    const targetBounds = img.closest('.selected-work-evidence-image-frame')!.getBoundingClientRect();
    return {
      recordedError: Number((img as HTMLImageElement).dataset.handoffConvergenceErrorPx),
      delta: Math.max(Math.abs(imageBounds.left - targetBounds.left), Math.abs(imageBounds.top - targetBounds.top), Math.abs(imageBounds.width - targetBounds.width), Math.abs(imageBounds.height - targetBounds.height)),
    };
  });
  expect(convergence.recordedError, 'handoff end transform must converge to the actual Selected Work frame').toBeLessThanOrEqual(1);
  expect(convergence.delta).toBeLessThanOrEqual(1);
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-converged.png');

  await expect.poll(() => page.locator('#projects').getAttribute('data-signature-handoff')).toBe('complete');
  await expect(brand).toBeVisible();
  await expect(page.locator('#projects [data-project-index-item]').first()).toContainText('HMS Cloudflare');
  await expect(selectedEvidenceImage).toHaveAttribute('src', approvedHmsEvidenceSrc!);
  await expect.poll(() => selectedEvidenceImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 1440)).toBe(true);
  const settledBox = await selectedEvidenceImage.boundingBox();
  expect(settledBox).not.toBeNull();
  expect(settledBox!.width).toBeGreaterThan(300);
  await expect(selectedEvidenceImage).toHaveAttribute('data-handoff-state', 'complete');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-settled.png');
});

test('#129 reduced motion enabled during the shared proof FLIP restores the image to Selected Work', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await pauseProofFlipAtInitialization(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();
  await moveToProgress(page, 0.70);
  await moveToProgress(page, 0.995);
  await bringSelectedProofNearPortal(page);
  await waitForActiveProofFlip(page);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'reduced');
  await expect.poll(() => page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('#projects [data-selected-evidence] [data-evidence-image]');
    const frame = image?.closest('.selected-work-evidence-image-frame');
    return {
      restored: image?.dataset.handoffState === 'restored',
      sameNode: Boolean(image && frame?.contains(image)),
      staticPosition: image ? getComputedStyle(image).position !== 'fixed' : false,
      activeAnimationCount: image?.getAnimations().filter((animation) => animation.playState === 'running').length ?? -1,
      bridgeHidden: document.querySelector<HTMLElement>('#hero [data-proof-bridge]')?.hidden,
      owner: document.querySelector<HTMLElement>('#projects')?.dataset.signatureHandoffOwner ?? null,
    };
  })).toMatchObject({ restored: true, sameNode: true, staticPosition: true, activeAnimationCount: 0, bridgeHidden: true, owner: null });
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
  await page.waitForTimeout(600);
  await expect(page.locator('#projects [data-selected-evidence] [data-evidence-image]')).toHaveAttribute('data-handoff-state', 'restored');
});

test('#129 desktop-to-mobile resize during the shared proof FLIP restores the image and removes the portal', async ({ page }) => {
  test.setTimeout(60_000);
  await pauseProofFlipAtInitialization(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();
  await moveToProgress(page, 0.70);
  await moveToProgress(page, 0.995);
  await bringSelectedProofNearPortal(page);
  await waitForActiveProofFlip(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('#projects [data-selected-evidence] [data-evidence-image]');
    const frame = image?.closest('.selected-work-evidence-image-frame');
    return {
      restored: image?.dataset.handoffState === 'restored',
      sameNode: Boolean(image && frame?.contains(image)),
      staticPosition: image ? getComputedStyle(image).position !== 'fixed' : false,
      activeAnimationCount: image?.getAnimations().filter((animation) => animation.playState === 'running').length ?? -1,
      bridgeHidden: document.querySelector<HTMLElement>('#hero [data-proof-bridge]')?.hidden,
      reason: document.querySelector<HTMLElement>('#hero')?.dataset.proofHandoffInterruptedBy,
      owner: document.querySelector<HTMLElement>('#projects')?.dataset.signatureHandoffOwner ?? null,
    };
  })).toMatchObject({ restored: true, sameNode: true, staticPosition: true, activeAnimationCount: 0, bridgeHidden: true, reason: 'mobile-breakpoint', owner: null });
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.waitForTimeout(600);
  await expect(page.locator('#projects [data-selected-evidence] [data-evidence-image]')).toHaveAttribute('data-handoff-state', 'restored');
});

test('#129 rewinding from entering restores the shared proof node and keeps Selected Work interactive', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();

  await moveToProgress(page, 0.70);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'entering');
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff-owner', 'shared-image');
  await expect(page.locator('[data-handoff-placeholder]')).toHaveCount(1);
  await expect(page.locator('#hero [data-proof-bridge]')).toBeVisible();
  expect(await proofNode!.evaluate((image) => image === document.querySelector('[data-proof-bridge-image]'))).toBe(true);

  await rewindToProgress(page, 0.67);
  await expect(page.locator('#hero')).not.toHaveAttribute('data-proof-handoff-stage');
  await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
  await assertRewoundProofAndSelectedWorkInteraction(page, proofNode);
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('artifacts/visual/issue-129-final-findings', { recursive: true });
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/f3-rewind-entering-restored.png', animations: 'disabled' });
  }
});

test('#129 rewinding during active proof FLIP cancels transfer and keeps Selected Work interactive', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await pauseProofFlipAtInitialization(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();

  await moveToProgress(page, 0.70);
  await moveToProgress(page, 0.995);
  await bringSelectedProofNearPortal(page);
  await waitForActiveProofFlip(page);
  await expect.poll(() => proofNode!.evaluate((image) => image.getAnimations().some((animation) => animation.playState === 'paused')))
    .toBe(true);
  expect(await proofNode!.evaluate((image) => document.body.contains(image))).toBe(true);
  expect(await proofNode!.evaluate((image) => getComputedStyle(image).position)).toBe('fixed');

  await rewindToProgress(page, 0.67);
  await expect(page.locator('#hero')).not.toHaveAttribute('data-proof-handoff-stage');
  await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
  await assertRewoundProofAndSelectedWorkInteraction(page, proofNode);
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('artifacts/visual/issue-129-final-findings', { recursive: true });
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/f3-rewind-flip-restored.png', animations: 'disabled' });
  }
});

test('#129 rewind from target delay cancels stale completion and replays the same proof cleanly', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await captureProofTransferDelays(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();

  await moveToProgress(page, 0.70);
  await moveToProgress(page, 0.995);
  await bringSelectedProofNearPortal(page);
  await expect(page.locator('[data-proof-bridge-image]')).toHaveAttribute('data-handoff-state', 'target-aligned');
  await waitForCapturedProofDelayCount(page, 1);
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'target-aligned');

  await rewindToProgress(page, 0.92);
  await expectHeroProofAtStage(page, proofNode, 'settling');
  await releaseCapturedProofDelay(page, 0);
  await page.waitForTimeout(500);
  await expectHeroProofAtStage(page, proofNode, 'settling');
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('artifacts/visual/issue-129-final-findings', { recursive: true });
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/f3b-delay-rewind-settling.png', animations: 'disabled' });
  }

  await moveToProgress(page, 0.995);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'waiting-for-selected-work');
  await bringSelectedProofNearPortal(page);
  await waitForCapturedProofDelayCount(page, 2);
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'target-aligned');

  // Deliver the previously canceled callback while the replay's own delay is
  // pending. It must not commit stale state into Selected Work.
  await releaseCapturedProofDelay(page, 0);
  await page.waitForTimeout(30);
  await expect(page.locator('[data-proof-bridge-image]')).toHaveAttribute('data-handoff-state', 'target-aligned');
  expect(await proofNode!.evaluate((image) => document.body.contains(image))).toBe(true);
  await releaseCapturedProofDelay(page, 1);
  await expect(page.locator('#projects [data-selected-evidence] [data-evidence-image]')).toHaveAttribute('data-handoff-state', 'complete', { timeout: 10_000 });
  expect(await proofNode!.evaluate((image) => image === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]')))
    .toBe(true);
  const convergenceError = Number(await proofNode!.getAttribute('data-handoff-convergence-error-px'));
  expect(convergenceError).toBeLessThanOrEqual(1);
  await expect(page.locator('#projects [data-handoff-placeholder]')).toHaveCount(0);
  if (testInfo.project.name === 'chromium') {
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/f3b-clean-forward-replay.png', animations: 'disabled' });
  }
});

test('#129 rewind during active proof FLIP restores the shared image to the dominant Hero stage', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await pauseProofFlipAtInitialization(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const proofNode = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(proofNode).not.toBeNull();

  await moveToProgress(page, 0.70);
  await moveToProgress(page, 0.995);
  await bringSelectedProofNearPortal(page);
  await waitForActiveProofFlip(page);
  expect(await proofNode!.evaluate((image) => image.getAnimations().some((animation) => animation.playState === 'paused')))
    .toBe(true);

  await rewindToProgress(page, 0.80);
  await expectHeroProofAtStage(page, proofNode, 'dominant');
  await page.waitForTimeout(550);
  await expectHeroProofAtStage(page, proofNode, 'dominant');
  if (testInfo.project.name === 'chromium') {
    await page.screenshot({ path: 'artifacts/visual/issue-129-final-findings/f3b-flip-rewind-dominant.png', animations: 'disabled' });
  }
});

test('#129 Spanish mobile sequence keeps glyphs and thesis within the viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/', { waitUntil: 'networkidle' });
  await captureBrowserEvidence(page, testInfo, 'es-mobile-identity.png');
  await moveToProgress(page, 0.27);
  await expect(page.locator('[data-opening-name]')).toHaveCSS('opacity', '0');
  await captureBrowserEvidence(page, testInfo, 'es-mobile-glyph-travel.png');
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', 390);
  const glyphBounds = await page.locator('[data-flight-glyph]').evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().toJSON()));
  for (const bounds of glyphBounds) {
    expect(bounds.left).toBeGreaterThanOrEqual(10);
    expect(bounds.right).toBeLessThanOrEqual(380);
  }
  await moveToProgress(page, 0.57);
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await captureBrowserEvidence(page, testInfo, 'es-mobile-signature-resolved.png');

  const bridge = page.locator('#hero [data-proof-bridge]');
  const approvedHmsEvidenceSrc = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').getAttribute('src');
  expect(approvedHmsEvidenceSrc).toBeTruthy();
  await moveToProgress(page, 0.70);
  await expect(bridge).toBeVisible();
  await expect(bridge.locator('[data-proof-bridge-image]')).toHaveJSProperty('naturalWidth', 1440);
  const mobileProofBox = await bridge.locator('[data-proof-bridge-image]').boundingBox();
  expect(mobileProofBox).not.toBeNull();
  expect(mobileProofBox!.x).toBeGreaterThanOrEqual(0);
  expect(mobileProofBox!.x + mobileProofBox!.width).toBeLessThanOrEqual(390.5);
  await captureBrowserEvidence(page, testInfo, 'es-mobile-proof-dominant.png');

  await moveToProgress(page, 0.92);
  await expect(page.locator('#hero')).toHaveAttribute('data-proof-handoff-stage', 'settling');
  await captureBrowserEvidence(page, testInfo, 'es-mobile-proof-settling.png');
  await moveToProgress(page, 0.995);
  await expect(bridge).toBeHidden();
  const mobileHmsEvidence = page.locator('#projects [data-project-index-item]').first().locator('.selected-work-mobile-evidence img');
  await mobileHmsEvidence.scrollIntoViewIfNeeded();
  await expect(mobileHmsEvidence).toBeVisible();
  await expect(mobileHmsEvidence).toHaveAttribute('src', approvedHmsEvidenceSrc!);
  await expect.poll(() => mobileHmsEvidence.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 1440)).toBe(true);
  await captureBrowserEvidence(page, testInfo, 'es-mobile-proof-settled.png');
});

test('#129 persistent header identity continues through every Home section', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await moveToProgress(page, 0.57);
  const brand = page.locator('.site-header [data-signature-brand]');
  for (const section of ['#projects', '#operating-mindset', '#about', '#additional-work', '#contact']) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await expect(brand, `existing header brand should persist at ${section}`).toBeVisible();
    if (section === '#operating-mindset') {
      await expect(page.locator(section)).toBeInViewport();
      await captureBrowserEvidence(page, testInfo, 'en-desktop-dark-header.png');
    }
  }
  await expect(page.locator('[data-signature-brand]')).toHaveCount(1);
});

test('#129 reduced motion keeps the complete static story and navigation visible', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await expect(page.locator('[data-opening-name]')).toHaveText('Sebastián Ojeda');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('RELIABLE SOFTWARE FOR COMPLEX OPERATIONS');
  await expect(page.locator('.hero-thesis-line')).toHaveCount(3);
  await expect(page.locator('.hero-flight-layer')).toBeHidden();
  await expect(page.locator('#hero')).not.toHaveAttribute('data-motion-state', 'active');
  await expect(page.locator('#hero .hero-copy')).toBeVisible();
  await expect(page.locator('#hero .button-primary')).toBeVisible();
  await expect(page.locator('#projects [data-project-index-item]').first()).toContainText('HMS Cloudflare');
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  await captureBrowserEvidence(page, testInfo, 'en-mobile-reduced-motion.png');
});

test('#129 no-JS fallback preserves the full identity, working nav and all Home sections', async ({ browser }) => {
  test.setTimeout(60_000);
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4184', javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await expect(page.locator('[data-opening-name]')).toHaveText('Sebastián Ojeda');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('RELIABLE SOFTWARE FOR COMPLEX OPERATIONS');
  await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
  await expect(page.locator('#hero [data-selected-evidence]')).toHaveCount(0);
  await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
  await expect(page.locator('#hero [data-proof-bridge-image]')).not.toHaveAttribute('src', /.+/);
  await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
  await expect(page.locator('#operating-mindset li')).toHaveCount(3);
  await expect(page.locator('#additional-work li')).toHaveCount(6);
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect(errors).toEqual([]);
  await context.close();
});

test('#129 opening copy and primary action remain keyboard reachable with visible focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const cta = page.locator('#hero .button-primary');
  await cta.focus();
  await expect(cta).toHaveCSS('outline-style', 'solid');
  await expect(cta).toBeInViewport();
  await cta.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toHaveAttribute('data-handoff-visible', 'true');
});

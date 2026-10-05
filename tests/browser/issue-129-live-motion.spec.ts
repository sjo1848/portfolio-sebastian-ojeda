import { expect, test, type Browser, type Page } from '@playwright/test';
import fs from 'node:fs';

const locales = [
  { key: 'en', path: '/', thesis: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS' },
  { key: 'es', path: '/es/', thesis: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS' },
] as const;

const criticalViewports = [
  { key: '1366x768', width: 1366, height: 768 },
  { key: '1024x768', width: 1024, height: 768 },
  { key: '390x844', width: 390, height: 844 },
  { key: '360x640', width: 360, height: 640 },
] as const;

const outputRoot = 'output/playwright/issue-129-live-motion';

async function initialized(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.heroMotionInitialized === 'true', undefined, { timeout: 8_000 });
}

async function setProgress(page: Page, progress: number) {
  await page.evaluate((target) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: top + length * target, behavior: 'auto' });
  }, progress);
  await page.waitForFunction((target) => Math.abs(Number(document.querySelector<HTMLElement>('#hero')?.dataset.sequenceProgress ?? -1) - target) < 0.001, progress);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function inspectComposition(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const rect = (selector: string) => document.querySelector<HTMLElement>(selector)?.getBoundingClientRect().toJSON() ?? null;
    const visible = (node: Element | null) => {
      if (!node) return false;
      const style = getComputedStyle(node);
      const bounds = node.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden'
        && Number.parseFloat(style.opacity || '1') > 0.08 && bounds.width > 0 && bounds.height > 0;
    };
    const lines = [...hero.querySelectorAll<HTMLElement>('[data-thesis-line]')];
    const bridge = hero.querySelector<HTMLElement>('[data-proof-bridge]');
    const proofVisible = visible(bridge);
    const thesisVisible = lines.some(visible);
    const glyphs = [...hero.querySelectorAll<HTMLElement>('[data-flight-glyph]')];
    const clip = lines.map((line) => line.style.getPropertyValue('--line-clip'));
    const image = document.querySelector<HTMLImageElement>('#projects [data-selected-evidence] [data-evidence-image]');
    const frame = image?.closest('.selected-work-evidence-image-frame');
    return {
      progress: Number(hero.dataset.sequenceProgress),
      composition: hero.dataset.sequenceComposition,
      snap: hero.dataset.sequenceSnap,
      updateMode: hero.dataset.sequenceUpdateMode,
      motionState: hero.dataset.motionState,
      thesisResolved: hero.dataset.thesisResolved,
      signatureVisible: document.documentElement.dataset.heroSignatureVisible === 'true',
      openingVisible: visible(hero.querySelector('[data-opening-name]')),
      proofStage: hero.dataset.proofHandoffStage ?? null,
      proofVisible,
      thesisVisible,
      thesisClip: clip,
      glyphStates: glyphs.map((glyph) => ({
        inFlight: glyph.dataset.inFlight,
        transform: getComputedStyle(glyph).transform,
        rect: glyph.getBoundingClientRect().toJSON(),
      })),
      bridgeRect: rect('#hero [data-proof-bridge]'),
      proofCaptionSize: getComputedStyle(hero.querySelector('figcaption')!).fontSize,
      proofLimitationSize: getComputedStyle(hero.querySelector('.hero-proof-bridge-limitation')!).fontSize,
      heading: rect('#projects #stories-title'),
      header: rect('.site-header'),
      imageRestored: Boolean(image && frame?.contains(image)),
      imagePosition: image ? getComputedStyle(image).position : null,
      placeholders: document.querySelectorAll('[data-handoff-placeholder]').length,
      portalImages: document.querySelectorAll('body > [data-proof-bridge-image]').length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function openAt(page: Page, path: string, viewport: { width: number; height: number }, progress = 0) {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(path, { waitUntil: 'networkidle' });
  await initialized(page);
  await setProgress(page, progress);
}

function captureErrors(page: Page, errors: string[]) {
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
}

test.describe('Issue #129 live scroll-linked motion', () => {
  test.describe.configure({ timeout: 180_000, retries: 0 });

  for (const locale of locales) {
    for (const viewport of criticalViewports) {
      test(`${locale.key} real-transition state and safe insets ${viewport.key}`, async ({ page }, testInfo) => {
        test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
        test.skip(testInfo.project.name !== 'chromium' && viewport.width < 1024, 'Dense responsive motion is Chromium-only; Firefox/WebKit cover desktop boundaries below.');
        const errors: string[] = [];
        captureErrors(page, errors);
        await openAt(page, locale.path, viewport);
        const initial = await inspectComposition(page);
        expect(initial.progress).toBe(0);
        expect(initial.composition).toBe('identity');
        expect(initial.thesisVisible).toBe(true);
        expect(initial.proofVisible).toBe(false);

        const safeBox = await page.locator('#hero .hero-role').boundingBox();
        expect(safeBox).not.toBeNull();
        expect(safeBox!.x, 'Hero role respects compact/tablet/desktop safe inset').toBeGreaterThanOrEqual(viewport.width >= 1200 ? 23 : 15);

        // Slow, real scroll: each increment is below the snap threshold and
        // lasts longer than the CSS transitions, so the choreography remains visible.
        const travelTransforms = new Set<string>();
        const liveTransitions: string[] = [];
        for (let index = 0; index <= 70; index += 1) {
          const progress = 0.10 + index * 0.01;
          await setProgress(page, progress);
          const state = await inspectComposition(page);
          if (progress >= 0.18 && progress <= 0.36) {
            expect(state.glyphStates.every((glyph) => glyph.inFlight === 'true'), `S/O must travel at ${progress}`).toBe(true);
            travelTransforms.add(state.glyphStates.map((glyph) => glyph.transform).join('|'));
            const transition = await page.locator('#hero .hero-opening-name').evaluate((node) => getComputedStyle(node).transitionDuration);
            liveTransitions.push(transition);
          }
          if (progress >= 0.47 && progress <= 0.66) {
            expect(state.thesisClip.every((clip) => clip === '0%'), `thesis is fully resolved at ${progress}`).toBe(true);
            expect(state.thesisResolved).toBe('true');
          }
          if (progress >= 0.705) {
            expect(state.thesisVisible, `proof stage ${progress} must not compete with thesis`).toBe(false);
          }
          expect(state.overflow, `horizontal overflow at ${progress}`).toBeLessThanOrEqual(0);
          if (testInfo.project.name === 'chromium' && [1366, 1024, 390, 360].includes(viewport.width)
            && [0.30, 0.50, 0.80].some((capture) => Math.abs(progress - capture) < 0.0001)) {
            const folder = `${outputRoot}/${locale.key}/${viewport.key}`;
            fs.mkdirSync(folder, { recursive: true });
            const stateName = progress < 0.4 ? 'live-travel' : progress < 0.7 ? 'live-resolved' : 'live-proof-dominant';
            await page.screenshot({ path: `${folder}/${stateName}.png` });
          }
        }
        expect(travelTransforms.size, 'S/O transforms change continuously during real scroll').toBeGreaterThan(3);
        expect(liveTransitions.some((duration) => duration !== '0s'), 'CSS transitions stay enabled during slow scroll').toBe(true);

        const resolved = await inspectComposition(page);
        expect(resolved.composition).toBe('proof');
        expect(resolved.thesisVisible).toBe(false);
        if (viewport.width < 1024) {
          expect(resolved.proofVisible).toBe(true);
          expect(Number.parseFloat(resolved.proofCaptionSize)).toBeGreaterThanOrEqual(12.5);
          expect(Number.parseFloat(resolved.proofLimitationSize)).toBeGreaterThanOrEqual(12.5);
        }

        // Native Selected Work entry must clear the persistent sticky header.
        await page.locator('#projects #stories-title').scrollIntoViewIfNeeded();
        const handoff = await inspectComposition(page);
        expect(handoff.heading!.top).toBeGreaterThanOrEqual(handoff.header!.bottom + 4);
        expect(errors).toEqual([]);

        if (testInfo.project.name === 'chromium' && [1366, 1024, 390, 360].includes(viewport.width)) {
          const folder = `${outputRoot}/${locale.key}/${viewport.key}`;
          fs.mkdirSync(folder, { recursive: true });
          fs.writeFileSync(`${folder}/manifest.json`, JSON.stringify({ locale: locale.key, viewport, transitions: 'enabled', scrollLinked: true, screenshots: ['live-travel.png', 'live-resolved.png', 'live-proof-dominant.png'] }, null, 2));
        }
      });
    }
  }

  for (const locale of locales) {
    for (const viewport of criticalViewports) {
      test(`${locale.key} fast/reverse jumps land coherently ${viewport.key}`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'chromium', 'Fast-jump stress is Chromium-only; Firefox/WebKit run the critical composition-boundary tests.');
        const errors: string[] = [];
        captureErrors(page, errors);
        const cases = [
          { from: 0, to: 0.40, expected: 'resolved' },
          { from: 0.10, to: 0.60, expected: 'resolved' },
          { from: 0.30, to: 0.80, expected: 'proof' },
          { from: 0, to: 1, expected: 'proof' },
          { from: 0.85, to: 0.25, expected: 'identity' },
        ] as const;
        for (const scenario of cases) {
          await openAt(page, locale.path, viewport);
          if (scenario.from !== 0) await setProgress(page, scenario.from);
          await setProgress(page, scenario.to);
          const state = await inspectComposition(page);
          expect(state.composition).toBe(scenario.expected);
          expect(state.updateMode).toBe('jump');
          expect(state.overflow).toBeLessThanOrEqual(0);
          if (scenario.to === 0.40) {
            expect(state.thesisResolved).toBe('true');
            expect(state.thesisClip.every((clip) => clip === '0%')).toBe(true);
            expect(state.signatureVisible).toBe(true);
          }
          if (scenario.to === 0.60) {
            expect(state.thesisResolved).toBe('true');
            expect(state.thesisClip.every((clip) => clip === '0%')).toBe(true);
          }
          if (scenario.to === 0.80 || scenario.to === 1) {
            expect(state.thesisVisible).toBe(false);
            if (scenario.to < 1) expect(state.proofVisible).toBe(true);
          }
          if (scenario.to === 0.25) {
            expect(state.glyphStates.every((glyph) => glyph.inFlight !== 'true'), 'reverse jump lands in a stable identity composition instead of freezing S/O mid-flight').toBe(true);
            expect(state.openingVisible).toBe(true);
            expect(state.thesisClip.every((clip) => clip === '100%'), 'the reverse landing does not leave a partially revealed thesis').toBe(true);
            await setProgress(page, 0.24);
            const final = await inspectComposition(page);
            expect(final.composition).toBe('identity');
            expect(final.glyphStates.every((glyph) => glyph.inFlight !== 'true')).toBe(true);
            expect(final.openingVisible).toBe(true);
            expect(final.thesisClip.every((clip) => clip === '100%')).toBe(true);
            expect(final.proofVisible).toBe(false);
            expect(final.signatureVisible).toBe(false);
          }
        }
        expect(errors).toEqual([]);
      });
    }
  }

  test('F6 breakpoint changes reapply the mobile proof composition without another scroll', async ({ page }, testInfo) => {
    test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
    for (const progress of [0.72, 0.82, 0.92]) {
      await openAt(page, '/', { width: 1440, height: 900 });
      const sharedImage = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
      expect(sharedImage).not.toBeNull();
      await setProgress(page, progress);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForFunction(() => document.querySelector<HTMLElement>('#hero')?.dataset.proofHandoffInterruptedBy === 'mobile-breakpoint');
      const state = await inspectComposition(page);
      if (progress < 0.985) {
        expect(state.proofVisible, `mobile fallback visible at progress ${progress}`).toBe(true);
        expect(await page.locator('#hero [data-proof-bridge-fallback]').isVisible()).toBe(true);
      }
      expect(state.imageRestored).toBe(true);
      expect(state.placeholders).toBe(0);
      expect(state.portalImages).toBe(0);
      expect(await sharedImage!.evaluate((node) => node === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
      expect(state.overflow).toBeLessThanOrEqual(0);
    }
  });

  test('F7 runtime reduced motion atomically normalizes identity, travel, resolved and proof frames', async ({ page }, testInfo) => {
    test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
    for (const progress of [0, 0.22, 0.42, 0.58, 0.80]) {
      await openAt(page, '/', { width: 1366, height: 768 });
      const sharedImage = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
      expect(sharedImage).not.toBeNull();
      await setProgress(page, progress);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'reduced');
      await expect(page.locator('html')).not.toHaveAttribute('data-hero-motion-pending', 'true');
      await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
      await expect(page.locator('#hero [data-opening-name]')).toBeVisible();
      await expect(page.getByRole('heading', { name: localeThesis(localeForPath(page.url())), level: 1 })).toBeVisible();
      await expect(page.locator('#hero .hero-copy')).toBeVisible();
      await expect(page.locator('#hero .button-primary')).toBeVisible();
      const state = await inspectComposition(page);
      expect(state.imageRestored).toBe(true);
      expect(state.placeholders).toBe(0);
      expect(state.portalImages).toBe(0);
      expect(state.overflow).toBeLessThanOrEqual(0);
      expect(await sharedImage!.evaluate((node) => node === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
      const cleanup = await page.evaluate(() => ({
        stagePosition: getComputedStyle(document.querySelector('#hero [data-sequence-stage]')!).position,
        lineClips: [...document.querySelectorAll<HTMLElement>('#hero [data-thesis-line]')].map((line) => line.style.getPropertyValue('--line-clip')),
        glyphTransforms: [...document.querySelectorAll<HTMLElement>('#hero [data-flight-glyph]')].map((glyph) => glyph.style.transform),
        composition: document.querySelector<HTMLElement>('#hero')!.dataset.sequenceComposition,
        proofStage: document.querySelector<HTMLElement>('#hero')!.dataset.proofHandoffStage,
      }));
      expect(cleanup.stagePosition).not.toBe('sticky');
      expect(cleanup.lineClips.every((clip) => clip === '')).toBe(true);
      expect(cleanup.glyphTransforms.every((transform) => transform === '')).toBe(true);
      expect(cleanup.composition).toBe('static');
      expect(cleanup.proofStage).toBeUndefined();
      if (testInfo.project.name === 'chromium' && progress === 0.80) {
        fs.mkdirSync(outputRoot, { recursive: true });
        await page.screenshot({ path: `${outputRoot}/reduced-motion-runtime-normalized.png` });
      }
    }
  });

  for (const locale of locales) {
    test(`${locale.key} records live slow and fast/reverse motion with transitions enabled`, async ({ browser }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium', 'Human-viewable runtime recordings are captured in Chromium.');
      const viewport = locale.key === 'en' ? { width: 1366, height: 768 } : { width: 360, height: 640 };
      const context = await createRecordingContext(browser, viewport, outputRoot);
      const page = await context.newPage();
      const errors: string[] = [];
      captureErrors(page, errors);
      await page.goto(locale.path, { waitUntil: 'networkidle' });
      await initialized(page);
      await setProgress(page, 0.10);
      for (let step = 11; step <= 85; step += 1) {
        await scrollProgressWithoutFrameWait(page, step / 100);
        await page.waitForTimeout(24);
      }
      // Reverse through the same scroll-linked path, then exercise jumps that
      // intentionally skip intermediate states and settle at the destination.
      for (let step = 84; step >= 25; step -= 1) {
        await scrollProgressWithoutFrameWait(page, step / 100);
        await page.waitForTimeout(18);
      }
      for (const progress of [0.40, 0.60, 0.80, 1, 0.25]) {
        await setProgress(page, progress);
        await page.waitForTimeout(280);
      }
      expect(errors).toEqual([]);
      const video = page.video();
      expect(video).not.toBeNull();
      await context.close();
      fs.mkdirSync(`${outputRoot}/recordings`, { recursive: true });
      await video!.saveAs(`${outputRoot}/recordings/${locale.key}-${viewport.width}x${viewport.height}-slow-fast-reverse.webm`);
    });
  }
});

function localeForPath(url: string) {
  return url.includes('/es/') ? 'es' : 'en';
}

function localeThesis(locale: string) {
  return locale === 'es' ? locales[1].thesis : locales[0].thesis;
}

async function scrollProgressWithoutFrameWait(page: Page, progress: number) {
  await page.evaluate((target) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: top + length * target, behavior: 'auto' });
  }, progress);
  await page.waitForFunction((target) => Math.abs(Number(document.querySelector<HTMLElement>('#hero')?.dataset.sequenceProgress ?? -1) - target) < 0.001, progress);
}

async function createRecordingContext(browser: Browser, viewport: { width: number; height: number }, root: string) {
  fs.mkdirSync(`${root}/recordings`, { recursive: true });
  return browser.newContext({
    baseURL: 'http://127.0.0.1:4184',
    viewport,
    reducedMotion: 'no-preference',
    recordVideo: { dir: `${root}/recordings` },
  });
}

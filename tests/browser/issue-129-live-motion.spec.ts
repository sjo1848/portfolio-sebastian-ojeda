import { expect, test, type Page } from '@playwright/test';

const locales = [
  { key: 'en', path: '/', thesis: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS' },
  { key: 'es', path: '/es/', thesis: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS' },
] as const;
const viewports = [
  { width: 1366, height: 768 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
] as const;

async function ready(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.heroMotionInitialized === 'true');
}
async function progress(page: Page, value: number) {
  await page.evaluate((target) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + scrollY;
    const length = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: top + length * target, behavior: 'auto' });
  }, value);
  await page.waitForFunction((target) => Math.abs(Number(document.querySelector<HTMLElement>('#hero')!.dataset.sequenceProgress) - target) < 0.001, value);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}
async function snapshot(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const thesis = hero.querySelector<HTMLElement>('[data-hero-thesis]')!;
    const proof = hero.querySelector<HTMLElement>('[data-proof-bridge]')!;
    const image = proof.querySelector<HTMLImageElement>('[data-proof-project="hms-cloudflare"]');
    const selectedImage = document.querySelector('#projects [data-selected-evidence] [data-evidence-image]');
    const visible = (node: Element) => {
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.05 && box.width > 0 && box.height > 0;
    };
    return {
      progress: Number(hero.dataset.sequenceProgress),
      composition: hero.dataset.sequenceComposition,
      motion: hero.dataset.motionState,
      proofVisible: !proof.hidden && visible(proof),
      thesisVisible: visible(thesis),
      thesisClip: [...hero.querySelectorAll<HTMLElement>('[data-thesis-line]')].map((line) => line.style.getPropertyValue('--line-clip')),
      proofSrc: image?.getAttribute('src') ?? null,
      proofProject: image?.dataset.proofProject ?? null,
      sameImage: Boolean(image && selectedImage === image),
      placeholderCount: document.querySelectorAll('[data-handoff-placeholder]').length,
      portalCount: document.querySelectorAll('body > [data-proof-bridge-image]').length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}
async function open(page: Page, path: string, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(path, { waitUntil: 'networkidle' });
  await ready(page);
}

for (const locale of locales) {
  for (const viewport of viewports) {
    test(`${locale.key} ${viewport.width}x${viewport.height}: scroll-derived composition and slow travel`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium' && viewport.width < 1024, 'Firefox/WebKit cover critical desktop boundaries only.');
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await open(page, locale.path, viewport);
      let state = await snapshot(page);
      expect(state.composition).toBe('identity');
      expect(state.overflow).toBeLessThanOrEqual(0);

      const transforms = new Set<string>();
      for (let step = 10; step <= 98; step += 4) {
        await progress(page, step / 100);
        state = await snapshot(page);
        expect(state.overflow).toBeLessThanOrEqual(0);
        if (step >= 18 && step <= 36) {
          const glyphs = await page.locator('#hero [data-flight-glyph]').evaluateAll((nodes) => nodes.map((node) => (node as HTMLElement).style.transform));
          expect(glyphs.every(Boolean)).toBe(true);
          transforms.add(glyphs.join('|'));
        }
        expect(state.proofVisible && state.thesisVisible, `thesis/proof overlap at ${step}%`).toBe(false);
      }
      expect(transforms.size).toBeGreaterThan(3);
      expect(state.composition).toBe('handoff');
      expect(errors).toEqual([]);

      await progress(page, 0.8);
      state = await snapshot(page);
      expect(state.composition).toBe('proof');
      expect(state.proofVisible).toBe(true);
      expect(state.thesisVisible).toBe(false);
      expect(state.proofProject).toBe('hms-cloudflare');
      expect(state.proofSrc).toBeTruthy();
      expect(state.sameImage).toBe(false);
      expect(state.placeholderCount).toBe(0);
      expect(state.portalCount).toBe(0);
    });
  }
}

for (const locale of locales) {
  for (const viewport of viewports) {
    test(`${locale.key} ${viewport.width}x${viewport.height}: fast jumps, reverse and breakpoint recompute`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium', 'Jump stress uses Chromium; Firefox/WebKit run composition boundaries below.');
      await open(page, locale.path, viewport);
      for (const [from, to, expected] of [
        [0, 0.4, 'resolved'], [0.1, 0.6, 'resolved'], [0.3, 0.8, 'proof'],
        [0, 1, 'handoff'], [0.85, 0.25, 'travel'],
      ] as const) {
        await progress(page, from);
        await progress(page, to);
        const state = await snapshot(page);
        expect(state.composition).toBe(expected);
        expect(state.proofVisible && state.thesisVisible).toBe(false);
        if (to >= 0.39 && to < 0.68) expect(state.thesisClip.every((clip) => clip === '0%')).toBe(true);
        expect(state.overflow).toBeLessThanOrEqual(0);
      }

      await progress(page, 0.8);
      await page.setViewportSize({ width: viewport.width >= 1024 ? 390 : 1366, height: viewport.width >= 1024 ? 844 : 768 });
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const resized = await snapshot(page);
      const expectedAfterResize = resized.progress < 0.15 ? 'identity'
        : resized.progress < 0.39 ? 'travel'
          : resized.progress < 0.68 ? 'resolved'
            : resized.progress < 0.72 ? 'transition'
              : resized.progress < 0.97 ? 'proof' : 'handoff';
      expect(resized.composition).toBe(expectedAfterResize);
      expect(resized.proofVisible && resized.thesisVisible).toBe(false);
      expect(resized.overflow).toBeLessThanOrEqual(0);
      // Re-land on the same logical scroll sample after geometry changed.
      await progress(page, 0.8);
      const after = await snapshot(page);
      expect(after.composition).toBe('proof');
      expect(after.proofVisible).toBe(true);
      expect(after.proofProject).toBe('hms-cloudflare');
      expect(after.overflow).toBeLessThanOrEqual(0);
    });
  }
}

for (const locale of locales) {
  test(`${locale.key}: reduced motion is static initially and when activated mid-sequence`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium' && info.project.name !== 'firefox' && info.project.name !== 'webkit');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await ready(page);
    let state = await snapshot(page);
    expect(state.motion).toBe('reduced');
    expect(state.composition).toBe('static');
    expect(state.proofVisible).toBe(false);

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload({ waitUntil: 'networkidle' });
    await ready(page);
    await progress(page, 0.8);
    expect((await snapshot(page)).proofVisible).toBe(true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('#hero')).toHaveAttribute('data-sequence-composition', 'static');
    state = await snapshot(page);
    expect(state.motion).toBe('reduced');
    expect(state.proofVisible).toBe(false);
    expect(state.overflow).toBeLessThanOrEqual(0);
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.getByRole('heading', { name: locale.thesis, level: 1 })).toBeVisible();
  });
}

for (const locale of locales) {
  test(`${locale.key}: Firefox/WebKit proof and rewind boundaries remain deterministic`, async ({ page }, info) => {
    test.skip(info.project.name === 'chromium', 'Chromium covers the dense viewport and jump matrix.');
    await open(page, locale.path, { width: 1366, height: 768 });
    await progress(page, 0.8);
    expect((await snapshot(page)).proofVisible).toBe(true);
    await progress(page, 0.25);
    const state = await snapshot(page);
    expect(state.composition).toBe('travel');
    expect(state.proofVisible).toBe(false);
    expect(state.sameImage).toBe(false);
    expect(state.placeholderCount).toBe(0);
    expect(state.portalCount).toBe(0);
  });
}

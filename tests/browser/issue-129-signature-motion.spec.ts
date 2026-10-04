import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
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

async function captureBrowserEvidence(page: Page, testInfo: { project: { name: string } }, file: string) {
  if (testInfo.project.name === 'chromium') await page.screenshot({ path: `${evidenceDir}/${file}` });
}

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
    if (view.visible) break;
    await page.waitForTimeout(20);
  }
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'target-aligned', { timeout: 10_000 });
  await captureBrowserEvidence(page, testInfo, 'en-desktop-proof-target-aligned.png');
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

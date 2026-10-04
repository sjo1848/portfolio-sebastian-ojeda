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
      await expect(page.locator('#hero figure, #hero [data-selected-evidence], #hero .hero-proof-links')).toHaveCount(0);

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
  await captureBrowserEvidence(page, testInfo, 'en-desktop-glyph-travel.png');

  await moveToProgress(page, 0.405);
  await expect(page.locator('[data-flight-glyph]')).toHaveCount(2);
  await expect(page.locator('[data-flight-glyph="s"]')).toHaveAttribute('data-in-flight', 'false');
  await expect(page.locator('[data-flight-glyph="o"]')).toHaveAttribute('data-in-flight', 'false');
  await expect(page.locator('[data-destination-glyph="s"]')).toHaveAttribute('data-arrived', 'true');
  await expect(page.locator('[data-destination-glyph="o"]')).toHaveAttribute('data-arrived', 'true');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-thesis-forming.png');

  await moveToProgress(page, 0.57);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(brand).toBeVisible();
  await expect(page.locator('[data-signature-brand]')).toHaveCount(1);
  await expect(brand).toHaveCSS('white-space', 'nowrap');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-signature-resolved.png');

  await moveToProgress(page, 0.72);
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'ready');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(brand).toBeVisible();
  await expect(page.locator('#projects [data-project-index-item]').first()).toContainText('HMS Cloudflare');
  await captureBrowserEvidence(page, testInfo, 'en-desktop-hms-proof-handoff.png');
});

test('#129 Spanish mobile sequence keeps glyphs and thesis within the viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/', { waitUntil: 'networkidle' });
  await captureBrowserEvidence(page, testInfo, 'es-mobile-identity.png');
  await moveToProgress(page, 0.27);
  await captureBrowserEvidence(page, testInfo, 'es-mobile-glyph-travel.png');
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', 390);
  const glyphBounds = await page.locator('[data-flight-glyph]').evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().toJSON()));
  for (const bounds of glyphBounds) {
    expect(bounds.left).toBeGreaterThanOrEqual(-0.5);
    expect(bounds.right).toBeLessThanOrEqual(390.5);
  }
  await moveToProgress(page, 0.57);
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await captureBrowserEvidence(page, testInfo, 'es-mobile-signature-resolved.png');
});

test('#129 persistent header identity continues through every Home section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await moveToProgress(page, 0.57);
  const brand = page.locator('.site-header [data-signature-brand]');
  for (const section of ['#projects', '#operating-mindset', '#about', '#additional-work', '#contact']) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await expect(brand, `existing header brand should persist at ${section}`).toBeVisible();
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
  await expect(page.locator('#hero [data-selected-evidence], #hero figure')).toHaveCount(0);
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

import { expect, test } from '@playwright/test';

const locales = [
  {
    path: '/', lang: 'en', headline: 'SYSTEMS BUILT FOR THE REAL WORLD',
    eyebrow: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED',
    lead: 'I turn operational workflows into reliable software.',
    metadata: 'Mendoza, Argentina · Remote-first', cta: 'View selected work',
  },
  {
    path: '/es/', lang: 'es', headline: 'SISTEMAS PARA EL MUNDO REAL',
    eyebrow: 'DESARROLLADOR FULL-STACK · FOCO BACKEND',
    lead: 'Convierto procesos operativos en software confiable.',
    metadata: 'Mendoza, Argentina · Remoto prioritario', cta: 'Ver trabajo seleccionado',
  },
] as const;

for (const locale of locales) {
  for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
    test(`Issue #127 A+ ${locale.lang} hero fits ${width}px without hiding copy`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      await page.setViewportSize({ width, height: width < 500 ? 844 : 960 });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      const hero = page.locator('#hero');
      await expect(hero.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.headline);
      await expect(hero.locator('.eyebrow')).toHaveText(locale.eyebrow);
      await expect(hero.locator('.hero-copy')).toHaveText(locale.lead);
      await expect(hero.locator('.hero-location')).toHaveText(locale.metadata);
      await expect(hero.getByRole('link', { name: locale.cta })).toHaveAttribute('href', '#projects');
      await expect(hero.getByRole('link', { name: 'GitHub ↗' })).toHaveAttribute('href', 'https://github.com/sjo1848');
      await expect(hero.getByRole('link', { name: /resume|cv|currículum/i })).toHaveCount(0);

      const order = await hero.locator('.brand-hero-copy').evaluate((copy) => {
        const nodes = [...copy.children];
        return ['eyebrow', 'brand-headline', 'hero-system-signal', 'hero-copy', 'hero-location', 'hero-actions']
          .map((className) => nodes.findIndex((node) => node.classList.contains(className)));
      });
      expect(order).toEqual([0, 1, 2, 3, 4, 5]);

      await page.waitForTimeout(760);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const lines = await hero.locator('.hero-title-line').evaluateAll((elements) => elements.map((element) => {
        const bounds = element.getBoundingClientRect();
        return { left: bounds.left, right: bounds.right };
      }));
      for (const bounds of lines) {
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(width + 0.5);
      }
    });
  }
}

test('Issue #127 A+ reduced motion renders the complete settled hero immediately', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#hero .hero-copy')).toBeVisible();
  const state = await page.evaluate(() => ({
    titleAnimation: getComputedStyle(document.querySelector('.brand-headline .hero-title-line')!).animationName,
    signalOffset: getComputedStyle(document.querySelector('.signal-trace')!).strokeDashoffset,
    leadTransform: getComputedStyle(document.querySelector('.hero-copy')!).transform,
  }));
  expect(state.titleAnimation).toBe('none');
  expect(Number.parseFloat(state.signalOffset)).toBe(0);
  expect(state.leadTransform).toBe('none');
});

test('Issue #127 A+ hero motion stays within the approved desktop and mobile distances', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const offsetsAt = async (width: number) => {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    return page.locator('.hero-title-line').evaluateAll((lines) => lines.map((line) =>
      Number.parseFloat(getComputedStyle(line).getPropertyValue('--hero-line-offset')),
    ));
  };
  const desktopOffsets = await offsetsAt(1440);
  expect(desktopOffsets).toEqual([-18, 18, -12]);
  const mobileOffsets = await offsetsAt(390);
  expect(mobileOffsets).toEqual([-8, 8, -6]);
});

test('Issue #127 A+ CTA has visible keyboard focus, matching hover feedback and a 380ms handoff', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const cta = page.locator('#hero .button-primary');
  const arrow = cta.locator('.hero-cta-arrow');
  await cta.focus();
  await expect(cta).toHaveCSS('outline-style', 'solid');
  const focusTransform = await arrow.evaluate((element) => getComputedStyle(element).transform);
  expect(focusTransform).not.toBe('none');
  await cta.blur();
  await cta.hover();
  await expect.poll(() => arrow.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');

  await cta.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toHaveAttribute('data-handoff-enhanced', 'true');
  await expect(page.locator('#projects')).toHaveAttribute('data-handoff-visible', 'true');
  const handoff = await page.locator('#projects').evaluate((element) => ({
    sectionPosition: getComputedStyle(element).position,
    duration: getComputedStyle(element, '::before').transitionDuration,
  }));
  expect(handoff.sectionPosition).toBe('relative');
  expect(handoff.duration).toBe('0.38s');
});

test('Issue #127 A+ remains readable with JavaScript disabled', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('SYSTEMS BUILT FOR THE REAL WORLD');
  await expect(page.locator('#hero .hero-copy')).toHaveText('I turn operational workflows into reliable software.');
  await expect(page.locator('#hero .button-primary')).toBeVisible();
  await context.close();
});

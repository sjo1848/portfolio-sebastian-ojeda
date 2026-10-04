import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const homeRoutes = [
  { lang: 'en', path: '/', leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'] },
  { lang: 'es', path: '/es/', leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'] },
] as const;
const widths = [360, 390, 430, 768, 1024, 1440];

for (const route of homeRoutes) {
  for (const width of widths) {
    test(`Issue 116 I1 Home structure at ${route.lang} ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      const consoleErrors: string[] = [];
      page.on('pageerror', (error) => consoleErrors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      await page.goto(route.path, { waitUntil: 'networkidle' });

      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toHaveAccessibleName(route.lang === 'en' ? 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS' : 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS');
      await expect(page.locator('.brand-hero-evidence, .hero-proof-links')).toHaveCount(0);
      await expect(page.locator('#hero').getByRole('link', { name: route.lang === 'en' ? 'View selected work' : 'Ver trabajo seleccionado' })).toHaveAttribute('href', '#projects');
      await expect(page.locator('#hero').getByRole('link', { name: /resume|cv|currículum/i })).toHaveCount(0);
      await expect(page.locator('.hero-github-link')).toBeVisible();

      const leadRows = page.locator('#projects [data-project-index-item]');
      await expect(leadRows).toHaveCount(3);
      for (let index = 0; index < route.leadTitles.length; index += 1) {
        await expect(leadRows.nth(index).getByRole('heading', { level: 3 })).toContainText(route.leadTitles[index]);
        await expect(leadRows.nth(index).locator('.selected-work-case-link')).toBeVisible();
      }
      const selectedWorkImage = page.locator('#projects .selected-work-mobile-evidence img');
      await expect(selectedWorkImage).toHaveAttribute('src', /cf-i04-reception-cover-authorized\.png$/);
      await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);

      if ([390, 1440].includes(width)) {
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
      }
      expect(consoleErrors).toEqual([]);
    });
  }
}

test('Issue 116 I1 reduced motion keeps the new Home content visible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#operating-mindset li')).toHaveCount(3);
  await expect(page.locator('.brand-hero-evidence, .hero-proof-links')).toHaveCount(0);
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    buttonTransition: getComputedStyle(document.querySelector('.button-primary')!).transitionDuration,
    selectedWorkTransition: getComputedStyle(document.querySelector('.selected-work-row')!).transitionDuration,
  }));
  expect(motion.scroll).toBe('auto');
  expect(motion.buttonTransition.split(',').every((duration) => Number.parseFloat(duration) <= 0.00002)).toBe(true);
  expect(motion.selectedWorkTransition.split(',').every((duration) => Number.parseFloat(duration) <= 0.00002)).toBe(true);
});

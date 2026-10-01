import { expect, test } from '@playwright/test';

const routes = ['/', '/es/'] as const;
const widths = [360, 390, 430, 768, 1024, 1440] as const;

test('I3 hero settles without clipping and stays static for reduced motion', async ({ page }) => {
  // This contract intentionally checks both locales across the full width matrix.
  test.setTimeout(60_000);
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(route);
      await expect(page.locator('[data-motion-hero] .hero-title-line')).toHaveCount(3);
      await page.waitForTimeout(820);
      const geometry = await page.locator('[data-motion-hero]').evaluate((heading) => {
        const rect = heading.getBoundingClientRect();
        const lines = [...heading.querySelectorAll<HTMLElement>('.hero-title-line')].map((line) => {
          const box = line.getBoundingClientRect();
          return { left: box.left, right: box.right };
        });
        return { left: rect.left, right: rect.right, scrollWidth: document.documentElement.scrollWidth, lines };
      });
      expect(geometry.scrollWidth, `${route} ${width}px document overflow`).toBeLessThanOrEqual(width);
      expect(geometry.lines.every((line) => line.left >= 0 && line.right <= width), `${route} ${width}px title line overflow`).toBe(true);
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const reducedState = await page.locator('[data-motion-hero] .hero-title-line').first().evaluate((line) => ({
    animationName: getComputedStyle(line).animationName,
    transform: getComputedStyle(line).transform,
  }));
  expect(reducedState.animationName).toBe('none');
  expect(reducedState.transform).toBe('none');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('FULL-STACKSOFTWAREDEVELOPER');
});

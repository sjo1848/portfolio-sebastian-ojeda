import { expect, test } from '@playwright/test';

const routes = ['/', '/es/'] as const;
const widths = [360, 390, 430, 768, 1024, 1440] as const;

test('I3 Hero editorial composition remains within the viewport at legacy responsive widths', async ({ page }) => {
  test.setTimeout(60_000);
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(route);
      await expect(page.locator('#hero .hero-thesis')).toBeVisible();
      await expect(page.locator('#hero .hero-opening-name')).toBeVisible();
      const geometry = await page.locator('.hero-thesis').evaluate((heading) => {
        const rect = heading.getBoundingClientRect();
        return { left: rect.left, right: rect.right, scrollWidth: document.documentElement.scrollWidth };
      });
      expect(geometry.scrollWidth, `${route} ${width}px document overflow`).toBeLessThanOrEqual(width);
      expect(geometry.left, `${route} ${width}px title left edge`).toBeGreaterThanOrEqual(0);
      expect(geometry.right, `${route} ${width}px title right edge`).toBeLessThanOrEqual(width);
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('I build the systems behind real work.');
  await expect(page.locator('#hero [data-sequence-stage]')).toHaveCount(0);
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
});

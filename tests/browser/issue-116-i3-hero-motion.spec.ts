import { expect, test } from '@playwright/test';

const routes = ['/', '/es/'] as const;
const widths = [360, 390, 430, 768, 1024, 1440] as const;

test('I3 Hero layout remains within the viewport; #129 reduced motion keeps the signature static', async ({ page }) => {
  test.setTimeout(60_000);
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(route);
      await expect(page.locator('.hero-thesis-line')).toHaveCount(3);
      const geometry = await page.locator('.hero-thesis').evaluate((heading) => {
        const rect = heading.getBoundingClientRect();
        const lines = [...heading.querySelectorAll<HTMLElement>('.hero-thesis-line')].map((line) => {
          const box = line.getBoundingClientRect();
          return { left: box.left, right: box.right };
        });
        return { left: rect.left, right: rect.right, scrollWidth: document.documentElement.scrollWidth, lines };
      });
      expect(geometry.scrollWidth, `${route} ${width}px document overflow`).toBeLessThanOrEqual(width);
      expect(geometry.lines.every((line) => line.left >= 0 && line.right <= width), `${route} ${width}px title line overflow: ${JSON.stringify(geometry.lines)}`).toBe(true);
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('RELIABLE SOFTWARE FOR COMPLEX OPERATIONS');
  await expect(page.locator('.hero-flight-layer')).toBeHidden();
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
});

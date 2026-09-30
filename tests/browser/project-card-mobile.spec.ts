import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const routes = [
  { name: 'en', path: '/', label: 'View case study' },
  { name: 'es', path: '/es/', label: 'Ver caso de estudio' },
] as const;
const widths = [360, 390, 430] as const;

for (const route of routes) {
  for (const width of widths) {
    test(`${route.name} selected-work case-study links remain clear at ${width}px`, async ({ page }, testInfo) => {
      test.setTimeout(60_000);
      test.skip(!['chromium', 'mobile-webkit'].includes(testInfo.project.name));
      await page.setViewportSize({ width, height: 844 });
      const errors: string[] = [];
      page.on('console', (message) => { if (message.type() === 'error' || message.type() === 'warning') errors.push(`${message.type()}: ${message.text()}`); });
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.locator('#projects').scrollIntoViewIfNeeded();

      const rows = page.locator('#projects a.selected-work-row');
      await expect(rows).toHaveCount(3);
      const hrefs = [
        route.path === '/' ? '/projects/hms-cloudflare/' : '/es/projects/hms-cloudflare/',
        route.path === '/' ? '/projects/alquileres-uspa/' : '/es/projects/alquileres-uspa/',
        route.path === '/' ? '/projects/ai-commerce-platform/' : '/es/projects/ai-commerce-platform/',
      ];
      for (let index = 0; index < 3; index += 1) {
        const row = rows.nth(index);
        await expect(row).toHaveAttribute('href', hrefs[index]);
        await expect(row.locator('.selected-work-case-link')).toContainText(route.label);
        const target = await row.locator('.selected-work-case-link').boundingBox();
        expect(target?.width).toBeGreaterThanOrEqual(44);
        expect(target?.height).toBeGreaterThanOrEqual(44);
        const rowBox = await row.boundingBox();
        expect(target!.x).toBeGreaterThanOrEqual(rowBox!.x);
        expect(target!.x + target!.width).toBeLessThanOrEqual(rowBox!.x + rowBox!.width + 1);
      }
      await expect(page.locator('.selected-work-mobile-evidence img')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);

      if (testInfo.project.name === 'chromium') {
        await mkdir('artifacts/visual/issue-116-i4', { recursive: true });
        await page.locator('.selected-work-row').first().screenshot({ path: `artifacts/visual/issue-116-i4/lead-row-${route.name}-${width}.png` });
      }
    });
  }
}

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const routes = [
  { name: 'home-en', path: '/' },
  { name: 'home-es', path: '/es/' },
  { name: 'hms-en', path: '/projects/hms-cloudflare/' },
  { name: 'hms-es', path: '/es/projects/hms-cloudflare/' },
  { name: 'alquileres-en', path: '/projects/alquileres-uspa/' },
  { name: 'alquileres-es', path: '/es/projects/alquileres-uspa/' },
] as const;

const desktopWidths = [360, 390, 430, 768, 1024, 1440] as const;
const mobileWidths = [360, 390, 430] as const;

for (const route of routes) {
  for (const width of desktopWidths) {
    test(`${route.name} remains usable at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name.startsWith('mobile-') && !mobileWidths.includes(width as 360 | 390 | 430));

      await page.setViewportSize({ width, height: 900 });
      const consoleMessages: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          consoleMessages.push(`${message.type()}: ${message.text()}`);
        }
      });
      page.on('pageerror', (error) => consoleMessages.push(`pageerror: ${error.message}`));

      await page.goto(route.path, { waitUntil: 'networkidle' });
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.getByRole('navigation')).toHaveCount(1);

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
      }));
      expect(dimensions.document, `${route.path} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);

      if (route.path === '/' || route.path === '/es/') {
        const caseStudyLink = page.getByRole('link', { name: /view case study|ver caso de estudio/i }).first();
        await expect(caseStudyLink).toBeVisible();
        const box = await caseStudyLink.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThanOrEqual(44);
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }

      expect(consoleMessages, `${route.path} console at ${width}px`).toEqual([]);

      if (testInfo.project.name === 'chromium') {
        const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-0');
        await mkdir(outputDir, { recursive: true });
        await page.screenshot({
          path: path.join(outputDir, `${route.name}-${width}x900.png`),
          animations: 'disabled',
        });
      }
    });
  }
}

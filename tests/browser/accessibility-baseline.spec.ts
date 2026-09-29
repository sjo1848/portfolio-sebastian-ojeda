import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  ['home-en', '/'],
  ['home-es', '/es/'],
  ['hms-en', '/projects/hms-cloudflare/'],
  ['hms-es', '/es/projects/hms-cloudflare/'],
  ['alquileres-en', '/projects/alquileres-uspa/'],
  ['alquileres-es', '/es/projects/alquileres-uspa/'],
  ['uspaya-en', '/projects/uspaya/'],
  ['uspaya-es', '/es/projects/uspaya/'],
] as const;

for (const [name, route] of routes) {
  for (const width of [390, 1440]) {
    test(`${name} has no WCAG 2.2 AA axe violations at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: 'networkidle' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }
}

import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', label: 'GitHub profile' },
  { path: '/es/', label: 'Perfil de GitHub' },
] as const;

for (const route of routes) {
  for (const width of [390, 1024, 1440]) {
    test(`#135 GitHub mark placement ${route.path} at ${width}px`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium');
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.goto(route.path, { waitUntil: 'networkidle' });

      const headerLink = page.locator('.site-header').getByRole('link', { name: route.label });
      const contactLink = page.locator('#contact').getByRole('link', { name: route.label });
      const footerLink = page.locator('.site-footer').getByRole('link', { name: route.label });

      await expect(headerLink).toHaveAttribute('href', 'https://github.com/sjo1848');
      await expect(contactLink).toHaveAttribute('href', 'https://github.com/sjo1848');
      await expect(footerLink).toHaveAttribute('href', 'https://github.com/sjo1848');

      await expect(page.locator('#hero a[href="https://github.com/sjo1848"]')).toHaveCount(0);
      await expect(page.locator('#hero .hero-actions a')).toHaveCount(2);

      for (const link of [headerLink, contactLink, footerLink]) {
        const box = await link.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
        await expect(link.locator('svg')).toHaveCount(1);
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}

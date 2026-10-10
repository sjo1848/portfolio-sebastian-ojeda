import { expect, test } from '@playwright/test';

const locales = [
  { language: 'en', root: '/', label: 'View GitHub' },
  { language: 'es', root: '/es/', label: 'Ver GitHub' },
] as const;

for (const locale of locales) {
  for (const width of [390, 1024, 1440]) {
    test(`#137 ${locale.language} profile has no GitHub mark at ${width}px`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium');
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.goto(locale.root, { waitUntil: 'networkidle' });

      await expect(page.locator('.site-header .github-mark-link')).toHaveCount(0);
      await expect(page.locator('#contact .github-mark-link')).toHaveCount(0);
      await expect(page.locator('.site-footer .github-mark-link')).toHaveCount(0);
      await expect(page.locator('.github-mark-link')).toHaveCount(0);

      const profile = page.locator('.site-footer a[href="https://github.com/sjo1848"]');
      await expect(profile).toHaveText('GitHub');
      await expect(profile.locator('svg')).toHaveCount(0);
      await expect(page.locator('#hero .hero-actions a')).toHaveCount(2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }

  for (const project of [
    { slug: 'hms-cloudflare', repo: 'hms-cloudflare', scan: true },
    { slug: 'alquileres-uspa', repo: 'alquileres-uspa', scan: true },
    { slug: 'ai-commerce-platform', repo: 'ai-commerce-platform', scan: true },
    { slug: 'uspaya', repo: 'UspaYa', scan: false },
  ] as const) {
    test(`#137 ${locale.language} ${project.slug} displays repository-only GitHub mark`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${locale.root === '/' ? '/' : '/es/'}projects/${project.slug}/`, { waitUntil: 'networkidle' });

      const href = `https://github.com/sjo1848/${project.repo}`;
      const mark = page.locator('.case-hero .github-mark-link');
      await expect(mark).toHaveCount(1);
      await expect(mark).toHaveAttribute('href', href);
      await expect(mark).toHaveAccessibleName(locale.label);
      await expect(mark.locator('svg')).toHaveCount(1);
      const box = await mark.boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);

      await expect(page.locator('.site-header .github-mark-link')).toHaveCount(0);
      await expect(page.locator('.site-footer .github-mark-link')).toHaveCount(0);
      await expect(page.locator('.site-footer a[href="https://github.com/sjo1848"]')).toHaveText('GitHub');

      if (project.scan) {
        const scan = page.locator('.case-quick-scan-links .github-mark-link');
        await expect(scan).toHaveCount(1);
        await expect(scan).toHaveAttribute('href', href);
        await expect(scan).toHaveAccessibleName(locale.label);
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    });
  }
}

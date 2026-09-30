import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const homeRoutes = [
  { lang: 'en', path: '/', leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'] },
  { lang: 'es', path: '/es/', leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'] },
] as const;
const widths = [360, 390, 430, 768, 1024, 1440];

for (const route of homeRoutes) {
  for (const width of widths) {
    test(`Issue 113 Home ${route.lang} evidence composition at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      const consoleErrors: string[] = [];
      page.on('pageerror', (error) => consoleErrors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      await page.goto(route.path, { waitUntil: 'networkidle' });

      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toHaveText(route.lang === 'en' ? 'Full-Stack Software Developer' : 'Desarrollador de Software Full-Stack');
      const evidence = page.locator('.brand-hero-evidence');
      const image = evidence.locator('img');
      await expect(image).toHaveAttribute('alt', /HMS Cloudflare reception workspace|Recepción actual de HMS Cloudflare/);
      await expect(image).toHaveAttribute('width', '1440');
      await expect(image).toHaveAttribute('height', '900');
      await expect(image).toHaveAttribute('loading', 'eager');
      await expect(image).toHaveAttribute('fetchpriority', 'high');
      await expect(evidence.locator('source[type="image/avif"]')).toHaveCount(1);
      await expect(evidence.locator('source[type="image/webp"]')).toHaveCount(1);
      await expect(evidence.getByText(/does not represent product acceptance|No representa aceptación de producto/)).toBeVisible();
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);

      const leadCards = page.locator('#projects .project-card');
      await expect(leadCards).toHaveCount(3);
      for (let index = 0; index < route.leadTitles.length; index += 1) {
        await expect(leadCards.nth(index).getByRole('heading', { level: 3 })).toContainText(route.leadTitles[index]);
        await expect(leadCards.nth(index).locator('.project-case-link')).toBeVisible();
      }
      const selectedWorkImage = page.locator('#projects .project-card-hero .project-evidence-image img');
      await expect(selectedWorkImage).toHaveAttribute('src', /cf-i05-housekeeping-authorized\.png$/);
      await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);

      const copyBox = await page.locator('.brand-hero-copy').boundingBox();
      const imageBox = await evidence.boundingBox();
      expect(copyBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      if (width >= 768) expect(imageBox!.x).toBeGreaterThan(copyBox!.x + copyBox!.width - 1);
      else expect(imageBox!.y).toBeGreaterThan(copyBox!.y + copyBox!.height - 1);

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

test('Issue 113 reduced motion keeps Home content visible and disables smooth motion', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.brand-hero-evidence img')).toBeVisible();
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    buttonTransition: getComputedStyle(document.querySelector('.button-primary')!).transitionDuration,
    cardTransition: getComputedStyle(document.querySelector('.project-card')!).transitionDuration,
  }));
  expect(motion.scroll).toBe('auto');
  expect(motion.buttonTransition.split(',').every((duration) => Number.parseFloat(duration) <= 0.00002)).toBe(true);
  expect(motion.cardTransition.split(',').every((duration) => Number.parseFloat(duration) <= 0.00002)).toBe(true);
});

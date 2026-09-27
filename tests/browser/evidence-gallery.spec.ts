import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const mobileWidths = [360, 390, 430];
const desktopWidths = [768, 1024, 1440];

async function captureEvidenceScreenshot(page: import('@playwright/test').Page, name: string) {
  const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-3');
  await mkdir(outputDir, { recursive: true });
  await page.screenshot({ path: path.join(outputDir, name), animations: 'disabled' });
}

test('project gallery keeps the empty and single-item cases intentional in EN and ES', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');

  for (const [route, galleryLabel] of [
    ['/projects/jm-soluciones/', 'Visual evidence'],
    ['/es/projects/jm-soluciones/', 'Evidencia visual'],
  ]) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('#gallery-jm-soluciones')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: galleryLabel })).toHaveCount(0);
  }

  for (const [route, lang] of [
    ['/projects/taco-loco/', 'en'],
    ['/es/projects/taco-loco/', 'es'],
  ] as const) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'networkidle' });
    const gallery = page.locator('#gallery-items-taco-loco');
    const island = gallery.locator('xpath=ancestor::astro-island');
    await expect(gallery.locator('[data-gallery-slide]')).toHaveCount(1);
    await expect(gallery.locator('.gallery-carousel-controls')).toHaveCount(0);
    await expect(gallery.locator('[data-gallery-slide] img')).toHaveAttribute('alt', /Taco Loco/);
    await expect(island).toHaveAttribute('ssr', '');
    await gallery.scrollIntoViewIfNeeded();
    await expect.poll(() => island.getAttribute('ssr')).toBeNull();
    const imageLink = gallery.locator('[data-media-viewer-trigger]');
    await imageLink.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Taco Loco Foodtrack' });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.media-viewer-count')).toHaveCount(0);
    await expect(dialog.locator('.media-viewer-navigation')).toHaveCount(0);
    await expect(dialog.locator('.media-viewer-caption')).toContainText(lang === 'es' ? 'Evidencia mobile' : 'mobile evidence');
    await expect(dialog.getByRole('link', { name: lang === 'es' ? 'Abrir imagen original' : 'Open original image' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(imageLink).toBeFocused();
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/projects/alquileres-uspa/', { waitUntil: 'networkidle' });
  const spanishGallery = page.locator('#gallery-items-alquileres-uspa');
  const spanishIsland = spanishGallery.locator('xpath=ancestor::astro-island');
  await spanishGallery.scrollIntoViewIfNeeded();
  await expect.poll(() => spanishIsland.getAttribute('ssr')).toBeNull();
  await expect(spanishGallery.locator('.project-gallery-viewport')).toHaveAttribute('aria-label', 'Galería de evidencia visual');
  await expect(spanishGallery.locator('.gallery-carousel-position')).toHaveText('1 de 2');
  await spanishGallery.getByRole('button', { name: 'Evidencia siguiente' }).click();
  await expect(spanishGallery.locator('.gallery-carousel-position')).toHaveText('2 de 2');
});

for (const width of [...mobileWidths, ...desktopWidths]) {
  test(`Alquileres gallery composes at ${width}px without cropping or page overflow`, async ({ page }, testInfo) => {
    test.setTimeout(45_000);
    const desktopProject = ['chromium', 'firefox', 'webkit'].includes(testInfo.project.name);
    const mobileProject = ['mobile-chromium', 'mobile-webkit'].includes(testInfo.project.name);
    test.skip(!desktopProject && !mobileProject);
    test.skip(width > 430 && mobileProject);
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projects/alquileres-uspa/', { waitUntil: 'networkidle' });
    const gallery = page.locator('#gallery-items-alquileres-uspa');
    const island = gallery.locator('xpath=ancestor::astro-island');
    await expect(gallery.locator('[data-gallery-slide]')).toHaveCount(2);
    const firstImage = gallery.locator('[data-gallery-slide] img').first();
    await expect(firstImage).toHaveAttribute('width', '1440');
    await expect(island).toHaveAttribute('ssr', '');
    await gallery.scrollIntoViewIfNeeded();
    await expect.poll(() => island.getAttribute('ssr')).toBeNull();
    await expect(firstImage).toHaveJSProperty('naturalWidth', 1440);
    const thumbnailBounds = await firstImage.boundingBox();
    expect(thumbnailBounds!.width / thumbnailBounds!.height).toBeCloseTo(1440 / 1200, 1);

    const viewport = gallery.locator('.project-gallery-viewport');
    if (width <= 430) {
      await expect(gallery.locator('.gallery-carousel-controls')).toBeVisible();
      await expect(viewport).toHaveAttribute('aria-roledescription', 'carousel');
      await expect.poll(() => viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const previous = gallery.getByRole('button', { name: 'Previous evidence' });
      const next = gallery.getByRole('button', { name: 'Next evidence' });
      for (const control of [previous, next]) {
        const box = await control.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
      await expect(previous).toBeDisabled();
      await expect(next).toBeEnabled();
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('1 of 2');
      if (width === 390 && testInfo.project.name === 'chromium') await captureEvidenceScreenshot(page, 'alquileres-gallery-mobile-first.png');

      if (width === 390 && testInfo.project.name === 'chromium') {
        const axeBefore = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axeBefore.violations, JSON.stringify(axeBefore.violations, null, 2)).toEqual([]);
      }

      await viewport.focus();
      await page.keyboard.press('ArrowRight');
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('2 of 2');
      if (width === 390 && testInfo.project.name === 'chromium') await captureEvidenceScreenshot(page, 'alquileres-gallery-mobile-intermediate.png');
      await expect(next).toBeDisabled();
      await expect(previous).toBeEnabled();
      if (width === 390 && testInfo.project.name === 'chromium') {
        const axeIntermediate = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axeIntermediate.violations, JSON.stringify(axeIntermediate.violations, null, 2)).toEqual([]);
      }

      await viewport.evaluate((element: HTMLElement) => {
        element.scrollTo({ left: 0, behavior: 'auto' });
      });
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('1 of 2');
      await viewport.evaluate((element: HTMLElement) => {
        element.scrollTo({ left: element.scrollWidth, behavior: 'auto' });
      });
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('2 of 2');
      await viewport.evaluate((element: HTMLElement) => {
        element.scrollTo({ left: 0, behavior: 'auto' });
      });
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('1 of 2');
      await next.click();
      await expect(gallery.locator('.gallery-carousel-position')).toHaveText('2 of 2');
      const imageLink = gallery.locator('[data-gallery-slide="1"] [data-media-viewer-trigger]');
      await imageLink.click();
      const dialog = page.getByRole('dialog', { name: 'Alquileres Uspallata' });
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('.media-viewer-count')).toHaveText('2 of 2');
      await expect(dialog.locator('.media-viewer-image')).toHaveJSProperty('naturalWidth', 390);
      const fullImageBounds = await dialog.locator('.media-viewer-image').boundingBox();
      expect(fullImageBounds!.width / fullImageBounds!.height).toBeCloseTo(390 / 844, 1);
      if (width === 390 && testInfo.project.name === 'chromium') await captureEvidenceScreenshot(page, 'alquileres-gallery-viewer-open.png');
      if (width === 390 && testInfo.project.name === 'chromium') {
        const axeViewer = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axeViewer.violations, JSON.stringify(axeViewer.violations, null, 2)).toEqual([]);
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(imageLink).toBeFocused();
    } else {
      await expect(gallery.locator('.gallery-carousel-controls')).toBeHidden();
      await expect(viewport).toHaveCSS('overflow-x', 'visible');
      await expect(gallery.locator('.project-gallery-track')).toHaveCSS('display', 'grid');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      if (width === 1024 && testInfo.project.name === 'chromium') await captureEvidenceScreenshot(page, 'alquileres-gallery-desktop-grid.png');
    }
  });
}

test('HMS Elite GIFs load only after Play and stop when the user activates Stop', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  const gifRequests: string[] = [];
  const gifData = Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64');
  const pngData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/S0kAAAAASUVORK5CYII=', 'base64');
  page.on('request', (request) => {
    if (/\.gif(?:\?|$)/i.test(request.url())) gifRequests.push(request.url());
  });
  await page.route('https://raw.githubusercontent.com/sjo1848/hotel-management-system/**', (route) => {
    const isGif = route.request().url().toLowerCase().endsWith('.gif');
    return route.fulfill({ status: 200, contentType: isGif ? 'image/gif' : 'image/png', body: isGif ? gifData : pngData });
  });
  await page.goto('/projects/hms-elite/', { waitUntil: 'networkidle' });
  const gallery = page.locator('#gallery-items-hms-elite');
  const island = gallery.locator('xpath=ancestor::astro-island');
  await expect(gallery.locator('[data-gallery-slide]')).toHaveCount(7);
  await expect(gallery.locator('.gallery-gif-toggle')).toHaveCount(2);
  await expect(island).toHaveAttribute('ssr', '');
  await gallery.scrollIntoViewIfNeeded();
  await expect.poll(() => island.getAttribute('ssr')).toBeNull();
  expect(gifRequests).toHaveLength(0);

  const firstGif = gallery.locator('.gallery-gif-toggle').first();
  const originalLink = gallery.locator('.gallery-gif-controls a').first();
  await expect(originalLink).toHaveAttribute('href', /hms-reception-workflow\.gif$/);
  await expect(gallery.locator('.gallery-gif-stage[style*="aspect-ratio"]')).toHaveCount(2);
  await firstGif.click();
  await expect(firstGif).toHaveAttribute('aria-pressed', 'true');
  await expect(gallery.locator('.gallery-gif-stage img').first()).toBeVisible();
  await expect.poll(() => gifRequests.length).toBe(1);
  await firstGif.click();
  await expect(firstGif).toHaveAttribute('aria-pressed', 'false');
  await expect(gallery.locator('.gallery-gif-stage img')).toHaveCount(0);
  expect(gifRequests).toHaveLength(1);
  await firstGif.click();
  await expect(firstGif).toHaveAttribute('aria-pressed', 'true');
  await expect(gallery.locator('.gallery-gif-stage img').first()).toBeVisible();
});

test('HMS Elite GIF failure announces an error and preserves the original link', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  test.setTimeout(40_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route('**/hms-reception-workflow.gif', (route) => route.fulfill({ status: 404, body: 'missing' }));
  await page.goto('/projects/hms-elite/', { waitUntil: 'networkidle' });
  const gallery = page.locator('#gallery-items-hms-elite');
  const island = gallery.locator('xpath=ancestor::astro-island');
  await gallery.scrollIntoViewIfNeeded();
  await expect.poll(() => island.getAttribute('ssr')).toBeNull();
  const gifCard = gallery.locator('.gallery-media').nth(1);
  await gifCard.getByRole('button', { name: 'Play GIF' }).click();
  await expect(gifCard.getByRole('status')).toContainText('could not be played');
  await expect(gifCard.getByRole('button', { name: 'Play GIF' })).toHaveAttribute('aria-pressed', 'false');
  await expect(gifCard.getByRole('link', { name: 'Open full GIF' })).toHaveAttribute('href', /hms-reception-workflow\.gif$/);
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  await captureEvidenceScreenshot(page, 'hms-elite-gif-error.png');
});

test('Alquileres evidence links still work when the EvidenceGallery island cannot hydrate', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/_astro/EvidenceGallery.*.js', (route) => route.abort());
  await page.goto('/projects/alquileres-uspa/', { waitUntil: 'networkidle' });
  const gallery = page.locator('#gallery-items-alquileres-uspa');
  const island = gallery.locator('xpath=ancestor::astro-island');
  await gallery.scrollIntoViewIfNeeded();
  await expect(island).toHaveAttribute('ssr', '');
  const original = gallery.locator('[data-gallery-slide="0"] [data-media-viewer-trigger]');
  await expect(original).toHaveAttribute('target', '_blank');
  await expect(original.locator('img')).toHaveAttribute('alt', /Public detail page/);
  const [popup] = await Promise.all([page.waitForEvent('popup'), original.click()]);
  await popup.waitForLoadState('load');
  await expect(popup).toHaveURL(/listing-detail-desktop-1440x1200\.png$/);
  await expect.poll(() => popup.evaluate(() => document.contentType)).toBe('image/png');
  await expect.poll(() => popup.locator('img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1440);
});

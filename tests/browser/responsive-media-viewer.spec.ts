import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routeByProject = {
  chromium: '/projects/hms-cloudflare/',
  firefox: '/projects/hms-cloudflare/',
  webkit: '/projects/hms-cloudflare/',
  'mobile-webkit': '/es/projects/hms-cloudflare/',
} as const;

for (const project of Object.keys(routeByProject) as Array<keyof typeof routeByProject>) {
  test(`HMS media viewer ${project}: modal, keyboard, navigation and original fallback`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== project);
    test.setTimeout(60_000);
    const mobile = project === 'mobile-webkit';
    await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 });
    if (mobile) await page.emulateMedia({ reducedMotion: 'reduce' });
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') pageErrors.push(message.text());
    });
    await page.goto(routeByProject[project], { waitUntil: 'networkidle' });

    const triggers = page.locator('[data-media-viewer-trigger]');
    await expect(triggers).toHaveCount(4);
    const opener = triggers.first();
    const island = page.locator('.media-viewer-island astro-island');
    await expect(island).toHaveAttribute('ssr', '');
    await island.scrollIntoViewIfNeeded();
    await expect.poll(() => island.getAttribute('ssr')).toBeNull();
    await opener.scrollIntoViewIfNeeded();
    await expect(opener).toBeVisible();
    await expect(opener).toHaveAttribute('target', '_blank');
    await expect(opener).toHaveAttribute('href', /cf-i04-reception-authorized\.png$/);
    if (mobile) {
      await opener.tap();
    } else {
      await opener.focus();
      await page.keyboard.press('Enter');
    }

    const dialog = page.getByRole('dialog', { name: 'HMS Cloudflare' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'HMS Cloudflare' })).toBeVisible();
    await expect(dialog.locator('.media-viewer-caption')).toContainText(/Recepción: ciclo operacional|Reception: operational lifecycle/);
    await expect(dialog.locator('.media-viewer-count')).toHaveText(mobile ? '1 de 4' : '1 of 4');
    await expect(dialog.getByRole('link', { name: mobile ? 'Abrir imagen original' : 'Open original image' })).toHaveAttribute('href', /cf-i04-reception-authorized\.png$/);
    await expect(dialog.getByRole('button', { name: mobile ? 'Cerrar visor de imágenes' : 'Close image viewer' })).toBeVisible();
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await expect(dialog.locator('.media-viewer-image')).toHaveJSProperty('naturalWidth', 1440);
    await expect(dialog.locator('.media-viewer-stage')).toHaveAttribute('aria-busy', 'false');
    const imageBounds = await dialog.locator('.media-viewer-image').boundingBox();
    const stageBounds = await dialog.locator('.media-viewer-stage').boundingBox();
    expect(imageBounds).not.toBeNull();
    expect(stageBounds).not.toBeNull();
    expect(imageBounds!.height).toBeLessThanOrEqual(stageBounds!.height);
    expect(imageBounds!.width / imageBounds!.height).toBeCloseTo(1440 / 1899, 1);
    await expect.poll(() => page.locator('header.site-header').getAttribute('aria-hidden')).toBe('true');

    const closeButton = dialog.getByRole('button', { name: mobile ? 'Cerrar visor de imágenes' : 'Close image viewer' });
    const assertMinimumTarget = async (target: import('@playwright/test').Locator) => {
      const box = await target.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    };
    await assertMinimumTarget(closeButton);
    await assertMinimumTarget(dialog.getByRole('button', { name: mobile ? 'Imagen anterior' : 'Previous image' }));
    await assertMinimumTarget(dialog.getByRole('button', { name: mobile ? 'Imagen siguiente' : 'Next image' }));
    const lastButton = dialog.getByRole('button').last();
    await closeButton.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(lastButton).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(mobile ? 390 : 1440);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(mobile ? 390 : 1440);
    if (mobile) {
      expect(bounds!.height).toBeGreaterThanOrEqual(844);
      const paddingTop = await dialog.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingTop));
      expect(paddingTop).toBeGreaterThanOrEqual(12);
    }

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);

    await dialog.getByRole('button', { name: mobile ? 'Imagen siguiente' : 'Next image' }).click();
    await expect(dialog.locator('.media-viewer-count')).toHaveText(mobile ? '2 de 4' : '2 of 4');
    await expect(dialog.getByRole('link', { name: mobile ? 'Abrir imagen original' : 'Open original image' })).toHaveAttribute('href', /cf-i05-housekeeping-authorized\.png$/);
    await expect(dialog.locator('.media-viewer-image')).toHaveJSProperty('naturalWidth', 1440);
    if (project === 'chromium' || mobile) {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-2');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({
        path: path.join(outputDir, mobile ? 'hms-viewer-drawer-intermediate.png' : 'hms-viewer-dialog-intermediate.png'),
        animations: 'disabled',
      });
    }
    await dialog.getByRole('button', { name: mobile ? 'Imagen anterior' : 'Previous image' }).click();
    await expect(dialog.locator('.media-viewer-count')).toHaveText(mobile ? '1 de 4' : '1 of 4');
    await expect(dialog.getByRole('button', { name: mobile ? 'Imagen anterior' : 'Previous image' })).toBeDisabled();
    const nextButton = dialog.getByRole('button', { name: mobile ? 'Imagen siguiente' : 'Next image' });
    for (let index = 0; index < 3; index += 1) await nextButton.click();
    await expect(dialog.locator('.media-viewer-count')).toHaveText(mobile ? '4 de 4' : '4 of 4');
    await expect(nextButton).toBeDisabled();

    if (project === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-2');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({ path: path.join(outputDir, 'hms-viewer-dialog-open.png'), animations: 'disabled' });
    }
    if (mobile) {
      const transitionDuration = await page.locator('.ui-drawer-backdrop').evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).transitionDuration),
      );
      expect(transitionDuration).toBeLessThanOrEqual(0.02);
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-2');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({ path: path.join(outputDir, 'hms-viewer-drawer-open.png'), animations: 'disabled' });
      await page.setViewportSize({ width: 844, height: 390 });
      await expect(dialog).toBeVisible();
      await expect(page.locator('.ui-dialog-content.media-viewer-dialog')).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.innerHeight)).toBe(390);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(844);
      await expect.poll(async () => (await dialog.boundingBox())?.height ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(390);
      const rotatedImage = await dialog.locator('.media-viewer-image').boundingBox();
      const rotatedStage = await dialog.locator('.media-viewer-stage').boundingBox();
      expect(rotatedImage!.height).toBeLessThanOrEqual(rotatedStage!.height);
      const rotatedNaturalSize = await dialog.locator('.media-viewer-image').evaluate((image: HTMLImageElement) => ({
        width: image.naturalWidth,
        height: image.naturalHeight,
      }));
      expect(rotatedImage!.width / rotatedImage!.height).toBeCloseTo(rotatedNaturalSize.width / rotatedNaturalSize.height, 1);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
    expect(pageErrors).toEqual([]);
  });
}

test('HMS media viewer reports a missing image and keeps its original fallback', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route('**/cf-i05-housekeeping-authorized.png', (route) => route.fulfill({ status: 404, body: 'not found' }));
  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  const secondTrigger = page.locator('[data-media-viewer-trigger]').nth(1);
  const island = page.locator('.media-viewer-island astro-island');
  await island.scrollIntoViewIfNeeded();
  await expect.poll(() => island.getAttribute('ssr')).toBeNull();
  await secondTrigger.scrollIntoViewIfNeeded();
  await secondTrigger.click();

  const dialog = page.getByRole('dialog', { name: 'HMS Cloudflare' });
  await expect(dialog.getByText('This image could not be displayed.')).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Open original image' })).toHaveAttribute('href', /cf-i05-housekeeping-authorized\.png$/);
  await expect(dialog.locator('.media-viewer-stage')).toHaveAttribute('aria-busy', 'false');

  const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-2');
  await mkdir(outputDir, { recursive: true });
  await page.screenshot({ path: path.join(outputDir, 'hms-viewer-error-fallback.png'), animations: 'disabled' });

  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
});

test('HMS media viewer opens the original image if its React island cannot hydrate', async ({ page }) => {
  test.skip(test.info().project.name !== 'chromium');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/_astro/ResponsiveMediaViewer.*.js', (route) => route.abort());
  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  const opener = page.locator('[data-media-viewer-trigger]').first();
  await expect(opener).toHaveAttribute('href', /cf-i04-reception-authorized\.png$/);
  await expect(opener).toHaveAttribute('target', '_blank');
  const [popup] = await Promise.all([page.waitForEvent('popup'), opener.click()]);
  await popup.waitForLoadState('load');
  await expect(popup).toHaveURL(/cf-i04-reception-authorized\.png$/);
  await expect.poll(() => popup.evaluate(() => document.contentType)).toBe('image/png');
  await expect.poll(() => popup.locator('img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test('HMS media viewer leaves modified link events uncancelled', async ({ page }) => {
  test.skip(test.info().project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  const island = page.locator('.media-viewer-island astro-island');
  await island.scrollIntoViewIfNeeded();
  await expect.poll(() => island.getAttribute('ssr')).toBeNull();
  const opener = page.locator('[data-media-viewer-trigger]').first();
  await opener.scrollIntoViewIfNeeded();
  const eventWasCancelled = await opener.evaluate((anchor: HTMLAnchorElement) => {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true, button: 0, view: window });
    anchor.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(eventWasCancelled).toBe(false);
  await expect(page.getByRole('dialog', { name: 'HMS Cloudflare' })).toBeHidden();
});

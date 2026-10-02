import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const evidenceDir = path.resolve('artifacts/visual/issue-124-c3-c5');

test('C5 Selected Work proof actions stay aligned with the active proof, in both languages', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));

  for (const locale of [
    { path: '/', lang: 'en', hms: 'Local test evidence', rental: 'Synthetic visual evidence', hmsHref: '/projects/hms-cloudflare/#visual-evidence', rentalHref: '/projects/alquileres-uspa/#gallery-alquileres-uspa' },
    { path: '/es/', lang: 'es', hms: 'Evidencia de pruebas local', rental: 'Evidencia visual sintética', hmsHref: '/es/projects/hms-cloudflare/#evidencia-visual', rentalHref: '/es/projects/alquileres-uspa/#gallery-alquileres-uspa' },
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    const section = page.locator('#projects');
    await section.scrollIntoViewIfNeeded();
    const panel = section.locator('[data-selected-evidence]');
    const action = panel.locator('[data-proof-action]');
    const hmsRow = section.locator('[data-project-index-item]').nth(0);
    await expect(action).toBeVisible();
    await expect(action.locator('[data-proof-state]')).toHaveText(locale.hms);
    await expect(action.locator('[data-proof-link]')).toHaveAttribute('href', locale.hmsHref);
    await expect(action.locator('[data-proof-link]')).toHaveAccessibleName(locale.lang === 'es' ? 'Ver evidencia' : 'View evidence');

    await mkdir(evidenceDir, { recursive: true });
    await panel.screenshot({ path: path.join(evidenceDir, `selected-work-hms-${locale.lang}-1440.png`), animations: 'disabled' });

    const rentalRow = section.locator('[data-project-index-item]').nth(1);
    await rentalRow.hover();
    await expect(action.locator('[data-proof-state]')).toHaveText(locale.rental);
    await expect(action.locator('[data-proof-link]')).toHaveAttribute('href', locale.rentalHref);
    await expect(action.locator('[data-proof-link]')).toHaveAccessibleName(locale.lang === 'es' ? 'Ver evidencia' : 'View evidence');
    await panel.screenshot({ path: path.join(evidenceDir, `selected-work-alquileres-${locale.lang}-1440.png`), animations: 'disabled' });

    await section.locator('[data-project-index-item]').nth(2).locator('.selected-work-row').focus();
    await expect(action).toBeHidden();
    await expect(action.locator('[data-proof-link]')).not.toHaveAttribute('href', /.+/);
    await expect(hmsRow.locator('.selected-work-row')).toHaveAttribute('href', `${locale.path}projects/hms-cloudflare/`.replace('//projects', '/projects'));
  }
  expect(errors).toEqual([]);
});

test('C5 published proof evidence is clear at desktop and mobile widths in EN/ES', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await mkdir(evidenceDir, { recursive: true });

  for (const locale of [
    { code: 'en', hms: '/projects/hms-cloudflare/#visual-evidence', rental: '/projects/alquileres-uspa/#gallery-alquileres-uspa' },
    { code: 'es', hms: '/es/projects/hms-cloudflare/#evidencia-visual', rental: '/es/projects/alquileres-uspa/#gallery-alquileres-uspa' },
  ]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });

      if (width === 390) {
        const homePath = locale.code === 'es' ? '/es/' : '/';
        await page.goto(homePath, { waitUntil: 'networkidle' });
        const mobileIndex = page.locator('.selected-work-index');
        await expect(mobileIndex.locator('[data-selected-evidence]')).toBeHidden();
        await expect(mobileIndex.locator('.selected-work-item .selected-work-proof-link')).toHaveCount(0);
        await expect(mobileIndex.locator('.selected-work-row')).toHaveCount(3);
      }

      await page.goto(locale.hms, { waitUntil: 'networkidle' });
      await expect(page.locator('#visual-evidence, #evidencia-visual')).toBeVisible();
      const hmsImageLink = page.locator('a[data-media-viewer-trigger][href="/media/projects/hms-cloudflare/cf-i04-reception-lifecycle.png"]');
      await expect(hmsImageLink).toBeVisible();
      await expect(hmsImageLink.locator('img')).toHaveAttribute('alt', /HMS/);
      await expect(page.locator('.case-proof-link')).toHaveAttribute('href', locale.hms);
      const hmsActions = await page.locator('.case-quick-scan-links a').allTextContents();
      expect(hmsActions.some((label) => /demo|walkthrough|live|production/i.test(label))).toBe(false);
      const hmsScrollTarget = hmsImageLink.locator('img');
      await hmsScrollTarget.scrollIntoViewIfNeeded();
      await hmsScrollTarget.screenshot({
        path: path.join(evidenceDir, `hms-evidence-${locale.code}-${width}.png`),
        animations: 'disabled',
      });

      await page.goto(locale.rental, { waitUntil: 'networkidle' });
      const gallery = page.locator('#gallery-alquileres-uspa');
      await expect(gallery).toBeVisible();
      await expect(gallery.locator('img').first()).toBeVisible();
      await expect(gallery.locator('figcaption').first()).toContainText(locale.code === 'en' ? 'Synthetic' : 'sintétic');
      const rentalActions = await page.locator('.case-quick-scan-links a').allTextContents();
      expect(rentalActions.some((label) => /demo|live|production|open product|abrir producto|probar demo/i.test(label))).toBe(false);
      await gallery.scrollIntoViewIfNeeded();
      await gallery.screenshot({
        path: path.join(evidenceDir, `alquileres-gallery-${locale.code}-${width}.png`),
        animations: 'disabled',
      });
      await expect(page.locator('a[href*="cloudflarepages.dev"], a[href*="workers.dev"]')).toHaveCount(0);
    }
  }
  expect(errors).toEqual([]);
});

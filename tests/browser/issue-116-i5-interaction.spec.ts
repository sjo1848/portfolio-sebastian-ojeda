import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('I5 hover and keyboard focus update approved evidence together without moving the layout', async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const section = page.locator('#projects');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute('data-handoff-enhanced', 'true');
  await expect(section).toHaveAttribute('data-handoff-visible', 'true');

  const rows = page.locator('[data-project-index-item]');
  const panel = page.locator('[data-selected-evidence]');
  const frame = panel.locator('.selected-work-evidence-image-frame');
  const indexLayoutHeightBefore = await page.locator('.selected-work-index').evaluate((element) => (element as HTMLElement).offsetHeight);
  const frameBefore = await frame.evaluate((element) => ({ layoutWidth: (element as HTMLElement).offsetWidth, layoutHeight: (element as HTMLElement).offsetHeight }));
  await rows.nth(1).hover();
  await expect(rows.nth(1)).toHaveAttribute('data-active', 'true');
  await expect(rows.nth(0)).toHaveAttribute('data-active', 'false');
  await expect(panel.locator('[data-evidence-title]')).toHaveText('Alquileres Uspallata');
  await expect(panel.locator('[data-evidence-image]')).toHaveAttribute('src', /catalog-results-desktop-1440x1200\.png$/);
  await expect(panel.locator('[data-evidence-image]')).toHaveJSProperty('naturalWidth', 1440);
  await expect(panel.locator('[data-evidence-caption]')).toContainText('reproducible synthetic fixtures');
  await expect(panel.locator('[data-evidence-limitation]')).toContainText('no public deployment');
  const frameAfter = await frame.evaluate((element) => ({ layoutWidth: (element as HTMLElement).offsetWidth, layoutHeight: (element as HTMLElement).offsetHeight }));
  expect(frameAfter.layoutWidth).toBe(frameBefore.layoutWidth);
  expect(frameAfter.layoutHeight).toBe(frameBefore.layoutHeight);
  expect(await page.locator('.selected-work-index').evaluate((element) => (element as HTMLElement).offsetHeight)).toBe(indexLayoutHeightBefore);
  await expect(panel.locator('.selected-work-evidence-figure')).toHaveAttribute('data-evidence-changing');
  const axeAlquileres = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(axeAlquileres.violations, JSON.stringify(axeAlquileres.violations, null, 2)).toEqual([]);
  await mkdir('artifacts/visual/issue-116-i5', { recursive: true });
  await section.screenshot({ path: 'artifacts/visual/issue-116-i5/selected-work-alquileres-active-1440.png' });

  await rows.nth(2).locator('a.selected-work-row').focus();
  await expect(rows.nth(2)).toHaveAttribute('data-active', 'true');
  await expect(rows.nth(2).locator('a.selected-work-row')).toBeFocused();
  await expect(panel.locator('[data-evidence-title]')).toHaveText('AI Commerce + HMS');
  await expect(panel.locator('.selected-work-evidence-heading > span').nth(1)).toContainText('Experimental prototype');
  await expect(panel.locator('[data-evidence-image]')).toBeHidden();
  await expect(panel.locator('[data-evidence-empty]')).toBeVisible();
  await expect(panel.locator('[data-evidence-caption]')).toContainText('No approved visual capture');
  await expect(panel.locator('[data-evidence-limitation]')).toContainText('no public walkthrough artifact');
  await expect(rows.nth(2).locator('.selected-work-row')).toHaveAttribute('href', '/projects/ai-commerce-platform/');
  const axeAi = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(axeAi.violations, JSON.stringify(axeAi.violations, null, 2)).toEqual([]);
  await section.screenshot({ path: 'artifacts/visual/issue-116-i5/selected-work-ai-no-image-1440.png' });

  await page.goto('/es/');
  const spanishSection = page.locator('#projects');
  await spanishSection.scrollIntoViewIfNeeded();
  const spanishRentalRow = page.locator('[data-project-index-item]').nth(1);
  await spanishRentalRow.hover();
  await expect(spanishRentalRow).toHaveAttribute('data-active', 'true');
  await expect(page.locator('[data-selected-evidence] [data-evidence-title]')).toHaveText('Alquileres Uspallata');
  await expect(page.locator('[data-selected-evidence] [data-evidence-caption]')).toContainText('reproducibles');
  await expect(page.locator('[data-selected-evidence] [data-evidence-limitation]')).toContainText(/no hay despliegue público/i);
  await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze().then((result) => {
    expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
  });
  await spanishSection.screenshot({ path: 'artifacts/visual/issue-116-i5/selected-work-alquileres-active-1440-es.png' });
  expect(errors).toEqual([]);
});

test('I5 tablet preview reserves the same dimensions while active evidence changes', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  const section = page.locator('#projects');
  await section.scrollIntoViewIfNeeded();
  const index = page.locator('.selected-work-index');
  const frame = page.locator('[data-selected-evidence] .selected-work-evidence-image-frame');
  const initial = await index.evaluate((element) => (element as HTMLElement).offsetHeight);
  const frameSize = await frame.evaluate((element) => ({ width: (element as HTMLElement).offsetWidth, height: (element as HTMLElement).offsetHeight }));
  await page.locator('[data-project-index-item]').nth(1).hover();
  await expect(page.locator('[data-evidence-title]')).toHaveText('Alquileres Uspallata');
  expect(await index.evaluate((element) => (element as HTMLElement).offsetHeight)).toBe(initial);
  await page.locator('[data-project-index-item]').nth(2).hover();
  await expect(page.locator('[data-evidence-title]')).toHaveText('AI Commerce + HMS');
  expect(await index.evaluate((element) => (element as HTMLElement).offsetHeight)).toBe(initial);
  expect(await frame.evaluate((element) => ({ width: (element as HTMLElement).offsetWidth, height: (element as HTMLElement).offsetHeight }))).toEqual(frameSize);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768);
});

test('I5 failed image loading presents an honest fallback while preserving the case link', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.route('**/media/projects/alquileres-uspa/catalog-results-desktop-1440x1200.png', (route) => route.abort());
  await page.goto('/');
  const section = page.locator('#projects');
  await section.scrollIntoViewIfNeeded();
  const row = page.locator('[data-project-index-item]').nth(1);
  await row.hover();
  const panel = page.locator('[data-selected-evidence]');
  await expect(panel.locator('[data-evidence-empty]')).toBeVisible();
  await expect(panel.locator('[data-evidence-empty]')).toContainText('image preview is unavailable');
  await expect(panel.locator('[data-evidence-limitation]')).toContainText('reproducible synthetic captures');
  await expect(row.locator('a.selected-work-row')).toHaveAttribute('href', '/projects/alquileres-uspa/');
  await mkdir('artifacts/visual/issue-116-i5', { recursive: true });
  await section.screenshot({ path: 'artifacts/visual/issue-116-i5/selected-work-image-error-1440.png' });
});

test('I5 mobile keeps inline HMS evidence and ordinary touch navigation', async ({ page }, testInfo) => {
  test.skip(!['mobile-chromium', 'mobile-webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('[data-selected-evidence]')).toBeHidden();
  await expect(page.locator('.selected-work-mobile-evidence img')).toHaveAttribute('src', /cf-i05-housekeeping-authorized\.png$/);
  await expect(page.locator('[data-project-index-item]').nth(1)).not.toHaveAttribute('data-active', 'true');
  await mkdir('artifacts/visual/issue-116-i5', { recursive: true });
  await page.locator('#projects').screenshot({ path: 'artifacts/visual/issue-116-i5/selected-work-mobile-390.png' });
  await page.locator('.selected-work-row').nth(1).tap();
  await expect(page).toHaveURL('/projects/alquileres-uspa/');
});

test('I5 reduced motion removes signature transitions and static routes work without JavaScript', async ({ browser, page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const rows = page.locator('[data-project-index-item]');
  const panel = page.locator('[data-selected-evidence]');
  await rows.nth(1).locator('a.selected-work-row').focus();
  await expect(panel.locator('[data-evidence-title]')).toHaveText('Alquileres Uspallata');
  await expect(panel.locator('.selected-work-evidence-image-frame')).toHaveCSS('animation-name', 'none');
  const reduced = await page.locator('#projects').evaluate((section) => ({
    handoff: getComputedStyle(section, '::before').transitionDuration,
    image: getComputedStyle(section.querySelector('.selected-work-evidence-image-frame')!).animationName,
  }));
  expect(reduced.handoff.split(',').every((duration) => Number.parseFloat(duration) <= 0.00002)).toBe(true);
  expect(reduced.image).toBe('none');

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJs = await context.newPage();
  await noJs.goto('http://127.0.0.1:4184/');
  await expect(noJs.locator('#projects')).not.toHaveAttribute('data-handoff-enhanced', 'true');
  await expect(noJs.locator('.selected-work-row')).toHaveCount(3);
  await expect(noJs.locator('.selected-work-mobile-evidence img')).toHaveAttribute('src', /cf-i05-housekeeping-authorized\.png$/);
  await expect(noJs.locator('.selected-work-row').nth(1)).toHaveAttribute('href', '/projects/alquileres-uspa/');
  await context.close();
});

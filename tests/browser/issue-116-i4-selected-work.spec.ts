import { expect, test } from '@playwright/test';

const expectedTitles = ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'];

for (const route of ['/', '/es/']) {
  test(`I4 ${route} preserves the three approved editorial rows as normal links`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);

    const rows = page.locator('[data-project-index-item]');
    await expect(rows).toHaveCount(3);
    await expect(rows.locator('.selected-work-title')).toHaveText(expectedTitles);
    await expect(rows.nth(0).locator('a')).toHaveAttribute('href', route === '/' ? '/projects/hms-cloudflare/' : '/es/projects/hms-cloudflare/');
    await expect(rows.nth(1).locator('a')).toHaveAttribute('href', route === '/' ? '/projects/alquileres-uspa/' : '/es/projects/alquileres-uspa/');
    await expect(rows.nth(2).locator('a')).toHaveAttribute('href', route === '/' ? '/projects/ai-commerce-platform/' : '/es/projects/ai-commerce-platform/');
    for (const row of await rows.all()) {
      await expect(row.locator('.selected-work-category')).toBeVisible();
      await expect(row.locator('.selected-work-signal')).toBeVisible();
      await expect(row.locator('.selected-work-case-link')).toBeVisible();
    }

    await expect(page.locator('[data-selected-evidence] [data-evidence-image]')).toHaveAttribute('src', /cf-i04-reception-cover-authorized\.png$/);
    await expect(page.locator('[data-evidence-caption]')).toContainText(route === '/' ? 'local runtime capture' : 'runtime local');
    await expect(page.locator('[data-evidence-limitation]')).toContainText(route === '/' ? 'not remote product acceptance' : 'no aceptación remota');
    await expect(rows.nth(0).locator('.selected-work-mobile-evidence img')).toHaveAttribute('src', /cf-i05-housekeeping-authorized\.png$/);
    await expect(page.locator('a.selected-work-row')).toHaveCount(3);

    await page.keyboard.press('Tab');
    await page.locator('a.selected-work-row').first().focus();
    await expect(page.locator('a.selected-work-row').first()).toBeFocused();
    const outline = await page.locator('a.selected-work-row').first().evaluate((anchor) => getComputedStyle(anchor).outlineStyle);
    expect(outline).toBe('solid');
    expect(errors).toEqual([]);
  });
}

test('I4 mobile keeps row information inline and hides the desktop evidence pane', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('[data-project-index-item]')).toHaveCount(3);
  await expect(page.locator('[data-project-index-item]').first().locator('.selected-work-mobile-evidence img')).toBeVisible();
  await expect(page.locator('[data-selected-evidence]')).toBeHidden();
  const widths = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport);
});

test('I4 no-JS Home keeps all project links and static evidence available', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('a.selected-work-row')).toHaveCount(3);
  await expect(page.locator('[data-selected-evidence] img')).toHaveAttribute('src', /cf-i04-reception-cover-authorized\.png$/);
  await expect(page.getByRole('heading', { name: 'Systems built around real operational constraints.' })).toBeVisible();
  await context.close();
});

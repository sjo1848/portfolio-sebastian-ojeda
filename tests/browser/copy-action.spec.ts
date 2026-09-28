import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const route of [
  { path: '/', label: 'Copy email', success: 'Email copied.', error: 'Could not copy.' },
  { path: '/es/', label: 'Copiar email', success: 'Email copiado.', error: 'No se pudo copiar.' },
]) {
  test(`copy email ${route.path}: clipboard, fallback and inline error`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (value: string) => { (window as any).__copied = value; } },
      });
    });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route.path, { waitUntil: 'networkidle' });

    const copyButton = page.getByRole('button', { name: route.label });
    const mailto = page.locator('#contact a[href^="mailto:"]');
    await mailto.scrollIntoViewIfNeeded();
    await expect(copyButton).toBeVisible();
    await expect(mailto).toBeVisible();
    const emailAddress = page.locator('.contact-email-address');
    await expect(emailAddress).toHaveText('sebastian.ojeda.dev@gmail.com');
    expect(await emailAddress.evaluate((element) => getComputedStyle(element).userSelect)).not.toBe('none');
    const box = await copyButton.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
    await expect(page.locator('.copy-action-feedback')).toHaveText('');

    if (testInfo.project.name === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-5');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({ path: path.join(outputDir, `copy-${route.path === '/' ? 'en' : 'es'}-idle-390.png`), animations: 'disabled' });
    }

    await copyButton.focus();
    await page.keyboard.press(testInfo.project.name === 'chromium' ? 'Space' : 'Enter');
    await expect(page.locator('.copy-action-feedback')).toHaveText(route.success);
    expect(await page.evaluate(() => (window as any).__copied)).toBe('sebastian.ojeda.dev@gmail.com');
    if (testInfo.project.name === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-5');
      await page.screenshot({ path: path.join(outputDir, `copy-${route.path === '/' ? 'en' : 'es'}-success-390.png`), animations: 'disabled' });
    }

    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => { throw new Error('denied'); } },
      });
      Object.defineProperty(document, 'execCommand', { configurable: true, value: () => false });
    });
    await copyButton.click();
    await expect(page.locator('.copy-action-feedback')).toContainText(route.error);
    await expect(emailAddress).toBeVisible();
    if (testInfo.project.name === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-5');
      await page.screenshot({ path: path.join(outputDir, `copy-${route.path === '/' ? 'en' : 'es'}-error-390.png`), animations: 'disabled' });
    }
    expect(errors).toEqual([]);
  });

  test(`copy email ${route.path}: axe passes in idle, copied and error states`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Axe checks are consolidated in Chromium to reduce cross-browser suite contention.');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => undefined },
      });
    });
    await page.goto(route.path, { waitUntil: 'networkidle' });
    const button = page.getByRole('button', { name: route.label });
    await page.locator('#contact a[href^="mailto:"]').scrollIntoViewIfNeeded();

    for (const expected of ['', route.success]) {
      if (expected) {
        await button.click();
        await expect(page.locator('.copy-action-feedback')).toHaveText(expected);
      }
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(axe.violations).toEqual([]);
    }

    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => { throw new Error('denied'); } },
      });
      Object.defineProperty(document, 'execCommand', { configurable: true, value: () => false });
    });
    await button.click();
    await expect(page.locator('.copy-action-feedback')).toContainText(route.error);
    const errorAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(errorAxe.violations).toEqual([]);
  });
}

test('copy email uses legacy clipboard API when Clipboard API is absent', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    Object.defineProperty(document, 'execCommand', { configurable: true, value: () => true });
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-action-feedback')).toHaveText('Email copied.');
  await expect(page.getByRole('button', { name: 'Copy email' })).toBeFocused();
});

for (const route of [
  { path: '/', label: 'Copy email', error: 'Could not copy.' },
  { path: '/es/', label: 'Copiar email', error: 'No se pudo copiar.' },
]) {
  test(`copy action ${route.path} attempts a failing legacy fallback only once`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__legacyAttempts = 0;
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
      Object.defineProperty(document, 'execCommand', {
        configurable: true,
        value: () => { (window as any).__legacyAttempts += 1; return false; },
      });
    });
    await page.goto(route.path, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: route.label }).click();
    await expect(page.locator('.copy-action-feedback')).toContainText(route.error);
    expect(await page.evaluate(() => (window as any).__legacyAttempts)).toBe(1);
  });
}

test('copy feedback stays announced before a gradual reset to idle', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Timed announcement coverage runs once to avoid delaying every engine profile.');
  test.setTimeout(40_000);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => undefined },
    });
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  const button = page.getByRole('button', { name: 'Copy email' });
  const status = page.locator('.copy-action-feedback');

  await button.click();
  await expect(status).toHaveText('Email copied.');
  await page.waitForTimeout(7_000);
  await expect(status).toHaveText('Email copied.');
  await page.waitForTimeout(1_500);
  await expect(status).toHaveText('');

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => { throw new Error('denied'); } },
    });
    Object.defineProperty(document, 'execCommand', { configurable: true, value: () => false });
  });
  await button.click();
  await expect(status).toContainText('Could not copy.');
  await page.waitForTimeout(7_000);
  await expect(status).toContainText('Could not copy.');
  await page.waitForTimeout(1_500);
  await expect(status).toHaveText('');
});

test('mailto action remains available when the copy island cannot hydrate', async ({ page }) => {
  await page.route('**/_astro/CopyAction.*.js', (route) => route.abort());
  await page.goto('/es/', { waitUntil: 'networkidle' });
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:sebastian.ojeda.dev@gmail.com');
  await expect(page.locator('.contact-email-address')).toHaveText('sebastian.ojeda.dev@gmail.com');
  await expect(page.getByRole('button', { name: 'Copiar email' })).toBeVisible();
});

for (const route of [
  { path: '/', label: 'Copy email' },
  { path: '/es/', label: 'Copiar email' },
]) {
  test(`copy action ${route.path} retains keyboard focus while clipboard is pending`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: () => new Promise<void>((resolve, reject) => {
            (window as any).__settleClipboard = (success: boolean) => success ? resolve() : reject(new Error('denied'));
          }),
        },
      });
      Object.defineProperty(document, 'execCommand', { configurable: true, value: () => false });
    });
    await page.goto(route.path, { waitUntil: 'networkidle' });
    const button = page.locator('#contact .copy-action button');
    await expect(page.getByRole('button', { name: route.label })).toBeVisible();
    await button.scrollIntoViewIfNeeded();
    await button.focus();
    if (testInfo.project.name === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-6');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({
        path: path.join(outputDir, `copy-${route.path === '/' ? 'en' : 'es'}-keyboard-focus-390.png`),
        animations: 'disabled',
      });
    }
    await page.keyboard.press('Enter');
    await expect(button).toHaveAccessibleName(route.path === '/' ? 'Copying…' : 'Copiando…');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).toBeFocused();
    await page.evaluate(() => (window as any).__settleClipboard(true));
    await expect(page.locator('.copy-action-feedback')).toHaveText(route.path === '/' ? 'Email copied.' : 'Email copiado.');
    await expect(button).toBeFocused();
  });

  test(`copy action ${route.path} retains keyboard focus after a clipboard failure`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: () => new Promise<void>((_resolve, reject) => {
            (window as any).__settleClipboard = () => reject(new Error('denied'));
          }),
        },
      });
      Object.defineProperty(document, 'execCommand', { configurable: true, value: () => false });
    });
    await page.goto(route.path, { waitUntil: 'networkidle' });
    const button = page.locator('#contact .copy-action button');
    await expect(page.getByRole('button', { name: route.label })).toBeVisible();
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAccessibleName(route.path === '/' ? 'Copying…' : 'Copiando…');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).toBeFocused();
    await page.evaluate(() => (window as any).__settleClipboard());
    await expect(page.locator('.copy-action-feedback')).toContainText(route.path === '/' ? 'Could not copy.' : 'No se pudo copiar.');
    await expect(button).toBeFocused();
  });

  test(`copy action fits ${route.path} at narrow widths`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'networkidle' });
    const button = page.getByRole('button', { name: route.label });
    for (const width of [360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      const bounds = await button.boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(44);
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  });
}

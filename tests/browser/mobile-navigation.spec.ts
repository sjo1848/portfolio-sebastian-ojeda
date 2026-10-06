import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { name: 'en', path: '/', navLabel: 'Primary navigation', firstLink: 'Work', resumeLabel: 'Resume', sectionHref: '/#projects', localeHref: '/es/', localeCode: 'ES' },
  { name: 'es', path: '/es/', navLabel: 'Navegación principal', firstLink: 'Trabajo', resumeLabel: 'CV', sectionHref: '/es/#projects', localeHref: '/', localeCode: 'EN' },
] as const;

for (const route of routes) {
  test(`mobile navigation ${route.name}: keyboard, focus, locale and scroll`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      const text = message.text();
      const isFirefoxInspectorLayoutDiagnostic = testInfo.project.name === 'firefox'
        && message.type() === 'warning'
        && text.includes('Layout was forced before the page was fully loaded')
        && text.includes('debugger eval code');
      if ((message.type() === 'error' || message.type() === 'warning') && !isFirefoxInspectorLayoutDiagnostic) {
        pageErrors.push(`${message.type()}: ${text}`);
      }
    });
    await page.goto(route.path, { waitUntil: 'networkidle' });

    const trigger = page.locator('.mobile-nav-trigger');
    await expect(page.getByRole('button', { name: route.name === 'es' ? 'Menú' : 'Menu' })).toHaveCount(1);
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox?.width).toBeGreaterThanOrEqual(44);
    expect(triggerBox?.height).toBeGreaterThanOrEqual(44);
    await expect(page.getByRole('navigation')).toHaveCount(0);

    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: route.name === 'es' ? 'Navegación' : 'Navigation' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Sebastián Ojeda')).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: route.navLabel })).toHaveCount(1);
    await expect(dialog.getByRole('link', { name: route.firstLink })).toBeVisible();
    await expect(dialog.getByRole('link', { name: route.resumeLabel, exact: true })).toHaveAttribute('href', /cv-sebastian-ojeda.*\.pdf$/);
    const localeLink = dialog.locator('.mobile-nav-language');
    await expect(localeLink).toBeVisible();
    await expect(localeLink).toHaveAttribute('href', route.localeHref);
    await expect(localeLink).toHaveText(route.localeCode);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect.poll(
      () => dialog.evaluate((element) => element.contains(document.activeElement)),
      { intervals: [100, 250, 500, 1000], timeout: 5000 },
    ).toBe(true);

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations).toEqual([]);

    if (testInfo.project.name === 'chromium') {
      const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-1');
      await mkdir(outputDir, { recursive: true });
      await page.screenshot({
        path: path.join(outputDir, `mobile-nav-${route.name}-390-open.png`),
        animations: 'disabled',
      });
    }

    const links = dialog.getByRole('link');
    const firstFocusable = dialog.getByRole('button', { name: route.name === 'es' ? 'Cerrar navegación' : 'Close navigation' });
    const lastFocusable = links.last();
    await firstFocusable.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(lastFocusable).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(firstFocusable).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: route.firstLink }).click();
    await expect(page).toHaveURL(route.sectionHref);
    await expect(dialog).toBeHidden();

    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 700);
    });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollTop)).toBeGreaterThan(0);
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect.poll(() => page.evaluate(() => {
      const root = getComputedStyle(document.documentElement).overflowY;
      const body = getComputedStyle(document.body).overflowY;
      return root === 'hidden' || body === 'hidden';
    })).toBe(true);
    const scrollWhileLocked = await page.evaluate(() => document.scrollingElement?.scrollTop ?? 0);
    if (testInfo.project.name !== 'mobile-webkit') {
      await page.mouse.move(10, 700);
      await page.mouse.wheel(0, 500);
      await expect.poll(() => page.evaluate(() => document.scrollingElement?.scrollTop ?? 0)).toBe(scrollWhileLocked);
    }

    await localeLink.click();
    await expect(page).toHaveURL(route.name === 'es' ? /\/$/ : /\/es\/$/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(pageErrors).toEqual([]);
  });
}

test('static portfolio paths remain available when the navigation island cannot hydrate', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/_astro/MobileNavigation.*.js', (route) => route.abort());
  await page.goto('/', { waitUntil: 'networkidle' });

  const staticBrandLink = page.locator('.site-header [data-signature-brand]');
  await expect(staticBrandLink).toHaveAttribute('href', '/');
  await expect(page.locator('#hero .hero-role')).toBeVisible();
  await expect(page.locator('.selected-work-row').first()).toHaveAttribute('href', /\/projects\//);
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('#contact a[href*="github.com"]')).toBeVisible();

  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  await expect(page.locator('a.case-back-link').filter({ hasText: /back to projects|volver a proyectos/i }).first()).toBeVisible();
  await expect(page.locator('a[href*="github.com"]').first()).toBeVisible();
  expect(await page.locator('main').isVisible()).toBe(true);
});

test('mobile navigation fits a short 360px viewport, honors reduced motion, and closes at desktop breakpoint', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'mobile-webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 360, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const trigger = page.locator('.mobile-nav-trigger');
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.getAttribute('data-starting-style')).toBeNull();
  const panel = await dialog.boundingBox();
  expect(panel?.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(360);
  expect(panel!.height).toBeLessThanOrEqual(640);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  const transitionDuration = await page.locator('.ui-sheet-backdrop').evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(transitionDuration).toBeLessThanOrEqual(0.02);

  if (testInfo.project.name === 'chromium') {
    const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-1');
    await mkdir(outputDir, { recursive: true });
    await page.screenshot({
      path: path.join(outputDir, 'mobile-nav-en-360x640-open.png'),
      animations: 'disabled',
    });
  }

  const localeLink = dialog.locator('.mobile-nav-language');
  await localeLink.scrollIntoViewIfNeeded();
  await expect(localeLink).toBeVisible();

  await page.setViewportSize({ width: 768, height: 640 });
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('navigation')).toHaveCount(1);
  await expect(trigger).toBeHidden();
});

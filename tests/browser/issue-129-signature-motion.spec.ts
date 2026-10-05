import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const locales = [
  { path: '/', thesis: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS' },
  { path: '/es/', thesis: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS' },
] as const;

test.describe.configure({ timeout: 60_000 });

for (const locale of locales) {
  test(`#129 ${locale.path} no-JS Home remains complete and navigable`, async ({ browser }) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4184', javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.locator('#hero [data-opening-name]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(page.locator('#hero .hero-copy')).toBeVisible();
    await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
    await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
    await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
    await expect(page.locator('#operating-mindset li')).toHaveCount(3);
    await expect(page.locator('#additional-work li')).toHaveCount(6);
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await context.close();
  });

  test(`#129 ${locale.path} reduced-motion static composition passes axe`, async ({ page }, info) => {
    test.skip(!['chromium', 'firefox', 'webkit'].includes(info.project.name));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(page.locator('#hero .hero-copy')).toBeVisible();
    await expect(page.locator('#hero .button-primary')).toBeVisible();
    await expect(page.locator('#hero [data-proof-bridge]')).toBeHidden();
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  });
}

test('#129 failed Hero module returns to readable, navigable static Home', async ({ page }, info) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(info.project.name));
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    const testWindow = window as Window & { __runIssue129HeroFallback?: () => void };
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      if (timeout === 1400 && typeof handler === 'function') {
        testWindow.__runIssue129HeroFallback = () => (handler as (...callbackArgs: unknown[]) => void)(...args);
        return 1;
      }
      return nativeSetTimeout(handler, timeout, ...args);
    }) as typeof window.setTimeout;
  });
  await page.route('**/_astro/**', async (route) => {
    if (route.request().resourceType() === 'script') await route.abort('failed');
    else await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-hero-motion-pending', 'true');
  await page.evaluate(() => (window as Window & { __runIssue129HeroFallback?: () => void }).__runIssue129HeroFallback?.());
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'static');
  await expect(page.locator('#hero [data-opening-name]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#hero .hero-copy')).toBeVisible();
  await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
  await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
  const stagePosition = await page.locator('#hero [data-sequence-stage]').evaluate((node) => getComputedStyle(node).position);
  expect(stagePosition).not.toBe('sticky');
});

test('#129 primary Hero action remains keyboard reachable with visible focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const cta = page.locator('#hero .button-primary');
  await cta.focus();
  await expect(cta).toHaveCSS('outline-style', 'solid');
  await expect(cta).toBeInViewport();
  await cta.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toHaveAttribute('data-handoff-visible', 'true');
});

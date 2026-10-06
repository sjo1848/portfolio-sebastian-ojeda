import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const locales = [
  { path: '/', thesis: 'I build the systems behind real work.', role: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED' },
  { path: '/es/', thesis: 'Construyo los sistemas detrás del trabajo real.', role: 'DESARROLLADOR FULL-STACK · FOCO BACKEND' },
] as const;

for (const locale of locales) {
  test(`#129 ${locale.path} no-JS Home stays complete and navigable`, async ({ browser }) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4184', javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.locator('#hero .hero-role')).toHaveText(locale.role);
    await expect(page.locator('#hero .hero-opening-name')).toHaveText('Sebastián Ojeda');
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(page.locator('#hero .hero-copy')).toBeVisible();
    await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
    await expect(page.locator('#hero .hero-thesis-line')).toHaveCount(3);
    await expect(page.locator('#hero .hero-system-model')).toHaveCount(0);
    await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
    await expect(page.locator('#projects [data-selected-evidence] [data-evidence-image]')).toHaveAttribute('src', /cf-i04-reception-cover-authorized\.png$/);
    await expect(page.locator('#operating-mindset li')).toHaveCount(3);
    await expect(page.locator('#additional-work li')).toHaveCount(6);
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await context.close();
  });

  test(`#129 ${locale.path} reduced-motion Home passes axe without a sequence runtime`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(page.locator('#hero .hero-copy')).toBeVisible();
    await expect(page.locator('#hero .button-primary')).toBeVisible();
    await expect(page.locator('.hero-thesis-line > span').first()).toHaveCSS('animation-name', 'none');
    await expect(page.locator('#hero [data-sequence-stage]')).toHaveCount(0);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  });
}

test('#129 failed optional scripts leave the static Home fully usable', async ({ page }, info) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(info.project.name));
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.route('**/_astro/**', async (route) => {
    if (route.request().resourceType() === 'script') await route.abort('failed');
    else await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('I build the systems behind real work.');
  await expect(page.locator('#hero .hero-copy')).toBeVisible();
  await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
  await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
  await expect(page.locator('#projects [data-selected-evidence]')).toBeVisible();
});

test('#129 Hero action remains keyboard reachable and keeps native anchor behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const cta = page.locator('#hero .button-primary');
  await cta.focus();
  await expect(cta).toHaveCSS('outline-style', 'solid');
  await expect(cta).toBeInViewport();
  await cta.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
});

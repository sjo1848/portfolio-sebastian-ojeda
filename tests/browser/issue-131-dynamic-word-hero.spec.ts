import { expect, test } from '@playwright/test';

const locales = [
  { key: 'en', path: '/', canonical: 'SYSTEMS', sequence: ['SERVICES', 'PRODUCTS', 'SYSTEMS'], thesis: 'I build the systems behind real work.' },
  { key: 'es', path: '/es/', canonical: 'SISTEMAS', sequence: ['SERVICIOS', 'PRODUCTOS', 'SISTEMAS'], thesis: 'Construyo los sistemas detrás del trabajo real.' },
] as const;

const viewports = [
  { width: 1366, height: 768 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
] as const;

for (const locale of locales) {
  test(`#131 ${locale.key} dynamic word runs once and returns to the canonical thesis`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const slot = page.locator('[data-hero-word-slot]');
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(slot).toHaveAttribute('aria-hidden', 'true');
    await expect(slot).toHaveAttribute('data-current-word', locale.canonical);

    for (const word of locale.sequence) {
      await expect.poll(
        () => slot.getAttribute('data-current-word'),
        { timeout: 4_500, message: `expected the bounded word cycle to reach ${word}` },
      ).toBe(word);
    }

    await page.waitForTimeout(3_000);
    await expect(slot).toHaveAttribute('data-current-word', locale.canonical);
  });

  for (const viewport of viewports) {
    test(`#131 ${locale.key} word slot keeps headline geometry stable at ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium');
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      const slot = page.locator('[data-hero-word-slot]');
      const tail = page.locator('.hero-thesis-tail');
      const initialSlot = await slot.boundingBox();
      const initialTail = await tail.boundingBox();
      expect(initialSlot).not.toBeNull();
      expect(initialTail).not.toBeNull();

      await expect.poll(
        () => slot.getAttribute('data-current-word'),
        { timeout: 4_500 },
      ).not.toBe(locale.canonical);

      const changedSlot = await slot.boundingBox();
      const changedTail = await tail.boundingBox();
      expect(changedSlot).not.toBeNull();
      expect(changedTail).not.toBeNull();
      expect(Math.abs(changedSlot!.width - initialSlot!.width)).toBeLessThan(0.5);
      expect(Math.abs(changedTail!.x - initialTail!.x)).toBeLessThan(0.5);

      const geometry = await page.evaluate(() => {
        const thesis = document.querySelector<HTMLElement>('#hero .hero-thesis')!.getBoundingClientRect();
        return {
          left: thesis.left,
          right: thesis.right,
          viewport: document.documentElement.clientWidth,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      expect(geometry.left).toBeGreaterThanOrEqual(0);
      expect(geometry.right).toBeLessThanOrEqual(geometry.viewport);
      expect(geometry.overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test(`#131 ${locale.key} reduced motion keeps only the canonical semantic word`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const slot = page.locator('[data-hero-word-slot]');
    await expect(slot).toHaveAttribute('data-current-word', locale.canonical);
    await expect(slot).not.toHaveAttribute('data-cycle-ready', 'true');
    await page.waitForTimeout(3_100);
    await expect(slot).toHaveAttribute('data-current-word', locale.canonical);
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
  });
}

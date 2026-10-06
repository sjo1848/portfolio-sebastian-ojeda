import { expect, test } from '@playwright/test';

const locales = [
  { key: 'en', path: '/', thesis: 'I build the systems behind real work.', role: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED' },
  { key: 'es', path: '/es/', thesis: 'Construyo los sistemas detrás del trabajo real.', role: 'DESARROLLADOR FULL-STACK · FOCO BACKEND' },
] as const;
const viewports = [
  { width: 1366, height: 768 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
] as const;

for (const locale of locales) {
  for (const viewport of viewports) {
    test(`#129 ${locale.key} editorial Hero ${viewport.width}x${viewport.height} stays clear and in flow`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
      await expect(page.locator('#hero .hero-role')).toHaveText(locale.role);
      await expect(page.locator('#hero .hero-opening-name')).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
      await expect(page.locator('#hero .hero-copy')).toBeVisible();
      await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
      await expect(page.locator('#projects [data-project-index-item]').first()).toHaveAttribute('data-index', '01');
      await expect(page.locator('#projects [data-selected-evidence] [data-evidence-image]')).toHaveAttribute('src', /cf-i04-reception-cover-authorized\.png$/);

      const initial = await page.evaluate(() => {
        const hero = document.querySelector<HTMLElement>('#hero')!;
        const thesis = hero.querySelector<HTMLElement>('.hero-thesis')!;
        const cta = hero.querySelector<HTMLElement>('.button-primary')!;
        const rect = (element: HTMLElement) => {
          const box = element.getBoundingClientRect();
          return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
        };
        return {
          heroHeight: hero.offsetHeight,
          position: getComputedStyle(hero).position,
          thesis: rect(thesis),
          cta: rect(cta),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          runtimeMarkers: document.querySelectorAll('[data-sequence-stage], [data-flight-glyph], [data-proof-bridge]').length,
        };
      });
      expect(initial.position).not.toBe('sticky');
      expect(initial.heroHeight).toBeLessThan(viewport.height * 1.4);
      expect(initial.thesis.left).toBeGreaterThanOrEqual(0);
      expect(initial.thesis.right).toBeLessThanOrEqual(viewport.width);
      expect(initial.cta.left).toBeGreaterThanOrEqual(0);
      expect(initial.cta.right).toBeLessThanOrEqual(viewport.width);
      expect(initial.cta.bottom).toBeLessThanOrEqual(viewport.height);
      expect(initial.overflow).toBeLessThanOrEqual(0);
      expect(initial.runtimeMarkers).toBe(0);
      if (viewport.width === 1366) expect(initial.cta.bottom).toBeLessThanOrEqual(viewport.height);

      // Slow, fast and reverse navigation are ordinary document scrolling:
      // the Hero composition does not depend on crossing hidden state gates.
      const scrollStates = await page.evaluate(async () => {
        const hero = document.querySelector<HTMLElement>('#hero')!;
        const thesis = hero.querySelector<HTMLElement>('.hero-thesis')!;
        const start = hero.getBoundingClientRect().top + scrollY;
        const targets = [0, 140, 360, 720, 0];
        const values: Array<{ offset: number; visible: boolean; opacity: string }> = [];
        document.documentElement.style.scrollBehavior = 'auto';
        for (const offset of targets) {
          window.scrollTo({ top: start + offset, behavior: 'instant' });
          await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
          const style = getComputedStyle(thesis);
          values.push({ offset: scrollY - start, visible: style.visibility === 'visible' && style.display !== 'none', opacity: style.opacity });
        }
        return values;
      });
      for (const [index, target] of [0, 140, 360, 720, 0].entries()) {
        expect(Math.abs(scrollStates[index]!.offset - target)).toBeLessThan(1);
      }
      expect(scrollStates.every((state) => state.visible && state.opacity === '1')).toBe(true);
      expect(errors).toEqual([]);
    });
  }

  test(`#129 ${locale.key} reduced motion keeps the same static reading order`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.thesis);
    await expect(page.locator('#hero .hero-opening-name')).toHaveCount(0);
    await expect(page.locator('#hero .hero-copy')).toBeVisible();
    await expect(page.locator('#hero .button-primary')).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#projects')!.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
    await expect(page.locator('#projects')).toBeInViewport();
    await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
    await expect(page.locator('#hero [data-sequence-stage]')).toHaveCount(0);
    await expect(page.locator('.selected-work-mobile-image-frame img')).toHaveCSS('animation-name', 'none');
  });
}

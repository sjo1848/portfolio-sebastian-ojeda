import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const locales = [
  { id: 'en', route: '/', mindset: 'Understand the system. Build end-to-end. Verify the boundaries.', about: 'A little about me' },
  { id: 'es', route: '/es/', mindset: 'Entender el sistema. Construir end-to-end. Verificar los límites.', about: 'Un poco sobre mí' },
] as const;
const widths = [360, 390, 430, 768, 1024, 1440] as const;
const evidenceDir = path.resolve('artifacts/visual/issue-116-i7');

for (const locale of locales) {
  test(`I7 ${locale.id}: support sections remain complete and safe across the responsive matrix`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));

    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.goto(locale.route, { waitUntil: 'networkidle' });
      await expect(page.locator('#operating-mindset h2')).toHaveText(locale.mindset);
      await expect(page.locator('#operating-mindset > .container > ol > li')).toHaveCount(3);
      await expect(page.locator('#about h2')).toHaveText(locale.about);
      await expect(page.locator('#about .human-story-copy p').first()).toBeVisible();
      await expect(page.locator('#additional-work li')).toHaveCount(6);
      await expect(page.locator('#additional-work .additional-work-status')).toHaveCount(6);
      await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
      await expect(page.locator('#contact .copy-action button')).toBeVisible();
      await expect(page.locator('#contact a[href$="cv-sebastian-ojeda.pdf"], #contact a[href$="cv-sebastian-ojeda-en.pdf"]')).toBeVisible();

      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
        sections: ['#operating-mindset', '#about', '#additional-work', '#contact'].map((selector) => {
          const rect = document.querySelector(selector)!.getBoundingClientRect();
          return { selector, left: rect.left, right: rect.right };
        }),
        contactActions: [...document.querySelectorAll<HTMLElement>('#contact .hero-actions a, #contact .hero-actions button')].map((element) => {
          const rect = element.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        }),
      }));
      expect(geometry.page, `${locale.id} page overflow at ${width}px`).toBeLessThanOrEqual(geometry.viewport);
      for (const section of geometry.sections) {
        expect(section.left, `${locale.id} ${section.selector} left at ${width}px`).toBeGreaterThanOrEqual(-0.5);
        expect(section.right, `${locale.id} ${section.selector} right at ${width}px`).toBeLessThanOrEqual(width + 0.5);
      }
      for (const action of geometry.contactActions) {
        expect(action.width, `${locale.id} contact target width at ${width}px`).toBeGreaterThanOrEqual(44);
        expect(action.height, `${locale.id} contact target height at ${width}px`).toBeGreaterThanOrEqual(44);
      }

      if ((width === 390 || width === 1440) && testInfo.project.name === 'chromium') {
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axe.violations, `${locale.id} axe at ${width}px: ${JSON.stringify(axe.violations, null, 2)}`).toEqual([]);
        await mkdir(evidenceDir, { recursive: true });
        for (const section of ['operating-mindset', 'about', 'additional-work', 'contact']) {
          const file = `${section}-${locale.id}-${width}.png`;
          await page.locator(`#${section}`).screenshot({ path: path.join(evidenceDir, file), animations: 'disabled' });
        }
      }
    }
    expect(errors, `${locale.id} browser errors`).toEqual([]);
  });
}

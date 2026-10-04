import { expect, test } from '@playwright/test';

const locales = [
  { name: 'English', path: '/', headline: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS', workLabel: 'Work', aboutLabel: 'About', contactLabel: 'Contact', cvLabel: 'Resume', heroCta: 'View selected work' },
  { name: 'Spanish', path: '/es/', headline: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS', workLabel: 'Trabajo', aboutLabel: 'Sobre mí', contactLabel: 'Contacto', cvLabel: 'CV', heroCta: 'Ver trabajo seleccionado' },
] as const;

for (const locale of locales) {
  test(`${locale.name} Home IA, links and recruiter content work without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.headline);
    await expect(page.locator('.hero-copy')).toBeVisible();
    await expect(page.getByRole('link', { name: locale.heroCta })).toHaveAttribute('href', '#projects');
    await expect(page.getByRole('link', { name: locale.cvLabel, exact: true }).first()).toHaveAttribute('href', /cv-sebastian-ojeda.*\.pdf$/);
    await expect(page.locator('.hero-github-link')).toHaveAttribute('href', 'https://github.com/sjo1848');

    const sections = await page.locator('main > section').evaluateAll((elements) => elements.map((element) => element.id));
    expect(sections).toEqual(['hero', 'projects', 'operating-mindset', 'about', 'additional-work', 'contact']);
    await expect(page.locator('#operating-mindset li')).toHaveCount(3);
    await expect(page.locator('#additional-work li')).toHaveCount(6);
    await expect(page.locator('#projects .selected-work-case-link')).toHaveCount(3);
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();

    for (const anchor of await page.locator('a[href^="#"]').all()) {
      const href = await anchor.getAttribute('href');
      if (!href || href === '#') continue;
      await expect(page.locator(href)).toHaveCount(1);
    }
    await expect(page.locator('#capabilities, #experience, #process, .hero-proof-links, .brand-hero-evidence')).toHaveCount(0);
    await context.close();
  });

  test(`${locale.name} Home remains navigable and informative without JavaScript at mobile width`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('#projects .selected-work-row').first()).toHaveAttribute('href', /\/projects\//);
    await expect(page.locator('#additional-work .additional-work-description a')).toHaveCount(6);
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await context.close();
  });
}

import { expect, test } from '@playwright/test';

const locales = [
  {
    name: 'English',
    path: '/',
    role: 'Full-Stack Software Developer',
    proofTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'],
    proofStatus: ['Technically validated migration; acceptance remains separate', 'Active development', 'Phase 2.6 under agentic validation'],
    additionalTitles: ['UspaYa', 'GasFlow', 'Agentic Engineering Governance', 'HMS Elite', 'JM Soluciones Eléctricas', 'Taco Loco Foodtrack'],
  },
  {
    name: 'Spanish',
    path: '/es/',
    role: 'Desarrollador de Software Full-Stack',
    proofTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'],
    proofStatus: ['Migración validada técnicamente; aceptación separada', 'Desarrollo activo', 'Fase 2.6 en validación agentic'],
    additionalTitles: ['UspaYa', 'GasFlow', 'Agentic Engineering Governance', 'HMS Elite', 'JM Soluciones Eléctricas', 'Taco Loco Foodtrack'],
  },
] as const;

for (const locale of locales) {
  for (const width of [390, 768, 1440]) {
    test(`${locale.name} Home hierarchy keeps three lead proofs and six additional cases at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      await expect(page.locator('main h1')).toHaveText(locale.role);
      const heroProofs = page.locator('.hero-proof-links li');
      await expect(heroProofs).toHaveCount(3);
      await expect(heroProofs.locator('a')).toHaveText(locale.proofTitles);
      await expect(heroProofs.locator('span')).toHaveText(locale.proofStatus);
      for (const link of await heroProofs.locator('a').all()) {
        const box = await link.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
      const leadCards = page.locator('#projects article.project-card');
      const additionalCards = page.locator('#additional-work article.project-card');
      await expect(leadCards).toHaveCount(3);
      await expect(additionalCards).toHaveCount(6);
      await expect(leadCards.locator('h3')).toHaveText(locale.proofTitles);
      await expect(additionalCards.locator('h3')).toHaveText(locale.additionalTitles);

      const sectionIds = await page.locator('main > section').evaluateAll((sections) =>
        sections.map((section) => section.id || 'hero'),
      );
      expect(sectionIds).toEqual([
        'hero',
        'projects',
        'capabilities',
        'experience',
        'process',
        'about',
        'additional-work',
        'contact',
      ]);
      await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    });
  }
}

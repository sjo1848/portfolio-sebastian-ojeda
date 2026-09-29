import { expect, test } from '@playwright/test';

const locales = [
  {
    name: 'English',
    path: '/',
    methodSummary: 'View the eight Project Method phases',
    steps: ['Discover', 'Build', 'Verify'],
    capabilityProofs: [
      ['/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare', '/projects/alquileres-uspa/#case-quick-scan-alquileres-uspa'],
      ['/projects/alquileres-uspa/#case-quick-scan-alquileres-uspa'],
      ['/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare'],
      ['/projects/ai-commerce-platform/#case-quick-scan-ai-commerce-platform'],
      ['/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare', '/projects/ai-commerce-platform/#case-quick-scan-ai-commerce-platform'],
    ],
  },
  {
    name: 'Spanish',
    path: '/es/',
    methodSummary: 'Ver las ocho fases de Project Method',
    steps: ['Descubrir', 'Construir', 'Verificar'],
    capabilityProofs: [
      ['/es/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare', '/es/projects/alquileres-uspa/#case-quick-scan-alquileres-uspa'],
      ['/es/projects/alquileres-uspa/#case-quick-scan-alquileres-uspa'],
      ['/es/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare'],
      ['/es/projects/ai-commerce-platform/#case-quick-scan-ai-commerce-platform'],
      ['/es/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare', '/es/projects/ai-commerce-platform/#case-quick-scan-ai-commerce-platform'],
    ],
  },
] as const;

test.describe('Capability proof and native method disclosure without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const locale of locales) {
    test(`${locale.name} capability links and native method disclosure work without JavaScript`, async ({ page }) => {
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      const methodDetails = page.locator('#process details');
      await expect(methodDetails.locator('summary')).toHaveText(locale.methodSummary);
      await methodDetails.locator('summary').click();
      await expect(methodDetails).toHaveAttribute('open', '');
      await expect(methodDetails.locator('.method-flow li')).toHaveCount(8);

      await page.locator('#capabilities .capability-grid article').first().getByRole('link', { name: 'HMS Cloudflare' }).click();
      const expectedCaseUrl = new URL(`${locale.path === '/' ? '' : '/es'}/projects/hms-cloudflare/#case-quick-scan-hms-cloudflare`, page.url()).toString();
      await expect(page).toHaveURL(expectedCaseUrl);
      await expect(page.locator('#case-quick-scan-hms-cloudflare')).toBeVisible();
    });
  }
});

for (const locale of locales) {

  for (const width of [390, 768, 1440]) {
    test(`${locale.name} capability proof and method layers are discoverable at ${width}px`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') pageErrors.push(message.text());
      });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      const capabilityCards = page.locator('#capabilities .capability-grid article');
      await expect(capabilityCards).toHaveCount(5);
      for (let index = 0; index < locale.capabilityProofs.length; index += 1) {
        const proofHrefs = await capabilityCards.nth(index).locator('a').evaluateAll((links) =>
          links.map((link) => link.getAttribute('href')),
        );
        expect(proofHrefs).toEqual(locale.capabilityProofs[index]);
      }

      const summary = page.locator('#process details > summary');
      await expect(summary).toHaveText(locale.methodSummary);
      const quickSteps = page.locator('#process > div > ol.quick-method-grid li strong');
      await expect(quickSteps).toHaveText(locale.steps);
      const disclosure = page.locator('#process details');
      await expect(disclosure).not.toHaveAttribute('open', '');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('open', '');
      await expect(disclosure.locator('.method-flow li')).toHaveCount(8);
      expect(pageErrors).toEqual([]);
    });
  }
}

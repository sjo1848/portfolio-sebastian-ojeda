import { expect, test } from '@playwright/test';

const locales = [
  {
    lang: 'en',
    route: '/projects/alquileres-uspa/#gallery-alquileres-uspa',
    title: 'Verified screenshots',
    description: 'Reproducible visual evidence from the product, documented with synthetic data and explicit limitations.',
    limitation: 'Reproducible local captures from the NestJS/Vue product. Listings and illustrations are synthetic. There is no public deployment, and the images do not show real availability.',
  },
  {
    lang: 'es',
    route: '/es/projects/alquileres-uspa/#gallery-alquileres-uspa',
    title: 'Capturas verificadas',
    description: 'Evidencia visual reproducible del producto, documentada con datos sintéticos y límites explícitos.',
    limitation: 'Capturas locales reproducibles del producto NestJS/Vue. Los alojamientos y las ilustraciones son sintéticos. No hay despliegue público y las imágenes no muestran disponibilidad real.',
  },
] as const;

for (const locale of locales) {
  test(`C4 Alquileres ${locale.lang} gallery displays the approved synthetic/no-deployment limitation`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale.route, { waitUntil: 'networkidle' });

    const gallery = page.locator('#gallery-alquileres-uspa');
    await expect(gallery.locator('h2')).toHaveText(locale.title);
    await expect(gallery.locator('.section-heading > p').nth(1)).toHaveText(locale.description);
    await expect(gallery.locator('.gallery-proof-limitation')).toHaveText(locale.limitation);
    await expect(gallery.locator('.gallery-proof-limitation')).toBeVisible();
  });
}

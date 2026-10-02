import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { primaryStorySlugs, secondaryCaseSlugs } from '../../src/data/portfolioStories';
import { getHomepageProjectCover } from '../../src/data/homepageProjectCovers';
import { getProjectMedia } from '../../src/data/projectMedia';
import { projectProofs } from '../../src/data/projectProofs';

test('all published projects have truthful proof metadata and reproducible local provenance', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const expectedSlugs = [...primaryStorySlugs, ...secondaryCaseSlugs].sort();
  expect(Object.keys(projectProofs).sort()).toEqual(expectedSlugs);

  for (const [slug, proof] of Object.entries(projectProofs)) {
    expect(proof.preferredProofMode).toBeTruthy();
    expect(proof.currentProofMode).toBeTruthy();
    expect(['available', 'pending-external-gate', 'unavailable']).toContain(proof.proofReadiness);
    expect(proof.proofLimitations.en.length).toBeGreaterThan(20);
    expect(proof.proofLimitations.es.length).toBeGreaterThan(20);

    if (proof.proofReadiness === 'available') {
      expect(proof.currentProofMode).toBe(proof.preferredProofMode);
    }
    if (proof.currentProofMode === 'repository-case-only') {
      expect(proof.proofHref).toBeNull();
    }
    if (proof.proofHref) {
      expect(proof.proofHref.en).toMatch(/^#[a-z0-9-]+$/);
      expect(proof.proofHref.es).toMatch(/^#[a-z0-9-]+$/);
    }
    if (proof.proofProvenance.sourceCommit) {
      expect(proof.proofProvenance.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
    }

    for (const artifact of proof.proofProvenance.artifacts) {
      if (!artifact.sha256) continue;
      expect(artifact.path).toMatch(/^\//);
      const assetPath = path.join(process.cwd(), 'public', artifact.path.slice(1));
      expect(existsSync(assetPath), `${slug} artifact exists: ${artifact.path}`).toBe(true);
      const hash = createHash('sha256').update(readFileSync(assetPath)).digest('hex');
      expect(hash, `${slug} artifact hash: ${artifact.path}`).toBe(artifact.sha256);
    }
  }
});

test('HMS recruiter evidence fails closed to one canonical local artifact', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const proof = projectProofs['hms-cloudflare'];
  expect(proof.preferredProofMode).toBe('recorded-walkthrough');
  expect(proof.currentProofMode).toBe('visual-evidence');
  expect(proof.proofReadiness).toBe('pending-external-gate');
  expect(proof.proofHref).toEqual({ en: '#visual-evidence', es: '#evidencia-visual' });
  expect(proof.proofProvenance.sourceCommit).toBeNull();
  expect(proof.proofProvenance.artifacts.map(({ path }) => path)).toEqual([
    '/media/projects/hms-cloudflare/cf-i04-reception-cover-authorized.png',
    '/media/projects/hms-cloudflare/cf-i04-reception-lifecycle.png',
  ]);
  for (const removed of [
    'cf-i04-reception-authorized.png',
    'cf-i05-housekeeping-authorized.png',
    'cf-i05-integrated-housekeeping.png',
    'cf-i06-billing-authorized.png',
    'cf-i06-billing.png',
    'cf-i07-admin-authorized.png',
    'cf-i07-admin.png',
  ]) {
    expect(existsSync(path.join(process.cwd(), 'public/media/projects/hms-cloudflare', removed))).toBe(false);
    expect(existsSync(path.join(process.cwd(), 'dist/media/projects/hms-cloudflare', removed))).toBe(false);
  }
  expect(readFileSync(path.join(process.cwd(), 'scripts/vendor-project-media.sh'), 'utf8'))
    .toContain('HMS media vendoring disabled: exact source capture provenance is not verified.');
});

test('Alquileres keeps static synthetic evidence as the approved available proof mode', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const proof = projectProofs['alquileres-uspa'];
  expect(proof.preferredProofMode).toBe('visual-evidence');
  expect(proof.currentProofMode).toBe('visual-evidence');
  expect(proof.proofReadiness).toBe('available');
  expect(proof.proofHref).toEqual({ en: '#gallery-alquileres-uspa', es: '#gallery-alquileres-uspa' });
  expect(proof.proofProvenance.sourceCommit).toBe('267c531f3e3d5869240894063d3a194fa1f9680b');
  expect(proof.proofProvenance.artifacts).toHaveLength(3);
  const vendorScript = readFileSync(path.join(process.cwd(), 'scripts/vendor-project-media.sh'), 'utf8');
  expect(vendorScript).toContain('ALQUILERES_COMMIT=\"267c531f3e3d5869240894063d3a194fa1f9680b\"');
  expect(vendorScript).not.toContain('5bcde39e0ca8abd2d5d2e0a9e9c90c5b3bf47a51');
});

test('C3/C4 canonical proof captions and limitations match the approved bilingual copy', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');

  expect(projectProofs['hms-cloudflare'].proofLimitations).toEqual({
    en: 'Local regression captures with authorized test fixtures. They do not show remote Product Acceptance or a production release.',
    es: 'Capturas de regresión local con fixtures de prueba autorizados. No muestran Product Acceptance remoto ni un release de producción.',
  });
  expect(getHomepageProjectCover('hms-cloudflare')?.caption).toEqual({
    en: 'Local regression preview · authorized synthetic fixture; not Product Acceptance or a production release.',
    es: 'Vista previa de regresión local · fixture sintético autorizado; no es Product Acceptance ni un release de producción.',
  });
  expect(readFileSync(path.join(process.cwd(), 'content/projects-en/hms-cloudflare.md'), 'utf8')).toContain(
    'Local HMS reception workspace across booking, billing, and cash sections. Authorized synthetic fixture, not persisted. The capture shows interface areas; it does not prove a completed booking, payment, cash-close, remote acceptance, or production release.',
  );
  expect(readFileSync(path.join(process.cwd(), 'content/projects/hms-cloudflare.md'), 'utf8')).toContain(
    'Workspace local de recepción de HMS con secciones de reservas, facturación y caja. Fixture sintético autorizado, no persistido. La captura muestra áreas de interfaz; no prueba una reserva, pago o cierre de caja completado, aceptación remota ni release de producción.',
  );

  expect(projectProofs['alquileres-uspa'].proofLimitations).toEqual({
    en: 'Reproducible local captures from the NestJS/Vue product. Listings and illustrations are synthetic. There is no public deployment, and the images do not show real availability.',
    es: 'Capturas locales reproducibles del producto NestJS/Vue. Los alojamientos y las ilustraciones son sintéticos. No hay despliegue público y las imágenes no muestran disponibilidad real.',
  });
  expect(getHomepageProjectCover('alquileres-uspa')?.caption).toEqual({
    en: 'Synthetic catalog captured from the reproducible local runtime. Availability labels are fixture states, not current property availability.',
    es: 'Catálogo sintético capturado desde el runtime local reproducible. Las etiquetas de disponibilidad son estados del fixture, no disponibilidad actual de propiedades.',
  });
  const rentalGallery = getProjectMedia('alquileres-uspa')?.gallery ?? [];
  expect(rentalGallery.map(({ caption }) => caption)).toEqual([
    {
      en: 'Synthetic listing detail from the local runtime; it is not a real property listing or current availability.',
      es: 'Detalle sintético de una propiedad en el runtime local; no es una publicación real ni disponibilidad actual.',
    },
    {
      en: 'Synthetic catalog capture at 390 × 844. It documents this mobile layout only; it does not establish touch/accessibility coverage for every device.',
      es: 'Captura de catálogo sintético en 390 × 844. Documenta solo esta composición mobile; no acredita cobertura touch/accesibilidad en todos los dispositivos.',
    },
  ]);
});

test('UspaYa evidence is fail-closed and its case/repository remain available', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  const proof = projectProofs.uspaya;
  expect(proof.currentProofMode).toBe('repository-case-only');
  expect(proof.proofHref).toBeNull();
  expect(proof.proofProvenance.dataClassification).toBe('unverified-not-publishable');
  expect(proof.proofProvenance.artifacts).toEqual([]);
  expect(existsSync(path.join(process.cwd(), 'public/media/projects/uspaya'))).toBe(false);

  const vendorScript = readFileSync(path.join(process.cwd(), 'scripts/vendor-project-media.sh'), 'utf8');
  expect(vendorScript).not.toContain('USPAYA_COMMIT');
  expect(vendorScript).not.toContain('uspaya-courier-mobile.png');
  expect(vendorScript).not.toContain('sjo1848/UspaYa');

  for (const locale of ['content/projects/uspaya.md', 'content/projects-en/uspaya.md']) {
    expect(existsSync(path.join(process.cwd(), locale))).toBe(true);
  }
});

for (const [locale, route, githubLabel, privacyText] of [
  ['en', '/projects/uspaya/', 'View GitHub', 'Prior mobile images were removed'],
  ['es', '/es/projects/uspaya/', 'Ver GitHub', 'Se retiraron las imágenes mobile anteriores'],
] as const) {
  test(`UspaYa ${locale} keeps the case study and exposes no withdrawn media`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'networkidle' });

    await expect(page.locator('main h1')).toHaveText('UspaYa');
    await expect(page.locator('.hero-actions a[href="https://github.com/sjo1848/UspaYa"]')).toHaveAccessibleName(githubLabel);
    await expect(page.locator('.project-proof-note')).toContainText(privacyText);
    await expect(page.locator('img[src*="/media/projects/uspaya/"]')).toHaveCount(0);
    await expect(page.locator('a[href*="/media/projects/uspaya/"]')).toHaveCount(0);
    await expect(page.locator('#gallery-uspaya')).toHaveCount(0);
  });
}

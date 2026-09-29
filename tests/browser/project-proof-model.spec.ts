import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { primaryStorySlugs, secondaryCaseSlugs } from '../../src/data/portfolioStories';
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

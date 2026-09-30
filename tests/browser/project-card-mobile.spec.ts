import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const routes = [
  { name: 'en', path: '/', caseStudyName: /view case study/i },
  { name: 'es', path: '/es/', caseStudyName: /ver caso de estudio/i },
] as const;
const widths = [360, 390, 430] as const;
const variants = ['project-card-hero', 'project-card-story'] as const;

for (const route of routes) {
  for (const width of widths) {
    test(`${route.name} ProjectCard CTAs remain clear at ${width}px`, async ({ page }, testInfo) => {
      test.setTimeout(60_000);
      test.skip(!['chromium', 'mobile-webkit'].includes(testInfo.project.name));
      await page.setViewportSize({ width, height: 844 });
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          consoleErrors.push(`${message.type()}: ${message.text()}`);
        }
      });
      page.on('pageerror', (error) => consoleErrors.push(error.message));
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.locator('#projects').scrollIntoViewIfNeeded();

      const cards = page.locator('#projects article.project-card');
      await expect(cards).toHaveCount(3);
      for (const variant of variants) {
      await expect(page.locator(`#projects .${variant}, #additional-work .${variant}`).first()).toBeVisible();
      }

      const summaryLengths: number[] = [];
      let cardsWithCapture = 0;
      let cardsWithoutCapture = 0;
      for (const card of await cards.all()) {
        const context = card.locator('.project-context');
        summaryLengths.push((await context.innerText()).length);
        const cta = card.locator('.project-case-link');
        await cta.scrollIntoViewIfNeeded();
        await expect(cta).toBeVisible();
        const ctaName = await cta.innerText();
        const evidenceLabel = route.name === 'en' ? 'View evidence' : 'Ver evidencia';
        if (ctaName.includes(evidenceLabel)) await expect(cta).toHaveAccessibleName(evidenceLabel);
        else await expect(cta).toHaveAccessibleName(route.caseStudyName);
        const ctaTarget = await cta.getAttribute('href');
        expect(ctaTarget).not.toBeNull();
        const ctaBox = await cta.boundingBox();
        const cardBox = await card.boundingBox();
        expect(ctaBox?.width).toBeGreaterThanOrEqual(44);
        expect(ctaBox?.height).toBeGreaterThanOrEqual(44);
        expect(ctaBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
        expect(ctaBox!.x + ctaBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);

        const titleLink = card.locator('h3 a.project-title-link');
        await expect(titleLink).toBeVisible();
        const caseStudyTarget = await titleLink.getAttribute('href');
        expect(caseStudyTarget).not.toBeNull();
        if (ctaName.includes(evidenceLabel)) {
          expect(ctaTarget).toMatch(/^\/(?:es\/)?projects\/[a-z0-9-]+\/#(?:gallery-|visual-evidence|evidencia-visual|project-cover-)/);
        } else {
          expect(ctaTarget).toBe(caseStudyTarget);
        }
        if (await card.locator('.project-evidence-image').count()) {
          cardsWithCapture += 1;
          const captureLink = card.locator('.project-evidence-link');
          await expect(captureLink).toBeVisible();
          await expect(captureLink).toHaveAttribute('href', caseStudyTarget!);
          const image = captureLink.locator('img');
          await expect(image).toHaveAttribute('alt', /.+/);
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
        } else {
          cardsWithoutCapture += 1;
          await expect(card.locator('.project-evidence-placeholder')).toBeVisible();
        }
      }
      expect(cardsWithCapture).toBeGreaterThan(0);
      expect(cardsWithoutCapture).toBeGreaterThan(0);
      expect(Math.min(...summaryLengths)).toBeLessThan(Math.max(...summaryLengths));
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(consoleErrors).toEqual([]);

      const firstCta = cards.first().locator('.project-case-link');
      if (testInfo.project.name === 'chromium') {
        const outputDir = path.resolve('artifacts/visual/issue-116-i1');
        await mkdir(outputDir, { recursive: true });
        await page.setViewportSize({ width, height: 1_400 });
        await firstCta.scrollIntoViewIfNeeded();
        await cards.first().locator('.project-body').screenshot({
          path: path.join(outputDir, `lead-project-cta-${route.name}-${width}.png`),
          animations: 'disabled',
        });
      }

      const href = await firstCta.getAttribute('href');
      expect(href).not.toBeNull();
      await firstCta.click();
      await expect(page).toHaveURL(new RegExp(`${href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`));
      await expect(page.locator('main h1').first()).toBeVisible();
    });
  }
}

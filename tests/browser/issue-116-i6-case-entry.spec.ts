import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const cases = [
  {
    slug: 'hms-cloudflare', title: 'HMS Cloudflare', index: '01',
    en: '/projects/hms-cloudflare/', es: '/es/projects/hms-cloudflare/',
    enStatus: 'Technically validated migration; acceptance remains separate', esStatus: 'Migración validada técnicamente; aceptación separada',
    enRole: 'Migration architecture, full-stack implementation, security and operational QA', esRole: 'Arquitectura de migración, implementación full stack, seguridad y QA operacional',
    repository: 'https://github.com/sjo1848/hms-cloudflare',
  },
  {
    slug: 'alquileres-uspa', title: 'Alquileres Uspallata', index: '02',
    en: '/projects/alquileres-uspa/', es: '/es/projects/alquileres-uspa/',
    enStatus: 'Active development', esStatus: 'Desarrollo activo',
    enRole: 'Domain analysis, architecture, and full-stack development', esRole: 'Análisis de dominio, arquitectura y desarrollo full stack',
    repository: 'https://github.com/sjo1848/alquileres-uspa',
  },
  {
    slug: 'ai-commerce-platform', title: 'AI Commerce + HMS', index: '03',
    en: '/projects/ai-commerce-platform/', es: '/es/projects/ai-commerce-platform/',
    enStatus: 'Experimental prototype · Phase 2.6 under validation', esStatus: 'Prototipo experimental · fase 2.6 en validación',
    enRole: 'Product architecture, development, evaluation and orchestration', esRole: 'Arquitectura, desarrollo, evaluación y orquestación del producto',
    repository: 'https://github.com/sjo1848/ai-commerce-platform',
  },
] as const;

const widths = [360, 390, 430, 768, 1024, 1440];

for (const project of cases) {
  for (const [lang, route] of [['en', project.en], ['es', project.es]] as const) {
    test(`I6 ${project.slug} ${lang} entry grammar stays complete across the responsive matrix`, async ({ page }, testInfo) => {
      test.setTimeout(90_000);
      const errors: string[] = [];
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', (error) => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);

      const viewport = page.locator('.case-hero-cplus');
      const title = viewport.locator('h1');
      const back = viewport.locator('.case-back-link');
      await expect(title).toHaveText(project.title);
      await expect(viewport.locator('.case-project-index')).toHaveText(`${lang === 'es' ? 'PROYECTO' : 'PROJECT'} ${project.index} / 03`);
      await expect(viewport.locator('.eyebrow').first()).toBeVisible();
      await expect(viewport.locator('.case-entry-summary')).toBeVisible();
      await expect(viewport.locator('.project-meta dd').nth(0)).toHaveText(lang === 'en' ? project.enStatus : project.esStatus);
      await expect(viewport.locator('.project-meta dd').nth(1)).toHaveText(lang === 'en' ? project.enRole : project.esRole);
      await expect(viewport.locator('.case-evidence .stack-list')).toBeVisible();
      await expect(viewport.locator(`a[href="${project.repository}"]`)).toBeVisible();
      await expect(back).toHaveAttribute('href', lang === 'en' ? '/#projects' : '/es/#projects');

      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
        await expect(title).toBeVisible();
        const geometry = await page.evaluate(() => ({
          document: document.documentElement.scrollWidth,
          viewport: innerWidth,
          title: (() => {
            const rect = document.querySelector('.case-entry-title')!.getBoundingClientRect();
            return { left: rect.left, right: rect.right, width: rect.width, scroll: (document.querySelector('.case-entry-title') as HTMLElement).scrollWidth };
          })(),
        }));
        expect(geometry.document).toBeLessThanOrEqual(geometry.viewport);
        expect(geometry.title.left).toBeGreaterThanOrEqual(0);
        expect(geometry.title.right).toBeLessThanOrEqual(width);
        expect(geometry.title.scroll).toBeLessThanOrEqual(geometry.title.width + 1);

        if (width === 390 || width === 1440) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
          expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
          if (testInfo.project.name === 'chromium') {
            await mkdir('artifacts/visual/issue-116-i6', { recursive: true });
            await page.screenshot({ path: `artifacts/visual/issue-116-i6/${project.slug}-${lang}-${width}.png`, animations: 'disabled' });
          }
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

test('I6 Home-to-case navigation preserves normal anchor history and back/forward', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('.selected-work-row').first().click();
  await expect(page).toHaveURL('/projects/hms-cloudflare/');
  await page.goBack();
  await expect(page).toHaveURL('/');
  await page.goForward();
  await expect(page).toHaveURL('/projects/hms-cloudflare/');
  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page).toHaveURL('/#projects');
  await page.goBack();
  await expect(page).toHaveURL('/projects/hms-cloudflare/');
  await page.goForward();
  await expect(page).toHaveURL('/#projects');
  await expect(page.locator('#projects')).toBeInViewport();
});

test('I6 direct and case-study return links to Selected Work normalize the Hero in EN and ES', async ({ page }) => {
  const testInfo = test.info();
  test.setTimeout(60_000);
  const locales = [
    { fragment: '/#projects', caseStudy: '/projects/hms-cloudflare/' },
    { fragment: '/es/#projects', caseStudy: '/es/projects/hms-cloudflare/' },
  ] as const;
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 390, height: 844 });

  for (const locale of locales) {
    const assertStaticFragmentEntry = async () => {
      await expect(page).toHaveURL(locale.fragment);
      await expect(page.locator('#projects')).toBeInViewport();
      await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
      await expect(page.locator('html')).not.toHaveAttribute('data-hero-motion-pending', 'true');
      await expect(page.locator('html')).toHaveAttribute('data-hero-signature-visible', 'true');
      await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'static');
      const stagePosition = await page.locator('#hero [data-sequence-stage]').evaluate((stage) => getComputedStyle(stage).position);
      expect(stagePosition).not.toBe('sticky');
      if (testInfo.project.name === 'chromium') {
        await mkdir('artifacts/visual/issue-129-final-findings', { recursive: true });
        const locale = page.url().startsWith('http://127.0.0.1:4184/es/') ? 'es' : 'en';
        await page.screenshot({ path: `artifacts/visual/issue-129-final-findings/${locale}-selected-work-fragment.png`, animations: 'disabled' });
      }
    };

    await page.goto(locale.fragment, { waitUntil: 'networkidle' });
    await assertStaticFragmentEntry();

    await page.goto(locale.caseStudy, { waitUntil: 'networkidle' });
    await page.locator('.case-back-link').click();
    await assertStaticFragmentEntry();
    await expect(page.locator('.site-header [data-signature-brand]')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('I6 lead case entry remains visible and navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/es/projects/hms-cloudflare/');
  await expect(page.locator('.case-entry-title')).toHaveText('HMS Cloudflare');
  await expect(page.locator('.case-project-index')).toHaveText('PROYECTO 01 / 03');
  await expect(page.locator('.case-back-link')).toHaveAttribute('href', '/es/#projects');
  const staticEvidence = page.locator('.prose a[data-media-viewer-trigger]');
  await expect(staticEvidence).toHaveCount(1);
  await expect(staticEvidence).toHaveAttribute('href', '/media/projects/hms-cloudflare/cf-i04-reception-lifecycle.png');
  await expect(staticEvidence.first().locator('img')).toBeVisible();
  await page.locator('.case-back-link').click();
  await expect(page).toHaveURL('/es/#projects');
  await context.close();
});

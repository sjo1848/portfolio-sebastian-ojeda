import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  {
    slug: 'hms-cloudflare',
    en: '/projects/hms-cloudflare/',
    es: '/es/projects/hms-cloudflare/',
    title: 'HMS Cloudflare',
    repository: 'https://github.com/sjo1848/hms-cloudflare',
    enRole: 'Migration architecture, full-stack implementation, security and operational QA',
    esRole: 'Arquitectura de migración, implementación full stack, seguridad y QA operacional',
    enStatus: 'Technically validated migration; acceptance remains separate',
    esStatus: 'Migración validada técnicamente; aceptación separada',
    enEvidence: /Local automated and browser regressions/,
    esEvidence: /regresiones automatizadas y de navegador locales/,
    enLimits: /Remote Product Acceptance/,
    esLimits: /aceptación remota/,
  },
  {
    slug: 'alquileres-uspa',
    en: '/projects/alquileres-uspa/',
    es: '/es/projects/alquileres-uspa/',
    title: 'Alquileres Uspallata',
    repository: 'https://github.com/sjo1848/alquileres-uspa',
    enRole: 'Domain analysis, architecture, and full-stack development',
    esRole: 'Análisis de dominio, arquitectura y desarrollo full stack',
    enStatus: 'Active development',
    esStatus: 'Desarrollo activo',
    enEvidence: /reproducible catalog and listing captures made with synthetic data/,
    esEvidence: /capturas reproducibles del catálogo y las propiedades con datos sintéticos/,
    enLimits: /There is no public deployment/,
    esLimits: /No hay despliegue público/,
  },
  {
    slug: 'ai-commerce-platform',
    en: '/projects/ai-commerce-platform/',
    es: '/es/projects/ai-commerce-platform/',
    title: 'AI Commerce + HMS',
    repository: 'https://github.com/sjo1848/ai-commerce-platform',
    enRole: 'Product architecture, development, evaluation and orchestration',
    esRole: 'Arquitectura, desarrollo, evaluación y orquestación del producto',
    enStatus: 'Experimental prototype · Phase 2.6 under validation',
    esStatus: 'Prototipo experimental · fase 2.6 en validación',
    enEvidence: /Phase 2.5 documents controlled HMS staging/,
    esEvidence: /La fase 2.5 documenta pruebas controladas en staging de HMS/,
    enLimits: /Phase 2.6 remains under evaluation/,
    esLimits: /La fase 2.6 continúa en evaluación/,
  },
] as const;

for (const route of routes) {
  for (const [lang, path] of [['en', route.en], ['es', route.es]] as const) {
    for (const width of [390, 1440]) {
      test(`${route.title} ${lang} quick scan is complete and readable at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        const messages: string[] = [];
        page.on('console', (message) => {
          if (message.type() === 'error' || message.type() === 'warning') messages.push(`${message.type()}: ${message.text()}`);
        });
        page.on('pageerror', (error) => messages.push(error.message));
        await page.goto(path, { waitUntil: 'networkidle' });

        const quickScan = page.locator(`#case-quick-scan-${route.slug}`);
        await expect(quickScan).toBeVisible();
        await expect(quickScan.locator('h2')).toBeVisible();
        await expect(quickScan.locator('dl > div')).toHaveCount(4);
        const fieldNames = await quickScan.locator('dt').allTextContents();
        expect(fieldNames).toEqual(lang === 'en'
          ? ['Problem', 'System', 'Evidence and validation', 'Limitations']
          : ['Problema', 'Sistema', 'Evidencia y validación', 'Límites']);

        await expect(page.locator('.project-meta dd').nth(0)).toHaveText(lang === 'en' ? route.enStatus : route.esStatus);
        await expect(page.locator('.project-meta dd').nth(1)).toHaveText(lang === 'en' ? route.enRole : route.esRole);
        await expect(quickScan.locator('dd').nth(2)).toContainText(lang === 'en' ? route.enEvidence : route.esEvidence);
        await expect(quickScan.locator('dd').nth(3)).toContainText(lang === 'en' ? route.enLimits : route.esLimits);
        await expect(quickScan.locator('a[href^="https://github.com/"]')).toHaveAttribute('href', route.repository);
        await expect(quickScan.locator('.case-quick-scan-demo')).toContainText(lang === 'en' ? 'No public demo link is provided.' : 'No se proporciona un enlace a una demo pública.');
        await expect(quickScan.locator('.case-quick-scan-demo a')).toHaveCount(0);
        await expect(quickScan.locator('a.button-primary')).toHaveAttribute('href', /^#[a-z0-9-]+$/);

        const order = await page.locator('.case-hero, .case-quick-scan, .project-gallery, .content-layout').evaluateAll((nodes) =>
          nodes.map((node) => node.classList.contains('case-hero') ? 'hero' : node.classList.contains('case-quick-scan') ? 'quick-scan' : node.classList.contains('project-gallery') ? 'gallery' : 'narrative'),
        );
        expect(order[0]).toBe('hero');
        expect(order[1]).toBe('quick-scan');
        expect(order.at(-1)).toBe('narrative');

        const links = await quickScan.locator('a').evaluateAll((nodes) => nodes.map((node) => {
          const anchor = node as HTMLAnchorElement;
          return { width: anchor.getBoundingClientRect().width, height: anchor.getBoundingClientRect().height };
        }));
        for (const box of links) {
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
        expect(messages).toEqual([]);

        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
      });
    }
  }

  for (const [lang, path] of [['en', route.en], ['es', route.es]] as const) {
    test(`${route.title} ${lang} quick scan and narrative link work without JavaScript`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({
        baseURL,
        javaScriptEnabled: false,
        viewport: { width: 390, height: 844 },
      });
      const page = await context.newPage();
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const quickScan = page.locator(`#case-quick-scan-${route.slug}`);
      await expect(quickScan.locator('dd')).toHaveCount(4);
      const continueLink = quickScan.getByRole('link', { name: lang === 'en' ? 'Read the full technical case' : 'Leer el caso técnico completo' });
      const target = await continueLink.getAttribute('href');
      expect(target).toMatch(/^#[a-z0-9-]+$/);
      await continueLink.click();
      await expect.poll(() => new URL(page.url()).hash).toBe(target);
      await expect(page.locator(target!)).toBeInViewport();
      await context.close();
    });
  }
}

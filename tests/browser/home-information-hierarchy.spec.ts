import { expect, test } from '@playwright/test';

const locales = [
  {
    name: 'English', path: '/', role: 'RELIABLE SOFTWARE FOR COMPLEX OPERATIONS',
    heroEyebrow: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED',
    heroCopy: 'I design and build systems where workflows, APIs, data and infrastructure have to work together.',
    heroCta: 'View selected work',
    nav: ['Work', 'About', 'Contact', 'Resume'],
    workTitle: 'Systems built around real operational constraints.',
    workIntro: 'Three backend-oriented cases showing ownership, architecture and available evidence.',
    leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'],
    leadStatuses: ['Technically validated migration; acceptance remains separate', 'Active development', 'Experimental prototype · Phase 2.6 under validation'],
    additionalTitles: ['UspaYa', 'GasFlow', 'Agentic Engineering Governance', 'HMS Elite', 'JM Soluciones Eléctricas', 'Taco Loco Foodtrack'],
    mindsetTitles: ['Understand systems', 'Build end-to-end', 'Verify boundaries'],
    mindsetTitle: 'Understand the system. Build end-to-end. Verify the boundaries.',
    aboutTitle: 'A little about me',
    aboutParagraphs: [
      'I live in Uspallata, Mendoza. Before focusing on software development I worked across support, infrastructure, SAP and integrations, which taught me to see software inside real processes rather than as isolated pieces.',
      'I am driven by difficult problems and new domains. Away from the screen I run, hike and spend time in the mountains; living in Uspallata keeps that contrast close.',
    ],
    contactTitle: 'Open to Full-Stack and Backend opportunities.',
    contactBody: 'Remote-first from Mendoza, Argentina. Hybrid, on-site and relocation can be considered for the right opportunity.',
  },
  {
    name: 'Spanish', path: '/es/', role: 'SOFTWARE CONFIABLE PARA OPERACIONES COMPLEJAS',
    heroEyebrow: 'DESARROLLADOR FULL-STACK · FOCO BACKEND',
    heroCopy: 'Diseño y construyo sistemas donde los flujos de trabajo, las API, los datos y la infraestructura deben funcionar en conjunto.',
    heroCta: 'Ver trabajo seleccionado',
    nav: ['Trabajo', 'Sobre mí', 'Contacto', 'CV'],
    workTitle: 'Sistemas construidos alrededor de restricciones operativas reales.',
    workIntro: 'Tres casos con foco backend, ownership, arquitectura y evidencia disponible.',
    leadTitles: ['HMS Cloudflare', 'Alquileres Uspallata', 'AI Commerce + HMS'],
    leadStatuses: ['Migración validada técnicamente; aceptación separada', 'Desarrollo activo', 'Prototipo experimental · fase 2.6 en validación'],
    additionalTitles: ['UspaYa', 'GasFlow', 'Agentic Engineering Governance', 'HMS Elite', 'JM Soluciones Eléctricas', 'Taco Loco Foodtrack'],
    mindsetTitles: ['Entender sistemas', 'Construir end-to-end', 'Verificar límites'],
    mindsetTitle: 'Entender el sistema. Construir end-to-end. Verificar los límites.',
    aboutTitle: 'Un poco sobre mí',
    aboutParagraphs: [
      'Vivo en Uspallata, Mendoza. Antes de concentrarme en desarrollo trabajé en soporte, infraestructura, SAP e integraciones, y ese recorrido me enseñó a mirar el software dentro de procesos reales y no como piezas aisladas.',
      'Me mueven los problemas difíciles y los dominios nuevos. Fuera de la pantalla corro, camino y paso tiempo en la montaña; vivir en Uspallata mantiene cerca ese contraste.',
    ],
    contactTitle: 'Busco oportunidades Full-Stack y Backend.',
    contactBody: 'Remoto prioritario desde Mendoza, Argentina. Puedo evaluar modalidad híbrida, presencial o reubicación según la oportunidad.',
  },
] as const;

for (const locale of locales) {
  for (const viewport of [{ width: 1366, height: 768 }, { width: 1440, height: 900 }]) {
    test(`${locale.name} Hero role, lead and both CTAs fit ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium');
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize(viewport);
      await page.goto(locale.path, { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('.hero-copy')).toBeVisible();

      const actions = page.locator('#hero .hero-actions a');
      await expect(actions).toHaveCount(2);
      await expect(actions.nth(0)).toBeVisible();
      await expect(actions.nth(1)).toBeVisible();
      const bounds = await actions.evaluateAll((links) => links.map((link) => {
        const { x, y, width, height, top, right, bottom, left } = link.getBoundingClientRect();
        return { href: link.getAttribute('href'), x, y, width, height, top, right, bottom, left };
      }));
      expect(bounds[0].href).toBe('#projects');
      expect(bounds[1].href).toBe('https://github.com/sjo1848');
      for (const button of bounds) {
        expect(button.top).toBeGreaterThanOrEqual(0);
        expect(button.bottom).toBeLessThanOrEqual(viewport.height);
        expect(button.left).toBeGreaterThanOrEqual(0);
        expect(button.right).toBeLessThanOrEqual(viewport.width);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
      expect(errors).toEqual([]);
    });
  }

  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    test(`${locale.name} Home I1 content hierarchy at ${width}px`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') pageErrors.push(message.text()); });
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.goto(locale.path, { waitUntil: 'networkidle' });

      await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(locale.role);
      await expect(page.locator('#hero .eyebrow')).toHaveText(locale.heroEyebrow);
      await expect(page.locator('.hero-copy')).toHaveText(locale.heroCopy);
      await expect(page.locator('.hero-github-link')).toBeVisible();
      await expect(page.locator('.hero-proof-links, .brand-hero-evidence')).toHaveCount(0);
      await expect(page.getByRole('link', { name: locale.heroCta, exact: true })).toHaveAttribute('href', '#projects');
      await expect(page.locator('#hero .hero-actions a')).toHaveCount(2);
      await expect(page.locator('#hero').getByRole('link', { name: /resume|cv|currículum/i })).toHaveCount(0);

      const sectionIds = await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.id));
      expect(sectionIds).toEqual(['hero', 'projects', 'operating-mindset', 'about', 'additional-work', 'contact']);

      const leadCards = page.locator('#projects [data-project-index-item]');
      await expect(page.locator('#projects h2')).toHaveText(locale.workTitle);
      await expect(page.locator('#projects .section-heading > p:last-child')).toHaveText(locale.workIntro);
      await expect(leadCards).toHaveCount(3);
      await expect(leadCards.locator('h3')).toHaveText(locale.leadTitles);
      if (width >= 768) {
        await expect(page.locator('#projects [data-evidence-caption]')).toBeVisible();
        await expect(page.locator('#projects [data-selected-evidence] .selected-work-evidence-heading > span').nth(1)).toHaveText(locale.leadStatuses[0]);
      } else {
        await expect(page.locator('#projects .selected-work-mobile-evidence figcaption')).toBeVisible();
      }
      const additional = page.locator('#additional-work .additional-work-description a');
      await expect(additional).toHaveCount(6);
      await expect(additional).toHaveText(locale.additionalTitles);
      await expect(page.locator('#additional-work .additional-work-status')).toHaveCount(6);
      await expect(page.locator('#operating-mindset li h3')).toHaveText(locale.mindsetTitles);
      await expect(page.locator('#operating-mindset h2')).toHaveText(locale.mindsetTitle);
      await expect(page.locator('#about h2')).toHaveText(locale.aboutTitle);
      await expect(page.locator('#about .human-story-copy p')).toHaveText(locale.aboutParagraphs);
      await expect(page.locator('#contact h2')).toHaveText(locale.contactTitle);
      await expect(page.locator('#contact > .contact-panel > div:first-child > p:nth-of-type(2)')).toHaveText(locale.contactBody);

      if (width >= 768) {
        const navigation = page.locator('.desktop-navigation');
        await expect(navigation.getByRole('link')).toHaveText(locale.nav);
        for (const link of await navigation.locator('a[href^="#"]').all()) {
          const href = await link.getAttribute('href');
          await expect(page.locator(href!)).toHaveCount(1);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const heroTextBounds = await page.locator('.hero-thesis').evaluate((heading) => {
        const hero = document.querySelector('#hero')!.getBoundingClientRect();
        const rect = heading.getBoundingClientRect();
        return { left: rect.left, right: rect.right, heroLeft: hero.left, heroRight: hero.right };
      });
      expect(heroTextBounds.left, `${locale.name} ${width}px title left edge`).toBeGreaterThanOrEqual(heroTextBounds.heroLeft - 0.5);
      expect(heroTextBounds.right, `${locale.name} ${width}px title right edge`).toBeLessThanOrEqual(heroTextBounds.heroRight + 0.5);
      expect(heroTextBounds.right, `${locale.name} ${width}px title viewport edge`).toBeLessThanOrEqual(width + 0.5);
      await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
      expect(pageErrors).toEqual([]);
    });
  }
}

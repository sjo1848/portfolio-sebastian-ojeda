import { expect, test } from '@playwright/test';

const locales = [
  {
    key: 'en',
    path: '/',
    triggers: ['Understand the system.', 'Build end-to-end.', 'Verify the boundaries.'],
    descriptions: [
      'I map actors, states, constraints, authority and failure paths before treating the UI or API as the whole problem.',
      'I connect backend services, data, integrations and interfaces with architecture proportional to the problem.',
      'I use tests, browser validation, security checks and operational evidence to distinguish technical PASS from product or release claims.',
    ],
  },
  {
    key: 'es',
    path: '/es/',
    triggers: ['Entender el sistema.', 'Construir end-to-end.', 'Verificar los límites.'],
    descriptions: [
      'Mapeo actores, estados, restricciones, autoridad y fallos antes de tratar la UI o la API como si fueran todo el problema.',
      'Conecto backend, datos, integraciones e interfaces con una arquitectura proporcional al problema.',
      'Uso pruebas, validación en navegador, controles de seguridad y evidencia operacional para separar un PASS técnico de una aceptación o release.',
    ],
  },
] as const;

for (const locale of locales) {
  test(`#133 ${locale.key} mindset phrase activates matching explanation by click and keyboard focus`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const root = page.locator('[data-operating-mindset]');
    const triggers = root.locator('[data-mindset-trigger]');
    const panels = root.locator('[data-mindset-panel]');

    await expect(root).toHaveAttribute('data-mindset-enhanced', 'true');
    await expect(triggers).toHaveCount(3);
    await expect(panels).toHaveCount(3);
    await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(panels.nth(0)).toHaveAttribute('data-state', 'active');

    await triggers.nth(1).click();
    await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(panels.nth(1)).toHaveAttribute('data-state', 'active');
    await expect(panels.nth(1)).toContainText(locale.descriptions[1]);

    await triggers.nth(2).focus();
    await expect(triggers.nth(2)).toHaveAttribute('aria-expanded', 'true');
    await expect(panels.nth(2)).toHaveAttribute('data-state', 'active');
    await expect(panels.nth(2)).toContainText(locale.descriptions[2]);
  });

  test(`#133 ${locale.key} hover-capable pointer activates the phrase explanation`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const triggers = page.locator('[data-mindset-trigger]');
    const panels = page.locator('[data-mindset-panel]');
    await triggers.nth(1).hover();
    await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(panels.nth(1)).toHaveAttribute('data-state', 'active');
  });

  test(`#133 ${locale.key} reduced motion keeps interaction functional without transition motion`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const trigger = page.locator('[data-mindset-trigger]').nth(2);
    const panel = page.locator('[data-mindset-panel]').nth(2);
    await trigger.click();
    await expect(panel).toHaveAttribute('data-state', 'active');
    await expect(panel).toHaveCSS('transition-duration', '0s');
  });

  test(`#133 ${locale.key} no-JS keeps all explanations available through native anchors`, async ({ browser }, info) => {
    test.skip(info.project.name !== 'chromium');
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'domcontentloaded' });

    const triggers = page.locator('[data-mindset-trigger]');
    const panels = page.locator('[data-mindset-panel]');
    await expect(triggers).toHaveCount(3);
    await expect(panels).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await expect(triggers.nth(index)).toHaveAttribute('href', `#operating-mindset-detail-${index + 1}`);
      await expect(panels.nth(index)).toContainText(locale.descriptions[index]);
      await expect(panels.nth(index)).toBeVisible();
    }
    await context.close();
  });
}

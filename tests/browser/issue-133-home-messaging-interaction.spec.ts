import { expect, test } from '@playwright/test';

const locales = [
  {
    key: 'en',
    path: '/',
    heading: 'How I work',
    triggers: ['Understand the system.', 'Build end-to-end.', 'Verify the boundaries.'],
    labels: ['Understand the system', 'Build end-to-end', 'Verify the boundaries'],
    descriptions: [
      'I map actors, states, constraints, authority and failure paths before treating the UI or API as the whole problem.',
      'I connect backend services, data, integrations and interfaces with architecture proportional to the problem.',
      'I use tests, browser validation, security checks and operational evidence to distinguish technical PASS from product or release claims.',
    ],
  },
  {
    key: 'es',
    path: '/es/',
    heading: 'Cómo trabajo',
    triggers: ['Entender el sistema.', 'Construir end-to-end.', 'Verificar los límites.'],
    labels: ['Entender el sistema', 'Construir end-to-end', 'Verificar los límites'],
    descriptions: [
      'Mapeo actores, estados, restricciones, autoridad y fallos antes de tratar la UI o la API como si fueran todo el problema.',
      'Conecto backend, datos, integraciones e interfaces con una arquitectura proporcional al problema.',
      'Uso pruebas, validación en navegador, controles de seguridad y evidencia operacional para separar un PASS técnico de una aceptación o release.',
    ],
  },
] as const;

for (const locale of locales) {
  test(`#133 ${locale.key} approved phrase spotlight activates one stable explanation panel`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const root = page.locator('[data-operating-mindset]');
    const triggers = root.locator('[data-mindset-trigger]');
    const panel = root.locator('[data-mindset-panel]');
    const label = root.locator('[data-mindset-label]');
    const copy = root.locator('[data-mindset-copy]');

    await expect(root).toHaveAttribute('data-mindset-enhanced', 'true');
    await expect(root.locator('h2')).toHaveText(locale.heading);
    await expect(triggers).toHaveCount(3);
    await expect(triggers).toHaveText(locale.triggers);
    await expect(panel).toHaveCount(1);
    await expect(triggers.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(label).toHaveText(locale.labels[0]);
    await expect(copy).toHaveText(locale.descriptions[0]);

    const initialPanelBox = await panel.boundingBox();

    await triggers.nth(1).click();
    await expect(triggers.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(label).toHaveText(locale.labels[1]);
    await expect(copy).toHaveText(locale.descriptions[1]);

    await triggers.nth(2).focus();
    await expect(triggers.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(label).toHaveText(locale.labels[2]);
    await expect(copy).toHaveText(locale.descriptions[2]);

    const finalPanelBox = await panel.boundingBox();
    expect(initialPanelBox?.x).toBe(finalPanelBox?.x);
    expect(initialPanelBox?.width).toBe(finalPanelBox?.width);
  });

  test(`#133 ${locale.key} hover-capable pointer changes the spotlight phrase`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const triggers = page.locator('[data-mindset-trigger]');
    await triggers.nth(1).hover();
    await expect(triggers.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-mindset-copy]')).toHaveText(locale.descriptions[1]);
  });

  test(`#133 ${locale.key} mobile tap keeps the explanation readable`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const trigger = page.locator('[data-mindset-trigger]').nth(2);
    const panel = page.locator('[data-mindset-panel]');
    await trigger.click();
    await expect(panel).toBeVisible();
    await expect(page.locator('[data-mindset-copy]')).toHaveText(locale.descriptions[2]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test(`#133 ${locale.key} reduced motion removes spotlight transitions`, async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale.path, { waitUntil: 'networkidle' });

    const trigger = page.locator('[data-mindset-trigger]').nth(1);
    await trigger.click();
    await expect(trigger).toHaveCSS('transition-duration', '0s');
    await expect(page.locator('[data-mindset-copy]')).toHaveText(locale.descriptions[1]);
  });

  test(`#133 ${locale.key} no-JS preserves every explanation as fallback content`, async ({ browser }, info) => {
    test.skip(info.project.name !== 'chromium');
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(locale.path, { waitUntil: 'domcontentloaded' });

    const fallback = page.locator('[data-mindset-fallback] li');
    await expect(fallback).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await expect(fallback.nth(index)).toContainText(locale.labels[index]);
      await expect(fallback.nth(index)).toContainText(locale.descriptions[index]);
      await expect(fallback.nth(index)).toBeVisible();
    }
    await context.close();
  });
}

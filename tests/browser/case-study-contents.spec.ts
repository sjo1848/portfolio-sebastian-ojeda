import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const cases = [
  { name: 'hms-en', path: '/projects/hms-cloudflare/', lang: 'en', headingCount: 9 },
  { name: 'hms-es', path: '/es/projects/hms-cloudflare/', lang: 'es', headingCount: 9 },
  { name: 'alquileres-en', path: '/projects/alquileres-uspa/', lang: 'en', headingCount: 8 },
  { name: 'alquileres-es', path: '/es/projects/alquileres-uspa/', lang: 'es', headingCount: 8 },
  { name: 'hms-elite-en', path: '/projects/hms-elite/', lang: 'en', headingCount: 25 },
  { name: 'hms-elite-es', path: '/es/projects/hms-elite/', lang: 'es', headingCount: 25 },
] as const;

for (const route of cases) {
  test(`${route.name} contents match the rendered headings and existing structural sections`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const messages: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') messages.push(`${message.type()}: ${message.text()}`);
    });
    page.on('pageerror', (error) => messages.push(error.message));
    await page.goto(route.path, { waitUntil: 'networkidle' });

    const sidebar = page.locator('.case-study-contents-desktop');
    await expect(sidebar).toBeVisible();
    const actual = await page.locator('.prose h2, .prose h3').evaluateAll((nodes) =>
      nodes.map((node) => ({ id: node.id, text: node.textContent?.trim(), depth: Number(node.tagName.slice(1)) })),
    );
    const expectedStructural = route.name.startsWith('hms-elite') || route.name.startsWith('alquileres')
      ? [{ id: `gallery-${route.name.startsWith('hms-elite') ? 'hms-elite' : 'alquileres-uspa'}`, text: route.lang === 'es' ? 'Capturas y recorridos verificados' : 'Verified screenshots and walkthroughs', depth: 2 }]
      : [];
    const links = await sidebar.locator('a').evaluateAll((nodes) =>
      nodes.map((node) => {
        const link = node as HTMLAnchorElement;
        const id = decodeURIComponent(link.hash.slice(1));
        const target = document.getElementById(id);
        return {
          id,
          text: link.textContent?.trim(),
          depth: target ? Number(link.closest('li')?.getAttribute('data-depth')) : 0,
        };
      }),
    );

    expect(links).toEqual([...expectedStructural, ...actual]);
    expect(links.length).toBe(route.headingCount + expectedStructural.length);
    expect(new Set(links.map((link) => link.id)).size).toBe(links.length);
    expect(messages).toEqual([]);

    if (route.lang === 'en' && route.name === 'hms-en') {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    }
  });
}

for (const width of [390, 768, 1024, 1440]) {
  test(`native contents links work with JavaScript disabled at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('/projects/hms-cloudflare/', { waitUntil: 'domcontentloaded' });
    if (width < 1100) {
      const fallback = page.locator('.case-study-contents-fallback');
      await expect(fallback).toBeVisible();
      await fallback.locator('summary').click();
      const nav = fallback.getByRole('navigation');
      const firstLink = nav.locator('a').first();
      const href = await firstLink.getAttribute('href');
      await firstLink.click();
      await expect.poll(() => new URL(page.url()).hash).toBe(new URL(href!, page.url()).hash);
    } else {
      const nav = page.locator('.case-study-contents-desktop');
      await expect(nav).toBeVisible();
      const firstLink = nav.locator('a').first();
      const href = await firstLink.getAttribute('href');
      await firstLink.click();
      await expect.poll(() => new URL(page.url()).hash).toBe(new URL(href!, page.url()).hash);
    }
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      targetTop: document.getElementById(decodeURIComponent(location.hash.slice(1)))?.getBoundingClientRect().top ?? -1,
      headerBottom: document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.targetTop).toBeGreaterThanOrEqual(dimensions.headerBottom - 1);
    await context.close();
  });
}

test('Contents Sheet covers tablet/mobile widths, closes on selection, and tracks active headings without scrolling', async ({ page }) => {
  test.setTimeout(60_000);
  const widths = [360, 390, 430, 768, 1024, 1440];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    if (width < 1100) {
      await expect(page.locator('.case-study-contents-desktop')).toBeHidden();
      const trigger = page.getByRole('button', { name: 'Contents', exact: true });
      await expect(trigger).toBeVisible();
      const triggerBox = await trigger.boundingBox();
      expect(triggerBox?.width).toBeGreaterThanOrEqual(44);
      expect(triggerBox?.height).toBeGreaterThanOrEqual(44);
      await trigger.click();
      await expect(page.locator('.case-study-contents-trigger')).toHaveAttribute('aria-expanded', 'true');
      const sheet = page.getByRole('dialog', { name: 'Case study contents' });
      await expect(sheet).toBeVisible();
      if (width === 390) {
        const modalState = await page.evaluate(() => {
          const main = document.querySelector('#main-content') as HTMLElement | null;
          return {
            htmlOverflow: getComputedStyle(document.documentElement).overflow,
            bodyOverflow: getComputedStyle(document.body).overflow,
            mainInert: main?.inert ?? false,
            mainAriaHidden: main?.getAttribute('aria-hidden') === 'true',
          };
        });
        expect([modalState.htmlOverflow, modalState.bodyOverflow]).toContain('hidden');
        expect(modalState.mainInert || modalState.mainAriaHidden).toBe(true);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
        await page.keyboard.press('Shift+Tab');
        await expect(page.getByRole('link', { name: 'Evidence and limits' })).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'Close contents' })).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('link', { name: 'Problem' })).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(sheet).toBeHidden();
        await expect(trigger).toBeFocused();
        await trigger.click();
      }

      const lastLink = page.locator('.case-study-contents-sheet [role="navigation"] a').last();
      const href = await lastLink.getAttribute('href');
      await lastLink.click();
      await expect.poll(() => new URL(page.url()).hash).toBe(new URL(href!, page.url()).hash);
      await expect(page.locator('.case-study-contents-sheet')).toBeHidden();
      const selectedTarget = decodeURIComponent(new URL(page.url()).hash.slice(1));
      await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe(selectedTarget);
      await page.goBack();
      await expect(page).toHaveURL(/\/projects\/hms-cloudflare\/$/);
    } else {
      await expect(page.locator('.case-study-contents-desktop')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Contents', exact: true })).toBeHidden();
      const prose = page.locator('.prose');
      const proseBox = await prose.boundingBox();
      expect(proseBox?.width).toBeLessThanOrEqual(46 * 16);
      const lastHeading = prose.locator('h2, h3').last();
      const lastId = await lastHeading.getAttribute('id');
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' }));
      await expect.poll(() => page.evaluate(() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2)).toBe(true);
      const before = await page.evaluate(() => window.scrollY);
      await expect(page.locator('.case-study-contents-desktop a[aria-current="location"]')).toHaveAttribute('href', `#${lastId}`);
      await page.waitForTimeout(100);
      expect(await page.evaluate(() => window.scrollY)).toBe(before);
    }
  }
});

test('mobile sheet navigation is keyboard operable and respects reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/es/projects/hms-cloudflare/', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: 'Contenido' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Contenido del caso' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cerrar contenido' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Problema' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
});

test('captures responsive case study contents evidence', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Visual evidence is captured once in Chromium.');
  const outputDir = path.resolve('artifacts/visual/frontend-excellence/increment-4');
  await mkdir(outputDir, { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/hms-cloudflare/', { waitUntil: 'networkidle' });

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileTrigger = page.getByRole('button', { name: 'Contents', exact: true });
  await mobileTrigger.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(outputDir, 'contents-trigger-mobile-390.png'), animations: 'disabled' });
  await mobileTrigger.click();
  await expect(page.getByRole('dialog', { name: 'Case study contents' })).toBeVisible();
  await page.screenshot({ path: path.join(outputDir, 'contents-sheet-mobile-390.png'), animations: 'disabled' });
  await page.locator('.case-study-contents-sheet [role="navigation"] a').last().click();
  await expect(page.locator('.case-study-contents-sheet')).toBeHidden();
  await page.screenshot({ path: path.join(outputDir, 'contents-anchor-mobile-390.png'), animations: 'disabled' });

  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    const tabletTrigger = page.getByRole('button', { name: 'Contents', exact: true });
    await tabletTrigger.scrollIntoViewIfNeeded();
    await tabletTrigger.click();
    await expect(page.getByRole('dialog', { name: 'Case study contents' })).toBeVisible();
    await page.screenshot({ path: path.join(outputDir, `contents-sheet-tablet-${width}.png`), animations: 'disabled' });
    await page.keyboard.press('Escape');
    await expect(page.locator('.case-study-contents-sheet')).toBeHidden();
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' }));
  await expect(page.locator('.case-study-contents-desktop a[aria-current="location"]')).toHaveAttribute('href', '#evidence-and-limits');
  await page.screenshot({ path: path.join(outputDir, 'contents-sticky-active-desktop-1440.png'), animations: 'disabled' });
});

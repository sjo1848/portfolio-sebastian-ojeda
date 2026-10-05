import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';

const matrix = [
  { width: 1440, height: 900, key: 'desktop-1440x900' },
  { width: 1366, height: 768, key: 'short-desktop-1366x768' },
  { width: 1024, height: 768, key: 'tablet-wide-1024x768' },
  { width: 768, height: 1024, key: 'tablet-768x1024' },
  { width: 430, height: 932, key: 'mobile-430x932' },
  { width: 390, height: 844, key: 'mobile-390x844' },
  { width: 360, height: 640, key: 'short-mobile-360x640' },
] as const;

const locales = [
  { key: 'en', path: '/' },
  { key: 'es', path: '/es/' },
] as const;

const requiredProgress = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.46, 0.52, 0.56, 0.62, 0.68, 0.72, 0.76, 0.82, 0.88, 0.92, 0.96, 1];
const denseProgress = Array.from({ length: 41 }, (_, index) => index / 40);
const boundaries = [0.15, 0.22, 0.39, 0.46, 0.555, 0.675, 0.7, 0.735, 0.89, 0.985];
const screenshotStates = [
  { name: 'identity', progress: 0.05 },
  { name: 'mid-travel', progress: 0.3 },
  { name: 'thesis-resolved', progress: 0.56 },
  { name: 'proof-entering', progress: 0.72 },
  { name: 'proof-dominant', progress: 0.80 },
  { name: 'proof-settling', progress: 0.92 },
] as const;
const motionReadyPages = new WeakSet<Page>();

async function ensureMotionInitialized(page: Page) {
  if (motionReadyPages.has(page)) return;
  await page.waitForFunction(() => {
    const root = document.documentElement;
    return root.dataset.heroMotionInitialized === 'true' || root.dataset.heroMotionFallback === 'true';
  }, undefined, { timeout: 5_000 });
  const initialized = await page.evaluate(() => document.documentElement.dataset.heroMotionInitialized === 'true');
  test.skip(!initialized, 'Hero sequence is in the approved F5 static fallback; progress-based motion coverage is not applicable');
  motionReadyPages.add(page);
}

async function setProgress(page: Page, progress: number) {
  await ensureMotionInitialized(page);
  await page.evaluate((target) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: top + length * target, behavior: 'auto' });
  }, progress);
  await page.waitForFunction((target) => {
    const current = Number(document.querySelector<HTMLElement>('#hero')?.dataset.sequenceProgress ?? -1);
    return Math.abs(current - target) < 0.006;
  }, progress, { timeout: 5_000 });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function inspectGeometry(page: Page, width: number, progress: number) {
  const result = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>('.site-header')!;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const boxes: Array<{ name: string; left: number; top: number; right: number; bottom: number; width: number; height: number }> = [];
    const selectors: Array<[string, string]> = [
      ['role', '#hero .hero-role'],
      ['opening-name', '#hero [data-opening-name]'],
      ['thesis-0', '#hero [data-thesis-line="0"]'],
      ['thesis-1', '#hero [data-thesis-line="1"]'],
      ['thesis-2', '#hero [data-thesis-line="2"]'],
      ['flight-s', '#hero [data-flight-glyph="s"]'],
      ['flight-o', '#hero [data-flight-glyph="o"]'],
      ['support-copy', '#hero .hero-copy'],
      ['location', '#hero .hero-location'],
      ['primary-cta', '#hero .button-primary'],
      ['github-cta', '#hero .hero-github-link'],
      ['proof-eyebrow', '#hero [data-proof-bridge] .hero-proof-bridge-heading > span'],
      ['proof-title', '#hero [data-proof-bridge] .hero-proof-bridge-heading > strong'],
      ['proof-image-fallback', '#hero [data-proof-bridge] [data-proof-bridge-fallback]'],
      ['proof-image-shared', '#hero [data-proof-bridge] [data-proof-bridge-image]'],
      ['proof-caption', '#hero [data-proof-bridge] figcaption'],
      ['proof-limitation', '#hero [data-proof-bridge] .hero-proof-bridge-limitation'],
      ['copper-rule', '#hero .hero-copper-rule'],
    ];
    const isVisible = (node: Element) => {
      let opacity = 1;
      let current: Element | null = node;
      while (current) {
        const style = getComputedStyle(current);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        opacity *= Number.parseFloat(style.opacity || '1');
        current = current.parentElement;
      }
      return opacity > 0.06;
    };
    for (const [name, selector] of selectors) {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node || !isVisible(node)) continue;
      const rect = node.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      boxes.push({ name, left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
    }
    const headerBottom = header.getBoundingClientRect().bottom;
    const portal = document.querySelector<HTMLImageElement>('body > [data-proof-bridge-image]');
    if (portal && isVisible(portal)) {
      const rect = portal.getBoundingClientRect();
      boxes.push({ name: 'shared-proof-portal', left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
    }
    const overflow = document.documentElement.scrollWidth - viewportWidth;
    let portalContentCollision: string | null = null;
    if (portal && isVisible(portal)) {
      const portalRect = portal.getBoundingClientRect();
      for (const [name, selector] of [
        ['Selected Work heading', '#projects #stories-title'],
        ['HMS project title', '#projects [data-project-index-item]:first-child h3'],
      ]) {
        const content = document.querySelector<HTMLElement>(selector);
        if (!content || !isVisible(content)) continue;
        const rect = content.getBoundingClientRect();
        const intersectsViewport = rect.bottom > 0 && rect.top < viewportHeight && rect.right > 0 && rect.left < viewportWidth;
        const intersectsPortal = Math.min(portalRect.right, rect.right) > Math.max(portalRect.left, rect.left)
          && Math.min(portalRect.bottom, rect.bottom) > Math.max(portalRect.top, rect.top);
        if (intersectsViewport && intersectsPortal) portalContentCollision = `${name} rect=${JSON.stringify(rect.toJSON())}`;
      }
    }
    return { viewportWidth, viewportHeight, headerBottom, overflow, boxes, portalContentCollision };
  });

  const context = `viewport=${width}x${result.viewportHeight} progress=${progress.toFixed(3)}`;
  expect(result.overflow, `${context} horizontal overflow=${result.overflow}`).toBeLessThanOrEqual(0);
  expect(result.portalContentCollision, `${context} fixed shared proof covers Selected Work content: ${result.portalContentCollision}`).toBeNull();
  for (const box of result.boxes) {
    expect(box.left, `${context} ${box.name} left=${box.left}`).toBeGreaterThanOrEqual(-0.5);
    expect(box.right, `${context} ${box.name} right=${box.right}`).toBeLessThanOrEqual(result.viewportWidth + 0.5);
    expect(box.top, `${context} ${box.name} top=${box.top}`).toBeGreaterThanOrEqual(-0.5);
    expect(box.bottom, `${context} ${box.name} bottom=${box.bottom}`).toBeLessThanOrEqual(result.viewportHeight + 0.5);
    if (['role', 'opening-name', 'thesis-0', 'thesis-1', 'thesis-2', 'proof-eyebrow', 'proof-title', 'proof-image-fallback', 'proof-image-shared'].includes(box.name)) {
      expect(box.top, `${context} header covers ${box.name}: headerBottom=${result.headerBottom} box=${JSON.stringify(box)}`)
        .toBeGreaterThanOrEqual(result.headerBottom - 1);
    }
  }

  const forbiddenPairs = new Set([
    'role|opening-name', 'role|thesis-0', 'role|thesis-1', 'role|thesis-2', 'role|flight-s', 'role|flight-o', 'role|proof-eyebrow', 'role|proof-title', 'role|proof-image-fallback', 'role|proof-image-shared',
    'flight-s|flight-o', 'flight-s|thesis-0', 'flight-s|thesis-1', 'flight-s|thesis-2', 'flight-s|support-copy', 'flight-s|location', 'flight-s|primary-cta', 'flight-s|github-cta', 'flight-s|proof-eyebrow', 'flight-s|proof-title', 'flight-s|proof-image-fallback', 'flight-s|proof-image-shared', 'flight-s|proof-caption', 'flight-s|proof-limitation', 'flight-s|copper-rule',
    'flight-o|thesis-0', 'flight-o|thesis-1', 'flight-o|thesis-2', 'flight-o|support-copy', 'flight-o|location', 'flight-o|primary-cta', 'flight-o|github-cta', 'flight-o|proof-eyebrow', 'flight-o|proof-title', 'flight-o|proof-image-fallback', 'flight-o|proof-image-shared', 'flight-o|proof-caption', 'flight-o|proof-limitation', 'flight-o|copper-rule',
    'opening-name|thesis-0', 'opening-name|thesis-1', 'opening-name|thesis-2', 'opening-name|support-copy', 'opening-name|primary-cta',
    'thesis-0|support-copy', 'thesis-1|support-copy', 'thesis-2|support-copy', 'thesis-0|primary-cta', 'thesis-1|primary-cta', 'thesis-2|primary-cta',
    'primary-cta|proof-eyebrow', 'primary-cta|proof-title', 'primary-cta|proof-image-fallback', 'primary-cta|proof-image-shared', 'primary-cta|copper-rule',
    'proof-eyebrow|proof-title', 'proof-eyebrow|proof-image-fallback', 'proof-eyebrow|proof-image-shared', 'proof-title|proof-image-fallback', 'proof-title|proof-image-shared', 'proof-image-fallback|proof-caption', 'proof-image-shared|proof-caption', 'proof-caption|proof-limitation',
  ].map((pair) => pair.split('|').sort().join('|')));
  for (let leftIndex = 0; leftIndex < result.boxes.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < result.boxes.length; rightIndex += 1) {
      const left = result.boxes[leftIndex]!;
      const right = result.boxes[rightIndex]!;
      const key = [left.name, right.name].sort().join('|');
      if (!forbiddenPairs.has(key)) continue;
      const overlapX = Math.min(left.right, right.right) - Math.max(left.left, right.left);
      const overlapY = Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top);
      expect(overlapX <= 0.5 || overlapY <= 0.5,
        `${context} collision ${left.name}/${right.name}; overlap=${overlapX.toFixed(2)}x${overlapY.toFixed(2)} left=${JSON.stringify(left)} right=${JSON.stringify(right)}`)
        .toBe(true);
    }
  }
  return result;
}

async function waitForPostHandoff(page: Page) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const near = await page.evaluate(() => {
      const target = document.querySelector<HTMLElement>('#projects [data-selected-evidence] .selected-work-evidence-image-frame');
      const proof = document.querySelector<HTMLImageElement>('body > [data-proof-bridge-image]');
      const headerBottom = document.querySelector<HTMLElement>('.site-header')!.getBoundingClientRect().bottom;
      if (!target || !proof) return false;
      const targetRect = target.getBoundingClientRect();
      const proofRect = proof.getBoundingClientRect();
      const desiredTop = Math.max(headerBottom + 12, Math.min(proofRect.top, innerHeight - targetRect.height - 12));
      const delta = Math.max(-70, Math.min(70, targetRect.top - desiredTop));
      const aligned = targetRect.top >= headerBottom + 8 && targetRect.bottom <= innerHeight - 8 && Math.abs(targetRect.top - proofRect.top) <= 50;
      if (!aligned) window.scrollTo(0, window.scrollY + delta);
      return aligned;
    });
    if (near) break;
    await page.waitForTimeout(16);
  }
  await expect(page.locator('#projects')).toHaveAttribute('data-signature-handoff', 'complete', { timeout: 10_000 });
}

test.describe('Issue #129 full visual stabilization matrix', () => {
  test.describe.configure({ timeout: 240_000, retries: 0 });

  for (const locale of locales) {
    for (const viewport of matrix) {
      test(`${locale.key} collision geometry ${viewport.key}`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'chromium');
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.goto(locale.path, { waitUntil: 'networkidle' });
        await ensureMotionInitialized(page);
        if (locale.key === 'en' && viewport.width === 1440) {
          const scriptUrls = await page.evaluate(() => [...new Set(
            performance.getEntriesByType('resource')
              .map((entry) => new URL(entry.name))
              .filter((url) => url.origin === location.origin && url.pathname.endsWith('.js'))
              .map((url) => url.pathname),
          )]);
          const scripts = scriptUrls.map((url) => {
            const file = `dist${decodeURIComponent(url)}`;
            if (!fs.existsSync(file)) throw new Error(`Loaded script missing from static build: ${url}`);
            const bytes = fs.readFileSync(file);
            return { url, bytes: bytes.length, gzipBytes: gzipSync(bytes, { level: 9 }).length };
          });
          const html = fs.readFileSync('dist/index.html', 'utf8');
          const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
            .filter((match) => !/\bsrc=/.test(match[1] ?? '') && !/type=["']application\/(?:ld\+)?json["']/i.test(match[1] ?? ''))
            .map((match, index) => {
              const bytes = Buffer.from(match[2] ?? '');
              return { index, bytes: bytes.length, gzipBytes: gzipSync(bytes, { level: 9 }).length };
            });
          const totalGzipBytes = scripts.reduce((sum, script) => sum + script.gzipBytes, 0)
            + inlineScripts.reduce((sum, script) => sum + script.gzipBytes, 0);
          expect(totalGzipBytes, 'Home initial JS gzip budget must remain below 100,000 B').toBeLessThan(100_000);
          fs.mkdirSync('test-results/issue-129-visual-stabilization', { recursive: true });
          fs.writeFileSync('test-results/issue-129-visual-stabilization/home-initial-js-budget.json', JSON.stringify({
            route: locale.path,
            measuredFrom: 'browser-loaded same-origin JavaScript resources plus executable inline script blocks in dist/index.html',
            scripts,
            inlineScripts,
            totalGzipBytes,
            hardLimitBytes: 100_000,
          }, null, 2));
        }
        await page.evaluate(async () => {
          await document.fonts.ready;
          const style = document.createElement('style');
          style.textContent = '*, *::before, *::after { transition-duration: 0s !important; scroll-behavior: auto !important; }';
          document.head.append(style);
        });
        const browserErrors: string[] = [];
        page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));
        page.on('console', (message) => { if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`); });

        const output = `test-results/issue-129-visual-stabilization/${locale.key}/${viewport.key}`;
        fs.mkdirSync(output, { recursive: true });
        const sample = async (progress: number) => {
          await setProgress(page, progress);
          const geometry = await inspectGeometry(page, viewport.width, progress);
          return geometry;
        };

        for (const progress of requiredProgress) await sample(progress);
        for (const progress of denseProgress) await sample(progress);
        for (const progress of [...denseProgress].reverse()) await sample(progress);
        for (const progress of [0, 0.8, 0.3, 1]) await sample(progress);
        for (const boundary of boundaries) {
          for (const progress of [Math.max(0, boundary - 0.012), boundary, Math.min(1, boundary + 0.012), Math.max(0, boundary - 0.012)]) {
            await sample(progress);
          }
        }

        for (const state of screenshotStates) {
          await sample(state.progress);
          await page.screenshot({ path: `${output}/${state.name}.png`, animations: 'disabled' });
        }

        await sample(1);
        if (viewport.width >= 1024) {
          await waitForPostHandoff(page);
        } else {
          await page.locator('#projects').scrollIntoViewIfNeeded();
        }
        await page.screenshot({ path: `${output}/post-handoff-selected-work.png`, animations: 'disabled' });
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
        expect(browserErrors, `${locale.key} ${viewport.key} console/page errors`).toEqual([]);
        fs.writeFileSync(`${output}/manifest.json`, JSON.stringify({
          locale: locale.key,
          path: locale.path,
          viewport: { width: viewport.width, height: viewport.height },
          sampledProgress: [...new Set([...requiredProgress, ...denseProgress, ...denseProgress.slice().reverse(), 0, 0.8, 0.3, 1, ...boundaries.flatMap((boundary) => [Math.max(0, boundary - 0.012), Math.min(1, boundary + 0.012)])])].sort((a, b) => a - b),
          boundaryReplayOrder: boundaries.flatMap((boundary) => [Math.max(0, boundary - 0.012), boundary, Math.min(1, boundary + 0.012), Math.max(0, boundary - 0.012)]),
          screenshots: [...screenshotStates.map(({ name }) => `${name}.png`), 'post-handoff-selected-work.png'],
          overflowPx: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
          visualStyles: 'CSS transitions disabled for deterministic geometry and state captures',
        }, null, 2));
      });
    }
  }
});

test('#129 F4 desktop adoption → rewind → mobile replay retains the approved Hero proof fallback', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const sharedImage = await page.locator('#projects [data-selected-evidence] [data-evidence-image]').elementHandle();
  expect(sharedImage).not.toBeNull();

  await setProgress(page, 0.71);
  const fallback = page.locator('#hero [data-proof-bridge] .hero-proof-bridge-figure img[data-proof-bridge-fallback]');
  await expect(page.locator('#hero [data-proof-bridge]')).toBeVisible();
  await expect(fallback).toBeHidden();
  await expect(page.locator('#projects [data-handoff-placeholder]')).toHaveCount(1);

  await setProgress(page, 0.30);
  await expect(page.locator('#projects [data-handoff-placeholder]')).toHaveCount(0);
  expect(await sharedImage!.evaluate((node) => node === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
  await expect(fallback).toHaveCount(1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => document.querySelector<HTMLElement>('#hero')?.dataset.proofHandoffInterruptedBy === 'mobile-breakpoint');
  await setProgress(page, 0.71);
  await expect(page.locator('#hero [data-proof-bridge]')).toBeVisible();
  await expect(fallback).toBeVisible();
  await expect.poll(() => fallback.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(await sharedImage!.evaluate((node) => node === document.querySelector('#projects [data-selected-evidence] [data-evidence-image]'))).toBe(true);
  expect(await page.locator('#hero [data-proof-bridge-fallback]').count()).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('output/playwright/issue-129-signature-motion', { recursive: true });
    await page.screenshot({ path: 'output/playwright/issue-129-signature-motion/f4-mobile-fallback-after-rewind.png', animations: 'disabled' });
  }
});

test('#129 F5 failed Hero module returns to readable, navigable static Home', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'firefox', 'webkit'].includes(testInfo.project.name));
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    const testWindow = window as Window & { __runIssue129HeroFallback?: () => void };
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      if (timeout === 1400 && typeof handler === 'function') {
        testWindow.__runIssue129HeroFallback = () => (handler as (...callbackArgs: unknown[]) => void)(...args);
        return 1;
      }
      return nativeSetTimeout(handler, timeout, ...args);
    }) as typeof window.setTimeout;
  });
  await page.route('**/_astro/**', async (route) => {
    if (route.request().resourceType() === 'script') await route.abort('failed');
    else await route.continue();
  });
  const uncaught: string[] = [];
  page.on('pageerror', (error) => uncaught.push(error.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-hero-motion-pending', 'true');
  await page.evaluate(() => {
    const testWindow = window as Window & { __runIssue129HeroFallback?: () => void };
    testWindow.__runIssue129HeroFallback?.();
  });
  await expect(page.locator('html')).toHaveAttribute('data-hero-motion-fallback', 'true');
  await expect(page.locator('html')).not.toHaveAttribute('data-hero-motion-pending', 'true');
  await expect(page.locator('.site-header [data-signature-brand]')).toBeVisible();
  await expect(page.locator('#hero')).toHaveAttribute('data-motion-state', 'static');
  await expect(page.locator('#hero [data-opening-name]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#hero .hero-copy')).toBeVisible();
  await expect(page.locator('#hero .button-primary')).toHaveAttribute('href', '#projects');
  await expect(page.locator('#projects [data-project-index-item]')).toHaveCount(3);
  const stagePosition = await page.locator('#hero [data-sequence-stage]').evaluate((node) => getComputedStyle(node).position);
  expect(stagePosition).not.toBe('sticky');
  const staticGeometry = await page.evaluate(() => {
    const bounds = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
    const header = bounds('.site-header');
    const name = bounds('#hero [data-opening-name]');
    const role = bounds('#hero .hero-role');
    const thesis = bounds('#hero .hero-thesis');
    const support = bounds('#hero .hero-supporting-copy');
    const cta = bounds('#hero .button-primary');
    return { headerBottom: header.bottom, name, role, thesis, support, cta, width: document.documentElement.scrollWidth };
  });
  expect(staticGeometry.name.top, 'F5 identity must clear the sticky header').toBeGreaterThanOrEqual(staticGeometry.headerBottom - 0.5);
  expect(staticGeometry.name.bottom).toBeLessThanOrEqual(staticGeometry.role.top + 0.5);
  expect(staticGeometry.role.bottom).toBeLessThanOrEqual(staticGeometry.thesis.top + 0.5);
  expect(staticGeometry.thesis.bottom).toBeLessThanOrEqual(staticGeometry.support.top + 0.5);
  expect(staticGeometry.cta.left).toBeGreaterThanOrEqual(0);
  expect(staticGeometry.cta.right).toBeLessThanOrEqual(1366);
  expect(staticGeometry.width).toBeLessThanOrEqual(1366);
  if (testInfo.project.name === 'chromium') {
    await fs.promises.mkdir('output/playwright/issue-129-signature-motion', { recursive: true });
    await page.screenshot({ path: 'output/playwright/issue-129-signature-motion/f5-static-fallback-1366x768.png', animations: 'disabled' });
  }
  await page.locator('#hero .button-primary').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
  expect(uncaught).toEqual([]);
});

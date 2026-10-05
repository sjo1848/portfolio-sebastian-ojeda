import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';

const locales = [{ key: 'en', path: '/' }, { key: 'es', path: '/es/' }] as const;
const matrix = [
  { width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 1024, height: 768 },
  { width: 768, height: 1024 }, { width: 430, height: 932 }, { width: 390, height: 844 }, { width: 360, height: 640 },
] as const;
const samples = [0, 0.05, 0.14, 0.15, 0.22, 0.3, 0.389, 0.39, 0.46, 0.56, 0.675, 0.68, 0.705, 0.72, 0.8, 0.9, 0.969, 0.97, 1];

async function initialized(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.heroMotionInitialized === 'true');
}
async function setProgress(page: Page, target: number) {
  await page.evaluate((value) => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const stage = hero.querySelector<HTMLElement>('[data-sequence-stage]')!;
    const top = hero.getBoundingClientRect().top + scrollY;
    const length = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: top + length * value, behavior: 'auto' });
  }, target);
  await page.waitForFunction((value) => Math.abs(Number(document.querySelector<HTMLElement>('#hero')!.dataset.sequenceProgress) - value) < 0.006, target);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}
async function state(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#hero')!;
    const proof = hero.querySelector<HTMLElement>('[data-proof-bridge]')!;
    const image = proof.querySelector<HTMLImageElement>('[data-proof-project="hms-cloudflare"]');
    const selectedImage = document.querySelector('#projects [data-selected-evidence] [data-evidence-image]');
    const thesis = hero.querySelector<HTMLElement>('[data-hero-thesis]')!;
    const shown = (node: Element) => {
      const style = getComputedStyle(node);
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.05;
    };
    const box = (node: Element) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const visibleThesis = shown(thesis) && [...hero.querySelectorAll<HTMLElement>('[data-thesis-line]')].some((line) => line.style.getPropertyValue('--line-clip') !== '100%');
    return {
      progress: Number(hero.dataset.sequenceProgress),
      composition: hero.dataset.sequenceComposition,
      proofVisible: !proof.hidden && shown(proof),
      thesisVisible: visibleThesis,
      thesisClips: [...hero.querySelectorAll<HTMLElement>('[data-thesis-line]')].map((line) => line.style.getPropertyValue('--line-clip')),
      imageProject: image?.dataset.proofProject ?? null,
      imageLoaded: Boolean(image?.complete && image.naturalWidth > 0),
      sharedImage: Boolean(image && selectedImage === image),
      proofBox: box(proof),
      headerBottom: document.querySelector<HTMLElement>('.site-header')!.getBoundingClientRect().bottom,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      placeholders: document.querySelectorAll('[data-handoff-placeholder]').length,
      portals: document.querySelectorAll('body > [data-proof-bridge-image]').length,
    };
  });
}

for (const locale of locales) {
  for (const viewport of matrix) {
    test(`#129 ${locale.key} deterministic geometry ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium', 'Chromium owns the exhaustive geometry matrix; Firefox/WebKit cover proof and motion boundaries.');
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(locale.path, { waitUntil: 'networkidle' });
      await initialized(page);
      await page.evaluate(() => document.fonts.ready);

      for (const target of [...samples, ...samples.slice().reverse(), 0.8, 0.25, 1, 0]) {
        await setProgress(page, target);
        const current = await state(page);
        const expected = target < 0.15 ? 'identity'
          : target < 0.39 ? 'travel'
            : target < 0.68 ? 'resolved'
              : target < 0.72 ? 'transition'
                : target < 0.97 ? 'proof' : 'handoff';
        expect(current.composition).toBe(expected);
        expect(current.proofVisible && current.thesisVisible).toBe(false);
        expect(current.overflow).toBeLessThanOrEqual(0);
        expect(current.placeholders).toBe(0);
        expect(current.portals).toBe(0);
        expect(current.sharedImage).toBe(false);
        if (target >= 0.39 && target < 0.68) expect(current.thesisClips.every((clip) => clip === '0%')).toBe(true);
        if (current.proofVisible) {
          expect(current.imageProject).toBe('hms-cloudflare');
          expect(current.imageLoaded).toBe(true);
          expect(current.proofBox.left).toBeGreaterThanOrEqual(-0.5);
          expect(current.proofBox.right).toBeLessThanOrEqual(viewport.width + 0.5);
          expect(current.proofBox.top).toBeGreaterThanOrEqual(current.headerBottom - 0.5);
          expect(current.proofBox.bottom).toBeLessThanOrEqual(viewport.height + 0.5);
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

test('#129 Home initial client JavaScript remains under 100,000 B gzip', async ({ page }, info) => {
  test.skip(info.project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const urls = await page.evaluate(() => [...new Set(performance.getEntriesByType('resource')
    .map((entry) => new URL(entry.name))
    .filter((url) => url.origin === location.origin && url.pathname.endsWith('.js'))
    .map((url) => url.pathname))]);
  const scripts = urls.map((url) => {
    const bytes = fs.readFileSync(`dist${decodeURIComponent(url)}`);
    return { url, gzipBytes: gzipSync(bytes, { level: 9 }).length };
  });
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\bsrc=/.test(match[1] ?? '') && !/type=["']application\/(?:ld\+)?json["']/i.test(match[1] ?? ''))
    .map((match) => gzipSync(Buffer.from(match[2] ?? ''), { level: 9 }).length);
  const total = scripts.reduce((sum, script) => sum + script.gzipBytes, 0) + inline.reduce((sum, value) => sum + value, 0);
  expect(total).toBeLessThan(100_000);
  fs.mkdirSync('test-results/issue-129-visual-stabilization', { recursive: true });
  fs.writeFileSync('test-results/issue-129-visual-stabilization/home-initial-js-budget.json', JSON.stringify({ scripts, inlineGzipBytes: inline, totalGzipBytes: total, hardLimitBytes: 100_000, baselineBytes: 99_576 }, null, 2));
});

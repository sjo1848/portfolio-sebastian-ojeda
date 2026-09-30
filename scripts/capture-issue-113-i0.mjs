import { chromium, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const routes = [
  ['home-en', '/'], ['home-es', '/es/'],
  ['hms-en', '/projects/hms-cloudflare/'], ['hms-es', '/es/projects/hms-cloudflare/'],
  ['alquileres-en', '/projects/alquileres-uspa/'], ['alquileres-es', '/es/projects/alquileres-uspa/'],
  ['ai-commerce-en', '/projects/ai-commerce-platform/'], ['ai-commerce-es', '/es/projects/ai-commerce-platform/'],
];
const widths = [360, 390, 430, 768, 1024, 1440];
const output = path.resolve(process.env.OUTPUT_DIR ?? 'artifacts/visual/issue-113-i0');
const baseURL = process.env.CAPTURE_BASE_URL ?? 'http://127.0.0.1:4184';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifest = {
  capturedAt: new Date().toISOString(),
  baselineCommit: process.env.BASELINE_COMMIT ?? null,
  sourceCommit: process.env.SOURCE_COMMIT ?? process.env.BASELINE_COMMIT ?? null,
  browser: browser.version(),
  screenshots: [],
};

async function capture(page, name, details, fullPage = true) {
  const file = path.join(output, `${name}.png`);
  await page.screenshot({ path: file, fullPage, animations: 'disabled' });
  const buffer = await (await import('node:fs/promises')).readFile(file);
  manifest.screenshots.push({ file: path.relative(process.cwd(), file), ...details, pixelWidth: buffer.readUInt32BE(16), pixelHeight: buffer.readUInt32BE(20), bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex') });
}

for (const [name, route] of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 1000 }, deviceScaleFactor: 1 });
    const consoleIssues = [];
    page.on('pageerror', (error) => consoleIssues.push(`pageerror: ${error.message}`));
    page.on('console', (message) => { if (message.type() === 'error') consoleIssues.push(`console: ${message.text()}`); });
    await page.addInitScript(() => {
      window.__issue113LayoutShifts = [];
      try {
        new PerformanceObserver((entries) => entries.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) window.__issue113LayoutShifts.push(entry.value);
        })).observe({ type: 'layout-shift', buffered: true });
      } catch {}
    });
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const signals = await page.evaluate(() => ({
      clsObserved: window.__issue113LayoutShifts.reduce((total, shift) => total + shift, 0),
      shiftEvents: window.__issue113LayoutShifts.length,
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
    }));
    await capture(page, `${name}-${width}`, { route, width, height: width < 500 ? 844 : 1000, state: 'default', consoleIssues, ...signals });
    await page.close();
  }
}

const states = [
  { name: 'home-en-first-screen-1440', route: '/', width: 1440, action: async () => {} },
  { name: 'home-es-first-screen-1440', route: '/es/', width: 1440, action: async () => {} },
  { name: 'home-en-first-screen-390', route: '/', width: 390, action: async () => {} },
  { name: 'home-es-first-screen-390', route: '/es/', width: 390, action: async () => {} },
  { name: 'nav-en-open-390', route: '/', width: 390, action: async (page) => { await page.locator('.mobile-nav-trigger').click(); await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible(); } },
  { name: 'nav-es-open-390', route: '/es/', width: 390, action: async (page) => { await page.locator('.mobile-nav-trigger').click(); await expect(page.getByRole('dialog', { name: 'Navegación' })).toBeVisible(); } },
  { name: 'hms-dialog-open-1440', route: '/projects/hms-cloudflare/', width: 1440, action: async (page) => { const island = page.locator('.media-viewer-island astro-island'); await island.scrollIntoViewIfNeeded(); await expect.poll(() => island.getAttribute('ssr')).toBeNull(); const x = page.locator('[data-media-viewer-trigger]').first(); await x.scrollIntoViewIfNeeded(); await x.click(); await expect(page.getByRole('dialog', { name: 'HMS Cloudflare' })).toBeVisible(); } },
  { name: 'hms-drawer-open-390', route: '/es/projects/hms-cloudflare/', width: 390, action: async (page) => { const island = page.locator('.media-viewer-island astro-island'); await island.scrollIntoViewIfNeeded(); await expect.poll(() => island.getAttribute('ssr')).toBeNull(); const x = page.locator('[data-media-viewer-trigger]').first(); await x.scrollIntoViewIfNeeded(); await x.click(); await expect(page.getByRole('dialog', { name: 'HMS Cloudflare' })).toBeVisible(); } },
  { name: 'hms-content-sheet-open-390', route: '/projects/hms-cloudflare/', width: 390, action: async (page) => { await page.locator('astro-island[component-url*="CaseStudyContents"]').scrollIntoViewIfNeeded(); await expect.poll(() => page.locator('astro-island[component-url*="CaseStudyContents"]').getAttribute('ssr')).toBeNull(); await page.getByRole('button', { name: 'Contents', exact: true }).click(); await expect(page.getByRole('dialog', { name: 'Case study contents' })).toBeVisible(); } },
  { name: 'hms-toc-active-1440', route: '/projects/hms-cloudflare/', width: 1440, action: async (page) => { await page.locator('.case-study-contents-desktop').scrollIntoViewIfNeeded(); const heading = page.locator('.prose h2').nth(2); await heading.scrollIntoViewIfNeeded(); await expect(page.locator('.case-study-contents-desktop a[aria-current="location"]')).toHaveCount(1); } },
  { name: 'alquileres-carousel-intermediate-390', route: '/projects/alquileres-uspa/', width: 390, action: async (page) => { const island = page.locator('astro-island[component-url*="EvidenceGallery"]'); await island.scrollIntoViewIfNeeded(); await expect.poll(() => island.getAttribute('ssr')).toBeNull(); const next = page.getByRole('button', { name: 'Next evidence' }); await next.scrollIntoViewIfNeeded(); await next.click(); await expect(page.locator('.gallery-carousel-position')).toContainText('2'); } },
];
for (const state of states) {
  const page = await browser.newPage({ viewport: { width: state.width, height: state.width < 500 ? 844 : 1000 }, deviceScaleFactor: 1 });
  const consoleIssues = [];
  page.on('pageerror', (error) => consoleIssues.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') consoleIssues.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}${state.route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await state.action(page);
  await page.waitForTimeout(150);
  await capture(page, state.name, { route: state.route, width: state.width, height: state.width < 500 ? 844 : 1000, state: state.name, consoleIssues }, false);
  await page.close();
}

await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await browser.close();
console.log(`Captured ${manifest.screenshots.length} screenshots to ${output}`);

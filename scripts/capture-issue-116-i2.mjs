import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const pages = [
  { name: 'home-en-390', route: '/', lang: 'en', width: 390, height: 844 },
  { name: 'home-en-1440', route: '/', lang: 'en', width: 1440, height: 1000 },
  { name: 'home-es-390', route: '/es/', lang: 'es', width: 390, height: 844 },
  { name: 'home-es-1440', route: '/es/', lang: 'es', width: 1440, height: 1000 },
];
const widths = [360, 390, 430, 768, 1024, 1440];
const output = path.resolve('artifacts/visual/issue-116-i2');
const baseURL = process.env.CAPTURE_BASE_URL ?? 'http://127.0.0.1:4184';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifest = {
  capturedAt: new Date().toISOString(),
  sourceCommit: process.env.SOURCE_COMMIT ?? null,
  browser: browser.version(),
  screenshots: [],
  fullPageScreenshots: [],
  responsiveMatrix: [],
};

for (const item of pages) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}${item.route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const imageStates = await page.evaluate(async () => {
    const images = [...document.images];
    for (const image of images) image.loading = 'eager';
    return Promise.all(images.map(async (image) => {
      try { await image.decode(); } catch {}
      return { src: new URL(image.currentSrc || image.src).pathname, complete: image.complete, naturalWidth: image.naturalWidth };
    }));
  });
  const layout = await page.evaluate(() => {
    const hero = document.querySelector('#hero').getBoundingClientRect();
    const lines = [...document.querySelectorAll('.hero-title-line')].map((line) => {
      const rect = line.getBoundingClientRect();
      return { text: line.textContent, left: rect.left, right: rect.right, width: rect.width };
    });
    return { viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, hero: { left: hero.left, right: hero.right }, lines };
  });
  const file = path.join(output, `${item.name}.png`);
  await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
  const bytes = await readFile(file);
  manifest.screenshots.push({ ...item, file: path.relative(process.cwd(), file), ...layout, imageStates, consoleErrors: errors, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  const fullPageFile = path.join(output, `${item.name}-full.png`);
  await page.screenshot({ path: fullPageFile, fullPage: true, animations: 'disabled' });
  const fullPageBytes = await readFile(fullPageFile);
  manifest.fullPageScreenshots.push({ file: path.relative(process.cwd(), fullPageFile), route: item.route, lang: item.lang, width: item.width, bytes: fullPageBytes.length, sha256: createHash('sha256').update(fullPageBytes).digest('hex') });
  await page.close();
}

for (const lang of [{ route: '/', name: 'en' }, { route: '/es/', name: 'es' }]) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 1000 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    await page.goto(`${baseURL}${lang.route}`, { waitUntil: 'networkidle' });
    const result = await page.evaluate(() => {
      const hero = document.querySelector('#hero').getBoundingClientRect();
      return {
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        lines: [...document.querySelectorAll('.hero-title-line')].map((line) => {
          const rect = line.getBoundingClientRect();
          return { text: line.textContent, left: rect.left, right: rect.right, width: rect.width, visible: rect.width > 0 && rect.left >= hero.left - 0.5 && rect.right <= hero.right + 0.5 };
        }),
      };
    });
    manifest.responsiveMatrix.push({ lang: lang.name, width, ...result, consoleErrors: errors });
    await page.close();
  }
}

await browser.close();
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
const invalid = manifest.responsiveMatrix.filter((item) => item.document > item.width || item.lines.some((line) => !line.visible) || item.consoleErrors.length);
if (invalid.length) throw new Error(`I2 responsive checks failed: ${JSON.stringify(invalid, null, 2)}`);
console.log(`Captured ${manifest.screenshots.length} first-screen and ${manifest.fullPageScreenshots.length} full-page screenshots; ${manifest.responsiveMatrix.length} locale/width checks passed; manifest: ${path.join(output, 'manifest.json')}`);

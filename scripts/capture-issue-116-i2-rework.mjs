import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const captures = [
  { name: 'home-en-390', route: '/', lang: 'en', width: 390, height: 844 },
  { name: 'home-es-390', route: '/es/', lang: 'es', width: 390, height: 844 },
  { name: 'home-en-1440', route: '/', lang: 'en', width: 1440, height: 900 },
  { name: 'home-es-1440', route: '/es/', lang: 'es', width: 1440, height: 900 },
  { name: 'home-en-1366x768', route: '/', lang: 'en', width: 1366, height: 768 },
  { name: 'home-en-1440x900', route: '/', lang: 'en', width: 1440, height: 900 },
];
const desktopChecks = [
  { route: '/', lang: 'en', width: 1366, height: 768 },
  { route: '/es/', lang: 'es', width: 1366, height: 768 },
  { route: '/', lang: 'en', width: 1440, height: 900 },
  { route: '/es/', lang: 'es', width: 1440, height: 900 },
];
const mobileChecks = [{ route: '/', lang: 'en' }, { route: '/es/', lang: 'es' }].flatMap((locale) =>
  [360, 390, 430].map((width) => ({ ...locale, width, height: 844 })));
const baseURL = process.env.CAPTURE_BASE_URL ?? 'http://127.0.0.1:4184';
const output = path.resolve('artifacts/visual/issue-116-i2-rework');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifest = {
  capturedAt: new Date().toISOString(),
  baseCommit: process.env.BASE_COMMIT ?? null,
  browser: browser.version(),
  screenshots: [],
  desktopChecks: [],
  mobileTitleChecks: [],
};

async function inspect(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1').getBoundingClientRect();
    const lines = [...document.querySelectorAll('.hero-title-line')].map((line) => {
      const { left, right, top, bottom } = line.getBoundingClientRect();
      return { text: line.textContent, left, right, top, bottom };
    });
    const actions = [...document.querySelectorAll('#hero .hero-actions a')].map((link) => {
      const { left, right, top, bottom, width, height } = link.getBoundingClientRect();
      return { label: link.textContent.trim(), href: link.getAttribute('href'), left, right, top, bottom, width, height };
    });
    return {
      viewport: { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight },
      documentWidth: document.documentElement.scrollWidth,
      h1: { left: h1.left, right: h1.right, top: h1.top, bottom: h1.bottom },
      lines,
      lead: document.querySelector('.hero-copy').getBoundingClientRect().toJSON(),
      actions,
    };
  });
}

for (const capture of captures) {
  const page = await browser.newPage({ viewport: { width: capture.width, height: capture.height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}${capture.route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const geometry = await inspect(page);
  const file = path.join(output, `${capture.name}.png`);
  await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
  const data = await readFile(file);
  manifest.screenshots.push({ ...capture, file: path.relative(process.cwd(), file), geometry, consoleErrors: errors, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
  await page.close();
}

for (const item of desktopChecks) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}${item.route}`, { waitUntil: 'networkidle' });
  const geometry = await inspect(page);
  manifest.desktopChecks.push({ ...item, geometry, consoleErrors: errors });
  await page.close();
}

for (const item of mobileChecks) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}${item.route}`, { waitUntil: 'networkidle' });
  const geometry = await inspect(page);
  manifest.mobileTitleChecks.push({ ...item, geometry, consoleErrors: errors });
  await page.close();
}

await browser.close();
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
const failed = [
  ...manifest.desktopChecks.filter(({ width, height, geometry, consoleErrors }) =>
    geometry.viewport.width !== width || geometry.viewport.height !== height || geometry.documentWidth > width || geometry.actions.length !== 2 || geometry.actions.some((action) => action.top < 0 || action.bottom > height || action.left < 0 || action.right > width) || geometry.lead.bottom > height || consoleErrors.length),
  ...manifest.mobileTitleChecks.filter(({ width, geometry, consoleErrors }) =>
    geometry.viewport.width !== width || geometry.documentWidth > width || geometry.lines.some((line) => line.left < 0 || line.right > width) || consoleErrors.length),
];
if (failed.length) throw new Error(`I2 rework geometry checks failed: ${JSON.stringify(failed, null, 2)}`);
console.log(`Captured ${manifest.screenshots.length} screenshots; ${manifest.desktopChecks.length} bilingual desktop geometry checks and ${manifest.mobileTitleChecks.length} mobile title checks passed; manifest: ${path.join(output, 'manifest.json')}`);

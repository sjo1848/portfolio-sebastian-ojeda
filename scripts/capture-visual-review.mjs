import { access, mkdir, readFile, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const baseUrl = new URL(process.env.VISUAL_REVIEW_BASE_URL ?? 'http://127.0.0.1:4173');
const outputDir = path.resolve(process.env.VISUAL_REVIEW_OUTPUT ?? 'artifacts/visual');
const minimumBytes = 10_000;
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const viewports = [
  { name: 'mobile', width: 360, height: 1200 },
  { name: 'tablet', width: 768, height: 1200 },
  { name: 'desktop', width: 1440, height: 1200 },
];

const routes = [
  { name: 'home-en', pathname: '/' },
  { name: 'home-en-projects', pathname: '/#projects' },
  { name: 'hms-cloudflare-en', pathname: '/projects/hms-cloudflare/' },
  { name: 'alquileres-uspa-en', pathname: '/projects/alquileres-uspa/' },
  { name: 'home-es', pathname: '/es/' },
  { name: 'home-es-projects', pathname: '/es/#projects' },
  { name: 'hms-cloudflare-es', pathname: '/es/projects/hms-cloudflare/' },
  { name: 'alquileres-uspa-es', pathname: '/es/projects/alquileres-uspa/' },
  { name: 'not-found-en', pathname: '/404.html' },
  { name: 'not-found-es', pathname: '/es/404/' },
];

async function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await access(candidate, constants.X_OK);
      return candidate;
    } catch {
      // Try the next known executable.
    }
  }

  throw new Error('No supported Chrome or Chromium executable was found.');
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function validateScreenshot(file, expectedWidth, expectedHeight) {
  const [bytes, metadata] = await Promise.all([readFile(file), stat(file)]);

  if (!bytes.subarray(0, pngSignature.length).equals(pngSignature)) {
    throw new Error(`${path.basename(file)} is not a PNG.`);
  }

  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);

  if (width !== expectedWidth || height !== expectedHeight) {
    throw new Error(
      `${path.basename(file)} expected ${expectedWidth}x${expectedHeight}, received ${width}x${height}.`,
    );
  }

  if (metadata.size < minimumBytes) {
    throw new Error(`${path.basename(file)} is unexpectedly small (${metadata.size} bytes).`);
  }
}

const chrome = await findChrome();
await mkdir(outputDir, { recursive: true });

for (const viewport of viewports) {
  for (const route of routes) {
    const target = new URL(route.pathname, baseUrl).toString();
    const filename = `${route.name}-${viewport.name}-${viewport.width}x${viewport.height}.png`;
    const output = path.join(outputDir, filename);

    await run(chrome, [
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${viewport.width},${viewport.height}`,
      `--screenshot=${output}`,
      target,
    ]);

    await validateScreenshot(output, viewport.width, viewport.height);
    console.log(`Captured ${filename}`);
  }
}

console.log(`Visual review capture passed: ${routes.length * viewports.length} screenshots.`);
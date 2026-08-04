import { access, readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicDir = resolve('public');
const distDir = resolve('dist');
const failures = [];

const requiredPages = [
  'index.html',
  '404.html',
  'projects/hms-elite/index.html',
  'projects/gasflow/index.html',
  'projects/jm-soluciones/index.html',
  'robots.txt',
];

const generatedAssets = [
  {
    name: 'CV PDF',
    relativePath: 'cv-sebastian-ojeda.pdf',
    signature: Buffer.from('%PDF-', 'ascii'),
    minimumBytes: 5_000,
    maximumBytes: 1_000_000,
  },
  {
    name: 'social card PNG',
    relativePath: 'social-card.png',
    signature: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    minimumBytes: 3_000,
    maximumBytes: 250_000,
  },
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function validateGeneratedAsset(asset) {
  const source = resolve(publicDir, asset.relativePath);
  const output = resolve(distDir, asset.relativePath);

  if (!await exists(source)) {
    failures.push(`${asset.name}: missing generated source public/${asset.relativePath}`);
    return;
  }

  if (!await exists(output)) {
    failures.push(`${asset.name}: missing build artifact dist/${asset.relativePath}`);
    return;
  }

  const [sourceBytes, outputBytes, outputMetadata] = await Promise.all([
    readFile(source),
    readFile(output),
    stat(output),
  ]);

  if (!outputBytes.subarray(0, asset.signature.length).equals(asset.signature)) {
    failures.push(`${asset.name}: invalid file signature in dist/${asset.relativePath}`);
  }

  if (outputMetadata.size < asset.minimumBytes) {
    failures.push(`${asset.name}: output is unexpectedly small (${outputMetadata.size} bytes)`);
  }

  if (outputMetadata.size > asset.maximumBytes) {
    failures.push(`${asset.name}: output exceeds ${asset.maximumBytes} bytes (${outputMetadata.size} bytes)`);
  }

  if (!sourceBytes.equals(outputBytes)) {
    failures.push(`${asset.name}: dist copy differs from its generated public source`);
  }
}

for (const relativePath of requiredPages) {
  if (!await exists(resolve(distDir, relativePath))) {
    failures.push(`Missing required build artifact: dist/${relativePath}`);
  }
}

for (const asset of generatedAssets) await validateGeneratedAsset(asset);

for (const directory of [publicDir, distDir]) {
  if (await exists(resolve(directory, 'social-card.svg'))) {
    failures.push(`Obsolete social-card.svg must not exist in ${directory}`);
  }
}

if (await exists(distDir)) {
  const sitemapFiles = (await readdir(distDir)).filter((file) => /^sitemap(?:-index|-\d+)?\.xml$/.test(file));
  if (sitemapFiles.length === 0) failures.push('No generated sitemap was found in dist/.');
}

if (failures.length > 0) {
  console.error('Static asset validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Static asset validation passed.');

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const siteUrl = process.env.PUBLIC_SITE_URL;
const failures = [];

if (!siteUrl) {
  console.error('PUBLIC_SITE_URL is required for social metadata validation.');
  process.exit(1);
}

const site = new URL(siteUrl);
const expectedImage = new URL('/social-card.png', site).toString();

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtml(child));
    else if (entry.name.endsWith('.html')) files.push(child);
  }

  return files;
}

function routeForFile(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function isNotFoundRoute(route) {
  return route === '/404.html' || route === '/en/404/';
}

function extractAttribute(tag, attribute) {
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function extractMeta(content, keyAttribute, keyValue) {
  const tags = [...content.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  return tags
    .filter((tag) => extractAttribute(tag, keyAttribute) === keyValue)
    .map((tag) => extractAttribute(tag, 'content'));
}

function requireSingleMeta(content, route, keyAttribute, keyValue) {
  const values = extractMeta(content, keyAttribute, keyValue);

  if (values.length !== 1 || !values[0]) {
    failures.push(`${route}: expected exactly one non-empty ${keyValue} meta tag`);
    return null;
  }

  return values[0];
}

function validateAbsoluteImage(route, value) {
  if (!value) return;

  try {
    const image = new URL(value);
    if (image.toString() !== expectedImage) {
      failures.push(`${route}: social image must be exactly ${expectedImage}`);
    }
    if (image.origin !== site.origin) {
      failures.push(`${route}: social image origin must match ${site.origin}`);
    }
    if (image.protocol !== 'https:' && site.protocol === 'https:') {
      failures.push(`${route}: social image must use HTTPS`);
    }
  } catch {
    failures.push(`${route}: social image must be an absolute URL`);
  }
}

const htmlFiles = await collectHtml(dist);
const publicPages = htmlFiles.filter((file) => !isNotFoundRoute(routeForFile(file)));

if (publicPages.length === 0) failures.push('No public HTML pages were found in dist/.');

for (const file of publicPages) {
  const content = await readFile(file, 'utf8');
  const route = routeForFile(file);

  const ogImage = requireSingleMeta(content, route, 'property', 'og:image');
  const ogImageType = requireSingleMeta(content, route, 'property', 'og:image:type');
  const ogImageWidth = requireSingleMeta(content, route, 'property', 'og:image:width');
  const ogImageHeight = requireSingleMeta(content, route, 'property', 'og:image:height');
  const ogImageAlt = requireSingleMeta(content, route, 'property', 'og:image:alt');

  const twitterCard = requireSingleMeta(content, route, 'name', 'twitter:card');
  const twitterImage = requireSingleMeta(content, route, 'name', 'twitter:image');
  const twitterImageAlt = requireSingleMeta(content, route, 'name', 'twitter:image:alt');

  validateAbsoluteImage(route, ogImage);

  if (ogImageType && ogImageType !== 'image/png') {
    failures.push(`${route}: og:image:type must be image/png`);
  }
  if (ogImageWidth && ogImageWidth !== '1200') {
    failures.push(`${route}: og:image:width must be 1200`);
  }
  if (ogImageHeight && ogImageHeight !== '630') {
    failures.push(`${route}: og:image:height must be 630`);
  }
  if (ogImageAlt && ogImageAlt.trim().length < 30) {
    failures.push(`${route}: og:image:alt must be descriptive`);
  }
  if (twitterCard && twitterCard !== 'summary_large_image') {
    failures.push(`${route}: twitter:card must be summary_large_image`);
  }
  if (twitterImage && ogImage && twitterImage !== ogImage) {
    failures.push(`${route}: twitter:image must match og:image`);
  }
  if (twitterImageAlt && ogImageAlt && twitterImageAlt !== ogImageAlt) {
    failures.push(`${route}: twitter:image:alt must match og:image:alt`);
  }
}

if (failures.length > 0) {
  console.error('Social metadata validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Social metadata validation passed for ${publicPages.length} public pages.`);

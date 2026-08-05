import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const siteUrl = process.env.PUBLIC_SITE_URL;
const failures = [];

if (!siteUrl) {
  console.error('PUBLIC_SITE_URL is required for sitemap validation.');
  process.exit(1);
}

const site = new URL(siteUrl);
const sitemapFiles = (await readdir(dist))
  .filter((file) => /^sitemap(?:-index|-\d+)?\.xml$/.test(file));

if (sitemapFiles.length === 0) {
  failures.push('No generated sitemap was found in dist/.');
}

const pageSitemapFiles = sitemapFiles.filter((file) => /^sitemap-\d+\.xml$/.test(file));
const pageLocations = new Set();

for (const sitemapFile of pageSitemapFiles) {
  const content = await readFile(path.join(dist, sitemapFile), 'utf8');
  for (const match of content.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    pageLocations.add(match[1]);
  }
}

const expectedRoutes = [
  '/',
  '/projects/hms-elite/',
  '/projects/gasflow/',
  '/projects/jm-soluciones/',
  '/es/',
  '/es/projects/hms-elite/',
  '/es/projects/gasflow/',
  '/es/projects/jm-soluciones/',
];
const expectedLocations = new Set(expectedRoutes.map((route) => new URL(route, site).toString()));

for (const expectedLocation of expectedLocations) {
  if (!pageLocations.has(expectedLocation)) {
    failures.push(`Sitemap is missing canonical URL ${expectedLocation}`);
  }
}

for (const location of pageLocations) {
  const url = new URL(location);
  if (url.origin !== site.origin) {
    failures.push(`Sitemap contains an unexpected origin: ${location}`);
    continue;
  }
  if (!expectedLocations.has(location)) {
    failures.push(`Sitemap contains an unexpected or non-indexable URL: ${location}`);
  }
  if (url.pathname === '/en' || url.pathname.startsWith('/en/')) {
    failures.push(`Sitemap contains a legacy English-prefixed URL: ${location}`);
  }
}

if (pageLocations.size !== expectedLocations.size) {
  failures.push(`Sitemap must contain exactly ${expectedLocations.size} indexable URLs; found ${pageLocations.size}`);
}

if (failures.length > 0) {
  console.error('Sitemap validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`English-first sitemap validation passed with ${pageLocations.size} canonical URLs.`);

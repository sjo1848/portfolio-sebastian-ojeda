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

const forbiddenUrls = ['/404.html', '/en/404/']
  .map((route) => new URL(route, site).toString());

for (const sitemapFile of sitemapFiles) {
  const content = await readFile(path.join(dist, sitemapFile), 'utf8');

  for (const forbiddenUrl of forbiddenUrls) {
    if (content.includes(`<loc>${forbiddenUrl}</loc>`)) {
      failures.push(`${sitemapFile} includes noindex not-found URL ${forbiddenUrl}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Sitemap validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sitemap validation passed across ${sitemapFiles.length} file(s).`);

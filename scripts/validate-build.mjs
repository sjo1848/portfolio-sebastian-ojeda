import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const siteUrl = process.env.PUBLIC_SITE_URL;
const failures = [];

if (!siteUrl) {
  console.error('PUBLIC_SITE_URL is required for build validation.');
  process.exit(1);
}

const site = new URL(siteUrl);

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

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

function publicPathForFile(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function extractAttribute(content, tagPattern, attribute) {
  const tag = content.match(tagPattern)?.[0];
  if (!tag) return null;
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function routeToFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === '/') return path.join(dist, 'index.html');
  if (path.extname(decoded)) return path.join(dist, decoded.replace(/^\//, ''));
  return path.join(dist, decoded.replace(/^\//, ''), 'index.html');
}

async function validatePage(file) {
  const content = await readFile(file, 'utf8');
  const route = publicPathForFile(file);
  const is404 = route === '/404.html';

  if (!/<html[^>]+lang=["']es(?:-[A-Z]{2})?["']/i.test(content)) {
    failures.push(`${route}: missing Spanish html lang attribute`);
  }

  if (countMatches(content, /<title>[^<]+<\/title>/gi) !== 1) {
    failures.push(`${route}: expected exactly one non-empty title`);
  }

  if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{40,}["']/i.test(content)
      && !/<meta[^>]+content=["'][^"']{40,}["'][^>]+name=["']description["']/i.test(content)) {
    failures.push(`${route}: missing useful meta description`);
  }

  if (countMatches(content, /<h1(?:\s|>)/gi) !== 1) {
    failures.push(`${route}: expected exactly one h1`);
  }

  if (/\b(?:TODO|TBD|FIXME|REPLACE_ME|YOUR_EMAIL|YOUR_LINKEDIN)\b|lorem ipsum|example@example\.com/i.test(content)) {
    failures.push(`${route}: unresolved public placeholder detected`);
  }

  if (is404) {
    if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(content)
        && !/<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(content)) {
      failures.push(`${route}: 404 page must be noindex`);
    }
  } else {
    const canonical = extractAttribute(content, /<link[^>]+rel=["']canonical["'][^>]*>/i, 'href');
    if (!canonical) {
      failures.push(`${route}: missing canonical link`);
    } else {
      try {
        const canonicalUrl = new URL(canonical);
        if (canonicalUrl.origin !== site.origin) {
          failures.push(`${route}: canonical origin ${canonicalUrl.origin} does not match ${site.origin}`);
        }
      } catch {
        failures.push(`${route}: canonical is not absolute: ${canonical}`);
      }
    }
  }

  const currentUrl = new URL(route, site);
  const hrefPattern = /href=["']([^"']+)["']/gi;

  for (const match of content.matchAll(hrefPattern)) {
    const href = match[1];
    if (/^(?:mailto:|tel:|data:|javascript:)/i.test(href)) continue;

    let target;
    try {
      target = new URL(href, currentUrl);
    } catch {
      failures.push(`${route}: invalid href ${href}`);
      continue;
    }

    if (target.origin !== site.origin) {
      if (target.protocol !== 'https:') failures.push(`${route}: insecure external href ${href}`);
      continue;
    }

    const targetFile = routeToFile(target.pathname);
    if (!await exists(targetFile)) {
      failures.push(`${route}: internal href ${href} resolves to missing ${path.relative(dist, targetFile)}`);
      continue;
    }

    if (target.hash && targetFile.endsWith('.html')) {
      const targetContent = targetFile === file ? content : await readFile(targetFile, 'utf8');
      const id = target.hash.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`(?:id|name)=["']${id}["']`, 'i').test(targetContent)) {
        failures.push(`${route}: href ${href} targets a missing anchor`);
      }
    }
  }
}

const requiredFiles = [
  'index.html',
  '404.html',
  'favicon.svg',
  'robots.txt',
  'projects/hms-elite/index.html',
  'projects/gasflow/index.html',
  'projects/amr-refrigeracion/index.html',
];

for (const relative of requiredFiles) {
  if (!await exists(path.join(dist, relative))) failures.push(`Missing build artifact: ${relative}`);
}

const htmlFiles = await collectHtml(dist);
for (const file of htmlFiles) await validatePage(file);

const sitemapFiles = (await readdir(dist)).filter((file) => /^sitemap(?:-index|-\d+)?\.xml$/.test(file));
if (sitemapFiles.length === 0) failures.push('No generated sitemap was found.');

if (await exists(path.join(dist, 'robots.txt'))) {
  const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
  if (!/^User-agent:\s*\*/mi.test(robots)) failures.push('robots.txt is missing a default user-agent rule.');
  if (!new RegExp(`^Sitemap:\\s*${site.origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap-index\\.xml`, 'mi').test(robots)) {
    failures.push('robots.txt does not reference the environment sitemap-index.xml.');
  }
}

if (failures.length > 0) {
  console.error('Build validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Build validation passed for ${htmlFiles.length} HTML pages.`);

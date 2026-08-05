import { access, readdir, readFile, stat } from 'node:fs/promises';
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

async function isFile(file) {
  try {
    return (await stat(file)).isFile();
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

function languageForRoute(route) {
  return route.startsWith('/es/') || route === '/es' ? 'es' : 'en';
}

function isNotFoundRoute(route) {
  return route === '/404.html' || route === '/es/404/';
}

function alternateRoute(route) {
  if (route === '/404.html') return '/es/404/';
  if (route === '/es/404/') return '/404.html';
  if (languageForRoute(route) === 'es') {
    if (route === '/es' || route === '/es/') return '/';
    return route.slice(3) || '/';
  }
  return route === '/' ? '/es/' : `/es${route}`;
}

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function extractAttribute(content, tagPattern, attribute) {
  const tag = content.match(tagPattern)?.[0];
  if (!tag) return null;
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function extractMeta(content, keyAttribute, keyValue) {
  const escaped = keyValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return extractAttribute(
    content,
    new RegExp(`<meta[^>]+${keyAttribute}=["']${escaped}["'][^>]*>`, 'i'),
    'content',
  );
}

function extractAlternateLinks(content) {
  return [...content.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi)].map((match) => ({
    hreflang: match[0].match(/hreflang=["']([^"']+)["']/i)?.[1] ?? null,
    href: match[0].match(/href=["']([^"']+)["']/i)?.[1] ?? null,
  }));
}

function routeToFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === '/') return path.join(dist, 'index.html');
  if (path.extname(decoded)) return path.join(dist, decoded.replace(/^\//, ''));
  return path.join(dist, decoded.replace(/^\//, ''), 'index.html');
}

function validateStructuredData(content, route) {
  const scripts = [...content.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length === 0) {
    failures.push(`${route}: missing JSON-LD structured data`);
    return;
  }

  for (const [, payload] of scripts) {
    try {
      const parsed = JSON.parse(payload.trim());
      if (parsed['@context'] !== 'https://schema.org') {
        failures.push(`${route}: JSON-LD must use the Schema.org context`);
      }
    } catch {
      failures.push(`${route}: JSON-LD is not valid JSON`);
    }
  }
}

function validateHreflang(content, route, canonicalUrl) {
  const language = languageForRoute(route);
  const currentTag = language === 'en' ? 'en-US' : 'es-AR';
  const alternateTag = language === 'en' ? 'es-AR' : 'en-US';
  const expectedAlternate = new URL(alternateRoute(route), site).toString();
  const expectedDefault = language === 'en' ? canonicalUrl : expectedAlternate;
  const links = extractAlternateLinks(content);

  for (const expected of [
    [currentTag, canonicalUrl],
    [alternateTag, expectedAlternate],
    ['x-default', expectedDefault],
  ]) {
    const matches = links.filter((link) => link.hreflang === expected[0] && link.href === expected[1]);
    if (matches.length !== 1) {
      failures.push(`${route}: expected one hreflang ${expected[0]} link to ${expected[1]}`);
    }
  }
}

async function validatePage(file) {
  const content = await readFile(file, 'utf8');
  const route = publicPathForFile(file);
  const is404 = isNotFoundRoute(route);
  const language = languageForRoute(route);
  const expectedLang = language === 'en' ? 'en-US' : 'es-AR';

  if (route === '/en' || route.startsWith('/en/')) {
    failures.push(`${route}: legacy English-prefixed HTML must not be generated`);
  }

  const htmlLang = content.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? null;
  if (htmlLang !== expectedLang) failures.push(`${route}: html lang must be ${expectedLang}`);

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

  const canonical = extractAttribute(content, /<link[^>]+rel=["']canonical["'][^>]*>/i, 'href');

  if (is404) {
    if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(content)
        && !/<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(content)) {
      failures.push(`${route}: not-found page must be noindex`);
    }
    if (canonical) failures.push(`${route}: noindex not-found page must not declare canonical`);
    if (extractAlternateLinks(content).length !== 0) failures.push(`${route}: noindex not-found page must not declare hreflang`);
  } else {
    if (!canonical) {
      failures.push(`${route}: missing canonical link`);
    } else {
      try {
        const canonicalUrl = new URL(canonical);
        const expectedCanonical = new URL(route, site).toString();
        if (canonicalUrl.toString() !== expectedCanonical) {
          failures.push(`${route}: canonical must be exactly ${expectedCanonical}`);
        }
        if (canonicalUrl.origin !== site.origin) {
          failures.push(`${route}: canonical origin ${canonicalUrl.origin} does not match ${site.origin}`);
        }

        const ogUrl = extractMeta(content, 'property', 'og:url');
        if (ogUrl !== canonicalUrl.toString()) {
          failures.push(`${route}: og:url must match canonical URL`);
        }
        validateHreflang(content, route, canonicalUrl.toString());
      } catch {
        failures.push(`${route}: canonical is not absolute: ${canonical}`);
      }
    }

    const requiredOpenGraph = ['og:locale', 'og:locale:alternate', 'og:type', 'og:site_name', 'og:title', 'og:description', 'og:url'];
    for (const property of requiredOpenGraph) {
      if (!extractMeta(content, 'property', property)) failures.push(`${route}: missing ${property}`);
    }

    const expectedLocale = language === 'en' ? 'en_US' : 'es_AR';
    const expectedAlternateLocale = language === 'en' ? 'es_AR' : 'en_US';
    if (extractMeta(content, 'property', 'og:locale') !== expectedLocale) {
      failures.push(`${route}: og:locale must be ${expectedLocale}`);
    }
    if (extractMeta(content, 'property', 'og:locale:alternate') !== expectedAlternateLocale) {
      failures.push(`${route}: og:locale:alternate must be ${expectedAlternateLocale}`);
    }

    const requiredTwitter = ['twitter:card', 'twitter:title', 'twitter:description'];
    for (const name of requiredTwitter) {
      if (!extractMeta(content, 'name', name)) failures.push(`${route}: missing ${name}`);
    }

    if (!/<link[^>]+rel=["']manifest["'][^>]+href=["']\/site\.webmanifest["']/i.test(content)
        && !/<link[^>]+href=["']\/site\.webmanifest["'][^>]+rel=["']manifest["']/i.test(content)) {
      failures.push(`${route}: missing site manifest link`);
    }

    if (!extractMeta(content, 'name', 'theme-color')) failures.push(`${route}: missing theme-color`);
    validateStructuredData(content, route);
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
    if (!await isFile(targetFile)) {
      failures.push(`${route}: internal href ${href} resolves to missing file ${path.relative(dist, targetFile)}`);
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
  'site.webmanifest',
  '_redirects',
  'robots.txt',
  'projects/hms-elite/index.html',
  'projects/gasflow/index.html',
  'projects/jm-soluciones/index.html',
  'es/index.html',
  'es/404/index.html',
  'es/projects/hms-elite/index.html',
  'es/projects/gasflow/index.html',
  'es/projects/jm-soluciones/index.html',
  'cv-sebastian-ojeda.pdf',
  'cv-sebastian-ojeda-en.pdf',
];

for (const relative of requiredFiles) {
  if (!await isFile(path.join(dist, relative))) failures.push(`Missing build artifact file: ${relative}`);
}

if (await exists(path.join(dist, 'en'))) {
  failures.push('Legacy /en directory must not be emitted in the static build.');
}

const redirectsPath = path.join(dist, '_redirects');
if (await isFile(redirectsPath)) {
  const redirects = await readFile(redirectsPath, 'utf8');
  const requiredRules = [
    '/en / 301',
    '/en/ / 301',
    '/en/404 /404.html 301',
    '/en/404/ /404.html 301',
    '/en/* /:splat 301',
  ];
  for (const rule of requiredRules) {
    if (!redirects.split(/\r?\n/).includes(rule)) failures.push(`Missing Cloudflare redirect rule: ${rule}`);
  }
}

const htmlFiles = await collectHtml(dist);
for (const file of htmlFiles) await validatePage(file);

const manifestPath = path.join(dist, 'site.webmanifest');
if (await exists(manifestPath)) {
  try {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    if (!manifest.name || !manifest.short_name || manifest.start_url !== '/') {
      failures.push('site.webmanifest is missing required identity or start URL fields.');
    }
    if (manifest.lang !== 'en-US') failures.push('site.webmanifest lang must be en-US.');
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
      failures.push('site.webmanifest must declare at least one icon.');
    }
  } catch {
    failures.push('site.webmanifest is not valid JSON.');
  }
}

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
  console.error('English-first bilingual build validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`English-first bilingual build validation passed for ${htmlFiles.length} HTML pages.`);

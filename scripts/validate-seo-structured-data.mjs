import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.argv[2] ?? 'dist');
const siteUrl = process.env.PUBLIC_SITE_URL;
const failures = [];
const pageIdentities = [];

if (!siteUrl) {
  console.error('PUBLIC_SITE_URL is required for SEO validation.');
  process.exit(1);
}

const site = new URL(siteUrl);
const rootUrl = new URL('/', site).toString();
const personId = `${rootUrl}#person`;

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

function languageForRoute(route) {
  return route.startsWith('/es/') || route === '/es' ? 'es' : 'en';
}

function languageContract(route) {
  const language = languageForRoute(route);
  const root = new URL(language === 'es' ? '/es/' : '/', site).toString();
  return {
    language,
    htmlLang: language === 'es' ? 'es-AR' : 'en-US',
    locale: language === 'es' ? 'es_AR' : 'en_US',
    websiteRoot: root,
    websiteId: `${root}#website`,
  };
}

function isNotFoundRoute(route) {
  return route === '/404.html' || route === '/es/404/';
}

function extractAttribute(tag, attribute) {
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function extractTags(content, tagName) {
  return [...content.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function extractMeta(content, keyAttribute, keyValue) {
  return extractTags(content, 'meta')
    .filter((tag) => extractAttribute(tag, keyAttribute) === keyValue)
    .map((tag) => extractAttribute(tag, 'content'))
    .filter(Boolean);
}

function extractCanonical(content) {
  return extractTags(content, 'link')
    .filter((tag) => extractAttribute(tag, 'rel') === 'canonical')
    .map((tag) => extractAttribute(tag, 'href'))
    .filter(Boolean);
}

function extractTitle(content) {
  return [...content.matchAll(/<title>([\s\S]*?)<\/title>/gi)]
    .map((match) => match[1].replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function parseStructuredData(content, route) {
  const scripts = [...content.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length !== 1) {
    failures.push(`${route}: expected exactly one JSON-LD script`);
    return null;
  }

  try {
    return JSON.parse(scripts[0][1].trim());
  } catch {
    failures.push(`${route}: JSON-LD is not valid JSON`);
    return null;
  }
}

function requireGraphNode(graph, route, type) {
  const nodes = graph.filter((node) => node?.['@type'] === type);
  if (nodes.length !== 1) {
    failures.push(`${route}: expected exactly one ${type} node`);
    return null;
  }
  return nodes[0];
}

function requireNonEmptyString(value, route, field) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    failures.push(`${route}: ${field} must be a non-empty string`);
    return false;
  }
  return true;
}

function validateAbsoluteHttps(value, route, field) {
  if (!requireNonEmptyString(value, route, field)) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') failures.push(`${route}: ${field} must use HTTPS`);
    return parsed;
  } catch {
    failures.push(`${route}: ${field} must be an absolute URL`);
    return null;
  }
}

function validatePerson(node, route) {
  if (!node) return;
  if (node['@id'] !== personId) failures.push(`${route}: Person @id must be ${personId}`);
  requireNonEmptyString(node.name, route, 'Person.name');
  requireNonEmptyString(node.jobTitle, route, 'Person.jobTitle');
  if (node.url !== rootUrl) failures.push(`${route}: Person.url must be ${rootUrl}`);
  if (node.email && typeof node.email !== 'string') failures.push(`${route}: Person.email must be a string`);
  if (!Array.isArray(node.knowsLanguage) || node.knowsLanguage.length === 0) {
    failures.push(`${route}: Person.knowsLanguage must be a non-empty array`);
  }
  if (!Array.isArray(node.sameAs) || node.sameAs.length === 0) {
    failures.push(`${route}: Person.sameAs must be a non-empty array`);
  } else {
    for (const profile of node.sameAs) validateAbsoluteHttps(profile, route, 'Person.sameAs');
  }
}

function validateWebsite(node, route, contract) {
  if (!node) return;
  if (node['@id'] !== contract.websiteId) failures.push(`${route}: WebSite @id must be ${contract.websiteId}`);
  if (node.url !== contract.websiteRoot) failures.push(`${route}: WebSite.url must be ${contract.websiteRoot}`);
  requireNonEmptyString(node.name, route, 'WebSite.name');
  requireNonEmptyString(node.description, route, 'WebSite.description');
  if (node.inLanguage !== contract.htmlLang) failures.push(`${route}: WebSite.inLanguage must be ${contract.htmlLang}`);
  if (node.about?.['@id'] !== personId) failures.push(`${route}: WebSite.about must reference Person`);
  if (node.publisher?.['@id'] !== personId) failures.push(`${route}: WebSite.publisher must reference Person`);
}

function validateSoftware(node, route, canonical, title, description, contract) {
  if (!node) return;
  const expectedId = `${canonical}#software`;

  if (node['@id'] !== expectedId) failures.push(`${route}: SoftwareSourceCode @id must be ${expectedId}`);
  if (node.url !== canonical) failures.push(`${route}: SoftwareSourceCode.url must match canonical`);
  if (node.name !== title.replace(/\s+—\s+Sebastián Ojeda$/, '')) {
    failures.push(`${route}: SoftwareSourceCode.name must match the page project title`);
  }
  if (node.description !== description) failures.push(`${route}: SoftwareSourceCode.description must match the meta description`);
  if (node.inLanguage !== contract.htmlLang) failures.push(`${route}: SoftwareSourceCode.inLanguage must be ${contract.htmlLang}`);
  if (node.codeRepository !== undefined) {
    validateAbsoluteHttps(node.codeRepository, route, 'SoftwareSourceCode.codeRepository');
  }
  if (!Array.isArray(node.programmingLanguage) || node.programmingLanguage.length === 0) {
    failures.push(`${route}: SoftwareSourceCode.programmingLanguage must be a non-empty array`);
  }
  if (node.author?.['@id'] !== personId) failures.push(`${route}: SoftwareSourceCode.author must reference Person`);
  if (node.image) validateAbsoluteHttps(node.image, route, 'SoftwareSourceCode.image');
}

const htmlFiles = await collectHtml(dist);

for (const file of htmlFiles) {
  const content = await readFile(file, 'utf8');
  const route = routeForFile(file);
  const contract = languageContract(route);
  const is404 = isNotFoundRoute(route);
  const htmlLang = content.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? null;
  const titles = extractTitle(content);
  const descriptions = extractMeta(content, 'name', 'description');

  if (htmlLang !== contract.htmlLang) failures.push(`${route}: html lang must be ${contract.htmlLang}`);
  if (titles.length !== 1) failures.push(`${route}: expected exactly one non-empty title`);
  if (descriptions.length !== 1) failures.push(`${route}: expected exactly one non-empty meta description`);

  const title = titles[0] ?? '';
  const description = descriptions[0] ?? '';

  if (title.length < 20 || title.length > 75) failures.push(`${route}: title length must be between 20 and 75 characters`);
  if (description.length < 40 || description.length > 180) failures.push(`${route}: description length must be between 40 and 180 characters`);

  if (is404) {
    const robots = extractMeta(content, 'name', 'robots');
    if (robots.length !== 1 || !/\bnoindex\b/i.test(robots[0])) failures.push(`${route}: robots meta must include noindex`);
    if (extractCanonical(content).length !== 0) failures.push(`${route}: canonical must be omitted`);
    continue;
  }

  const canonicals = extractCanonical(content);
  if (canonicals.length !== 1) {
    failures.push(`${route}: expected exactly one canonical link`);
    continue;
  }

  const expectedCanonical = new URL(route, site).toString();
  const canonical = canonicals[0];
  if (canonical !== expectedCanonical) failures.push(`${route}: canonical must be exactly ${expectedCanonical}`);

  const canonicalUrl = validateAbsoluteHttps(canonical, route, 'canonical');
  if (canonicalUrl) {
    if (canonicalUrl.origin !== site.origin) failures.push(`${route}: canonical origin must match ${site.origin}`);
    if (canonicalUrl.search || canonicalUrl.hash) failures.push(`${route}: canonical must not contain query or fragment`);
  }

  const ogTitle = extractMeta(content, 'property', 'og:title');
  const ogDescription = extractMeta(content, 'property', 'og:description');
  const ogUrl = extractMeta(content, 'property', 'og:url');
  const ogLocale = extractMeta(content, 'property', 'og:locale');

  if (ogTitle.length !== 1 || ogTitle[0] !== title) failures.push(`${route}: og:title must match title`);
  if (ogDescription.length !== 1 || ogDescription[0] !== description) failures.push(`${route}: og:description must match meta description`);
  if (ogUrl.length !== 1 || ogUrl[0] !== canonical) failures.push(`${route}: og:url must match canonical`);
  if (ogLocale.length !== 1 || ogLocale[0] !== contract.locale) failures.push(`${route}: og:locale must be ${contract.locale}`);

  pageIdentities.push({ route, language: contract.language, title, description });

  const structuredData = parseStructuredData(content, route);
  if (!structuredData) continue;
  if (structuredData['@context'] !== 'https://schema.org') failures.push(`${route}: JSON-LD context must be https://schema.org`);

  const graph = structuredData['@graph'];
  if (!Array.isArray(graph)) {
    failures.push(`${route}: JSON-LD @graph must be an array`);
    continue;
  }

  const person = requireGraphNode(graph, route, 'Person');
  const website = requireGraphNode(graph, route, 'WebSite');
  validatePerson(person, route);
  validateWebsite(website, route, contract);

  const softwareNodes = graph.filter((node) => node?.['@type'] === 'SoftwareSourceCode');
  const isProject = route.startsWith('/projects/') || route.startsWith('/es/projects/');

  if (isProject) {
    if (softwareNodes.length !== 1) failures.push(`${route}: expected exactly one SoftwareSourceCode node`);
    else validateSoftware(softwareNodes[0], route, canonical, title, description, contract);
  } else if (softwareNodes.length !== 0) {
    failures.push(`${route}: SoftwareSourceCode must only appear on project pages`);
  }
}

const titleOwners = new Map();
const descriptionOwners = new Map();

for (const page of pageIdentities) {
  const titleKey = `${page.language}:${page.title}`;
  const descriptionKey = `${page.language}:${page.description}`;

  if (titleOwners.has(titleKey)) failures.push(`${page.route}: duplicates title used by ${titleOwners.get(titleKey)}`);
  else titleOwners.set(titleKey, page.route);

  if (descriptionOwners.has(descriptionKey)) failures.push(`${page.route}: duplicates description used by ${descriptionOwners.get(descriptionKey)}`);
  else descriptionOwners.set(descriptionKey, page.route);
}

if (failures.length > 0) {
  console.error('English-first bilingual SEO and structured data validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`English-first bilingual SEO and structured data validation passed for ${htmlFiles.length} HTML pages.`);

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.argv[2] ?? 'dist');
const stylesheetPath = path.resolve('src/styles/global.css');
const failures = [];

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

function extractAttribute(tag, attribute) {
  return tag.match(new RegExp(`(?:^|\\s)${attribute}=["']([^"']*)["']`, 'i'))?.[1] ?? null;
}

function extractTags(content, tagName) {
  return [...content.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function hasClass(tag, className) {
  return (extractAttribute(tag, 'class') ?? '').split(/\s+/).includes(className);
}

function textContent(content) {
  return content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&[^;]+;/g, 'x')
    .replace(/\s+/g, ' ')
    .trim();
}

function requireSingle(content, route, tagName, description) {
  const tags = extractTags(content, tagName);
  if (tags.length !== 1) {
    failures.push(`${route}: expected exactly one ${description}`);
    return null;
  }
  return tags[0];
}

function requireSingleClass(content, route, tagName, className, description) {
  const tags = extractTags(content, tagName).filter((tag) => hasClass(tag, className));
  if (tags.length !== 1) {
    failures.push(`${route}: expected exactly one ${description}`);
    return null;
  }
  return tags[0];
}

function validateSkipFlow(content, route) {
  const main = requireSingle(content, route, 'main', 'main landmark');
  if (main) {
    if (extractAttribute(main, 'id') !== 'main-content') {
      failures.push(`${route}: main landmark must use id="main-content"`);
    }
    if (extractAttribute(main, 'tabindex') !== '-1') {
      failures.push(`${route}: main landmark must use tabindex="-1" for skip-link focus`);
    }
  }

  const anchors = [...content.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);
  const skipLinks = anchors.filter((anchor) => /(?:^|\s)class=["'][^"']*\bskip-link\b/i.test(anchor));

  if (skipLinks.length !== 1) {
    failures.push(`${route}: expected exactly one skip link`);
    return;
  }

  if (extractAttribute(skipLinks[0], 'href') !== '#main-content') {
    failures.push(`${route}: skip link must target #main-content`);
  }
  if (textContent(skipLinks[0]).length < 5) {
    failures.push(`${route}: skip link must have meaningful text`);
  }
}

function validateLinks(content, route) {
  const anchors = [...content.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((match) => match[0]);

  for (const anchor of anchors) {
    const href = extractAttribute(anchor, 'href');
    if (!href) {
      failures.push(`${route}: anchor without href`);
      continue;
    }

    const label = extractAttribute(anchor, 'aria-label');
    const visibleText = textContent(anchor);
    const imageAlt = anchor.match(/<img\b[^>]*\balt=["']([^"']+)["']/i)?.[1] ?? '';
    if (!label && !visibleText && !imageAlt) {
      failures.push(`${route}: link ${href} has no accessible name`);
    }

    if (extractAttribute(anchor, 'target') === '_blank') {
      const rel = (extractAttribute(anchor, 'rel') ?? '').split(/\s+/).filter(Boolean);
      if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
        failures.push(`${route}: target="_blank" link ${href} must use noopener noreferrer`);
      }
    }
  }
}

function validateImages(content, route) {
  for (const image of extractTags(content, 'img')) {
    const alt = extractAttribute(image, 'alt');
    const width = Number(extractAttribute(image, 'width'));
    const height = Number(extractAttribute(image, 'height'));

    if (alt === null || alt.trim().length < 10) {
      failures.push(`${route}: content image must have descriptive alternative text`);
    }
    if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
      failures.push(`${route}: image must declare positive width and height`);
    }
    if (extractAttribute(image, 'decoding') !== 'async') {
      failures.push(`${route}: image must use decoding="async"`);
    }
  }
}

function validatePage(content, route) {
  const viewportTags = extractTags(content, 'meta').filter(
    (tag) => extractAttribute(tag, 'name') === 'viewport',
  );
  if (viewportTags.length !== 1) failures.push(`${route}: expected exactly one viewport meta tag`);

  if (/<[^>]+tabindex=["'](?:[1-9]|\d{2,})["']/i.test(content)) {
    failures.push(`${route}: positive tabindex values are not allowed`);
  }

  validateSkipFlow(content, route);
  validateLinks(content, route);
  validateImages(content, route);

  if (route !== '/404.html') {
    const nav = requireSingle(content, route, 'nav', 'primary navigation landmark');
    if (nav && !(extractAttribute(nav, 'aria-label') ?? '').trim()) {
      failures.push(`${route}: primary navigation must have an aria-label`);
    }
    requireSingleClass(content, route, 'header', 'site-header', 'site header');
    requireSingle(content, route, 'footer', 'site footer');
  }
}

const htmlFiles = await collectHtml(dist);
if (htmlFiles.length === 0) failures.push('No HTML pages were found in dist/.');

for (const file of htmlFiles) {
  const content = await readFile(file, 'utf8');
  validatePage(content, routeForFile(file));
}

const stylesheet = await readFile(stylesheetPath, 'utf8');
const cssRequirements = [
  [/:focus-visible\b/, 'focus-visible styles'],
  [/\.skip-link:focus\b/, 'visible skip-link focus state'],
  [/min-height:\s*2\.75rem/, '44 px interactive targets'],
  [/scroll-padding-top:/, 'sticky-header anchor offset'],
  [/@media\s*\(max-width:/, 'small-screen responsive breakpoint'],
  [/@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'reduced-motion support'],
  [/overflow-wrap:\s*anywhere/, 'long-content wrapping'],
  [/img\s*\{[^}]*max-width:\s*100%/s, 'responsive image constraint'],
];

for (const [pattern, description] of cssRequirements) {
  if (!pattern.test(stylesheet)) failures.push(`CSS contract: missing ${description}`);
}

if (failures.length > 0) {
  console.error('UX and accessibility validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`UX and accessibility validation passed for ${htmlFiles.length} HTML pages.`);

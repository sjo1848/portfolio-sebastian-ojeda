import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const failures = [];

const read = (file) => readFile(path.join(root, file), 'utf8');
const requireText = (content, text, label) => {
  if (!content.includes(text)) failures.push(`${label}: missing ${JSON.stringify(text)}`);
};
const forbidText = (content, text, label) => {
  if (content.includes(text)) failures.push(`${label}: forbidden ${JSON.stringify(text)}`);
};

const home = await read('src/components/HomePage.astro');
const header = await read('src/components/SiteHeader.astro');
const card = await read('src/components/ProjectCard.astro');
const site = await read('src/data/site.ts');
const stories = await read('src/data/portfolioStories.ts');

// Issue #116 I1: identity, selected proof, differentiator, human context, breadth, conversion.
const orderedHomeMarkers = [
  'id="hero"',
  'id="projects"',
  'id="operating-mindset"',
  'id="about"',
  'id="additional-work"',
  'id="contact"',
];
let previousIndex = -1;
for (const marker of orderedHomeMarkers) {
  const index = home.indexOf(marker);
  if (index === -1) {
    failures.push(`HomePage.astro: missing section marker ${marker}`);
    continue;
  }
  if (index <= previousIndex) failures.push(`HomePage.astro: section order is invalid at ${marker}`);
  previousIndex = index;
}

// Resume is a visible secondary conversion path; Hero contains no project proof roster or media.
requireText(home, 'href={site.cv}', 'HomePage.astro resume CTA');
requireText(header, 'href: site.cv', 'SiteHeader.astro resume navigation');
requireText(header, 'copy.nav.cv', 'SiteHeader.astro resume label');
forbidText(home, 'hero-proof-links', 'HomePage.astro');
forbidText(home, 'brand-hero-evidence', 'HomePage.astro');
forbidText(home, 'hmsReceptionHero', 'HomePage.astro');
requireText(home, 'id="operating-mindset"', 'HomePage.astro operating mindset');
requireText(home, 'additional-work-index', 'HomePage.astro compact additional work');

// Full-stack positioning must be primary and AI remains a differentiator.
requireText(site, "title: 'Full-Stack Software Developer · Backend, IA y Automatización'", 'site.ts ES positioning');
requireText(site, "title: 'Full-Stack Software Developer · Backend, AI and Automation'", 'site.ts EN positioning');
requireText(home, "eyebrow: 'FULL-STACK SOFTWARE DEVELOPER · BACKEND-ORIENTED'", 'HomePage.astro EN positioning');
requireText(home, "eyebrow: 'DESARROLLADOR DE SOFTWARE FULL-STACK · FOCO BACKEND'", 'HomePage.astro ES positioning');
requireText(home, "headline: ['FULL-STACK', 'SOFTWARE', 'DEVELOPER']", 'HomePage.astro role headline');

// Primary work order is intentionally product/full-stack first.
const expectedStoryOrder = [
  "'hms-cloudflare'",
  "'alquileres-uspa'",
  "'ai-commerce-platform'",
];
const primaryBlock = stories.slice(stories.indexOf('primaryStorySlugs'), stories.indexOf('secondaryCaseSlugs'));
const secondaryBlock = stories.slice(stories.indexOf('secondaryCaseSlugs'));
previousIndex = -1;
for (const slug of expectedStoryOrder) {
  const index = primaryBlock.indexOf(slug);
  if (index === -1) failures.push(`portfolioStories.ts: missing primary story ${slug}`);
  if (index <= previousIndex) failures.push(`portfolioStories.ts: primary story order is invalid at ${slug}`);
  previousIndex = index;
}
for (const slug of ["'uspaya'", "'gasflow'", "'agentic-engineering-governance'", "'hms-elite'", "'jm-soluciones'", "'taco-loco'"]) {
  if (!secondaryBlock.includes(slug)) failures.push(`portfolioStories.ts: missing secondary case ${slug}`);
  if (primaryBlock.includes(slug)) failures.push(`portfolioStories.ts: secondary case ${slug} must not be primary`);
}

// Selected work is proof-first: one role signal, a reduced stack line and one case-study CTA.
for (const marker of [
  "role: 'Rol'",
  'data.role',
  "data.stack.slice(0, variant === 'hero' ? 4 : 3)",
  'project-case-link',
  'getProjectPath(lang, data.slug)',
]) {
  requireText(card, marker, 'ProjectCard.astro');
}
forbidText(card, 'evidenceSignals', 'ProjectCard.astro');
forbidText(card, 'project-signal-list', 'ProjectCard.astro');
forbidText(card, 'class="stack-list"', 'ProjectCard.astro');
requireText(stories, "eyebrow: 'TRABAJO SELECCIONADO'", 'portfolioStories.ts ES selected-work copy');
requireText(stories, "eyebrow: 'SELECTED WORK'", 'portfolioStories.ts EN selected-work copy');
requireText(stories, "title: 'Entender el sistema. Construir end-to-end. Verificar los límites.'", 'portfolioStories.ts ES operating mindset');
requireText(stories, "title: 'Understand the system. Build end-to-end. Verify the boundaries.'", 'portfolioStories.ts EN operating mindset');

// Flagship case studies must use the normalized evidence-first structure in both languages.
const caseStudyContracts = [
  ['content/projects/hms-cloudflare.md', ['## Problema', '## Contexto y restricciones', '## Arquitectura', '## Decisiones de ingeniería', '## QA y validación', '## Evidencia y límites']],
  ['content/projects/alquileres-uspa.md', ['## Problema', '## Contexto y restricciones', '## Arquitectura', '## Decisiones de ingeniería', '## QA y validación', '## Evidencia y límites']],
  ['content/projects-en/hms-cloudflare.md', ['## Problem', '## Context and constraints', '## Architecture', '## Engineering decisions', '## QA and validation', '## Evidence and limits']],
  ['content/projects-en/alquileres-uspa.md', ['## Problem', '## Context and constraints', '## Architecture', '## Engineering decisions', '## QA and validation', '## Evidence and limits']],
];
for (const [file, markers] of caseStudyContracts) {
  const content = await read(file);
  for (const marker of markers) requireText(content, marker, file);
}

const hmsEs = await read('content/projects/hms-cloudflare.md');
const hmsEn = await read('content/projects-en/hms-cloudflare.md');
requireText(hmsEs, 'cf-i04-reception-authorized.png', 'HMS ES visual evidence');
requireText(hmsEn, 'cf-i04-reception-authorized.png', 'HMS EN visual evidence');

if (failures.length > 0) {
  console.error('Portfolio presentation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Portfolio presentation validation passed.');

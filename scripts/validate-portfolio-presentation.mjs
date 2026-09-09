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

// Recruiter journey: work and capabilities must appear before methodology.
const orderedHomeMarkers = [
  'class="hero section"',
  'id="projects"',
  'id="capabilities"',
  'id="experience"',
  'id="process"',
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

// CV remains generated as an asset, but it must not be exposed as a visible download CTA.
forbidText(home, 'href={site.cv}', 'HomePage.astro');
forbidText(header, 'href={site.cv}', 'SiteHeader.astro');
forbidText(header, 'copy.nav.cv', 'SiteHeader.astro');

// Full-stack positioning must be primary and AI remains a differentiator.
requireText(site, "title: 'Full-Stack Software Developer · Backend, IA y Automatización'", 'site.ts ES positioning');
requireText(site, "title: 'Full-Stack Software Developer · Backend, AI and Automation'", 'site.ts EN positioning');
requireText(site, "eyebrow: 'Full-stack software developer'", 'site.ts home positioning');

// Primary work order is intentionally product/full-stack first.
const expectedStoryOrder = [
  "'hms-cloudflare'",
  "'alquileres-uspa'",
  "'ai-commerce-platform'",
  "'uspaya'",
];
const primaryBlock = stories.slice(stories.indexOf('primaryStorySlugs'), stories.indexOf('secondaryCaseSlugs'));
previousIndex = -1;
for (const slug of expectedStoryOrder) {
  const index = primaryBlock.indexOf(slug);
  if (index === -1) failures.push(`portfolioStories.ts: missing primary story ${slug}`);
  if (index <= previousIndex) failures.push(`portfolioStories.ts: primary story order is invalid at ${slug}`);
  previousIndex = index;
}

// Selected work is proof-first: one role signal, a reduced stack line and one case-study CTA.
for (const marker of [
  "role: 'Rol'",
  'data.role',
  "data.stack.slice(0, variant === 'hero' ? 4 : 3)",
  'class="project-case-link"',
  'getProjectPath(lang, data.slug)',
]) {
  requireText(card, marker, 'ProjectCard.astro');
}
forbidText(card, 'evidenceSignals', 'ProjectCard.astro');
forbidText(card, 'project-signal-list', 'ProjectCard.astro');
forbidText(card, 'class="stack-list"', 'ProjectCard.astro');
requireText(stories, "eyebrow: 'Trabajo seleccionado'", 'portfolioStories.ts ES selected-work copy');
requireText(stories, "eyebrow: 'Selected work'", 'portfolioStories.ts EN selected-work copy');

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
requireText(hmsEs, 'cf-i04-reception-lifecycle.png', 'HMS ES visual evidence');
requireText(hmsEn, 'cf-i04-reception-lifecycle.png', 'HMS EN visual evidence');

if (failures.length > 0) {
  console.error('Portfolio presentation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Portfolio presentation validation passed.');

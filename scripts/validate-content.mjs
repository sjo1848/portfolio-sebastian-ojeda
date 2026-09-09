import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanRoots = ['src', 'content/projects', 'content/projects-en', 'public'];
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt']);
const forbidden = [
  { label: 'TODO marker', pattern: /(?:^|[\s([{])TODO(?=$|[\s)\]}.,:;!?])/ },
  { label: 'TBD marker', pattern: /\bTBD\b/i },
  { label: 'FIXME marker', pattern: /\bFIXME\b/i },
  { label: 'Lorem ipsum', pattern: /lorem ipsum/i },
  { label: 'Example email', pattern: /example@example\.com/i },
  { label: 'Replacement marker', pattern: /\b(?:REPLACE_ME|YOUR_EMAIL|YOUR_LINKEDIN)\b/i },
];

const expectedProjects = [
  'agentic-engineering-governance',
  'ai-commerce-platform',
  'alquileres-uspa',
  'gasflow',
  'hms-cloudflare',
  'hms-elite',
  'jm-soluciones',
  'taco-loco',
  'uspaya',
];
const expectedPrimaryStories = [
  'hms-cloudflare',
  'alquileres-uspa',
  'ai-commerce-platform',
  'uspaya',
];
const expectedSecondaryCases = ['gasflow', 'agentic-engineering-governance'];
const expectedCvRepositories = [
  'ai-commerce-platform',
  'hotel-management-system',
  'hms-cloudflare',
  'gasflow',
  'alquileres-uspa',
];
const failures = [];

async function collectFiles(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const entries = await readdir(absolutePath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(child));
    } else if (textExtensions.has(path.extname(entry.name))) {
      files.push(child);
    }
  }

  return files;
}

function lineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function validateExternalUrls(file, content) {
  const urlPattern = /https?:\/\/[^\s"'<>)}\]]+/g;

  for (const match of content.matchAll(urlPattern)) {
    const raw = match[0].replace(/[.,;:]$/, '');

    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)) {
        failures.push(`${file}:${lineNumber(content, match.index)} uses insecure external URL: ${raw}`);
      }
    } catch {
      failures.push(`${file}:${lineNumber(content, match.index)} contains invalid URL: ${raw}`);
    }
  }
}

function validateForbiddenMarkers(file, content) {
  for (const rule of forbidden) {
    const match = rule.pattern.exec(content);
    if (match) failures.push(`${file}:${lineNumber(content, match.index)} contains ${rule.label}`);
  }
}

function extractFrontMatterValue(content, key) {
  return content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? null;
}

async function projectFiles(directory) {
  return (await readdir(path.join(root, directory)))
    .filter((entry) => entry.endsWith('.md'))
    .map((entry) => entry.replace(/\.md$/, ''))
    .sort();
}

async function validateProjectInventory() {
  const directories = ['content/projects', 'content/projects-en'];
  const inventories = [];

  for (const directory of directories) {
    const slugs = await projectFiles(directory);
    inventories.push(slugs);

    if (JSON.stringify(slugs) !== JSON.stringify(expectedProjects)) {
      failures.push(`${directory} inventory mismatch. Expected ${expectedProjects.join(', ')}; found ${slugs.join(', ')}`);
    }

    for (const slug of expectedProjects) {
      const file = path.join(root, directory, `${slug}.md`);
      const info = await stat(file);
      if (info.size < 1_500) failures.push(`${directory}/${slug}.md is unexpectedly small (${info.size} bytes)`);
    }
  }

  if (JSON.stringify(inventories[0]) !== JSON.stringify(inventories[1])) {
    failures.push('Spanish and English project inventories must contain identical slugs.');
  }

  for (const slug of expectedProjects) {
    const spanish = await readFile(path.join(root, 'content/projects', `${slug}.md`), 'utf8');
    const english = await readFile(path.join(root, 'content/projects-en', `${slug}.md`), 'utf8');

    for (const key of ['title', 'slug', 'order', 'featured', 'status', 'year', 'repository']) {
      const spanishValue = extractFrontMatterValue(spanish, key);
      const englishValue = extractFrontMatterValue(english, key);
      if (spanishValue !== englishValue) {
        failures.push(`${slug}: bilingual front matter mismatch for ${key}: ${spanishValue} != ${englishValue}`);
      }
    }
  }
}

async function validatePortfolioNarrative() {
  const storyData = await readFile(path.join(root, 'src/data/portfolioStories.ts'), 'utf8');
  for (const slug of expectedPrimaryStories) {
    if (!storyData.includes(`'${slug}'`)) failures.push(`portfolioStories.ts is missing primary story ${slug}.`);
  }
  for (const slug of expectedSecondaryCases) {
    if (!storyData.includes(`'${slug}'`)) failures.push(`portfolioStories.ts is missing secondary case ${slug}.`);
  }
  for (const excluded of ['hms-elite', 'jm-soluciones', 'taco-loco']) {
    const primaryBlock = storyData.slice(storyData.indexOf('primaryStorySlugs'), storyData.indexOf('secondaryCaseSlugs'));
    if (primaryBlock.includes(`'${excluded}'`)) failures.push(`${excluded} must not be a primary engineering story.`);
  }

  const home = await readFile(path.join(root, 'src/components/HomePage.astro'), 'utf8');
  for (const marker of ['primaryProjects', 'secondaryProjects', "variant={index === 0 ? 'hero' : 'story'}"]) {
    if (!home.includes(marker)) failures.push(`HomePage.astro is missing engineering-story marker: ${marker}`);
  }

  const requiredEvidence = [
    ['content/projects/ai-commerce-platform.md', ['AI Commerce + HMS', 'autoridad', 'Service Binding', 'Human-in-the-Loop']],
    ['content/projects/hms-cloudflare.md', ['HMS Elite', 'Rust + Axum + PostgreSQL', 'parity-first', 'Agent Core']],
    ['content/projects/agentic-engineering-governance.md', ['DICS', 'Project Integrity Kernel', 'Context Amnesia Test', 'read-only']],
    ['content/projects/uspaya.md', ['Idempotency-Key', 'transacciones serializables', 'privacidad temporal', 'NOT READY FOR CLOSED PILOT']],
  ];

  for (const [file, phrases] of requiredEvidence) {
    const content = await readFile(path.join(root, file), 'utf8');
    for (const phrase of phrases) {
      if (!content.includes(phrase)) failures.push(`${file} is missing required engineering-story evidence: ${phrase}`);
    }
  }

  const siteContent = await readFile(path.join(root, 'src/data/site.ts'), 'utf8');
  for (const phrase of [
    'Full-stack software developer',
    'Full-Stack Software Developer · Backend, AI and Automation',
    'Full-Stack Software Developer · Backend, IA y Automatización',
    'Backend y arquitectura',
    'Backend and architecture',
  ]) {
    if (!siteContent.includes(phrase)) failures.push(`src/data/site.ts is missing positioning phrase: ${phrase}`);
  }
}

async function validateCvProjectConsistency() {
  const cvFiles = [
    'docs/cv/CV_Sebastian_Ojeda_Backend_FullStack.md',
    'docs/cv/CV_Sebastian_Ojeda_Backend_FullStack_EN.md',
    'scripts/generate-cv-pdf.mjs',
  ];

  const staleClaims = [
    { label: 'stale Systems year claim', pattern: /4\.?º?\s*año\s*cursado|completed coursework through year 4/i },
    { label: 'stale Electronics year claim', pattern: /3\.?º?\s*año\s*cursado|completed coursework through year 3/i },
    { label: 'retired A-M-R project', pattern: /A-M-R(?: Refrigeraci[oó]n|-Refrigeracion)/i },
  ];

  for (const cvFile of cvFiles) {
    const content = await readFile(path.join(root, cvFile), 'utf8');
    for (const repository of expectedCvRepositories) {
      if (!content.includes(repository)) failures.push(`${cvFile} is missing selected CV project repository: ${repository}`);
    }
    for (const rule of staleClaims) {
      if (rule.pattern.test(content)) failures.push(`${cvFile} contains ${rule.label}.`);
    }
  }

  const generator = await readFile(path.join(root, 'scripts/generate-cv-pdf.mjs'), 'utf8');
  for (const output of ['cv-sebastian-ojeda.pdf', 'cv-sebastian-ojeda-en.pdf']) {
    if (!generator.includes(output)) failures.push(`Resume generator is missing output ${output}.`);
  }
}

for (const scanRoot of scanRoots) {
  const files = await collectFiles(scanRoot);
  for (const file of files) {
    const content = await readFile(path.join(root, file), 'utf8');
    validateForbiddenMarkers(file, content);
    validateExternalUrls(file, content);
  }
}

await validateProjectInventory();
await validatePortfolioNarrative();
await validateCvProjectConsistency();

if (failures.length > 0) {
  console.error('Content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Bilingual content validation passed.');

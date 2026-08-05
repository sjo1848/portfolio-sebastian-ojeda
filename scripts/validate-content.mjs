import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanRoots = ['src', 'content/projects', 'content/projects-en', 'public'];
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt']);
const forbidden = [
  { label: 'TODO marker', pattern: /\bTODO\b/i },
  { label: 'TBD marker', pattern: /\bTBD\b/i },
  { label: 'FIXME marker', pattern: /\bFIXME\b/i },
  { label: 'Lorem ipsum', pattern: /lorem ipsum/i },
  { label: 'Example email', pattern: /example@example\.com/i },
  { label: 'Replacement marker', pattern: /\b(?:REPLACE_ME|YOUR_EMAIL|YOUR_LINKEDIN)\b/i },
];

const expectedProjects = ['gasflow', 'hms-elite', 'jm-soluciones'];
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
      if (info.size < 1_500) {
        failures.push(`${directory}/${slug}.md is unexpectedly small (${info.size} bytes)`);
      }
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

async function validateCvProjectConsistency() {
  const projectTitles = [];
  for (const slug of expectedProjects) {
    const content = await readFile(path.join(root, 'content/projects', `${slug}.md`), 'utf8');
    const title = extractFrontMatterValue(content, 'title');
    if (!title) failures.push(`content/projects/${slug}.md does not define a title.`);
    else projectTitles.push(title);
  }

  const cvFiles = [
    'docs/cv/CV_Sebastian_Ojeda_Backend_FullStack.md',
    'docs/cv/CV_Sebastian_Ojeda_Backend_FullStack_EN.md',
    'scripts/generate-cv-pdf.mjs',
  ];

  for (const cvFile of cvFiles) {
    const content = await readFile(path.join(root, cvFile), 'utf8');

    for (const projectTitle of projectTitles) {
      if (!content.includes(projectTitle)) {
        failures.push(`${cvFile} is missing featured project: ${projectTitle}`);
      }
    }

    if (/A-M-R(?: Refrigeraci[oó]n|-Refrigeracion)/i.test(content)) {
      failures.push(`${cvFile} still references the retired A-M-R project.`);
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
await validateCvProjectConsistency();

if (failures.length > 0) {
  console.error('Content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Bilingual content validation passed.');

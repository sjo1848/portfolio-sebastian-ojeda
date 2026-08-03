import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanRoots = ['src', 'content/projects', 'public'];
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.ts', '.txt']);
const forbidden = [
  { label: 'TODO marker', pattern: /\bTODO\b/i },
  { label: 'TBD marker', pattern: /\bTBD\b/i },
  { label: 'FIXME marker', pattern: /\bFIXME\b/i },
  { label: 'Lorem ipsum', pattern: /lorem ipsum/i },
  { label: 'Example email', pattern: /example@example\.com/i },
  { label: 'Replacement marker', pattern: /\b(?:REPLACE_ME|YOUR_EMAIL|YOUR_LINKEDIN)\b/i },
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
    if (match) {
      failures.push(`${file}:${lineNumber(content, match.index)} contains ${rule.label}`);
    }
  }
}

async function validateProjectInventory() {
  const directory = path.join(root, 'content/projects');
  const entries = await readdir(directory);
  const slugs = entries
    .filter((entry) => entry.endsWith('.md'))
    .map((entry) => entry.replace(/\.md$/, ''))
    .sort();

  const expected = ['amr-refrigeracion', 'gasflow', 'hms-elite'];
  if (JSON.stringify(slugs) !== JSON.stringify(expected)) {
    failures.push(`Featured project inventory mismatch. Expected ${expected.join(', ')}; found ${slugs.join(', ')}`);
  }

  for (const slug of expected) {
    const file = path.join(directory, `${slug}.md`);
    const info = await stat(file);
    if (info.size < 500) {
      failures.push(`content/projects/${slug}.md is unexpectedly small (${info.size} bytes)`);
    }
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

if (failures.length > 0) {
  console.error('Content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Content validation passed.');

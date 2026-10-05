import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';

test('#129 Home initial JS stays below both its prior candidate and the hard budget', async ({ page }, info) => {
  test.skip(info.project.name !== 'chromium');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const urls = await page.evaluate(() => [...new Set(performance.getEntriesByType('resource')
    .map((entry) => new URL(entry.name))
    .filter((url) => url.origin === location.origin && url.pathname.endsWith('.js'))
    .map((url) => url.pathname))]);
  const scripts = urls.map((url) => {
    const bytes = fs.readFileSync(`dist${decodeURIComponent(url)}`);
    return { url, gzipBytes: gzipSync(bytes, { level: 9 }).length };
  });
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\bsrc=/.test(match[1] ?? '') && !/type=["']application\/(?:ld\+)?json["']/i.test(match[1] ?? ''))
    .map((match) => gzipSync(Buffer.from(match[2] ?? ''), { level: 9 }).length);
  const total = scripts.reduce((sum, script) => sum + script.gzipBytes, 0) + inline.reduce((sum, value) => sum + value, 0);
  expect(total).toBeLessThan(97_521);
  expect(total).toBeLessThan(100_000);
  fs.mkdirSync('test-results/issue-129-visual-stabilization', { recursive: true });
  fs.writeFileSync('test-results/issue-129-visual-stabilization/home-initial-js-budget.json', JSON.stringify({ scripts, inlineGzipBytes: inline, totalGzipBytes: total, priorCandidateBytes: 97_521, hardLimitBytes: 100_000 }, null, 2));
});

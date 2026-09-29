import fs from 'node:fs';
import path from 'node:path';

const directory = path.dirname(new URL(import.meta.url).pathname);
const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json'), 'utf8'));
const byRoute = new Map();
for (const run of manifest) {
  const url = new URL(run.url);
  const route = url.pathname || '/';
  const report = JSON.parse(fs.readFileSync(run.jsonPath, 'utf8'));
  const record = {
    file: path.basename(run.jsonPath),
    representative: run.isRepresentativeRun,
    performance: run.summary.performance,
    accessibility: run.summary.accessibility,
    bestPractices: run.summary['best-practices'],
    seo: run.summary.seo,
    lcpMs: Math.round(report.audits['largest-contentful-paint'].numericValue),
    cls: report.audits['cumulative-layout-shift'].numericValue,
  };
  if (!byRoute.has(route)) byRoute.set(route, []);
  byRoute.get(route).push(record);
}
const routes = Object.fromEntries([...byRoute.entries()].map(([route, runs]) => [route, {
  runs,
  lowestPerformance: Math.min(...runs.map((run) => run.performance)),
  maxLcpMs: Math.max(...runs.map((run) => run.lcpMs)),
  maxCls: Math.max(...runs.map((run) => run.cls)),
}]));
fs.writeFileSync(path.join(directory, 'summary.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  command: 'npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.issue-108-wave-1.json',
  thresholds: { performance: 0.9, accessibility: 0.95, bestPractices: 0.95, seo: 0.95 },
  routes,
}, null, 2)}\n`);

const referenced = new Set(manifest.flatMap((run) => [path.resolve(run.jsonPath), path.resolve(run.htmlPath)]));
for (const name of fs.readdirSync(directory)) {
  const candidate = path.resolve(directory, name);
  if ((name.endsWith('.report.json') || name.endsWith('.report.html')) && !referenced.has(candidate)) fs.rmSync(candidate);
}

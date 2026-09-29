import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const routes = [
  '/', '/es/',
  '/projects/hms-cloudflare/', '/es/projects/hms-cloudflare/',
  '/projects/alquileres-uspa/', '/es/projects/alquileres-uspa/',
  '/projects/ai-commerce-platform/', '/es/projects/ai-commerce-platform/',
];
const dist = path.resolve('dist');
const assetPath = (url) => path.join(dist, url.replace(/^\//, ''));
const gzipBytes = (url) => zlib.gzipSync(fs.readFileSync(assetPath(url)), { level: 9 }).length;
function dependencyClosure(roots) {
  const seen = new Set();
  function visit(url) {
    if (seen.has(url)) return;
    seen.add(url);
    const source = fs.readFileSync(assetPath(url), 'utf8');
    for (const match of source.matchAll(/(?:from\s*|import\s*)["'](\.?\.?\/[^"']+|\/_astro\/[^"']+)["']/g)) {
      let imported = match[1];
      if (imported.startsWith('.')) {
        imported = '/_astro/' + path.posix.normalize(path.posix.join(path.posix.dirname(url.slice('/_astro/'.length)), imported));
      }
      visit(imported);
    }
  }
  roots.forEach(visit);
  return seen;
}
for (const route of routes) {
  const htmlPath = path.join(dist, route.slice(1), 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const islands = [...html.matchAll(/<astro-island\b[^>]*>/g)].map(([tag]) => ({
    component: tag.match(/component-url="([^"]+)/)?.[1],
    renderer: tag.match(/renderer-url="([^"]+)/)?.[1],
    client: tag.match(/\bclient="([^"]+)/)?.[1],
  })).filter((island) => island.component);
  const roots = [...new Set(islands.filter((island) => island.client !== 'visible').flatMap((island) => [island.component, island.renderer]).filter(Boolean))];
  const initial = dependencyClosure(roots);
  const deferredRoots = [...new Set(islands.filter((island) => island.client === 'visible').map((island) => island.component))];
  const deferred = [...dependencyClosure(deferredRoots)].filter((url) => !initial.has(url));
  const inlineScripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes]) => !attributes.includes('application/ld+json'))
    .reduce((sum, [, , source]) => sum + zlib.gzipSync(source, { level: 9 }).length, 0);
  const sum = (files) => [...files].reduce((total, url) => total + gzipBytes(url), 0);
  console.log(JSON.stringify({
    route,
    initialFiles: initial.size,
    initialGzipBytes: sum(initial) + inlineScripts,
    inlineScriptGzipBytes: inlineScripts,
    visibleDeferredFiles: deferred.length,
    visibleDeferredGzipBytes: sum(deferred),
  }));
}

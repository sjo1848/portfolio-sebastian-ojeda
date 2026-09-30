# Issue #116 — I3 Hero kinetic system

**Gate:** I3 PASS
**Implementation commit:** `8268138ecd32471b68f727b7b2796dd2b4eb7d1a`
**Branch:** `build/issue-116-cplus-baseline`
**Date:** 2026-09-30

## Scope

Implemented M1 only. The three existing hero lines settle into the approved C+ grid with staggered CSS transforms; the copper eyebrow marker reveals as a bounded structural accent. All copy remains present in the initial HTML. No JavaScript, React island, package, claim, copy or interaction was added.

## Validation

| Check | Result |
|---|---|
| `npm ci` | PASS; 349 packages installed, audit reported 0 vulnerabilities; no manifest/lock changes |
| `npm run qa:release` | PASS; Astro check 69 files, 0 errors/warnings/hints; all content, presentation, build, SEO, sitemap and accessibility validators pass |
| `npx playwright test tests/browser/issue-116-i3-hero-motion.spec.ts --project=chromium` | PASS; EN/ES at 360, 390, 430, 768, 1024 and 1440; reduced motion static |
| Home screenshots/browser console | PASS; EN/ES at 390/1440, reduced-motion EN 390; no console/page errors, no horizontal overflow |
| No JavaScript | PASS by implementation structure: CSS-only motion; hero text and anchors remain in static Astro output |
| Initial JS gzip | 94,062 B EN and ES, unchanged from I0; budget 100,000 B |
| `git diff --check` | PASS |

Lighthouse command:

```sh
node /home/sjo1848/.npm/_npx/7c4c7312e9ccc7bf/node_modules/@lhci/cli/src/cli.js autorun --config=artifacts/lighthouse/lighthouserc.issue-116-i3.json
```

The config preserves the I0 thresholds and three-run median aggregation. All category gates passed:

| Route | Performance runs / median | Accessibility | Best Practices | SEO | LCP median | CLS |
|---|---|---:|---:|---:|---:|---:|
| `/` | 0.99, 0.98, 0.99 / **0.99** | 1.00 | 1.00 | 1.00 | 2,050 ms | 0 |
| `/es/` | 0.90, 0.97, 0.96 / **0.96** | 1.00 | 1.00 | 1.00 | 2,044 ms | 0 |

The single lowest run is exactly at the existing 0.90 performance gate; median aggregation passes as specified. Lighthouse is lab data, not field CWV.

## Evidence

- Browser screenshots and geometry/console manifest: [`artifacts/visual/issue-116-i3/`](../../artifacts/visual/issue-116-i3/)
- Raw six Lighthouse reports: [`artifacts/lighthouse/issue-116-i3/`](../../artifacts/lighthouse/issue-116-i3/)
- Reproducible Lighthouse configuration: [`artifacts/lighthouse/lighthouserc.issue-116-i3.json`](../../artifacts/lighthouse/lighthouserc.issue-116-i3.json)
- Targeted browser test: [`tests/browser/issue-116-i3-hero-motion.spec.ts`](../../tests/browser/issue-116-i3-hero-motion.spec.ts)

I3 is complete and pushed before beginning I4. I4 remains a distinct increment/commit; I5 remains authorized by the existing Block C authorization, but I6 remains blocked pending Controller review after I5.

# Issue #113 — I0 visual baseline

**Baseline commit:** `1f08956c93cb70b85f6d81d6c35aeb805630fcd9` (PR #114 merged to `main`)
**Capture date:** 2026-09-29
**Build runtime:** Node 24.18.0, npm 12.0.2, Astro 7.3.5
**Field Core Web Vitals:** `NOT_YET_OBSERVABLE`

## Reproduction

```sh
npm ci
npm run qa:release
npm run preview -- --host 127.0.0.1 --port 4184
BASELINE_COMMIT=$(git rev-parse HEAD) node scripts/capture-issue-113-i0.mjs
node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs
npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.issue-113-i0.json
```

I0 uses eight required ES/EN routes at 360, 390, 430, 768, 1024 and 1440 px. The capture produced 48 full-page route screenshots and 11 viewport screenshots for interaction states and initial Home views. `artifacts/visual/issue-113-i0/manifest.json` records baseline commit, Chromium version, viewport and actual image dimensions, file bytes, SHA-256, console errors, document/viewport widths, document height and observed layout-shift entries. All 48 route captures have no console errors and no horizontal overflow. Maximum observed cumulative shift during the short capture window was 0.0134; Lighthouse reported CLS 0 for the representative run on each route.

Viewport captures: Home EN/ES at 390 px and 1440 px; EN/ES mobile navigation open; HMSC desktop Dialog and mobile Drawer open; mobile Contents Sheet open; desktop active TOC; Alquileres mobile carousel intermediate item. Capture actions wait for the relevant React island to hydrate and assert the requested open/active state before saving; overlays are viewport screenshots rather than full-page snapshots. These are baseline states, not new acceptance claims.

## Performance baseline

### Initial client JavaScript

The existing initial-JS measurement script traverses each hydrated island's imported module graph and gzips its delivered files. The `client:visible` gallery chunks are reported separately.

| Route group | Initial gzip bytes | Budget | Remaining |
|---|---:|---:|---:|
| Home EN / ES | 94,062 B | 100,000 B | 5,938 B |
| HMS / Alquileres case routes | 95,343 B | 150,000 B | 54,657 B |
| AI Commerce case routes | 95,081 B | 150,000 B | 54,919 B |

HMS and Alquileres each have two deferred visible-gallery files (12,553 B and 14,220 B gzip respectively); these are excluded from the initial amount until their island is visible. Home and AI report no visible-deferred files. No budget change is proposed.

### Lighthouse lab results

Run with three Lighthouse executions per route and the existing Release thresholds: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95 and SEO ≥0.95. All 24 assertions passed. Values below are the representative run from the resulting manifest; raw Lighthouse JSON is retained under `artifacts/lighthouse/issue-113-i0/`.

| Route | Performance | A11y | Best practices | SEO | LCP (ms) | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 0.94 | 1.00 | 1.00 | 1.00 | 2,286 | 0 |
| `/es/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,209 | 0 |
| `/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,445 | 0 |
| `/es/projects/hms-cloudflare/` | 0.99 | 1.00 | 1.00 | 1.00 | 1,499 | 0 |
| `/projects/alquileres-uspa/` | 0.97 | 1.00 | 1.00 | 1.00 | 2,501 | 0 |
| `/es/projects/alquileres-uspa/` | 0.97 | 1.00 | 1.00 | 1.00 | 2,426 | 0 |
| `/projects/ai-commerce-platform/` | 0.97 | 1.00 | 1.00 | 1.00 | 1,837 | 0 |
| `/es/projects/ai-commerce-platform/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,819 | 0 |

The lab LCP ceiling in this sample is Alquileres EN at 2.50 s, still within 2.5 s only subject to Lighthouse run variance; the configured Performance gate passed. These results are lab measurements, not field CWV.

## Approved HMSC image provenance

The existing homepage media model selects `/media/projects/hms-cloudflare/cf-i04-reception-cover-authorized.png` (1440×900, 192,190 bytes). Its existing bilingual alt text and caption identify it as a current **local runtime** reception capture generated with Playwright and staging data. It is screenshot evidence of UI state, not remote Product Acceptance or proof of production release. The source and caption remain authoritative for I2; responsive variants must be generated from this source, retain those limits, and set intrinsic dimensions/priority deliberately.

Selected Work currently uses the same HMS cover. I2/I3 must avoid duplicating it as the identical visual: keep reception evidence in the hero and use a distinct already-approved HMSC gallery capture in the lead card, with its own provenance text.

## Browser and baseline gate status

Release QA passed on the baseline. The first post-merge Portfolio CI run `36643437211` reported 511 passed, 203 skipped and one Firefox failure in `HMS Cloudflare es quick scan and narrative link work without JavaScript`; Release readiness `36643437177` passed. The failing assertion timed out waiting for `#problema`. I isolated the no-JS Firefox interaction against the built static page: the link has `href="#problema"` and the browser updates the hash correctly. The requested failed-job rerun completed successfully (`gh run rerun 36643437211 --failed`); it is recorded as a transient test failure followed by a green rerun, not as an unresolved matrix failure.

No content, product behavior, SEO, runtime, dependency, or threshold was changed to gather this baseline.

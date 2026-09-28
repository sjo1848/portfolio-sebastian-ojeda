# Supported Build Toolchain Migration — Increment 0 Baseline

## Provenance and scope

- Initiative: Issue #91, Supported Build Toolchain Migration & Security Closure.
- Phase: BUILD preflight / Increment 0 — baseline only.
- Baseline commit: `43730bfd82ad69b40d9a0507b51e02a4041337a1` (`main`, PR #90 merge).
- Scope: record dependency/security, Node 24 rehearsal, static output, browser, Lighthouse, bundle, SEO and React-island baselines before changing runtime or Astro.
- Out of scope: product source, dependencies, lockfile, workflow, content, design, canonical/SEO settings, behavior.
- No implementation changes were made during this increment.

## Runtime and dependency snapshot

The exact supported Node 24 LTS distribution was downloaded from the official Node archive and its published SHA256 verified before use:

| Runtime | Version |
| --- | --- |
| Node | 24.21.0 LTS |
| npm bundled with Node | 11.19.0 |
| OS | Linux x64 |

Baseline lock resolutions: Astro 5.18.2; `@astrojs/react` 4.4.2; `@astrojs/sitemap` 3.7.3; Tailwind and `@tailwindcss/vite` 4.3.3; React/React DOM 19.3.0; Base UI 1.8.0; Playwright 1.63.0; TypeScript 5.9.3.

`npm ci` on Node 24.21.0/npm 11.19.0 passed (433 packages). It reports 8 vulnerabilities: 1 low, 1 moderate, 5 high, 1 critical. Npm 11.19 warns that install scripts for esbuild 0.27.7, sharp 0.34.5, and nested esbuild 0.25.12 are not yet covered by `allowScripts`. No install scripts were approved or suppressed. The platform-provided optional binaries were present, and the release build/check completed successfully with this clean install; this confirms the current Linux build path does not require broad script permission. Keep this warning visible and reassess if platform changes require an install script.

Raw baseline evidence (from npm 11.19.0):

- [`npm-audit.json`](../../artifacts/dependencies/supported-build-toolchain-increment-0/npm-audit.json) — `npm audit --json`, exit 1 because findings are present.
- [`npm-outdated.json`](../../artifacts/dependencies/supported-build-toolchain-increment-0/npm-outdated.json) — `npm outdated --json`, exit 1 because newer releases exist.
- [`npm-tree.json`](../../artifacts/dependencies/supported-build-toolchain-increment-0/npm-tree.json) — full `npm ls --all --json` lock resolution.
- Full advisory paths, applicability and remediation analysis are in [Issue #89 discovery](../discovery/issue-89-portfolio-quality-conversion.md#2-dependencysecurity-matrix).

No `npm audit fix`, `npm audit fix --force`, upgrades, or lockfile changes were run.

## Node 24 compatibility rehearsal

With the exact Node 24.21.0 LTS distribution and its bundled npm 11.19.0:

- `npm ci`: PASS (install-script policy warnings documented above).
- `npm run qa:release`: PASS; Astro check covered 54 files with 0 errors, warnings or hints; static output generated 22 pages; content, presentation, media, social metadata, SEO/structured data, UX/accessibility, sitemap and build validators passed.
- Node 24 is within Astro 5.18.2 / `@astrojs/react` 4.4.2 and Playwright 1.63.0 engine ranges. Separate read-only package metadata and official migration-guide review found Node 24 also meets Astro 6/7 minimum Node 22.12 requirements.
- This is a local compatibility rehearsal, not yet GitHub Actions evidence. Increment 1 changes workflows to the same exact Node release, then verifies the hosted CI runs.

## Release QA and route snapshot

`npm run qa:release` on the clean baseline passed. Static build output:

- 22 HTML pages, including 2 homes and 18 project routes.
- 20 canonical sitemap page URLs.
- English-first canonical identity: `https://sebastian-ojeda.pages.dev`.
- Canonical/alternate `hreflang`, Open Graph, Person and SoftwareSourceCode JSON-LD, robots and sitemap validators all passed.
- No SEO/content/URL configuration was changed.

## Browser, interaction and accessibility baseline

Command: `npm run test:browser` (`playwright test`).

- **344 passed, 171 intentional profile skips, 0 failed** (515 total).
- Profiles: Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit.
- Exercised the repository route/viewport contract including 360, 390, 430, 768, 1024 and 1440 px where the profile applies; ES/EN, axe, keyboard/focus, reduced motion, copy, mobile navigation, gallery/viewer, GIF fallbacks, native anchors and no-hydration fallbacks remained green.
- Console/page errors and hydration regressions: no failures reported by the suite.
- Existing visual-state screenshots remain the release reference under `artifacts/visual/frontend-excellence/`; test-generated tracked snapshots were restored after the run so this baseline does not alter the existing evidence.

## Lighthouse baseline

Command: `npx --yes @lhci/cli@0.15.1 autorun --config=/tmp/issue91-lhci.json`. The temporary config copied the repository I6 configuration without changing it, used the just-built `dist`, and wrote reports into the new Increment 0 evidence directory. The existing thresholds were unchanged: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95.

LHCI assertion command passed for 6 URLs / 18 runs. The existing config aggregates 3 runs per URL; one Alquileres ES run scored 0.66 Performance but the per-route median was 0.97. The isolated outlier is retained in the raw reports; it was not hidden and does not change thresholds.

| Route | Median Performance | Accessibility | Best Practices | SEO | Lab LCP range | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,125–2,134 ms | 0.000 |
| `/es/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,611–2,203 ms | 0.000 |
| `/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,467–1,672 ms | 0.000 |
| `/es/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,463–1,775 ms | 0.000 |
| `/projects/alquileres-uspa/` | 0.98 | 1.00 | 1.00 | 1.00 | 2,420–2,811 ms | 0.000 |
| `/es/projects/alquileres-uspa/` | 0.97 | 1.00 | 1.00 | 1.00 | 2,127–2,813 ms | 0.000 |

Fresh traces identify the same LCP node already found in Issue #89: the static case-hero `p.hero-copy` summary text, not a gallery image. Lab LCP is not field Core Web Vitals; field CWV remains `NOT_YET_OBSERVABLE`.

All raw Lighthouse JSON/HTML reports and the manifest are under [`artifacts/lighthouse/toolchain-migration-increment-0/`](../../artifacts/lighthouse/toolchain-migration-increment-0/).

## Bundle / JavaScript baseline

Existing reproducible measurements from I6 are confirmed by the current lock output sizes:

- Home initial client JS estimate: **95,974 B gzip** against the 100,000 B soft budget; headroom **4,026 B**.
- Case-study initial client JS estimate: **96,885 B gzip** against the 150,000 B budget.
- Shared React renderer output: 211,366 B raw / 66,060 B gzip; shared CSS: 52,876 B raw / 11,069 B gzip. These are shared or deferred chunks and should not be confused with whole-page initial JS.
- Astro island ownership remains selective: MobileNavigation `client:load`, CopyAction `client:idle`, CaseStudyContents `client:idle`, EvidenceGallery/ResponsiveMediaViewer visible/deferred. No full-page hydration.
- Baseline bundle delta is 0 B because this increment changes no product source.

## Migration readiness / exact boundaries

- Node 24.21.0 is the chosen exact LTS patch for Increment 1. Cloudflare Pages recognizes `.nvmrc`; CI will pin the same exact version. No `.nvmrc` existed at baseline.
- Astro 6 is the next separate framework increment; Astro 7 follows only after Astro 6 PASS. Current Content Layer config already uses `src/content.config.ts`, `astro/loaders`, and `astro/zod`.
- Keep Tailwind 4 Vite plugin, React 19, Base UI, sitemap, static Astro routing and the current React-island UX unless the staged build exposes a concrete compatibility requirement.
- No migration-related release or product risk currently requires a Human Gate. Ordinary toolchain/validator failures will be handled as bounded REWORK.

## Increment 0 gate

- Clean install and baseline dependencies recorded: PASS.
- Node 24.21.0 local release QA rehearsal: PASS.
- Full browser baseline: PASS.
- Lighthouse thresholds and baseline recorded: PASS.
- Canonical/static/SEO snapshot: PASS.
- Bundle and route-island baseline recorded: PASS.
- Independent Critic: **PASS**.
- Integration Review: **REWORK** — requested a Node 24 CI rehearsal artifact before Increment 0 can close. The local Node 24.21.0/npm 11.19.0 rehearsal passed; the required hosted CI proof will be produced by Increment 1, then this baseline gate will be revalidated.

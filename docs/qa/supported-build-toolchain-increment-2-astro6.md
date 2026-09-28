# Supported Build Toolchain — Increment 2: Astro 6

## Contract and scope

- Issue: #91, Supported Build Toolchain Migration & Security Closure.
- Phase: BUILD / VALIDATE — Increment 2, Astro 5 → Astro 6.
- Starting release baseline: `main` after Increment 1, Node `24.21.0`, Astro `5.18.2`, `@astrojs/react` `4.4.2`.
- Objective: move to the supported Astro 6/Vite 7 line while preserving static Astro output, selective React islands, current content, UX, SEO, canonical host, and the existing performance/accessibility budgets.
- Out of scope: Astro 7/security closure (Increment 3), unrelated dependencies, product behavior, content, visual design, and runtime/workflow changes.

## Migration decision and changes

Pinned `astro` `6.4.8` and `@astrojs/react` `5.0.7` in `package.json` and the lockfile. These are the latest stable Astro 6 patch and the compatible React integration 5 patch at execution time. Node `24.21.0` meets the Astro 6/integration engine requirement (`>=22.12.0`); React 19.3.0 is inside the integration peer range. Astro 6 uses Vite 7.3.6; Tailwind's existing Vite plugin 4.3.3 supports Vite 7. The sitemap integration, check integration, Tailwind, React, Base UI and TypeScript were not explicitly upgraded.

Astro 6's Zod 4 surfaced two deprecated `.url()` method hints in the existing content schema. Replaced those calls with the equivalent Zod 4 `z.url()` API in `src/content.config.ts`; content shape, source data, and published output remain unchanged. After the change `astro check` reports 54 files, zero errors, zero warnings, and zero hints.

The repository already used Astro Content Layer collections and `astro/zod`; no legacy collections, `Astro.glob()`, custom Vite hooks, adapters, or Shiki-specific project APIs required migration. No `@astrojs/upgrade` bulk update was run.

### Exact resolved versions

| Package/runtime | Before | Increment 2 |
| --- | --- | --- |
| Node / npm | 24.21.0 / 11.19.0 | 24.21.0 / 11.19.0 |
| Astro | 5.18.2 | 6.4.8 |
| `@astrojs/react` | 4.4.2 | 5.0.7 |
| Vite (transitive) | 6.x | 7.3.6 |
| `@astrojs/sitemap` | 3.7.3 | 3.7.3 |
| `@astrojs/check` | 0.9.10 | 0.9.10 |
| Tailwind / Vite plugin | 4.3.3 / 4.3.3 | 4.3.3 / 4.3.3 |
| React / React DOM | 19.3.0 / 19.3.0 | 19.3.0 / 19.3.0 |
| TypeScript | 5.9.3 | 5.9.3 |

## Validation

- Node 24.21.0 / npm 11.19.0 `npm ci --no-audit --no-fund`: PASS (417 packages). npm reported its existing `allowScripts` notices for esbuild and Sharp; no install scripts were approved or disabled.
- `npm run qa:release`: PASS. Content/presentation validators, Astro check, static build, media/social metadata, structured data, accessibility, UX, sitemap and build validation passed. Build generated the same 22 HTML pages and 20 canonical sitemap URLs.
- `npm run test:browser`: **344 passed, 171 expected profile skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. The suite covers routes/widths, keyboard/focus, axe, reduced motion, islands/hydration fallback, dialogs, galleries, and GIF behavior. No browser console/page errors or hydration regressions were reported. Screenshot changes to pre-existing Frontend Excellence references were restored; this increment's captures are saved separately.
- `npm audit --json`: 7 findings at the intentionally intermediate Astro 6 step: 1 critical, 4 high, 1 moderate, 1 low. The Astro AVIF critical advisory remains open in Astro 6 and is explicitly scheduled for the next staged Astro 7 security-floor increment. Other remaining findings are captured in raw JSON. This is not the release candidate and no untrusted AVIF/HEIF inputs were introduced into the build. No applicable critical/high finding may remain at final release without the contract's accepted evidence.
- Lighthouse: 18 reports for six priority routes, with existing Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95 and SEO ≥0.95 thresholds unchanged. `lhci assert` passed. All route medians met thresholds; Accessibility, Best Practices and SEO each scored 1.00 on all runs; CLS was 0 on all runs. Lab LCP ranges are recorded below; field CWV remains `NOT_YET_OBSERVABLE`.

| Route | Performance range (median) | Lab LCP range | TBT range | CLS |
| --- | ---: | ---: | ---: | ---: |
| `/` | 0.98–0.99 (0.98) | 2,198–2,367 ms | 18–44 ms | 0 |
| `/es/` | 0.98–0.99 (0.98) | 2,051–2,284 ms | 41–110 ms | 0 |
| `/projects/hms-cloudflare/` | 0.95–1.00 (0.96) | 1,444–1,456 ms | 36–256 ms | 0 |
| `/es/projects/hms-cloudflare/` | 0.99–1.00 (1.00) | 1,477–1,662 ms | 53–84 ms | 0 |
| `/projects/alquileres-uspa/` | 0.95–0.96 (0.96) | 2,721–2,863 ms | 32–87 ms | 0 |
| `/es/projects/alquileres-uspa/` | 0.92–0.99 (0.93) | 2,118–2,948 ms | 81–290 ms | 0 |

LCP is a Lighthouse lab metric only. Alquileres routes can exceed the 2.5 s field target in lab runs, consistent with the prior baseline; this increment changed no image, content, or performance settings, and does not claim a field CWV pass.

## JavaScript budget comparison

Measurement reuses the Increment 6 approach: gzip each island/renderer dependency chunk and inline executable script independently at zlib level 9; follow static chunk imports; exclude JSON-LD; exclude `client:visible` chunks from initial JavaScript and report those as deferred. The executable measurement is [`measure-island-js.mjs`](../../artifacts/dependencies/supported-build-toolchain-increment-2-astro6/measure-island-js.mjs).

| Route group | Increment 0 baseline | Increment 2 | Delta | Budget |
| --- | ---: | ---: | ---: | ---: |
| Home EN/ES initial JS | 95,974 B | 96,638 B | +664 B | 100,000 B soft |
| Case study EN/ES initial JS | 96,885 B | 97,942 B | +1,057 B | 150,000 B |
| HMS visible media viewer chunk | 13,199 B | 13,213 B | +14 B | deferred |
| Alquileres visible gallery chunk | — | 15,001 B | measured | deferred |

Home remains under budget with 3,362 B headroom. No new hydration roots, state stores, or client router were introduced. The baseline estimate is from the accepted Increment 0/I6 artifact; all deferred gallery/viewer chunks remain outside initial JS.

## Evidence

- Baseline snapshot and CI Node 24 rehearsal: [`Increment 0 report`](./supported-build-toolchain-increment-0-baseline.md).
- Raw `npm audit --json`, `npm outdated --json`, and `npm ls --all --json`: [`Increment 2 dependency artifacts`](../../artifacts/dependencies/supported-build-toolchain-increment-2-astro6/).
- Lighthouse reports and the exact six-route configuration: [`Increment 2 Lighthouse artifacts`](../../artifacts/lighthouse/supported-build-toolchain-increment-2-astro6/).
- Viewer, gallery, fallback, and copy state captures: [`Increment 2 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-2-astro6/).
- Full responsive/accessibility/browser evidence is also uploaded by the PR CI workflow.

## Risks / remaining work

- Astro 6 has one critical advisory (AVIF/Sharp) and several other audit findings. Keep this step unreleased and finish Astro 7 and residual dependency closure before release.
- `.nvmrc` and CI now select Node 24.21.0; Cloudflare production verification remains part of Increment 6 after all security fixes merge.
- Lighthouse Alquileres LCP variability is lab-only and no CWV field data exists.
- No changes to canonical host, routes, SEO output, visible content, branding, or interaction architecture were observed by the release validators.

## Independent gates

- Independent Critic: **pending**.
- Integration Review: **pending**.

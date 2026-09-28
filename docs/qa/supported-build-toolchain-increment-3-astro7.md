# Supported Build Toolchain — Increment 3: Astro 7

## Contract and scope

- Issue: #91, Supported Build Toolchain Migration & Security Closure.
- Phase: BUILD / VALIDATE — Increment 3, Astro 6 → Astro 7 and Astro's security floor.
- Starting release baseline: Increment 2 on Node `24.21.0`, Astro `6.4.8`, and `@astrojs/react` `5.0.7`.
- Objective: complete the approved staged Astro 5 → 6 → 7 migration and resolve the Astro-specific critical/high advisories while preserving static Astro output, selective React islands, current UX/content/SEO, canonical host, and existing quality thresholds.
- Out of scope: closure of unrelated residual dependency advisories (Increment 4), product changes, content, public runtime, workflows, and visual redesign.

## Migration decision and changes

Pinned `astro` `7.3.5` and `@astrojs/react` `6.0.6` exactly. The supported stack resolves Vite `8.3.1` and retains Node `24.21.0` / npm `11.19.0`, Tailwind `4.3.3`, React/React DOM `19.3.0`, Base UI `1.8.0`, TypeScript `5.9.3`, and sitemap `3.7.3`. Astro resolves Sharp `0.35.5`, above the Astro 7 minimum security floor `0.35.4`.

No source, content, visual, SEO, routing, interaction, or runtime configuration changes were needed. Astro check and static generation pass unchanged. This step continues the existing Astro-first architecture; it adds no client roots, router, store, or dependency outside the approved Astro integration upgrade.

## Exact resolved versions

| Package/runtime | Increment 2 | Increment 3 |
| --- | --- | --- |
| Node / npm | 24.21.0 / 11.19.0 | 24.21.0 / 11.19.0 |
| Astro | 6.4.8 | 7.3.5 |
| `@astrojs/react` | 5.0.7 | 6.0.6 |
| Vite | 7.3.6 | 8.3.1 |
| Sharp | 0.33.x | 0.35.5 |
| Tailwind / Vite plugin | 4.3.3 / 4.3.3 | 4.3.3 / 4.3.3 |
| React / React DOM | 19.3.0 / 19.3.0 | 19.3.0 / 19.3.0 |
| TypeScript | 5.9.3 | 5.9.3 |

## Validation

- Node `24.21.0` / npm `11.19.0` clean `npm ci`: PASS.
- `npm run qa:release`: PASS. Astro check reports 55 files, zero errors, zero warnings, zero hints; static output is 22 HTML pages and the existing 20 sitemap URLs. Content, presentation, media, social metadata, structured data, UX/accessibility, sitemap, and build validators pass.
- `npm run test:browser`: **344 passed, 171 expected profile skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. The 360/390/430/768/1024/1440 responsive matrix, six priority routes, keyboard/focus, axe, reduced motion, dialogs, galleries/GIF, no-JS fallback, and hydration failure paths passed. No page/console errors or hydration regressions were observed.
- The repo's Playwright harness initially exited early because Astro 7 auto-backgrounds the preview server when it detects an agent environment. Setting `ASTRO_PREVIEW_BACKGROUND=0` for the test process disables only this harness behavior; the same required browser suite then ran to completion. This is test-server orchestration, not a production code workaround.
- Lighthouse: 18 reports, three runs on each of six priority routes. `lhci assert` PASS; no threshold/config change. Every route passed Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Accessibility, Best Practices, and SEO scored 1.00 for every run; CLS was 0 for every run. Field CWV remains `NOT_YET_OBSERVABLE`.

| Route | Performance min / median / max | Lab LCP min / median / max (ms) | CLS |
| --- | ---: | ---: | ---: |
| `/` | 0.95 / 0.97 / 0.98 | 2,062 / 2,207 / 2,215 | 0 |
| `/es/` | 0.91 / 0.92 / 0.98 | 2,210 / 2,219 / 2,294 | 0 |
| `/projects/hms-cloudflare/` | 0.96 / 0.97 / 0.99 | 1,492 / 1,502 / 1,846 | 0 |
| `/es/projects/hms-cloudflare/` | 0.99 / 0.99 / 0.99 | 1,513 / 1,649 / 1,836 | 0 |
| `/projects/alquileres-uspa/` | 0.96 / 0.97 / 0.97 | 2,416 / 2,417 / 2,786 | 0 |
| `/es/projects/alquileres-uspa/` | 0.97 / 0.98 / 0.99 | 2,130 / 2,130 / 2,419 | 0 |

Alquileres LCP still has a Lighthouse lab run above the 2.5 s field target in English; this is variable lab data, not field CWV. No image or content optimization was introduced in this migration increment.

## JavaScript budget comparison

The existing island-aware gzip measurement follows statically imported client chunks, counts executable inline scripts, excludes JSON-LD, and reports `client:visible` chunks separately from initial JS.

| Route group | Increment 0 baseline | Increment 2 | Increment 3 | Delta vs baseline | Budget |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home EN/ES initial JS | 95,974 B | 96,638 B | 94,062 B | −1,912 B | 100,000 B soft |
| Case study EN/ES initial JS | 96,885 B | 97,942 B | 95,343 B | −1,542 B | 150,000 B |
| HMS visible viewer JS | — | 13,213 B | 12,553 B | deferred | deferred |
| Alquileres visible gallery JS | — | 15,001 B | 14,220 B | deferred | deferred |

The Home remains 5,938 B below its soft budget. No hydration roots were added. Measurements are in [`island-js-measurements.jsonl`](../../artifacts/dependencies/supported-build-toolchain-increment-3-astro7/island-js-measurements.jsonl).

## Security disposition

The intermediate Astro 6 audit had seven findings including one critical. Astro 7 and the supported Sharp floor close the Astro-specific critical AVIF/Sharp advisory. After migration, `npm audit --json` reports **2 findings: 0 critical, 1 high, 1 moderate**. The remaining findings are `fast-uri` (`3.0.0–3.1.5`, high; fixed `3.1.6`) and `devalue` (`<5.9.1`, moderate; fixed `5.9.1`). They are transitive and explicitly reserved for Increment 4; no `npm audit fix`, forced update, override, or unrelated dependency upgrade was used. A true pre-migration audit is preserved as [`npm-audit-before-astro7.json`](../../artifacts/dependencies/supported-build-toolchain-increment-3-astro7/npm-audit-before-astro7.json) (copied from the accepted Increment 2 Astro 6 audit); the post-migration audit is [`npm-audit-after-astro7.json`](../../artifacts/dependencies/supported-build-toolchain-increment-3-astro7/npm-audit-after-astro7.json). Only post-migration `npm outdated` and lock-tree snapshots are retained; no before/after comparison is claimed for them.

`npm ls --all --package-lock-only --json` exits successfully and the lock dependency graph is coherent. The installed-tree `npm ls --all` reports a platform-optional `lightningcss` musl binary version mismatch: the current host is glibc and npm omits the nested optional binary, while Tailwind's root copy is present. `npm ci`, static builds, browser tests, and hosted release gates pass; the mismatch is an npm installed-tree diagnostic for an uninstalled non-host binary, not a runtime dependency or lockfile override target. Full output is retained for review.

## Evidence

- Dependency graph, raw audits, outdated report, resolved lock graph, and JS measurements: [`Increment 3 dependency artifacts`](../../artifacts/dependencies/supported-build-toolchain-increment-3-astro7/).
- Exact six-route Lighthouse config and 18 JSON/HTML reports: [`Increment 3 Lighthouse evidence`](../../artifacts/lighthouse/supported-build-toolchain-increment-3-astro7/).
- Browser regression screenshots: [`Increment 3 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-3-astro7/).
- Browser/CI workflows also retain hosted matrix, axe, visual review, and log evidence on the Increment 3 PR.

## Remaining work / gate

- Increment 4 must close the remaining high and moderate transitive advisories through supported, path-specific updates, then re-run install, full release QA, browser matrix, Lighthouse, bundle, and audit.
- This increment is not a RELEASE authorization. Production deployment verification remains Increment 6 after all security closure and final independent gates.
- No changes to canonical host, public content, SEO output, design system, recruiter hierarchy, or approved UX were observed or requested.

## Independent gates

- Independent Critic: **PASS** — after a bounded evidence REWORK, independently confirmed the pre/post audit hashes and severities (7 Astro 6 findings → 2 Astro 7 residuals), report links/snapshot claims, migration scope, compatibility, unchanged Lighthouse floors, JS calculations, and security disposition. No further REWORK or HUMAN_GATE.
- Integration Review: **PASS** — independently verified scope/product boundaries, Astro/React compatibility, 22-page static output, 20 sitemap URLs, browser results, Lighthouse metrics, JS measurements, audit disposition, and the disclosed optional musl installed-tree diagnostic. No production-path impact or HUMAN_GATE was found; the remaining high/moderate advisories must close in Increment 4 before RELEASE.

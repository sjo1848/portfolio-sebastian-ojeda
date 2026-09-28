# Supported Build Toolchain — Increment 4: Residual Dependency Security

## Contract and scope

- Issue: #91, Supported Build Toolchain Migration & Security Closure.
- Phase: BUILD / VALIDATE — Increment 4, closure of residual `fast-uri` and `devalue` advisories after Astro 7.
- Starting baseline: main after PR #95, commit `6f99abfcfd65ed924aca52075797a5c02c6ec50b`, Node `24.21.0`, Astro `7.3.5`, `@astrojs/react` `6.0.6`.
- Objective: close all remaining npm audit findings with targeted supported transitive updates, preserving the public product and toolchain chosen in Increments 1–3.
- Out of scope: direct dependency or architecture changes, product/content/SEO/UX/runtime changes, and any broad or forced update.

## Security closure

The two remaining advisories after Astro 7 were resolved through the in-range dependency update command `npm update devalue fast-uri`. This changed only two `package-lock.json` package entries. `package.json` is unchanged; no audit fix, force flag, override, major upgrade, or unrelated update was used.

| Package | Before | Dependency path / exposure | Advisory floor | After | Result |
| --- | --- | --- | --- | --- | --- |
| `devalue` | 5.9.0 | `astro@7.3.5` and `@astrojs/react@6.0.6`; Astro/React build and serialization dependency | 5.9.1 (GHSA-9rgm-9g3h-6x36) | 5.9.4 | Moderate advisory closed |
| `fast-uri` | 3.1.5 | `@astrojs/check` → language server → YAML service → `yaml-language-server` → `ajv`; development/build tooling only | 3.1.6 for four GHSA advisories | 3.1.8 | High advisories closed |

The resolved paths remain within each parent's declared semver range. The complete npm explain output and package tree are retained in [`dependency evidence`](../../artifacts/dependencies/supported-build-toolchain-increment-4-security/).

## Validation

- Node `24.21.0` / npm `11.19.0` clean `npm ci`: PASS; 349 packages installed, 0 vulnerabilities. npm retained the existing unapproved-install-script notice for `esbuild`; build and QA succeeded without approving additional scripts.
- `npm audit --json`: **0 vulnerabilities**. Raw before/after audit results are included with the report. Before: 2 findings (1 high, 1 moderate). After: 0 across all severities.
- `npm run qa:release`: PASS. Astro check reports 55 files with 0 errors/warnings/hints; generated 22 HTML pages and the existing 20 sitemap URLs; content, presentation, assets, social metadata, SEO, UX/accessibility, sitemap and build validators all pass.
- Initial local full browser matrix: 341 passed, 171 expected profile skips, 3 failures out of 515. The failures were browser scheduling timeouts in the Firefox Alquileres gallery assertion and Mobile WebKit Contents Sheet/nav focus assertions while the 4-worker, five-project matrix ran; no package security/runtime errors or console errors were reported. Each of those exact tests passed when rerun alone with one worker and no retries: Firefox gallery at 360 px (1/1); Mobile WebKit Spanish navigation (1/1); Mobile WebKit Contents Sheet across all widths (1/1). Hosted full regression must pass in this increment's PR and Increment 5 before the suite is recorded as fully PASS.
- Bundle measurement after the dependency updates is unchanged from I3: Home initial JS 94,062 B; case-study initial JS 95,343 B; the visible viewer/gallery chunks remain deferred at 12,553 B / 14,220 B. No UI/source files or public output configuration changed.
- Lighthouse budgets: deferred to Increment 5's full release-candidate run. I3 already passed all 18 six-route reports; this lock-only patch introduces no new runtime roots. Existing thresholds remain unchanged.

## Regression / screenshots

The exact UI and visual system are unchanged. The latest full route/width and interaction-state screenshot evidence remains [`Increment 3 Astro 7 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-3-astro7/); its tree included gallery, dialog, fallback, home/case-study and responsive state images. Browser workflow artifacts for this security patch are expected from hosted PR validation. No screenshots were overwritten in the repository by the local test run.

## Risks / remaining work

- The first local browser run had three timeout/focus flakes under full concurrent browser load; all three exact cases passed isolated and the PR's hosted full matrix remains a required acceptance gate. Do not lower test assertions or accessibility/performance thresholds to hide this.
- Increment 5 must repeat the complete browser matrix, responsive and accessibility gates, Lighthouse floors, JS budget, console/hydration checks, audit, and static SEO/canonical checks before RELEASE candidacy.
- This increment is not RELEASE authorization. Production deployment verification remains Increment 6.
- No changes to portfolio content, CV, LinkedIn, canonical host, design, UX, architecture, or product behavior were made.

## Independent gates

- Independent Critic: **PASS** — independently verified the six-line lockfile patch updates only the two in-range transitive packages, raw/executed audit zero, dependency paths, report/evidence and hosted full browser/Lighthouse results. The three local concurrency failures passed isolated and did not reproduce in the full hosted matrix. No rework or HUMAN_GATE.
- Integration Review: **PASS** — independently verified only the two in-range transitive package patches, audit 0, Node 24 install and release QA, hosted dual browser matrices (344 pass / 171 expected skips / 0 failures), Lighthouse assertions, Release Readiness, Visual Review and secret scanning. The isolated/local scheduling timeout discrepancy is disclosed and cleared by both hosted runs; bundle delta is zero. No rework or HUMAN_GATE.

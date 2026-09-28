# Frontend Excellence — Increment 6

## Provenance and scope

- Phase: BUILD / VALIDATE — Increment 6, full portfolio hardening.
- Execution issue: #78. Branch: `build/frontend-excellence-i6`.
- Candidate base: I5 merge `1526fbddc967b0931999816a123897c69482197c`.
- Scope: harden CopyAction focus and contrast, run the complete bilingual route/browser/viewport matrix, measure bundle and Lighthouse budgets, inspect the deployed portfolio, and record release readiness.
- Out of scope: architecture, branding, content, project IA, analytics/RUM, dependency changes, and new interaction scope.
- Field Core Web Vitals remain `NOT_YET_OBSERVABLE`; no RUM was added.

## Bounded rework discovered in hardening

- Accessibility review found the contact-panel button focus ring used `--focus: #0e6870`, with only 2.37:1 contrast against the darkest panel token. `#contact button:focus-visible` now uses `--copper-light`. Measured ring contrast is 7.31:1 and 6.16:1 against the panel background endpoints.
- Keyboard testing found the copy button lost focus while its clipboard promise was pending because the native `disabled` state removed it from focus. The button now uses `aria-disabled` while pending, remains focused, and guards duplicate activation synchronously with a component-local ref.
- Added ES/EN keyboard regressions for pending-to-success and pending-to-error, plus focus-state screenshots at 390 px.
- Frontend review found the legacy API could be attempted twice if it was unavailable and then returned failure. The fallback now runs once per activation; new tests count attempts in ES/EN.
- Playwright's default config now refuses to silently reuse an unrelated local preview process. This prevents stale-server false positives while preserving the same six-project matrix.

## Routes and matrix

Priority routes:

- `/`, `/es/`
- `/projects/hms-cloudflare/`, `/es/projects/hms-cloudflare/`
- `/projects/alquileres-uspa/`, `/es/projects/alquileres-uspa/`

Browser profiles: Chromium, Firefox, WebKit, Mobile Chromium, Mobile WebKit. Responsive widths: 360, 390, 430, 768, 1024, 1440 px. Exact final results and the CI run URL are recorded after validation completes.

## Validation

- `npm ci`: PASS from lockfile.
- `npm run qa:release`: PASS after final product source (54 Astro files, 0 errors/warnings/hints; 22 static pages; content, presentation, assets, SEO, UX/accessibility, build and sitemap validators pass).
- Full Playwright matrix on the pre-fallback-fix candidate: 334 passed, 171 expected skips, 0 failed. The final single-fallback correction passed **10/10** focused ES/EN cases across the five browser profiles. Final PR CI matrix: **344 passed, 171 expected skips, 0 failed**; `npm run test:browser` is the reproducible repository command. Both Release QA/Lighthouse runs and the responsive evidence run passed on [PR #88](https://github.com/sjo1848/portfolio-sebastian-ojeda/pull/88) (runs [36361495747](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36361495747), [36361521510](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36361521510), and [36361521507](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36361521507)).
- Accessibility-focused browser review: PASS. Six focused browser checks passed in isolated Chromium: Axe WCAG 2.2 AA in ES/EN for idle/copied/error and keyboard focus pending→success/failure in ES/EN. The computed 3 px copper ring contrast is 7.31:1 and 6.16:1 against the contact-panel background endpoints.
- Lighthouse across all six priority routes: PASS. `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.frontend-excellence-increment-6.json` completed 18 runs and passed all unchanged floors (Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95). Representative scores and lab LCP ranges:

| Route | Performance | Accessibility | Best Practices | SEO | Lab LCP range | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.98–1.00 | 1.00 | 1.00 | 1.00 | 1,896–2,170 ms | 0.000 |
| `/es/` | 0.98–0.99 | 1.00 | 1.00 | 1.00 | 2,036–2,217 ms | 0.000 |
| `/projects/hms-cloudflare/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,595–1,666 ms | 0.000 |
| `/es/projects/hms-cloudflare/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,480–1,669 ms | 0.000 |
| `/projects/alquileres-uspa/` | 0.93–0.97 | 1.00 | 1.00 | 1.00 | 2,433–2,873 ms | 0.000 |
| `/es/projects/alquileres-uspa/` | 0.93–0.94 | 1.00 | 1.00 | 1.00 | 2,429–2,588 ms | 0.000 |

All 18 full JSON Lighthouse reports and the manifest are persisted under [`artifacts/lighthouse/frontend-excellence-increment-6`](../../artifacts/lighthouse/frontend-excellence-increment-6/). Lab LCP above 2.5 seconds was observed in one Alquileres ES run; Lighthouse performance still passed. These lab values do not establish field CWV.
- The responsive matrix checked browser console/page errors at each route/width and passed with none. Interaction tests across all five profiles also passed; Axe state audits ran in desktop Chromium.

## Bundle

- I5 Home initial client-JS estimate: about 95,950 B gzip against the 100 KB target.
- Current `CopyAction` chunk: 1,383 B raw / 772 B gzip by Node zlib level 9; the I5 release artifact is 1,384 B / 748 B with the same method. Exact change: −1 B raw / +24 B gzip. Using the I5 Home estimate (95,950 B), the current estimate is 95,974 B gzip (about 95.97 kB), below the 100 KB target. Case-study initial JS remains at 96,885 B gzip, below the 150 KB target.
- Using the same `zlib.gzipSync(..., { level: 9 })` measurement on the post-I5 release artifact and I6 build, shared CSS is 52,876 B / 11,069 B gzip (I5: 52,801 B / 11,058 B); the focused rule adds 75 raw / 11 gzip bytes. The Home route stylesheet remains 4,475 B / 1,152 B gzip, so linked Home CSS totals 57,351 B / 12,221 B gzip.
- Gallery/viewer chunks remain deferred.
- Focus-state screenshots are in [`artifacts/visual/frontend-excellence/increment-6`](../../artifacts/visual/frontend-excellence/increment-6/).

## Bounded RELEASE rework — canonical hostname

### Task contract

- **Purpose:** apply the Product Owner's resolved Option B decision so the public production identity is consistent across configuration, release workflows, documentation, and generated metadata.
- **Scope:** replace the superseded production hostname in Astro, CI/release configuration, URL wrapper, README, and runbook; validate generated SEO/sitemap/robots/social metadata and deployed behavior.
- **Out of scope:** branding, UX, React architecture, product behavior, professional content, redirects, and assumptions about aliases.
- **Inputs:** Product Owner decision in Issue #78 comment `HUMAN_GATE RESOLVED — Canonical production hostname`; approved I6 candidate PR #88.
- **Acceptance:** `https://sebastian-ojeda.pages.dev` is the only configured production identity; generated canonical/social/sitemap/robots surfaces agree; all six priority routes return HTTP 200; all existing release/browser/performance gates pass.
- **Evidence:** `npm ci`, `npm run qa:release`, full browser matrix, unchanged Lighthouse gates, built metadata checks, deployed HTTP checks, and independent release/integration reviews.
- **Risk:** if the live hostname's deployed build is not produced from the merged candidate, stop before declaring RELEASE and reconcile deployment identity.

### Implementation and release evidence

- Product Owner selected Option B. The previously configured hostname is superseded; no redirect or alias behavior is assumed.
- Updated production URL surfaces: `astro.config.mjs`, `.github/workflows/ci.yml`, `.github/workflows/release-readiness.yml`, `scripts/run-with-site-url.mjs`, README, and the production runbook.
- Built candidate verification: all six priority routes have matching canonical and `og:url` values at the selected production hostname; robots sitemap directive and all 21 sitemap locations use that origin. SEO/social validators pass across the complete static build.
- Before deployment, the selected production host returned HTTP 200 on all six routes, but still served the previous release's metadata. Post-deployment canonical/SEO and browser-console checks remain part of RELEASE verification.
- `npm ci`: PASS (lockfile unchanged; npm reported 8 existing dependency audit findings: 1 low, 1 moderate, 5 high, 1 critical).
- `npm run qa:release`: PASS; 54 Astro files, zero diagnostics, 22 static pages and 20 canonical sitemap URLs.
- `npm run test:browser`: PASS; 344 passed, 171 expected profile skips, 0 failed across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit; full route/viewport matrix and console/page-error checks included.
- LHCI: PASS, 18/18 runs across six priority routes with unchanged thresholds (Performance ≥0.90, Accessibility/Best Practices/SEO ≥0.95). All accessibility/BP/SEO scores are 1.00; performance scores range 0.93–1.00; CLS is 0.000. The Alquileres laboratory LCP samples reach 2,873 ms; field CWV remains `NOT_YET_OBSERVABLE`.
- Independent Critic and Integration Review for RELEASE: pending final candidate review.

## Review gates

- Frontend implementation: PASS after bounded I6 fixes.
- Responsive/browser QA: PASS; final PR CI matrix 344 passed, 171 expected skips, 0 failed.
- Accessibility review: PASS; see focused state and contrast evidence above.
- Independent Critic: PASS for BUILD/VALIDATE; RELEASE re-review pending bounded hostname rework evidence.
- Integration Review: PASS for BUILD/VALIDATE; RELEASE re-review pending bounded hostname rework evidence.
- Increment 6 BUILD/VALIDATE gate: PASS; final PR CI green (release QA/Lighthouse, responsive capture, release contract, secret scanning).
- RELEASE: bounded hostname rework in validation; merge/deployment/review gates remain open until their evidence is recorded.

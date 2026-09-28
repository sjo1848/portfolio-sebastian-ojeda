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
- Full Playwright matrix on the pre-fallback-fix candidate: 334 passed, 171 expected skips, 0 failed. After frontend review, the fallback correction passed in all five browser profiles: **10/10** ES/EN cases. Final full repository matrix is pending PR CI; `npm run test:browser` is the reproducible repository command.
- Accessibility-focused browser review: PASS. Six focused browser checks passed in isolated Chromium: Axe WCAG 2.2 AA in ES/EN for idle/copied/error and keyboard focus pending→success/failure in ES/EN. The computed 3 px copper ring contrast is 7.31:1 and 6.16:1 against the contact-panel background endpoints.
- Lighthouse across all six priority routes: PASS. `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.frontend-excellence-increment-6.json` completed 18 runs and passed all unchanged floors (Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95). Representative scores and lab LCP ranges:

| Route | Performance | Accessibility | Best Practices | SEO | Lab LCP range | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.96–0.99 | 1.00 | 1.00 | 1.00 | 1,877–1,960 ms | 0.000 |
| `/es/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,904–2,117 ms | 0.000 |
| `/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,665–1,901 ms | 0.000 |
| `/es/projects/hms-cloudflare/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,531–1,680 ms | 0.000 |
| `/projects/alquileres-uspa/` | 0.97–0.98 | 1.00 | 1.00 | 1.00 | 2,431–2,569 ms | 0.000 |
| `/es/projects/alquileres-uspa/` | 0.96–0.98 | 1.00 | 1.00 | 1.00 | 2,493–2,726 ms | 0.000 |

All 18 full JSON Lighthouse reports and the manifest are persisted under [`artifacts/lighthouse/frontend-excellence-increment-6`](../../artifacts/lighthouse/frontend-excellence-increment-6/). Lab LCP above 2.5 seconds was observed in one Alquileres ES run; Lighthouse performance still passed. These lab values do not establish field CWV.
- The responsive matrix checked browser console/page errors at each route/width and passed with none. Interaction tests across all five profiles also passed; Axe state audits ran in desktop Chromium.

## Bundle

- I5 Home initial client-JS estimate: about 95,950 B gzip against the 100 KB target.
- Current `CopyAction` chunk: 1,383 B raw / 772 B gzip by Node zlib level 9; the I5 release artifact is 1,384 B / 748 B with the same method. Exact change: −1 B raw / +24 B gzip. Using the I5 Home estimate (95,950 B), the current estimate is 95,974 B gzip (about 95.97 kB), below the 100 KB target. Case-study initial JS remains at 96,885 B gzip, below the 150 KB target.
- Using the same `zlib.gzipSync(..., { level: 9 })` measurement on the post-I5 release artifact and I6 build, shared CSS is 52,876 B / 11,069 B gzip (I5: 52,801 B / 11,058 B); the focused rule adds 75 raw / 11 gzip bytes. The Home route stylesheet remains 4,475 B / 1,152 B gzip, so linked Home CSS totals 57,351 B / 12,221 B gzip.
- Gallery/viewer chunks remain deferred.
- Focus-state screenshots are in [`artifacts/visual/frontend-excellence/increment-6`](../../artifacts/visual/frontend-excellence/increment-6/).

## Release observation and limitation

- Post-merge I5 GitHub CI passed Release QA, browser/accessibility matrix, Lighthouse, release-contract validation, and secret scanning.
- `https://sebastian-ojeda.pages.dev` returned HTTP 200 and exposed the I5 mobile navigation and CopyAction. All six priority ES/EN routes returned HTTP 200 on that host.
- The production URL configured in `astro.config.mjs`, CI/release workflows, and the production runbook, `https://portfolio-sebastian-ojeda.pages.dev`, does not resolve from the verification environment. Each of the six pages on the working Pages hostname emits a canonical URL on that non-resolving hostname; homepage `og:url`, `robots.txt` sitemap directive, and sitemap index/entries also use the configured hostname.
- Cloudflare Pages deployment history is not exposed through this repository's GitHub deployments API. Production behavior is observed at the working hostname; exact Cloudflare deployment identity/status remains unverified.
- This domain/canonical mismatch requires a product/release decision before declaring RELEASE.

## Review gates

- Frontend implementation: PASS after bounded I6 fixes.
- Responsive/browser QA: final PR CI matrix pending; pre-fallback candidate and final focused regressions pass.
- Accessibility review: PASS; see focused state and contrast evidence above.
- Independent Critic: HUMAN_GATE for release; implementation BUILD/VALIDATE passed.
- Integration Review: PASS for I6 BUILD/VALIDATE; separate RELEASE HUMAN_GATE for host/canonical mismatch.
- Increment 6 BUILD/VALIDATE gate: PASS.
- RELEASE: HUMAN_GATE on production identity/canonical mismatch.

## HUMAN_GATE — production host and canonical identity

1. **Problem:** the repository's intended production URL, `https://portfolio-sebastian-ojeda.pages.dev`, does not resolve. The active host is `https://sebastian-ojeda.pages.dev`.
2. **Evidence:** the active host returns HTTP 200 for all six priority routes and exposes the merged I5 navigation/CopyAction. All six pages emit `<link rel="canonical">` pointing to the non-resolving `portfolio-sebastian-ojeda.pages.dev` host; homepage `og:url`, `robots.txt` sitemap directive, and sitemap index/entries also identify that host. The configured URL is present in `astro.config.mjs`, CI/release workflow environment, `scripts/run-with-site-url.mjs`, README, and release runbook. GitHub's deployments API shows no Cloudflare deployment record, so the exact deployed commit/status cannot be confirmed from repository tooling.
3. **Impact:** the site is reachable at the active hostname, but canonical, sitemap, robots, and social metadata identify a hostname that cannot be reached; the Cloudflare production deployment identity is unverified. Do not declare RELEASE until reconciled.
4. **Option A:** keep the existing intended canonical URL and repair/reconfigure Cloudflare Pages so `portfolio-sebastian-ojeda.pages.dev` serves the current production build.
5. **Option B:** designate the active `sebastian-ojeda.pages.dev` hostname as canonical and update site configuration, workflow environment, README, runbook, and generated SEO/social metadata together.
6. **Trade-offs and recommendation:** A preserves the documented product/SEO identity but requires external Cloudflare configuration and deployment verification. B aligns the site with a currently reachable Pages hostname but changes the public canonical identity and may need search/share migration handling. Technical recommendation: preserve the already documented canonical (A) unless the product owner confirms that the active alias is intended to be permanent.
7. **Decision required:** confirm the canonical production hostname and authorize the corresponding Cloudflare or repository configuration change before RELEASE.

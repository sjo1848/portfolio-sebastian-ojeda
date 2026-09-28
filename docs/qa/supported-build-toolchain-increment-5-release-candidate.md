# Supported Build Toolchain — Increment 5: Full Regression / Release Candidate

## Contract and scope

- Issue: #91, Supported Build Toolchain Migration & Security Closure.
- Phase: BUILD / VALIDATE — Increment 5, full regression and release candidate.
- Baseline: Increment 4 merged in PR #96 at `c2442d0348c3f285908c09c0b8e6deb3b1b565c4`.
- Candidate stack: Node `24.21.0`, npm `11.19.0`, Astro `7.3.5`, `@astrojs/react` `6.0.6`, Tailwind/Vite plugin `4.3.3`, React/React DOM `19.3.0`.
- Objective: final full-product, security, responsive, browser, accessibility, bundle, SEO, and Lighthouse validation before RELEASE.
- Out of scope: all product, content, branding, UX, architecture, CV, LinkedIn, and public-config changes.

## Final candidate versions and security

| Package | Resolved version | Notes |
| --- | --- | --- |
| Node / npm | 24.21.0 / 11.19.0 | Matches `.nvmrc` and CI |
| Astro / React integration | 7.3.5 / 6.0.6 | Astro 7 + official integration |
| Vite | 8.3.1 | Astro 7 toolchain |
| React / React DOM | 19.3.0 / 19.3.0 | Existing approved islands |
| Tailwind / Vite plugin | 4.3.3 / 4.3.3 | Existing Tailwind 4 styling |
| Sharp | 0.35.5 | Above Astro 7 security floor |
| `devalue` / `fast-uri` | 5.9.4 / 3.1.8 | Residual advisories closed in I4 |

`npm audit --json`: **0 vulnerabilities** (0 critical/high/moderate/low). Full candidate inventory is in [`dependency artifacts`](../../artifacts/dependencies/supported-build-toolchain-increment-5-release-candidate/); path-specific security closure is in the [Increment 4 report](./supported-build-toolchain-increment-4-security.md).

## Install and QA

- Node 24.21.0 / npm 11.19.0 `npm ci`: PASS; 349 packages added, audit zero. Existing `esbuild` install-script notice remains; no additional scripts were approved.
- `npm run qa:release`: PASS. Astro check: 55 files, zero errors/warnings/hints. Static build: 22 HTML pages. Content, presentation, asset, social card/metadata, SEO/structured data, UX/accessibility, sitemap and build validators pass. Sitemap contains 20 URLs.
- `npm run test:browser`: **344 passed, 171 expected profile skips, 0 failures**. The 515-test matrix covered Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit, all priority ES/EN routes, 360/390/430/768/1024/1440 widths, axe, keyboard/focus, reduced motion, responsive media viewer, contents navigation, GIF behavior, clipboard states, console/page errors, and hydration/no-JS fallbacks.
- No code/source/content, workflow, canonical, styling, behavior, or runtime changes are in the candidate.

## SEO/static route verification

The static verification artifact [`static-seo-verification.json`](../../artifacts/seo/supported-build-toolchain-increment-5-release-candidate/static-seo-verification.json) records checks of `/`, `/es/`, `/projects/hms-cloudflare/`, `/es/projects/hms-cloudflare/`, `/projects/alquileres-uspa/`, and `/es/projects/alquileres-uspa/`:

- canonical and `og:url` match `https://sebastian-ojeda.pages.dev` on all six routes;
- EN/ES alternate links and JSON-LD are present;
- all six routes appear in the generated sitemap; sitemap index references the sitemap file;
- `robots.txt` publishes the canonical sitemap URL.

Static validation is not production verification; live HTTP, headers/metadata, and deployed behavior remain Increment 6 gates.

## Browser and visual state evidence

- Responsive screenshots from the release candidate are in [`Increment 5 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-5-release-candidate/).
- Open Dialog, copy feedback, and failure/fallback captures remain available in [`Increment 3 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-3-astro7/); the gallery intermediate state is captured in [`Increment 5 visual evidence`](../../artifacts/visual/supported-build-toolchain-increment-5-release-candidate/alquileres-gallery-mobile-intermediate.png), the open mobile navigation state in [`Increment 1 visual evidence`](../../artifacts/visual/frontend-excellence/increment-1/mobile-nav-en-390-open.png), and the open Content Sheet state in [`Increment 4 visual evidence`](../../artifacts/visual/frontend-excellence/increment-4/contents-sheet-mobile-390.png). Later toolchain increments changed no UI or public output.
- The hosted PR check must retain its uploaded responsive/accessibility screenshots and logs. Local test-generated historical screenshots were restored after capture.
- No browser console errors, hydration mismatch, or regression observed.

## Bundle / initial JavaScript

The existing island-aware gzip measurement remains unchanged after I4:

| Route group | Initial JS | Soft budget | Headroom |
| --- | ---: | ---: | ---: |
| Home EN/ES | 94,062 B | 100,000 B | 5,938 B |
| HMS case study EN/ES | 95,343 B | 150,000 B | 54,657 B |

Deferred visible chunks: HMS viewer 12,553 B; Alquileres gallery 14,220 B. They are excluded from initial JS. No whole-page hydration or added client roots. Raw values are in [`island-js-measurements.jsonl`](../../artifacts/dependencies/supported-build-toolchain-increment-5-release-candidate/island-js-measurements.jsonl).

## Lighthouse

The unchanged six-route config completed 18 runs and `lhci assert` exited PASS with existing floors: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. A11y, Best Practices, SEO were 1.00 on every run; CLS was 0 on every run. Full JSON/HTML reports and exact config are in [`Lighthouse evidence`](../../artifacts/lighthouse/supported-build-toolchain-increment-5-release-candidate/).

| Route | Performance min / median / max | Lab LCP min / median / max (ms) | CLS |
| --- | ---: | ---: | ---: |
| `/` | 0.88 / 0.89 / 0.96 | 1,661 / 2,216 / 2,449 | 0 |
| `/es/` | 0.97 / 0.97 / 0.99 | 1,512 / 1,887 / 2,143 | 0 |
| `/projects/hms-cloudflare/` | 0.98 / 0.98 / 0.99 | 1,517 / 1,615 / 2,094 | 0 |
| `/es/projects/hms-cloudflare/` | 0.98 / 0.99 / 1.00 | 1,468 / 1,837 / 1,841 | 0 |
| `/projects/alquileres-uspa/` | 0.93 / 0.95 / 0.98 | 2,121 / 2,424 / 2,650 | 0 |
| `/es/projects/alquileres-uspa/` | 0.94 / 0.94 / 0.96 | 2,126 / 2,573 / 2,747 | 0 |

Interpretation: Lab readings vary; the English and Spanish Alquileres max lab LCP exceed 2.5 s, while field Core Web Vitals remain `NOT_YET_OBSERVABLE`. The Home's two lower raw performance runs (0.88/0.89) correlate with higher run-to-run TBT (about 429–437 ms); another run scored 0.96. The existing LHCI configuration has no explicit aggregation override and the configured `lhci assert` gate passed; no threshold or aggregation policy was changed in this initiative. Preserve this spread in review rather than claiming every individual run exceeded 0.90. No forced optimization is in scope; no field CWV claim is made.

## Risks / release gate

- Lighthouse is passing its current automated gate, but the Home raw-score spread and Alquileres lab LCP variability should be reviewed independently. The site remains under the initial JS soft budgets and has CLS 0; this measurement alone does not justify scope/performance budget changes.
- Production canonical hostname is unchanged. Live production six-route HTTP 200, SEO metadata, console/hydration, and deployment version checks remain Increment 6, not inferred from static build.
- Increment 6 must verify the real Cloudflare Pages deployment and then complete a brief LEARN review before #91 is closed.

## Independent gates

- Independent Critic: **PASS** — independently validated route metadata, zero audit, browser/bundle/Lighthouse evidence and its run-to-run variability, unchanged thresholds/budgets, scope, and corrected screenshot attribution.
- Integration Review: **PASS** — independently checked the release-candidate evidence, zero audit, route metadata, 344/171/0 browser matrix, bundle budgets, existing Lighthouse assertion, performance variability, and absence of scope changes.

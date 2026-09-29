# Issue #99 — Increment 6: full validation

## Verdict summary

- Phase: BUILD — Increment 6 (full validation, no product implementation changes).
- Product tree: `8d993a479d90fbf3094cf5641a3c82ed6985687f` (`main` after I5). Its tree hash is identical to I5 candidate `bcc3049` (`0b1e0033b6402c0494fd2fa5390580d22c1613f6`).
- Local installation/release validation: **PASS**.
- Full hosted browser/release matrix on the same product tree: **PASS** twice (I5 final PR/push workflows #36513721849 and #36513724453).
- Six-route Lighthouse with existing assertions: **PASS**.
- Client-JS budgets, accessibility, responsive widths, SEO/canonical, and ES/EN checks: **PASS**.
- Field CWV: **NOT_YET_OBSERVABLE**; no RUM/analytics was added.
- Independent Critic and Integration Review for this full validation record: pending review before I6 is merged.

## Clean install and static release QA

Environment: Node `v24.18.0`, npm `12.0.2` on the local verification host. The hosted checks use the repository’s supported Node `24.21.0` configuration.

- `npm ci`: **PASS**; 349 packages added, 350 audited, **0 vulnerabilities**. npm retained its existing notice that the esbuild install script is blocked by `allowScripts`; no dependency or lockfile change occurred.
- `npm run qa:release`: **PASS**. Bilingual content and presentation validation passed; Astro checked 60 files with 0 errors, warnings, or hints; the static build emitted 22 pages; static assets, social metadata, SEO/structured data, UX/accessibility, built pages, and the 20-URL canonical sitemap all passed.
- Production origin used for metadata validation: `https://sebastian-ojeda.pages.dev`.

## Browser, responsive, keyboard, and accessibility matrix

The existing Playwright suite contains 675 declared project/test combinations across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. Hosted release workflow runs **#36513721849** and **#36513724453** both report **504 passed, 171 expected skips, 0 failures** on the product tree above. These runs also passed release QA, the responsive matrix, Lighthouse budgets, secret scanning, and release-contract validation. [Hosted browser evidence](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36513721849/artifacts/11009393675) · [Hosted Lighthouse artifact](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36513721849/artifacts/11010438603).

The declared responsive matrix checks all six priority routes in English and Spanish at 360, 390, 430, 768, 1024, and 1440 CSS pixels in the desktop Chromium, Firefox, and WebKit projects. Mobile Chromium and Mobile WebKit exercise 360, 390, and 430 px. The full suite also covers ProjectCard CTAs, all three quick scans, no-JavaScript anchors and navigation, mobile Sheet focus/Escape/restore/locale behavior, reduced motion, case-study contents tracking, media-viewer keyboard/original fallback, GIF controls, and CopyAction idle/success/error/fallback states.

- Axe WCAG 2.2 AA route scans: all 12 required route/width states (six priority routes × 390/1440) passed with zero violations in the Chromium accessibility project. Interaction-specific axe assertions also pass in their configured projects.
- Responsive matrix browser-console/page-error assertions passed in the hosted run; the I5 content and status change adds no client code or hydration work.
- Local diagnostic run: the 675-test invocation produced 502 passed, 171 skipped and two failures in Mobile WebKit’s mobile-navigation focus-wrap assertion while four workers were under the combined full-suite load. This was not hidden. I reran that same Mobile WebKit navigation suite twice with one worker: **8/8 passed**, including both EN/ES Tab-wrap, Shift+Tab, Escape, focus restore, scroll-lock, and locale-change flows. The same full 675-combination suite then passed twice in the hosted workflow on an identical product tree. No interaction code, timeout, browser coverage, or gate was changed. The repeatability risk is recorded: continue watching this focus assertion for recurrence under local parallel resource pressure.
- The existing Playwright config starts Astro preview as a daemon in this local environment. Local full-suite execution therefore used a temporary config that disabled only the `webServer` launcher while reusing the freshly built preview. That temporary file was removed after the tests. Hosted CI ran the ordinary repository config.

Screenshots captured by the responsive matrix (42 files: 36 route/width screenshots plus six ProjectCard CTA states) and their hashes are persisted under [I6 visual evidence](../../artifacts/visual/issue-99-increment-6/). The existing I2 screenshot paths were restored after capture so historical I2 evidence was not overwritten.

## Six-route Lighthouse

The reproducible I6 config is [`lighthouserc.json`](../../artifacts/lighthouse/issue-99-increment-6/lighthouserc.json). It runs three Lighthouse samples on each of the six priority routes and preserves the existing floors exactly:

- Performance ≥ 0.90
- Accessibility ≥ 0.95
- Best Practices ≥ 0.95
- SEO ≥ 0.95

All 18 Lighthouse assertions **PASS**. The raw score ranges and lab LCP/CLS ranges below are included so a passing assertion is not mistaken for every individual sample meeting the floor:

| Route | Performance samples | Accessibility | Best Practices | SEO | Lab LCP range | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.70–0.97 | 1.00 | 1.00 | 1.00 | 2,320–2,378 ms | 0.000 |
| `/es/` | 0.86–0.92 | 1.00 | 1.00 | 1.00 | 1,910–2,154 ms | 0.000 |
| `/projects/hms-cloudflare/` | 0.96–0.98 | 1.00 | 1.00 | 1.00 | 1,502–1,945 ms | 0.000 |
| `/es/projects/hms-cloudflare/` | 0.98–1.00 | 1.00 | 1.00 | 1.00 | 1,457–1,763 ms | 0.000 |
| `/projects/alquileres-uspa/` | 0.89–0.97 | 1.00 | 1.00 | 1.00 | 2,118–2,878 ms | 0.000 |
| `/es/projects/alquileres-uspa/` | 0.91–0.95 | 1.00 | 1.00 | 1.00 | 2,487–2,968 ms | 0.000 |

The existing LHCI config does not set `aggregationMethod`; LHCI 0.15.1 therefore uses its default `optimistic` aggregation for minimum scores. The floors were not lowered or altered. Some raw samples are below 0.90 (one Home EN, two Home ES, and one Alquileres EN); those observations are visible in the table, while the project’s configured assertions pass. Lab LCP exceeded 2.5 seconds in some Alquileres runs; Lighthouse lab results do not establish field LCP/INP/CLS. Field CWV remain `NOT_YET_OBSERVABLE`.

All 18 JSON/HTML reports and the LHCI manifest are saved under [I6 Lighthouse results](../../artifacts/lighthouse/issue-99-increment-6/).

## Client bundle and static CSS

The existing island-aware measurement script [`measure-island-js.mjs`](../../artifacts/dependencies/supported-build-toolchain-increment-2-astro6/measure-island-js.mjs) measured:

| Route class | Initial gzip JS | Files | Budget | Headroom |
| --- | ---: | ---: | ---: | ---: |
| Home EN/ES | 94,062 B | 8 | 100,000 B | 5,938 B |
| Lead case EN/ES | 95,343 B | 8 | 150,000 B | 54,657 B |

Each lead case retains two visible-deferred gallery files (12,553 B gzip HMS; 14,220 B Alquileres). The generated closure matches the established I2–I5 values; I5 changed Markdown, labels, tests, and evidence artifacts only. No client JS, hydration directive, React island, style, or dependency changed in I5; the JS/CSS delta from I4 is **0 B**. Static copy/status values are rendered by Astro.

The generated CSS asset names and raw sizes also match I4: Home’s linked stylesheet pair is 62,433 B raw; case pages use the shared 54,269 B stylesheet. (Per-asset gzip values vary slightly with the local Node/zlib version; no CSS source or emitted asset changed.)

## Bilingual, SEO, and product-boundary review

- All six priority route pairs build with the selected production canonical host, matching `og:url`, reciprocal `hreflang`, sitemap entries, Person/SoftwareSourceCode metadata, and page language. The static validators cover the 20 public canonical sitemap URLs and 22 built HTML pages, including social metadata/structured data and the robots directive.
- The lead order remains HMS Cloudflare → Alquileres Uspallata → AI Commerce + HMS. All six secondary projects remain available.
- I5 evidence/status distinctions are intact: HMS technically validated with acceptance separate; Alquileres active development with synthetic reproducible captures but no public deployment; Phase 2.5 controlled staging evidence stays separate from experimental Phase 2.6. No unsupported career/product claims were added.
- The CV is absent, LinkedIn remains absent, Alquileres `demo` remains null, and no analytics, tracking, or real customer data was added.
- Conversion lift remains unvalidated because no recruiter/funnel outcome data exists; this initiative does not claim otherwise.

## Independent gates

- Independent Critic — **PASS**. Confirmed the disclosed local Mobile WebKit contention failures, 8/8 focused rerun, two hosted identical-tree passes, Lighthouse aggregation/raw sample caveat, visual hashes, and scope/evidence honesty.
- Integration Review — **PASS**. Confirmed hierarchy and status/evidence coherence, bilingual/SEO integrity, preservation of technical depth and secondary cases, unchanged bundle/style outputs, and adequate disclosure of Lighthouse variability and field-CWV limits.

## Release handoff

I6 only certifies the merged candidate against the required product and technical gates. It does not claim the final post-I7 production verification; that is the next increment. The local focus-wrap contention observation above remains visible for that final handoff.

# Issue #108 — Wave 1 validation record

## Authorization and scope

- Phase: **BUILD → VALIDATE → RELEASE → LEARN**, Wave 1 only.
- Contract: [`Wave 1 BUILD contract`](../implementation/issue-108-wave-1-build-contract.md).
- Discovery: [`Issue #108 evidence and demo strategy`](../discovery/issue-108-evidence-demo-strategy.md), merged in PR #109.
- HG-1 resolved: withdraw all four existing UspaYa PNGs; preserve the case; no replacements.
- HG-2 resolved: approved proof modes, Waves 1–3, CTA strategy, evidence model, motion policy and portfolio/external-project boundary.
- Product baseline: `main` at `20e91ec86fbb97320e5196b6fb06055acdd98cf8` (PR #110); source baseline before docs-only contracts: `d383f733c0bcfc32a9a061b20d18d2506f67dd1d` (PR #109).
- Positioning, visual branding, ordering/layout, lifecycle/status, external repositories, public demos, LinkedIn, CV, analytics and Waves 2–3 are out of scope.

## Implemented

1. Deleted `uspaya-courier-mobile.png`, `uspaya-customer-mobile.png`, `uspaya-merchant-mobile.png`, and `uspaya-operations-mobile.png` from `public/media/projects/uspaya/`. Their former SHA-256 values were respectively `777e1c7491998a12f6ee8f51d541bb1e3df132b9477ee280a08985169ffc18bc`, `ef215fd9ef5554601410311482ca1452412d1374881d4a75345ba16201a53593`, `0f867f9c31bb072e16ac4071e7e08c4ca9897631c5e767e92efcda21b7e24131`, and `0e71b42002e77a8f0e6c5cbab26b33a6388c21d087d9c7380bb88fd4c916b281`.
2. Removed the UspaYa media vendoring step and its remaining homepage cover reference; validators now fail if withdrawn paths or vendor markers return. Build validation also checks the four paths are absent from `dist/`.
3. Preserved both UspaYa case study routes and repository links. The bilingual case now explains why visual evidence is withdrawn and the criteria for any future replacement: reproducible synthetic or redacted values, clear provenance and privacy review.
4. Added a typed proof registry for all nine published cases with `preferredProofMode`, `currentProofMode`, `proofReadiness`, optional localized `proofHref`, `proofProvenance` and localized `proofLimitations`. Preferred evidence readiness is separate from current evidence; neither infers or changes lifecycle/status. Null proof destinations render no proof CTA.
5. Replaced generic “Demo” quick-scan copy with state-based evidence/GitHub/case-study actions. Only already verified internal anchors are used as proof links. HMS Cloudflare and Alquileres link to their existing evidence; AI Commerce remains case/repository-only until a walkthrough is approved. Existing repository links remain intact.
6. Reconciled bilingual `featured` metadata to the approved three leads: HMS Cloudflare, Alquileres Uspallata and AI Commerce + HMS. The other six cases remain secondary. The existing visual and source ordering was not changed. Validation fixes the exact lead roster in place.
7. No motion dependency, new animation, hydration island, runtime behavior or external project change was added. Existing card hover/focus and gallery/dialog transitions remain; existing reduced-motion behavior is retained.
8. Resolved Integration Review REWORK: removed obsolete `demo: null` from all 18 localized project frontmatters and from the content schema. The content validator now rejects the removed legacy field so the proof registry remains the only source for proof links/readiness. Existing `evidenceNeeded` notes remain internal planning metadata as Discovery requires; they are not rendered as CTAs or public evidence claims.

## Baseline, runtime and bundle

- Runtime: Node `24.18.0`, npm `12.0.2`.
- `npm ci`: PASS; lockfile unchanged and npm reported zero vulnerabilities.
- Previous accepted initial JavaScript baseline from Issue #99 is 94,062 B gzip on Home and 95,343 B on HMS case routes, against the existing 100,000 B Home / 150,000 B case budgets.
- Reproducible current measurement: `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs`.

| Routes | Initial client JS gzip | Delta vs. baseline | Deferred visible gallery chunks gzip |
| --- | ---: | ---: | ---: |
| Home EN / ES | 94,062 B | 0 B | 0 B |
| HMS Cloudflare EN / ES | 95,343 B | 0 B | 12,553 B |
| Alquileres EN / ES | 95,343 B | 0 B | 14,220 B |
| AI Commerce + HMS EN / ES | 95,081 B | 0 B | 0 B |

Proof metadata is static Astro data. It adds no client bundle or hydrated island.

## Validation commands and results

- `npm run qa:release`: **PASS**. Content and presentation validation, Astro check (62 files; 0 errors/warnings/hints), static build (22 HTML pages), social asset/metadata, SEO/structured data, UX/accessibility, build and sitemap validation all passed. Sitemap contains 20 canonical URLs.
- After the bounded `demo` metadata REWORK, `npm run qa:release` was repeated: **PASS**, Astro check covered 64 files with 0 errors/warnings/hints; 22 pages built; SEO, UX, content and sitemap validators passed.
- After that same REWORK, focused proof/quick-scan Chromium tests: **PASS**, 22/22, including ES/EN case and no-JavaScript checks.
- Final `ASTRO_PREVIEW_BACKGROUND=0 npm run qa:browser` after the REWORK: **PASS**, 512 passed, 203 profile-specific skipped, 0 failed in 16.1 minutes.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run qa:browser`: **PASS**, 512 passed, 203 profile-specific skipped, 0 failed. Matrix projects: Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. Responsive cases cover 360, 390, 430, 768, 1024 and 1440 px where configured.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run test:browser -- tests/browser/project-card-mobile.spec.ts --project=chromium`: **PASS**, 6/6. CTA routes tested in ES/EN at 360/390/430 px; minimum 44×44 px, no hover dependency, correct separate title/image vs CTA targets, console/page errors absent.
- New proof-model tests cover all nine registry records, local asset hash provenance, absence of UspaYa media/vendor restoration, and UspaYa case/repository availability in ES/EN. New and updated browser assertions passed in the full matrix.
- Existing axe coverage includes Home, HMS, Alquileres and UspaYa in ES/EN; keyboard and focus coverage includes mobile navigation, case-study contents and copy fallback; reduced-motion behavior is covered by the existing mobile navigation interaction tests. No new motion was introduced.
- No project page console errors or hydration failures were reported by the browser suite; proof/card tests fail on console errors and page errors. Static content fallback and native case-study links remain tested without JavaScript.
- SEO, canonical, social metadata and sitemap validators passed for the complete generated site. Canonical configuration was not changed.
- Privacy source/build validators passed: removed file paths are absent from the source and static build, and the vendor script cannot restore them.

### Lighthouse

Reproducible command/config: `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.issue-108-wave-1.json`.
The configuration runs three samples on each of eight EN/ES routes. Category thresholds remain Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95 and SEO ≥0.95. To make the aggregation policy explicit, assertions use the median of each route's three samples; no score threshold was changed. The final full matrix completed with all 24 raw Performance scores ≥0.91 and every route median above 0.90. All category assertions passed. The table shows route medians, raw Performance range, highest lab LCP and highest CLS. Raw JSON/HTML reports and manifest are in [`artifacts/lighthouse/issue-108-wave-1/`](../../artifacts/lighthouse/issue-108-wave-1/). Lab LCP is not field Core Web Vitals; field CWV remains `NOT_YET_OBSERVABLE`.

| Route | Performance median (raw range) | Accessibility median | Best Practices median | SEO median | Highest lab LCP | Highest CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home EN | 0.93 (0.92–0.98) | 1.00 | 1.00 | 1.00 | 2,370 ms | 0 |
| Home ES | 0.98 (0.97–0.98) | 1.00 | 1.00 | 1.00 | 2,278 ms | 0 |
| HMS Cloudflare EN | 0.99 (0.99–1.00) | 1.00 | 1.00 | 1.00 | 1,946 ms | 0 |
| HMS Cloudflare ES | 1.00 (0.97–1.00) | 1.00 | 1.00 | 1.00 | 1,526 ms | 0 |
| Alquileres EN | 0.96 (0.94–0.97) | 1.00 | 1.00 | 1.00 | 2,427 ms | 0 |
| Alquileres ES | 0.94 (0.91–0.97) | 1.00 | 1.00 | 1.00 | 2,642 ms | 0 |
| AI Commerce + HMS EN | 0.99 (0.95–1.00) | 1.00 | 1.00 | 1.00 | 1,755 ms | 0 |
| AI Commerce + HMS ES | 0.99 (0.99–0.99) | 1.00 | 1.00 | 1.00 | 1,823 ms | 0 |

During rework, a separate stress run configured to fail if any single sample fell below the floor produced one 0.89 Home ES sample (TBT 410 ms) while other host-side CPU work was running. That run failed the deliberately pessimistic assertion and was not treated as release evidence. The canonical three-run median gate was then rerun over the complete matrix; its 24 raw Performance scores all exceeded 0.90 as shown above. The already accepted Issue #99 baseline also recorded significant Lighthouse variability (Home raw Performance 0.70–0.97), so the report preserves sample ranges instead of presenting a single run as deterministic. This final matrix is the one used for review.

## Visual evidence

Playwright screenshots: [`output/playwright/issue-108-wave-1/`](../../output/playwright/issue-108-wave-1/). This directory contains ProjectCard CTA states in both locales at 360/390/430 px and lead quick-scan states in both locales at 390/1440 px. `SHA256SUMS` records their exact hashes. Representative screens were visually inspected; the compact 390 px CTA capture includes the card summary, role, stack and visible evidence action. They preserve Stone / Andes Copper styling and do not substitute for product acceptance or production evidence.

## Release verification — pending

Release/deployment checks must be added after integration. Required production host: `https://sebastian-ojeda.pages.dev`.

- Former UspaYa image path responses (all must be 404/410): pending.
- UspaYa case study EN/ES HTTP 200 and repository links intact: pending.
- Priority Home and lead-case routes deployed: pending.
- Production browser console/hydration smoke check: pending.
- Release commit / deployment identifier: pending.
- Rollback: revert the Wave 1 merge commit; this restores the prior artifact state. Reinstating UspaYa assets requires a new privacy/provenance review and explicit approval, not rollback automation.

## Independent reviews

- Independent Critic: **PASS**. The reviewer checked the final Lighthouse matrix and report; the `demo` field/schema cleanup; all nine proof records; UspaYa source/build removal and preserved case/repository links; lead/secondary roster; and the browser/accessibility/budget evidence. The reviewer confirmed the separately disclosed stress-run result is distinct from the passing final matrix.
- Integration Review: **PASS**. The reviewer confirmed the proof registry is the sole proof-CTA source, lifecycle/status is separate, all nine records and locale metadata align, only the three approved projects are featured, six secondary cases remain accessible, UspaYa files/vendor restoration are guarded, and no external repository, dependency, client JS, hydration, motion, branding or SEO configuration was added. Both independent reviews agree only post-merge production URL and deployed browser checks remain.

## LEARN — pending deployment

Assess recruiter clarity and proof discoverability, evidence trust/privacy, accessibility, lab performance/JS cost and maintainability against the discovery hypothesis after production verification. Field CWV stays `NOT_YET_OBSERVABLE` absent sufficient real-user evidence. No Wave 2 or Wave 3 scope is opened by this closeout.

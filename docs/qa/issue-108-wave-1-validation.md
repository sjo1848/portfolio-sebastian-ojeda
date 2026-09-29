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

## Release verification — complete with accepted residual CDN risk

Production host: `https://sebastian-ojeda.pages.dev`.

- Release commit: `266361656389481c0691ae08d03353c21e9e16a7` (PR #111 merge commit).
- Production deployment: Cloudflare Pages production deployment for `main`, source `2663616`, deployment `https://e605ed91.sebastian-ojeda.pages.dev`; canonical host remains `sebastian-ojeda.pages.dev`.
- The four PNGs are deleted from the merged source tree. The Release QA/privacy validators passed and verify withdrawn paths are absent from source and the generated static build. The existing vendor guard also prevents them from being copied back into the build.
- The current origin returns the withdrawn paths as absent when the cache is bypassed. Exact, unmodified public URLs have also been observed returning `200 HIT` at some Cloudflare edges, while other edge responses return `404`. Example exact-path probes on 2026-09-29 at 20:17:31–34 UTC returned all four `200 HIT`; probes at 20:23:43–46 UTC returned `200 HIT` for courier and operations and `404` for customer and merchant. These observations are intentionally preserved as mixed/stale edge-cache state; they are not reported as four `404/410` responses.
- Residual risk classification: **Residual CDN cache exposure — explicitly accepted by Product Owner**. On 2026-09-29, the Product Owner accepted that the four former public URLs may continue to return cached `200` from some CDN locations until Cloudflare Pages cache expiry. The Product Owner directed that RELEASE no longer be blocked on natural expiry. No global purge will be run, no permissions will be expanded, and no custom domain or Cloudflare configuration change will be introduced solely for this cleanup. Edge removal depends on natural Cloudflare cache expiration.
- UspaYa case study EN/ES routes, repository links, the home routes and all three lead-case routes return HTTP 200 on the canonical host. Canonical/`og:url`, alternates, sitemap and robots checks passed. Production smoke testing found zero console errors or warnings on the sampled routes and no hydration regressions.
- Release readiness: **PASS** on PR #111 (run [36603431955](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36603431955)); Portfolio CI: **PASS** on merged main commit `2663616` (post-merge run [36604835354](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36604835354)). The post-merge run completed Release QA, responsive/accessibility browser matrix, Lighthouse budgets and evidence uploads successfully. PR #111's final Portfolio CI run [36603431930](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36603431930) also passed before merge.
- Browser matrix: **PASS** — Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit; responsive coverage includes 360, 390, 430, 768, 1024 and 1440 px where configured. The complete local matrix recorded 512 passed, 203 profile-specific skipped, zero failed; PR and post-merge CI ran the required responsive/accessibility suite successfully.
- Lighthouse: **PASS** — three samples on each of eight ES/EN priority routes, using the unchanged thresholds and the documented median aggregation. All category gates passed; the full results and report files are recorded above and in `artifacts/lighthouse/issue-108-wave-1/`.
- QA: **PASS** — `npm run qa:release`, source/build privacy validators, SEO/canonical, social metadata, sitemap, accessibility/UX, content and static-build checks passed in the final candidate and post-merge CI.
- Rollback: revert the Wave 1 merge commit. Reinstating UspaYa assets requires new synthetic/redacted evidence with reproducible provenance and privacy review; rollback automation must not restore withdrawn files.

The accepted CDN exposure is the sole material release limitation. No additional periodic probes or Cloudflare changes are authorized or planned after this closeout.

## Independent reviews

- Independent Critic final closeout: **PASS**. The reviewer confirmed the Product Owner's dated risk acceptance is recorded as the release authority; the report preserves observed `200 HIT` results without claiming four `404/410`s; source/build removal, CI links, LEARN and the no-more-probing boundary are accurately represented.
- Integration Review final closeout: **PASS**. The reviewer confirmed RELEASE/LEARN are coherent with the explicit risk acceptance, source/build absence is distinguished from stale edge responses, no unauthorized Cloudflare changes or additional scope are introduced, and Waves 2–3 remain unauthorized.

## LEARN — complete (2026-09-29)

### Hypothesis

Using already verified evidence with explicit proof readiness and state-based CTAs can improve recruiter understanding without weakening truthful claims, privacy, performance or the Astro-first architecture.

### Observed outcome

- The three approved lead cases now have a clear and consistent evidence hierarchy; all six secondary cases remain accessible.
- Proof readiness, preferred/current proof modes, provenance, limitations and verified proof destinations are explicit and separate from project lifecycle/status. Generic “Demo” CTAs and the duplicate legacy demo field were removed.
- Removing UspaYa's four unproven public images closed the source/build exposure. Cloudflare edge caches can still serve some old URLs; the Product Owner explicitly accepted this temporary residual risk to avoid disproportionate account/configuration changes.
- The portfolio remained Astro-first. Proof metadata added no client JavaScript or hydrated island; measured route JS delta was 0 B and existing budgets remained satisfied.
- Accessibility, responsive/browser, SEO and Lighthouse gates passed. Field Core Web Vitals remain `NOT_YET_OBSERVABLE`; Lighthouse lab results are not represented as field CWV.
- The project evidence strategy and Wave 1 implementation produced a maintainable model and evidence trail without creating demos, changing external projects, or introducing a motion dependency.

### Learning and limits

- What worked: state-based, provenance-bearing proof links help distinguish repository/case-study evidence from product demos and walkthroughs; validation now prevents withdrawn UspaYa assets and obsolete proof metadata from returning unnoticed.
- Remaining accepted limitation: CDN edge expiry is asynchronous; some exact UspaYa asset URLs may temporarily return `200 HIT`. This is an explicitly accepted risk, not a claim that edge removal is complete.
- Not yet observable: recruiter conversion impact and field CWV. No analytics or RUM was added to manufacture measurements.
- Do not expand into Wave 2 or Wave 3 based on this closeout. Future evidence changes require their own authorization and the relevant project's independent release gates.

## Final status

- RELEASE: **PASS with explicitly accepted residual CDN cache exposure**.
- LEARN: **PASS / complete**.
- Issue #108: ready to close after this report is merged and the accepted decision plus final PASS verdicts are recorded in the issue.

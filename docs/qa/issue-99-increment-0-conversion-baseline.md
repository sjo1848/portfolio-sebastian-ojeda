# Issue #99 — Increment 0: Conversion baseline

## Provenance and scope

- Initiative: Issue #99, Recruiter Conversion & Evidence Hierarchy.
- Phase: BUILD — Increment 0, baseline only.
- Baseline: `main` at `ad735997f28522a7fc37f35f5eda573f2f683071`.
- Local branch: `build/issue-99-i0-conversion-baseline`.
- Product source, dependency versions, lockfile, workflow, published content, design, SEO/configuration, and runtime were not changed for this baseline.
- Runtime: Node `24.21.0`, npm `11.19.0`.
- Screenshots: [24 viewport captures and manifest](../../output/playwright/issue-99-increment-0/). Captures cover home, HMS Cloudflare, Alquileres Uspallata, and AI Commerce + HMS in English/Spanish at 390, 768, and 1440 CSS px. Each capture records dimensions, byte size, and SHA-256 in `capture-manifest.json`.
- [Section word counts and heading inventory](../../artifacts/metrics/issue-99-increment-0/content-density.json). Counts cover visible named home sections; case pages use heading inventory because their narrative is Markdown rather than section-wrapped HTML. Page-wide text totals are deliberately omitted because the initial extraction included non-visible script data.

## Environment and baseline QA

- `volta run --node 24.21.0 --npm 11.19.0 npm ci`: PASS; 349 packages installed, npm reported zero vulnerabilities.
- `volta run --node 24.21.0 --npm 11.19.0 npm run qa:release`: PASS. Astro check covered 55 files with zero errors, warnings, or hints; static build emitted 22 HTML pages and 20 sitemap URLs; content, presentation, assets, social metadata, SEO, UX, sitemap, and build validators passed.
- Existing browser regression result from the unchanged site source: PR #98 CI passed 344 tests, 171 expected profile skips, 0 failures across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. Its width matrix includes 360, 390, 430, 768, 1024, and 1440. This is inherited regression evidence, not a claim that this baseline capture re-ran that complete matrix.
- Console and hydration status: baseline is static-first and has no newly introduced client islands. The existing PR #98 browser run reported no page console errors or hydration regressions.
- Screenshots in this report are local baseline captures with Playwright CLI and Chrome for Testing `154.0.8037.0`; they are visual evidence, not automated conversion outcomes.

## Recruiter journey: 10–30 seconds

The current Home section order in both locales is Hero → Projects → About → Capabilities → Experience → Process → Contact. At the top of the 390 × 844 first viewport, the visitor sees the global navigation, generic “Full-stack software developer” eyebrow, “From workflow to system.” proposition, long supporting paragraph, two actions, and the beginning of the approach panel. The first case proof is below the first viewport. The desktop screenshot likewise gives substantial first-screen space to the hero and three-step approach panel before project evidence.

The page currently renders four cards in its primary-project section. The first three are already in the approved order (HMS Cloudflare, Alquileres Uspallata, AI Commerce + HMS), but UspaYa appears as a fourth peer. The “Additional depth” section shows only GasFlow and Agentic Engineering Governance. Three other published cases (HMS Elite, JM Soluciones, Taco Loco) are not linked from the Home hierarchy observed in this baseline. This is an information-discovery gap; no case is to be deleted.

The role direction is distributed across a broad five-role list and section copy. Current recruiter must synthesize the precise target role and differentiator. The About prose adds human context but is long for an initial recruiter scan. Contact is available through the existing contact section and global navigation; existing actions include email, GitHub, and email copy. CV is not visibly linked and LinkedIn is not configured. Neither is introduced by this initiative.

No analytics, recruiter interviews, or funnel data are available. This baseline supports hierarchy/usability hypotheses only; it does not quantify recruiter conversion or interview outcomes.

## Technical reviewer journey: 3–5 minutes

Each lead case has a long-form narrative and preserves technical depth. HMS and Alquileres expose sections for Problem, Context and constraints, Architecture, Engineering decisions, Implementation, QA/validation, result, and evidence/limits. AI Commerce exposes its operating boundary, what the model can/cannot do, operational evidence, and what the project demonstrates. The titles, summaries, role/status metadata, stack, and repository are present near each case heading.

There is no single compact scan block that consistently brings problem, personal ownership, system/backend/data, validation/evidence, status/limitations, and repository/demo together before the narrative. The current headings provide a strong deep-read path once the reviewer enters a case; a compact overview should add wayfinding without replacing the narrative.

## Baseline information architecture and source map

| Visible content | Current source of truth |
| --- | --- |
| Home section order and composition | `src/components/HomePage.astro` |
| Role, opportunity copy, capabilities, experience, contact, localized labels | `src/data/site.ts` |
| Hero title and supporting proposition | `src/components/HomePage.astro` (`brandHero`) |
| About narrative | `src/data/humanStory.ts` |
| Home lead/secondary lists | `src/data/portfolioStories.ts` |
| Home case covers/media | `src/data/homepageProjectCovers.ts`, `src/data/projectMedia.ts` |
| Case role, status, repository, stack, summary, localized narrative | `content/projects/*.md`, `content/projects-en/*.md`; rendered by `src/components/ProjectPage.astro` |
| Locale-specific Home data selection | `src/pages/index.astro`, `src/pages/es/index.astro` |

The Home headings currently show the four primary cards followed by two secondary cards. All remaining cases are still published at their individual routes even when absent from this Home hierarchy. Full heading and section word-count inventory is in the linked metrics JSON.

## Lead evidence/status snapshot

| Lead | Visible role/status baseline | Repository | Public demo |
| --- | --- | --- | --- |
| HMS Cloudflare | Migration architecture, full-stack implementation, security and operational QA; “Technically validated migration; acceptance remains separate.” | `github.com/sjo1848/hms-cloudflare` | None |
| Alquileres Uspallata | Domain analysis, architecture and full-stack development; “Active development.” | `github.com/sjo1848/alquileres-uspa` | None; do not deploy a demo in this initiative |
| AI Commerce + HMS | Product architecture, development, evaluation and orchestration; Phase 2.6 under agentic validation. The story distinguishes controlled Phase 2.5 evidence from experimental/in-progress Phase 2.6. | `github.com/sjo1848/ai-commerce-platform` | None |

These status labels are project evidence boundaries, not claims of production acceptance or external customers. The initiative must retain these distinctions and must not invent dates, seniority, metrics, or outcomes.

## Technical baseline references

No source output changed between Issue #91’s release candidate and this #99 starting commit; PRs #97 and #98 changed documentation/evidence only. The most recent reproducible toolchain/Lighthouse/browser evidence is therefore [Issue #91 Increment 5 release-candidate report](./supported-build-toolchain-increment-5-release-candidate.md), with raw [island JavaScript measurements](../../artifacts/dependencies/supported-build-toolchain-increment-5-release-candidate/island-js-measurements.jsonl), [Lighthouse reports and config](../../artifacts/lighthouse/supported-build-toolchain-increment-5-release-candidate/), and [static SEO verification](../../artifacts/seo/supported-build-toolchain-increment-5-release-candidate/static-seo-verification.json).

That report records 94,062 B gzip initial JS on Home (5,938 B below the 100,000 B budget) and 95,343 B on HMS case routes (54,657 B below the 150,000 B case budget). Lighthouse CI passed its unchanged configured category assertions across 18 runs. It also records run variability: Home raw performance scores ranged 0.88–0.96, median 0.89; the Alquileres EN/ES lab LCP maxima were 2,650/2,747 ms. The existing configured assertion passed; these figures do not mean every raw run met the floor. CLS was 0 in the reported runs. Field CWV remains `NOT_YET_OBSERVABLE`.

## Baseline interpretation and I0 exit

The clearest evidenced opportunity is to reduce synthesis before the visitor reaches proof: state the approved role/value plainly, lead with exactly the three approved cases, keep all six other published cases accessible as secondary work, and provide a consistent fast scan at each lead case while retaining the deep technical narrative. This is a hierarchy hypothesis, not a measured conversion lift.

I0 evidence is persisted. Clean install and release QA pass at the baseline commit; visual capture is available for both locales and three viewport sizes; inherited regression evidence and JS/Lighthouse budgets are linked with caveats. No baseline evidence requires a material product decision beyond the approved Issue #99 contract. **I0: PASS.**

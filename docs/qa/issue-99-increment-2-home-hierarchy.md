# Issue #99 — Increment 2: Home recruiter hierarchy

## Contract and provenance

- Phase: BUILD — Increment 2.
- Baseline: `main` after I1 / PR #101 at `5bff81a`.
- Implementation commit: `782365f` (`feat: clarify issue 99 home proof hierarchy`).
- Objective: let a recruiter identify the approved role, differentiator, three strongest proofs and their current status within the initial Home scan, while keeping every case and the technical-review path discoverable.
- Local validation runtime: Node `24.21.0`, npm `11.19.0`.
- No dependency, lockfile, workflow, SEO metadata, canonical, published case-study content, CV, LinkedIn, demo, global React/architecture, or backend changes.

## Delivered

- Home EN/ES H1 now states the approved Full-Stack Software Developer role, with backend orientation and the already-approved operational-process differentiator directly below.
- Removed the long supporting paragraph and multi-step approach panel from the top hero; the more detailed method remains on the page for I4 to layer.
- Added a plain HTML proof index directly below the hero actions. It is generated from the same `primaryProjects` model as the case cards and exposes each lead title and current source status; all links are static and require no JS.
- Lead projects are exactly HMS Cloudflare → Alquileres Uspallata → AI Commerce + HMS. Only these three are in the primary section.
- All six other published cases remain visible in a separate “Additional work” section: UspaYa, GasFlow, Agentic Engineering Governance, HMS Elite, JM Soluciones Eléctricas, and Taco Loco Foodtrack.
- Home section order is Hero → Lead work → Capabilities → Experience → Method → About → Additional work → Contact.
- Adjusted Home hero scale/spacing for mobile and desktop. Stone / Andes Copper tokens and existing buttons are retained.
- Tightened bilingual selected-work summaries. No employment timeline, seniority, dates, metrics, outcomes, production claims, or new project facts were added.

## Source files and routes

| Area | Files |
| --- | --- |
| Home structure and static proof index | `src/components/HomePage.astro` |
| Project order, bilingual hierarchy copy | `src/data/portfolioStories.ts` |
| Presentation/content validation for exactly three primary and six secondary cases | `scripts/validate-content.mjs`, `scripts/validate-portfolio-presentation.mjs` |
| Browser behavior and information-order assertions | `tests/browser/home-information-hierarchy.spec.ts`, `tests/browser/project-card-mobile.spec.ts`, `tests/browser/responsive-matrix.spec.ts` |

Affected routes: `/` and `/es/`. Linked case routes and their content are unchanged.

## Validation results

- `npm run qa:release`: **PASS**. Bilingual content/presentation validators, Astro check (56 files, 0 errors/warnings/hints), 22-page static build, social/asset/SEO/UX/build/sitemap checks passed; 20 canonical sitemap URLs.
- `tests/browser/home-information-hierarchy.spec.ts`, Chromium: **6 passed** (EN/ES × 390/768/1440). Verifies exact role and section order, exactly three lead cards and six additional cards, exact bilingual proof titles/statuses, all quick links ≥44×44 px, and visible email contact.
- Hosted CI initially found Firefox rounding one 44 px target to 43.99997 px at 768 px. Raised the CSS minimum from 2.75rem to 2.8rem (44.8 px), preserving the target with rounding margin; targeted Firefox recheck: **6/6 passed**. This is bounded technical REWORK, not a product/layout decision.
- `tests/browser/accessibility-baseline.spec.ts`, Chromium axe WCAG 2.2 AA tags: **12 passed**, including both Home locales at 390 and 1440 px and the six existing priority-route scans; zero violations.
- `tests/browser/responsive-matrix.spec.ts`, Chromium: **36 passed** over Home/HMS/Alquileres EN/ES at 360/390/430/768/1024/1440 px. No overflow, console errors, or warnings observed. The full multi-browser/mobile profile remains enforced by hosted CI and the later full validation gate.
- `tests/browser/project-card-mobile.spec.ts`: **12 passed** — Chromium and Mobile WebKit, at 360/390/430 for EN/ES. Its Mobile Chromium profile is intentionally skipped by this pre-existing spec condition; the responsive matrix also checks all six route/width sets in Chromium.
- Hosted Lighthouse/release QA matrix for this PR: the two first CI runs failed only on the Firefox 43.99997 px target above; a new run with the CSS fix is required. Existing thresholds remain Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Do not infer a Lighthouse PASS until the hosted run completes.
- Browser warning about `NO_COLOR` combined with `FORCE_COLOR` appeared in the test runner environment only; the page console checks were empty.

## Bundle and performance

- No client component, React island, client-side import, hydration directive, dependency, or interaction changed. The same two islands remain (`MobileNavigation` and `CopyAction`) with the same component/renderer assets.
- Compared a clean static production build at baseline `5bff81a` to commit `782365f`: the Home route has the same 8-file imported JavaScript closure, the same 286,279 raw bytes / 91,951 B sum-of-per-file gzip, and the same 4,826 bytes of inline JS with identical compressed script sizes. The repository’s established island-aware measurement is **94,062 B gzip initial JS**, so I2 delta is **0 B**; Home remains 5,938 B under its 100,000 B budget. The HMS case baseline remains 95,343 B under 150,000 B; I2 does not touch case pages.
- Home’s linked CSS changed from 57,264 B raw / 12,035 B sum-of-file gzip at baseline to 58,799 B raw / 12,339 B gzip now: **+1,535 B raw / +304 B gzip**, from the responsive hero/proof-index styles. CSS remains static; no added runtime or client work.
- Field CWV remains `NOT_YET_OBSERVABLE`. Existing Lighthouse variability and route-level raw lab measurements are recorded in the [Issue #91 release-candidate report](./supported-build-toolchain-increment-5-release-candidate.md); hosted I2 Lighthouse results must be read from the PR check artifact when available.

## Visual evidence

- [Six curated Home/lead-proof captures and hash manifest](../../output/playwright/issue-99-increment-2/): Home ES/EN at 390×844 and 1440×900; lead-case group at 390 and 1440. The 390 px screenshots show role, backend direction, all three lead titles/statuses, and the existing contact/navigation affordance without relying on hover.
- [36-route viewport responsive capture set](../../artifacts/visual/issue-99-increment-2/): six priority routes × six widths, captured after the final source change.
- The manifest records viewport dimensions, byte sizes and SHA-256 for all 48 images (six curated captures, 36 route/viewport captures, and six CTA interaction captures).

## Scope limits and risks

- The new hero index repeats each case title/status once before the full cards to satisfy the scan goal; both instances derive from the same project collection entry, so there is one source of truth.
- Contact remains directly available in primary navigation and the existing Contact section. No CV or LinkedIn action was added.
- Case status labels are reused as authored. I5 owns any deeper evidence/provenance reconciliation; I3 owns the case quick-scan blocks.
- No performance budget, Lighthouse threshold, browser configuration, route, SEO metadata, or product case status was changed.

## Independent gates

- Independent Critic: **PASS** — independently verified the approved order, three/six project split, bilingual role/status index, 44×44 px links, static implementation, and all 48 screenshot paths/hashes. Confirmed no CV, LinkedIn, demo, or unsupported claims were added.
- Independent Critic re-review of Firefox rounding fix: **PASS** — 2.8rem guarantees 44.8 px minimum, leaves approved scope/behavior intact, and targeted Firefox passes 6/6.
- Integration Review: **PASS (scope-integrated)** — confirmed visual identity, source-of-truth consistency, all-case discovery, intentional bounded repetition, and JS/performance/accessibility evidence. The reviewer explicitly leaves the hosted release QA/Lighthouse gate pending; this report does not claim that hosted gate has passed.

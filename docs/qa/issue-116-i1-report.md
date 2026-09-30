# Issue #116 — I1 IA + content migration

## Gate

**I1: PASS** — ready for Controller review before I2.

This increment migrates Home structure, copy, and navigation only. The approved C+ visual foundation and signature motion remain out of scope for I1.

## Source state

- Repository: `sjo1848/portfolio-sebastian-ojeda`
- Branch: `build/issue-116-cplus-baseline`
- `origin/main`: `658a5506e88beecbe28c2f5ade4c2705c4ad59e8`
- Rebased I0 branch HEAD before I1: `2a596599f4ebf3079a3c8c9554c6767702fbf57e`
- I1 commit: recorded in Git after this report was prepared.
- No merge or deployment performed.

## Scope delivered

Home now follows the approved sequence:

`Hero → Selected Work → Operating Mindset → About → Additional Work → Contact`

The Hero contains the approved bilingual role and backend-oriented proposition, Work and CV actions, and lower-emphasis GitHub access. HMS media, lead-project roster, and project statuses were removed from the Hero. Operating Mindset replaces the separate Capabilities, Experience, and Method sections. About is shortened to the approved copy. Additional Work is a compact index of the six secondary cases. Navigation points to the current sections and CV. Project facts, status, evidence provenance, and normal anchor navigation are preserved.

No JavaScript island, dependency, package, lockfile, public project claim, or case-study content was added or changed for this increment. No-JS Home remains informative and navigable.

## Files changed

- `src/components/HomePage.astro`
- `src/components/SiteHeader.astro`
- `src/data/humanStory.ts`
- `src/data/portfolioStories.ts`
- `src/data/site.ts`
- `src/styles/branding.css`
- `src/styles/supporting-sections.css`
- `scripts/validate-content.mjs`
- `scripts/validate-portfolio-presentation.mjs`
- `tests/browser/home-capability-method.spec.ts`
- `tests/browser/home-information-hierarchy.spec.ts`
- `tests/browser/mobile-navigation.spec.ts`
- `tests/browser/project-card-mobile.spec.ts`
- `tests/browser/visual-excellence.spec.ts`
- `artifacts/visual/issue-116-i1/` (responsive and CTA captures plus manifest)
- `docs/qa/issue-116-i1-report.md`

## Test migrations

Tests that required the removed Capabilities, Experience, and Method sections were intentionally migrated to assert the new information architecture and Operating Mindset. Home hierarchy tests now check exact section order, bilingual copy, lead project order, statuses, all six secondary cases, navigation anchors, and widths from 360 through 1440 px. Visual Excellence checks now assert that the Hero has no media or project status roster, while retaining CV, accessibility, and reduced-motion checks. Project-card mobile assertions now target the three approved lead cases. Mobile navigation assertions use Work/Trabajo and confirm the CV action.

No tests were simply deleted.

## Commands and results

- `npm run validate:content` — PASS; bilingual required copy and content checks.
- `npm run validate:presentation` — PASS; approved Home structure, navigation, and project ordering.
- `npm run check` — PASS; 66 Astro files, 0 errors, 0 warnings, 0 hints.
- `npm run qa:release` — PASS; build generated 22 pages, content/presentation/Astro checks, social cards, static assets, social metadata, SEO/structured data, UX/accessibility, build validation, and sitemap validation all passed.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run test:browser -- tests/browser/home-capability-method.spec.ts tests/browser/home-information-hierarchy.spec.ts tests/browser/mobile-navigation.spec.ts tests/browser/project-card-mobile.spec.ts tests/browser/visual-excellence.spec.ts` — PASS; 195 cases, 122 passed, 73 intentionally skipped by browser-specific test annotations, 0 failed, across Chromium, Firefox, WebKit, mobile Chromium, and mobile WebKit.
- The targeted matrix covers Home EN/ES and no-JS navigation, 360/390/430/768/1024/1440 widths, mobile navigation keyboard/focus/locale behavior, 3 lead-case CTAs at 360/390/430, and reduced-motion/axe assertions where the tests are configured to run.
- `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` — Home initial client JS: **94,062 B gzip** on both `/` and `/es/`, under the 100,000 B budget; no I1 island or client JS was added.
- `git diff --check` — PASS.

The 850-case full browser suite is not claimed as passing. The gate evidence is the clean, targeted five-project I1 suite plus the repository release QA above.

## Visual evidence

Captures and the machine-readable manifest are in `artifacts/visual/issue-116-i1/`. The set includes Home EN/ES at 390 and 1440 px, no-JS Home EN/ES at 390 px, and lead ProjectCard CTA captures for EN/ES at 360, 390, and 430 px. Captured pages had no horizontal overflow or console errors. C+ typography/index composition and signature motion are intentionally deferred to later authorized increments.

## Truth, parity, and findings

- EN/ES section and copy parity: PASS.
- Claim/status truth and evidence provenance: preserved; no new claims or status inferences.
- Home section order and anchors: PASS.
- Home route and case-study links: covered by release validators and targeted browser checks; PASS.
- No-JS behavior: Home content and static anchors remain available; PASS.
- Known state: Selected Work retains its current card composition until its later contracted increment. This is planned sequencing, not a blocker for I1.

No I1 acceptance finding remains open. Stop here for Controller review; I2 is not started.

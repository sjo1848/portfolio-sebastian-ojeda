# Issue #116 — I6 lead case-study entry continuity

**Gate:** I6 PASS  
**Branch:** `build/issue-116-cplus-baseline`  
**Implementation commit:** `f5ee0736d8cb87bd09973c48578b6f39f41bebae`  
**Date:** 2026-09-30

## Scope delivered

The first viewports of HMS Cloudflare, Alquileres Uspallata, and AI Commerce + HMS now share the approved C+ case-entry grammar in EN and ES:

- a normal anchor back to Selected Work;
- a visible project index (`01 / 03` through `03 / 03`);
- category, large title and concise existing summary;
- factual status, role and year;
- repository link when the project provides one;
- the existing case evidence and core stack, with evidence images uncropped.

The visual treatment uses Stone / Andes Copper rules, whitespace and editorial grid structure. It removes the generic rounded panel treatment only from these three lead case entries. Secondary case pages retain their previous back-link location and presentation. No long-form case content, claim, evidence caption, limitation, link destination, media-viewer behavior or project status changed.

M5 View Transitions was left out: it is optional, and native transitions would add no necessary navigation capability here. The same ordinary anchors work in unsupported browsers, with JavaScript disabled, and through browser back/forward.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS; content/presentation validators, Astro check (74 files; 0 diagnostics), 22-page static build, SEO, social metadata, accessibility, build and sitemap validators passed |
| I6 case-entry responsive tests, five browser/device profiles | PASS across the 6 × 2 lead-route/localization matrix, including 390/1440 axe checks; 35 matrix/history tests passed in the initial run |
| No-JS history/evidence test | PASS after correcting the test to accept the four actual approved static Markdown images; all five browser/device profiles passed |
| Browser back/forward | PASS: Home → case → Home anchor, browser forward/back, and ordinary links |
| Existing HMS media viewer regression | PASS: 6 relevant tests passed in Chromium, WebKit and Mobile WebKit; 15 profile-specific skips |
| Responsive overflow/title geometry | PASS at 360, 390, 430, 768, 1024 and 1440 px for all three cases in EN/ES |
| Axe WCAG 2.2 AA | PASS at 390 and 1440 px for all six route/locale pairs |
| Console/page errors | Zero in the six-route responsive checks |
| Home JS gzip | 95,130 B in EN/ES; unchanged from I5 and below the 100,000 B cap |
| `git diff --check` | PASS |

The first no-JS assertion expected two HMS Markdown image links, while the current case contains four. The test was corrected to assert at least two static approved captures, then passed in Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. Product code required no rework for this test correction.

## Evidence

- EN/ES first-view screenshots at 390 and 1440, plus route/viewport manifest: [`artifacts/visual/issue-116-i6/`](../../artifacts/visual/issue-116-i6/)
- Responsive, back/forward, no-JS and axe test: [`tests/browser/issue-116-i6-case-entry.spec.ts`](../../tests/browser/issue-116-i6-case-entry.spec.ts)
- Existing media viewer regression: [`tests/browser/responsive-media-viewer.spec.ts`](../../tests/browser/responsive-media-viewer.spec.ts)

## Gate

**I6 PASS.** I7 remains authorized under Block D and is the next increment. No merge or deploy was performed.

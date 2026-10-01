# Issue #116 — C-F1 bounded motion timing correction

**State:** PASS  
**Scope:** Controller-directed timing correction only  
**Implementation commit:** `4350679e735a770072b8fad07ca0f3f5170c9c35`  
**Date:** 2026-09-30

## Authority and change

The latest Controller review accepted I3–I5 and identified that M3 had inherited M2's 380 ms duration. This correction keeps the approved M2 handoff at 380 ms, uses the existing 140 ms `--motion-fast` token for the M3 active rule/title, and leaves M4 at 260 ms. No product copy, scope, dependency, JavaScript, active-state behavior or motion concept changed.

Reduced-motion continues to remove the transitions and evidence animation immediately.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS; 73 Astro files, 0 diagnostics; 22 static pages and content/presentation/SEO/accessibility/sitemap release validators passed |
| `ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/issue-116-i5-interaction.spec.ts --project=chromium --project=firefox --project=webkit --project=mobile-chromium --project=mobile-webkit --workers=3` | PASS: 22 passed, 3 expected mobile-only skips |
| Motion timing assertions | PASS: M2 `0.38s`; M3 rule/title `0.14s`; M4 `0.26s` across all five browser/device profiles |
| Reduced motion | PASS: signature transitions `0s`, evidence animation `none`; keyboard active-state behavior remains available |
| `git diff --check` | PASS |

## Gate

`C-F1 PASS`. This is the separate correction commit required by the Controller. I6 and I7 remain authorized by the latest Controller comment; this report does not alter their contracts.

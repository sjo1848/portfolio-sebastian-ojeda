# Issue #116 — I5 Selected Work progressive interaction

**Gate:** I5 PASS — ready for Controller review  
**Branch:** `build/issue-116-cplus-baseline`  
**Implementation commit:** `57fdbaa3a082849d47e19fa874557540916deea`  
**Date:** 2026-09-30  
**Increment:** Block C, I5 only (M2–M4)

## Scope delivered

- **M2:** a one-time IntersectionObserver handoff reveals the Selected Work structural rule as the section enters view. If IntersectionObserver is unavailable, the accent stays visible.
- **M3:** pointer hover and keyboard focus activate the same editorial row and synchronize the evidence pane. Each project remains an ordinary link; touch users retain the inline mobile evidence and do not need hover.
- **M4:** the preview uses the already approved evidence asset, explicit dimensions, a stable frame and `object-fit: contain`. Images for non-active entries are fetched only after activation. Caption, role, stack, status and limitations change together. Projects without an image and failed image requests have honest text fallbacks.
- Motion is CSS/native browser behavior. `prefers-reduced-motion` disables the transitions and evidence reveal animation. No package, React island, store, route interception or new project claim was added.

## Bounded rework resolved

1. Cross-browser checks found a 1 px height change in the 768 px tablet evidence pane when the active project changed. The tablet pane now reserves its total height. The five browser/device profiles pass the unchanged-geometry test.
2. The I4 regression suite found duplicate `[data-evidence-caption]` and `[data-evidence-limitation]` selectors because row data and visible panel targets shared names. Row payloads now use `data-proof-*`; the panel retains the semantic `data-evidence-*` selectors. I4 regression checks pass after this correction.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS; content and presentation validators, Astro check (73 files; 0 errors/warnings/hints), 22-page build, metadata, SEO, UX/accessibility, build and sitemap validations passed |
| `ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/issue-116-i5-interaction.spec.ts --project=chromium --project=firefox --project=webkit --project=mobile-chromium --project=mobile-webkit --workers=3` | PASS: 22 passed, 3 expected skips (mobile-only test excluded in desktop projects) |
| I5 browser/device coverage | PASS: Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit; pointer/focus synchronization, tablet geometry, image failure, touch navigation, reduced motion and no-JS fallback |
| I5 axe checks | PASS: no WCAG 2.2 AA violations for active Alquileres and AI no-image states in EN; no violations for active Alquileres in ES |
| `ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/issue-116-i4-selected-work.spec.ts --project=chromium --project=firefox --project=webkit --project=mobile-chromium --project=mobile-webkit --workers=3` | PASS: 20 passed; bilingual order, normal links, focus, static evidence, mobile and no-JS regressions |
| Responsive / layout | PASS: mobile 390 px static inline state; tablet 768 px pane has invariant height while projects change; desktop 1440 px evidence states; no horizontal overflow at 768 px |
| Console and page errors | PASS: zero in interaction browser checks |
| `git diff --check` | PASS |

### JavaScript gzip

Measured with `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` after the final build:

| Route | I0 baseline | I5 | Delta | Limit |
|---|---:|---:|---:|---:|
| Home EN | 94,062 B | 95,130 B | +1,068 B | 100,000 B |
| Home ES | 94,062 B | 95,130 B | +1,068 B | 100,000 B |

The increment remains below both the Home hard cap and the motion delta target of +3,000 B gzip. No below-the-fold deferred chunk is added.

### Lighthouse

The committed Lighthouse configuration retains the established thresholds and three-run median aggregation. `@lhci/cli autorun --config=artifacts/lighthouse/lighthouserc.issue-116-i5.json` passed all category assertions.

| Route | Performance runs / median | Accessibility | Best Practices | SEO | LCP median | CLS |
|---|---|---:|---:|---:|---:|---:|
| `/` | 0.84, 0.97, 0.98 / **0.97** | 1.00 | 1.00 | 1.00 | 1,904 ms | 0 |
| `/es/` | 0.96, 0.95, 0.99 / **0.96** | 1.00 | 1.00 | 1.00 | 1,987 ms | 0 |

One English lab run was below the performance floor (0.84); the unchanged three-run median gate passes at 0.97. This run-to-run variance is recorded for Controller review. These are Lighthouse lab measurements, not field Core Web Vitals.

## Evidence

- I5 state screenshots and route/state/viewport manifest: [`artifacts/visual/issue-116-i5/`](../../artifacts/visual/issue-116-i5/)
- Six raw EN/ES Lighthouse reports and manifest: [`artifacts/lighthouse/issue-116-i5/`](../../artifacts/lighthouse/issue-116-i5/)
- Existing-threshold Lighthouse configuration: [`artifacts/lighthouse/lighthouserc.issue-116-i5.json`](../../artifacts/lighthouse/lighthouserc.issue-116-i5.json)
- Browser coverage: [`tests/browser/issue-116-i5-interaction.spec.ts`](../../tests/browser/issue-116-i5-interaction.spec.ts)
- Progressive enhancement: [`src/scripts/selected-work-enhancement.ts`](../../src/scripts/selected-work-enhancement.ts)

## Findings and gate

- No open implementation finding remains in I5 scope.
- A single Lighthouse EN performance run scored 0.84 while the existing median gate passes. The raw run is retained above for Controller visibility.
- No Independent Critic or Integration Review was requested for this increment gate; this report does not self-approve those later I8 verdicts.
- **I5 PASS.** I3, I4 and I5 remain separate implementation increments/commits. The combined Block C checkpoint is ready for Controller review. I6 has not started and remains blocked pending authorization.

# Issue #116 — Block C checkpoint (I3–I5)

**State:** I3 PASS / I4 PASS / I5 PASS — ready for Controller review  
**Branch:** `build/issue-116-cplus-baseline`  
**Current implementation HEAD:** `57fdbaa3a082849d47e19fa874557540916deea`  
**Date:** 2026-09-30

## Increment record

| Increment | Implementation commit | Result | Evidence |
|---|---|---|---|
| I3 — Hero kinetic system (M1) | `8268138ecd32471b68f727b7b2796dd2b4eb7d1a` | PASS | [I3 report](issue-116-i3-report.md), [screenshots](../../artifacts/visual/issue-116-i3/), [Lighthouse](../../artifacts/lighthouse/issue-116-i3/) |
| I4 — Selected Work editorial index | `877ea1f5c74deb725c694f1c1ff10e0cbe8e57b3` | PASS | [I4 report](issue-116-i4-report.md), [screenshots](../../artifacts/visual/issue-116-i4/) |
| I5 — Progressive interaction (M2–M4) | `57fdbaa3a082849d47e19fa874557540916deea` | PASS | [I5 report](issue-116-i5-report.md), [screenshots](../../artifacts/visual/issue-116-i5/), [Lighthouse](../../artifacts/lighthouse/issue-116-i5/) |

The three implementation increments are distinct commits. I3 and I4 evidence remains available alongside I5; their implementation and reports were not rewritten or squashed.

## Combined validation status

- I3: reduced-motion-safe CSS hero motion, EN/ES responsive clipping matrix and no-JS behavior passed; three-run Home Lighthouse medians passed the existing thresholds.
- I4: bilingual lead order, normal anchors, keyboard focus, mobile inline evidence and no-JS behavior passed; migrated editorial-index regression suites passed.
- I5: pointer and keyboard focus activate the same evidence; touch keeps normal navigation; evidence captions/roles/stacks/status/limitations synchronize; no-image and image-error states stay explicit; tablet pane height is stable; reduced motion and no-JS behavior pass.
- Latest `npm run qa:release`: PASS; 73 Astro files checked without diagnostics, 22 static pages generated, all content, presentation, build, SEO, social metadata, UX/accessibility and sitemap validators passed.
- I5 browser matrix: 22 passed, 3 expected project-specific skips across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit.
- I4 regression suite on the same five browser/device profiles: 20 passed.
- Axe: zero WCAG 2.2 AA findings in tested English and Spanish active evidence states.
- Home initial JS gzip: 95,130 B EN and ES, +1,068 B against I0 and within 100,000 B cap and +3,000 B motion delta target.
- Lighthouse three-run medians: EN performance 0.97, ES 0.96; accessibility, best practices and SEO 1.00 on both; LCP medians 1,904 ms EN / 1,987 ms ES; CLS 0.
- Reduced-motion, no-JS, image failure, touch navigation, keyboard focus, zero captured console/page errors: PASS.
- No dependencies, merge, deployment or I6 work introduced.

## Known review note

One English Lighthouse lab run scored 0.84; the other two scored 0.97 and 0.98, producing the contract-configured median 0.97. The unchanged median gate passes. The raw run is retained in the I5 Lighthouse evidence for Controller review; the run variance is not represented as field Core Web Vitals.

## Checkpoint boundary

I3–I5 are complete and ready for Controller review. I6 has not started. No merge or deployment was performed. The remote branch must contain the implementation commits and this checkpoint evidence before the checkpoint is handed over.

# Issue #129 — Build and QA checkpoint

**State:** `IMPLEMENTATION_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`
**Branch:** `build/issue-129-signature-motion`
**Base:** current `main`, `dea0e0cb56964700691669feb0c0158fbfa4508b`
**Release:** not merged or deployed.

## Implementation

- Replaced the opening Hero identity with the approved sequence: full `Sebastián Ojeda`, the S/O glyph travel, the exact thesis, the delayed signature, and the HMS/Selected Work handoff.
- Reused the existing `SiteHeader.astro` brand as the only persistent signature. There is no second name overlay or monogram.
- Kept Home sections in the required order: Hero → Selected Work → Operating Mindset → About → Additional Work → Contact. No project claims, status, or evidence were added.
- Implemented the motion as Astro markup, CSS, and a small native browser script. No dependencies or new React islands were added.
- Preserved static/no-JS content, anchor navigation, and a reduced-motion presentation without glyph travel.
- Updated presentation/content validators and migrated browser assertions that depended on the previous Home hierarchy. The superseded #127-specific browser test was replaced by Issue #129 coverage.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed. npm reported one high-severity audit finding and blocked the existing `esbuild@0.28.2` install script under its current allow-scripts policy; no dependency or lockfile changes were made. |
| `npm run qa:release` | PASS: bilingual content/presentation, Astro check (79 files, 0 errors/warnings/hints), static build (22 pages), asset/social/SEO/UX validators, build and sitemap (20 canonical URLs). |
| `npx playwright test tests/browser/issue-129-signature-motion.spec.ts --workers=3` | 42 passed, 48 skipped. The 48 are the six-width visual geometry cases across non-Chromium projects; those geometry cases ran in Chromium. Motion, no-JS, reduced-motion/axe, keyboard, persistent-header, and console/page-error checks passed across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. |
| Responsive geometry | EN and ES at 360, 390, 430, 768, 1024, and 1440 px in Chromium; no horizontal overflow or clipped identity/thesis bounds. |
| Reduced motion and accessibility | Static/reduced-motion state verified; axe WCAG 2.2 AA tags reported no violations. Keyboard CTA focus and anchor navigation passed. |
| Console | No console errors or uncaught page errors in the Issue #129 browser suite. |
| `git diff --check` | Passed. |

## Performance evidence

The initial Home JavaScript is **96,644 B gzip** for EN and ES, against the unchanged 100,000 B hard cap. The measured delta from the #127 Home baseline (95,239 B) is **+1,405 B gzip**. Case study initial JS is 95,343 B; visible deferred gallery chunks are measured separately by the existing budget script.

Lighthouse used two consecutive three-run collections with the repository's existing score thresholds unchanged. Raw reports and settings are retained under [`artifacts/lighthouse/issue-129/`](../../artifacts/lighthouse/issue-129/); the six-run route summary is [`summary.json`](../../artifacts/lighthouse/issue-129/summary.json).

| Route | Performance median (range) | LCP median (range) | CLS median (range) |
|---|---:|---:|---:|
| Home EN `/` | 0.93 (0.78–1.00) | 1,676 ms (1,617–2,218) | 0.000 (0–0) |
| Home ES `/es/` | 0.96 (0.85–1.00) | 2,006 ms (1,601–2,206) | 0.000 (0–0) |
| HMS Elite `/projects/hms-elite/` | 0.905 (0.71–0.98) | 2,426 ms (2,276–2,780) | 0.000 (0–0.0016) |

Accessibility, Best Practices, and SEO scored 1.00 in every retained run. Performance varied materially between lab runs, including on the unchanged HMS Elite route; the table reports all six-run ranges alongside medians. The pooled route medians meet the existing 0.90 Performance floor, but individual runs fell below it. Field Core Web Vitals remain unmeasured. No threshold was relaxed. The first implementation measurement exposed CLS 0.611; layout geometry was reserved before hydration and later measurements returned CLS 0.000 on both Home routes.

## Screenshot and report artifacts

Nine Chromium screenshots cover the EN desktop identity, glyph travel, thesis formation, persistent signature, and HMS handoff; EN reduced-motion Home; and ES mobile identity, travel, and resolved signature. Viewports are 1440×1000 for desktop sequence captures and 390×844 for mobile. File hashes and states are in [`manifest.json`](../../output/playwright/issue-129-signature-motion/manifest.json).

## Deviations and review boundary

No product-direction or scope deviations were made. Performance lab-run variability is the only material measurement limitation and is fully exposed above and in the raw reports. The existing npm audit/install-script notices are unchanged toolchain findings, not introduced or fixed by this issue.

The implementation is ready for independent Controller visual review. This checkpoint does not claim Controller/Independent Critic approval and does not authorize merge or deployment.

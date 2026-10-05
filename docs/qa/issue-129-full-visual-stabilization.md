# Issue #129 — Full visual stabilization checkpoint

**State:** `FULL_VISUAL_STABILIZATION_COMPLETE / HUMAN_REVIEW_READY`
**Branch:** `build/issue-129-signature-motion`
**No merge or deployment performed.**

## What changed

The final stabilization pass retained the approved motion concept and copy while correcting the measured collisions and responsive failure states:

- S/O now complete their travel before the thesis resolves. This removes overlap between the moving glyphs and the live headline.
- Tablet/mobile use shallow opposing arcs for S and O. The sampled 768 px tablet path had a measurable glyph intersection before this adjustment.
- The proof handoff starts after thesis resolution. On desktop, it still transfers the existing HMS evidence image node and settles against its real Selected Work frame.
- A desktop proof transferred before resizing now returns to Selected Work and the mobile Hero displays its static fallback when the sequence is replayed.
- The F5 module-failure, no-JavaScript, and reduced-motion layouts return to normal document flow so the identity and primary action stay readable below the persistent header.
- The test for proof convergence measures the real target frame while the shared image is temporarily represented there by its layout-preserving placeholder.

No dependency, claim, copy, IA, or interaction concept was added or changed.

## Visual and responsive verification

The continuous-scroll adversarial test samples forward, reverse, dense, and boundary replay progress; checks element collisions and viewport containment; and captures the sequence states. Chromium passed all **14** locale/viewport combinations:

| Viewport | English | Spanish |
|---|---:|---:|
| 1440 × 900 | PASS | PASS |
| 1366 × 768 | PASS | PASS |
| 1024 × 768 | PASS | PASS |
| 768 × 1024 | PASS | PASS |
| 430 × 932 | PASS | PASS |
| 390 × 844 | PASS | PASS |
| 360 × 640 | PASS | PASS |

The 360 px viewport is the shortest mobile treatment; the 768 px portrait tablet was the previously observed S/O collision case. Current sampling reports no text/glyph collision, horizontal overflow, or viewport escape.

Screenshots and per-viewport manifests are in [`output/playwright/issue-129-visual-stabilization/`](../../output/playwright/issue-129-visual-stabilization/). This archive contains seven states per locale/viewport. Key F4 and F5 screenshots are in [`output/playwright/issue-129-signature-motion/`](../../output/playwright/issue-129-signature-motion/), including `f4-mobile-fallback-after-rewind.png` and `f5-static-fallback-1366x768.png`.

## Motion, fallback, and adversarial regression results

- `tests/browser/issue-129-signature-motion.spec.ts`: **51 passed, 24 intentionally skipped** across Chromium, Firefox, and WebKit. Skips are browser/profile-specific cases excluded by the spec.
- `tests/browser/issue-129-visual-stabilization.spec.ts`: **20 passed, 60 intentionally skipped** across the three desktop engines and two mobile profiles. The full collision matrix is intentionally Chromium-only; F4/F5 passed in Chromium, Firefox, and WebKit.
- Targeted mobile-profile checks: **8 passed, 4 skipped** across Mobile Chrome and Mobile WebKit, including Spanish sequence containment, persistent header, no-JS, and reduced-motion static story.
- Rewinding from `entering`, during active FLIP, during target delay, and replaying forward passed. The existing same-node proof transfer, stale-completion cancellation, resize/orientation during transfer, hash-entry, reduced-motion terminal behavior, keyboard access, and F5 fallback are covered by the suite.
- The failed test run from the earlier three-worker global suite produced 746 passes, 372 skips, and 27 timeouts/failures. The named failures were retried under one worker: copy/axe/error feedback, proof navigation/evidence, HMS/Alquileres/AI case quick scans, I5 hover/reduced motion, I6 history, and the 360 px mobile navigation all passed. The relevant retries totaled 43 passes, 18 passes, 32 passes, and 2 passes respectively; the Issue #129 suite and visual matrix were also rerun separately. No unresolved product regression remains. A clean, single-invocation full repository browser-suite result is not claimed.
- Browser console/page errors were checked by the affected specs; no reproducible console or page errors remained in the focused runs.

## QA and performance

- `npm run qa:release`: **PASS**. Content and presentation validation pass; `astro check` reports 0 errors/warnings/hints across 81 files; 22 pages build; static assets, metadata, structured data, UX/accessibility, sitemap, and build validations pass.
- Lighthouse CI: **9/9 runs passed unchanged thresholds** on Home EN, Home ES, and HMS Elite. Minimum category scores across the nine runs: Performance **0.96**, Accessibility **1.00**, Best Practices **1.00**, SEO **1.00**.
- Home LCP medians: EN **1.70 s**, ES **1.97 s**; CLS **0** in all nine runs. HMS Elite LCP median: **2.27 s**. One HMS Elite run measured 2.72 s; its three-run median remains below 2.4 s.
- Home initial client JavaScript: **99,146 B gzip** against the unchanged **100,000 B** limit (854 B remaining). The recorded pre-final reading was 99,137 B, a 9 B delta.
- No animation dependency was added.

Full Lighthouse reports are in [`artifacts/lighthouse/issue-129/reports/`](../../artifacts/lighthouse/issue-129/reports/); the exact JS resource and inline-script accounting is in [`home-initial-js-budget.json`](../../output/playwright/issue-129-visual-stabilization/home-initial-js-budget.json).

## Commands executed

- `npm run build`
- `npm run qa:release`
- `npx playwright test ... tests/browser/issue-129-signature-motion.spec.ts --project=chromium --project=firefox --project=webkit --workers=1`
- `npx playwright test ... tests/browser/issue-129-visual-stabilization.spec.ts --project=chromium --project=firefox --project=webkit --project=mobile-chromium --project=mobile-webkit --workers=1`
- Targeted low-concurrency reruns for previously timed-out copy, quick-scan, navigation, reduced-motion, and mobile-navigation cases.
- `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/issue-129/lighthouserc.json`

The local `playwright.config.ts` starts a daemonized Astro preview and exits early in this environment. Browser reruns used a temporary config that reused the already-running preview; the canonical Playwright configuration was not changed.

## Remaining boundary

This checkpoint is ready for Human Visual Review. The broad repository browser suite had timeouts under its three-worker run; every previously named failing area was retried successfully at low concurrency, but the broad suite was not rerun end-to-end. No merge, deployment, or production change was made.

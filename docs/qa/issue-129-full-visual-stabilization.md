# Issue #129 — Full visual stabilization checkpoint

**State:** `LIVE_MOTION_STABILIZATION_COMPLETE / HUMAN_FINAL_REVIEW_READY`
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

## Live scroll-linked motion final addendum — 2026-10-05

The Controller clarification is now implemented and verified: the Hero has a stable identity on initial load and does not autoplay. All choreography is derived from scroll progress. Reduced motion intentionally retains the static identity and navigation. Slow scrolling visibly moves S/O, resolves the full thesis, reveals the persistent existing SiteHeader signature, and transfers the same HMS proof node. Large scroll changes can skip stages and settle directly into a coherent composition; they do not replay or leave stale intermediate layers behind.

Fast/reverse jump coverage asserts the exact paths `0→.40`, `.10→.60`, `.30→.80`, `0→1`, and `.85→.25`. The reverse landing inside the travel range is normalized to the identity composition; the existing Selected Work image remains its only proof node. New tests cover continuous motion with transitions enabled, fast/reverse landings, breakpoint changes (F6), and runtime reduced-motion normalization (F7).

Latest browser evidence:

- Live motion suite: **20/20 PASS** in Chromium, including EN/ES slow-scroll states at 1366×768, 1024×768, 390×844 and 360×640; the five exact jump/reverse cases at those widths; F6; F7; and EN desktop / ES mobile video recordings.
- Critical cross-browser live subset: **22 PASS, 28 profile-specific skips** across Chromium, Firefox and WebKit. Firefox and WebKit ran desktop/tablet transition boundaries, F6 and F7; those project profiles intentionally skip unsupported viewport cases.
- Existing motion regressions: **33/33 PASS** across Chromium, Firefox and WebKit after updating the slow-scroll helper to synchronize each increment against the rendered scroll progress. This includes rewind/delay/FLIP, keyboard, no-JS, reduced-motion and resize/orientation cases.
- Geometry/adversarial matrix: all **14 EN/ES viewport scenarios PASS** in Chromium, plus F4 and F5 PASS. Two desktop cases first hit a Playwright trace-artifact `ENOENT` when run concurrently; both passed when isolated and rerun. There is no remaining visual assertion failure.
- Lighthouse CI: **9/9 assertions PASS** with the existing thresholds. Home EN/ES Performance medians are 1.00/1.00, LCP medians 1.755 s/1.675 s, and CLS 0. HMS Elite Performance median is 0.98, LCP median 2.277 s, and CLS 0. Accessibility, Best Practices and SEO scored 1.00 in every run. Raw reports are in [`reports/`](../../artifacts/lighthouse/issue-129/reports/).
- Home initial client JavaScript: **99,576 B gzip**, below the unchanged 100,000 B cap by 424 B. No dependency was added.

The current live evidence is in [`output/playwright/issue-129-live-motion/`](../../output/playwright/issue-129-live-motion/), including EN/ES transition-enabled screenshots, per-viewport manifests, reduced-motion normalization, and `recordings/en-1366x768-slow-fast-reverse.webm` / `recordings/es-360x640-slow-fast-reverse.webm`. Exact bundle accounting is in [`home-initial-js-budget.json`](../../output/playwright/issue-129-live-motion/home-initial-js-budget.json). `npm run qa:release` passed after the final runtime changes; no merge or deployment was performed.

Commands for this final addendum:

- `npx playwright test --config=playwright.issue129-live.config.ts tests/browser/issue-129-live-motion.spec.ts --project=chromium --workers=2`
- `npx playwright test --config=playwright.issue129-live.config.ts tests/browser/issue-129-live-motion.spec.ts --grep "real-transition|F6 breakpoint|F7 runtime" --workers=2`
- `npx playwright test --config=playwright.issue129-live.config.ts tests/browser/issue-129-signature-motion.spec.ts --project=chromium --project=firefox --project=webkit --workers=1 --grep "reduced motion|desktop-to-mobile resize|desktop S/O travel|rewind|no-JS|keyboard"`
- `npx playwright test --config=playwright.issue129-live.config.ts tests/browser/issue-129-visual-stabilization.spec.ts --project=chromium --workers=2`, followed by isolated `--workers=1` retries for the two desktop rows whose parallel run hit Playwright trace-artifact `ENOENT`.
- `npm run qa:release`
- `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/issue-129/lighthouserc.json`

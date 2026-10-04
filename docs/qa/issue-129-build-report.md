# Issue #129 — Bounded rework checkpoint

**State:** `REWORK_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`
**Branch:** `build/issue-129-signature-motion`
**Original implementation reviewed:** `181bb5572c864db2fa7aa63e07a742b1aa05751e`
**No merge or deployment performed.**

## R1 — Hero → HMS proof takeover

After the thesis resolves and the existing SiteHeader name appears, the approved HMS Cloudflare regression capture enters the Hero stage. The takeover has entering, dominant, settling, and settled phases. Its image, caption, provenance classification, and limitation come from the existing approved portfolio evidence model. The image source is assigned only when the sequence reaches the proof boundary; the initial viewport keeps the bridge hidden and does not request that image through the new bridge.

The bridge uses the same approved asset as the existing first Selected Work evidence pane. The existing Selected Work hierarchy and layout remain intact; once the Hero completes, that pane presents the same HMS artifact in its normal position. Tests compare asset URLs, intrinsic dimensions, visible bounds, and the horizontal position/size of the bridge and settled pane.

## R2 — S/O travel composition

- The complete source name now recedes as one unit during detachment, reaching its hidden state shortly after travel begins. It no longer leaves a long-lived `ebastián jeda` fragment.
- Both destination initials and the remaining `oftware` / `perations` fragments stay visually hidden until the S/O glyphs arrive. The arriving glyphs then complete the full destination words.
- Mobile source and thesis geometry use a 12 px inner inset; browser tests require both flying glyphs to remain at least 10 px from the viewport edge.
- Spanish mobile evidence now shows the two travelling glyphs without premature partial destination words.

## R3 — Evidence and regression tests

Sixteen Chromium screenshots are retained in [`output/playwright/issue-129-signature-motion/`](../../output/playwright/issue-129-signature-motion/) with hashes and viewport/state details in its manifest. Coverage includes opening identity; S/O travel; thesis assembly; resolved thesis and persistent signature; proof entering, dominant, and settling; the image settled in Selected Work; Spanish mobile travel and settled proof; the persistent brand over the dark Operating Mindset section; and reduced motion.

The updated browser contract validates the actual bridge presentation and approved HMS artifact, including localized provenance/limitations, visible geometry, asset identity, completed image load, and alignment with the existing Selected Work evidence pane. Initial/no-JS/reduced-motion checks confirm the bridge remains hidden without motion JavaScript and the original static proof route is preserved.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS: bilingual content and presentation; Astro check 79 files, zero diagnostics; 22-page static build; assets, social metadata, SEO, UX/accessibility and sitemap validators. |
| Full Issue #129 Playwright matrix | `42 passed, 48 skipped` across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. The skipped cases are the 12 EN/ES six-width geometry checks repeated for four non-Chromium projects; geometry ran in Chromium. Console errors, uncaught page errors, interaction, no-JS, reduced-motion/axe, keyboard and the proof handoff passed. |
| Focused responsive and sequence check | `14 passed` in Chromium across the 12 responsive widths plus desktop and Spanish-mobile sequence tests. After adding the explicit settled-pane alignment assertion, both focused sequence tests passed again in Chromium (`2 passed`). |
| Lighthouse CI | `@lhci/cli 0.15.1` autorun exited 0. Existing thresholds were unchanged: Performance ≥ 0.90; Accessibility, Best Practices and SEO ≥ 0.95. All 9 runs passed. The CLI was used from the existing local npm cache; no project dependency was added. |
| Home initial JavaScript | 96,830 B gzip EN/ES. Delta from the #127 baseline (95,239 B): +1,591 B, under the unchanged 100,000 B cap and within the +3,000 B motion target. |
| HMS case-study initial JS | 95,343 B gzip; visible-deferred media remains separately measured at 12,553 B. |
| `git diff --check` | PASS. |

### Lighthouse rework runs

Three runs per route, using the unchanged repository assertions. Values below are medians with observed ranges:

| Route | Performance | Accessibility / BP / SEO | LCP | CLS |
|---|---:|---:|---:|---:|
| Home EN `/` | 0.98 (0.97–0.99) | 1.00 / 1.00 / 1.00 | 2,050 ms (1,974–2,112) | 0.000 |
| Home ES `/es/` | 0.97 (0.94–0.98) | 1.00 / 1.00 / 1.00 | 2,131 ms (2,095–2,164) | 0.000 |
| HMS Elite `/projects/hms-elite/` | 0.98 (0.93–0.98) | 1.00 / 1.00 / 1.00 | 2,279 ms (2,265–3,098) | 0.000 |

Raw reports are under [`artifacts/lighthouse/issue-129/reports-rework/`](../../artifacts/lighthouse/issue-129/reports-rework/), with unchanged configuration in `lighthouserc-rework.json` and per-run summary in [`summary.json`](../../artifacts/lighthouse/issue-129/summary.json). These are lab results; field Core Web Vitals are not claimed.

## Scope and review boundary

No dependency, project claim, status, evidence artifact, Home IA, or product direction changed. The original review's acceptable Lighthouse variability was remeasured and the current three-run route sets pass the existing thresholds. No Independent Critic or Controller approval is claimed by the implementer.

Ready for Controller visual review at `REWORK_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`.

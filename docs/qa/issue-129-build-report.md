# Issue #129 — Bounded rework checkpoint

**State:** `R1B_REWORK_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`
**Branch:** `build/issue-129-signature-motion`
**Original implementation reviewed:** `181bb5572c864db2fa7aa63e07a742b1aa05751e`
**No merge or deployment performed.**

## R1 — Hero → HMS proof takeover (R1B complete)

Desktop now hands off one shared proof object: the existing `[data-evidence-image]` DOM image from the first HMS Selected Work evidence frame. At the approved proof boundary, the same node moves into the Hero bridge; there is no second visible copy of the HMS capture. A dimensioned placeholder preserves the Selected Work frame while the node is in transit, and Selected Work row activation waits until the object returns.

The visual sequence is spatial: `entering` moves in from the Hero composition, `dominant` expands to a full-stage evidence moment, and `settling` measures the real Selected Work target's x-position and width. At the end of the Hero's native scroll sequence, the same image is portaled as a fixed visual object so the Hero's clipping boundary cannot cut it off. Normal page scrolling continues. When the real HMS target frame enters the viewport and approaches the proof object's settled position, a FLIP transform uses the measured source and destination rectangles; only after convergence does that same node return to the target frame. The test records the maximum final geometry error and requires it to be ≤1 px before the object is restored to normal flow.

Mobile keeps the simpler existing bridge behavior; the desktop takeover is not forced into the 390 px layout. No-JS and reduced-motion paths leave the original static Selected Work image in its server-rendered frame. The approved HMS caption, evidence classification, provenance and limitations remain intact.

## R2 — S/O travel composition

- The complete source name now recedes as one unit during detachment, reaching its hidden state shortly after travel begins. It no longer leaves a long-lived `ebastián jeda` fragment.
- Both destination initials and the remaining `oftware` / `perations` fragments stay visually hidden until the S/O glyphs arrive. The arriving glyphs then complete the full destination words.
- Mobile source and thesis geometry use a 12 px inner inset; browser tests require both flying glyphs to remain at least 10 px from the viewport edge.
- Spanish mobile evidence now shows the two travelling glyphs without premature partial destination words.

## R3 — Evidence and regression tests

Eighteen Chromium screenshots are retained in [`output/playwright/issue-129-signature-motion/`](../../output/playwright/issue-129-signature-motion/) with hashes and viewport/state details in its manifest. The R1B captures show desktop proof entering, dominant, settling, alignment over the actual Selected Work target, and the first completed target frame. Existing R2/R3 screenshots were restored to their previously approved versions; they were not regenerated as part of this bounded repair.

The browser contract asserts DOM identity between the Hero bridge and the actual Selected Work evidence image, approved source and intrinsic dimensions, localized provenance/limitations, native-scroll transfer, and ≤1 px convergence against the real target frame before normal-flow restoration. Initial/no-JS/reduced-motion checks confirm the bridge remains hidden without motion JavaScript and the original static proof route is preserved.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS: bilingual content and presentation; Astro check 79 files, zero diagnostics; 22-page static build; assets, social metadata, SEO, UX/accessibility and sitemap validators. |
| Full Issue #129 Playwright matrix | `42 passed, 48 skipped` across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. The 48 skips are the EN/ES six-width geometry checks annotated Chromium-only; geometry ran in Chromium. Console/page errors, no-JS, reduced motion, keyboard and proof handoff passed. |
| Final R1B cross-browser handoff | `5/5 passed` for the desktop handoff in Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit. It verifies the same DOM image node, viewport approach, real target bounds, completion, and stored convergence error ≤1 px. |
| Lighthouse CI R1B | `@lhci/cli 0.15.1` autorun exited 0. Existing thresholds were unchanged: Performance ≥ 0.90; Accessibility, Best Practices and SEO ≥ 0.95. All 9 runs passed. Raw reports and the unchanged-threshold config are under [`artifacts/lighthouse/issue-129/reports-r1b/`](../../artifacts/lighthouse/issue-129/reports-r1b/). No project dependency was added. |
| Home initial JavaScript | 95,804 B gzip-equivalent EN/ES: 94,594 B across 9 fetched script assets plus 1,210 B gzip-equivalent for the inline module. This is 4,196 B below the unchanged 100,000 B cap. No dependency was added. |
| HMS case-study initial JS | 95,343 B gzip; visible-deferred media remains separately measured at 12,553 B. |
| `git diff --check` | PASS. |

### Lighthouse rework runs

Three runs per route, using the unchanged repository assertions. Values below are medians; every run met every category threshold:

| Route | Performance | Accessibility / BP / SEO | LCP | CLS |
|---|---:|---:|---:|---:|
| Home EN `/` | 1.00 (1.00–1.00) | 1.00 / 1.00 / 1.00 | 1,670 ms (1,661–1,690) | 0.000 |
| Home ES `/es/` | 0.99 (0.99–1.00) | 1.00 / 1.00 / 1.00 | 1,977 ms (1,665–1,997) | 0.000 |
| HMS Elite `/projects/hms-elite/` | 0.98 (0.97–0.99) | 1.00 / 1.00 / 1.00 | 2,269 ms (2,265–2,575) | 0.000 |

Raw R1B reports are under [`artifacts/lighthouse/issue-129/reports-r1b/`](../../artifacts/lighthouse/issue-129/reports-r1b/), using unchanged category thresholds from `lighthouserc-r1b.json`. These are lab results; field Core Web Vitals are not claimed.

## Scope and review boundary

No dependency, project claim, status, evidence artifact, Home IA, or product direction changed. The original review's acceptable Lighthouse variability was remeasured and the current three-run route sets pass the existing thresholds. No Independent Critic or Controller approval is claimed by the implementer.

Ready for Controller visual review at `R1B_REWORK_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`. R2 and R3 remain at their prior Controller PASS boundary and were not reopened.

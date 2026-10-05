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

## Integration hardening — PR #130

**Current boundary:** `INTEGRATION_HARDENING_COMPLETE / AWAITING_FINAL_REVIEW` (PR checks rerun after this commit).

The approved design and prior R1/R2/R3 decisions were kept intact. Integration hardening addressed only the runtime/CI blockers recorded in the latest Integration Review:

- A `prefers-reduced-motion` change during the image FLIP now cancels the pending hold/animation and restores the same shared image node to the original Selected Work frame. Crossing below the 48rem desktop handoff breakpoint does the same cleanup before the mobile layout takes over. New browser regressions pause the proof FLIP deterministically mid-animation, then exercise both changes and verify node identity, portal cleanup, no running animation, and no ownership leak.
- Browser history traversal to `/#projects` now reasserts native fragment visibility after the browser's history scroll restoration when the target is outside the viewport. Anchors and history entries remain native.
- The C+ thesis receives a slightly narrower tablet measure at 768–832px so Firefox line geometry stays inside the viewport without a test tolerance.
- The short mobile navigation test waits for the sheet's entry state to settle before measuring the real panel bounds. Its 360×640 containment requirement is unchanged.
- Mobile WebKit's C5 proof-state test uses keyboard focus (the supported non-hover path) for the active Alquileres row. The I5 interaction axe checks target the changed Selected Work region; full-page WCAG checks remain in the baseline accessibility suite. The fallback test uses `domcontentloaded`, keeps the image-error and case-link assertions, and captures its representative screenshot in Chromium only.

### Hardening validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS after hardening changes: content/presentation validation; Astro check, 79 files and zero diagnostics; 22-page static build; asset, social metadata, SEO, UX/accessibility and sitemap validators. |
| Complete Playwright matrix | 1,105 tests executed across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit: 751 passed, 352 contract skips, and two Mobile WebKit timeouts in the I5 interaction suite. The two timeouts were corrected without reducing behavior assertions; the complete affected Mobile WebKit I5 file then passed 5/5. The complete PR CI rerun is the final matrix gate. |
| Fragment history regressions | PASS in Chromium and Mobile Chromium; Firefox, WebKit and Mobile WebKit also passed in the full run. |
| Hero 768px geometry | PASS in Firefox after tightening the tablet thesis measure; no overflow allowance was added. |
| Reduced-motion mid-FLIP / desktop→mobile mid-FLIP | Both new deterministic regressions passed in Chromium, Firefox and WebKit; the breakpoint case also passed in both mobile browser projects. |
| Mobile nav short viewport | PASS at 360×640 in Chromium and Mobile WebKit; actual panel remains within both viewport dimensions. |
| Lighthouse CI `npx --yes @lhci/cli@0.15.1 autorun` | PASS with unchanged thresholds (Performance ≥0.90; Accessibility, Best Practices and SEO ≥0.95). Representative scores: Home EN 0.99/1/1/1, Home ES 1/1/1/1, HMS Elite 0.99/1/1/1. Representative LCP: 2,001ms / 1,670ms / 2,266ms; CLS 0. Raw nine reports and the representative manifest are in [`reports-integration-hardening/`](../../artifacts/lighthouse/issue-129/reports-integration-hardening/). One non-representative Home EN lab run scored 0.78 Performance; the representative run selected by LHCI and the unchanged CI assertion passed. |
| Home initial JavaScript | **95,426 B gzip** EN/ES, 4,574 B below the unchanged 100,000 B cap. HMS case study remains 95,343 B; visible-deferred gallery chunks remain separately measured at 12,553 B. |
| `git diff --check` | PASS before checkpoint commit. |

No dependency, product claim, project status, evidence source, section order, UX direction, budget or Lighthouse threshold changed. No merge or deployment was performed. PR #130 remains the review target; final status is pending the post-push PR CI run.

## Final Independent / Integration Review findings — F1 and F2

**Scope:** only the two final-review findings were addressed. Earlier design, R1, R2 and R3 approvals remain untouched.

- **F1 — hash entry:** on `/#projects` and `/es/#projects`, startup now clears the pending-motion bootstrap, exposes the existing SiteHeader signature, sets the Hero to its static state, and reasserts the native fragment target after layout settles. Direct entry and return from the HMS case study are covered in both languages. The Selected Work target remains in view, the stage is not sticky, and no second signature is introduced.
- **F2 — reduced motion terminal state:** named resize, orientation, and breakpoint handlers now share a terminal `motionDisabled` gate. When reduced motion becomes active, those handlers are removed, pending animation work is canceled, and subsequent viewport changes cannot restore `data-hero-motion-pending` or restart the sequence. The same Selected Work image node remains in its original frame.

### Final findings evidence and validation

| Check | Result |
|---|---|
| New F1 direct-fragment/case-return test | PASS for EN and ES in Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. |
| New F2 reduced-motion → resize → orientation test | PASS in Chromium, Firefox, and WebKit; intentionally skipped in the two mobile projects because it begins at a desktop viewport. Existing mid-FLIP reduced-motion and desktop→mobile tests remain unchanged. |
| `npm run qa:release` | PASS: content and presentation checks, Astro check (79 files, zero diagnostics), build, assets, social metadata, SEO, accessibility, sitemap. |
| Full local `npm run test:browser` | 756 passed, 354 expected project/contract skips, 5 timeouts, across the configured five projects. The five timed-out cases were existing WebKit/Mobile WebKit axe/navigation tests, not F1/F2. Re-running those exact cases serially with `--workers=1` passed 10/10. The isolated rerun indicates runner contention; no unrelated test behavior or timeout threshold was changed. Hosted PR CI remains the final matrix gate. |
| Lighthouse CI `npx --yes @lhci/cli@0.15.1 autorun` | PASS: all 9 runs cleared the unchanged floors (Performance ≥0.90; Accessibility, Best Practices and SEO ≥0.95). Representative EN / ES / HMS Elite scores: 0.98 / 1.00 / 0.98 Performance, and 1.00 for all other categories. Representative lab LCP: 1,996 ms / 1,716 ms / 2,274 ms; CLS 0. Raw reports and summary: [`reports-final-findings/`](../../artifacts/lighthouse/issue-129/reports-final-findings/). |
| Home initial JS gzip | 95,426 B EN and ES, unchanged and 4,574 B below the 100,000 B cap. |
| `git diff --check` | PASS before final commit. |

Screenshots: [`artifacts/visual/issue-129-final-findings/`](../../artifacts/visual/issue-129-final-findings/) captures EN and ES `#projects` entry and reduced-motion after resize/orientation. No threshold, dependency, product claim, design decision, or release behavior changed. No merge or deploy was performed.

**Post-push status:** pending the complete hosted PR #130 checks. Target stop state remains `FINAL_CRITIC_FINDINGS_RESOLVED / PR_CI_GREEN / AWAITING_MERGE_AUTHORIZATION`; no merge or deployment is authorized in this checkpoint.

## Final Merge Authorization finding — F3 rewind restoration

**Scope:** only F3 was addressed. The approved design and F1/F2 findings were not reopened.

- When the proof handoff rewinds to a null stage, any pending delay, animation frame, or WAAPI FLIP is canceled and invalidated. The same HMS image node is restored to its actual Selected Work frame, original lazy-loading state is restored, transient handoff attributes/styles and placeholder are removed, the portal is cleared, and the bridge is hidden. The node is re-armed for a later sequence replay.
- Added regressions for rewind below the `entering` boundary and rewind during a paused active FLIP. Both assert node identity, real frame ownership, canceled animation/portal/placeholder cleanup, and that hovering the Alquileres row subsequently updates the visible evidence on that same node.
- Chromium, Firefox, and WebKit passed both regressions (6/6); screenshots are retained in [`artifacts/visual/issue-129-final-findings/`](../../artifacts/visual/issue-129-final-findings/) as `f3-rewind-entering-restored.png` and `f3-rewind-flip-restored.png`.

| Check | Result |
|---|---|
| `npm run qa:release` | PASS: content/presentation checks, Astro check (79 files; zero diagnostics), 22-page build, asset, social metadata, SEO, UX/accessibility, build and sitemap validation. |
| F3 targeted browser regressions | PASS: 6/6 across Chromium, Firefox and WebKit. The initial focused Chromium run exposed only that browsers preserve an empty `style=""` after inline style cleanup; the assertion now correctly verifies there are no remaining style declarations. |
| `git diff --check` | PASS before checkpoint commit. |
| Full hosted PR #130 CI | Pending after pushing this F3 checkpoint. |

No dependency, visual direction, claims, budgets, Lighthouse thresholds, or deployment behavior changed. No merge or deployment was performed. Intended stop state after all hosted PR checks pass: `F3_RESOLVED / PR_CI_GREEN / AWAITING_MERGE_AUTHORIZATION`.

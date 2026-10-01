# Issue #116 — I7 supporting and contact responsive pass

**State:** I7 PASS — Block D checkpoint ready for Controller review  
**Branch:** `build/issue-116-cplus-baseline`  
**Date:** 2026-09-30  
**Scope:** Operating Mindset, About, Additional Work, Contact, final Home responsive pass

## Outcome

The approved lower-page composition remains intact in EN and ES across 360, 390, 430, 768, 1024 and 1440 CSS px. Operating Mindset keeps its dark technical treatment and exactly three principles; About remains calm and legible; Additional Work keeps all six secondary cases in the compact index; Contact retains its high-contrast panel, visible email and four actions. No overflow, clipped sections, browser console errors or page errors were observed.

No product CSS, copy, claim, architecture, dependency, island or motion behavior required a change in I7. The only implementation addition is a dedicated browser regression test for these supporting sections and their accessibility/layout contracts.

## Validation

Exact commands used:

```sh
npm run qa:release
ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/issue-116-i7-supporting-responsive.spec.ts --workers=3 --reporter=line
ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/responsive-matrix.spec.ts --grep 'home-en|home-es' --workers=4 --reporter=line
ASTRO_PREVIEW_BACKGROUND=0 npx playwright test --project=chromium tests/browser/home-capability-method.spec.ts tests/browser/copy-action.spec.ts --workers=3 --reporter=line
node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs
git diff --check
```

The `ASTRO_PREVIEW_BACKGROUND=0` environment flag keeps the configured Astro preview in the foreground under Playwright's web-server lifecycle. No persistent runner configuration was changed.

| Check | Result |
|---|---|
| `npm run qa:release` | PASS; Astro check covered 76 files with 0 errors/warnings/hints; static build generated 22 pages; content, presentation, social metadata, SEO, UX/accessibility, build and sitemap validators passed |
| Home responsive regression: `responsive-matrix.spec.ts --grep 'home-en|home-es'` | PASS: 48 tests across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit; 12 expected skips for mobile profiles at non-mobile widths |
| I7 section suite: `issue-116-i7-supporting-responsive.spec.ts` | PASS: 10 tests across all five browser/device profiles; each locale checked at 360/390/430/768/1024/1440 |
| Accessibility | PASS: axe WCAG 2.2 AA had zero violations on EN and ES at 390 and 1440 px (4 audits, Chromium) |
| Contact targets | PASS: visible email, copy, resume and GitHub actions; anchors/buttons meet the 44 × 44 px target minimum at all tested widths |
| No-JS home behavior | PASS: 4 EN/ES desktop/mobile tests in `home-capability-method.spec.ts`; section order, content, project links, contact and local anchors remain usable |
| Contact interaction regression | PASS: 15 Chromium tests in `copy-action.spec.ts`; clipboard success/failure/fallback, inline feedback, mailto fallback, keyboard focus, narrow width and axe states |
| No-JS IA regression | PASS: 4 Chromium tests in `home-capability-method.spec.ts`, two locales × desktop/mobile |
| Console/page errors | PASS: zero in the responsive Home and I7 section suites |
| Reduced motion | No I7 motion was introduced or changed. Existing I5 reduced-motion checks remain the applicable motion evidence; they are included in the final I8 regression gate |

The first draft of the I7 test measured the zero-sized Astro island wrapper around CopyAction. It was corrected to measure the real anchors and buttons, then the complete 10-test I7 suite passed. This was a test selector correction; no product defect or CSS rework was found.

## Performance

Measured after the final I7 build with `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs`:

| Route | Initial client JS gzip | Budget | Headroom |
|---|---:|---:|---:|
| Home EN `/` | 95,130 B | 100,000 B | 4,870 B |
| Home ES `/es/` | 95,130 B | 100,000 B | 4,870 B |

This is unchanged from I5; I7 added no client code. Latest Lighthouse evidence remains the three-run I5 measurement: Performance median 0.97 EN / 0.96 ES, Accessibility/Best Practices/SEO 1.00 in both locales, LCP median 1,904 ms EN / 1,987 ms ES, CLS 0. I7 does not claim a new Lighthouse measurement; the contracted full Lighthouse route matrix remains in I8.

## Visual evidence

Sixteen section crops cover Operating Mindset, About, Additional Work and Contact for both locales at 390 × 844 and 1440 × 1000. See the [screenshot manifest](../../artifacts/visual/issue-116-i7/manifest.json) and [I7 screenshot directory](../../artifacts/visual/issue-116-i7/).

Representative captures:

- [Operating Mindset — EN, 390](../../artifacts/visual/issue-116-i7/operating-mindset-en-390.png)
- [About — ES, 1440](../../artifacts/visual/issue-116-i7/about-es-1440.png)
- [Additional Work — ES, 1440](../../artifacts/visual/issue-116-i7/additional-work-es-1440.png)
- [Contact — EN, 390](../../artifacts/visual/issue-116-i7/contact-en-390.png)

## Files and checkpoint boundary

- Browser regression: [`tests/browser/issue-116-i7-supporting-responsive.spec.ts`](../../tests/browser/issue-116-i7-supporting-responsive.spec.ts)
- Evidence: [`artifacts/visual/issue-116-i7/`](../../artifacts/visual/issue-116-i7/)
- No product CSS or content files changed.
- The existing no-JS, copy-action, reduced-motion, I6 case entry, and I5 interaction tests remain present; none were removed or weakened.
- Lighthouse is referenced from I5; it will be rerun in the contracted I8 validation rather than repeated for an increment with no product rendering or JavaScript changes.
- No merge, PR, deployment, or production release was performed.
- Independent Critic and Integration Review are not self-issued here; the combined Block D checkpoint is being handed to the Controller for review before I8.

**I7 PASS.** I6 and I7 are complete as separate increments. The remote branch must contain the I7 implementation and evidence commits, with a clean worktree, before this checkpoint is ready for Controller review. I8 has not started.

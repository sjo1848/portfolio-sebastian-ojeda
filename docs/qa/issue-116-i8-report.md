# Issue #116 — I8 full candidate validation

**State:** I8 validation complete; Independent Critic pending; Integration Review pending Controller review
**Branch:** `build/issue-116-cplus-baseline`
**Candidate code/test SHA:** `db83e07bafdc998574b598f5cb2c5f592a212b37` (test-only bounded validation rework atop Block D `8803137b06dfa728f8484c85c228a00b0c789930`)
**Validation date:** 2026-10-01
**Release boundary:** no merge, deploy, or I9 work performed

## Result

The candidate passes the contracted static QA, full browser suite, accessibility checks, SEO checks, JavaScript budget, and Lighthouse route matrix. No product implementation changed for I8. One existing browser test exceeded its 20-second timeout because it loops both locales over six viewport widths; its timeout was raised to 60 seconds without removing assertions. One static fallback test was migrated to the current `.case-back-link` selector after I6 changed that link’s class. The full suite then passed.

## Candidate and commits

- Block D starting point: `8803137b06dfa728f8484c85c228a00b0c789930`.
- I8 tested candidate: `db83e07` — `test: stabilize Issue 116 full browser validation`.
- I8 code delta: test-only; no source, product, content, dependency, budget, or configuration threshold change.
- Files in the I8 validation rework commit: `tests/browser/issue-116-i3-hero-motion.spec.ts`, `tests/browser/mobile-navigation.spec.ts`.

## Commands and results

| Command | Result |
|---|---|
| `npm run qa:release` | PASS; 75 Astro files, 0 errors/warnings/hints; static build produced 22 pages; content and presentation validation passed; social metadata passed for 20 public pages; SEO/structured data passed for 22 pages; UX/accessibility passed for 22 pages; build passed; sitemap passed with 20 canonical URLs |
| `ASTRO_PREVIEW_BACKGROUND=0 npx playwright test --workers=4 --reporter=line` | PASS; full configured suite, 970 tests across Chromium, Firefox, WebKit, Mobile Chromium, Mobile WebKit; 684 passed, 286 skipped by existing browser/test annotations, 0 failed (19.1 min) |
| `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` | PASS; results below |
| `@lhci/cli autorun --config=artifacts/lighthouse/lighthouserc.issue-116-i8.json` | PASS; 8 routes × 3 runs, all category assertions pass using median aggregation and unchanged thresholds |
| Home EN Lighthouse diagnostic repeat, same floors, 3 runs | PASS; results recorded below; diagnostic only and not substituted for the contracted route matrix |
| `git diff --check` | PASS |

The first Lighthouse attempt ran after Playwright had stopped its preview and therefore received Chrome’s `chrome-error://chromewebdata/`. It did not produce valid measurements. The preview was explicitly started, HTTP 200 verified, and the complete 24-run matrix then completed successfully. Only that complete run is used for the gate.

## Browser, responsive, interaction, accessibility

- Full Playwright coverage includes all 18 configured browser spec files and all five browser/device profiles.
- Responsive Home, case-study entry, supporting sections, and lead-case checks cover 360, 390, 430, 768, 1024, and 1440 CSS px in EN and ES.
- Dedicated Issue #116 tests cover I3 hero geometry/reduced motion, I4 normal anchor links and no-JS evidence, I5 pointer/keyboard active evidence and error/empty states, I6 lead case-study entry/no-JS/back-forward, and I7 supporting sections.
- Axe WCAG 2.2 A/AA, 2.1 A/AA, and 2.2 AA audits passed in the configured base and interactive states, including selected evidence, navigation, case-study contents, gallery/viewer, copy action, and supporting sections.
- Keyboard focus and ordinary-link navigation passed. Touch navigation, mobile Sheet open/close, Escape, reduced motion, no-JS fallback, and static route continuity passed in their configured tests.
- A separate Chromium console/pageerror check loaded all 8 priority routes at 1440 × 900 and both Home locales at 390 × 844 with reduced motion and navigation open/close: **0 console errors, 0 page errors**. The full suite’s route-specific console/pageerror assertions also passed.
- No hydration mismatch or layout-shift regression was observed; CLS was 0 in all Lighthouse runs.

## JavaScript gzip

| Route | Initial JS gzip | Deferred visible JS gzip | Budget/status |
|---|---:|---:|---|
| Home EN `/` | 95,130 B | 0 B | 4,870 B below 100,000 B cap |
| Home ES `/es/` | 95,130 B | 0 B | 4,870 B below 100,000 B cap |
| HMS EN/ES | 95,343 B | 12,553 B | deferred gallery chunks excluded from initial total |
| Alquileres EN/ES | 95,343 B | 14,220 B | deferred gallery chunks excluded from initial total |
| AI Commerce EN/ES | 95,081 B | 0 B | no visible-deferred chunk |

Home delta versus the accepted I0 baseline of 94,062 B is **+1,068 B gzip**, below the 100,000 B hard budget and the +3,000 B preferred motion delta. The I8 test-only commit adds no client JavaScript.

## Lighthouse

Thresholds were not modified: Performance ≥ 0.90, Accessibility ≥ 0.95, Best Practices ≥ 0.95, SEO ≥ 0.95; 3-run median aggregation.

| Route | Performance runs → median | A11y | Best Practices | SEO | LCP median | CLS median |
|---|---|---:|---:|---:|---:|---:|
| Home EN `/` | .73 / .99 / .99 → **.99** | 1.00 | 1.00 | 1.00 | 1,907 ms | 0 |
| Home ES `/es/` | .98 / .97 / 1.00 → **.98** | 1.00 | 1.00 | 1.00 | 2,001 ms | 0 |
| HMS EN | 1.00 / .99 / .99 → **.99** | 1.00 | 1.00 | 1.00 | 1,974 ms | 0 |
| HMS ES | .95 / .99 / 1.00 → **.99** | 1.00 | 1.00 | 1.00 | 1,485 ms | 0 |
| Alquileres EN | .96 / .96 / .97 → **.96** | 1.00 | 1.00 | 1.00 | 2,417 ms | 0 |
| Alquileres ES | .96 / .93 / .94 → **.94** | 1.00 | 1.00 | 1.00 | 2,718 ms | 0 |
| AI Commerce EN | .99 / .99 / .99 → **.99** | 1.00 | 1.00 | 1.00 | 1,819 ms | 0 |
| AI Commerce ES | 1.00 / 1.00 / .99 → **1.00** | 1.00 | 1.00 | 1.00 | 1,752 ms | 0 |

Home EN’s first run scored .73 with 1,408 ms TBT; its next two matrix runs scored .99. The same route was rerun three more times diagnostically and scored **.95 / .98 / .95**, with TBT **240 / 82 / 237 ms**, LCP **1,604 / 2,132 / 1,840 ms**, and CLS 0. This indicates the isolated low run was not reproduced; the raw original outlier remains included in the committed reports for Controller visibility. Home’s LCP median remains below its 2,400 ms target. Alquileres ES LCP was 2,718 ms; the contracted Home LCP target does not apply to that case-study route, and its Lighthouse performance median remains above the .90 floor.

These are Lighthouse lab results, not field Core Web Vitals. Field CWV remains `NOT_YET_OBSERVABLE`.

## Screenshots and metadata evidence

- 38-capture manifest covers Home EN/ES at 390/1440, all three lead case studies EN/ES at 390/1440, Selected Work with HMS/Alquileres/AI active at 1440 in both locales, and four lower Home sections EN/ES at 390/1440.
- Home no-JS and reduced-motion reference captures remain available from I1/I3 and are linked in the manifest context; the full suite revalidated those behaviors.
- [Screenshot manifest](../../artifacts/visual/issue-116-i8/manifest.json); [I8 state screenshots](../../artifacts/visual/issue-116-i8/).
- [SEO metadata evidence](../../artifacts/qa/issue-116-i8/seo-metadata.json) records canonical URLs, EN/ES alternates, `og:url`, social image, robots directives, and sitemap presence for the 8 priority routes. Canonical origin is `https://sebastian-ojeda.pages.dev`; sitemap contains 20 canonical URLs and includes all priority routes; robots points to the canonical sitemap.
- [Console/pageerror evidence](../../artifacts/qa/issue-116-i8/console-check.json): zero errors across the explicit 10-page/state check.
- [Lighthouse raw JSON reports and manifest](../../artifacts/lighthouse/issue-116-i8/); [unchanged Lighthouse config](../../artifacts/lighthouse/lighthouserc.issue-116-i8.json).
- [Home EN diagnostic Lighthouse JSON reports](../../artifacts/lighthouse/issue-116-i8-home-diagnostic/).
- Evidence provenance and project claims passed `validate:content`, `validate:presentation`, the I5 selected-proof tests, I6 case-entry tests, and the full suite. No screenshots were promoted into new production claims.

## Review gates and limitations

- **Independent Critic:** pending fresh independent review of this report, the canonical Issue #116 contracts, candidate `db83e07`, and committed I8 evidence. The critic handoff is [`issue-116-i8-critic-handoff.md`](issue-116-i8-critic-handoff.md).
- **Integration Review:** pending Controller review, per the Controller’s I8 disposition; not self-issued by the implementer.
- The full Playwright report records 286 existing skipped test/profile combinations; there were no failures.
- No production deployment or field-user Core Web Vitals data is part of I8.
- No merge, deployment, or I9 work has been performed.

**I8 implementation-side validation: PASS, subject to Independent Critic and Controller Integration Review.** Stop at this checkpoint.

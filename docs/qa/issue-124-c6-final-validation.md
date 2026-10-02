# Issue #124 — C6 Final Validation

Date: 2026-10-02
Branch: `build/issue-124-proof-conversion`
Approved C3–C5 checkpoint: `0d12c99849e5c64aad39ce70e8b0599f7bb00939`
C6 implementation commit: `46483f7d3d77a7817b340518aeee61a3f092e29d`

## Result

The bounded C5-F1 copy correction is implemented. Issue #124-specific proof tests, model checks, release QA, responsive/accessibility checks, configured three-run Lighthouse medians, and the complete five-project Playwright matrix pass. An initial four-worker matrix had six load-sensitive failures; after Independent Critic requested bounded rework, the full matrix was rerun with controlled concurrency and completed with 703 passed, 302 expected skips, zero failures, and zero flaky outcomes. Independent Critic re-review is the next gate.

## Correction

Alquileres now describes only the visual proof that is actually available:

| Locale | Gallery heading | Gallery description |
| --- | --- | --- |
| EN | `Verified screenshots` | `Reproducible visual evidence from the product, documented with synthetic data and explicit limitations.` |
| ES | `Capturas verificadas` | `Evidencia visual reproducible del producto, documentada con datos sintéticos y límites explícitos.` |

The exact approved C2 limitation remains visible below the description in both locales. The heading also flows into the case-study contents model. No walkthrough, proof mode, CTA, evidence asset, project status, navigation, IA, styling, dependency or client behavior was added or changed.

## Reconciliation against approved C3–C5

- **HMS Cloudflare:** model test confirms its current proof remains the one canonical lifecycle screenshot, with the authorized cover preview disclosed separately. Source commit remains unknown. The removed recruiter-facing HMS files stay absent from both source and `dist`; the vendoring script remains fail-closed.
- **Alquileres:** model test confirms the three approved synthetic assets, pinned provenance, current `visual-evidence` mode and exact existing limitations. Copy now matches that evidence.
- **Selected Work:** proof action remains subordinate and available only for HMS and Alquileres. AI Commerce remains without proof CTA/evidence. Existing mobile behavior remains case-study-first and does not add a redundant CTA per row.
- No cards, links, IA, navigation or design outside the approved C3–C5 scope were changed.

The issue-specific model tests assert provenance hashes, the one canonical HMS artifact, removed HMS assets, the Alquileres synthetic evidence contract, UspaYa's withdrawn assets and continued case/repository availability, plus bilingual proof limitations. Result: 7/7 model/data/browser checks passed in Chromium.

## Validation evidence

### Release QA

`npm run qa:release` — PASS.

The persisted run log records content and presentation validation, Astro diagnostics (0 errors, 0 warnings, 0 hints), a 22-page static build, social/static asset checks, SEO and UX checks, and 20 canonical sitemap URLs.

### Playwright

The repository's normal `npm run test:browser` invocation exits early because the Astro preview process daemonizes and Playwright reports `Process from config.webServer exited early`. The browser run therefore used a temporary config matching the canonical five projects and a separately started preview server; the temporary config was removed afterward.

The complete matrix covered all five configured projects: Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. The initial four-worker run completed 1,005 tests with 697 passed, 302 expected skips, and 6 failures; the failed cases passed in focused reruns. Following Independent Critic REWORK, the entire matrix was rerun with `fullyParallel=false`, two workers, 120-second test timeout and 15-second assertion timeout against a separately started preview server. The controlled run completed 1,005 tests with **703 passed, 302 expected skips, 0 failed, and 0 flaky** in 28m 43s. All five configured projects were included. The earlier six failures were not reproducible under this controlled run. Exact final Playwright JSON is in [`full-suite-controlled.json`](../../artifacts/qa/issue-124-c6/full-suite-controlled.json), and run configuration/result reconciliation is in [`full-suite-observations.json`](../../artifacts/qa/issue-124-c6/full-suite-observations.json).

- both Issue #124 C5 proof-conversion failures passed in the 55-case focused Issue #124 run;
- the four existing Issue #116/mobile-navigation failures passed in a 10-test serial Mobile WebKit rerun.

Focused Issue #124 results: **23 passed, 32 expected skips, 0 failed** across the five configured projects. The skips are the existing browser-specific guards (for example, data-model checks run in Chromium and visual captures run once there). This includes exact EN/ES Alquileres heading, description and limitation checks; C5 proof action/link checks; HMS/Alquileres/UspaYa proof model and provenance tests.

Responsive checks cover the approved 360/390/430/768/1024/1440 widths on the changed gallery and route matrix. Axe WCAG 2.2 AA checks for Home, HMS and Alquileres EN/ES at mobile and desktop sizes passed in Chromium. Existing no-JS case-study links, keyboard/focus, touch/mobile and reduced-motion tests passed in the focused coverage and serial Mobile WebKit follow-up. Page console/page errors remained empty in the focused C5 route and screenshot validation; responsive route tests also passed their console/pageerror assertions in the full run.

The initial six failures and the final all-green controlled run are both retained in [`full-suite-observations.json`](../../artifacts/qa/issue-124-c6/full-suite-observations.json). No C6 code changed the Home hero, navigation, C+ motion or their styles. This bounded execution rework changed only the test-runner concurrency/timeouts; no product behavior or configured project matrix was altered.

### Lighthouse

Lighthouse CI 0.15.1 ran the repository's unchanged category thresholds and three runs for each of six routes (18 reports total). All **three-run medians** meet the existing Performance ≥ 0.90, Accessibility ≥ 0.95, Best Practices ≥ 0.95 and SEO ≥ 0.95 gates.

| Route | Perf median | A11y | Best Practices | SEO | LCP median | CLS median |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home EN | 0.95 | 1.00 | 1.00 | 1.00 | 1,757 ms | 0 |
| Home ES | 0.97 | 1.00 | 1.00 | 1.00 | 1,977 ms | 0 |
| HMS EN | 0.91 | 1.00 | 1.00 | 1.00 | 1,906 ms | 0 |
| HMS ES | 0.96 | 1.00 | 1.00 | 1.00 | 1,915 ms | 0 |
| Alquileres EN | 0.92 | 1.00 | 1.00 | 1.00 | 2,422 ms | 0 |
| Alquileres ES | 0.98 | 1.00 | 1.00 | 1.00 | 2,131 ms | 0 |

The standard three-run median aggregation is used. Individual-run performance varied: one Home ES run scored 0.78 and one Alquileres EN run scored 0.82; their respective three-run medians pass the configured thresholds. No threshold was lowered or changed. The LCP and CLS values above are Lighthouse lab measurements, not field Core Web Vitals.

### Client JavaScript

Home initial client JS is **95,728 B gzip** in EN and ES, unchanged from the approved C3–C5 checkpoint. This leaves **4,272 B** below the existing 100,000 B limit. C6 adds no JS, island, dependency or hydration behavior. See [`home-js-budget.json`](../../artifacts/lighthouse/issue-124-c6/home-js-budget.json).

### Screenshots and report index

- Corrected Alquileres gallery: EN/ES at 390 px and 1440 px in [`artifacts/visual/issue-124-c6/`](../../artifacts/visual/issue-124-c6/); `SHA256SUMS` is alongside the images.
- Lighthouse JSON: six routes × three runs in [`artifacts/lighthouse/issue-124-c6/reports/`](../../artifacts/lighthouse/issue-124-c6/reports/).
- Median summary and Lighthouse config: [`medians.json`](../../artifacts/lighthouse/issue-124-c6/medians.json) and [`lighthouserc.json`](../../artifacts/lighthouse/issue-124-c6/lighthouserc.json).
- Focused Playwright JSON and `qa:release` log: [`artifacts/qa/issue-124-c6/`](../../artifacts/qa/issue-124-c6/).

## Residual limitations and boundary

- Alquileres remains synthetic static visual evidence. It has no public deployment and images do not establish real availability.
- HMS evidence remains local regression evidence; it does not establish Product Acceptance or production release.
- The initial four-worker Playwright run recorded six load-sensitive failures, all absent from the final complete two-worker run (zero failures/flaky). No code in those earlier-failing Home/navigation surfaces changed in C6.
- No field Core Web Vitals claim is made.
- No PR, merge, deploy, production change or Wave 2/3 work is part of C6.

Independent Critic verdict: **PASS**, reviewed independently against the C0–C6 contract and persisted in [`issue-124-c6-independent-critic.md`](issue-124-c6-independent-critic.md). No blocking findings.
Controller Integration Review: pending.

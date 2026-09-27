# Frontend Excellence — Increment 4

## Provenance and scope

- Phase: BUILD — Increment 4, Case Study Navigation.
- Execution issue: #78. Branch: `build/frontend-excellence-i4`.
- Baseline: Increment 3 merged to `main` as `427a923beee53ea69c6cbb903ea3eddbeddcfd51`.
- This increment adds navigation for long case studies. Astro remains responsible for static page content and composes the serializable contents model from `render(project).headings`; it adds the gallery section only when that project has gallery assets.
- No route, project copy, IA, brand token, new dependency, global state, client router, or additional page-wide React hydration was introduced.
- Field Core Web Vitals: `NOT_YET_OBSERVABLE`.

## Scope delivered

- Wide desktop uses a sticky contents list beside a reading column capped at 46rem. Tablet and mobile use the localized `Contents` / `Contenido` Sheet trigger. The breakpoint is 68.75rem.
- The client island uses `client:idle`. Before hydration, a native `<details>` contents list is available on mobile and tablet. Native anchors remain functional when JavaScript is disabled.
- Headings come from Astro’s rendered Markdown metadata. Existing gallery sections are added only when present; the gallery heading and TOC label share one localized title.
- Active section tracking uses `IntersectionObserver`, scroll, hash, and history events. Anchors retain native behavior; there is no scroll hijacking. At document end, the last section becomes active.
- The Sheet supports an accessible name and description, Escape, focus trap, background inertness, scroll lock, keyboard operation, and focus restoration. After choosing a contents link, focus moves to the destination heading after the modal has exited and released the background.
- Sticky-header offsets use `scroll-padding` and `scroll-margin`. Reduced motion is honored. The single primary site navigation remains the sole primary-navigation model; the named contents navigation is a separate landmark.
- `scripts/validate-build.mjs` now decodes percent-encoded URL fragments before checking the exact static anchor ID. This preserves strict missing-anchor validation for Unicode headings.

## Files and routes

- Changed: `src/components/ProjectPage.astro`, `src/styles/global.css`, `scripts/validate-build.mjs`, `tests/browser/responsive-matrix.spec.ts`.
- Added: `src/components/CaseStudyContents.tsx`, `tests/browser/case-study-contents.spec.ts`, this report, Lighthouse configuration and reports, and visual evidence.
- Heading parity and interaction coverage: HMS Cloudflare EN/ES, Alquileres EN/ES, and HMS Elite EN/ES. Responsive navigation matrix: home, HMS Cloudflare, and Alquileres EN/ES at 360, 390, 430, 768, 1024, and 1440 px.

## Validation and browser evidence

- `npm run qa:release`: PASS. Bilingual content and presentation validation; Astro check (52 files, 0 errors/warnings/hints); 22-page static build; static assets, social metadata, SEO, UX/accessibility, exact fragment validation, and sitemap all passed.
- Full browser suite on an isolated fresh preview at port 4184: **281 passed, 159 expected skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit.
- I4 focused suite: **61 passed, 4 expected skips, 0 failures** across the same five profiles. It verifies heading parity, native no-JS navigation at 390/768/1024/1440, the six-width enhanced layout, horizontal overflow, anchor offset, Sheet open/close, selected-heading focus, back navigation, active state without script-initiated scrolling, reduced motion, and focus trapping/restoration.
- Axe WCAG 2.2 AA checks passed on the HMS desktop case study and the mobile Contents Sheet. Automated modal checks cover accessible dialog naming, inert background, document scroll lock, Tab/Shift+Tab wrap, Escape, focus restoration, and focus to a selected heading.
- The responsive matrix asserts no horizontal overflow and zero console warnings/errors on the six primary routes. The contents implementation also checks for browser console and page errors on all six bilingual heading-parity routes.
- Mobile WebKit is device emulation, not a physical iPhone Safari run.

## Screenshots

Captures in [`artifacts/visual/frontend-excellence/increment-4`](../../artifacts/visual/frontend-excellence/increment-4/) include the mobile trigger and open Sheet at 390 px, the selected-anchor state at 390 px, open Sheets at tablet widths 768 and 1024 px, and the sticky desktop TOC with the final section active at 1440 px. Captures use the production build; I visually inspected the mobile, tablet, and desktop states.

## Lighthouse

Reproducible command: `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.frontend-excellence-increment-4.json`.

Three lab runs per route (18 reports) use the unchanged floors: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Lighthouse CI passed all representative-run assertions. Accessibility, Best Practices, and SEO scored 1.00 on all 18 runs. CLS was 0 on every route/run.

| Route | Performance range (representative) | Lab LCP range | Accessibility / BP / SEO |
|---|---:|---:|---:|
| `/` | 0.83–0.99 (0.99) | 1,968–2,156 ms | 1.00 / 1.00 / 1.00 |
| `/es/` | 0.94–1.00 (0.94) | 1,822–2,040 ms | 1.00 / 1.00 / 1.00 |
| `/projects/hms-cloudflare/` | 0.98–1.00 (1.00) | 1,479–1,817 ms | 1.00 / 1.00 / 1.00 |
| `/es/projects/hms-cloudflare/` | 0.98–1.00 (1.00) | 1,477–1,823 ms | 1.00 / 1.00 / 1.00 |
| `/projects/alquileres-uspa/` | 0.92–0.97 (0.97) | 2,446–2,584 ms | 1.00 / 1.00 / 1.00 |
| `/es/projects/alquileres-uspa/` | 0.96–0.98 (0.98) | 2,121–2,709 ms | 1.00 / 1.00 / 1.00 |

One non-representative home run scored 0.83 Performance; Lighthouse’s representative score was 0.99. A separate three-run home repeat scored 0.93–0.99 (representative 0.99), and its Lighthouse CI assertion passed. The isolated outlier did not recur. Alquileres lab LCP exceeded 2.5 s in some runs; these remain lab observations, not field CWV results. No field analytics/RUM was added and no threshold changed.

The 18 reports are in [`artifacts/lighthouse/frontend-excellence-increment-4`](../../artifacts/lighthouse/frontend-excellence-increment-4/); the home repeat is in [`artifacts/lighthouse/frontend-excellence-increment-4-home-repeats`](../../artifacts/lighthouse/frontend-excellence-increment-4-home-repeats/).

## Client JavaScript and CSS

The new contents island is 3.84 kB raw / **1.56 kB gzip**. Mobile Navigation and the shared React runtime were already in the Increment 3 primary-navigation payload. Using the Increment 3 initial-payload measurements, the estimated initial JS is unchanged on home (95,200 B gzip) and increases by 1,560 B on case studies (96,885 B gzip), below the 100 KB home and 150 KB case-study targets. The gallery and media viewer remain below-the-fold `client:visible` islands; their deferred chunks are not included in these initial figures.

The shared stylesheet is 52,397 B raw / 10,937 B gzip (Increment 3: 49,086 B / 10,544 B), a delta of +3,311 B raw / +393 B gzip. Home adds a 4,475 B / 1,175 B gzip route stylesheet, for 56,872 B raw / 12,112 B gzip total CSS on home. No JS budget or performance threshold was changed.

## Risks and limitations

- Field CWV remains `NOT_YET_OBSERVABLE`; lab LCP does not establish field LCP/INP/CLS compliance.
- Alquileres has lab LCP observations up to 2,709 ms; continue monitoring within existing budgets.
- Mobile WebKit checks use browser emulation; physical-device Safari was not tested.

## Review gates

- Responsive review: PASS after re-reviewing the no-JS tablet fallback, overflow, anchor offset, selected focus, and six final visual captures.
- Accessibility review: PASS after keyboard, focus, modal, inertness, reduced-motion, axe, and no-JS behavior were verified.
- Frontend implementation review: build and focused browser checks passed; full suite passed.
- Independent Critic: PASS. Confirmed the approved Astro-first scope, strict Unicode fragment validation, responsive/keyboard behavior, and evidence-backed QA without material regressions.
- Integration Review: PASS. Confirmed the TOC composition, small `client:idle` island, no-JS anchors, modal behavior, responsive reading width, and proportional validator fix. Non-blocking note: serialized `kind` is currently unused.
- Increment 4 gate: PASS. All independent reviews passed; repository PR checks remain the release gate for this increment.

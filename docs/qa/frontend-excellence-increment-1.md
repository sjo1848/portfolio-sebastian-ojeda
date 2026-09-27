# Frontend Excellence — Increment 1

## Provenance

- Phase: BUILD — Increment 1, Mobile Access + Navigation.
- Execution issue: #78; baseline defect #77 was resolved before this initiative.
- Baseline commit: `0eed0732c7ec6c87a33bfe896b76c8b852e12c49` (Increment 0 merged to `main`).
- Working branch: `build/frontend-excellence-i1`.
- Product code remains Astro-first: one `client:load` React island owns the mobile menu; routing, page content, cards, case studies, SEO, and static fallback remain Astro output.
- Field Core Web Vitals: `NOT_YET_OBSERVABLE`.

## Scope delivered

- Replaced the compressed mobile header grid with an accessible Base UI Sheet trigger and localized mobile navigation. Desktop continues to use its inline navigation.
- Kept exactly one server-rendered primary `<nav>`. It is hidden from the accessibility tree at mobile widths while closed; the mobile Sheet exposes one navigation landmark while open. The existing static UX validator passes.
- Added the portfolio name, keyboard entry, explicit initial and final focus targets, focus containment, Escape close, focus restore, body scroll lock, close-after-navigation, locale switching, reduced-motion styling, viewport resize close, and safe-area-aware Sheet sizing.
- Strengthened the mobile ProjectCard CTA with the existing `.button.button-secondary` contract. Capture, title, and CTA links remain separate; cards are not whole-card links. Added a real capture link where an image exists; placeholder cards retain their independent title and CTA links.
- Preserved all non-interactive page output and static routes when the mobile island fails to hydrate.
- No dependency, global state, React root, route, branding, content, visible CV CTA, or client-side router was added.

## Files and routes

- Changed: `src/components/SiteHeader.astro`, `src/components/ProjectCard.astro`, `src/styles/global.css`, `scripts/validate-portfolio-presentation.mjs`, `tests/browser/responsive-matrix.spec.ts`.
- Added: `src/components/MobileNavigation.tsx`, `tests/browser/mobile-navigation.spec.ts`, `tests/browser/project-card-mobile.spec.ts`.
- The presentation validator now checks for the stable `project-case-link` hook instead of requiring that the link have exactly one CSS class. It still enforces the approved CTA contract; no validation was removed or threshold lowered.
- Primary route coverage: home EN/ES, HMS EN/ES, and Alquileres EN/ES. ProjectCard variants hero/story/secondary, image/no-image, and short/long summaries are covered on home EN/ES.

## Browser and accessibility evidence

- `npm run check`: PASS, 0 errors, 0 warnings, 0 hints.
- `npm run build`: PASS, 22 static pages; UX, SEO, static assets, social metadata, and presentation validators pass.
- `npm run qa:release`: PASS, including content, #77 presentation evidence, `validate:build`, and sitemap.
- `npm run test:browser`: **185 passed, 105 expected skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium profile, and Mobile WebKit profile.
- Responsive widths 360, 390, 430, 768, 1024, and 1440 are executable in the matrix. Device-emulation projects exercise 360/390/430; desktop-width cases are expected skips in those projects.
- All six priority routes passed the responsive matrix in Chromium, Firefox, and WebKit. Mobile device profiles passed at 360/390/430.
- Nine localized ProjectCard cases passed (EN/ES × 360/390/430); all six cards are independently checked for CTA visibility, accessible name, >=44×44 target, correct case-study target, image/placeholder presence, and no horizontal overflow.
- The navigation tests passed in EN/ES for dialog state, one mobile navigation landmark, trigger target and `aria-expanded`, focus entry/trap/restore, Escape, locale links, section-link close, scroll lock, no horizontal overflow, and zero axe violations. The test polls for Base UI's scheduled initial focus rather than racing its animation frame.
- Axe covers all six priority route pages at 390/1440 in Chromium and the open navigation state in EN/ES across the interaction matrix, using WCAG 2.0 A/AA, WCAG 2.1 A/AA, and WCAG 2.2 AA tags.
- A failed-island test aborts the navigation component chunk and verifies home, ProjectCard, contact, GitHub, case study, back link, and project GitHub links remain available.
- The 360×640 mobile Sheet state passes viewport bounds, reduced motion, locale-link reachability, and closes at the 768 px desktop breakpoint.
- Browser console checks passed. The navigation spec filters only Firefox's test-inspector diagnostic (`Layout was forced before the page was fully loaded` from `debugger eval code`); application errors, page errors, and all other browser warnings remain failures.

## Screenshots

The 45 PNGs in [`artifacts/visual/frontend-excellence/increment-1`](../../artifacts/visual/frontend-excellence/increment-1/) include all six priority routes at six widths, ES/EN ProjectCard CTA viewports at 360/390/430, mobile navigation open at 390 in ES/EN and at 360×640 EN, and interaction-ready states. The screenshots show the existing Stone / Andes Copper palette and the button contract rather than default shadcn styling.

## Lighthouse and performance

All six priority routes were run through Lighthouse CI with the repository's unchanged gates: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Every run passed all four assertions.

| Route | Performance | Accessibility | Best Practices | SEO | Lab LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,048 ms | 0.00 | 33 ms |
| `/es/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,044 ms | 0.00 | 17 ms |
| `/projects/hms-cloudflare/` | 0.99 | 1.00 | 1.00 | 1.00 | 1,812 ms | 0.00 | 88 ms |
| `/es/projects/hms-cloudflare/` | 0.99 | 1.00 | 1.00 | 1.00 | 1,816 ms | 0.00 | 49 ms |
| `/projects/alquileres-uspa/` | 0.95 | 1.00 | 1.00 | 1.00 | 2,571 ms | 0.00 | 151 ms |
| `/es/projects/alquileres-uspa/` | 0.95 | 1.00 | 1.00 | 1.00 | 2,716 ms | 0.00 | 98 ms |

Three-run checks on home and Alquileres routes also passed all category gates. Home EN performance ranged 0.93–0.99 (LCP 1,969–2,066 ms, CLS 0.00); home ES performance was 0.99 (LCP 2,039–2,045 ms, CLS 0.00). Alquileres EN performance ranged 0.96–0.97 (LCP 2,577–2,715 ms, CLS 0.00); ES ranged 0.96–0.97 (LCP 2,641–2,715 ms, CLS 0.00). The repeated Alquileres lab LCP is above 2.5 s and home EN's lowest repeated performance score is close to the 0.90 floor. Lighthouse does not establish field CWV; field status remains `NOT_YET_OBSERVABLE`. These lab observations are retained as a performance risk for the integration review; no budget or gate was changed.

The final six primary Lighthouse reports, captured after the portfolio-name rework, are in [`artifacts/lighthouse/frontend-excellence-increment-1-final`](../../artifacts/lighthouse/frontend-excellence-increment-1-final/). Supplementary three-run observations were captured before that small text/accessibility rework and are in [`artifacts/lighthouse/frontend-excellence-increment-1-repeats`](../../artifacts/lighthouse/frontend-excellence-increment-1-repeats/) and [`artifacts/lighthouse/frontend-excellence-increment-1-home-repeats`](../../artifacts/lighthouse/frontend-excellence-increment-1-home-repeats/).

## Client JavaScript and CSS delta

The measurement counts the Astro island's component and renderer URLs, recursively imported Vite chunks, and every inline executable script; JSON-LD is excluded. Each JavaScript resource is gzip-compressed for the report.

| Route | Increment 0 | Increment 1 | Delta |
|---|---:|---:|---:|
| Home initial client JS | 0 B | 292,287 B raw / 94,403 B gzip | +94,403 B gzip |
| Case-study initial client JS | 1,264 B raw / 610 B gzip | 293,551 B raw / 95,013 B gzip | +94,403 B gzip |
| Home linked CSS | 44,678 B raw | 48,576 B raw / 10,812 B gzip | +3,898 B raw |

Home and case-study client JS remain within the 100,000 B and 150,000 B gzip targets. The initial island payload consists of the mobile navigation component, Astro React renderer, shared React chunk, and inline Astro hydrator. This payload is now delivered on every route because primary navigation is `client:load`; static content itself does not hydrate. No performance budget was changed.

## Risks and limitations

- Field CWV is not observable without sufficient real-user data; no RUM or analytics was added to manufacture a result.
- Repeated Alquileres lab LCP is above 2.5 s; home EN Lighthouse has a minimum repeated Performance score of 0.93. All hard category thresholds and JS budgets remain green, but the added client payload has little room under the home budget and deserves review before more global client code is added.
- Mobile Safari behavior was tested through Playwright's Mobile WebKit profile, not a physical iPhone.
- GIF parity, media viewer, case-study navigation, and copy action are out of scope for this increment and remain to be implemented in later increments.

## Review gates

- Specialist implementation: Codex (implementation), with bounded read-only reviews from Frontend/React, Responsive/Interaction, and Accessibility/QA specialists.
- Independent Critic: initial verdict REWORK because the Sheet omitted the portfolio name. Rework added `Sebastián Ojeda` to the Sheet and asserted it in the browser test; independent re-review: PASS.
- Integration Review: PASS. The reviewer confirmed the `npm run qa:release` result, all six Lighthouse gates, the client-JS caps, static fallbacks, one mobile navigation landmark, and the 185 passed / 105 expected skip browser report. The repeated Alquileres lab LCP (2.57–2.72 s) and home low Performance score (0.93) remain monitored risks; field CWV remains `NOT_YET_OBSERVABLE` and no threshold or budget changed.
- Increment 1 gate: PASS.

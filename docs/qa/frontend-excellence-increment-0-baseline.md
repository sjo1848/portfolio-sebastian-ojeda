# Frontend Excellence — Increment 0 baseline

## Provenance

- Phase: BUILD — Increment 0, before foundation changes.
- Baseline commit: `90753b36521dc3e37e57adab2fd5109eb911f056` (P0 #77 merged).
- Working branch: `build/frontend-excellence-i0`.
- Runtime used for local measurements: Node `v24.18.0`, npm `12.0.2`, Google Chrome headless.
- `npm ci` completed against the baseline lockfile; a subsequent `npm run qa:release` also passed.
- Field Core Web Vitals: `NOT_YET_OBSERVABLE`.
- No frontend dependency or product source was changed before collecting these results.

## Release QA

`npm run qa:release` passed on the baseline commit:

- bilingual content and presentation validation passed;
- Astro Check: 0 errors, 0 warnings, 0 hints;
- static build: 22 HTML pages;
- build/static assets, social metadata, SEO, UX/accessibility, sitemap checks passed.

The initial production build emitted two existing content-loader duplicate-ID warnings for `hms-cloudflare`, one for each bilingual collection. They did not recur in the subsequent release QA build, and Astro Check reported no diagnostics. No baseline browser-console errors or warnings were recorded on the six priority routes.

The local npm 12 install reported 8 lockfile dependency advisories (1 low, 1 moderate, 5 high, 1 critical) and blocked lifecycle scripts for `esbuild`/`sharp` under its current install-script policy. The clean install still built and passed release QA. The repository CI uses Node 20; these npm 12 observations are recorded as local environment context, not a change to the lockfile or a reason to alter QA gates.

## Client JavaScript and generated assets

Measured from the generated static HTML before React integration. Inline module code is counted as client JavaScript; JSON-LD scripts are excluded.

| Route | Inline module JS, raw | gzip | External JS files |
| --- | ---: | ---: | ---: |
| `/` | 0 B | 0 B | 0 |
| `/es/` | 0 B | 0 B | 0 |
| `/projects/hms-cloudflare/` | 1,264 B | 610 B | 0 |
| `/es/projects/hms-cloudflare/` | 1,264 B | 610 B | 0 |
| `/projects/alquileres-uspa/` | 1,264 B | 610 B | 0 |
| `/es/projects/alquileres-uspa/` | 1,264 B | 610 B | 0 |

The same inlined `ProjectPage.astro` module appears on case-study routes, including routes without GIF assets. Home has no client JavaScript. The baseline delivered `42,852 B` of CSS across the two stylesheets linked on the home route (`38,595 B` and `4,257 B`). Total generated `dist` size was approximately `4.1 MB`.

## Lighthouse

The repository Lighthouse workflow ran 9 audits (3 each for `/`, `/es/`, and `/projects/hms-elite/`) and passed the existing category assertions: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, and SEO ≥0.95.

I also measured each Increment 0 priority route once with the same category thresholds. Accessibility, Best Practices, and SEO scored 1.00 on all six. Performance and lab metrics were:

| Route | Performance | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| `/` | 1.00 | 928 ms | 0.00 | 18 ms |
| `/es/` | 1.00 | 1,017 ms | 0.00 | 9 ms |
| `/projects/hms-cloudflare/` | 0.91 | 1,116 ms | 0.00 | 372 ms |
| `/es/projects/hms-cloudflare/` | 1.00 | 910 ms | 0.00 | 4 ms |
| `/projects/alquileres-uspa/` | 0.99 | 2,112 ms | 0.00 | 57 ms |
| `/es/projects/alquileres-uspa/` | 0.84* | 2,200 ms | 0.00 | 569 ms |

`*` The single initial Alquileres ES result was below the Performance gate. The Lighthouse audit attributed the outlier mostly to main-thread style/layout work and one 537 ms task; JavaScript execution was 81 ms. Three repeat runs passed the 0.90 assertion with Performance scores `0.95` median (`0.91–0.99`), LCP `2,187–2,217 ms`, and CLS `0.00`. This is recorded as measurement variability, not a baseline code change. Lighthouse is lab evidence and does not establish field CWV.

Full Lighthouse JSON reports for all six priority routes and the three Alquileres ES repeats are in [`artifacts/lighthouse`](../../artifacts/lighthouse/).

## Browser, console, keyboard, and responsive observations

- Browser console: 0 errors and 0 warnings on `/`, `/es/`, HMS EN/ES, and Alquileres EN/ES using Playwright CLI against the static production build.
- Keyboard: at 390 px, the first Tab reaches the “Skip to content” link; its computed focus outline is solid and 3 px.
- Primary navigation: the page currently renders one `<nav>` landmark. At mobile widths it becomes a compressed multi-row, three-column link grid; there is no mobile trigger or Sheet.
- ProjectCard: each card renders a separate, always-visible case-study link. Its CSS minimum height is `2.75rem` (44 px); visibility does not depend on hover. The CTA is present in the 360/390/430 screenshots.
- Case-study media: Alquileres Uspallata renders three static gallery items; links open their original image in a new tab. The thumbnail uses `object-fit: cover`.
- HMS Cloudflare has no `projectMedia.ts` gallery entry. Its four Markdown screenshots remain static and directly available on the case-study page.
- GIF behavior: current imperative code defers creating the GIF image until Play; Stop removes it and restores the placeholder; a separate link opens the original GIF. There is no autoplay.
- Observed lab CLS is 0.00 on all six routes. No React island exists at baseline, so hydration shift/mismatch is not applicable.

## Visual evidence

Thirty-six production-build screenshots cover all six priority routes at 360, 390, 430, 768, 1024, and 1440 px. Files are under [`artifacts/visual/frontend-excellence/baseline`](../../artifacts/visual/frontend-excellence/baseline/), named `{route}-{width}x{height}.png`.

Priority routes: `/`, `/es/`, `/projects/hms-cloudflare/`, `/es/projects/hms-cloudflare/`, `/projects/alquileres-uspa/`, and `/es/projects/alquileres-uspa/`.

## Baseline exit

Baseline evidence is persisted before dependency installation. The initial performance outlier was repeated and passed; the existing Lighthouse workflow and full release QA passed. Proceed to the minimum Increment 0 foundation while retaining these measurements for bundle and route-level comparison.

---

## Increment 0 foundation and verification

### Scope delivered

- Added Astro's React integration while retaining Astro's static routing, templates, and generated HTML. No React islands are used by production routes in this increment.
- Added React 19, TypeScript types, Base UI React primitives, and the shadcn-compatible `components.json` configuration for the existing Tailwind 4 and Stone tokens.
- Added only the foundational Dialog, Sheet, and Drawer wrappers; no Button, icon, notification, or carousel dependency was introduced.
- Added the minimal `cn` utility and `@/*` source alias.
- Added Playwright projects for Chromium, Firefox, WebKit, mobile Chromium, and mobile WebKit, plus the executable 360/390/430/768/1024/1440 responsive matrix and Chromium axe baseline checks.
- Added the browser matrix to CI after existing release QA and configured browser evidence artifact upload.

No page, navigation, gallery, card, copy, or GIF interaction was changed in Increment 0. ES/EN page output remains static and does not hydrate React.

### Post-foundation verification

- `npm run check`: PASS, 43 Astro files, 0 errors/warnings/hints.
- `npm run build`: PASS, 22 static HTML pages; `npm run qa:release`: PASS, including content, presentation (#77), check, build, static asset, social metadata, SEO, UX/accessibility, build, and sitemap validators.
- Clean `npm ci` against the new lockfile: PASS (433 packages installed). It reported the same 8 audit advisories as the baseline install and npm 12 blocked esbuild/sharp lifecycle scripts under its install-script policy; build and browser runs still passed. Lockfile SHA-256: `adcb12ddb1dfa13630d2ea2f77bf12b7b2f848b649c32593fb334dcdad39770d`.
- After that clean install, `npm run qa:release` and `npm run test:browser` both passed again. Browser result: **156 passed, 84 expected skips**, zero failures. All six priority routes passed at all six widths in Chromium, Firefox, and WebKit. Mobile Chromium and WebKit emulation profiles passed at 360/390/430 px. These are browser emulation profiles, not physical iPhone Safari coverage. Expected skips are axe checks outside Chromium and desktop widths in device-emulation projects.
- Axe: 12 page-state scans passed (six priority routes at 390 and 1440 px) against WCAG 2.0 A/AA, WCAG 2.1 A/AA, and WCAG 2.2 AA tags.
- Browser page console: zero errors, warnings, or uncaught page errors on tested routes and viewports. The test runner emitted Node's environment warning about `NO_COLOR` being ignored when `FORCE_COLOR` is set; this is not a browser console message.
- ProjectCard CTA was visible and at least 44×44 px at every tested home width, across desktop and mobile profiles. No horizontal overflow was found.
- Playwright captured a second set of 36 route/viewport screenshots under [`artifacts/visual/frontend-excellence/increment-0`](../../artifacts/visual/frontend-excellence/increment-0/).

### Post-foundation Lighthouse

Ran Lighthouse CI once against each of the six priority routes using the existing hard assertions (Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95). All six passed every category gate:

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 1.00 | 1.00 | 1.00 | 1.00 | 999 ms | 0.00 | 0 ms |
| `/es/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,013 ms | 0.00 | 8 ms |
| `/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 908 ms | 0.00 | 9 ms |
| `/es/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 907 ms | 0.00 | 65 ms |
| `/projects/alquileres-uspa/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,186 ms | 0.00 | 28 ms |
| `/es/projects/alquileres-uspa/` | 0.99 | 1.00 | 1.00 | 1.00 | 2,186 ms | 0.00 | 50 ms |

The six post-foundation JSON reports are in [`artifacts/lighthouse/frontend-excellence-increment-0`](../../artifacts/lighthouse/frontend-excellence-increment-0/). These are lab measurements; field CWV remains `NOT_YET_OBSERVABLE`.

### Foundation bundle delta

| Measure | Baseline | Increment 0 | Delta |
| --- | ---: | ---: | ---: |
| Home initial client JS (raw / gzip) | 0 / 0 B | 0 / 0 B | 0 B |
| Case-study initial client JS (raw / gzip) | 1,264 / 610 B | 1,264 / 610 B | 0 B |
| Linked CSS across home stylesheets | 42,852 B | 44,678 B | +1,826 B |
| Built Astro/React client runtime chunk (not referenced by any generated route) | none | 224,001 / 69,690 B gzip | build-only chunk |

The `@astrojs/react` integration emits a shared build chunk, but no generated page references or downloads it until a React island is used. React has not increased initial route JavaScript. CSS grew 1,826 bytes for the primitive styles and iOS drawer positioning rule; the visual regression matrix passed. No performance budget was changed.

### Dependency changes

Added only Astro React (`@astrojs/react@4.4.2`), React/React DOM 19.3.0, TypeScript 5.9.3 with React types, Base UI React primitives 1.8.0, Playwright Test 1.63.0, and axe Playwright 4.13.0. These provide the approved islands/primitives and executable browser/accessibility QA; no fonts, icon, animation, toast, or button package was added.

The lockfile also corrects the existing Astro/Vite resolution: baseline had `astro@5.18.2` declaring `vite: ^6.4.1` while the lock resolved Vite 8.2.0. Astro React 4.4.2 declares the same Vite range, and the clean lock now resolves both to Vite 6.4.3. This correction replaces the previously incompatible root Vite resolution; `@rolldown/pluginutils` moves 1.0.1 → 1.0.0-beta.27 as a transitive dependency of `@vitejs/plugin-react@4.7.0`. The supported build, release QA, browser, and Lighthouse checks all pass with the corrected resolution.

### Increment 0 gate

Baseline and post-foundation evidence and screenshots are persisted. Clean install, release QA, responsive/accessibility matrix, and all six Lighthouse category gates pass. Per-route client JS delta is zero; CSS and tooling bundle delta are measured; no product interaction changed. Independent Critic: PASS. Integration Review: PASS. Increment 0 gate: **PASS**.

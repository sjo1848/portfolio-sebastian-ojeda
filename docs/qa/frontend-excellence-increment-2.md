# Frontend Excellence — Increment 2

## Provenance and scope

- Phase: BUILD — Increment 2, Responsive Media Viewer.
- Execution issue: #78. Baseline defect #77 was fixed and validated before the Frontend Excellence work.
- Baseline commit: `b6a4cf40660c1706504bbe896b76c8b852e12c49` (Increment 1 merged to `main`).
- Working branch: `build/frontend-excellence-i2`.
- Product implementation remains Astro-first. Only the HMS Cloudflare evidence links gain an interactive viewer; their Markdown images, alt text, captions, dimensions, and links to the original files remain server-rendered.
- React hydrates the viewer with `client:visible`; browser assertions verify the island remains in SSR state before it enters the viewport.
- Field Core Web Vitals: `NOT_YET_OBSERVABLE`.

## Scope delivered

- Added `ResponsiveMediaViewer` to the four existing HMS Cloudflare evidence images in English and Spanish.
- Desktop opens a Base UI Dialog; mobile opens a nearly full-screen Base UI Drawer. Crossing the responsive breakpoint while open switches the surface to match the viewport.
- The full image is fit using its natural dimensions and a `ResizeObserver`; it is not cropped. Previous/next, index, captions, loading and error states, close, and original-image links are included.
- Escape, modal focus containment, initial/final focus, inert/hidden background semantics, reduced motion, safe-area padding, `100dvh`, and image-stage resize/orientation behavior are covered by browser checks.
- The static anchor remains usable if the React component fails to hydrate. Modified and non-primary clicks retain browser link behavior.
- One delegated React click handler owns the viewer interaction. No previous gallery or GIF interaction was replaced in this increment.
- No new dependency, global state, route, branding, visible CV action, or client-side router was added.

## Files and routes

- Changed: `src/components/ProjectPage.astro`, `src/styles/global.css`, `content/projects/hms-cloudflare.md`, `content/projects-en/hms-cloudflare.md`.
- Added: `src/components/ResponsiveMediaViewer.tsx`, `tests/browser/responsive-media-viewer.spec.ts`, this QA report, and a reproducible Lighthouse config.
- Routes: HMS Cloudflare EN/ES are enhanced. Home EN/ES and Alquileres EN/ES are covered for regression and bundle/Lighthouse comparison.
- Four original assets already present in `public/media/projects/hms-cloudflare/` are used; no evidence file or image reference was invented.

## Browser, interaction, and accessibility evidence

- `npm run qa:release`: PASS. Content and presentation validators, Astro diagnostics (0 errors/warnings/hints), 22-page build, SEO, static asset, social metadata, UX/accessibility, sitemap, and build validators passed.
- `npm run test:browser`: **192 passed, 133 expected skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium profile, and Mobile WebKit profile.
- The executable responsive matrix covers six primary routes at 360, 390, 430, 768, 1024, and 1440 px. Device-emulation projects intentionally skip desktop-only widths.
- Viewer interaction tests passed in Chromium, Firefox, WebKit, and Mobile WebKit. They cover deferred hydration, keyboard opening, index and boundary states, original links, full-image fit, viewport rotation and surface switch, Escape, focus containment and restore, scroll bounds, reduced motion, and zero page/console errors.
- The viewer's close, previous, and next controls are measured at or above 44×44 px.
- axe reports no WCAG A/AA violations in Dialog, Drawer, and error states using WCAG 2.0 A/AA, WCAG 2.1 A/AA, and WCAG 2.2 AA tags. The portfolio-wide accessibility baseline also passes in Chromium.
- A failed-chunk test opens the static original image in a new tab and confirms the image document loads. Modified-click handling is separately checked for an uncancelled event.
- Mobile WebKit is Playwright device emulation, not a physical iPhone Safari test. Safe-area CSS is present and computed padding is checked; a nonzero physical device inset was not available in this environment.
- Focus behavior was verified by browser keyboard interaction and focus assertions. axe is not treated as the only accessibility check.

## Screenshots

Interaction-state captures are in [`artifacts/visual/frontend-excellence/increment-2`](../../artifacts/visual/frontend-excellence/increment-2/): desktop Dialog open and intermediate item, mobile Drawer open and intermediate item, and image-error fallback. The open-state captures show the entire source image, with its original aspect ratio preserved.

## Lighthouse

Reproducible command: `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.frontend-excellence-increment-2.json`.

Three lab runs per route (18 reports) passed the existing category thresholds: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Reports are stored in [`artifacts/lighthouse/frontend-excellence-increment-2`](../../artifacts/lighthouse/frontend-excellence-increment-2/).

| Route | Performance range | Accessibility | Best Practices | SEO | Lab LCP range | CLS | TBT range |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 0.99–0.99 | 1.00 | 1.00 | 1.00 | 1,965–2,021 ms | 0.00 | 7–77 ms |
| `/es/` | 0.99–0.99 | 1.00 | 1.00 | 1.00 | 1,963–1,971 ms | 0.00 | 25–49 ms |
| `/projects/hms-cloudflare/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,665–1,747 ms | 0.00 | 42–94 ms |
| `/es/projects/hms-cloudflare/` | 1.00–1.00 | 1.00 | 1.00 | 1.00 | 1,512–1,666 ms | 0.00 | 12–53 ms |
| `/projects/alquileres-uspa/` | 0.96–0.98 | 1.00 | 1.00 | 1.00 | 2,419–2,717 ms | 0.00 | 30–70 ms |
| `/es/projects/alquileres-uspa/` | 0.95–0.98 | 1.00 | 1.00 | 1.00 | 2,492–2,718 ms | 0.00 | 52–148 ms |

Lighthouse LCP is a lab observation and does not establish field CWV. Alquileres LCP remains slightly above the 2.5 s field target in some runs; no performance budget or gate was changed and no RUM/analytics was added.

## Client JavaScript and CSS

The JS measurement sums gzip sizes of the island/renderer dependency chunks and executable inline scripts. The viewer is excluded from initial payload until its visible island hydrates; its dedicated chunk is measured separately. JSON-LD is excluded.

| Route group | Increment 1 initial gzip | Increment 2 initial gzip | I2 deferred viewer chunk | I2 after viewer loads |
|---|---:|---:|---:|---:|
| Home EN/ES | 94,403 B | 95,200 B | — | 95,200 B |
| HMS EN/ES | 95,013 B | 95,325 B | 13,199 B | 108,524 B |
| Alquileres EN/ES | 95,013 B | 95,200 B | — | 95,200 B |

The mobile-navigation shared chunk was split by Rollup into a component, shared utilities, and React renderer imports. The Home initial bundle rose by 797 B gzip and stays 4,800 B below the 100,000 B soft target. HMS stays under its 150,000 B case-study target even after opening the viewer. No budget was changed.

Home linked CSS is 50,647 B raw / 11,218 B gzip (Increment 1: 48,576 B raw / 10,812 B gzip). HMS linked CSS is 46,172 B raw / 10,066 B gzip. The change is localized to the viewer and existing site styles.

## Risks and limitations

- Alquileres lab LCP ranges to 2.718 s (EN) and 2.718 s (ES); field CWV remains `NOT_YET_OBSERVABLE`.
- Home has 4,800 B gzip remaining under its soft initial JS target. Avoid adding more globally hydrated functionality without a measured case.
- Media viewer pilot coverage is HMS Cloudflare evidence only. Existing GIF playback and other galleries remain unchanged for the next increments.
- Mobile WebKit uses browser emulation; nonzero physical safe-area inset and physical iOS Safari are not tested here.

## Review gates

- Specialist reviews: Responsive Media, Accessibility, QA/Browser, and Frontend/React completed as bounded reviews. Frontend/React findings on modifier-click preservation and viewport mode switching were corrected and re-reviewed with no remaining findings.
- Independent Critic: **PASS**. The independent reviewer checked the I2 contract, source diff, acceptance tests, screenshots, Lighthouse reports, and budget evidence.
- Integration Review: **PASS**. The reviewer confirmed static fallback, one React owner, Astro-localized mounting, accessible Dialog/Drawer behavior, no-crop rendering, >=44×44 px targets, six-route Lighthouse gates, bundle caps, and visual identity. Empty space around landscape assets on mobile was confirmed as expected from preserving the whole image.
- Increment 2 gate: **PASS**.

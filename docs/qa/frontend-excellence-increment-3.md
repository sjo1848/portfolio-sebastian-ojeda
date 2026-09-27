# Frontend Excellence — Increment 3

## Provenance and scope

- Phase: BUILD — Increment 3, Evidence Gallery and GIF parity.
- Execution issue: #78. Branch: `build/frontend-excellence-i3`.
- Baseline: Increment 2 merged to `main` at `a21d193378bd5fc43ca026393015a5d4292ae160`.
- Gallery data remains sourced from project media metadata. The zero, one, and multiple-item branches use the existing localized content; no media evidence or professional copy was invented.
- Astro renders all evidence and source links. React hydrates only the gallery with `client:visible` to provide carousel/viewer interaction.
- HMS Cloudflare’s four Markdown images remain under the existing I2 viewer, separate from the project media galleries.
- Field Core Web Vitals: `NOT_YET_OBSERVABLE`.

## Scope delivered

- Zero media: no empty gallery section or client island. One item: static evidence and viewer without carousel controls. Multiple items: desktop grid and mobile scroll-snap carousel.
- Carousel controls include previous/next, current position, keyboard operation and native touch scrolling; there is no autoplay or loop. Reduced-motion preferences are respected.
- Images keep explicit natural dimensions, complete source framing, localized alt/captions, lazy loading, and links to original assets. The viewer uses the existing I2 Dialog/Drawer behavior.
- GIF media remains unloaded until Play; Stop removes the active GIF, and replay is explicit. Error state, accessible text, alt/caption, and original GIF link remain available.
- Removed `ProjectPage.astro`’s imperative GIF listeners in this increment when React assumed that interaction. The unrelated native hash stabilizer remains the sole owner of gallery anchor stabilization.
- No dependency, route, global state, branding, visible CV action, or client router was added.

## Files and routes

- Changed: `src/components/ProjectPage.astro`, `src/components/ResponsiveMediaViewer.tsx`, `src/styles/global.css`.
- Added: `src/components/EvidenceGallery.tsx`, `tests/browser/evidence-gallery.spec.ts`, the Lighthouse configuration, screenshots, and this report.
- Route variants tested: Home EN/ES; HMS Cloudflare EN/ES; Alquileres EN/ES; gallery-specific zero-item JM Soluciones EN/ES, one-item Taco Loco EN/ES, multiple-item Alquileres EN/ES, and HMS Elite GIF behavior.

## Validation and browser evidence

- `npm run qa:release`: PASS. Content/presentation validators, Astro diagnostics (0 errors, warnings, hints), 22-page build, social/static asset, metadata, SEO, UX/accessibility, build, and sitemap validators passed.
- Full `npm run test:browser` on an isolated fresh preview at port 4183: **220 passed, 155 expected skips, 0 failures** across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. It ran before the final semantic correction described below.
- After removing the invalid figure role, the complete focused Evidence Gallery matrix was rerun: **28 passed, 22 expected skips, 0 failures** across the same five profiles. `npm run qa:release` also passed again after this correction.
- The full executable responsive matrix covers the six priority routes at 360, 390, 430, 768, 1024, and 1440 px. Mobile device-emulation projects run the applicable 360/390/430 widths.
- Tests cover zero/one/multiple item cases; client-visible hydration; carousel grid vs scroll-snap layout; image natural-ratio preservation; buttons, touch scroll and keyboard; boundaries/index; viewer opening/focus restore; GIF deferred request/play/stop/replay and error fallback; and the static original-link fallback when the gallery chunk fails.
- Axe runs on gallery initial, intermediate, and viewer states at the focused Chromium mobile viewport. Existing portfolio axe coverage remains green on all six primary routes. Manual browser assertions cover keyboard operation, focus restoration, touch use, and control target sizes.
- A first full test invocation reused an old preview on port 4173 that served the Increment 2 output; its gallery-only failures were stale-build test setup. The suite was rerun against the fresh, isolated 4183 preview and passed. No stale-preview result is included in the pass count.
- Mobile Safari is browser/device emulation, not a physical iPhone test.

## Screenshots

Captures in [`artifacts/visual/frontend-excellence/increment-3`](../../artifacts/visual/frontend-excellence/increment-3/) show the desktop gallery grid, mobile first and intermediate carousel states, the open viewer, and the GIF error state. The images are contained without cropping; the original links open complete assets.

## Lighthouse

Reproducible command: `npx --yes @lhci/cli@0.15.1 autorun --config=artifacts/lighthouse/lighthouserc.frontend-excellence-increment-3.json`.

Three lab runs per route (18 reports) use the unchanged thresholds: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95. Final post-rework reports are stored in [`artifacts/lighthouse/frontend-excellence-increment-3-final`](../../artifacts/lighthouse/frontend-excellence-increment-3-final/). The first Lighthouse run exposed an invalid figure role; the markup was corrected and the six-route Lighthouse set was rerun before these final reports were recorded.

| Route | Performance | Accessibility | Best Practices | SEO | Lab LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,687–1,971 ms | 0.00 |
| `/es/` | 0.99–0.99 | 1.00 | 1.00 | 1.00 | 1,965–1,968 ms | 0.00 |
| `/projects/hms-cloudflare/` | 1.00–1.00 | 1.00 | 1.00 | 1.00 | 1,444–1,662 ms | 0.00 |
| `/es/projects/hms-cloudflare/` | 0.99–1.00 | 1.00 | 1.00 | 1.00 | 1,513–1,766 ms | 0.00 |
| `/projects/alquileres-uspa/` | 0.96–0.97 | 1.00 | 1.00 | 1.00 | 2,562–2,747 ms | 0.00 |
| `/es/projects/alquileres-uspa/` | 0.96–0.98 | 1.00 | 1.00 | 1.00 | 2,426–2,720 ms | 0.00 |

Lab LCP is not field CWV data. Alquileres remains above 2.5 s in some lab runs, consistent with the I1/I2 risk; the highest observed run is 2,747 ms EN and 2,720 ms ES. Lighthouse initially identified invalid ARIA `group` on an HTML `<figure>` in the Alquileres slide markup; removing it preserved native figure/caption semantics and the accessible slide label/description. The clean rerun has 100% Accessibility on all six routes and zero `aria-allowed-role` audit failures in all 18 reports. No RUM/analytics or performance threshold changes were introduced.

## Client JavaScript and CSS

Initial payload is deferred for galleries through `client:visible`. The gallery chunk is 4.32 kB raw / 1.787 kB gzip; the existing viewer chunk is 35.79 kB raw / 13.210 kB gzip. React’s 66.043 kB gzip renderer is already part of the primary navigation payload. The viewer is a deferred gallery dependency and is not counted in initial JavaScript when below the fold. One-item and multi-item galleries share this same deferred module; the single-item UI still has no carousel controls.

| Route group | I2 initial gzip | I3 initial gzip | I3 deferred gallery/viewer | Soft target |
|---|---:|---:|---:|---:|
| Home EN/ES | 95,200 B | 95,200 B | — | 100,000 B |
| HMS Cloudflare EN/ES | 95,325 B | 95,325 B | 13,210 B viewer | 150,000 B |
| Alquileres EN/ES | 95,200 B | 95,200 B | 14,997 B gallery + viewer | 150,000 B |
| HMS Elite EN/ES | 95,200 B | 95,200 B | 14,997 B gallery + viewer | 150,000 B |

Taco Loco also adds the same 14,997 B deferred gallery + viewer bundle for its single static evidence item. Deferred chunks are not part of the initial budgets above. Initial JS delta versus I2 is 0 B on the six priority routes. Shared linked CSS is 49,086 B raw / 10,544 B gzip on case studies (I2: 46,172 B / 10,066 B); Home also has a 4,475 B raw / 1,152 B gzip page stylesheet (total 53,561 B / 11,696 B; I2 Home: 50,647 B / 11,218 B). The global stylesheet delta is +2,914 B raw / +478 B gzip.

## Risks and limitations

- Field CWV remains `NOT_YET_OBSERVABLE`; Lighthouse lab scores do not establish INP/LCP/CLS field compliance.
- Mobile WebKit uses browser emulation; no physical iOS Safari run was available.
- `client:visible` means a gallery’s interactive viewer/carousel is not expected to work if its island fails before hydration. SSR evidence and original asset links remain usable.
- Existing I2 Alquileres LCP variability remains visible for comparison. No budget or gate was changed.

## Review gates

- Specialist preflight: responsive, accessibility, and frontend/GIF audits found no material gate; their risks were represented in implementation and tests.
- Independent Critic: **PASS** after checking the original contract, final source, evidence report, Lighthouse results, bundles, and post-correction validation. The initial REWORK for missing metrics and an invalid ARIA role was addressed and revalidated.
- Integration Review: **PASS**. The reviewer verified all 18 final Lighthouse reports against this table; the six routes pass all floors, all three non-performance categories are 1.00, CLS is 0, no invalid `aria-allowed-role` remains, and deferred bundle sizes match the build output.
- Increment 3 gate: **PASS**.

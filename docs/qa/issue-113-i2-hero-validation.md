# Issue #113 — I2 hero and lead-card validation

> Historical I2 checkpoint. The final exact-candidate Release QA, all-route Lighthouse matrix, LCP results, responsive captures and remaining gates are consolidated in [I8 release validation](issue-113-i8-release-validation.md). The candidate is `a3302c85934692403d675a2811124a6697e4a552`.

**Baseline:** `1f08956c93cb70b85f6d81d6c35aeb805630fcd9`
**Current candidate:** working tree after I2 hero, I3 card, I1 motion foundation
**Field CWV:** `NOT_YET_OBSERVABLE`

## Approved evidence and provenance

Hero source: `public/media/projects/hms-cloudflare/cf-i04-reception-cover-authorized.png` (1440×900, SHA-256 `8e9d6e1f99ce46502ffb98fd3d955a69de2607e23a8fb41039c66469e2c673fd`). A build-time copy at `src/assets/media/projects/hms-cloudflare/cf-i04-reception-cover-authorized.png` is byte-identical and feeds Astro's responsive image service. The proof model now records this exact source path and hash. Visible captions preserve its local runtime, Playwright and staging-data provenance and state that it does not represent Product Acceptance or production release.

Astro generated AVIF and WebP candidates for widths 360, 540, 720, 960, 1200 and 1440, with an intrinsic 1440×900 image and explicit `sizes`. The 360 px AVIF derivative is about 3 KB and the 1440 px AVIF about 28 KB; browser selection is responsive, eager and high-priority. PNG remains the fallback. The hero image is a real `<picture>` rendered by Astro and adds no client island.

Selected Work uses the already-approved HMSC housekeeping capture (`cf-i05-housekeeping-authorized.png`) with its own local-regression caption, not the reception hero image. The AI Commerce card remains typographic. Lead order, status labels, professional copy and navigation targets are unchanged.

## Before / after Lighthouse

Measured three times per Home locale using the same Lighthouse configuration and thresholds as I0 (Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95, SEO ≥0.95). The table shows the median LCP and Performance score across the three runs; raw reports and config are in `artifacts/lighthouse/issue-113-i0/` and `artifacts/lighthouse/issue-113-i2-lcp/`.

| Route | LCP before (ms) | LCP after (ms) | Delta | Performance before → after | Other after categories |
|---|---:|---:|---:|---:|---:|
| `/` | 2,286 | 2,170 | −116 ms | 0.96 → 0.95 | A11y 1.00, BP 1.00, SEO 1.00 |
| `/es/` | 2,209 | 2,222 | +13 ms | 0.99 → 0.99 | A11y 1.00, BP 1.00, SEO 1.00 |

All six after-runs satisfy configured median assertions. One EN run had Performance 0.89, but the existing gate is explicitly configured to aggregate three runs by median (0.95); no threshold was altered. Median LCP stayed near baseline in both locales and improved for EN. Lighthouse CLS was 0 for both representative runs. Lab values do not establish field CWV.

The same initial-JS script reports **94,062 B gzip** for Home EN/ES before and after; there is no JS delta, leaving 5,938 B below the 100,000 B Home limit. Case routes remain under their 150,000 B limit. Lighthouse Home Performance, Accessibility, Best Practices and SEO all pass the existing thresholds.

## Responsive and interaction checks

`tests/browser/visual-excellence.spec.ts` validates the H1, three ordered lead cards and CTAs, accessible evidence alt, source dimensions, responsive AVIF/WebP candidates, eager/high-priority loading, image provenance/limitation caption, no overflow, distinct HMSC media between hero and Selected Work, and the two-column/stacked responsive composition at 360, 390, 430, 768, 1024 and 1440 px in both locales. Axe WCAG 2.2 AA runs on the 390 and 1440 px states. A dedicated reduced-motion test checks static content availability and CSS scroll/transition durations.

Local Chromium execution: `npx playwright test --config=playwright.issue113.local.config.ts tests/browser/visual-excellence.spec.ts --project=chromium` — 13 passed. The local config used an already-running static preview and was removed after the run. `npm run qa:release` passed with 65 Astro files and zero diagnostics before the final small caption-size and quick-scan CSS refinements; a complete release validation remains required after all increments.

## Design choices

- The hero radial is no longer dominant; the surface uses the existing Stone / Andes Copper tokens and a restrained editorial split.
- The approved role, summary, CTAs, lead links and status remain visible as static HTML.
- The image sits beside the copy at tablet/desktop widths and below the recruiter path on mobile.
- The caption remains at least 12 px and visible without JavaScript.
- No new dependency, island, tracking, font, claim, project URL, or product status was added.

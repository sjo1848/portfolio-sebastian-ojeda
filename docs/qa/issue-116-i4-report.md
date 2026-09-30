# Issue #116 — I4 Selected Work editorial index

**Gate:** I4 PASS
**Implementation commit:** `877ea1f5c74deb725c694f1c1ff10e0cbe8e57b3`
**Branch:** `build/issue-116-cplus-baseline`
**Date:** 2026-09-30

## Scope completed

Replaced the three generic Home project cards with the approved static C+ two-zone index: three always-readable project rows and a desktop evidence pane; mobile uses an inline HMS capture without the side-pane model. Rows remain ordinary case-study anchors, in the approved order. Each row is a single link containing an `h3`, category, approved signal, and visible case-study CTA. No status, project claim, lifecycle, or long-form content was rewritten.

The initial HMS pane uses only the registered reception cover and shows its runtime caption, factual status, role, stack signal, and proof limitation. The mobile HMS evidence uses the registered housekeeping capture and its local-regression caption. Alquileres is not given an unregistered image; AI Commerce stays typographic. All three case links and the static HMS evidence work without JavaScript. No interaction or signature motion has been added in I4.

## Validation

| Check | Result |
|---|---|
| `npm run qa:release` | PASS; content/presentation validators, Astro check (71 files, 0 errors/warnings/hints), 22-page build, metadata, SEO, accessibility and 20-URL sitemap checks passed |
| I4 + axe + mobile CTA tests on Chromium and Mobile WebKit | PASS: 36 passed, 16 skipped (axe suite is configured to skip the Mobile WebKit project); all 16 axe Home/case base checks passed in Chromium |
| Migrated regression suite on Chromium | PASS: 85 passed |
| ES/EN lead order and routes | PASS: HMS Cloudflare, Alquileres Uspallata, AI Commerce + HMS |
| Keyboard/no-JS | PASS: normal anchor links, visible focus, static evidence, all key Home links survive disabled JavaScript |
| Responsive | PASS: 360/390/430/768/1024/1440 for Home ES/EN, no horizontal overflow; mobile evidence is inline, desktop pane appears at 768px+ |
| Browser console/page errors | Zero for captured states and targeted checks |
| Home initial JS gzip | 94,062 B EN and ES, unchanged from I0; 5,938 B below the 100,000 B cap |
| New dependency / island | None |

Commands:

```sh
npm run qa:release
ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/issue-116-i4-selected-work.spec.ts tests/browser/project-card-mobile.spec.ts tests/browser/accessibility-baseline.spec.ts --project=chromium --project=mobile-webkit
ASTRO_PREVIEW_BACKGROUND=0 npx playwright test tests/browser/home-information-hierarchy.spec.ts tests/browser/visual-excellence.spec.ts tests/browser/home-capability-method.spec.ts tests/browser/responsive-matrix.spec.ts tests/browser/mobile-navigation.spec.ts --project=chromium
node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs
```

The 85-test migrated regression suite intentionally replaces ProjectCard assumptions with editorial row and mobile/desktop evidence expectations; the six original failures were assertions expecting the desktop pane on mobile and were corrected to assert the approved inline mobile evidence instead. The final run passed all 85 tests.

## Evidence

- EN/ES Selected Work screenshots at 390/1440 and viewport/route/error manifest: [`artifacts/visual/issue-116-i4/`](../../artifacts/visual/issue-116-i4/)
- Static editorial component: [`src/components/SelectedWorkIndex.astro`](../../src/components/SelectedWorkIndex.astro)
- Targeted I4 and no-JS/anchor tests: [`tests/browser/issue-116-i4-selected-work.spec.ts`](../../tests/browser/issue-116-i4-selected-work.spec.ts)

I4 is complete and will be pushed before I5. I5 remains the authorized next increment. I6 is not started and remains blocked pending Controller authorization after the I5 checkpoint.

# Issue #116 — I2 C+ visual foundation

## Gate

**I2: PASS — submitted for Controller visual review.** I3 / Hero signature motion has not started.

## Source and branch

- Branch: `build/issue-116-cplus-baseline`
- Parent I1 HEAD: `26f78f2944a21104c52904de9f60a72c303fa119`
- `origin/main` at start: `658a5506e88beecbe28c2f5ade4c2705c4ad59e8`
- I2 implementation commit: `33c15ae792b69df71cc621b7059aa929a17a6f2c`.
- No merge or deployment performed.

## Delivered

- Added C+ editorial type scale and section rhythm using existing Inter, Stone, and Andes Copper tokens.
- Built a static responsive Hero composition with low-contrast technical grid, offset three-line headline, copper marker/rule, separated lead and metadata/CTA hierarchy. Hero remains semantic Astro/HTML/CSS; it contains no media, project roster, or animation.
- Kept Selected Work's I1 card structure and content intact, applying only static surface/rule treatments and reducing rounded-card/shadow styling. Its editorial index, preview pane, and active interaction remain deferred.
- Set Operating Mindset as the night technical section with indexed rules and three columns at desktop, one column on mobile.
- Kept About calmer and Additional Work compact/index-like; retained the dark Contact conversion panel.
- No new dependency, JavaScript, island, project claim, status, or project content.

## Files changed

- `src/styles/branding.css`
- `src/components/HomePage.astro`
- `tests/browser/home-information-hierarchy.spec.ts` (title-line geometry checks added to the EN/ES width matrix)
- `scripts/capture-issue-116-i2.mjs`
- `artifacts/visual/issue-116-i2/` (four captures and manifest)
- `docs/qa/issue-116-i2-report.md`

## Validation

- `npm run qa:release` — PASS. Content/presentation validators, Astro check (66 files, 0 errors/warnings/hints), static build (22 pages), social card/assets/metadata, SEO/structured data, UX/accessibility, build, and sitemap checks passed.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run test:browser -- tests/browser/home-information-hierarchy.spec.ts tests/browser/home-capability-method.spec.ts tests/browser/accessibility-baseline.spec.ts tests/browser/mobile-navigation.spec.ts tests/browser/visual-excellence.spec.ts` — 245 cases: 125 passed, 119 skipped by existing project/test annotations, one intermittent mobile-WebKit 360px Sheet-bound assertion failed on the initial parallel run. The same check passed on an isolated retry and on all three serial repeats (`--project=mobile-webkit --grep "short 360px" --repeat-each=3 --workers=1`). The keyboard/focus navigation cases passed across supported desktop browser projects and mobile profiles.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run test:browser -- tests/browser/mobile-navigation.spec.ts --project=mobile-webkit --grep "short 360px" --repeat-each=3 --workers=1` — PASS, 3/3.
- Home content/hierarchy tests passed in Chromium, Firefox, WebKit, mobile Chromium, and mobile WebKit for EN and ES at 360, 390, 430, 768, 1024, and 1440 px. These tests assert `documentElement.scrollWidth`, every Hero line's actual horizontal bounds against the Hero and viewport, visible content, and clean console/page errors.
- `tests/browser/accessibility-baseline.spec.ts` — Home EN/ES axe WCAG 2.2 AA checks passed at 390 and 1440 px in Chromium. Repository accessibility validator passed across 22 generated HTML pages.
- `tests/browser/home-capability-method.spec.ts` — EN/ES no-JavaScript content, links, section order, and navigation checks passed in all browser projects where enabled.
- Mobile navigation keyboard/focus/locale checks passed; reduced-motion Home check passed. The responsive capture matrix recorded zero console errors and no horizontal overflow.
- `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` — Home `/` and `/es/`: **94,062 B gzip** (8 initial files, 2,125 B inline script), unchanged from the accepted I0/I1 baseline and 5,938 B below the hard 100,000 B limit. I2 adds no client JavaScript.
- `SOURCE_COMMIT=$(git rev-parse HEAD) node scripts/capture-issue-116-i2.mjs` — PASS; 4 required first-screen captures, 4 full-page captures, 12 EN/ES width measurements, zero horizontal overflow or console errors.
- `git diff --check` — PASS.

The mobile-WebKit Sheet-bound assertion was inconsistent only under parallel load: 1 failure in the first 245-case run, followed by 1 isolated pass and 3/3 serial repeat passes. It is recorded transparently as a test flake; no navigation implementation was changed under I2.

## Screenshot and responsive evidence

The machine-readable capture manifest is `artifacts/visual/issue-116-i2/manifest.json`. It records Chromium version, console errors, screenshot hashes, viewport/document widths, image load states, and the measured bounds of all three title lines. Required first-screen captures:

- `home-en-390.png`
- `home-en-1440.png`
- `home-es-390.png`
- `home-es-1440.png`

Corresponding `*-full.png` captures show the full Home rhythm and ensure deferred evidence images were decoded before capture.

The EN/ES responsive matrix in the manifest covers all six requested widths: 360, 390, 430, 768, 1024, and 1440 px. Every measured title line stayed inside the Hero and viewport; document width did not exceed viewport width.

## Visual findings / deviations

- The 360 px layout conservatively reduces the DEVELOPER offset and removes only the short decorative terminal rule at that narrow breakpoint; all role text remains visible and the editorial stagger remains.
- No clipping or unsafe viewport-edge contact was observed at 360, 390, or 430 px.
- The static composition has no signature motion. The selected-work cards remain in their existing functional grid pending the later contracted index increment.
- No other deviation from the I2 contract is known.

No I2 product decision or Human Gate is required. Stop for Controller visual review; do not start I3 until authorized.

# Issue #116 — bounded I2 rework

## Result

**I2-F1 and I2-F2: PASS. I3 remains blocked for Controller review.**

Implementation/evidence commit: `1e00e547e6e0331f2e2ed89a2dec7698e2939d5e`.

## Bounded changes

- Tightened only desktop-wide Hero top and bottom padding. The display type size and offsets remain unchanged.
- Returned `DEVELOPER` to ink and removed the terminal line after the word. The short copper eyebrow marker/rule remains the structural accent and can continue into the later M2 handoff.
- Left IA, EN/ES copy, selected project cards, supporting section content, dependencies, client JS, claims/statuses, and all motion unchanged.

## Screenshots and geometry

Capture manifest: [`artifacts/visual/issue-116-i2-rework/manifest.json`](../../artifacts/visual/issue-116-i2-rework/manifest.json).

Revised captures:

- [EN 390×844](../../artifacts/visual/issue-116-i2-rework/home-en-390.png)
- [ES 390×844](../../artifacts/visual/issue-116-i2-rework/home-es-390.png)
- [EN 1440×900](../../artifacts/visual/issue-116-i2-rework/home-en-1440.png)
- [ES 1440×900](../../artifacts/visual/issue-116-i2-rework/home-es-1440.png)
- [EN 1366×768](../../artifacts/visual/issue-116-i2-rework/home-en-1366x768.png)
- [EN 1440×900 explicit height capture](../../artifacts/visual/issue-116-i2-rework/home-en-1440x900.png)

Chromium measured all CTAs and lead geometry; EN and ES passed at both desktop viewports. Primary and Resume button rectangles:

| Locale / viewport | Primary CTA rectangle (x, y, width, height) | Resume rectangle (x, y, width, height) | Lead bottom | Document width |
|---|---:|---:|---:|---:|
| EN 1366×768 | (784.3, 642.1, 208.8, 50.8) | (1007.5, 642.1, 195.9, 50.8) | 630.9 | 1366 |
| ES 1366×768 | (784.3, 642.1, 257.3, 50.8) | (1056.0, 642.1, 155.7, 50.8) | 630.9 | 1366 |
| EN 1440×900 | (821.3, 644.5, 208.8, 50.8) | (1044.5, 644.5, 195.9, 50.8) | 633.3 | 1440 |
| ES 1440×900 | (821.3, 644.5, 257.3, 50.8) | (1093.0, 644.5, 155.7, 50.8) | 633.3 | 1440 |

All CTA rectangles are wholly inside the viewport. Automated EN/ES title geometry checks at 360, 390, and 430 px passed with no horizontal overflow. The closest measured right edge was 349.9 px at width 430; every line remained inside the viewport. All six mobile captures/measurements and all four desktop checks reported zero console errors and zero page errors.

## Validation commands

- `npm run qa:release` — PASS; content/presentation validators, Astro check (68 files, 0 errors/warnings/hints), 22-page static build, social card/assets/metadata, SEO/structured data, accessibility/UX, and sitemap checks passed.
- `ASTRO_PREVIEW_BACKGROUND=0 npm run test:browser -- tests/browser/home-information-hierarchy.spec.ts tests/browser/home-capability-method.spec.ts tests/browser/accessibility-baseline.spec.ts tests/browser/visual-excellence.spec.ts` — PASS; 245 cases, 113 passed, 132 skipped by existing project/test annotations, zero failed. Chromium executed the desktop CTA rectangle assertions for EN/ES at 1366×768 and 1440×900. EN/ES title geometry ran at 360/390/430/768/1024/1440 across Chromium, Firefox, WebKit, mobile Chromium, and mobile WebKit. Axe Home EN/ES passed at 390 and 1440 px in Chromium. No-JS and reduced-motion checks passed where configured.
- `BASE_COMMIT=$(git rev-parse HEAD) node scripts/capture-issue-116-i2-rework.mjs` — PASS; six required screenshots, four bilingual desktop measurements, and six EN/ES mobile title measurements; zero geometry or console/page errors.
- `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` — Home EN `/` and ES `/es/`: **94,062 B gzip**, unchanged from baseline; under the 100,000 B budget.
- `git diff --cached --check` — PASS for the I2 rework commit.

No additional visual deviation or open I2 finding remains. This report records the bounded rework only; wait for Controller review before I3.

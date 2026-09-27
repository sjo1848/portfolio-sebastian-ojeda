# Frontend Excellence — Increment 5

## Provenance and scope

- Phase: BUILD — Increment 5, Copy Action.
- Execution issue: #78. Branch: `build/frontend-excellence-i5`.
- Baseline: Increment 4, including the Lighthouse report and initial client-JS estimates in [`frontend-excellence-increment-4.md`](./frontend-excellence-increment-4.md).
- Adds one localized copy-email action in the Home contact section. The existing `mailto:` link and visible, selectable email address remain available as static fallbacks, including when both clipboard APIs fail. No URL-copy behavior, toast, dependency, global state, branding change, or other contact redesign was introduced.
- Field Core Web Vitals remain `NOT_YET_OBSERVABLE`; this interaction does not add analytics or RUM.

## Implementation

- New `CopyAction` React island hydrates with `client:idle` and uses the existing `.button.button-secondary` contract.
- State feedback is inline and announced through a stable polite `role="status"`: idle, localized pending label, copied, or localized failure.
- Copied/error feedback remains announced for 8 seconds before a timer returns it to idle; browser coverage verifies the message stays available until reset.
- Uses `navigator.clipboard.writeText` when available, then a temporary selected textarea with `execCommand('copy')` as a legacy fallback. If both fail, the visible email address remains selectable for manual copying and the inline message directs the user to the email link.
- Button is keyboard-operable through native Enter/Space behavior and retains the existing minimum 44 px target.
- ES/EN labels and messages are defined alongside existing Home copy.

## Files and evidence

- Changed: `src/components/HomePage.astro`, `src/data/site.ts`, `src/styles/global.css`, `src/styles/supporting-sections.css`, and the bounded I4 screenshot-test stabilization in `tests/browser/case-study-contents.spec.ts`.
- Added: `src/components/CopyAction.tsx`, `tests/browser/copy-action.spec.ts`, this report, and screenshots under [`artifacts/visual/frontend-excellence/increment-5`](../../artifacts/visual/frontend-excellence/increment-5/).
- Browser coverage checks success, permission/API rejection and inline error, Clipboard API absent with legacy fallback, mailto availability when the island bundle is blocked, keyboard activation and focus retention, gradual feedback reset, axe WCAG 2.2 AA in idle/copied/error states, and ES/EN visual states. Axe state scans run once in desktop Chromium for both locales; functional behavior runs across all five browser profiles.
- Responsive target and horizontal-overflow checks run at 360, 390, and 430 px for both language routes.
- Screenshots cover ES/EN idle, success, and error states at 390 px. The captures use the production build.

## Validation

- `npm run qa:release`: PASS after final source, including `astro check` (54 files, 0 errors/warnings/hints), 22-page static build and the existing content, presentation, asset, SEO, UX, fragment, and sitemap validators.
- Focused Playwright: **33 passed, 12 expected skips, 0 failed** across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit after final fallback, focus, feedback reset, 360/390/430, and contrast changes. Timed reset runs once in Chromium; axe state scans run on desktop Chromium to avoid duplicating expensive audits across the browser matrix.
- Axe WCAG 2.2 AA tagged checks pass in idle, copied, and error states in both locales. Page errors: none in focused cases.
- Screenshots show ES/EN idle, copied, and error states at 390 px with the selectable address visible. I inspected the EN states after scrolling to Contact; inline feedback is legible against the dark panel.
- The PR workflow's full suite exposed a timing race in the existing I4 TOC visual capture after viewport change. The test now waits for font/layout stability, forces an instant scroll, and confirms the document reached its end; the Chromium visual case passed 5/5 local repetitions. The full suite and Lighthouse are pending rerun on the amended PR. Field CWV remain `NOT_YET_OBSERVABLE`.

## Bundle and risks

- Previous Increment 4 Home initial-JS estimate: 95,200 B gzip. The added component chunk is 1.38 kB raw / **0.75 kB gzip**, for an estimated Home initial payload of about 95,950 B gzip, still within the approved 100 KB target. Existing runtime was already part of the Home navigation island payload.
- Shared CSS is 52,801 B raw / 11,036 B gzip versus Increment 4's 52,397 B / 10,937 B, a delta of +404 raw / +99 gzip. The Home route stylesheet remains 4,475 B / 1,175 B gzip, for 57,276 B raw / 12,211 B gzip total Home CSS.
- The fallback API `document.execCommand('copy')` is deprecated by browsers but retained only as the requested no-dependency compatibility path; if a browser rejects both methods, the inline message directs the user to the still-present email link.
- Mobile WebKit checks use device emulation, not physical-device Safari.

## Review gates

- Frontend implementation: PASS.
- Accessibility review: PASS after regenerated-state visual inspection and keyboard/focus/axe/reset validation.
- Independent Critic: PASS after the visible manual-copy fallback and non-abrupt 8-second feedback reset were implemented and tested.
- Integration Review: PASS after reviewing final scope, ownership, bundle/CSS delta, report and evidence.
- Increment 5 gate: PASS; repository PR checks remain before merge.

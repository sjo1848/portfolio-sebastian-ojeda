# Issue #127 — Hero A+ BUILD & QA

**Candidate:** `build/issue-127-aplus` from `origin/main` `5f478a2b2da7ee470699e09e1e9587ded7f312fd`  
**Canonical decision:** Issue #125 Controller Review comment `5963507804`; Product Owner approval comment `5963563511`; Issue #127 is the BUILD contract.  
**Scope:** Hero A+ only. No #124 changes, no case study or Selected Work changes, no merge or deploy.

## B0 — baseline

See [issue-127-b0-baseline.md](issue-127-b0-baseline.md). Baseline `npm run qa:release` passed at the pinned `main` SHA.

## B1 — semantic structure and content

- Replaced only the Hero copy with the exact approved EN/ES eyebrow, thesis, lead, metadata and CTA.
- Order is eyebrow → thesis → integrated signal → lead → metadata → actions → existing Selected Work.
- The action row contains `View selected work` / `Ver trabajo seleccionado` and `GitHub ↗`; the Hero has no Resume CTA. Existing header and contact Resume paths remain.
- Added a decorative inline SVG trace with three constraint/validation gates. It is nonessential and hidden from assistive technology.
- Updated the content and presentation validators to assert the frozen copy, signal presence and no-Resume-in-Hero rule.

## B2 — responsive behavior

- Single-column fluid Hero tested in EN/ES at 320, 360, 390, 430, 768, 1024 and 1440 CSS px; no horizontal overflow or clipped thesis lines.
- At 320 px, the thesis scales down and the two actions stack. At 390 px and above, the actions share a row when they fit and can wrap.
- Existing mobile Sheet, breakpoints and navigation are unchanged. Selected Work and lower page sections are unchanged.
- Eyebrow and metadata remain at least 10 px on mobile.

## B3 — entrance, interaction and reduced motion

| Element/state | Implementation |
|---|---|
| M0 | All HTML copy and actions are visible in the first paint; no loading gate or opacity hiding. |
| H1 | Three lines settle with 55 ms stagger; maximum X offset 18 px desktop and 8 px mobile; 610 ms per line, total last line finishes at 720 ms; `cubic-bezier(0.22, 1, 0.36, 1)`. |
| Signal | Inline SVG path draw from normalized dash offset `0.8` to `0`, 560 ms, same easing; the irregular input segment is visible at M0, the trace advances through M1/M2 and settles complete; static complete trace is the reduced-motion state. |
| Lead | 8 px Y → 0, begins at 260 ms, 420 ms duration. |
| Metadata | 8 px Y → 0, begins at 340 ms, 330 ms duration. |
| Actions | 8 px Y → 0, begins at 440 ms, 280 ms duration. |
| M4 | Pointer hover and keyboard `:focus-visible` both move the arrow 4 px X / −2 px Y over 160 ms; the existing `--focus` outline stays authoritative. |
| MR | `prefers-reduced-motion: reduce` renders the settled title, full trace and copy directly; no staged entrance. |

Motion uses CSS only. It changes transforms and SVG stroke drawing; no text depends on motion.

## B4 — Hero to Selected Work handoff

The primary CTA remains a normal `#projects` anchor. It reuses the existing one-shot IntersectionObserver handoff in `src/scripts/selected-work-enhancement.ts`; the existing Selected Work rule transitions over 380 ms in `src/styles/selected-work.css`. The BUILD adds the explicit positioning context for its rule. No new script or Hero runtime was added. Browser evidence confirms the CTA sets both handoff states and the existing rule has a 380 ms transition.

## B5 — validation

- `npm run qa:release`: PASS after implementation. Content and presentation validators, Astro check (78 files, 0 errors/warnings/hints), 22-page production build, social/static assets, metadata, SEO, UX/accessibility, build and sitemap checks passed.
- Targeted Playwright run: **112 cases, 75 passed, 37 skipped by existing project-specific test annotations, 0 failed**. It covers the A+ matrix, Home hierarchy, axe checks, reduced motion, keyboard focus/hover, no-JS, mobile navigation, and Selected Work regression in Chromium desktop/mobile projects.
- Home initial JavaScript: **95,239 B gzip** (8 initial files; 0 visible-deferred bytes), **4,761 B below** the 100,000 B cap and +109 B vs. the recorded #116 I8 measurement of 95,130 B. The A+ signal and entrance motion add no JavaScript or dependency.
- Static visual evidence: [output/playwright/issue-127-aplus/](../../output/playwright/issue-127-aplus/) with M0, ~180 ms, ~460 ms, settled, keyboard focus, M5 handoff, EN/ES mobile and reduced-motion PNGs. Dimensions and SHA-256 digests are in `manifest.json`.
- Controller REWORK validation: deterministic A+ Playwright test pauses/seeks the CSS signal animation at 0, 180 and 560 ms through Web Animations API and asserts offsets `0.8`, a strictly intermediate value, and `0`; the animation duration is asserted as 560 ms. Targeted Issue #127 suite passed **19/19** after the repair. M0/M1/M2/settled screenshots and their manifest digests were regenerated from the current production build.
- No Hero image or external font was added. The signal has fixed responsive height; the motion does not animate layout properties, so no new LCP image cost or motion-driven CLS is introduced.
- The browser test runner emitted Node's benign `NO_COLOR`/`FORCE_COLOR` warning. `npm ci` also reported its local allow-scripts policy blocked the `esbuild` postinstall script; `astro check`, production build and all validations passed.

## B6 — independent critic

**Status:** PASS, including the Controller REWORK. The independent critic re-reviewed the scoped diff and verified the normalized `0.8 → 0` signal keyframe, 560 ms timing, deterministic Web Animations API test, reduced-motion settled offset, M0 irregular segment visibility, and regenerated screenshot/manifest values. No actionable defect was reported.

The earlier handoff correction remains: the existing Selected Work handoff is reused without a duplicate animation.

## Limitations

- No new Lighthouse run was made; the changed Hero adds no raster asset, client script, or dependency. The release build and JS budget were measured directly.
- Mobile navigation and Selected Work evidence files under older QA artifact directories were regenerated by Playwright and restored to their tracked baseline contents; only new Issue #127 screenshots remain in this evidence directory.

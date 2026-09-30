# Issue #113 — I8 validation and release candidate

**Candidate:** `a3302c85934692403d675a2811124a6697e4a552`
**Baseline:** `1f08956c93cb70b85f6d81d6c35aeb805630fcd9`
**Phase:** I0–I8 complete; I9 Release/Learn is pending PR gates and production verification.
**Production canonical:** `https://sebastian-ojeda.pages.dev`
**Field Core Web Vitals:** `NOT_YET_OBSERVABLE`

## Delivered increments

- **I0 — baseline:** 59 screenshots across eight ES/EN routes, six widths, and eleven first-screen/interaction states. Baseline manifest records source commit, viewport/dimensions, hashes, console errors, overflow and observed layout shifts in `artifacts/visual/issue-113-i0/`.
- **I1 — foundations:** added M1–M2 motion tokens and global reduced-motion behavior; no dependency, new island, or client JavaScript.
- **I2 — hero:** replaced the dominant radial with an editorial Stone / Andes Copper composition and an approved HMS Cloudflare reception capture. Astro produces responsive AVIF/WebP/PNG candidates with explicit intrinsic dimensions, `sizes`, eager load, and high priority. The visible bilingual caption preserves local-runtime provenance and non-production / non-acceptance limits. Source SHA-256: `8e9d6e1f99ce46502ffb98fd3d955a69de2607e23a8fb41039c66469e2c673fd`.
- **I3 — lead work:** the HMS Selected Work card uses the distinct approved housekeeping capture with its own regression caption. AI Commerce remains typographic; lead order and every approved status/action are unchanged.
- **I4 — evidence presentation:** added restrained CSS transitions to the existing Dialog, Sheet and Drawer states; reduced motion disables transitions.
- **I5 — case scan:** the quick-scan fields use an editorial top-rule layout: four columns on wide screens, two on tablet, and one on mobile. Content and long-form depth are unchanged.
- **I6 — supporting sections/contact:** Experience entries use a label-and-description layout above mobile widths and stack on mobile. Existing Capabilities, Method, About and Contact structures already supplied distinct visual treatments; their copy, contact actions, and factual claims remain unchanged.
- **I7 — responsive/mobile:** added AI Commerce EN/ES to the executable six-width browser route matrix. Home responsive composition is covered at every width in both languages. No hover-dependent content was added.
- **I8 — hardening:** release QA, bundle accounting, complete Lighthouse route matrix, browser matrix, keyboard, axe, reduced-motion, no-JS, console/hydration, canonical/SEO and static evidence checks are recorded below. Final screenshots are in `artifacts/visual/issue-113-i8-final/`.

## Visual evidence and responsive behavior

The final capture contains 48 full-page screenshots (eight routes × six widths) and eleven viewport screenshots. `manifest.json` identifies the candidate commit and contains image hashes and browser/viewport data. The captured first viewport shows role, positioning, primary actions and all three lead cases before the HMS image; the image remains below that path on mobile. The HMS lead card uses the housekeeping screenshot rather than the reception image used in the hero. The AI Commerce card remains text-led.

Inspected captures include Home EN at 390 and 1440 px, the HMS Dialog at 1440 px, and the HMS mobile Drawer at 390 px. The media viewer displays the full image with its original-image action; neither desktop nor mobile crop hides evidence. The hero source stays entirely static HTML and CSS.

I0 baseline full-page captures and state screenshots are retained separately, enabling direct comparison without overwriting earlier Issue #99/#108 evidence.

## Hero LCP before/after

Measured in Lighthouse with three runs per route. The earlier I2-specific run and final full-site run both kept the existing gates unchanged. Final medians below come from the exact candidate build and raw reports in `artifacts/lighthouse/issue-113-i8-final-confirmation/`.

| Home route | Baseline LCP | Final LCP | Change | Lighthouse Performance median | Other category medians |
|---|---:|---:|---:|---:|---|
| `/` | 2,286 ms | 2,222 ms | −64 ms | 0.97 | A11y 1.00, BP 1.00, SEO 1.00 |
| `/es/` | 2,209 ms | 2,205 ms | −4 ms | 0.98 | A11y 1.00, BP 1.00, SEO 1.00 |

The reception image is the LCP candidate. The AVIF selected for the responsive viewport is only a few kilobytes; one responsive source is requested. There is no LCP regression on either Home locale. Lighthouse CLS median is 0 on both.

## Final Lighthouse route matrix

The exact Release Lighthouse config and 24 reports are retained at `artifacts/lighthouse/lighthouserc.issue-113-i8-final-confirmation.json` and `artifacts/lighthouse/issue-113-i8-final-confirmation/`. Gates remain Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95 and SEO ≥0.95; Lighthouse uses the configured median of three runs.

| Route | Performance median | A11y | Best practices | SEO | LCP median | CLS median |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 0.97 | 1.00 | 1.00 | 1.00 | 2,222 ms | 0 |
| `/es/` | 0.98 | 1.00 | 1.00 | 1.00 | 2,205 ms | 0 |
| `/projects/hms-cloudflare/` | 0.97 | 1.00 | 1.00 | 1.00 | 1,837 ms | 0 |
| `/es/projects/hms-cloudflare/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,757 ms | 0 |
| `/projects/alquileres-uspa/` | 0.98 | 1.00 | 1.00 | 1.00 | 2,419 ms | 0 |
| `/es/projects/alquileres-uspa/` | 0.96 | 1.00 | 1.00 | 1.00 | 2,566 ms | 0 |
| `/projects/ai-commerce-platform/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,776 ms | 0 |
| `/es/projects/ai-commerce-platform/` | 1.00 | 1.00 | 1.00 | 1.00 | 1,672 ms | 0 |

A preceding candidate run had noisy Home EN TBT and failed only the median Performance assertion (0.88). A focused Home EN recheck passed (0.92 median); a fresh full 24-run confirmation then passed every configured assertion. The 24-run final confirmation has Home EN Performance values 0.97, 0.93 and 0.97 (median 0.97), with TBT median 157 ms. This variability is disclosed rather than hidden. Alquileres lab LCP can vary around the 2.5-second field target; no field measurements are available, so field Core Web Vitals remain `NOT_YET_OBSERVABLE`. No threshold was lowered.

## Client JavaScript and assets

`node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` on the final build:

| Route class | Initial JS gzip | Budget | Headroom | Delta from I0 |
|---|---:|---:|---:|---:|
| Home EN/ES | 94,062 B | 100,000 B | 5,938 B | 0 B |
| HMS / Alquileres cases | 95,343 B | 150,000 B | 54,657 B | 0 B |
| AI Commerce cases | 95,081 B | 150,000 B | 54,919 B | 0 B |

Deferred gallery chunks retain the established budgets: 12,553 B gzip for HMS and 14,220 B for Alquileres. No hydrated section or browser script was added. Image derivatives are generated at build time; they do not add runtime JavaScript.

## Validation and browser evidence

- `npm ci`: PASS on the I0 baseline with the repository lockfile; no dependencies or lockfiles changed in this initiative.
- `npm run qa:release`: PASS on the exact candidate build after all CSS and source changes; 66 Astro files, zero errors/warnings/hints; all 22 HTML pages pass content, presentation, social metadata, SEO, UX/accessibility, build and sitemap validators.
- `git diff --check 1f08956..HEAD`: PASS after removing whitespace-only generated Lighthouse HTML views; complete raw Lighthouse JSON audits, manifests and exact collection configs remain retained.
- Browser suite: full local run executed 840 tests across Chromium, Firefox, WebKit, Mobile Chrome and Mobile WebKit profiles: 571 passed, 267 expected project skips, two timeout failures under local resource contention. Both failed tests passed in isolated one-worker reruns. No functional assertion or accessibility violation was observed. Hosted CI is the final browser gate and remains pending at this candidate.
- Dedicated Issue #113 visual tests cover both Home locales at 360/390/430/768/1024/1440 px; lead order/actions; approved image dimensions, priority, formats and caption; non-duplication; overflow; axe WCAG 2.2 AA at 390/1440; console errors; and reduced-motion behavior.
- Existing browser suites cover keyboard/focus, responsive viewer, Dialog/Drawer/Sheet, no-JS anchors, carousel/GIF behavior and console/hydration. Playwright had no product console error in successful captures.
- SEO/canonical, sitemap, robots and structured metadata were covered by the unchanged release validators. No SEO/configuration files were edited.
- Screenshots and their manifest: `artifacts/visual/issue-113-i0/` (before) and `artifacts/visual/issue-113-i8-final/` (after).

## Scope, limitations and rollback

Only portfolio CSS/Astro presentation, static image provenance, the executable browser matrix and screenshot capture metadata changed. There is no change to professional positioning, copy, project order/status, proof semantics, lifecycle, external projects, CV visibility, LinkedIn, analytics, dependencies, canonical URLs or sitemap policy. React ownership and hydration directives are unchanged.

The hero can be reverted independently by removing the `<Picture>` from Home and restoring the earlier text-only grid; the image remains an approved proof asset. The other visual refinements are static CSS and can be reverted without data migration. No field conversion uplift is claimed. Production smoke checks, deployed screenshots, CI, Independent Critic, Integration Review, RELEASE and LEARN remain required for I9.

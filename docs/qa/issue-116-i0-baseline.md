# Issue #116 — I0 Baseline and Contract Lock

**Result:** baseline QA `PASS`; progression to I1 **BLOCKED — `DESIGN_CONTRACT_CONFLICT`**.
**Capture date:** 2026-09-30.
**Current main / baseline SHA:** `9ae961973f78f0c5983cfb485e6dcaaa3faeba93`.
**Worker branch:** `build/issue-116-cplus-baseline`.
**Worktree:** `/home/sjo1848/dev/portolio/issue-116-cplus`.
**Runtime:** Node 24.18.0, npm 12.0.2, Astro 7.3.5; Chromium 153.0.8010.12.

## I0 setup and contract access

- Refreshed remote refs with `git fetch --all --prune`.
- Verified current `origin/main` at `9ae961973f78f0c5983cfb485e6dcaaa3faeba93`; did not use historic `7ac73c...` as current.
- The original checkout was clean before creating the dedicated worktree and branch. This worktree started clean at current `origin/main`.
- Read, in required order, all six canonical Issue #116 documents: Definition, IA/Visual Direction, C+ Design Contract, Motion Spec, Controller Design Review and BUILD Contract.
- Read Issue #116 and its latest Controller authorization comment. `DESIGN_PASS_BUILD_AUTHORIZED` remains the effective state. The stale issue body text is superseded by the later Controller authorization and canonical BUILD contract.
- No package manifest or lockfile changed. No dependencies were installed or upgraded. To run checks without installing packages, the worktree temporarily reused the existing `node_modules` directory from the original checkout after confirming identical manifests; that symlink was removed after evidence collection.

## Release QA baseline

Command: `npm run qa:release`.

**PASS.** Observed output:

- bilingual content validation passed;
- presentation validation passed;
- Astro check: 66 files, 0 errors, 0 warnings, 0 hints;
- static build: 22 pages;
- social card, static assets, social metadata, structured data/SEO and UX/accessibility validators passed;
- build validation passed for 22 HTML pages;
- sitemap validation passed with 20 canonical URLs.

## Home screenshots and responsive measurements

Fourteen Chromium captures (Home EN and ES at 360, 390, 430, 768, 1024 and 1440 px; plus no-JS and reduced-motion Home at 390 px) are stored under [`artifacts/visual/issue-116-i0/`](../../artifacts/visual/issue-116-i0/). `manifest.json` contains viewport/document widths, H1, browser version, console errors, file byte sizes and SHA-256 checksums.

- All 12 responsive captures had zero horizontal overflow and zero browser console errors.
- Home content rendered in both languages at all viewports.
- The 390 px no-JS page retained the H1 `Full-Stack Software Developer` and 42 text links; the document remained informational and navigable.
- In reduced-motion mode, computed root `scroll-behavior` was `auto`; transitions/animations were reduced to `0.01ms` by the existing rule.
- No-JS computed root `scroll-behavior` remains `smooth` (existing baseline behavior); links/content do not depend on client JavaScript.

These are baseline observations. They do not assert post-redesign acceptance.

## Initial client JavaScript

Measured from the current built `dist/` using the existing `artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs` script:

| Route | Initial gzip | Budget | Remaining |
|---|---:|---:|---:|
| Home EN `/` | 94,062 B | 100,000 B | 5,938 B |
| Home ES `/es/` | 94,062 B | 100,000 B | 5,938 B |

Home has 8 initial files and 2,125 B inline-script gzip. No visible-deferred chunks are attributed to Home. The C+ motion target of at most +3,000 B gzip therefore leaves little room; keep implementation CSS-first and measure each interaction increment.

## Lighthouse baseline

Config: [`artifacts/lighthouse/lighthouserc.issue-116-i0.json`](../../artifacts/lighthouse/lighthouserc.issue-116-i0.json). Three runs per Home locale; raw six reports are under [`artifacts/lighthouse/issue-116-i0/`](../../artifacts/lighthouse/issue-116-i0/). Existing gates were preserved: Performance ≥0.90, Accessibility ≥0.95, Best Practices ≥0.95 and SEO ≥0.95 using median aggregation.

| Route | Performance runs | Median | Accessibility | Best Practices | SEO | LCP median | CLS |
|---|---|---:|---:|---:|---:|---:|---:|
| `/` | 0.92, 0.76, 0.97 | 0.92 PASS | 1.00 | 1.00 | 1.00 | 2,132 ms | 0 |
| `/es/` | 0.99, 0.98, 0.98 | 0.98 PASS | 1.00 | 1.00 | 1.00 | 2,214 ms | 0 |

One English Performance run was 0.76, below the hard threshold for an individual run, while the configured median aggregation passes. Retain this variability as a watch item; do not lower thresholds. The median lab LCP is below the 2.4 s target. These are Lighthouse lab measurements, not field Core Web Vitals.

## Approved prototype verification — blocking conflict

The required final prototype URL, `https://www.magicpath.ai/files/456042490814947328`, is reachable, but did **not** resolve to the approved prototype during verification:

- HTTP 307 redirected to `/`;
- final response was HTTP 200;
- document title was `MagicPath | The shared workspace for humans and agents`;
- Chromium visibly rendered the MagicPath product/marketing homepage, not the Issue #116 prototype.

The redirect metadata and screenshot are retained as `prototype-url-check.txt` and `prototype-url-redirect.png` in the visual evidence directory. The six repository contracts are present and internally authorize the C+ design, but the approved visual artifact itself cannot be inspected at the canonical link. I0 explicitly requires confirming both. Per the Controller's stop rule, this is `DESIGN_CONTRACT_CONFLICT`; do not begin I1 or substitute a personal interpretation of the design.

**Required resolution:** provide an accessible link or export to the same already-approved final prototype, or have the Controller confirm an alternate immutable reference. No visual or product decision is being requested from the implementer.

## Commands and evidence inventory

- `git fetch --all --prune`
- `npm run qa:release`
- `node artifacts/dependencies/issue-108-wave-1/measure-initial-js.mjs`
- `node /home/sjo1848/.npm/_npx/7c4c7312e9ccc7bf/node_modules/@lhci/cli/src/cli.js autorun --config=artifacts/lighthouse/lighthouserc.issue-116-i0.json` (used the already cached CLI; no package install)
- Chromium capture of the 12 responsive Home states plus no-JS and reduced-motion states; full manifest and PNG evidence under `artifacts/visual/issue-116-i0/`.

No product code was edited. No merge or deployment was performed. I1 remains unstarted pending resolution of the prototype reference conflict.

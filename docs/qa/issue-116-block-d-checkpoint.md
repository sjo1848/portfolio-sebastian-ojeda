# Issue #116 — Block D checkpoint (I6–I7)

**State:** I6 PASS / I7 PASS — ready for Controller review  
**Branch:** `build/issue-116-cplus-baseline`  
**Date:** 2026-09-30  
**I8:** not started; remains blocked pending Controller review

## Increment record

| Work unit | Commit | Result | Evidence |
|---|---|---|---|
| C-F1 timing correction | `4350679e735a770072b8fad07ca0f3f5170c9c35`; report/evidence `b77a6b0c10845c6ecb55adeffa3b030c50a42b6b` | PASS | [C-F1 report](issue-116-c-f1-timing-report.md) |
| I6 — lead case entry continuity | `f5ee0736d8cb87bd09973c48578b6f39f41bebae`; report/evidence `9564a343dca1934cc58b15d7fadb9edcfb65a605` | PASS | [I6 report](issue-116-i6-report.md), [visual evidence](../../artifacts/visual/issue-116-i6/) |
| I7 — support/contact responsive pass | implementation/test `2b070421ded420348c9f3c6e662a9f52b28ef6fc`; report/evidence `c051d0c0ce45b31b67186cff0a0c79407b469685` | PASS | [I7 report](issue-116-i7-report.md), [visual evidence](../../artifacts/visual/issue-116-i7/) |

Each implementation increment remains a distinct commit. I7 added a dedicated regression test, persisted responsive evidence and did not change product CSS, copy, claims, dependencies, architecture or motion behavior.

## Combined checkpoint evidence

- C-F1 preserves M2 at 380 ms, M3 active rule/title at 140 ms, M4 at 260 ms, and reduced motion immediate.
- I6 applies the approved first-viewport grammar to HMS Cloudflare, Alquileres Uspallata and AI Commerce + HMS in EN/ES while preserving factual status, role, stack, evidence, limitations and normal links.
- I7 checked Home EN/ES at 360, 390, 430, 768, 1024 and 1440 px in Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit: 48 passed; 12 expected skips for mobile profiles at non-mobile widths.
- I7 section suite passed 10 tests in the five profiles. The four supporting sections remain unclipped and within the viewport. Four axe WCAG 2.2 AA audits (EN/ES at 390/1440, Chromium) found no violations.
- Home no-JS/IA tests: 4 passed in Chromium, EN/ES desktop and mobile. CopyAction tests: 15 passed in Chromium, including keyboard and failure fallback. No-JS navigation/contact and copy fallback remain available.
- Final `npm run qa:release`: PASS; Astro check 76 files with 0 diagnostics; all 22 static pages, content/presentation, social metadata, SEO, UX/accessibility, build and sitemap validators passed.
- Home initial client JS gzip: 95,130 B EN and ES, 4,870 B below the unchanged 100,000 B limit. This is unchanged from I5.
- Latest Lighthouse remains I5's three-run median: Performance 0.97 EN / 0.96 ES; Accessibility, Best Practices and SEO 1.00 in both; LCP median 1,904 ms EN / 1,987 ms ES; CLS 0. This is lab evidence, not field Core Web Vitals. I8 owns the final Lighthouse route matrix.
- No new console/page errors, horizontal overflow, or hydration findings were observed in I6/I7 checks.

## Review boundary

The implementation worker does not issue its own Independent Critic or Integration Review verdict. Controller review of this combined checkpoint is pending. Existing I5 reduced-motion, progressive enhancement and touch/keyboard interaction evidence is retained; I7 introduced no motion changes. I8 must still run the full release candidate suite, Lighthouse route matrix and final independent/integration reviews.

No merge, deploy or release was performed. The branch is published through this checkpoint commit for review. **I6–I7 PASS; Block D checkpoint ready. I8 is not authorized until Controller review.**

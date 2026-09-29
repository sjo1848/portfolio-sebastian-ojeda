# Issue #99 — Increment 7: Release and Learn

## Release record

- Production canonical: https://sebastian-ojeda.pages.dev
- Production verification date: 2026-09-29 03:28–03:32 UTC
- Product commit under verification: `8d993a479d90fbf3094cf5641a3c82ed6985687f` (merged I5). Public responses and rendered content were checked after that commit's CI completed successfully.
- Verification is against the live public Pages host. No Alquileres demo was deployed.
- I6 report: [`issue-99-increment-6-full-validation.md`](issue-99-increment-6-full-validation.md).

## Production route and metadata checks

All six required paths returned HTTP 200. Each document's canonical and `og:url` point to the same path on the canonical Pages host:

| Route | HTTP | Canonical / `og:url` |
| --- | ---: | --- |
| `/` | 200 | `https://sebastian-ojeda.pages.dev/` |
| `/es/` | 200 | `https://sebastian-ojeda.pages.dev/es/` |
| `/projects/hms-cloudflare/` | 200 | `https://sebastian-ojeda.pages.dev/projects/hms-cloudflare/` |
| `/es/projects/hms-cloudflare/` | 200 | `https://sebastian-ojeda.pages.dev/es/projects/hms-cloudflare/` |
| `/projects/alquileres-uspa/` | 200 | `https://sebastian-ojeda.pages.dev/projects/alquileres-uspa/` |
| `/es/projects/alquileres-uspa/` | 200 | `https://sebastian-ojeda.pages.dev/es/projects/alquileres-uspa/` |

`/sitemap-index.xml` and `/robots.txt` both returned 200 and reference the approved canonical host. The production documents include the bilingual metadata and social metadata produced by the validated build.

The route checks used Python `urllib.request` GETs and parsed each HTML document's `canonical` and `og:url`; `/sitemap-index.xml` and `/robots.txt` were fetched the same way. A separate `curl -sSI https://sebastian-ojeda.pages.dev/` confirmed the live Cloudflare response. Browser review used the repository's Playwright CLI wrapper against the same production host, at desktop and 390×844 viewports.

## Deployed journey checks

- Home English and Spanish both put the approved Full-Stack Software Developer, backend-oriented positioning and the same three lead proofs first: HMS Cloudflare, Alquileres Uspallata, AI Commerce + HMS. Current statuses are legible and distinguish technical validation, active development, and experimental prototype under validation.
- The complementary cases remain below the lead group and are still available. Capability sections link to evidence; experience and the layered method follow the lead proofs; contact offers email, copy, and GitHub. No CV or LinkedIn was added.
- HMS English case page exposes role, year, repository, demo absence, problem, system/architecture, validation, and explicit acceptance/release limitations before the long technical narrative. The technical detail remains available below the summary.
- Alquileres English and Spanish summary identifies the NestJS/Vue/PostgreSQL system, personal role, reproducible synthetic catalog/property evidence, absent public deployment, and missing review/publish/admin audit evidence. No public demo or real customer data is exposed.
- AI Commerce English and Spanish routes returned 200 and retain the lead status/summary. The Home label correctly says Phase 2.6 is experimental and under validation.
- At 390×844, the Spanish Home navigation opens as one accessible dialog/Sheet with initial focus on its close control, one primary navigation, six destination links, and EN language switch. The background becomes inert/hidden to the accessibility tree. Production console had zero errors or warnings on the inspected Home EN/ES, navigation-open, and Alquileres ES states. Hosted browser matrix runs on the same product tree independently cover the full route/browser matrix.
- Production visual captures are saved under [`output/playwright/issue-99-release/`](../../output/playwright/issue-99-release/): Spanish Home desktop, Alquileres desktop, and Spanish mobile navigation open.

| Capture | SHA-256 |
| --- | --- |
| `home-es-1440.png` | `87fa86730e9bc60b7eeea1133fb8f0d570c80397cb50b3a11e8f705e639611c5` |
| `alquileres-en-1440.png` | `f71404cdbb6b66c3f3af76db7063772a1108de8178703445a07f417663319a48` |
| `home-es-mobile-nav-open.png` | `37f00f0096ce0e52a2131a61fef58bd9468a9df8bf33c62ec75bb0f0c41740ae` |

## LEARN

### Did the site become faster to understand without losing technical depth?

The information hierarchy now exposes the role, backend orientation, lead proofs, personal ownership, current status, and contact path on Home before the longer autobiographical and technical material. On HMS, the quick-scan summary surfaces problem, architecture, validation, and acceptance limits before the deep narrative. The complete engineering detail remains available below. This is a structural/content result verified by rendered pages; it is not a measured reduction in recruiter time.

### Are lead proofs clearer?

Yes as a content and status distinction: the public Home presents exactly the approved three lead proofs and orders them consistently in EN/ES. HMS is explicitly technically validated while acceptance remains separate; Alquileres is active development with reproducible synthetic evidence but no public demo; AI Commerce + HMS is an experimental prototype with Phase 2.6 under validation. No status is promoted to production or accepted release.

### Did content density decrease where it mattered?

The top-level hiring path is more concise: recruiter-oriented role, three lead proofs, capability-to-proof links, concise operational context, layered method, then contact. Secondary cases and personal narrative remain accessible. No word-count or scroll-depth study was run, so only the hierarchy—not quantitative density reduction—is claimed.

### What remains unvalidated?

No recruiter interview, hiring-manager usability study, analytics, or funnel data was collected. Whether this presentation improves qualified inquiries or interview conversion remains unvalidated. Field Core Web Vitals are `NOT_YET_OBSERVABLE`; Lighthouse lab variability and Alquileres LCP samples above 2.5s remain described in the I6 report. Mobile WebKit focus-wrap showed two local four-worker contention failures, with an 8/8 focused rerun and two hosted full-suite passes; recurrence should be watched.

## Closeout boundaries

No scope beyond Issue #99 is proposed. Do not add a CV, LinkedIn, Alquileres public demo, conversion analytics, new cases, or new claims without the corresponding source/approval. Preserve Astro-first delivery, existing budgets, the approved visual identity, bilingual parity, and the evidence/status distinctions.

## Gates

- Independent Critic — **PASS**. Confirmed the six production routes, canonical/social URL pairs, sitemap/robots, lead order, status/ownership/contact clarity, the production mobile Sheet, and the evidence-bounded learning claims. No blocker or new HUMAN_GATE.
- Integration Review — **PASS**. Confirmed the production route/metadata checks and screenshots, bilingual hierarchy and case summary coherence, disclosure of validation limits, and no scope expansion.

# Issue #124 — C7 Production Verification

Date: 2026-10-02  
PR: [#126](https://github.com/sjo1848/portfolio-sebastian-ojeda/pull/126)  
Production: <https://sebastian-ojeda.pages.dev>

## Merge and deployed build

- PR #126 was squash-merged and is closed as merged.
- Merge commit / resulting `main` SHA: `5f478a2b2da7ee470699e09e1e9587ded7f312fd`.
- The Release readiness workflow for this SHA completed successfully ([run 37040861418](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/37040861418)) and published build artifact `portfolio-dist-5f478a2b2da7ee470699e09e1e9587ded7f312fd` (artifact ID `11242097645`).
- All six production HTML routes were HTTP 200 and matched the artifact bytes after normalizing generated Astro island UIDs and removing the Cloudflare Pages Analytics script injected into production responses. That is the only observed difference from the build artifact; route content/assets match the merge SHA build. This ties deployed output to the merge SHA. The repository workflow does not expose a Cloudflare deployment ID; artifact comparison is the deployment provenance evidence.
- The edge-injected Cloudflare Pages Analytics snippet is absent from source/build output and was not added or configured by PR #126. No analytics code or configuration changed in this initiative.

## Production surfaces checked

Routes checked at 1440px and 390px:

- `/` and `/es/`
- `/projects/hms-cloudflare/` and `/es/projects/hms-cloudflare/`
- `/projects/alquileres-uspa/` and `/es/projects/alquileres-uspa/`

All 12 route/viewport combinations returned HTTP 200, had no horizontal overflow, no broken `<img>` assets, no failed image responses, and no browser console errors or page errors. Detailed results are in [`production-browser-sanity.json`](../../artifacts/qa/issue-124-c7/production-browser-sanity.json).

### Home / Selected Work

- Focused production Playwright: 8 passed, 0 failed. EN/ES selected-work proof actions point to the approved HMS/Alquileres anchors; selecting AI Commerce exposes no proof action. The focused report is [`production-playwright-focused.json`](../../artifacts/qa/issue-124-c7/production-playwright-focused.json).
- At 390px, Home remains case-study-first with no redundant proof CTA per row.
- Mobile navigation passed keyboard/focus/locale checks in EN/ES, static fallback checks, and the 360px short-viewport/reduced-motion check. The Mobile WebKit production rerun passed 1/1; see [`mobile-webkit-360-production-rerun.json`](../../artifacts/qa/issue-124-c7/mobile-webkit-360-production-rerun.json).

### HMS

- Production exposes the approved canonical lifecycle image and disclosed cover preview.
- The lifecycle and cover assets respond 200. Retired/misleading reception, housekeeping, billing, and admin asset URLs respond 404.
- The local-regression/synthetic-fixture limitation remains visible; no Product Acceptance or Production Release claim appears in the recruiter-facing proof copy.

### Alquileres

Production copy matches the approved wording exactly:

- EN: `Verified screenshots`
- EN: `Reproducible visual evidence from the product, documented with synthetic data and explicit limitations.`
- ES: `Capturas verificadas`
- ES: `Evidencia visual reproducible del producto, documentada con datos sintéticos y límites explícitos.`

The existing limitation remains visible in both locales: synthetic listings/data, no public deployment, and no real availability. The proof CTA remains evidence-only.

### Evidence and artifacts

- Focused production Playwright report: [`production-playwright-focused.json`](../../artifacts/qa/issue-124-c7/production-playwright-focused.json)
- Production HTML to main-build comparison: [`production-build-comparison.json`](../../artifacts/qa/issue-124-c7/production-build-comparison.json)
- HMS canonical/retired asset status: [`hms-asset-status.json`](../../artifacts/qa/issue-124-c7/hms-asset-status.json)
- Browser route/image/overflow/errors matrix: [`production-browser-sanity.json`](../../artifacts/qa/issue-124-c7/production-browser-sanity.json)
- EN/ES desktop and mobile screenshots with SHA256 manifest: [`artifacts/visual/issue-124-c7/`](../../artifacts/visual/issue-124-c7/)

## Post-merge CI / residual tooling note

Release readiness for merge SHA passed. The first post-merge Portfolio CI attempt ([run 37040861054, attempt 1](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/37040861054)) passed `npm run qa:release` and secret scanning but failed one browser assertion: Mobile WebKit navigation reported a 368px dialog in a 360px viewport. This matches the load-sensitive geometry assertion previously observed during C6. The failed job was rerun as [attempt 2 of the same run](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/37040861054/attempts/2) and passed: 703 passed, 302 expected skips, 0 failures, 0 flaky; the responsive/accessibility matrix and Lighthouse step both completed successfully. Secret scanning passed again. A focused Mobile WebKit production rerun also passed 1/1. The initial transient failure is retained here for transparency; it did not reproduce in either rerun.

## Result

The six production routes match the approved merge build and the production recruiter proof flows pass. State: `C7_PRODUCTION_VERIFIED / ISSUE_124_COMPLETE`. The deployed HTML matches the merge SHA build artifact, all production checks passed, and the post-merge CI retry completed successfully.

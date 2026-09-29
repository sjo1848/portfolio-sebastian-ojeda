# Issue #108 — Wave 1 BUILD contract

## Phase and authorization

- Phase: **BUILD — Wave 1**, followed by VALIDATE → RELEASE → LEARN.
- Authorization: Product Owner decision in the current Issue #108 continuation; HG-1 Option B and HG-2 approved.
- Discovery/design basis: [Issue #108 evidence and demo strategy](../discovery/issue-108-evidence-demo-strategy.md), integrated by PR #109 at `d383f733c0bcfc32a9a061b20d18d2506f67dd1d` after all candidate CI checks passed.
- Portfolio baseline: `main` at `d383f733c0bcfc32a9a061b20d18d2506f67dd1d`.
- Product objective: improve recruiter understanding and trust by making the currently available evidence truthful, attributable, private, and easy to reach.

## Purpose

Implement the approved Wave 1 portfolio evidence strategy using current, verifiable material. Keep external project readiness separate from portfolio evidence readiness and preserve the approved recruiter order: HMS Cloudflare, Alquileres Uspallata, AI Commerce + HMS.

## Scope

### A. UspaYa privacy cleanup

- Remove the four current PNGs from `public/media/projects/uspaya/` and from any script that would vendor/recreate them.
- Preserve the Spanish and English UspaYa case studies and their existing case-study/GitHub routes.
- Do not add replacement media.
- After release, request all four former production asset URLs and verify they are no longer publicly served (expected 404/410). Record the exact URLs and status codes.
- Future media may return only after it is synthetic or redacted, reproducible, provenance-documented, and privacy-reviewed.

### B. Explicit portfolio proof model

Create one typed source of truth for all nine published cases, with at minimum:

- `preferredProofMode`: approved strategic surface (`live-product`, `controlled-demo`, `recorded-walkthrough`, `visual-evidence`, `repository-case-only`).
- `proofReadiness`: readiness of the preferred surface (`available`, `pending-external-gate`, `unavailable`).
- `proofHref`: nullable verified destination for the currently usable proof. Internal case-study anchors are allowed; do not invent or infer external live/demo URLs.
- `proofProvenance`: source repo/commit where verified, portfolio artifact path(s), data classification, and the kind of evidence. Omit unknown values rather than guess.
- `proofLimitations`: localized, project-specific boundary text that distinguishes current evidence from future preferred proof.

Because the preferred surface can be future-facing while a different proof is safe today, model the **current** proof mode explicitly as well. `proofReadiness` describes the preferred mode; `currentProofMode` and `proofHref` describe what the portfolio can link today. Evidence mode must never mutate or imply project lifecycle/status.

The schema must cover all nine cases in both locales or use a shared locale-independent registry with localized limitations. Null `proofHref` means no dedicated proof CTA. Keep case study and repository links available under their existing rules.

### C. State-based CTAs

- Remove “Demo” as a generic quick-scan label where no public demo exists.
- Use only truthful CTA labels: **Ver evidencia**, **Ver walkthrough**, **Abrir producto**, **Ver GitHub**, **Ver caso de estudio**.
- Current buttons must only target verified proof destinations. Future CTA names may be recorded in the model but must not render before the proof exists and is verified.
- Make the three lead cases especially legible. HMS Cloudflare and Alquileres may link to their verified visual evidence; AI Commerce + HMS remains case/repository proof until an approved walkthrough artifact exists.
- Keep the long-form technical case studies reachable and intact.

### D. Reconcile existing evidence

- Link or describe only assets whose portfolio/source provenance and data classification were verified in Discovery.
- Preserve synthetic/local/staging labels and each project's actual lifecycle status.
- Do not convert screenshots, local test results, controlled staging, or repository text into a production/release claim.
- Keep all unverified future external surfaces unlinked.

### E. Lead/secondary model

- Reconcile `featured` metadata in ES and EN: only HMS Cloudflare, Alquileres Uspallata, and AI Commerce + HMS are lead cases.
- Keep the approved lead order exactly as `src/data/portfolioStories.ts` defines it.
- The other six remain accessible in the approved secondary order. Do not change visual hierarchy or remove cases.
- Add validation that bilingual lead metadata agrees and the exact lead/secondary sets do not drift from the approved roster.

### F. Motion/UI

- Preserve and verify existing restrained card hover/focus, gallery/viewer and responsive Dialog/Drawer transitions where they improve clarity or feedback.
- Add motion only where a specific comprehension or action-feedback benefit is documented. Prefer CSS/native transitions; no new motion dependency.
- Respect `prefers-reduced-motion`; motion must not carry meaning, delay content/CTA, or reduce keyboard/focus visibility.
- No scroll-jacking, excessive parallax, autoplay, continuous ambient animation, or added hydration solely for motion.

## Out of scope

- Any code, content, data, account, demo, deploy, issue or release action in external project repositories.
- BUILD Wave 2 or Wave 3, including any newly recorded walkthroughs, live-product links, or external product release work.
- Replacement UspaYa screenshots/video; changing its case study; changing project lifecycle/status claims.
- New live URLs, fabricated provenance, analytics, LinkedIn, visible CV, professional positioning, branding, layout hierarchy, architecture, or dependencies.
- Changes to Alquileres as a portfolio-only demo or fork.

## Inputs and relevant files

- Issue #108 body and latest Controller/Product Owner comments.
- [Discovery report](../discovery/issue-108-evidence-demo-strategy.md), especially proof-mode table, provenance, risk and wave recommendations.
- `src/content.config.ts`, `content/projects/*.md`, `content/projects-en/*.md`.
- `src/data/portfolioStories.ts`, `src/data/projectMedia.ts`, `src/data/projectQuickScans.ts`.
- `src/components/ProjectCard.astro`, `src/components/ProjectPage.astro`, `src/components/CaseStudyQuickScan.astro`.
- `scripts/vendor-project-media.sh`, `scripts/validate-content.mjs`, `scripts/validate-portfolio-presentation.mjs`.
- Existing browser tests in `tests/browser/` and existing release/performance/accessibility scripts. Inspect current scripts before adding any validation.
- Production origin: `https://sebastian-ojeda.pages.dev`.

## Acceptance criteria

1. The four UspaYa files are absent from the current source tree and build artifact; the vendor script cannot restore them. UspaYa ES/EN case routes and repository CTA remain.
2. All nine cases have a typed, validated proof record. Preferred mode, current mode, readiness, optional href, provenance, and limitations are internally consistent.
3. No external product/demo link is rendered unless its exact URL is present and verified. No unsupported “Demo” label or production claim remains in proof CTAs.
4. The three lead cases and order match the approved roster; all six secondary cases remain in their approved group/order. ES/EN metadata and labels agree.
5. Existing evidence actions point to the correct case-study evidence section; assets carry accurate source/data/maturity caveats. No screenshot is presented as product acceptance or production.
6. Existing visual hierarchy and Stone / Andes Copper branding remain. Any motion change has a documented user benefit, works with reduced motion, retains visible focus, and does not add a client island or dependency without a contract amendment.
7. No console errors, hydration mismatches, broken local proof links, or privacy-scan findings remain.
8. **ES/EN parity, link/CTA behavior, privacy scan, responsive matrix, keyboard behavior, axe, reduced motion, console/hydration, Lighthouse, JS budgets, SEO/canonical and `npm run qa:release` pass.** Do not lower thresholds.
9. After the candidate is released, all four former production PNG URLs return 404/410 from the canonical origin. The UspaYa case study remains HTTP 200 in ES and EN.
10. Produce reviewable screenshots for both locales, desktop/mobile, primary-card state, evidence CTA and relevant case-study evidence states; record commands, browser matrix, Lighthouse, bundle/JS delta, accessibility result, known limitations, release commit and rollback path.
11. Independent Critic emits PASS and Integration Review emits PASS. The implementer cannot fill either verdict.
12. Record RELEASE verification and a brief LEARN comparing recruiter clarity, evidence trust, privacy risk, performance/accessibility and maintenance against the discovery hypotheses.

## Required validation and evidence

- Start with clean install: `npm ci`.
- Run `npm run qa:release` and the established browser suite/matrix for Chromium, Firefox and WebKit across existing responsive widths, with focus on 360/390/430/768/1024/1440.
- Run targeted proof-model, project-card, case-study quick-scan, gallery, accessibility, keyboard and reduced-motion browser checks. Use existing axe coverage and add only checks needed for this changed contract.
- Measure Lighthouse and initial JS on Home EN/ES and HMSC, Alquileres and AI case routes. Preserve current hard thresholds and budgets; compare with the baseline from the integrated Issue #99/Issue #108 evidence.
- Validate canonical/SEO and static output. Search generated `dist/` for UspaYa filenames and confirm absence.
- After merge/release, verify direct requests to all four old UspaYa media URLs plus ES/EN case routes on the canonical production host; check browser console and representative interaction in deployed output.

## Review and continuation rules

- Critic and Integration Review review the implementation and submitted evidence independently of the implementer.
- PASS → continue to RELEASE, deployed verification, and LEARN.
- REWORK → bounded correction and repeat the affected validation/reviews.
- HUMAN_GATE only for a new material product, privacy, architecture, cost, performance, UX, or release decision not resolved in this contract.
- This contract authorizes Wave 1 only. Wave 2 and Wave 3 remain unauthorized.

# Issue #99 — Increment 5: evidence and status reconciliation

## Contract

- Phase: BUILD — Increment 5.
- Base: I4 merged to `main` in PR #104 at `d605439`.
- Objective: use the approved lifecycle/evidence vocabulary, remove only evidence requests that are demonstrably stale, and keep remaining product limits visible in English and Spanish.
- Scope: lead-case status labels and Alquileres visual-evidence reconciliation. No change to case order, ownership claims, public demo availability, branding, architecture, or professional history.

## Source and privacy audit

The public `sjo1848/alquileres-uspa` repository was inspected at `5bcde39e0ca8abd2d5d2e0a9e9c90c5b3bf47a51`. Its `docs/portfolio-evidence.md`, `.github/workflows/portfolio-evidence.yml`, `scripts/portfolio-evidence-seed.mjs`, and `scripts/portfolio-evidence-capture.mjs` document the evidence pipeline: migrations run against PostgreSQL; deterministic portfolio fixtures are seeded; Nest and Vue run locally; Chrome captures the catalog and listing detail. The seed uses reserved `example.test` contact data, `portfolio-demo-*` IDs, and locally generated listing illustrations; the repository states no real customer, owner, property, or contact data is used.

All three screenshot files currently shown by this portfolio were byte-compared to their source-repository versions. Their SHA-256 values match:

| Evidence | SHA-256 | What it demonstrates |
| --- | --- | --- |
| `catalog-results-desktop-1440x1200.png` | `b5f734fbaa270ddf73e055d41f6b510d9e669d6d001e571b653f2acf1ddd36a0` | Synthetic public catalog at desktop size |
| `listing-detail-desktop-1440x1200.png` | `f12dc2b7334d956f4f3c4598cafc0c8159793f7fc0d7007857e5ae22a692e7b3` | Synthetic public listing detail with availability |
| `catalog-results-mobile-390x844.png` | `3fee3939f6ee7fb3f578bc830d909ef6f08ec5551dcbff88b1a9faf87c514a6c` | Synthetic catalog at mobile size |

The matched repository evidence, reproducible capture workflow, and privacy-safe fixture provenance support removing only the old `evidenceNeeded` entries for a catalog and listing screenshot. This evidence describes reproducible UI captures, not a deployed public product. There is still no public Alquileres demo or deployment.

## Reconciliation

| Lead case | Lifecycle/evidence wording after I5 | `evidenceNeeded` disposition |
| --- | --- | --- |
| HMS Cloudflare | Technically validated migration; acceptance remains separate. No label change. | Retained: remote reception screenshots, accepted-candidate mobile evidence, and remote Product Acceptance remain distinct gates in the source repository. |
| Alquileres Uspallata | Active development. No product lifecycle change. The case now identifies the verified catalog/detail screenshots as reproducible synthetic-data captures and distinguishes missing workflows and deployment. | Removed the catalog and listing-with-availability screenshot requests because the exact captures are present and source-verified. Retained review/publication and direct-contact/administrative-audit walkthroughs. `demo: null` remains unchanged. |
| AI Commerce + HMS | **Experimental prototype · Phase 2.6 under validation.** The separate quick-scan evidence field continues to scope controlled staging evidence to Phase 2.5 only. | Retained all three Phase 2.6 evidence gaps (real-model conversation, HITL approval visual evidence, and public adversarial-corpus summary). No phase is presented as released or accepted. |

The Alquileres source snapshot contains only its reproducible synthetic evidence workflow; the AI Commerce source snapshot at `05d808f6b16053113d42119705bf42196cc85f4d` records Phase 2.6 as active staging work, with human acceptance still REWORK and Phase 2.8 staging E2E in progress. The approved distinctions therefore remain: HMS technically validated; Alquileres active development; AI Phase 2.6 experimental, with a separately bounded Phase 2.5 controlled staging demonstration. No case is labeled production/released or pre-pilot by inference.

## Files changed

- `content/projects/alquileres-uspa.md` and `content/projects-en/alquileres-uspa.md`: remove only the two stale screenshot requests and accurately distinguish existing synthetic captures from still-missing workflows/deployment.
- `content/projects/ai-commerce-platform.md` and `content/projects-en/ai-commerce-platform.md`: align the current phase label with the approved Experimental prototype vocabulary.
- `tests/browser/case-study-quick-scan.spec.ts`: assert the bilingual experimental-phase labels on the rendered case page. Existing tests continue checking both other lead statuses, bounded Phase 2.5 evidence, no public demo, accessibility, no-JS navigation, and responsive readability.

## Validation and evidence

- Source inspection: exact Alquileres repository snapshot, evidence documentation/workflow/seed/capture scripts, fixture policy, and image hashes above. AI Commerce status was checked against `.orchestration/STATUS.json` and `README.md` at `05d808f6b16053113d42119705bf42196cc85f4d`; HMS current `main` remains `dd7d536848708346ca9616e0f54b0fc48ace0b07` and its remote-acceptance boundaries remain open.
- `npm run qa:release`: **PASS**. Content and presentation validators passed; Astro checked 60 files with 0 errors, warnings, or hints; static build produced 22 pages; static assets, social metadata, SEO/structured data, UX/accessibility, build, and 20 canonical sitemap URLs passed.
- `npx playwright test --config=.playwright-issue-99-i5.config.ts tests/browser/case-study-quick-scan.spec.ts`: **90/90 PASS** over Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. The suite checked all three lead cases in EN/ES at 390 and 1440 px, asserted the AI experimental status label, ran axe in all rendered browser/viewport states with zero violations, detected no page console/page errors or warnings, and followed all six native case anchors with JavaScript disabled.
- The ordinary Playwright config starts an Astro preview command which daemonizes in this environment. To keep browser QA repeatable, a temporary config disabled only its `webServer` launcher while using the running preview built by `qa:release`; that config was removed after tests. The existing runner-only `NO_COLOR`/`FORCE_COLOR` Node notices are environmental and were not browser console output.
- Eight screenshots cover the Alquileres evidence/limits section and AI Commerce status on both language variants at 390 and 1440 px: [visual evidence and SHA-256 manifest](../../artifacts/visual/issue-99-increment-5/). Mobile captures were inspected for clipping/wrapping. The AI badge wraps onto two lines at 390 px and remains legible. No new CSS, JS, dependency, or hydration was introduced; the source diff only changes static Markdown values/prose and a browser assertion, so I5 client-JS and CSS bundle delta is 0 B. I6 will remeasure the full build budget.
- Lighthouse: no rendering or asset behavior changed; the increment uses the unchanged thresholds and must pass the PR's hosted release QA/Lighthouse workflow before merge. Field CWV remain `NOT_YET_OBSERVABLE`.

## Independent gates

- Independent Critic: pending review of the exact committed change and evidence.
- Integration Review: pending review of the exact committed change and evidence.

## Scope limits

- No public Alquileres demo/deployment was created.
- No original/secondary case was deleted or reordered.
- No claim about production, customer acceptance, career seniority, or user outcomes was added.
- CV remains absent; LinkedIn remains absent; no new contact method was added.
- Client JavaScript, dependencies, toolchain, budgets, SEO, branding, and React islands are unchanged.

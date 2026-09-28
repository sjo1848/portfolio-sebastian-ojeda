# Issue #99 — Increment 1: Information Architecture contract

## Decision record

- Phase: BUILD — Increment 1 (contract only).
- Baseline: I0 PASS on `main` after PR #100, starting tree commit `4e801d7`.
- Product objective: reduce the effort for a recruiter/hiring manager to understand role fit, inspect the strongest evidence, and contact Sebastián, while preserving a deep technical review path.
- Approved positioning: **Full-Stack Software Developer, backend-oriented**.
- Approved lead cases and immutable order:
  1. HMS Cloudflare
  2. Alquileres Uspallata
  3. AI Commerce + HMS
- This document is the I1 implementation contract. It does not itself change rendered product content.

## Recruiter journey contract (10–30 seconds)

The first scan must expose this sequence in plain language:

1. **Role** — Full-Stack Software Developer, backend-oriented.
2. **Differentiator** — understands real operational processes and turns them into reliable end-to-end software, connecting backend, data, integrations, interfaces, quality, and operations. Use only what the current portfolio evidence supports; do not assert outcomes or seniority.
3. **Three proofs** — only the three approved lead cases above are visually grouped as primary work, in that exact order.
4. **Ownership and state** — each lead card conveys what Sebastián personally did and an accurate current evidence/status boundary.
5. **Contact** — direct existing email/contact path remains easy to find and usable.

The role and lead proofs must not require scrolling past an extended method explanation or long biography. Home section order for the build is:

1. concise role/value hero;
2. lead proofs (the three approved cases);
3. capability-to-proof links;
4. concise experience context;
5. brief working approach, with optional deeper method detail;
6. About/human context;
7. additional work (all six remaining published cases, visibly secondary but discoverable);
8. contact.

Existing headings may be adjusted to read naturally in both languages, while retaining this order and semantics. Contact can retain a header shortcut. The site remains content-rich; this order only changes the amount and placement of initial synthesis.

## Case quick-scan contract (technical reviewer 3–5 minutes)

Before each lead case’s long narrative, render a compact, bilingual overview containing:

- problem / operational context;
- Sebastián’s personally owned work;
- system shape (architecture, backend/data boundaries where the source supports them);
- evidence and validation actually available;
- current state and material limitations;
- repository link and demo state.

The compact overview must use source-backed claims already stated in each case’s paired English/Spanish Markdown. Where the relevant source is a long section, link to its existing narrative anchor rather than reproducing speculative detail. Keep the full case study below the overview, including engineering decisions, QA, trade-offs, and limitations. Do not convert all secondary cases to this richer format unless the issue explicitly calls for it.

A missing public demo must be stated as no public demo available where needed; it must not be implied by a repository link. Do not deploy a demo for Alquileres Uspallata.

## Approved lead case facts and boundaries

| Case | Ownership statement already in source | State/evidence boundary | Repository | Demo |
| --- | --- | --- | --- | --- |
| HMS Cloudflare | Migration architecture, full-stack implementation, security and operational QA | Technically validated migration; acceptance remains separate | `github.com/sjo1848/hms-cloudflare` | None stated |
| Alquileres Uspallata | Domain analysis, architecture and full-stack development | Active development | `github.com/sjo1848/alquileres-uspa` | None; do not publish |
| AI Commerce + HMS | Product architecture, development, evaluation and orchestration | Phase 2.5 controlled demo evidence; Phase 2.6 remains experimental/in validation | `github.com/sjo1848/ai-commerce-platform` | No public demo stated |

These facts are a conservative upper bound. I5 must reconcile exact bilingual labels and evidence with the source repository/artifacts before changing status or evidence-needed text. In particular, do not imply production acceptance, public availability, customer validation, or an external user base.

## Capability-to-proof mapping

Capabilities must point to existing, relevant evidence; the map is a wayfinding device, not a claim that a case proves every aspect of a discipline. Implement this bilingual mapping with direct links to the relevant lead case section/card:

| Capability group | Primary proof links | Evidence boundary |
| --- | --- | --- |
| Backend and architecture | HMS Cloudflare; Alquileres Uspallata | Use case architecture/backend evidence and owned implementation already described in those case studies.
| Interfaces and product | Alquileres Uspallata | Use the product/interface work currently documented; keep Alquileres status as active development.
| Data, cloud, and integrations | HMS Cloudflare | Describe only the migration, platform, data/integration and operations evidence present in the case.
| Applied AI and agentic systems | AI Commerce + HMS | Distinguish the controlled Phase 2.5 evidence from experimental Phase 2.6 work.
| Quality and operations | HMS Cloudflare; AI Commerce + HMS | HMS shows technical QA with acceptance separate; AI Commerce claims only the evaluation/operational evidence stated in its case.

Do not imply the lead project is production/released merely because it is a portfolio case. The three secondary projects remain available as additional evidence but should not be used to inflate or substitute the approved lead mapping.

## Evidence/status vocabulary

Use the following finite vocabulary in the case scan/status labels. These labels describe different dimensions; do not collapse an evidence type into a delivery lifecycle claim:

| Label | Meaning and usage rule | Current lead assignment supported by baseline |
| --- | --- | --- |
| Production / released | Publicly deployed/accepted product with evidence of that state. Use only after deployment and acceptance are verified. | None established by this I1 baseline.
| Technically validated | Technical implementation/validation evidence exists; it does not assert business acceptance or production operation. | HMS Cloudflare — explicitly “technically validated; acceptance remains separate.”
| Controlled demo | A deliberately bounded demonstration with its scope and environment stated. This does not imply production. | AI Commerce + HMS Phase 2.5 only, as described in its case; Phase 2.6 is not in this state.
| Reproducible local evidence | A documented local procedure/evidence can be reproduced; it is not a public demo or deployed product. | Assign only after the exact local procedure/artifact has been re-verified in I5.
| Active development | Implementation remains under development. | Alquileres Uspallata.
| Pre-pilot | A system is explicitly prepared for a pilot but has not started one. Do not infer this from an MVP label. | No lead assignment established by I1.
| Experimental prototype | Experimental/in-progress work without a validated product or controlled-demo claim. | AI Commerce + HMS Phase 2.6, described as experimental/in agentic validation.

A case may carry one lifecycle label and a separate evidence label only if both are accurate and useful. For example, Alquileres remains “Active development”; the mere presence of screenshots is not sufficient to label the application “Reproducible local evidence.” HMS may state “Technically validated; acceptance remains separate” and link its evidence. AI Commerce must scope “Controlled demo” to Phase 2.5 and keep Phase 2.6 “Experimental prototype / under validation.” Never assign Production/released or Pre-pilot by inference. I5 verifies source, provenance, access, and privacy before changing any project-level labels or `evidenceNeeded` field.

## Capability, experience, method layering

- Capabilities should be short and tied to one or more of the three lead cases using direct links to proof. Do not add a capability without evidence.
- Experience may summarize the current stated professional context (including SAP Basis / PI/PO, operations, and integrations where already present), but must not add an employer timeline, years, title, seniority, dates, or outcomes absent from approved source facts.
- Keep a concise “how I work” explanation near the scan layer. Retain the complete eight-phase Project Method as static, accessible content, visually subordinate or progressively disclosed with native HTML. No client-side state is needed for disclosure.
- Remove redundant summaries that repeat the same process at three different depths, while preserving the detailed canonical method document and all substantive phases.
- Keep About for human context; it must not displace role, proof, or contact from the initial scan.

## Additional work contract

Exactly three projects lead. Every other currently published case remains reachable through the existing project routes and an “Additional work”/equivalent secondary group:

- UspaYa
- GasFlow
- Agentic Engineering Governance
- HMS Elite
- JM Soluciones
- Taco Loco

Do not delete, unpublish, or imply that these projects are invalid. Avoid elevating any of them into the approved top-three group without a new product decision.

## Contact and prohibited changes

- Preserve email/contact, GitHub, and existing copy-email behavior.
- Do not restore a visible CV link or CTA.
- Do not add LinkedIn until an exact approved URL exists.
- Do not publish Alquileres Uspallata as a demo.
- Do not add analytics, tracking, or new conversion claims.
- Do not change Stone / Andes Copper branding, Astro-first architecture, React island ownership, client-JS budgets, accessibility, SEO, or QA thresholds.
- Maintain Spanish/English parity in the complete experience.

## I2–I5 implementation dependencies and acceptance

| Increment | Contract dependency | Acceptance evidence |
| --- | --- | --- |
| I2 Home hierarchy | Recruiter ordering and positioning above | EN/ES screenshots and semantic heading/order checks; exact 3 lead cards, all remaining projects discoverable, no unsupported claim |
| I3 Case quick scan | Compact overview model and fact boundaries above | HMS/Alquileres/AI EN/ES rendering; field-by-field source verification; full long narrative remains intact |
| I4 Layering | Capability-proof map, conservative experience, method disclosure | Anchored proof links; no new timeline or claims; native accessible disclosure works without JavaScript |
| I5 Evidence/status | State boundaries and pending provenance checks | Repo/artifact provenance documented; labels parity; only demonstrably stale evidence requirements removed |

All builds retain the current initial JS budgets and avoid new hydration for static content. Existing accessibility, responsive, browser, Lighthouse, SEO, and release QA gates remain unchanged.

## Open evidentiary questions (not Human Gates)

These are implementation checks against repository evidence; resolve them within I3/I5 and do not block I1:

- Which exact source paragraphs support each quick-scan statement for each locale?
- Which Alquileres screenshots currently satisfy catalog/listing requirements, and which requirements (publication/review, direct contact, administrative audit) remain missing?
- Which exact Phase 2.5 artifacts may be described as controlled demo evidence while Phase 2.6 remains experimental?

If a field cannot be substantiated, omit it or clearly say evidence is unavailable. No product-owner decision is needed to avoid an unsupported claim.

## I1 gate

I1 is ready to PASS when Independent Critic and Integration Review confirm that the hierarchy and field boundaries map to Issue #99, avoid unsupported career/product claims, preserve deep technical reading and all six secondary cases, and do not require a new architecture or material UX decision. Their verdicts and any bounded fixes must be recorded with the PR before I2 begins.

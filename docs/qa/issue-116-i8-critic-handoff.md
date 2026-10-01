# Independent Critic handoff — Issue #116 I8

Review the Issue #116 candidate and its I8 validation evidence independently. Do not implement or modify files.

## Canonical review inputs

- `docs/discovery/issue-116-definition.md`
- `docs/discovery/issue-116-ia-visual-direction.md`
- `docs/design/issue-116-cplus-design-contract.md`
- `docs/design/issue-116-motion-spec.md`
- `docs/qa/issue-116-controller-design-review.md`
- `docs/implementation/issue-116-build-contract.md`
- `docs/qa/issue-116-i8-report.md`
- `artifacts/visual/issue-116-i8/manifest.json`
- `artifacts/qa/issue-116-i8/`
- `artifacts/lighthouse/issue-116-i8/manifest.json` and its raw JSON reports
- `tests/browser/`

## Candidate under review

- Branch: `build/issue-116-cplus-baseline`
- Tested candidate SHA: `db83e07b…` (exact full SHA to be recorded after evidence commit)
- Scope is I8 validation only. Product code is unchanged from the authorized Block D candidate; the only validation rework is test timeout/selector maintenance.

## Required output

Return exactly one verdict: `PASS`, `REWORK`, or `HUMAN_GATE`.

Evaluate whether the evidence is sufficient and whether the candidate meets the binding contracts. Specifically inspect:

- whether all 970 configured tests genuinely completed across all five profiles and skipped tests are existing annotations;
- whether I8’s dedicated test maintenance preserved every original assertion;
- whether median Lighthouse scores meet unchanged thresholds across all 8 priority routes, with the Home EN .73 single-run outlier and its diagnostic repeat clearly disclosed;
- whether Home LCP median, CLS, initial JS budget/delta, and deferred-chunk accounting meet the approved limits;
- whether screenshot coverage, EN/ES metadata, canonical/sitemap evidence, no-JS, reduced-motion, accessibility, keyboard/touch, console, hydration, and claim/provenance evidence match the contract;
- whether any material regression, missing evidence, or scope violation remains.

For `REWORK` or `HUMAN_GATE`, identify the concrete evidence and the smallest required action. Do not infer approval from the implementer’s proposed outcome.

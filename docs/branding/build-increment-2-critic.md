# Branding — BUILD Increment 2 — Independent Critic

Issue: #63
PR: #67
Scope: selected work / homepage project cards

## Verdict

**PASS after REWORK**

## What changed

- removed evidence/code badge clusters from homepage cards;
- replaced technology pills with a restrained stack line;
- kept role as the primary proof metadata;
- reduced each card to one obvious case-study CTA;
- strengthened screenshot frames and title hierarchy;
- preserved the four-primary + two-secondary project selection;
- corrected Spanish `Selected work` to `Trabajo seleccionado`;
- updated the presentation QA contract to the new proof-first card structure.

## Rework history

### R1 — stale QA contract
The first CI run correctly failed because `validate-portfolio-presentation.mjs` still required the removed evidence badge cluster and four-item stack pills.

This was not bypassed. The validator was updated to assert the new contract:
- role remains present;
- reduced visible stack remains present;
- one `project-case-link` remains present;
- legacy evidence-signal and stack-pill structures are forbidden.

Codex raised the same P1 finding and the branch addressed it directly.

### R2 — tablet composition defect
Visual inspection exposed a real responsive defect around the highlighted HMS card at 768 px. The card composition was reworked before approval so the screenshot and copy no longer collide or overflow.

### R3 — visual-review coverage
The previous fragment-navigation capture could make project-section review ambiguous in headless Chrome. The visual-review contract was changed to capture a deterministic 2400 px homepage viewport for the project routes, making the selected-work section visible in desktop, tablet and mobile evidence.

## Final evidence reviewed

Head: `31b83ee1f36b29da1b3dc019177eb6816a46f57b`

Automated gates:
- Portfolio CI + Lighthouse: PASS
- Release readiness: PASS
- Visual Review: PASS

Manual review of final visual artifact:
- desktop 1440 × 2400: PASS;
- tablet 768 × 2400: PASS;
- mobile 360 × 2400: PASS;
- HMS highlighted card no longer dominates or overlaps at tablet: PASS;
- screenshots carry more weight than metadata: PASS;
- one case-study CTA per card: PASS;
- role and stack remain scannable without pill noise: PASS;
- project hierarchy remains 4 primary + 2 complementary: PASS;
- Stone / Ink / Copper branding remains restrained: PASS.

## Critic assessment

The selected-work section is materially stronger than the previous version. It now reads closer to a professional case-study portfolio and less like an admin/dashboard collection of badges.

The strongest improvement is not decorative: it is the information hierarchy. Screenshot → project → problem summary → role/stack → case study is easier to scan than the previous badge-heavy structure.

No unsupported claim, new project, external media dependency or artificial evidence was introduced.

## Watch items for later increments

- projects without strong screenshots still reveal the limits of their current evidence; do not compensate with decorative fake media;
- the lower homepage sections should now be simplified to match the cleaner project language;
- the Project Method should remain visibly secondary to selected work.

## Decision

**PASS**

BUILD Increment 2 may proceed to Integration Review and merge.
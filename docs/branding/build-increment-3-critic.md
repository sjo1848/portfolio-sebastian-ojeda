# Branding — BUILD Increment 3 — Independent Critic

Issue: #63
PR: #68
Scope: supporting homepage sections + Stone / Andes Copper palette REWORK

## Verdict

**PASS after REWORK**

## What changed

- Capabilities became a restrained numbered ledger on a mineral dark surface;
- Experience became an editorial reading section instead of another generic card/grid block;
- Project Method retained its full process information but lost the generic card-wall treatment;
- Contact now closes the page with the same systems language used in the hero;
- Visual Review now captures the lower homepage deterministically in ES/EN across desktop, tablet and mobile;
- the approved Stone / Andes Copper palette was materially reworked after human validation showed that the first implementation was almost identical to the old portfolio palette.

## REWORK history

### R1 — insufficient chromatic delta
Human validation correctly rejected the first palette implementation as perceptually too close to baseline.

Baseline already used approximately:
- canvas `#F4F1EA`;
- copper `#A94F1C`;
- copper dark `#843A13`;
- night `#111820`.

The implementation therefore changed composition more than brand color. This was treated as a real VALIDATE failure, not dismissed as subjective feedback.

Reworked system:
- canvas `#EEE6DA`;
- paper `#FFF9F1`;
- ink `#172027`;
- muted `#5F6968`;
- line `#D4C5B4`;
- copper `#B84E1E`;
- copper strong `#843713`;
- copper soft `#F0CBB4`;
- copper light `#F1A06B`;
- night `#17272E`;
- night raised `#21343C`.

The rework was propagated through global tokens, selected-work frames and supporting dark sections rather than applied as an isolated hero recolor.

### R2 — sticky capability heading blocked by clipping ancestor
Codex identified `overflow: hidden` on `#capabilities` as preventing the desktop sticky heading from behaving correctly.

Fix: use `overflow: clip`, which clips decoration without creating the scrolling ancestor that breaks sticky positioning.

### R3 — capability descriptions too narrow at tablet
Codex identified inheritance from the global two-column `.capability-grid` rule.

Fix: `#capabilities .capability-grid` now explicitly uses a single column. Final tablet evidence shows readable editorial rows rather than narrow prose slivers.

### R4 — contact focus indicator lacked dark-surface contrast
Codex identified the global teal focus ring as insufficient against the new mineral dark contact panel.

Fix: contact links use `var(--copper-light)` for `:focus-visible`, providing a high-contrast dark-surface focus indicator.

## Final evidence reviewed

Head: `77581342946a019d6316d15a54e73f1abc528c8f`

Automated gates:
- Portfolio CI + Lighthouse: PASS;
- Release readiness: PASS;
- Visual Review: PASS;
- Secret scanning: PASS.

Manual visual review:
- desktop hero: PASS; the field is visibly warmer, paper/stone hierarchy is clear and dark systems panel reads mineral rather than generic navy;
- selected work desktop: PASS; copper is more legible as a brand signal and screenshot frames remain dominant;
- tablet full homepage: PASS; capability ledger is readable, no overlap/overflow found, and Method remains secondary to projects;
- mobile hero/full page: PASS; warm stone identity survives at 360 px and dark surfaces preserve contrast;
- Alquileres project page: PASS; same-origin evidence loads correctly and the new palette does not interfere with media legibility.

Note: a homepage long-capture can leave a native-lazy image visually blank when the browser never scrolls that card into the lazy-load threshold. Project-page captures separately prove the same-origin media path is functional; this is a capture limitation, not a product-media regression.

## Critic assessment

The palette rework now produces an actual brand delta. The portfolio no longer relies on the same near-white/ink/copper values it had before the branding exercise. The change is still restrained enough that screenshots, project titles and recruiter-readable content remain more important than decoration.

The supporting sections now form a coherent narrative after Selected Work rather than looking like unrelated component-library sections.

No unsupported claim, fake evidence, new external runtime dependency or decorative mountain/mining/cyber motif was introduced.

## Decision

**PASS**

BUILD Increment 3 may proceed to Integration Review and merge after the documentation-only head also completes the required repository checks.
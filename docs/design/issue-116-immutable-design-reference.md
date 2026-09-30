# Issue #116 — Immutable Design Reference

**Controller state:** `DESIGN_PASS_BUILD_AUTHORIZED`

This file resolves the BUILD dependency on an externally accessible MagicPath URL.

## Canonical rule

For Codex BUILD, the authoritative design source is the versioned repository state at and after:

`9ae961973f78f0c5983cfb485e6dcaaa3faeba93`

Read in this order:

1. `docs/discovery/issue-116-definition.md`
2. `docs/discovery/issue-116-ia-visual-direction.md`
3. `docs/design/issue-116-cplus-design-contract.md`
4. `docs/design/issue-116-motion-spec.md`
5. `docs/qa/issue-116-controller-design-review.md`
6. `docs/implementation/issue-116-build-contract.md`
7. this manifest

The external MagicPath project is **supplemental provenance**, not a runtime/pre-BUILD dependency.

If the MagicPath URL redirects, requires authentication, or is unavailable from the worker environment, that is **not** a `DESIGN_CONTRACT_CONFLICT`.

A real design conflict exists only when the versioned repository contracts contradict one another or require an implementation that cannot satisfy the stated product/accessibility/performance constraints.

## Approved MagicPath artifact identity

The Controller visually reviewed these exact artifacts before design authorization:

### Home / interactive prototype
- project: `456042490814947328`
- component: `456042539527598080`
- approved desktop revision: `456042539527598081`
- later responsive QA revision: `456044421629243392`

Validated visual characteristics:
- Stone / Andes Copper retained;
- visible technical grid;
- large staggered `FULL-STACK / SOFTWARE / DEVELOPER` composition;
- role and backend orientation readable immediately;
- no HMS image in Hero;
- no three-project roster in Hero;
- lead + primary Selected Work CTA + secondary Resume CTA;
- Selected Work is first proof layer.

### Explicit mobile QA
- component: `456044584171085824`
- approved revision: `456044584171085825`
- viewport used: 390 × 844

Validated:
- no horizontal overflow observed;
- Hero remains legible;
- CTA hierarchy remains clear;
- `DEVELOPER` intentionally aggressive and must be conservatively tuned at 360–430 px if browser/font metrics require it.

### Motion storyboard
- component: `456044882767806464`
- approved revision: `456044882767806465`

Approved concepts:
- M1 Hero kinetic alignment;
- M2 Hero → Selected Work structural handoff;
- M3 project active state;
- M4 evidence reveal;
- M5 optional case-study continuity;
- reduced-motion static final state.

### HMS case-study first viewport
- component: `456044893798797312`
- approved revision: `456044893798797313`

Validated:
- same grid/editorial grammar as Home;
- large project title;
- concise architecture/product statement;
- truthful role/status/stack;
- approved product evidence remains captioned with limitations.

### Additional controller QA
The Controller separately rendered and reviewed:
- Selected Work desktop: indexed list + active evidence pane;
- Operating Mindset: dark technical section with three indexed principles;
- Home mobile Hero at 390;
- case-study entry.

The remaining lower-page responsive details were explicitly moved into BUILD QA by Product Owner confirmation. They are not open design decisions.

## Visual invariants Codex must implement

### Hero
- visible name in header;
- no project screenshot;
- no lead-project roster;
- no status roster;
- large staggered three-line role;
- quiet grid;
- copper marker/rule;
- role/lead/CTA readable without motion;
- Resume promoted to secondary CTA.

### Selected Work
- not a generic 3-card grid;
- editorial indexed rows;
- exactly three lead projects in approved order;
- desktop evidence preview is supplemental;
- normal case-study links remain available;
- mobile does not depend on side-preview interaction.

### Supporting rhythm
- Operating Mindset is dark/night high-contrast;
- About is calmer with more whitespace;
- Additional Work is compact/index-like;
- Contact is a high-contrast dark conversion panel.

### Motion
- CSS-first;
- M1–M4 required;
- M5 optional progressive enhancement;
- no animation library;
- reduced-motion complete.

## Worker decision rule

Codex may proceed from I0 to I1 when:
- repository contracts are readable and internally consistent;
- this manifest is present;
- I0 baseline passed.

Codex must **not** stop merely because MagicPath cannot be opened externally.

If implementation encounters ambiguity not resolved by the repository contracts, report the exact conflicting clauses instead of referencing the unavailable MagicPath URL.

## Current authorization

`DESIGN_PASS_BUILD_AUTHORIZED`

I0 baseline reported by Codex:
- main: `9ae961973f78f0c5983cfb485e6dcaaa3faeba93`
- evidence commit: `3dfa1d4b967215dbacd8bc6ad91fe0e1f6d5e76b`
- release QA: PASS
- Home JS: 94,062 B gzip
- median Lighthouse gates: PASS
- responsive baseline screenshots: PASS
- no-JS / reduced-motion baseline: PASS

Controller disposition:

`I0_PASS / DESIGN_REFERENCE_RECOVERED / I1_AUTHORIZED`

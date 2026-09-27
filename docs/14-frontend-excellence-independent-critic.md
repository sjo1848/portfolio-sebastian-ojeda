# Frontend Excellence — Independent Critic / Verifier

## Review 1

**Artifact reviewed:** `docs/13-frontend-interaction-layer-master-plan.md` v2.0  
**Method phase:** DESIGN  
**Reviewer role:** Independent Critic / Verifier  
**Verdict:** **REWORK**

## Review objective

Determine whether the frontend excellence contract is sufficiently precise, internally consistent, implementation-safe and evidence-driven to authorize BUILD.

The review checks:

- product journeys;
- architecture proportionality;
- progressive enhancement;
- accessibility;
- responsive behavior;
- current functional parity;
- performance claims;
- source-of-truth discipline;
- evidence and validation.

## Findings

### C1 — Progressive-enhancement claim is stronger than the specified implementation

The contract requires the portfolio to remain robust if a React island does not hydrate, while `MobileNavigation` is defined as a React Sheet.

A server-rendered trigger without successful hydration cannot open a JavaScript Sheet. The current document does not define the exact static traversal path that remains usable when that happens.

**Required repair**

Specify the non-hydrated traversal contract precisely. It is acceptable for the enhanced header Sheet itself to be unavailable if the product still preserves static paths for:

- home/brand navigation;
- ProjectCard case-study navigation;
- case-study back navigation;
- direct content reading;
- contact/GitHub actions.

Do not claim full functional equivalence without JavaScript.

### C2 — Core Web Vitals mixes field thresholds with pre-release lab gates

The document correctly uses LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 as product targets, but those Core Web Vitals thresholds are intended to be evaluated at the 75th percentile of real-user page loads.

A local/Lighthouse run cannot prove field CWV conformance, especially INP.

**Required repair**

Separate:

- pre-release lab gates;
- post-release field targets when sufficient CrUX/RUM data exists.

Do not require analytics/RUM solely to satisfy this initiative.

### C3 — TOC source-of-truth is incomplete

Using Astro `render(project).headings` is correct for Markdown headings, but the case-study page also owns structural sections outside Markdown, notably the evidence gallery.

The current contract simultaneously requests a TOC including evidence and prohibits duplicated/manual lists without explaining how page-owned sections are composed with Markdown headings.

**Required repair**

Define a single derived TOC model composed from:

- stable page-owned structural entries;
- Astro-rendered Markdown headings.

The project must not maintain a hand-written per-project duplicate heading list.

### C4 — Existing GIF behavior is missing from the new gallery contract

The current production component supports GIF evidence with:

- no autoplay;
- explicit play/stop;
- deferred image creation;
- link to full GIF.

The new `EvidenceGallery` contract specifies image behavior but does not preserve this existing evidence workflow.

**Required repair**

Add asset-type behavior. GIFs must remain opt-in, pausable and deferred. The new gallery cannot regress existing evidence semantics.

### C5 — Historical documentation conflicts with later approved product decisions

Older documents still state:

- visible CV access in header/home;
- three primary projects.

Later portfolio work intentionally removed visible CV download actions and the current product contains a different selected-project hierarchy.

This is a documentation-precedence issue, not a reason to restore the CV action.

**Required repair**

State document precedence or mark the older requirements as historical/superseded for this initiative. The current interaction work must not silently reintroduce CV UI.

### C6 — Media evidence must not be cropped destructively

The current gallery uses `object-fit: cover` for screenshots. For product evidence, cropping can hide UI and weaken the evidentiary purpose.

**Required repair**

Require the viewer to show the complete asset. Thumbnail crops may only be used when the full evidence remains available and the crop does not imply missing product state.

## Positive findings

The following are strong enough to retain:

- Astro as shell + React islands;
- selective shadcn use;
- no global state;
- baseline-before-build;
- 0/1/multiple-media gallery logic;
- cross-browser Playwright matrix;
- WCAG 2.2 AA target;
- 44x44 primary targets;
- Independent Critic + Integration Review;
- bundle-delta evidence;
- visual-state QA;
- explicit anti-goal against a shadcn/component showcase.

## Exit condition

Re-review after C1–C6 are resolved in the master contract.

**Current status: DESIGN REWORK REQUIRED.**


---

## Review 2

**Artifact reviewed:** `docs/13-frontend-interaction-layer-master-plan.md` v2.1  
**Method phase:** DESIGN  
**Reviewer role:** Independent Critic / Verifier  
**Verdict:** **PASS**

## Verification of prior findings

### C1 — Progressive enhancement
**Resolved.**

The contract now distinguishes full functional parity from traversability. It explicitly preserves Astro-rendered content, ProjectCard links, case-study return paths, direct evidence links and contact paths when an island fails to hydrate.

### C2 — Core Web Vitals
**Resolved.**

The contract now separates pre-release lab evidence from field CWV. LCP/INP/CLS remain product targets, while field PASS/FAIL is only assigned when sufficient CrUX/RUM evidence exists. No analytics dependency is introduced solely for compliance.

### C3 — TOC source of truth
**Resolved.**

The TOC is now a single derived model composed from page-owned stable sections plus Astro `render(project).headings`, with no per-project duplicate list.

### C4 — GIF parity
**Resolved.**

Existing GIF semantics are preserved: no autoplay, deferred loading, explicit Play/Stop, pause capability and direct asset fallback.

### C5 — Documentation precedence
**Resolved.**

The master now records precedence and explicitly treats old CV/header requirements and older project counts as historical where superseded by later approved portfolio decisions.

### C6 — Evidence cropping
**Resolved.**

The contract now requires the complete evidence asset to remain available without destructive crop. Thumbnail crops are permitted only when the full viewer preserves meaning.

## Remaining non-blocking risks

- The provisional JavaScript soft budgets require baseline measurement before they become meaningful.
- The final breakpoint for sticky case-study TOC should be validated against actual reading width, not chosen from convention.
- The mobile media surface should be visually tested on WebKit before the Drawer pattern is considered final.

These are already covered by Incremento 0/validation gates and do not block DESIGN.

## Final critic verdict

The master contract is now:

- internally consistent;
- proportional to the portfolio;
- compatible with the existing Astro architecture;
- explicit about progressive enhancement;
- explicit about accessibility and performance evidence;
- protective of current media behavior;
- sufficiently bounded for Codex implementation.

**Independent Critic: PASS.**

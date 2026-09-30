# Issue #116 — Independent Critic Review of C+ Definition

**Verdict:** PASS WITH CONDITIONS — implementation must remain blocked until Figma visual QA satisfies the listed conditions.

## Scope reviewed

- reduced Home IA;
- C+ visual direction;
- conversion content contract;
- motion specification;
- current #113 baseline constraints;
- lead project truth/evidence;
- performance and accessibility budgets.

## Findings

### C1 — The direction is sufficiently distinct from the current implementation
PASS.

The current Home relies heavily on product cards, rounded surfaces and early HMS proof. C+ changes the experience at the structural level: typographic hero, indexed proof discovery, reduced section count and contextual evidence.

This is not a cosmetic reskin.

### C2 — Risk of becoming a creative-developer portfolio
CONDITION.

Large kinetic type and grid motion can shift perceived positioning away from backend/product engineering.

Required mitigation:
- role proposition readable immediately;
- no loader;
- Selected Work follows directly;
- no WebGL/shader layer;
- technical evidence remains the strongest content after the hero.

### C3 — Removing evidence from Hero does not remove proof
PASS WITH CONDITION.

Evidence is moved, not deleted. Selected Work must begin quickly enough that recruiters do not encounter a long branding-only experience.

Required:
- hero height stays controlled;
- clear Work CTA/cue;
- first proof reachable with one normal scroll action.

### C4 — Indexed Selected Work must not hide information
CONDITION.

Media preview may be interactive, but title, category, role/status signal and case-study link must exist independently of hover/tap.

Keyboard and touch parity are mandatory.

### C5 — IA reduction is justified
PASS.

Capabilities, Experience, Method and technical portions of About currently repeat related professional claims. The proposed Operating Mindset section preserves the unique differentiator while removing taxonomy repetition.

### C6 — About reduction is appropriate
PASS.

The reduced About becomes genuinely human and stops re-selling the same engineering thesis.

### C7 — Motion is meaningful rather than generic
PASS.

The defined motion moments are tied to:
- identity;
- section continuity;
- project selection;
- evidence reveal.

Generic reveal-on-scroll behavior is explicitly excluded.

### C8 — Performance risk
CONDITION.

The accepted Home has only 5,938 B gzip initial-JS headroom.

Required:
- no GSAP/Three/OGL/Lenis dependency;
- no new framework island for Hero;
- target ≤3 KB gzip new motion JS;
- total Home ≤100 KB gzip;
- Lighthouse gate unchanged.

### C9 — Accessibility risk
CONDITION.

Large motion and interactive project previews create keyboard/reduced-motion risk.

Required:
- all core content static in DOM;
- equivalent focus and pointer states;
- reduced-motion state fully composed;
- 44×44 targets;
- axe WCAG 2.2 AA remains clean.

### C10 — Figma gate
OPEN CONDITION.

The Starter MCP quota prevented final screenshot QA of the newly created baseline and C+ frames.

No implementation should begin until:
- selected-design frames are complete;
- desktop/mobile visual QA passes;
- motion/reduced-motion storyboard exists;
- no clipping/density issue remains.

## Final critic result

`PASS_WITH_CONDITIONS`

Conditions C2/C4/C8/C9 are enforceable implementation gates.
C10 is a pre-BUILD design gate and remains open.

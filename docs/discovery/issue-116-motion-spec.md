# Issue #116 — C+ Motion System Specification

**Goal:** motion is a signature of quality and authorship while preserving fast comprehension and the existing performance discipline.

## M0 — Principles

Motion must:
- reinforce hierarchy;
- create spatial continuity;
- demonstrate frontend craft;
- never gate content;
- never require a loader;
- remain understandable with reduced motion;
- remain viable within the Home JavaScript budget.

Preferred implementation order:
1. CSS transforms / opacity / clip-path;
2. CSS keyframes;
3. tiny framework-free browser script only where interaction state requires it;
4. no new animation dependency unless a later measured gate explicitly authorizes it.

## M1 — Hero kinetic alignment

### Intent
The three large role lines feel initially offset from the technical grid, then resolve into the final composition.

### Full motion
- duration target: 700–950 ms;
- no blank pre-state;
- text is readable from first paint;
- transform distance is modest (roughly 12–48 px depending on line);
- optional clip/mask reveal may be used;
- copper marker/rule resolves slightly after the first line;
- proposition/CTAs settle last with a short stagger.

### Forbidden
- fake typing;
- letter-by-letter animation;
- long loader;
- large blur;
- large opacity fade from 0 that makes role unreadable.

### Reduced motion
Final state immediately visible. Optional 100–150 ms color/rule transition only.

## M2 — Hero → Selected Work handoff

### Intent
The hero grid becomes the structural logic of the project index.

### Full motion
On normal scrolling:
- a horizontal rule extends into the Selected Work boundary;
- section label/index appears as part of the same grid;
- no scroll-jacking;
- no fixed multi-screen animation;
- no forced snap.

Implementation may use normal CSS plus IntersectionObserver class activation if cross-browser behavior is more reliable than scroll-linked CSS.

### Reduced motion
Static rule and section label, no translation.

## M3 — Project index active state

### Desktop
Pointer hover and keyboard focus must be equivalent.

Active row may:
- thicken or extend its rule;
- shift title 6–12 px;
- accent the index;
- update the evidence panel;
- reveal one concise metadata line.

Transition target: 220–360 ms.

Inactive rows remain fully readable.

### Mobile
Tap/focus may expand a compact evidence area.
No hover assumptions.

### Reduced motion
Immediate state swap; no movement required.

## M4 — Evidence reveal

Approved media should feel like a deliberate product reveal.

Allowed:
- clip-path wipe;
- mask from grid edge;
- subtle 0.985 → 1 scale;
- translate 8–16 px;
- crossfade only when combined with a stronger structural change.

Target: 280–480 ms.

Do not animate the full screenshot continuously.

## M5 — Case-study navigation continuity

Optional enhancement, not a release blocker.

If practical without dependency:
- use the browser View Transitions API as progressive enhancement;
- preserve semantic navigation;
- do not polyfill with a large runtime;
- no route transition may delay navigation.

Fallback: normal navigation.

## M6 — Supporting section motion

Operating Mindset/About/Additional Work:
- mostly static;
- occasional rule growth or small indexed reveal;
- no generic reveal on every paragraph.

Contact:
- static except standard button/focus interaction.

## M7 — Timing vocabulary

Fast UI: 140–180 ms  
Interactive: 220–360 ms  
Editorial reveal: 360–520 ms  
Hero signature: 700–950 ms

Easing:
- use a small shared set;
- avoid spring/bounce for core portfolio surfaces.

## M8 — Performance contract

Current accepted Home initial JS:
- 94,062 B gzip
- budget: 100,000 B
- headroom: 5,938 B

Motion implementation must:
- add **no third-party animation dependency**;
- keep total Home initial JS ≤ 100,000 B gzip;
- target new motion-specific initial JS ≤ 3,000 B gzip;
- preserve static/Astro-first content;
- preserve no-JS access to all core content/navigation;
- avoid layout-thrashing loops;
- animate transform/opacity/clip properties where possible.

## M9 — Accessibility contract

- honor `prefers-reduced-motion: reduce`;
- no motion-triggered content becomes unavailable under reduced motion;
- no flashing;
- no auto-moving content that requires stop controls;
- focus order independent of visual motion;
- project active state cannot be color-only;
- keyboard and touch states receive equivalent information.

## M10 — Motion QA

Required:
- normal-motion desktop/mobile recordings or storyboard states;
- reduced-motion desktop/mobile;
- keyboard project-index test;
- touch project-index test;
- no-JS Home test;
- Lighthouse before/after;
- initial JS accounting;
- layout shift check;
- console/hydration check.

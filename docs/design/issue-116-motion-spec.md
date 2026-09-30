# Issue #116 — C+ Motion Specification

**Phase:** DESIGN  
**Principle:** motion is identity and hierarchy, not decoration.  
**Runtime dependency policy:** no new animation library.

## Motion hierarchy

Only five signature moments are authorized.

Everything else uses the existing low-key UI motion tokens.

## M1 — Hero kinetic alignment

### Goal
Create a memorable first impression while keeping the role readable immediately.

### Visual behavior
The three H1 lines begin slightly offset from their final grid positions and settle into alignment.

Suggested maximum offsets:
- line 1: 16–24 px horizontal;
- line 2: 24–40 px horizontal;
- line 3: 32–48 px horizontal.

A copper marker/rule may reveal with a short scale transform.

### Timing
- total hero settle: 620–760 ms;
- stagger: 45–70 ms per line;
- easing: existing `cubic-bezier(0.22, 1, 0.36, 1)` or a closely related non-bouncy curve.

### Critical constraints
- content exists in DOM immediately;
- no loading screen;
- no initial 0 opacity for the entire hero;
- no fake typing;
- no character-by-character animation;
- no JS hydration required;
- animation may replay only on full navigation, not on every scroll.

### Reduced motion
Final aligned state only.

## M2 — Hero → Selected Work handoff

### Goal
Make the first proof reveal feel intentional and connected to the hero.

### Behavior
When Selected Work enters the viewport:
- a top structural rule expands;
- the copper hero marker visually maps to the active project indicator;
- section label and index may translate a small distance into final position.

Do not animate the entire section from invisible.

### Timing
- 320–440 ms;
- trigger once per page session;
- use IntersectionObserver only if required.

### Constraints
- no sticky scroll sequence;
- no viewport lock;
- no scroll-speed manipulation;
- content is usable before/without the trigger.

## M3 — Project index active state

### Goal
Make Selected Work feel interactive and premium without hiding information.

### Desktop
Hover or keyboard focus on a project row:
- moves active copper rule/indicator;
- updates preview media and supplemental metadata;
- row title may translate 4–8 px;
- inactive rows remain fully readable.

### Keyboard
Focus is first-class.
The preview changes on `focusin`, not only mouseenter.

### Touch/mobile
No hover dependency.
Rows remain direct links.
A single HMS preview may remain inline; no separate active-pane controller is required.

### Timing
- active rule/title: 140–180 ms;
- evidence swap: 220–280 ms.

### Implementation preference
Vanilla progressive enhancement.
Do not create a React island solely for this state.

### No-JS
All three rows and case-study links remain present.
First evidence may remain static or the preview pane may be omitted.

## M4 — Evidence reveal

### Goal
Give approved product evidence visual weight.

### Behavior
When preview changes:
- old image exits with a very short translate/clip;
- new image enters from a controlled inset/scale;
- provenance caption changes with it.

Preferred:
- transform;
- clip-path/inset only if measured smooth;
- small opacity blend may support but not replace spatial movement.

### Timing
220–280 ms.

### Constraints
- intrinsic image dimensions always reserved;
- no layout shift;
- no zoom that crops evidence meaningfully;
- no fake screenshots;
- captions/limitations remain legible.

## M5 — Home → case-study continuity

### Goal
Make navigation feel authored without blocking it.

### Preferred technology
Progressive enhancement with the native View Transitions API where supported.

Potential transition names:
- selected project title;
- project index;
- evidence frame.

### Hard rules
- normal anchor navigation remains canonical;
- no polyfill dependency;
- unsupported browsers get ordinary navigation;
- history/back must remain normal;
- transition must not delay navigation materially.

### Reduced motion
Disable or reduce transition to immediate navigation.

## Ambient motion

Not authorized:
- cursor followers;
- infinite marquees;
- autoplay loops;
- particle systems;
- WebGL backgrounds;
- floating cards;
- global parallax;
- looping gradient animation.

A static technical grid is preferred to an animated grid.

## Existing UI motion

Dialog / Sheet / Drawer behavior from #113 remains.
Do not restyle media viewer motion unless necessary for C+ compatibility.

Existing motion tokens:
- `--motion-fast: 140ms`
- `--motion-ui: 180ms`
- `--motion-overlay: 200ms`
- `--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`

New tokens may be introduced only if they clarify the signature hierarchy, e.g.:
- `--motion-hero: 700ms`
- `--motion-section: 380ms`
- `--motion-evidence: 260ms`

## Performance requirements

- no animation library;
- avoid layout-triggering animation properties;
- avoid long main-thread work on load;
- IntersectionObserver callbacks must be tiny;
- active preview script should not ship large state-management/runtime code;
- total Home initial JS <= 100,000 B gzip.

## Accessibility

The existing global `prefers-reduced-motion: reduce` rule remains authoritative.

Additional verification:
- hero appears in final layout under reduced motion;
- Selected Work does not require motion to indicate selection;
- case navigation remains usable with View Transitions disabled;
- keyboard/focus behavior matches mouse behavior;
- motion never communicates project status by itself.

## Test matrix

Required motion QA:
- Chromium, Firefox, WebKit;
- Mobile Chrome / Mobile WebKit;
- 390 and 1440 visual state;
- reduced motion;
- JS disabled;
- keyboard-only;
- touch;
- back/forward case navigation;
- console/pageerror clean.

Motion acceptance:
- no clipped H1 at required widths;
- no unexpected layout shift;
- no focus loss;
- no hover-only facts;
- no stuck transition state;
- no animation after reduced-motion is enabled.

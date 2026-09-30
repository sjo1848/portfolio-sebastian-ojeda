# Issue #116 — C+ Prototype Storyboard

**Phase:** DESIGN  
**Direction:** C+ — Kinetic Technical Editorial  
**Purpose:** remove implementation ambiguity before BUILD.  
**Figma target page:** `02 — Selected Design + Prototype`

## Prototype principle

The prototype is not a cinematic demo. It exists to prove:
- hierarchy;
- motion intent;
- responsive behavior;
- interaction states;
- accessibility fallbacks;
- continuity from Home to case study.

The final implementation may simplify motion if performance or accessibility gates require it, but it may not invent a different visual language.

## Desktop sequence — 1440 px

### D0 — Hero / initial rendered state
Visible immediately:
- Sebastián Ojeda;
- role eyebrow;
- all three H1 lines;
- lead;
- location/work-mode metadata;
- View selected work CTA;
- Download resume CTA;
- GitHub link.

No project name or project image is visible.

The H1 starts from small horizontal offsets only. Text is never absent from the DOM.

### D1 — Hero / settled state
After ~700 ms:
- H1 aligns to final 12-column composition;
- copper marker/rule finishes its reveal;
- CTAs remain stationary enough to avoid perceived layout shift.

This is the canonical static hero frame.

### D2 — Hero → Selected Work boundary
At first scroll into Selected Work:
- section top rule expands;
- Selected Work label/index resolves into place;
- copper marker visually becomes project-active indicator.

No content is pinned.
No scroll speed is altered.

### D3 — Selected Work / HMS active
Always visible in project list:
- 01;
- HMS Cloudflare;
- category;
- short signal;
- View case study.

Right evidence pane:
- approved HMS image;
- product-evidence provenance;
- factual status/role if space permits;
- open-case action.

This is the initial desktop active state.

### D4 — Selected Work / Alquileres active
Trigger:
- pointer hover OR keyboard focus on row 02.

Changes:
- active copper rule moves to 02;
- right pane swaps to approved Alquileres evidence if approved media is available;
- title and metadata update.

Unchanged:
- all three project rows remain readable;
- row 02 remains a normal anchor.

### D5 — Selected Work / AI Commerce active
Trigger:
- pointer hover OR keyboard focus on row 03.

If no approved media meets evidence policy:
- right pane becomes a typographic/system diagram treatment;
- it must not invent a screenshot.

The typography should communicate:
`LLM → governed tools → policy/HITL → HMS`
without implying a UI that does not exist.

### D6 — Selected Work / keyboard state
Required frame:
- visible focus ring on active project link;
- evidence pane updated;
- no hover styling required;
- focus ring must not be hidden by the active copper rule.

### D7 — Operating Mindset
Static proof of hierarchy:
- HOW I WORK;
- three indexed principles;
- one concise operational-background line.

No skill chips.
No repeated project links.

### D8 — About
Quiet editorial frame:
- two short paragraphs;
- more whitespace;
- no technical card;
- no animated decorative element.

### D9 — Additional Work
Compact archive:
- six cases;
- two-column layout;
- title/category/status;
- low visual weight relative to Selected Work.

### D10 — Contact
Dark/night conversion panel:
- opportunity title;
- work-mode text;
- English line;
- Send email;
- Download resume;
- GitHub.

This is the second highest-contrast area after the hero.

## Mobile sequence — 390 px

### M0 — Hero / initial
Visible:
- name;
- menu;
- role eyebrow;
- three-line H1;
- lead;
- View selected work;
- Download CV/resume.

No project image.

### M1 — Hero / settled
H1 offsets resolve with smaller travel than desktop.

Required:
- no clipping at 360, 390, 430;
- no horizontal scrolling;
- CTA touch targets >= 44 px.

### M2 — Selected Work / list
All three projects appear as ordinary vertical links.

Each row contains:
- index;
- title;
- category or short signal;
- case-study action affordance.

No desktop side-preview model.

### M3 — HMS inline evidence
The first project may show one approved evidence frame immediately after its summary.

The evidence:
- keeps intrinsic aspect ratio;
- includes provenance/limitation caption;
- is not required to navigate.

### M4 — Other project rows
Alquileres and AI Commerce remain fully understandable without expandable interaction.

Optional approved media may appear later in the section only if it does not make Home excessively long.

### M5 — Operating Mindset
Three stacked indexed rows with rules.

### M6 — About
Two short paragraphs.

### M7 — Additional Work
Single-column compact archive.

### M8 — Contact
Actions stack only when width requires it.
All targets remain >= 44 px.

## Reduced-motion prototype

Required static frames:

### R0 — Home
- hero appears directly in D1/M1 settled state;
- no transform offsets;
- no animated grid/rule expansion.

### R1 — Selected Work
- active-state change may be immediate or near-immediate;
- no spatial evidence animation required;
- project links/focus remain clear.

### R2 — Case navigation
- ordinary navigation;
- no View Transition animation.

## No-JavaScript prototype

Required behavior:
- hero fully readable;
- View selected work anchor works;
- resume link works;
- all three lead project anchors work;
- Selected Work text remains complete;
- active preview may remain static HMS or be absent;
- mobile navigation retains its existing supported fallback contract;
- Contact actions remain ordinary links.

No-JS must not look broken because an animation controller failed to initialize.

## Case-study entry storyboard

C+ continuity applies to the first viewport only; long-form case content remains evidence-led and readable.

### C0 — HMS Cloudflare
Visible:
- Back to selected work;
- 01;
- HMS Cloudflare;
- brownfield migration category;
- factual status;
- role;
- concise summary;
- stack;
- GitHub;
- approved evidence in or immediately after first viewport.

Visual grammar:
- indexed rule/grid alignment;
- Stone/Paper base;
- evidence receives stronger weight than decorative system traces.

### C1 — Alquileres Uspallata
Same grammar.
Evidence only from approved/synthetic reproducible assets.

### C2 — AI Commerce + HMS
Same grammar.
If visual evidence is not approved:
- keep first viewport typographic;
- use governed-tool architecture as text/diagram, not fabricated UI.

## Home → case transition

When supported:
- selected project title may receive a native View Transition name;
- index and/or evidence may transition;
- navigation remains an ordinary anchor.

Fallback:
- instant normal page navigation.

The transition is optional if it threatens:
- back/forward behavior;
- reduced motion;
- browser compatibility;
- performance.

## Interaction state matrix

| Surface | Default | Pointer | Keyboard | Touch | Reduced motion | No JS |
|---|---|---|---|---|---|---|
| Hero | readable | no special dependency | CTA focus | CTA tap | settled | settled |
| Project row | all info visible | activates preview | activates preview + focus | normal link | immediate state | normal link |
| Evidence pane | HMS default | swaps | swaps | not required | no spatial animation | static/absent |
| Case link | anchor | anchor | anchor | anchor | normal nav | normal nav |
| Resume | anchor | anchor | anchor | anchor | unchanged | unchanged |

## Prototype acceptance checklist

Before DESIGN PASS, Controller must verify:
- D1 visually reads as premium and not empty;
- D3 makes proof arrive quickly enough after the hero;
- D4/D5 state changes do not make list content jump;
- M1 title fits all mobile target widths;
- M2 does not feel like a desktop layout collapsed vertically;
- contact is easy to find;
- reduced-motion state still looks intentionally designed;
- no essential information depends on hover;
- case-study first viewport feels like the same portfolio system;
- evidence remains more important than decoration.

## Figma frame inventory

Create on `02 — Selected Design + Prototype`:

Desktop:
1. `C+ / Home / 1440 / D0 Initial`
2. `C+ / Home / 1440 / D1 Settled`
3. `C+ / Home / 1440 / D3 HMS Active`
4. `C+ / Home / 1440 / D4 Alquileres Active`
5. `C+ / Home / 1440 / D5 AI Active`
6. `C+ / Case / HMS / 1440 / First Viewport`

Mobile:
7. `C+ / Home / 390 / M0 Initial`
8. `C+ / Home / 390 / M1 Settled`
9. `C+ / Home / 390 / M2 Selected Work`
10. `C+ / Case / HMS / 390 / First Viewport`

Accessibility:
11. `C+ / Home / 1440 / Keyboard Focus`
12. `C+ / Home / 390 / Reduced Motion`

Prototype links:
- D0 → D1;
- D1 → D3 by scroll/handoff representation;
- D3 ↔ D4 ↔ D5 as interactive state;
- D3 → HMS case;
- mobile M1 → M2;
- M2 → HMS case.

## Gate

Once the above frames/states are materialized and visually checked, the Controller may post:

`DESIGN_PASS_BUILD_AUTHORIZED`

No additional product decision is required unless the Figma pass reveals a material contradiction.

# Issue #116 — IA + Visual Direction Discovery

**Phase:** DISCOVERY → INFORMATION ARCHITECTURE → VISUAL DIRECTION  
**BUILD:** BLOCKED  
**Baseline:** `7ac73cdd81336e7c9021809b2340b4b455268fd6`  
**Figma:** https://www.figma.com/design/z77envgN7luuRZkDrURPKg

## 1. Objective

Redesign the portfolio deliberately before implementation. The immediate objective is to reduce repeated messaging, restore progressive discovery, compare multiple visual languages, and define where high-impact motion adds identity without weakening usability, accessibility, performance, or technical credibility.

The Product Owner explicitly requested:
- remove HMS evidence from the next hero direction;
- avoid explaining all project evidence before the recruiter scrolls;
- reduce redundant content;
- explore visually distinctive frontend directions;
- use stronger motion in selected high-impact moments;
- approve mockups/prototype before BUILD.

## 2. Current Home IA

1. Header / navigation.
2. Hero: role, backend orientation, proposition, CTA, GitHub, three lead-project status links, HMS evidence.
3. Selected Work: the same three lead cases with media, role, stack, status and CTA.
4. Capabilities: five technical groups linked back to lead-case evidence.
5. Experience: SAP, integrations, operational processes, applied AI and how that context influences software design.
6. Method: Discover / Build / Verify plus an expandable eight-phase Project Method.
7. About: operational background, discovery philosophy, learning, Uspallata/mountains.
8. Additional Work: six secondary cases.
9. Contact.

## 3. Redundancy map

### Hero → Selected Work
The hero currently names the three lead cases, states their status and shows HMS evidence. Selected Work immediately introduces the same cases again with richer context. This weakens progressive discovery and makes HMS appear twice before the recruiter reaches project depth.

**Direction:** remove project evidence and lead-project roster from the exploratory hero.

### Capabilities → project cards / case studies
Backend, interfaces, data/cloud, AI and quality are already visible in project role, stack and technical case content. The capabilities catalog repeats evidence that the projects themselves demonstrate.

**Direction:** do not preserve the current five-block capability section unchanged.

### Capabilities → Experience
SAP, integrations, AI/HITL, testing and operations appear in both.

**Direction:** merge the useful differentiator into one compact section rather than two adjacent taxonomies.

### Experience → About
The operational background story appears in Experience and again in the opening About paragraph.

**Direction:** technical/operational background belongs in a concise professional differentiator; About should remain human.

### Method → Method
The Home first explains three steps and then exposes eight phases.

**Direction:** do not teach the full Project Method twice on the Home.

### Method → About
“Understand the problem before building” appears both as formal process and personal philosophy.

**Direction:** express the principle once.

## 4. Proposed reduced IA

### 1 — Hero / Identity
Purpose: identity, role, short proposition and one primary path forward.

Not included:
- HMS screenshot;
- project names;
- project statuses;
- proof roster.

The hero should create enough clarity and visual curiosity to motivate exploration.

### 2 — Selected Work / Proof
First real reveal of HMS Cloudflare, Alquileres Uspallata and AI Commerce + HMS.

This is where promise turns into evidence.

### 3 — Operating Mindset / Differentiator
Merge the useful parts of Capabilities + Experience + Method into a compact professional section:

- Understand systems.
- Build end-to-end.
- Verify boundaries.

Operational/SAP/integration background is context here, not a second biography.

### 4 — About / Human
Keep only information that adds a different signal:
- curiosity and learning;
- Uspallata / mountain context;
- personal relationship with problem-solving.

Remove repeated technical positioning.

### 5 — Additional Work / Breadth
Keep six secondary cases as a lower-priority archive.

### 6 — Contact / Conversion
Clear contact path without another recap of capabilities.

## 5. Recruiter discovery journey

### 0–5 seconds — Identity
Understand who Sebastián is, target role and differentiating thesis.

### 5–20 seconds — Curiosity
Typography, composition and selective motion demonstrate frontend/UI judgment without presenting product proof yet.

### 20–45 seconds — Proof
Selected Work reveals the first real project evidence.

### 45–90 seconds — Depth
A chosen case study explains ownership, architecture, backend, data, trade-offs, validation and limits.

### Later — Affinity
Operating Mindset and About explain how Sebastián thinks and who he is. Secondary Work adds breadth. Contact closes the journey.

**Principle:** immediate clarity does not require immediate total disclosure.

## 6. Visual research principles

### Functional minimalism
Useful principle: subtract elements/content that do not support the user task, while preserving visible navigation and enough information to understand the next step.

Reference:
- https://www.smashingmagazine.com/2017/10/functional-minimal-web-design/
- https://www.smashingmagazine.com/2010/05/principles-of-minimalist-web-design-with-examples/

### Controlled neobrutalism
Useful principle: raw geometry, bold contrast and visible structure can create memorability.

Risk: high-contrast blocky layouts can become overwhelming or visually dominate usability.

Reference:
- https://www.nngroup.com/articles/neobrutalism/

### Swiss / technical editorial
Useful principle: strict grids, sans-serif typography, precision, controlled asymmetry and restrained color provide a strong bridge between engineering credibility and visual authorship.

Recent portfolio/process references:
- https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/
- https://tympanus.net/codrops/2026/03/16/jonas-reymondins-portfolio-reclaiming-the-ui-eye-through-systems-code-and-pixel-motion/
- https://tympanus.net/codrops/2025/07/25/designer-spotlight-ivor-jian/

### Motion
Motion should be concentrated in meaningful moments and have a complete reduced-motion alternative. Nonessential motion should not be required to understand content.

Reference:
- https://web.dev/learn/accessibility/motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility

## 7. Direction A — Editorial Minimalism

Characteristics:
- warm canvas;
- oversized but calm typography;
- high negative space;
- thin rules;
- project list rather than cards in the first handoff;
- motion used as punctuation.

Strengths:
- high recruiter clarity;
- strong mobile resilience;
- strong backend/product fit;
- low visual noise.

Risk:
- can feel too safe or similar to other typography-led portfolios.

## 8. Direction B — Controlled Brutalism

Characteristics:
- hard structural borders;
- extreme scale contrast;
- large copper block;
- exposed layout;
- project rows separated by heavy rules.

Strengths:
- immediate memorability;
- strong first-screen impact;
- good mobile translation;
- strong motion opportunities.

Risk:
- can make the aesthetic louder than the work;
- can shift positioning toward experimental designer rather than backend-oriented product engineer;
- must avoid playful neobrutalist tropes, stickers and cartoon shadows.

## 9. Direction C — Kinetic Swiss / Technical Editorial

Characteristics:
- visible strict grid;
- offset typographic composition;
- small technical labels and indices;
- restrained Stone / Copper palette;
- project index integrated into the grid;
- motion derived from alignment/reconfiguration rather than ambient effects.

Strengths:
- very distinctive while remaining systematic;
- strongest match between frontend judgment and engineering identity;
- excellent motion potential;
- naturally supports project indexing and technical metadata.

Risk:
- grid can become decoration;
- large type needs deliberate mobile tuning;
- overdesign would reduce readability.

An initial mobile wrap issue in the Developer title was identified during visual review and corrected in Figma. This reinforces the need to treat mobile composition as an independent design task.

## 10. Controller recommendation — C+ exploration

Do **not** combine all three directions.

The next refinement should test a bounded hybrid:

- **C as the underlying system:** grid, indexing, technical/editorial rhythm, kinetic typography.
- **A as restraint:** negative space, quiet areas, less content above the fold.
- **B only as structural tension:** selected hard rules, cuts or occasional blocks — not the whole visual language.

Working label: **C+ — Kinetic Technical Editorial**.

This is a recommendation for the next mockup iteration, **not Product Owner approval of the final direction**.

## 11. Motion concepts for C+

Prioritize four moments:

1. Hero kinetic alignment: typographic elements begin offset and resolve into a controlled grid.
2. Hero → Selected Work handoff: one strong transition rather than repeated scroll reveals.
3. Project index interaction: row/grid state reveals contextual metadata or media.
4. List → case-study spatial continuity where technically justified.

Avoid:
- global fade-on-scroll;
- autoplay loops;
- cursor followers;
- fake typing;
- gratuitous parallax;
- WebGL as decoration;
- effects that delay reading.

## 12. Figma state

File:
https://www.figma.com/design/z77envgN7luuRZkDrURPKg

Starter limit: three pages per file.

Current organization:

1. `00 — IA + Content + Research`
   - current IA;
   - redundancy map;
   - proposed reduced IA;
   - recruiter journey;
   - design principles.

2. `01 — Visual Directions`
   - Direction A desktop/mobile;
   - Direction B desktop/mobile;
   - Direction C desktop/mobile;
   - critical comparison;
   - recommendation C+.

3. `02 — Selected Design + Prototype`
   - intentionally empty until Human Gate / bounded refinement decision.

## 13. Current gate

**BUILD remains BLOCKED.**

Recommended next Human Gate:

- continue with **C+ exploration**, producing two refined hero + Selected Work variants (C1/C2), desktop and mobile;
- or select A/B for refinement;
- or request a fourth direction before deeper mockups.

No frontend implementation is authorized by this report.


## 14. Fair comparison — implemented baseline vs C+

To reduce decision ambiguity, the current implemented Home was reconstructed in Figma from the actual `main` source and CSS rather than from memory.

### Current implemented baseline
Source characteristics preserved in the reconstruction:
- Stone / Andes Copper palette;
- two-column desktop hero;
- role + backend-oriented proposition;
- Projects and GitHub CTAs;
- three lead-project status links in the hero;
- HMS Cloudflare evidence in the hero;
- Selected Work immediately below;
- project cards with media, status, title, role/stack-style metadata and evidence framing;
- rounded cards, soft shadow/elevation and restrained microinteraction language.

This confirms that the current implementation is already closest to **Direction A**, although with more product-card/UI treatment and more evidence exposed before the first scroll.

### C+ comparison concept
A new editable C+ concept was added using the same positioning and lead projects.

Key differences:
- hero contains identity and proposition only;
- no HMS media in hero;
- no lead-project roster in hero;
- technical grid is present but quieter than Direction C;
- Stone / Copper is retained;
- Selected Work becomes the first proof reveal;
- project presentation begins as an indexed editorial system rather than cards;
- the first project can expose a contextual evidence preview on interaction;
- mobile is composed independently rather than treated as a stacked desktop.

Figma node references:
- Baseline desktop: `10:5`
- Baseline mobile: `10:62`
- C+ desktop: `10:87`
- C+ mobile: `10:129`

These frames are located in `01 — Visual Directions`.

## 15. Figma Starter MCP limit encountered

After successfully creating the baseline and C+ frames, the Figma MCP Starter call quota was reached during the final screenshot-validation pass.

Observed tool response:
> You've reached the Figma MCP tool call limit on the Starter plan.

Therefore:
- the frames were created successfully;
- structural creation returned PASS;
- **final screenshot review of the newly created baseline and C+ frames is still pending**;
- no Human Gate should be considered passed based solely on their creation;
- no BUILD authorization is implied.

The correct next action when MCP access becomes available again is:
1. screenshot baseline desktop/mobile;
2. screenshot C+ desktop/mobile;
3. check clipping, hierarchy, density and mobile title wrapping;
4. apply only targeted fixes;
5. present the side-by-side comparison to Product Owner.

BUILD remains blocked.

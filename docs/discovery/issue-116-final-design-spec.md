# Issue #116 — C+ Final Product & Visual Design Specification

**Status:** DESIGN DEFINITION COMPLETE — FIGMA VISUAL QA PENDING  
**Build:** BLOCKED until Figma validation is complete  
**Baseline:** `7ac73cdd81336e7c9021809b2340b4b455268fd6`

## 1. North Star

The portfolio exists to generate qualified interviews and paid software work.

The experience must communicate, in this order:

1. Sebastián is a **Full-Stack Software Developer, backend-oriented**.
2. He builds systems connected to real operational workflows.
3. He has real project evidence and can explain engineering trade-offs.
4. He also has strong product/UI judgment.
5. It is easy to inspect his work, download his resume, view GitHub and contact him.

The design must be simultaneously:
- beautiful;
- distinctive;
- technically credible;
- fast to scan;
- commercially persuasive;
- accessible;
- performant.

## 2. Selected direction

**C+ — Kinetic Technical Editorial**

C+ combines:
- a Swiss/technical grid and indexed editorial rhythm;
- large, kinetic typography;
- Stone / Andes Copper identity;
- restrained asymmetry;
- selective hard rules and structural tension;
- generous quiet space;
- contextual evidence rather than evidence everywhere.

The visual system should feel authored, not templated.

It must not make Sebastián look like a pure creative developer or visual designer. Motion and composition demonstrate frontend judgment while the project evidence demonstrates software engineering depth.

## 3. Final Home information architecture

### 01 — Header
Purpose: orientation and direct conversion.

Desktop:
- `SJO / 2026` or `Sebastián Ojeda` brand lockup;
- Work;
- About;
- Contact;
- Resume / CV;
- language switch.

Mobile:
- brand;
- Menu;
- drawer/sheet with the same destinations.

Remove Method and Experience from primary navigation because they no longer exist as standalone Home sections.

### 02 — Hero / Identity
Purpose: immediate role clarity + memorable visual identity.

No project image.
No project roster.
No project statuses.
No stack list.

Content:

**EN**
- kicker: `FULL-STACK SOFTWARE DEVELOPER`
- display composition: `FULL-STACK / SOFTWARE / DEVELOPER`
- proposition: `Backend-oriented. I turn real operational workflows into reliable end-to-end software across APIs, data, integrations and interfaces.`
- primary CTA: `View selected work`
- secondary CTA: `Download resume`
- small meta: `Mendoza, Argentina · Remote-first`

**ES**
- kicker: `DESARROLLADOR DE SOFTWARE FULL-STACK`
- display composition: `FULL-STACK / SOFTWARE / DEVELOPER` may remain as the visual brand line if bilingual testing confirms clarity; otherwise use `DESARROLLADOR / FULL-STACK`.
- proposition: `Orientado a backend. Convierto procesos operativos reales en software end-to-end confiable: APIs, datos, integraciones e interfaces.`
- primary CTA: `Ver trabajo seleccionado`
- secondary CTA: `Descargar CV`
- small meta: `Mendoza, Argentina · Remoto prioritario`

The displayed role and CTA must remain readable before animation completes.

### 03 — Selected Work / Proof
Purpose: first proof reveal.

Lead order remains:
1. HMS Cloudflare
2. Alquileres Uspallata
3. AI Commerce + HMS

This section uses an indexed editorial system rather than a three-card dashboard.

Each project row always exposes:
- index;
- title;
- category;
- role;
- current truthful status;
- short engineering signal;
- case-study action.

Desktop enhancement:
- active/focused project reveals contextual approved media in a dedicated preview region;
- media reveal is progressive enhancement only;
- no recruiter-critical information is hover-only.

Mobile:
- rows remain fully readable;
- optional tap expands/reveals media/context;
- first project may be expanded by default only if this does not increase cognitive load.

### 04 — Operating Mindset / Differentiator
Purpose: replace repetitive Capabilities + Experience + Method sections.

Three statements:

**Understand systems**
`I start with actors, states, authority, failure paths and the operational process behind the interface.`

**Build end-to-end**
`I work across backend services, data, integrations and interfaces, choosing architecture proportional to the problem.`

**Verify boundaries**
`I treat testing, security, accessibility, recovery and explicit limits as part of the product—not a final checklist.`

Context line:
`My background in support, infrastructure, SAP Basis and SAP integrations shapes how I approach operational software.`

AI line:
`I use AI where it adds leverage, while keeping permissions, policy, trusted context and critical side effects deterministic.`

ES equivalents should preserve exactly the same factual scope and not introduce new claims.

Do not add a long technology catalog here.

### 05 — About / Human
Purpose: affinity and personality, not another technical pitch.

Target: two short paragraphs.

Suggested ES:
`Vivo en Uspallata, Mendoza. Me gusta trabajar cerca de problemas reales, entender cómo funcionan y hacer las preguntas necesarias antes de decidir qué construir.`

`Aprender es una constante: software, datos, infraestructura, idiomas o un dominio nuevo. Fuera de la pantalla, la montaña, correr y explorar forman una parte importante de mi vida.`

Suggested EN:
`I live in Uspallata, Mendoza. I enjoy getting close to real problems, understanding how they work, and asking the questions needed before deciding what to build.`

`Learning is a constant for me—software, data, infrastructure, languages or a new domain. Away from the screen, mountains, running and exploring are an important part of my life.`

### 06 — Additional Work / Breadth
Purpose: demonstrate range without competing with lead proof.

Projects:
- UspaYa
- GasFlow
- Agentic Engineering Governance
- HMS Elite
- JM Soluciones
- Taco Loco

Presentation:
- compact indexed archive/list;
- title + short category + state;
- no large cards by default;
- optional small thumbnail only where verified evidence materially helps.

### 07 — Contact / Conversion
Purpose: remove friction from the hiring action.

Headline:

EN:
`Open to Full-Stack and Backend opportunities.`

ES:
`Busco oportunidades Full-Stack y Backend.`

Secondary line may mention Applied AI / automation without making the headline diffuse.

Actions:
1. Send email
2. Download resume / CV
3. GitHub
4. Copy email

Retain location, work mode and truthful English level.

## 4. Visual system

### Color
Preserve the current Stone / Andes Copper family:
- canvas `#eee6da`;
- paper/surface `#fff9f1`;
- ink `#172027`;
- muted `#5f6968`;
- line `#d4c5b4`;
- accent `#b84e1e`;
- accent strong `#843713`;
- night `#17272e`;
- night raised `#21343c`.

No new rainbow/project-color system on Home.

### Grid
Desktop design artboard: 1440 px.
- 12-column logical grid;
- visible grid lines only where they strengthen composition;
- grid is a visual motif, not a permanent overlay;
- content max-width remains compatible with current container behavior.

Mobile design artboard: 390 × 844.
- 6-column logical grid;
- mobile composition is independently designed;
- no simple desktop stacking.

### Typography
Primary: current product font unless a deliberate font change passes implementation and licensing review.

Hierarchy:
- display hero: 88–124 px fluid desktop;
- mobile display: 40–52 px;
- section titles: 32–48 px desktop;
- project index numbers: strong monospace/technical voice;
- body: preserve comfortable current reading scale and line-height.

No font change is required to achieve the redesign.

### Shapes
- fewer rounded SaaS cards;
- border radius remains for real media panels, controls and contact surfaces;
- indexed rows use rules and spacing rather than containers;
- avoid cartoon neobrutalist shadows.

### Imagery
Hero: none.

Selected Work:
- HMS: approved versioned evidence;
- Alquileres: existing synthetic/reproducible evidence;
- AI Commerce: remain typographic until approved visual evidence exists.

Evidence captions retain provenance and limitation semantics.

## 5. First viewport behavior

Desktop:
- header + hero should fit in roughly 78–88 svh;
- the Selected Work handoff/cue should be visually perceptible without a cinematic intro;
- role is readable at first paint.

Mobile:
- hero should not consume multiple full screens;
- target roughly 68–78 svh after header;
- Selected Work label or first project should be reachable immediately with one normal scroll gesture.

No loader.

## 6. Interaction design

### Project index
Desktop:
- pointer hover and keyboard focus produce the same active state;
- active row changes rule weight/position/accent;
- evidence preview changes contextually;
- selected project remains a normal link.

Mobile:
- no hover dependency;
- tap on disclosure/row may reveal preview;
- link remains directly operable.

### Buttons/links
- minimum 44 × 44 CSS px target;
- strong visible focus;
- accent underline/rule language;
- no magnetic buttons.

### Header
May become slightly more compact after initial scroll using CSS/low-cost state change, but must not jump or obscure anchors.

## 7. Responsive principles

Required design/QA widths:
- 360
- 390
- 430
- 768
- 1024
- 1440

At every width:
- no horizontal overflow;
- hero title does not orphan or clip;
- project title/meta remain readable;
- media preview does not become required to understand the project;
- contact actions remain reachable;
- no hover-only information.

## 8. Conversion requirements

Within the first minute, a recruiter must be able to:
- identify target role;
- understand backend orientation;
- see the three lead cases;
- understand current state/role for a chosen case;
- open one case study;
- download the resume;
- reach email/GitHub.

The Home should not require reading the full About or Operating Mindset to understand professional fit.

## 9. Explicit removals from current Home

Remove as standalone Home sections:
- five-block Capabilities taxonomy;
- Experience section;
- eight-phase Method disclosure.

Remove from Hero:
- HMS evidence;
- lead-project roster;
- lead-project statuses.

Move/retain deeper:
- full Project Method may remain in a dedicated deeper context if it already has value, but not duplicated on Home;
- exhaustive stack belongs in cases/CV/GitHub, not the Home pitch.

## 10. Reference principles

Recent references reinforce the direction without becoming templates:
- Jonas Reymondin — strict Swiss grid + technical identity + unique animations.
- Bisous — restrained palette, editorial grid, technical mono layer.
- Wide — typography and imagery reorganized by a grid before adding effects.
- House of Yellow — motion treated as one coherent system rather than disconnected effects.
- Corentin Bernadou — Swiss precision balanced against experimental motion.

C+ deliberately excludes their heavy WebGL/creative-developer emphasis because it is not aligned with this portfolio's hiring goal.

## 11. Definition of done for design

Design is ready for implementation only when Figma includes:
- Home 1440;
- Home 390;
- hero states;
- Selected Work default/active/focus/tap states;
- Operating Mindset;
- About;
- Additional Work;
- Contact;
- case-study first viewport;
- motion storyboard;
- reduced-motion storyboard;
- responsive notes;
- interaction notes.

Final screenshot QA of these frames is mandatory before BUILD authorization.

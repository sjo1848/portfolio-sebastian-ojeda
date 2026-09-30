# Issue #116 — DESIGN CONTRACT — C+ Kinetic Technical Editorial

**Phase:** DESIGN  
**Direction:** C+ — Kinetic Technical Editorial  
**Source definition:** `docs/discovery/issue-116-definition.md`  
**Figma:** https://www.figma.com/design/z77envgN7luuRZkDrURPKg  
**BUILD:** BLOCKED until the design gate is posted.

## 1. Visual thesis

C+ must feel like a software engineer who understands systems and also has strong visual judgment.

The visual language combines:
- technical grid discipline;
- editorial scale;
- Stone / Andes Copper identity;
- restrained brutalist tension;
- large kinetic typography;
- evidence-led project presentation.

It must not look like:
- a SaaS dashboard;
- a bento-template portfolio;
- a generic shadcn landing page;
- a design-agency portfolio;
- a neobrutalist toy interface.

## 2. Existing identity to preserve

Do not replace the accepted palette.

Primary tokens remain:
- canvas `#eee6da`;
- paper/surface `#fff9f1`;
- ink `#172027`;
- muted `#5f6968`;
- line `#d4c5b4`;
- accent / Andes Copper `#b84e1e`;
- accent strong `#843713`;
- night `#17272e`;
- night raised `#21343c`;
- night text `#fff8ed`;
- focus `#0e6870`.

Typography remains:
- Inter for primary UI/editorial type;
- system monospace only for indices/metadata.

No new font download is justified for this initiative.

## 3. New design grammar

### Grid
Desktop:
- 12-column visual grid;
- content remains constrained by the existing max container unless a deliberate full-bleed rule/line is used;
- grid lines are extremely low contrast and may appear only in Hero and selected transitions.

Tablet:
- 8-column conceptual grid.

Mobile:
- 6-column conceptual grid;
- asymmetry is preserved, but no text may clip or create horizontal scrolling.

Grid is a compositional tool, not decoration. If removing a visible grid line does not reduce hierarchy or continuity, remove it.

### Rules
Thin 1 px rules establish structure.
2–3 px copper/ink rules are reserved for:
- active project;
- major section handoff;
- intentional brutalist accent.

### Corners
C+ reduces the number of rounded containers.
Rounded cards are not the default content primitive.

Use radius only when it communicates:
- media/evidence frame;
- interactive control;
- dark conversion/contact panel.

### Shadows
Keep shadows sparse.
No global floating-card aesthetic.
Project index rows use no shadow.

## 4. Header

### Desktop
Left:
- `Sebastián Ojeda` as the primary brand text.

Right:
- Work
- About
- Contact
- Resume/CV
- ES/EN

The internal `SJO / 26` treatment may appear as low-emphasis metadata, but it cannot replace the visible name.

Sticky behavior remains.

### Mobile
Keep the existing accessible Sheet/navigation architecture.
Do not redesign navigation into an experimental full-screen animation.

The trigger remains at least 44 × 44 CSS px.

## 5. Hero

### Content — English
Eyebrow:
`FULL-STACK SOFTWARE DEVELOPER · BACKEND-ORIENTED`

H1:
`FULL-STACK`
`SOFTWARE`
`DEVELOPER`

Lead:
`I turn operational workflows into reliable software across backend, data, integrations and interfaces.`

Supporting metadata:
`Mendoza, Argentina · Remote-first`

Primary CTA:
`View selected work`

Secondary CTA:
`Download resume`

Low-emphasis link:
`GitHub ↗`

### Content — Spanish
Eyebrow:
`DESARROLLADOR DE SOFTWARE FULL-STACK · FOCO BACKEND`

H1:
`FULL-STACK`
`SOFTWARE`
`DEVELOPER`

Lead:
`Convierto procesos operativos en software confiable: backend, datos, integraciones e interfaces.`

Supporting metadata:
`Mendoza, Argentina · Remoto prioritario`

Primary CTA:
`Ver trabajo seleccionado`

Secondary CTA:
`Descargar CV`

Low-emphasis link:
`GitHub ↗`

The role may remain in English inside the kinetic H1 for bilingual recognizability, but Spanish explanatory copy must remain Spanish.

### Hero layout
Desktop:
- large three-line H1 spanning the grid with controlled horizontal offsets;
- eyebrow and metadata occupy small grid cells;
- lead sits away from the H1 rather than directly under it;
- CTAs remain clearly grouped;
- no screenshot/media;
- no project names.

The first screen must still fit role, lead and CTAs at common laptop heights.

Mobile:
- retain the three-line composition;
- reduce offsets instead of stacking a desktop layout literally;
- title must fit 320–430 px widths without clipping;
- CTA group may stack only if required;
- no evidence image.

## 6. Hero → Selected Work handoff

The transition is visual and structural, not cinematic.

Static geometry:
- one hero rule/grid line continues into the Selected Work boundary;
- the copper marker used in the hero becomes the active-state accent in the project index.

Scroll behavior:
- no scroll-jacking;
- no pinned multi-screen sequence;
- no content delay.

Motion behavior is defined separately in `issue-116-motion-spec.md`.

## 7. Selected Work

### Section heading — English
Eyebrow:
`SELECTED WORK`

Title:
`Systems built around real operational constraints.`

Intro:
`Three backend-oriented cases showing ownership, architecture and available evidence.`

### Section heading — Spanish
Eyebrow:
`TRABAJO SELECCIONADO`

Title:
`Sistemas construidos alrededor de restricciones operativas reales.`

Intro:
`Tres casos con foco backend, ownership, arquitectura y evidencia disponible.`

### Desktop composition
Two-zone layout:
- project index / details: approximately 7 columns;
- active evidence preview: approximately 5 columns.

The project list is always readable.

Rows:

#### 01 — HMS Cloudflare
Category:
- EN: `Brownfield operational SaaS migration`
- ES: `Migración brownfield de un SaaS operacional`

Short signal:
- EN: `Rust/PostgreSQL → Workers/D1 with tenant isolation, browser validation and verifiable recovery.`
- ES: `Rust/PostgreSQL → Workers/D1 con aislamiento multi-tenant, validación en navegador y recovery verificable.`

Evidence:
- approved HMS product capture;
- visible provenance/limitation label;
- do not imply Production Release or Product Acceptance.

#### 02 — Alquileres Uspallata
Category:
- EN: `Vacation-rental catalog and operations`
- ES: `Catálogo y operación de alquileres turísticos`

Short signal:
- EN: `Full-stack publication workflow with server-side authority, availability freshness and auditability.`
- ES: `Workflow full-stack de publicación con autoridad server-side, vigencia de disponibilidad y auditoría.`

Evidence:
- only approved/synthetic reproducible media from the evidence registry.

#### 03 — AI Commerce + HMS
Category:
- EN: `Governed AI over real operations`
- ES: `IA gobernada sobre operaciones reales`

Short signal:
- EN: `LLM tool calling with policies, HITL, idempotency and audit — the model never becomes operational authority.`
- ES: `Tool calling con políticas, HITL, idempotencia y auditoría: el modelo nunca se convierte en autoridad operacional.`

Evidence:
- remain typographic if no approved visual proof meets the evidence contract.

### Row contract
Always visible:
- index;
- title;
- category;
- short signal;
- `View case study` / `Ver caso de estudio`.

Optional active state:
- status;
- role;
- evidence preview;
- compact stack signal.

Do not hide recruiter-critical information inside hover.

### Desktop interaction
Hover and keyboard focus may update the evidence pane.
Clicking row/title enters the case study.

The first row is the initial active visual state, but all three links remain ordinary navigable anchors.

### Mobile
No side evidence pane.

Each row remains an ordinary anchor/list item.
HMS may include one approved media preview after its summary.
Other media is not required on Home.

No accordion is required for essential information.

## 8. Operating Mindset

This section replaces the separate Capabilities, Experience and Method blocks.

### Heading — English
Eyebrow: `HOW I WORK`
Title: `Understand the system. Build end-to-end. Verify the boundaries.`

### Heading — Spanish
Eyebrow: `CÓMO TRABAJO`
Title: `Entender el sistema. Construir end-to-end. Verificar los límites.`

Three items:

### 01 — Understand systems / Entender sistemas
EN:
`I map actors, states, constraints, authority and failure paths before treating the UI or API as the whole problem.`

ES:
`Mapeo actores, estados, restricciones, autoridad y fallos antes de tratar la UI o la API como si fueran todo el problema.`

### 02 — Build end-to-end / Construir end-to-end
EN:
`I connect backend services, data, integrations and interfaces with architecture proportional to the problem.`

ES:
`Conecto backend, datos, integraciones e interfaces con una arquitectura proporcional al problema.`

### 03 — Verify boundaries / Verificar límites
EN:
`I use tests, browser validation, security checks and operational evidence to distinguish technical PASS from product or release claims.`

ES:
`Uso pruebas, validación en navegador, controles de seguridad y evidencia operacional para separar un PASS técnico de una aceptación o release.`

Context line:
EN:
`My background in support, infrastructure, SAP and integrations keeps this work grounded in real operational processes.`

ES:
`Mi experiencia en soporte, infraestructura, SAP e integraciones mantiene este enfoque conectado con procesos operativos reales.`

Visual treatment:
- three editorial columns/rows;
- indices;
- rules;
- no skill chips;
- no project-proof link repetition.

## 9. About

### English
Title:
`A little about me`

Copy:
`I live in Uspallata, Mendoza. Before focusing on software development I worked across support, infrastructure, SAP and integrations, which taught me to see software inside real processes rather than as isolated pieces.`

`I am driven by difficult problems and new domains. Away from the screen I run, hike and spend time in the mountains; living in Uspallata keeps that contrast close.`

### Spanish
Title:
`Un poco sobre mí`

Copy:
`Vivo en Uspallata, Mendoza. Antes de concentrarme en desarrollo trabajé en soporte, infraestructura, SAP e integraciones, y ese recorrido me enseñó a mirar el software dentro de procesos reales y no como piezas aisladas.`

`Me mueven los problemas difíciles y los dominios nuevos. Fuera de la pantalla corro, camino y paso tiempo en la montaña; vivir en Uspallata mantiene cerca ese contraste.`

Visual treatment:
- no technical card;
- calm section;
- more whitespace than adjacent technical sections;
- optional subtle non-photo topographic/rule motif only if it does not create a mining/mountain-specific professional identity.

## 10. Additional Work

Keep:
- UspaYa
- GasFlow
- Agentic Engineering Governance
- HMS Elite
- JM Soluciones
- Taco Loco

Treatment:
- compact two-column index on wide screens;
- single-column on mobile;
- title + category + status only;
- case-study link;
- no large evidence card unless a future project is promoted into Selected Work.

Purpose: breadth without competing with lead cases.

## 11. Contact

Dark/night panel remains a high-contrast conversion moment.

### English
Eyebrow:
`CONTACT`

Title:
`Open to Full-Stack and Backend opportunities.`

Body:
`Remote-first from Mendoza, Argentina. Hybrid, on-site and relocation can be considered for the right opportunity.`

Secondary line:
`Intermediate English, actively improving through professional practice.`

Actions:
- Send email
- Download resume
- GitHub

### Spanish
Eyebrow:
`CONTACTO`

Title:
`Busco oportunidades Full-Stack y Backend.`

Body:
`Remoto prioritario desde Mendoza, Argentina. Puedo evaluar modalidad híbrida, presencial o reubicación según la oportunidad.`

Secondary line:
`Inglés intermedio, en desarrollo y práctica profesional.`

Actions:
- Enviar email
- Descargar CV
- GitHub

## 12. Case-study first viewport

All three lead cases should share a C+ case-study entry grammar.

Required visible information:
- back to Selected Work;
- project index;
- title;
- category;
- factual status;
- role;
- concise summary;
- core stack;
- GitHub when available.

For HMS:
- approved evidence may be visible in or immediately after the first viewport;
- do not replace evidence captions/limitations with marketing copy.

The case page remains the depth layer. Do not move all long-form content into Home.

## 13. Responsive contract

Required widths:
- 360
- 390
- 430
- 768
- 1024
- 1440

No horizontal overflow at any required width.

At 768/1024:
- preserve asymmetry;
- do not force desktop project index + preview if it makes either unreadable;
- stack preview below index when necessary.

At mobile:
- no hover dependency;
- touch targets >= 44 × 44 CSS px;
- title line breaks intentionally;
- project links remain visible without JS.

## 14. Accessibility

Required:
- semantic H1 appears once;
- heading order remains valid;
- project index uses semantic links/list structure;
- active preview is supplemental;
- keyboard focus updates active preview where JS is available;
- tap works on touch devices;
- no essential information is conveyed by color or motion alone;
- WCAG 2.2 AA axe suite remains clean;
- visible focus uses accepted focus token;
- reduced-motion behavior is complete;
- no auto-advancing content.

## 15. Performance contract

Accepted #113 baseline:
- Home initial JS: 94,062 B gzip;
- Home budget: 100,000 B gzip;
- Home Lighthouse performance medians: 0.97 EN / 0.98 ES;
- Home LCP medians: 2,222 ms EN / 2,205 ms ES;
- CLS median: 0.

C+ requirements:
- no new animation library;
- no new hydrated React island for Hero;
- hero animation should be CSS-first;
- Selected Work interaction should use the smallest possible progressive-enhancement script;
- Home initial JS must remain <= 100,000 B gzip;
- preferred JS delta: <= +3,000 B gzip;
- Lighthouse configured gates may not be lowered;
- target Home LCP median <= 2,400 ms;
- CLS median = 0 preferred, <= 0.05 hard ceiling;
- animate transforms/opacity/clip where possible, not layout dimensions;
- no blocking video/WebGL/background canvas.

Removing the hero HMS image is expected to reduce visual asset pressure, but no performance improvement may be claimed before measurement.

## 16. Figma artifact state

Page `00 — IA + Content + Research`:
- current IA;
- redundancy map;
- reduced IA;
- recruiter journey;
- design principles.

Page `01 — Visual Directions`:
- A desktop/mobile;
- B desktop/mobile;
- C desktop/mobile;
- comparison;
- implemented baseline reconstruction;
- selected C+ desktop/mobile.

Page `02 — Selected Design + Prototype`:
- pending final materialization because Figma Starter MCP quota was reached.

The static C+ direction and this contract are authoritative for design intent.
Interactive prototype validation remains a final DESIGN gate before BUILD activation.

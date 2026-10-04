# Issue #129 — Hero Signature Motion Contract

Status: DESIGN_FROZEN / BUILD_AUTHORIZED

Canonical implementation issue: https://github.com/sjo1848/portfolio-sebastian-ojeda/issues/129

## Signature sequence

1. Full large identity: `Sebastián Ojeda`.
2. The `S` from Sebastián and `O` from Ojeda detach from the large name.
3. S travels into `Software`; O travels into `Operations`.
4. Hero resolves exactly to:
   `RELIABLE SOFTWARE FOR COMPLEX OPERATIONS`
5. After the thesis is fully resolved, reveal a persistent upper-left one-line signature:
   `Sebastián Ojeda`
6. That one-line signature remains persistent through all subsequent portfolio sections/screens.
7. Only after that may the proof takeover begin.
8. HMS is the first proof chapter.

## Narrative

`IDENTITY → THESIS → DELAYED SIGNATURE → PROOF`

## Non-negotiable visual decisions

- Initial name must be complete. Never render `ebastian jeda` or another malformed transient first state.
- Persistent corner name is one line only.
- No SO monogram, badge, subtitle, role, decorative metadata, or extra mark beside the corner name.
- Initial Hero first viewport contains no explicit evidence/proof panel.
- S/O movement is authored and restrained; slight curves allowed, no playful/spring behavior.
- No nodes, network diagrams, ECG/signal motifs, fake telemetry, HUD, particles, blobs, custom cursor, or scroll-jacking.
- Preserve Stone / Andes Copper and the technical-editorial C+ baseline.
- Preserve current Selected Work information architecture.

## Copy

Role:
`FULL-STACK SOFTWARE DEVELOPER · BACKEND-FOCUSED`

Thesis:
`RELIABLE SOFTWARE FOR COMPLEX OPERATIONS`

Lead:
`I design and build systems where workflows, APIs, data and infrastructure have to work together.`

Metadata:
`Mendoza, Argentina · Remote-first`

CTA:
`View selected work`

## Choreography reference

Relative sequence derived from the approved V13 exploration:

- 0.00–0.15: full name dominates.
- 0.15–0.39: S/O detach and travel.
- 0.23–0.46: thesis forms.
- 0.46–0.555: resolved Hero hold.
- 0.555–0.65: persistent one-line name appears.
- ~0.685 onward: proof takeover begins.
- final phase: HMS artifact and project copy settle.

These values are behavioral reference, not a requirement to reproduce the prototype implementation literally.

## Responsive

Desktop: full signature sequence.

Tablet/mobile:
- preserve semantic sequence;
- no overlaps or clipped critical copy;
- simplify travel geometry/distances where needed;
- persistent one-line name remains legible/stable;
- do not shrink desktop motion into tiny unreadable glyph travel.

## Reduced motion

- no long glyph travel;
- no scroll-linked spatial takeover;
- full name visible;
- thesis resolves immediately/minimally;
- persistent one-line name appears without flourish;
- proof remains coherent and accessible.

## Performance

- Home initial JS historical hard cap: 100,000 B gzip.
- Prefer CSS/SVG/native APIs.
- No new animation dependency by default.
- No canvas/WebGL by default.
- No CLS-driven motion.
- Measure release bundle/performance.

## Worker stop state

Codex stops at:

`IMPLEMENTATION_COMPLETE / AWAITING_CONTROLLER_VISUAL_REVIEW`

No merge or deploy before Controller/Independent review.

# Issue #129 — Site Header Integration Amendment

Status: CONTROLLER_INTEGRATION_AMENDMENT / PRE-BUILD

## Reason

A re-check of the current `main` implementation found that the portfolio already has a sticky `SiteHeader.astro` whose brand is exactly `Sebastián Ojeda`.

Therefore, Issue #129 must **not** create a second independent persistent corner-name overlay. That would duplicate the identity and compete with the existing navigation.

## Correct implementation

The approved delayed persistent signature must be implemented by **reusing / transitioning the existing site-header brand**:

- opening Hero still begins with the large `Sebastián Ojeda`;
- S/O still detach from that large Hero name and travel to `Software` / `Operations`;
- after the thesis resolves, the existing header brand `Sebastián Ojeda` reveals/activates as the persistent one-line signature;
- from that point onward, it remains the normal persistent brand in the sticky header through Selected Work, Operating Mindset, About, Additional Work, Contact, and other routed pages where the shared header is used.

Do not render both:
1. a new fixed/sticky corner signature, and
2. the existing `.brand` inside `.site-header`.

There must be only one persistent `Sebastián Ojeda` identity after the Hero handoff.

## Progressive enhancement

Do not make navigation identity depend on JavaScript.

Recommended behavior:
- default / no-JS: existing header brand remains visible;
- motion-enabled JS path: apply a motion-ready state that may temporarily suppress the header brand during the opening transformation, then reveal it after thesis resolution;
- reduced motion: keep or reveal the normal header brand without long travel/flourish.

Avoid a flash of duplicated names during hydration.

## Existing Home IA to preserve

Current Home order:

`Hero → Selected Work → Operating Mindset → About → Additional Work → Contact`

The new signature motion changes the opening and the Hero→Proof handoff; it does **not** replace or remove the later content.

### Selected Work
Keep the existing editorial index / active evidence structure and the three lead cases. HMS is the first proof chapter.

### Operating Mindset
Keep the dark three-principle technical section. It should act as a strong rhythm change after project proof, not receive another competing signature animation.

### About
Keep the calmer human reset and whitespace.

### Additional Work
Keep the compact six-project index.

### Contact
Keep the high-contrast conversion panel and existing email/CV/GitHub actions.

## Motion continuity below the Hero

The site should feel coherent beyond the signature moment, but do not invent one new animation per section.

Allowed:
- restrained section reveal;
- editorial crop/position transitions;
- evidence-focused interaction already present;
- subtle continuity of timing/easing.

Avoid:
- repeating S/O travel;
- repeated logo tricks;
- abstract tech decoration;
- persistent ambient motion that distracts from content.

## Acceptance amendment

In addition to the original Issue #129 acceptance criteria:

- there is exactly one persistent site identity after Hero resolution;
- it is the existing header brand, not a duplicate overlay;
- no brand/nav collision occurs at desktop/tablet/mobile;
- the persistent brand remains legible across light/dark Home sections;
- existing Home sections and content remain present and readable;
- shared-header behavior on case-study routes is not regressed;
- no-JS/reduced-motion retain usable brand/navigation.

This amendment resolves the integration ambiguity before Worker implementation.

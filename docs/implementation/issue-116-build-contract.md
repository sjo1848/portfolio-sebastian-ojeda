# Issue #116 → BUILD Contract — C+ Portfolio Redesign

**Worker:** Codex only  
**Controller:** ChatGPT  
**Status:** ACTIVE — `DESIGN_PASS_BUILD_AUTHORIZED` posted by Controller.  
**Baseline:** `7ac73cdd81336e7c9021809b2340b4b455268fd6`

## Canonical inputs

Read before any implementation:
1. `docs/discovery/issue-116-definition.md`
2. `docs/discovery/issue-116-ia-visual-direction.md`
3. `docs/design/issue-116-cplus-design-contract.md`
4. `docs/design/issue-116-motion-spec.md`
5. `docs/qa/issue-116-controller-design-review.md`
6. `docs/design/issue-116-immutable-design-reference.md` (canonical worker-accessible visual reference).\n7. MagicPath project `456042490814947328` is supplemental provenance only and is not required to be externally accessible.

Do not substitute personal design preferences for these contracts.

## Hard precondition

Controller state is now:

`DESIGN_PASS_BUILD_AUTHORIZED`

BUILD may begin.

If a later Issue #116 comment supersedes this state or reopens the design gate, stop and report the exact conflict before continuing.

## Scope

Implement C+ on:
- Home EN/ES;
- header/nav affected by reduced IA;
- first viewport / entry grammar of the three lead case studies where required for continuity;
- tests/QA directly affected by removed/merged sections and new interactions.

Do not redesign external products.

## Required product changes

### Home
Replace the current structure:
Hero → Selected Work → Capabilities → Experience → Method → About → Additional Work → Contact

with:
Hero → Selected Work → Operating Mindset → About → Additional Work → Contact.

### Hero
- remove HMS hero image;
- remove hero lead-project status roster;
- keep role immediately visible;
- implement final C+ copy;
- promote Resume/CV to secondary hero CTA;
- keep GitHub low emphasis;
- implement CSS-first kinetic hero.

### Selected Work
- keep exactly three lead cases in approved order;
- move away from generic card-grid-first presentation toward editorial project index;
- implement active evidence preview on desktop as progressive enhancement;
- keep all row information and links usable without JS;
- on mobile do not require desktop side-preview behavior;
- preserve evidence provenance and limitations.

### Operating Mindset
Create the single three-part section defined in Design Contract.
Remove separate Home Capabilities, Experience and Method sections.

Do not delete the underlying Project Method documentation from the repository.

### About
Replace current four-paragraph Home story with approved concise bilingual copy.

### Additional Work
Keep six cases but reduce visual weight to compact index/archive presentation.

### Contact
Use approved conversion copy/actions.

### Case-study entry
Bring the first viewport of:
- HMS Cloudflare;
- Alquileres Uspallata;
- AI Commerce + HMS

into the C+ grammar without rewriting long-form technical content.

## Architecture constraints

- Astro-first.
- No new animation dependency.
- No new Hero React island.
- No WebGL/canvas.
- Preserve Base UI Dialog/Sheet/Drawer ownership.
- Preserve same-origin evidence assets.
- Preserve current content collections and routing.
- Preserve CV generation pipeline.
- Prefer CSS + minimal vanilla progressive enhancement for project-preview state.
- Native View Transitions API may be used only as progressive enhancement with no polyfill.

## Motion implementation

Implement only M1–M5 from `issue-116-motion-spec.md`.

No additional animation concept may be introduced without Controller review.

## Accessibility invariants

- one semantic H1;
- valid heading order;
- normal anchors for project navigation;
- 44 × 44 minimum interactive targets;
- keyboard active-preview parity;
- no hover-only facts;
- no motion-only meaning;
- full reduced-motion path;
- no-JS Home remains navigable and informative;
- axe WCAG 2.2 AA clean at required routes/viewports.

## Performance gates

Baseline from #113:
- Home JS gzip 94,062 B;
- Home hard budget 100,000 B;
- Home LCP ~2.2 s;
- CLS 0.

BUILD gates:
- Home initial JS <= 100,000 B gzip;
- preferred delta <= +3,000 B gzip;
- no configured Lighthouse threshold reduction;
- Performance >= 0.90;
- Accessibility >= 0.95;
- Best Practices >= 0.95;
- SEO >= 0.95;
- target Home LCP median <= 2,400 ms;
- CLS <= 0.05, target 0.

If a design detail cannot meet the JS/performance budget:
- preserve content/hierarchy;
- simplify animation;
- do not raise the budget without HUMAN_GATE.

## Responsive gates

Test:
- 360
- 390
- 430
- 768
- 1024
- 1440

Both EN and ES Home.

No horizontal overflow.
No clipped kinetic title.
No desktop-only interaction dependency.

## Build increments

### I0 — Baseline and contract lock
Before edits:
- record current commit;
- run release QA;
- capture current Home EN/ES at required widths;
- record JS/Lighthouse baseline;
- verify canonical design contracts and `docs/design/issue-116-immutable-design-reference.md`; external MagicPath access is not a precondition.

No design changes.

### I1 — IA + content migration
- restructure Home sections;
- update nav anchors;
- implement final bilingual copy;
- remove hero proof roster/media;
- create Operating Mindset;
- compact About/Additional Work.

Gate:
- content truth;
- ES/EN parity;
- no broken anchors;
- no-JS pass.

### I2 — C+ visual foundation
- grid/rule system;
- typography scale;
- section rhythm;
- reduce generic rounded-card language;
- no signature motion yet.

Gate:
- screenshots 390/1440;
- overflow;
- contrast;
- Controller visual review.

### I3 — Hero kinetic system
- M1 only;
- reduced motion;
- no new client island.

Gate:
- LCP/CLS;
- 360–1440 clipping;
- reduced motion;
- no-JS.

### I4 — Selected Work editorial index
- static index hierarchy;
- approved project copy;
- evidence pane markup;
- mobile static model.

Gate:
- evidence truth/provenance;
- lead order;
- normal anchor navigation;
- keyboard structure.

### I5 — Selected Work progressive interaction
- M2–M4 as required;
- minimal vanilla enhancement;
- focus/touch behavior;
- active evidence swap.

Gate:
- JS budget;
- keyboard/touch;
- reduced motion;
- no layout shift;
- no console errors.

### I6 — Lead case-study entry continuity
- C+ first viewport grammar;
- optional M5 View Transitions progressive enhancement;
- do not rewrite long-form evidence.

Gate:
- all three cases EN/ES;
- back/forward;
- unsupported-browser fallback;
- media viewer unaffected.

### I7 — Supporting/contact/final responsive pass
- Operating Mindset;
- About;
- Additional Work;
- Contact;
- 360/390/430/768/1024/1440.

### I8 — VALIDATE candidate
Run complete:
- `npm run qa:release`;
- full Playwright matrix;
- dedicated Issue #116 tests;
- axe;
- no-JS;
- keyboard;
- reduced motion;
- JS budget;
- Lighthouse route matrix;
- screenshot matrix;
- console/pageerror;
- SEO/canonical/sitemap;
- evidence/provenance checks.

Required verdicts:
- Independent Critic;
- Integration Review.

Result:
- PASS;
- bounded REWORK;
- HUMAN_GATE only for material scope/design/risk change.

### I9 — Release
Only after Controller reviews evidence.
No automatic production release unless the existing project release contract authorizes it.

## Test migration requirements

Existing tests that assert the removed:
- `#capabilities`;
- `#experience`;
- `#process details`;
- five capability proof groups;
- eight-phase Home disclosure

must be intentionally replaced, not silently deleted.

New tests must assert:
- final section order;
- lead case order;
- hero has no HMS evidence;
- hero has no lead-project roster;
- CV CTA exists;
- Operating Mindset has exactly three items;
- Selected Work remains complete without JS;
- active preview works with keyboard when JS enabled;
- reduced motion neutralizes signature motion;
- all final nav anchors resolve.

## Evidence required in PR

Do not report only “tests pass”.

Attach/record:
- exact commit SHA;
- changed-file list;
- command results;
- JS gzip table;
- Lighthouse medians;
- browser matrix counts;
- screenshot manifest;
- reduced-motion evidence;
- no-JS evidence;
- axe results;
- known limitations;
- critic verdict;
- integration verdict.

## Rollback

The accepted baseline is preserved by:
`backup/pre-penpot-redesign-2026-09-30`

No schema/data migration is expected.
Rollback should therefore be frontend/content revert + redeploy.

## Stop conditions

Stop and return to Controller if implementation requires:
- new animation dependency;
- new paid service;
- changing project status/claim;
- new externally hosted evidence;
- analytics/tracking;
- changing the three lead projects/order;
- exceeding JS budget;
- weakening accessibility;
- changing public professional positioning.

Otherwise technical failures are bounded REWORK, not Human Gates.

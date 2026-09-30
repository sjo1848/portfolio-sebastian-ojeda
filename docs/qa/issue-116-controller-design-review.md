# Issue #116 — Controller Adversarial Design Review

**Artifact:** C+ Definition + Design Contract + Motion Specification  
**Role:** Controller adversarial review  
**Note:** this is deliberately not labeled Independent Critic because the current environment does not provide a separate independent reviewer.

## Verdict

**PASS WITH ONE EXTERNAL DESIGN-GATE CONDITION**

The selected direction is coherent enough to issue a BUILD contract, but BUILD activation remains conditional on final Figma visual/prototype QA because the Starter MCP quota blocked that final pass.

## Adversarial checks

### 1. Does C+ weaken recruiter clarity?
PASS.

The role remains explicit in eyebrow/H1, and the core value proposition is shorter than the current hero.

### 2. Does removing HMS from the hero remove too much proof?
PASS.

Selected Work immediately follows the hero and is explicitly designed as the first evidence layer. This restores progressive discovery rather than removing proof.

### 3. Does the site risk looking like a creative-developer portfolio?
CONDITION CONTROLLED.

Large kinetic type and visible grid can push in that direction. The contract limits:
- experimental navigation;
- WebGL;
- cursor effects;
- long cinematic intros;
- excessive brutalism.

The technical grid must remain subordinate to content.

### 4. Does C+ repeat the previous branding work instead of adding value?
PASS.

It preserves Stone/Copper and editorial DNA from #113 but materially changes:
- hero content density;
- project discovery;
- section count;
- card dependency;
- motion identity.

### 5. Does the new IA remove useful evidence?
PASS WITH MIGRATION REQUIREMENT.

Capabilities/Experience/Method content is not deleted blindly. Unique signal is merged into Operating Mindset; detailed evidence remains in case studies/repository documentation.

### 6. Is About still redundant?
PASS after proposed rewrite.

The new copy is substantially shorter and moves technical claims out of the human section.

### 7. Is Selected Work too dependent on interaction?
PASS if implementation follows contract.

Every row must contain useful static text and a normal case-study anchor. Active evidence is supplemental.

### 8. Is motion likely to harm performance?
PASS with hard budget.

No new library or hero island is allowed. Current Home has only 5,938 B gzip headroom under the established 100,000 B budget, so implementation must remain extremely small.

### 9. Is motion accessible?
PASS in design.

All signature motion has a static reduced-motion state. Existing global reduced-motion rules already provide a strong baseline.

### 10. Is mobile a first-class design?
PASS in contract.

The mobile layout does not require the desktop side-preview model and removes hover dependency.

### 11. Is the CV path sufficiently prominent?
PASS.

Resume/CV is promoted into the hero as a secondary CTA and remains in navigation/contact.

### 12. Are project claims still honest?
PASS.

The design contract explicitly keeps project statuses/limits sourced from existing content and forbids release/acceptance inflation.

## Main residual risks

1. **Typography over-scaling.**
   The H1 can become an aesthetic object at the expense of legibility on 360–430 px widths.

2. **Grid decoration.**
   Visible grid lines can become noise. They must earn their presence.

3. **Selected Work complexity.**
   A dual-pane preview can create unnecessary JS/state. It must remain progressive enhancement.

4. **Home budget.**
   Current JS headroom is small. A React animation implementation would be disproportionate.

5. **Case-study discontinuity.**
   A highly stylized Home paired with unchanged case-study entries could feel like two products. The first viewport grammar must be carried into lead case pages.

## Required pre-BUILD evidence

Before Controller posts DESIGN PASS:
- visual screenshot of C+ desktop;
- visual screenshot of C+ mobile;
- check for clipping/overflow;
- selected-work active state represented;
- at least one motion storyboard/prototype state;
- case-study first viewport represented;
- evidence that the design remains legible without motion.

The Figma MCP Starter quota prevented completing these checks automatically in the current session.

## Integration Review

### With current architecture
PASS.

C+ can be implemented within Astro-first architecture:
- Hero stays static HTML/CSS;
- existing mobile Sheet can remain;
- project routes/content collections remain;
- evidence assets remain same-origin;
- existing media viewer remains;
- existing CV generation remains.

### With QA
PASS.

Existing Playwright, axe, no-JS, reduced-motion, visual matrix and Lighthouse system can be extended rather than replaced.

### With evidence strategy
PASS.

C+ explicitly moves evidence later but does not weaken provenance or limits.

### With performance
PASS WITH BUDGET.

No threshold reduction is allowed.

## Gate

Current state:

`DESIGN_CONTRACT_COMPLETE / FIGMA_FINAL_QA_PENDING / BUILD_BLOCKED`

The contract is implementation-ready, but Codex must not write production code until the Controller posts:

`DESIGN_PASS_BUILD_AUTHORIZED`

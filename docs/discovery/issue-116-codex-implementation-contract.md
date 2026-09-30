# Issue #116 — Codex Implementation Contract — DRAFT / NOT YET AUTHORIZED

**Worker:** Codex only  
**Controller:** ChatGPT  
**Status:** READY EXCEPT FOR FIGMA VISUAL QA  
**Do not start BUILD while status is `BUILD_BLOCKED_FIGMA_VISUAL_QA`.**

## 1. Objective

Implement the approved C+ — Kinetic Technical Editorial redesign of the portfolio without inventing product/design decisions.

## 2. Source of truth priority

1. approved Figma selected-design/prototype frames;
2. `docs/discovery/issue-116-final-design-spec.md`;
3. `docs/discovery/issue-116-motion-spec.md`;
4. `docs/discovery/issue-116-content-conversion-spec.md`;
5. current truthful project/content sources on `main`;
6. current accessibility/performance gates.

If sources conflict, stop and report `DESIGN_CONTRACT_CONFLICT`.

## 3. Scope

Home:
- header/nav;
- C+ hero;
- Selected Work indexed system;
- Operating Mindset;
- reduced About;
- compact Additional Work;
- Contact.

Case studies:
- first-viewport visual alignment with C+;
- optional progressive View Transition if it costs no dependency and has a normal-navigation fallback.

Motion:
- M1–M4 required as approved in Figma;
- M5 optional;
- reduced-motion equivalents required.

## 4. Explicit removals

From Home:
- HMS hero image;
- hero project roster/status links;
- standalone Capabilities section;
- standalone Experience section;
- Home eight-phase Method disclosure.

Do not delete case-study evidence or project source data merely because Home no longer displays it.

## 5. Non-goals

- no external-project edits;
- no project-status changes;
- no new production claims;
- no WebGL;
- no custom smooth scrolling;
- no scroll-jacking;
- no animation framework dependency;
- no analytics initiative;
- no SEO route restructure;
- no design improvisation outside approved Figma/spec.

## 6. Dependency rule

Default: **zero new runtime dependencies**.

If implementation seems to require one, stop with:
`DEPENDENCY_HUMAN_GATE_REQUIRED`

Do not install it.

## 7. Architecture rule

Preserve Astro-first/selective hydration.

Core Home content must be available:
- in static HTML;
- without JS;
- under reduced motion.

Motion-specific initial JS target: ≤3,000 B gzip.
Total Home initial JS: ≤100,000 B gzip.

## 8. Responsive contract

Required widths:
360, 390, 430, 768, 1024, 1440.

No horizontal overflow.
No title clipping.
No hover-only information.
Touch and keyboard must expose equivalent project information.

## 9. Accessibility

- 44×44 minimum interactive target;
- visible focus;
- correct heading hierarchy;
- semantic links/buttons;
- `prefers-reduced-motion`;
- no flashing;
- project active state not color-only;
- axe WCAG 2.2 AA at 390 and 1440 for both locales.

## 10. Performance / release gates

Do not lower existing thresholds:
- Lighthouse Performance ≥0.90;
- Accessibility ≥0.95;
- Best Practices ≥0.95;
- SEO ≥0.95;
- Home JS ≤100,000 B gzip;
- case JS ≤150,000 B gzip.

Record LCP/CLS before/after.
Field CWV remains `NOT_YET_OBSERVABLE` unless real field data exists.

## 11. Content contract

Use approved ES/EN copy.
Do not strengthen statuses or proof semantics.

Lead order:
1. HMS Cloudflare
2. Alquileres Uspallata
3. AI Commerce + HMS

## 12. Implementation increments

### I0 — Recovery and baseline
- verify branch/worktree clean;
- record baseline SHA;
- baseline screenshots and bundle/Lighthouse measurements.

### I1 — Structure / IA
- implement reduced Home structure without motion;
- preserve routes and content truth.

### I2 — C+ visual foundation
- grid, type scale, spacing, rules, Stone/Copper surfaces;
- desktop/mobile static composition.

### I3 — Hero
- final approved hero structure and CTA hierarchy;
- no HMS/project roster.

### I4 — Selected Work
- indexed project system;
- approved evidence preview;
- keyboard/touch parity.

### I5 — Supporting sections
- Operating Mindset;
- About;
- Additional Work;
- Contact.

### I6 — Motion
- implement approved M1–M4;
- reduced-motion;
- no new dependency.

### I7 — Case-study first viewport
- align project pages with selected editorial system;
- preserve long-form content/evidence.

### I8 — Hardening
- browser matrix;
- axe;
- keyboard/touch;
- reduced motion;
- no-JS;
- overflow;
- console/hydration;
- JS accounting;
- Lighthouse;
- screenshot evidence.

### I9 — Critic / Integration / Release
- Independent Critic;
- Integration Review;
- Controller review;
- production smoke only after approval.

## 13. Stop conditions

Stop immediately and report rather than improvising if:
- Figma/spec conflict;
- unsupported content claim is required;
- JS budget cannot be met;
- dependency appears necessary;
- motion breaks reduced-motion/no-JS;
- mobile composition cannot match approved design without material change;
- a project evidence asset has uncertain provenance.

## 14. Required handoff

Return:
- branch;
- commit SHAs per increment;
- changed files;
- screenshots/evidence paths;
- browser/Lighthouse results;
- JS deltas;
- known deviations;
- exact open gates.

Do not merge, deploy or alter `main` without Controller authorization.

# Frontend Excellence — Baseline before React

## State

Phase: BUILD — Incremento 0  
Reference commit before React foundation: `90753b36521dc3e37e57adab2fd5109eb911f056`  
Source PR: #80  
Issue: #78

This baseline is taken after the P0 presentation-validator repair and before any React/shadcn dependency is introduced.

## Release health

The reference state passed:

- Release readiness;
- Portfolio CI;
- Secret scanning;
- Visual review.

## Lighthouse baseline

Three Lighthouse runs per route were captured by Portfolio CI.

### Home EN — `/`

Median:
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- LCP: ~985 ms
- CLS: 0
- TBT: 0 ms
- FCP: ~910 ms
- transfer weight: ~354 KB

### Home ES — `/es/`

Median:
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- LCP: ~982 ms
- CLS: 0
- TBT: 0 ms
- FCP: ~907 ms
- transfer weight: ~354 KB

### HMS Elite EN — `/projects/hms-elite/`

Median:
- Performance: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- LCP: ~2105 ms
- CLS: 0
- TBT: 0 ms
- FCP: ~755 ms
- transfer weight: ~746 KB

Field CWV is not claimed from these laboratory runs.

## Client JavaScript baseline

Validated `dist/` contains:

- external JS assets: **0 bytes**
- home EN inline client JS: **0 bytes**
- home ES inline client JS: **0 bytes**
- case-study inline interaction JS: approximately **1.26 KB** per page where `ProjectPage.astro` emits gallery/hash behavior.

This is the comparison point for every React-island increment.

## CSS baseline

Generated CSS assets:
- main stylesheet: ~38.6 KB
- secondary stylesheet: ~4.3 KB

These are raw emitted sizes from the validated static artifact, not gzip measurements.

## Responsive visual baseline

Visual Review PASS exists for:
- 360 px;
- 768 px;
- 1440 px.

Artifact evidence from PR #80:
- responsive visual artifact;
- validated static `dist`;
- Lighthouse reports.

The Excellence contract will extend executable coverage to:
- 390 px;
- 430 px;
- 1024 px;
- opened interactive states.

## ProjectCard mobile defect reproduced

At 360 px the case-study CTA is present in the source component but is not visible in the rendered card evidence.

Relevant current structure:

- `.project-card { overflow: hidden; }`
- `.project-body { display:flex; min-height:100%; flex-direction:column; }`
- `.project-case-link { margin-top:auto; }`

The rendered card ends after role/stack while the CTA is absent from the visible card. The leading implementation hypothesis is that the body minimum height plus card clipping pushes the auto-margin CTA outside the visible card.

This is a P0 UX defect but is intentionally **not repaired in Incremento 0**. Root-cause validation and repair belong to Incremento 1.

## Current mobile header baseline

At 360 px the header displays six navigation links in a 3×2 grid beneath the brand/language control. This matches current code but conflicts with the approved mobile interaction direction.

Replacement with a Sheet belongs to Incremento 1.

## Existing case-study interaction baseline

Current `ProjectPage.astro` owns imperative JavaScript for:

- gallery hash stabilization;
- GIF Play/Stop;
- deferred GIF image creation.

The single-owner rule requires these behaviors to be retired atomically when their React replacements take ownership.

## Baseline conclusion

**PASS FOR FOUNDATION**

The product is healthy after P0 and the baseline is measurable.

Incremento 0 may add React + shadcn foundations only if:

- no substantive UX redesign is mixed into the foundation;
- release QA remains green;
- Lighthouse hard gates remain green;
- every added client byte is measured;
- no hydration mismatch or console error is introduced.

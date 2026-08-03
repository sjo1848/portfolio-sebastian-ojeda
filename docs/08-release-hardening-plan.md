# Release Hardening Plan

## Status

In progress.

## Purpose

Convert the executable Astro scaffold into a reproducible, reviewable and release-oriented portfolio baseline before any public deployment.

The scaffold already passes content/type validation, production build and secret scanning. The remaining risk is not basic functionality; it is whether the same result can be reproduced, audited and published without placeholders or incomplete metadata.

## Why this stage comes before hosted preview

Publishing a preview before dependency, content and metadata controls are stable would create a second environment to debug without increasing confidence in the product. A hosted preview becomes useful only after the generated artifact is deterministic and passes structural validation.

## Gate 1 — Reproducible dependencies

### Goal

Ensure a clean checkout installs the exact reviewed dependency tree.

### Work

- Generate and commit `package-lock.json` from the current `package.json`.
- Switch CI from `npm install` to `npm ci`.
- Enable npm caching in `actions/setup-node`.
- Pin the supported Node major version through `.nvmrc` and `package.json#engines`.

### Acceptance criteria

- `npm ci` succeeds from a clean checkout.
- `package-lock.json` matches `package.json`.
- No lockfile is copied, truncated or manually fabricated.

## Gate 2 — Content integrity

### Goal

Prevent unfinished copy, placeholder domains and broken internal references from reaching a release artifact.

### Work

- Scan source-controlled public content for forbidden placeholders.
- Validate required project frontmatter and featured-project count through Astro.
- Check that internal project links resolve to generated routes.
- Keep unconfirmed personal contact data disabled rather than inventing values.

### Acceptance criteria

- No forbidden placeholder is present in public source content.
- Exactly three featured project routes are generated.
- Missing email, LinkedIn and CV values do not render broken controls.

## Gate 3 — SEO and static artifact integrity

### Goal

Make metadata and generated output executable requirements rather than documentation claims.

### Work

- Add Open Graph and social-card metadata.
- Add `robots.txt`, web manifest and a default social image.
- Validate canonical URLs, titles, descriptions and generated project pages.
- Validate sitemap and critical static files after build.

### Acceptance criteria

- Every generated HTML page has a title, description and canonical link.
- Home and project pages contain Open Graph metadata.
- `sitemap-index.xml` or `sitemap-0.xml`, `robots.txt`, favicon and social image are generated/copied.
- Generated output contains no placeholder production domain.

## Gate 4 — CI evidence and preview artifact

### Goal

Provide reviewable evidence without prematurely publishing the portfolio.

### Work

- Run dependency, content, type, build, output and secret gates in CI.
- Upload the generated `dist` directory as a workflow artifact.
- Generate the npm lockfile through a controlled CI job if the connected environment cannot produce it directly.

### Acceptance criteria

- All required CI jobs pass.
- The static build artifact is downloadable from the workflow run.
- Failures identify whether the problem is dependencies, content, code, build output or secrets.

## Explicitly outside this stage

- Public domain selection.
- Cloudflare Pages or another hosted preview.
- Public email, LinkedIn or CV publication.
- Project screenshots and video walkthroughs.
- Analytics.
- Production launch.

These depend on either personal decisions or external deployment configuration and should not block the technical hardening baseline.

## Exit decision

This stage is complete when the repository can produce the same validated static artifact from a clean checkout using `npm ci`, with no public placeholders and with CI evidence attached to the pull request.

# Release readiness evidence

## Scope

This report defines the evidence required before connecting the portfolio to a hosted preview environment.

## Source contract

- Featured-project inventory is exactly HMS Elite, GasFlow and A-M-R Refrigeración.
- Public source content contains no editorial replacement markers.
- External links use valid secure URLs, except documented localhost development references.
- SVG namespace declarations are not interpreted as navigational links.

## Build contract

- Home, three project pages, 404, favicon, robots and sitemap are generated.
- Main HTML pages contain one `h1`, a title and a useful description.
- Indexable pages contain an absolute canonical URL for the build environment.
- Internal routes, files and anchors resolve inside `dist`.
- The 404 page is excluded from indexing.

## Required pipeline

```text
npm ci --no-audit --no-fund
node scripts/validate-content.mjs
npm run check
npm run build
node scripts/validate-build.mjs
```

## Review artifact

The release-readiness workflow uploads the validated `dist/` directory. This artifact is the reviewable static build; it is not a public deployment.

## Acceptance rule

The QA PR may leave draft state only after all gates pass on its final head commit and the workflow run contains the static-site artifact.

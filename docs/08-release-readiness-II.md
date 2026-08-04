# Release Readiness II — SEO and social metadata

## Objective

Prepare the static portfolio for indexing, link sharing and a hosted preview without publishing unverified personal data or referencing assets that do not exist.

## Included in this phase

- Centralized page metadata through `SeoHead.astro`.
- Environment-specific canonical URLs.
- Open Graph metadata for home and project pages.
- Twitter card metadata without an unverified image.
- Schema.org `Person` and `WebSite` graph on public pages.
- `SoftwareSourceCode` structured data for each project case study.
- Site manifest and theme metadata.
- Build-time validation for metadata, structured data and manifest output.

## Deliberate exclusions

### Social sharing image

A final 1200 × 630 image is not referenced until its visual design, text and generated artifact are approved. A missing or temporary image is worse than a text-only social card because crawlers cache broken metadata.

### Hosted preview

The validated `dist` artifact remains the source of truth until a preview provider is selected and connected. Deployment credentials and platform settings do not belong in this repository.

### Public profile fields

Email, LinkedIn, work modality, CV and portrait remain absent until explicitly confirmed.

## Exit criteria

- `npm ci` succeeds.
- Astro content and type checks succeed.
- Static build succeeds.
- Home and project pages contain canonical, Open Graph and Twitter metadata.
- JSON-LD parses as valid JSON and uses the Schema.org context.
- `site.webmanifest` is present and valid.
- Release Readiness and secret scanning remain green.

## Next gates

1. Approve and add the final social image.
2. Connect a pull-request preview provider.
3. Run Lighthouse against a served representative URL.
4. Perform mobile and desktop visual review.
5. Add confirmed public profile data and CV.

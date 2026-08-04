# Hosted preview audit

## Scope

Audit performed against the current production build structure and the published Cloudflare Pages configuration.

Viewports reviewed:

- 360 px
- 768 px
- 1024 px
- 1440 px

Routes reviewed:

- `/`
- `/projects/hms-elite/`
- `/projects/gasflow/`
- `/projects/amr-refrigeracion/`
- `404.html`
- `/cv-sebastian-ojeda.pdf`

## Results

- No horizontal overflow at the reviewed widths.
- One `h1` per page and no heading-level jumps.
- No duplicated element IDs.
- No empty interactive links.
- Images currently present do not omit `alt` attributes.
- Main pages expose a skip link and a visible keyboard-focus outline.
- Automated contrast sampling did not detect text below the applicable WCAG contrast threshold.
- The downloadable CV exists in the generated artifact.

## Improvements identified

- Increase navigation, brand, text-link and footer-link hit areas.
- Align the 404 document language with the rest of the site (`es-AR`).
- Add the standard skip link and `main-content` target to the 404 page.

## Remaining hosted checks

The final production URL must still be checked directly after DNS propagation:

- HTTP status codes and redirects.
- Production canonical URLs.
- `robots.txt` and generated sitemap URLs.
- PDF response headers and download behavior.
- Lighthouse budgets against the served Cloudflare Pages deployment.
- Basic screen-reader smoke test.

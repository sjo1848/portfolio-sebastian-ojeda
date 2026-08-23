# Portfolio — Sebastián Ojeda

Professional portfolio focused on backend, backend-oriented full-stack development, and operational or management software.

## Status

**Current stage:** deployed release candidate under final production validation.

The site includes the visual implementation, professional content, case studies, downloadable resumes, bilingual SEO, accessibility controls, automated QA, and Cloudflare Pages deployment.

- Production: `https://portfolio-sebastian-ojeda.pages.dev`
- Production branch: `main`
- Hosting: Cloudflare Pages
- Primary language: English at `/`
- Spanish version: `/es/`
- Legacy `/en/*` routes: permanent redirects to the equivalent canonical English routes
- MVP visual identity: no portrait

## Positioning

**Backend-Focused Full-Stack Developer**

I build management systems and operational applications with Rust, TypeScript, React, React Native, and PostgreSQL. My approach combines domain modeling, architecture, UX, QA, security, and deployment.

The portfolio presents this practice as a **software production laboratory**. Its public method, documented in [`docs/12-project-method.md`](docs/12-project-method.md), is **Project Method: a verifiable software construction method**. It starts with the problem and evidence, works in phases with explicit exit criteria, and uses automation or multi-agent execution only when it adds value.

## Featured projects

1. **HMS Elite** — multi-hotel SaaS platform built with Rust, Axum, React, and PostgreSQL.
2. **GasFlow** — mobile system for orders, deliveries, and stock using React Native and a Rust backend.
3. **JM Soluciones Eléctricas** — mobile-first commercial site built with Astro, TypeScript, local SEO, and a reproducible delivery process.
4. **Taco Loco Foodtrack** — mobile-first digital menu and order-intent system connected to WhatsApp.
5. **Alquileres Uspallata** — full-stack rental catalog with review, publication, availability, contact, and audit workflows.

## Portfolio stack

- Astro 5.
- TypeScript.
- Tailwind CSS 4.
- Static generation without mandatory client-side JavaScript.
- Cloudflare Pages.
- GitHub Actions.

## Quality and publishing

The repository includes reproducible controls for:

- bilingual content and route validation;
- deterministic PDF resume and social-card generation;
- SEO, Open Graph, X, JSON-LD, canonical, and `hreflang` metadata;
- sitemap and robots validation;
- Cloudflare Pages redirect contracts;
- accessibility and responsive behavior;
- Lighthouse CI;
- Gitleaks secret scanning;
- full release validation through `npm run qa:release`.

## Workflow

```text
Work branch
→ GitHub Actions
→ review and QA
→ intentional merge to main
→ Cloudflare Pages production deployment
```

- `main` contains approved stages only.
- Every change is developed on an independent branch.
- Every change enters through a pull request.
- Branch previews remain disabled to preserve the free build quota.
- QA, UX, and systems thinking are included from the beginning.
- Public claims require verifiable evidence.

## Main commands

```bash
npm ci
npm run dev
npm run check
npm run build
npm run qa:release
```

## Documentation

- [Product brief](docs/00-product-brief.md)
- [Professional positioning](docs/01-professional-positioning.md)
- [Information architecture](docs/02-information-architecture.md)
- [Content inventory](docs/03-content-inventory.md)
- [Visual direction](docs/04-visual-direction.md)
- [Technical architecture](docs/05-technical-architecture.md)
- [QA strategy](docs/06-qa-strategy.md)
- [Release plan](docs/07-release-plan.md)
- [Backlog](docs/BACKLOG.md)

## Remaining professional-release work

- Verify the latest Cloudflare Pages deployment over public HTTP.
- Complete keyboard and screen-reader smoke tests against production.
- Add reproducible GasFlow visual evidence.
- Review and publish the LinkedIn profile.
- Introduce a custom domain only when it provides clear professional value.

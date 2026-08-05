# Portfolio — Sebastián Ojeda

Portafolio profesional orientado a oportunidades de backend, full stack con foco en backend y sistemas operativos/de gestión.

## Estado

**Etapa actual:** candidato de lanzamiento desplegado y en validación final.

El sitio ya cuenta con implementación visual, contenido profesional, casos de estudio, CV descargable, SEO, accesibilidad, controles automatizados y despliegue en Cloudflare Pages.

- Producción: `https://portfolio-sebastian-ojeda.pages.dev`
- Rama de producción: `main`
- Hosting: Cloudflare Pages
- Idioma inicial: español
- Identidad visual del MVP: sin retrato

## Posicionamiento

**Backend-Focused Full-Stack Developer**

Desarrollo sistemas de gestión y aplicaciones operativas con Rust, TypeScript, React, React Native y PostgreSQL. Mi enfoque combina modelado de dominio, arquitectura, UX, QA, seguridad y despliegue.

## Proyectos destacados

1. **HMS Elite** — plataforma SaaS multi-hotel con Rust, Axum, React y PostgreSQL.
2. **GasFlow** — sistema móvil para pedidos, entregas y stock con React Native y backend Rust.
3. **JM Soluciones Eléctricas** — sitio comercial mobile-first con Astro, TypeScript, SEO local y un proceso de entrega reproducible.

## Stack del portafolio

- Astro 5.
- TypeScript.
- Tailwind CSS 4.
- Generación estática sin JavaScript obligatorio en el cliente.
- Cloudflare Pages.
- GitHub Actions.

## Calidad y publicación

El repositorio incluye controles reproducibles para:

- validación de contenido y rutas;
- generación del CV PDF y la tarjeta social;
- metadatos SEO, Open Graph, X y JSON-LD;
- sitemap, robots y canonical;
- accesibilidad y comportamiento responsive;
- Lighthouse CI;
- escaneo de secretos con Gitleaks;
- validación integral mediante `npm run qa:release`.

## Flujo de trabajo

```text
Rama de trabajo
→ GitHub Actions
→ revisión y QA
→ merge intencional a main
→ despliegue de producción en Cloudflare Pages
```

- `main` contiene únicamente etapas aprobadas.
- Cada cambio se trabaja en una rama independiente.
- Todo cambio entra mediante pull request.
- Los previews de ramas están desactivados para preservar la cuota gratuita de compilaciones.
- QA, UX y pensamiento sistémico se consideran desde el inicio.
- No se publican afirmaciones sin evidencia verificable.

## Comandos principales

```bash
npm ci
npm run dev
npm run check
npm run build
npm run qa:release
```

## Documentación

- [Product brief](docs/00-product-brief.md)
- [Posicionamiento profesional](docs/01-professional-positioning.md)
- [Arquitectura de información](docs/02-information-architecture.md)
- [Inventario de contenido](docs/03-content-inventory.md)
- [Dirección visual](docs/04-visual-direction.md)
- [Arquitectura técnica](docs/05-technical-architecture.md)
- [Estrategia de QA](docs/06-qa-strategy.md)
- [Plan de lanzamiento](docs/07-release-plan.md)
- [Backlog](docs/BACKLOG.md)

## Pendientes de lanzamiento profesional

- Verificar la última versión desplegada en producción.
- Completar pruebas básicas de teclado y lector de pantalla sobre producción.
- Incorporar capturas verificadas de GasFlow y JM Soluciones.
- Revisar y publicar el perfil de LinkedIn.
- Definir un dominio personalizado únicamente cuando aporte valor profesional.

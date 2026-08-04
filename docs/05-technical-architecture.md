# Arquitectura técnica

## Stack propuesto

- Astro.
- TypeScript.
- CSS estructurado o Tailwind.
- Astro Content Collections o MDX.
- GitHub Actions.
- Cloudflare Pages.

## Justificación

El portafolio es principalmente contenido estático. Requiere:

- Buen SEO.
- Excelente rendimiento.
- Mantenimiento simple.
- Casos de estudio estructurados.
- Integración limitada de componentes interactivos.
- Despliegue económico.

No requiere backend ni base de datos en el MVP.

## Estructura futura

```text
src/
├── components/
├── content/
├── layouts/
├── pages/
├── styles/
└── utils/
```

## Contenido

Usar esquemas tipados para proyectos:

- slug.
- title.
- summary.
- status.
- role.
- stack.
- repository.
- demo.
- cover.
- problem.
- solution.
- architecture.
- qa.
- outcomes.
- nextSteps.

## SEO

- Title y description por página.
- Canonical.
- Open Graph.
- Twitter/X card.
- Sitemap.
- robots.txt.
- JSON-LD de Person y CreativeWork/SoftwareApplication cuando corresponda.
- Imágenes sociales optimizadas.

## Imágenes

- Formatos modernos.
- Dimensiones declaradas.
- Lazy loading fuera del primer viewport.
- Alt text descriptivo.
- Capturas sin datos sensibles.

## Analítica

No incluir inicialmente o usar una solución respetuosa de privacidad.

No cargar scripts de seguimiento antes de definir el objetivo y consentimiento aplicable.

## Contacto

MVP:

- Enlace `mailto:`.
- LinkedIn.
- GitHub.

No construir backend de formulario.

## Despliegue

- Preview por pull request.
- Producción desde `main`.
- Dominio personalizado después de QA.
- Rollback mediante despliegues previos de la plataforma.

## ADR inicial

Crear decisiones separadas para:

1. Astro como framework.
2. Sitio estático sin backend.
3. Content Collections/MDX.
4. Cloudflare Pages.
5. Estrategia de analítica.

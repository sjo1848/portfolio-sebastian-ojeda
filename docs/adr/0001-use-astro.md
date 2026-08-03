# ADR 0001 — Usar Astro

## Estado

Propuesto.

## Contexto

El portafolio es un sitio principalmente estático, con casos de estudio, contenido profesional, imágenes y pocos componentes interactivos.

## Decisión

Usar Astro con TypeScript.

## Consecuencias positivas

- Bajo JavaScript cliente.
- Buen rendimiento.
- Buen SEO.
- Rutas y contenido simples.
- Compatibilidad con componentes cuando sean necesarios.
- Experiencia previa verificable en A-M-R Refrigeración.

## Consecuencias negativas

- Requiere definir una estrategia clara para contenido tipado.
- Algunas integraciones dinámicas necesitarían servicios externos.

## Alternativas descartadas

### React SPA

Mayor complejidad y JavaScript sin beneficio claro.

### Next.js

Capacidad de servidor innecesaria para el MVP.

### Backend propio

Sobreingeniería y mayor superficie de mantenimiento.

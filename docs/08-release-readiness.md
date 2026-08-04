# Release Readiness I

## Estado

En ejecución.

## Objetivo

Convertir el primer scaffold ejecutable en una base reproducible y verificable antes de conectarlo a una plataforma de preview o producción.

## Por qué esta etapa viene ahora

El portafolio ya tiene estrategia, contenido, sistema visual, rutas y un build Astro válido. Sin embargo, un build verde aislado todavía no garantiza que el resultado sea publicable.

Antes de desplegar se deben controlar cuatro riesgos:

1. **Dependencias no reproducibles:** sin lockfile, una instalación futura puede resolver versiones transitivas diferentes.
2. **Contenido incompleto:** placeholders, enlaces locales inválidos o referencias pendientes pueden llegar al sitio.
3. **Salida estática defectuosa:** una ruta puede compilar pero faltar en `dist`, perder metadatos o enlazar a un recurso inexistente.
4. **Preview engañoso:** desplegar sin gates previos crea una URL visible, pero no una versión confiable para revisar o compartir.

## Secuencia

### 1. Reproducibilidad de dependencias

- Generar `package-lock.json` mediante npm.
- Confirmarlo en una rama dedicada.
- Cambiar CI de `npm install` a `npm ci`.
- Habilitar caché basada en el lockfile.

### 2. Contrato de contenido

Validar automáticamente:

- Ausencia de marcadores editoriales no permitidos en contenido público.
- URLs externas válidas y seguras.
- Rutas locales compatibles con el inventario de páginas.
- Existencia de los tres proyectos destacados.
- Ausencia de secretos o datos privados mediante el escaneo existente.

### 3. Contrato del build

Después de `astro build`, comprobar:

- Home, tres casos de estudio, 404, robots y sitemap.
- Un único `h1` por página HTML principal.
- `title`, descripción y lenguaje del documento.
- Canonical absoluto en páginas indexables.
- Resolución de enlaces internos y anchors.
- Ausencia de placeholders en la salida pública.

### 4. Artefacto revisable

Subir `dist/` como artefacto de GitHub Actions para conservar exactamente la salida validada.

Este artefacto no sustituye un preview web, pero permite demostrar que la unidad revisada y la unidad construida son la misma.

### 5. Preview externo

Se abordará después de aprobar los gates anteriores y seleccionar una plataforma con:

- Preview por pull request.
- Producción únicamente desde `main`.
- Variables de entorno sin secretos en el repositorio.
- Rollback sencillo.
- Dominio configurable.

## Alcance de esta etapa

- Lockfile y `npm ci`.
- Validación de contenido y build.
- Página 404.
- `robots.txt` generado con la URL del entorno.
- Artefacto estático revisable.
- Documentación del criterio de publicación.

## Fuera de alcance

- Dominio definitivo.
- Publicación pública.
- Analítica.
- Formulario con backend.
- Traducción al inglés.
- CV definitivo.
- Capturas finales de proyectos.
- Métricas Lighthouse como gate bloqueante antes de contar con preview navegable.

## Criterios de salida

- [ ] `package-lock.json` está versionado.
- [ ] `npm ci` funciona desde checkout limpio.
- [ ] Astro check y build pasan.
- [ ] Gitleaks pasa.
- [ ] El contrato de contenido pasa.
- [ ] El contrato del build pasa.
- [ ] El artefacto `dist` se genera.
- [ ] Las limitaciones de datos públicos y evidencia visual continúan explícitas.

## Justificación del límite

No se incluyen aún Lighthouse ni validación visual automatizada porque necesitan una URL servida y un entorno más representativo que archivos estáticos aislados. Se incorporarán en Release Readiness II junto con el preview por PR.

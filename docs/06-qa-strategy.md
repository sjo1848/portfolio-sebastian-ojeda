# Estrategia de QA

## Objetivo

El portafolio debe ser evidencia de la forma de trabajar, no solo una declaración sobre calidad.

## Gates mínimos

### Código

- Formatting.
- Lint.
- Typecheck.
- Build limpio.

### Contenido

- Links internos.
- Links externos.
- Rutas válidas.
- Campos obligatorios en proyectos.
- Sin placeholders visibles.
- Sin afirmaciones no verificadas.

### UX

- Navegación por teclado.
- Focus visible.
- Jerarquía de headings.
- Contraste.
- Responsive.
- Estados hover/focus.
- CTA claros.

### SEO

- Title único.
- Description.
- Canonical.
- Open Graph.
- Sitemap.
- robots.txt.
- JSON-LD válido.
- Sin páginas huérfanas.

### Rendimiento

Objetivos iniciales:

- Lighthouse Performance >= 90.
- Accessibility >= 95.
- Best Practices >= 95.
- SEO >= 95.
- Sin imágenes innecesariamente pesadas.
- Sin JavaScript cliente que no aporte valor.

### Seguridad y privacidad

- Secret scanning.
- Dependency audit.
- Sin datos personales innecesarios.
- Sin tokens.
- Sin credenciales.
- Links externos seguros.
- Headers adecuados en despliegue.

## Automatización inicial

Workflow de GitHub Actions:

1. Install.
2. Format check.
3. Lint.
4. Typecheck.
5. Build.
6. Link check.
7. HTML/SEO smoke.
8. Secret scanning.

## Validación manual antes del lanzamiento

- Desktop y mobile.
- Chrome y Firefox.
- Navegación con teclado.
- Lectura de pantalla básica.
- Verificación de CV.
- Verificación de contacto.
- Revisión de todas las capturas.
- Revisión de claims técnicos.
- Revisión de privacidad.

## Definition of Done

Una etapa está terminada cuando:

- Cumple criterios funcionales.
- Tiene evidencia de validación.
- No introduce deuda conocida sin documentar.
- Está revisada mediante PR.
- La documentación refleja el estado real.

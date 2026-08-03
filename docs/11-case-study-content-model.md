# Modelo de contenido para casos de estudio

## Objetivo

Mantener los tres proyectos comparables sin reducirlos a una plantilla rígida o una lista de tecnologías.

## Orden estándar

1. Hero y resumen.
2. Problema.
3. Usuarios y contexto.
4. Solución.
5. Flujo principal.
6. Arquitectura.
7. Decisiones y trade-offs.
8. UX.
9. QA, seguridad y operación.
10. Estado real.
11. Aprendizajes.
12. Próximos pasos.
13. Evidencia y enlaces.

## Frontmatter mínimo

```yaml
title: Nombre
slug: nombre
order: 1
featured: true
category: Tipo de solución
summary: Resumen corto
status: active-development
statusLabel: Desarrollo activo
year: 2026
role: Análisis, arquitectura y desarrollo
repository: https://github.com/...
demo: null
stack:
  - Tecnología
evidenceNeeded:
  - Captura
```

## Estados permitidos

- `active-development` — flujos importantes implementados, producto todavía en evolución.
- `functional-mvp` — MVP utilizable para su alcance, faltan validaciones o entrega pública.
- `functional-marketing-site` — sitio funcional, falta evidencia de producción o métricas.
- `remediation` — implementación existente bajo saneamiento de calidad.
- `concept` — análisis o diseño sin evidencia ejecutable suficiente; no usar en destacados.

## Reglas de redacción

- Explicar primero el problema y después el stack.
- No usar métricas sin fuente verificable.
- Separar repositorio funcional de adopción productiva.
- Nombrar limitaciones materiales.
- Describir decisiones junto con su costo.
- Diferenciar seguridad implementada de certificación.
- No presentar CI verde como validación de mercado.
- No atribuir trabajo de terceros.

## Evidencia visual mínima por proyecto

### HMS Elite

- Vista general o dashboard.
- Flujo de reserva o recepción.
- Housekeeping o facturación.
- Arquitectura.

### GasFlow

- Vista administrativa.
- Vista del repartidor.
- Registro de entrega.
- Arquitectura o ciclo operativo.

### A-M-R Refrigeración

- Inicio desktop.
- Inicio o servicio mobile.
- CTA de WhatsApp.
- Flujo de build/staging opcional.

## Reglas de UI

- La información esencial no depende de acordeones.
- Las tablas deben tener alternativa apilada en móvil.
- Los diagramas requieren explicación textual.
- Los botones de demo solo se muestran si la URL está verificada.
- Las capturas deben indicar si corresponden a desarrollo, staging o producción.

## Definition of Done editorial

- El caso se entiende sin visitar GitHub.
- Las afirmaciones coinciden con README, estado y código.
- Implementado, parcial y pendiente están separados.
- Se identifica al menos un trade-off.
- Los próximos pasos no ocultan deuda relevante.
- Los placeholders visuales no llegan a producción.

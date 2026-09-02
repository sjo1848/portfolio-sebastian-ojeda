---
title: HMS Cloudflare
slug: hms-cloudflare
order: 2
featured: true
category: Evolución brownfield de un SaaS operacional
summary: De Rust/PostgreSQL a Workers/D1 mediante análisis de contrato, migración parity-first, seguridad multi-tenant, browser validation y recovery verificable.
status: active-development
statusLabel: Migración validada técnicamente; aceptación separada
year: 2026
role: Arquitectura de migración, implementación full stack, seguridad y QA operacional
repository: https://github.com/sjo1848/hms-cloudflare
demo: null
stack:
  - Rust / Axum
  - PostgreSQL
  - Cloudflare Workers
  - Hono
  - React
  - D1 / SQLite
  - Cloudflare Access
  - GitHub Actions
evidenceNeeded:
  - Capturas remotas del recorrido de recepción
  - Evidencia visual mobile del candidato aceptado
  - Evidencia remota de Product Acceptance
---

## La historia no empieza en Cloudflare

HMS Cloudflare es más potente cuando se entiende como evolución de un sistema operacional existente, no como otro proyecto serverless aislado.

La secuencia técnica es:

`HMS Elite / Rust + Axum + PostgreSQL → inventario del contrato → migración parity-first → Workers + Hono + D1 → validación de producto y recovery → integración agentic gobernada como siguiente capa`

El repositorio fuente `hotel-management-system` modeló primero reservas, recepción, habitaciones, huéspedes, housekeeping, facturación, permisos y operación multi-hotel. La migración no podía tratar ese comportamiento como descartable.

## Migrar arquitectura sin cambiar silenciosamente el producto

El objetivo de HMS Cloudflare es reemplazar infraestructura y topología de datos preservando el contrato observable del producto.

Eso obliga a responder preguntas más difíciles que “¿compila?”:

- ¿se conservan las transiciones de estado que recepción ya necesita?;
- ¿los permisos mantienen la misma semántica?;
- ¿cómo se aísla cada hotel sin PostgreSQL RLS?;
- ¿qué operaciones necesitan atomicidad dentro de una sola base?;
- ¿qué evidencia prueba un recorrido real de navegador?;
- ¿un backup realmente vuelve a un estado reconciliado cuando se restaura?

## De PostgreSQL a una topología D1 explícita

La arquitectura activa usa:

- un `CONTROL_DB` para identidades, hoteles, memberships, roles y routing;
- un D1 operacional separado por hotel para reservas, habitaciones, huéspedes, billing, housekeeping y auditoría.

La separación física no reemplaza autorización. Cada request debe validar identidad, membership, rol y contexto antes de resolver la base operacional correcta.

Tampoco se simula una transacción distribuida inexistente: las operaciones críticas se mantienen dentro de un D1 de hotel cuando la atomicidad importa.

## Seguridad en capas

1. Cloudflare Access autentica a la persona en el edge.
2. La API valida esa identidad.
3. HMS la relaciona con memberships y roles.
4. Se autoriza el hotel o contexto de red solicitado.
5. Recién entonces se resuelve el D1 correspondiente.

Autenticación de infraestructura y autoridad de negocio son fronteras distintas.

## Parity-first y evidencia

La migración se dividió en incrementos verificables: foundation, inventario del contrato, rooms/guests/bookings, recepción, housekeeping, mantenimiento, billing, seguridad, administración, reporting y readiness operacional.

La validación combina typecheck, tests unitarios e integración, regresiones específicas, browser journeys, checks RBAC/tenant, failure paths, concurrencia, migración, backup/restore e Independent Review.

El rehearsal de recovery exporta las bases, introduce mutaciones sintéticas, restaura el backup y verifica checksums y reconciliación. Se presenta como evidencia local de recuperación, no como prueba falsa de rollback atómico remoto entre D1.

## HMS Elite no desaparece: se convierte en la primera mitad de la historia

Mantener HMS Elite como caso independiente tiene valor histórico, pero la evidencia más fuerte aparece al mostrar continuidad:

- primero hubo que modelar un SaaS operacional real en Rust/PostgreSQL;
- después identificar su contrato observable;
- luego cambiar infraestructura sin perder comportamiento ni autoridad;
- finalmente producir una frontera suficientemente explícita como para que una capa agentic pueda integrarse sin convertir al modelo en fuente de verdad.

El Agent Core pertenece a otro repositorio y otro gate. La historia del portfolio los conecta como evolución de arquitectura, no como si fueran un único monorepo.

## Qué demuestra esta historia

- brownfield migration en lugar de greenfield solamente;
- preservación de contratos de dominio;
- Rust/PostgreSQL y edge/serverless en una misma evolución;
- aislamiento multi-tenant y RBAC;
- razonamiento transaccional y de concurrencia;
- browser-level product validation;
- migration y recovery engineering;
- separación entre Technical PASS, Product Acceptance, Production Readiness y Release.

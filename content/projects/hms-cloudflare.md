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

## Problema

HMS Cloudflare no nació como una aplicación serverless nueva. Es la evolución de un sistema de gestión hotelera que ya modelaba reservas, recepción, habitaciones, huéspedes, housekeeping, facturación, permisos y operación multi-hotel.

El problema era cambiar infraestructura y topología de datos sin cambiar silenciosamente el producto. Migrar de Rust + Axum + PostgreSQL hacia Workers, Hono y D1 exigía conservar estados, permisos, aislamiento entre hoteles y comportamiento observable, además de demostrar que backup y recovery funcionaban de forma verificable.

## Contexto y restricciones

La secuencia técnica es:

`HMS Elite / Rust + Axum + PostgreSQL → inventario del contrato → migración parity-first → Workers + Hono + D1 → validación de producto y recovery → Agent Core como capa posterior`

Las restricciones que guiaron el trabajo fueron concretas:

- preservar las transiciones de estado utilizadas por recepción;
- mantener la semántica de permisos y memberships;
- reemplazar PostgreSQL RLS sin perder aislamiento multi-tenant;
- evitar prometer atomicidad distribuida donde D1 no la ofrece;
- validar recorridos reales de navegador, no solo compilación;
- distinguir Technical PASS, Product Acceptance, Production Readiness y Release.

## Arquitectura

La arquitectura activa separa dos responsabilidades:

- `CONTROL_DB`: identidades, hoteles, memberships, roles y routing;
- un D1 operacional por hotel: reservas, habitaciones, huéspedes, billing, housekeeping y auditoría.

Cada request valida identidad, membership, rol y contexto antes de resolver la base operacional correspondiente. La separación física de datos reduce el radio de impacto, pero no reemplaza autorización.

Cloudflare Access autentica en el edge; la API valida esa identidad y HMS aplica la autoridad de negocio. Son capas distintas y se mantienen separadas intencionalmente.

## Decisiones de ingeniería

**Parity-first antes que rediseño.** La migración prioriza conservar el contrato observable antes de introducir nuevas capacidades.

**Atomicidad local.** Las operaciones críticas permanecen dentro del D1 de un hotel cuando la consistencia transaccional importa. No se simula una transacción distribuida inexistente.

**Autoridad explícita.** Access resuelve autenticación de infraestructura; memberships y RBAC resuelven autoridad de negocio.

**Recovery como comportamiento probado.** Un backup no se considera evidencia suficiente hasta restaurarlo y reconciliar el estado resultante.

## Implementación

La migración se dividió en incrementos verificables: foundation, inventario del contrato, rooms/guests/bookings, recepción, housekeeping, mantenimiento, billing, seguridad, administración, reporting y readiness operacional.

El trabajo conecta backend, datos, interfaces, seguridad e infraestructura. HMS Elite aporta el contrato fuente; HMS Cloudflare implementa el nuevo runtime y la nueva topología; Agent Core pertenece a otro repositorio y otro gate, y se integra solo sobre una frontera operacional explícita.

## QA y validación

La validación combina:

- typecheck y tests unitarios/integración;
- regresiones específicas de dominio;
- browser journeys;
- checks RBAC y tenant isolation;
- failure paths y concurrencia;
- migración y backup/restore;
- Independent Review.

El rehearsal de recovery exporta las bases, introduce mutaciones sintéticas, restaura el backup y verifica checksums y reconciliación. Se presenta como evidencia local de recuperación, no como prueba de rollback atómico remoto entre bases D1.

## Resultado actual

La migración alcanzó validación técnica y conserva una separación explícita entre aceptación técnica y aceptación de producto. El caso demuestra continuidad entre un backend Rust/PostgreSQL y una arquitectura edge/serverless sin presentar la segunda como un sistema independiente del dominio original.

## Evidencia y límites

La evidencia disponible cubre código, contrato de migración, pruebas automatizadas, recorridos de navegador y rehearsal de recovery. Permanecen pendientes capturas remotas del recorrido de recepción, evidencia visual mobile del candidato aceptado y evidencia remota de Product Acceptance.

Por eso el estado publicado es **migración validada técnicamente; aceptación separada**. No se presenta como release productivo final.

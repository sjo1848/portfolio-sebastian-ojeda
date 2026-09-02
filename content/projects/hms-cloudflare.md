---
title: HMS Cloudflare
slug: hms-cloudflare
order: 2
featured: true
category: Migración brownfield cloud-native para operaciones hoteleras
summary: Migración parity-first de un HMS existente a Workers y D1, preservando dominio, autorización, aislamiento multi-hotel, recuperación y evidencia de producto.
status: active-development
statusLabel: Migración y validación activas
year: 2026
role: Arquitectura de migración, implementación full stack, seguridad y QA operacional
repository: https://github.com/sjo1848/hms-cloudflare
demo: null
stack:
  - Cloudflare Workers
  - Hono
  - TypeScript
  - React
  - D1
  - Cloudflare Access
  - Vitest
  - GitHub Actions
evidenceNeeded:
  - Capturas del recorrido de recepción en staging
  - Evidencia visual de experiencia mobile
  - Evidencia remota de Product Acceptance
---

## Migrar arquitectura sin cambiar silenciosamente el producto

HMS Cloudflare toma un sistema hotelero ya modelado y lo migra desde una arquitectura tradicional hacia Cloudflare Workers + D1. El objetivo no es reescribir un CRUD, sino preservar el contrato observable del producto mientras cambia la infraestructura, el modelo de aislamiento de tenants y el modo de operar el sistema.

El proyecto cubre recepción, habitaciones, huéspedes, housekeeping, mantenimiento, billing, reporting, administración multi-hotel, autorización y recuperación operacional.

## El problema

Una migración brownfield puede “funcionar” técnicamente y aun así romper el producto. Entre los riesgos principales están:

- modificar transiciones de estado que los usuarios ya dependen;
- perder reglas de autorización al cambiar la infraestructura;
- asumir transacciones que no existen entre bases D1 separadas;
- confundir autenticación de edge con autorización de aplicación;
- declarar equivalencia porque las APIs responden, sin probar el recorrido real del usuario;
- tener backups sin demostrar que el restore realmente devuelve el sistema a un estado reconciliado.

La estrategia fue por eso **parity-first**: primero preservar semántica y comportamiento; después optimizar o evolucionar.

## Arquitectura multi-hotel

La topología activa usa:

- **un D1 de control plane**, con identidades, hoteles, memberships, roles y metadata de routing;
- **un D1 operacional por hotel**, con habitaciones, huéspedes, reservas, billing, housekeeping y auditoría.

La separación física reduce superficie de exposición entre hoteles, pero no reemplaza la autorización en la aplicación. Cada request debe validar identidad, membership, rol y contexto del hotel antes de resolver la base operacional correspondiente.

La arquitectura evita fingir atomicidad entre D1 diferentes. Las operaciones críticas se diseñan para permanecer dentro de una única base de hotel cuando la atomicidad importa.

## Seguridad en capas

1. Cloudflare Access autentica a la persona en el edge.
2. La API verifica esa identidad.
3. HMS la mapea a memberships y roles.
4. Se autoriza el contexto de hotel o red solicitado.
5. Recién entonces se resuelve el D1 operacional correspondiente.

Esto mantiene separadas **autenticación** y **autoridad de negocio**.

## Estrategia de migración

La migración se dividió en incrementos verificables:

1. foundation Cloudflare;
2. inventario del contrato fuente;
3. parity de rooms, guests y bookings;
4. lifecycle de recepción;
5. housekeeping y mantenimiento;
6. billing;
7. seguridad y administración;
8. analytics y reporting;
9. migración y operational readiness local.

Cada incremento agrega evidencia específica en lugar de inferir el estado del producto desde una suite genérica.

## QA, browser journeys y recovery

La validación combina:

- type checking;
- unit e integration tests;
- suites de regresión por incremento;
- browser journeys;
- rehearsal de migración;
- checks de tenant/RBAC/seguridad;
- failure paths y concurrencia;
- backup/restore rehearsal;
- revisión independiente;
- Human Product Acceptance como autoridad separada.

El rehearsal de recovery exporta las tres bases D1, introduce mutaciones sintéticas, restaura el backup y verifica checksums y reconciliación para demostrar que las mutaciones desaparecieron. Esa evidencia se presenta explícitamente como recovery local, no como prueba de rollback atómico remoto entre D1.

## Relación con AI-first

Este proyecto no necesita un LLM en cada pantalla para ser parte de un portfolio AI-first. Demuestra la capa que la IA necesita para operar de forma confiable: dominio estable, autorización explícita, aislamiento, contratos verificables, observabilidad, recovery y límites claros de autoridad.

Además, el repositorio funciona como banco de prueba del Project Method / Harness: estado persistente fuera de la memoria conversacional, Task Contracts, evidence gates, Critic independiente y separación entre PASS técnico, Product Acceptance, Production Readiness y Release.

## Qué demuestra este proyecto

- migración brownfield preservando comportamiento;
- arquitectura serverless/edge;
- aislamiento multi-tenant por topología y autorización;
- RBAC y separación autenticación/autorización;
- razonamiento sobre transacciones y concurrencia;
- browser-level validation;
- migración y recovery engineering;
- CI basado en evidencia;
- diseño de sistemas preparados para integrar automatización e IA sin debilitar controles operacionales.

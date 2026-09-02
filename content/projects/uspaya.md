---
title: UspaYa
slug: uspaya
order: 9
featured: true
category: Sistema transaccional multi-actor de última milla
summary: Cliente, comercio, operaciones y repartidor coordinados con idempotencia, privacidad temporal, concurrencia optimista, transacciones serializables y recovery autoritativo.
status: active-development
statusLabel: Vertical cerrada; hardening pre-piloto
year: 2026
role: Diseño de dominio, arquitectura, backend, frontend y QA de la vertical operativa
repository: https://github.com/sjo1848/UspaYa
demo: null
stack:
  - NestJS
  - Vue 3
  - TypeScript
  - PostgreSQL
  - Prisma
  - Playwright
  - Docker
  - GitHub Actions
evidenceNeeded:
  - Capturas mobile de los cuatro actores
  - Autenticación apta para piloto
  - Validación local con actores reales
  - Evidencia de fallback operativo pre-piloto
---

## Última milla como sistema transaccional, no como pantalla de pedidos

UspaYa coordina cuatro actores —Cliente, Comercio, Operaciones y Repartidor— sobre un mismo ciclo de pedido, pago y entrega.

La vertical completa recorre:

`SubmitOrder → PENDING_MERCHANT → ACCEPTED → PREPARING → READY → ASSIGNED → PICKUP_IN_PROGRESS → PICKED_UP → ON_THE_WAY → ARRIVED → DELIVERED / Payment CONFIRMED / Order FULFILLED → COMPLETED`

El proyecto está en hardening pre-piloto. La Fase 3 de API y la Fase 4 frontend están cerradas, incluido E2E móvil, pero el sistema se declara explícitamente **NOT READY FOR CLOSED PILOT** y **NOT READY FOR PUBLIC RELEASE** hasta cerrar autenticación, fallback y validación con actores reales.

## Idempotencia y resultados inciertos

Las mutaciones críticas no convierten un fallo de red en éxito ni en rechazo de negocio.

El cliente conserva una `Idempotency-Key` estable para la misma intención y, ante un resultado incierto, consulta el estado autoritativo antes de ofrecer un nuevo intento. El mismo principio aparece en comercio, operaciones y repartidor: recuperar primero; reintentar ciegamente, no.

La creación de pedidos incluye el snapshot de destino dentro de la intención inmutable, por lo que un replay exacto representa el mismo pedido y no uno “parecido”.

## Privacidad temporal, no solo RBAC

Dirección y teléfono se congelan transaccionalmente al enviar el pedido, pero no se exponen de forma permanente.

El destino:

- no aparece en AuditLog ni Outbox;
- no persiste en el storage del navegador;
- permanece oculto al repartidor antes de obtener custodia;
- se expone solo al repartidor activamente asignado desde `PICKED_UP`;
- deja de ser necesario cuando termina la asignación.

El PIN de entrega tampoco se registra en auditoría ni se recupera después de recargar.

## Concurrencia y cierre atómico

El sistema usa control optimista de versión para detectar conflictos y Prisma/PostgreSQL con transacciones serializables en comandos críticos.

La confirmación final de entrega exige repartidor asignado, estado `ARRIVED`, PIN válido, receptor, efectivo exacto e `Idempotency-Key`.

Un cambio válido confirma atómicamente:

- `Delivery → DELIVERED`;
- `Payment → CONFIRMED`;
- `Order → FULFILLED`;
- liberación de la asignación activa;
- auditoría y Outbox;
- resultado idempotente.

PIN incorrecto, efectivo incorrecto, conflicto de versión o concurrencia revierten todos los efectos.

## E2E multi-actor y recovery

Playwright/Chromium móvil recorre Cliente → Comercio → Operaciones → Repartidor → Operaciones. El escenario incluye una recarga real después de `SubmitOrder`, redescubrimiento del pedido activo sin PIN, frontera temporal de privacidad del destino y ausencia de PIN/dirección/teléfono en storage persistente.

La arquitectura es un monolito modular con DDD en el dominio, adopción hexagonal pragmática para mutaciones críticas, CQRS ligero, Outbox transaccional, OpenAPI, Docker Compose y CI.

## Qué demuestra esta historia

- modelado de workflows multi-actor;
- idempotencia ligada a intención;
- recuperación autoritativa de resultados inciertos;
- privacidad dependiente del estado operacional;
- optimistic concurrency;
- transacciones serializables para invariantes críticas;
- Outbox y auditoría sanitizada;
- E2E móvil de una vertical completa;
- disciplina de producto: vertical técnica cerrada no equivale a piloto listo.

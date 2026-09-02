---
title: UspaYa
slug: uspaya
order: 9
featured: true
category: Multi-actor transactional last-mile system
summary: Customer, merchant, operations and courier coordinated with idempotency, temporal privacy, optimistic concurrency, serializable transactions and authoritative recovery.
status: active-development
statusLabel: Vertical closed; pre-pilot hardening
year: 2026
role: Domain design, architecture, backend, frontend and operational vertical QA
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
  - Mobile screenshots for all four actors
  - Pilot-ready authentication
  - Local validation with real actors
  - Pre-pilot operational fallback evidence
---

## Last-mile delivery as a transactional system, not an order screen

UspaYa coordinates four actors —Customer, Merchant, Operations and Courier— across one order, payment and delivery lifecycle.

The complete vertical follows:

`SubmitOrder → PENDING_MERCHANT → ACCEPTED → PREPARING → READY → ASSIGNED → PICKUP_IN_PROGRESS → PICKED_UP → ON_THE_WAY → ARRIVED → DELIVERED / Payment CONFIRMED / Order FULFILLED → COMPLETED`

The project is in pre-pilot hardening. API Phase 3 and frontend Phase 4 are closed, including mobile E2E, but the system explicitly remains **NOT READY FOR CLOSED PILOT** and **NOT READY FOR PUBLIC RELEASE** until authentication, fallback and real-actor validation gates close.

## Idempotency and uncertain outcomes

Critical mutations do not convert a network failure into either success or business rejection.

The client keeps a stable `Idempotency-Key` for the same intent and, after an uncertain outcome, queries authoritative state before offering another attempt. The same principle appears across merchant, operations and courier flows: recover first; do not retry blindly.

Order submission includes the destination snapshot inside the immutable intent, so an exact replay represents the same order rather than a merely similar request.

## Temporal privacy, not only RBAC

Address and phone are frozen transactionally when the order is submitted, but they are not permanently exposed.

The destination:

- does not appear in AuditLog or Outbox;
- is never persisted in browser storage;
- remains hidden from the courier before custody transfer;
- becomes visible only to the actively assigned courier from `PICKED_UP` onward;
- stops being needed once the assignment ends.

The delivery PIN is also excluded from audit and cannot be recovered after a reload.

## Concurrency and atomic completion

The system uses optimistic version control for conflicts and Prisma/PostgreSQL serializable transactions for critical commands.

Final delivery confirmation requires the assigned courier, `ARRIVED` state, a valid PIN, recipient, exact cash amount and an `Idempotency-Key`.

A valid change atomically confirms:

- `Delivery → DELIVERED`;
- `Payment → CONFIRMED`;
- `Order → FULFILLED`;
- release of the active assignment;
- audit and Outbox records;
- an idempotent result.

Wrong PIN, wrong cash amount, version conflict or concurrency rolls back every effect.

## Multi-actor E2E and recovery

Playwright/Chromium mobile walks Customer → Merchant → Operations → Courier → Operations. The scenario includes a real reload after `SubmitOrder`, active-order rediscovery without the PIN, the temporal destination-privacy boundary and absence of PIN/address/phone from persistent storage.

The architecture is a modular monolith with DDD in the domain, pragmatic hexagonal adoption for critical mutations, lightweight CQRS, transactional Outbox, OpenAPI, Docker Compose and CI.

## What this story demonstrates

- multi-actor workflow modeling;
- intent-bound idempotency;
- authoritative recovery from uncertain outcomes;
- privacy that depends on operational state;
- optimistic concurrency;
- serializable transactions for critical invariants;
- Outbox and sanitized audit;
- mobile E2E across a complete vertical;
- product discipline: a technically closed vertical is not the same as pilot readiness.

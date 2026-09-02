---
title: HMS Cloudflare
slug: hms-cloudflare
order: 2
featured: true
category: Brownfield evolution of an operational SaaS
summary: From Rust/PostgreSQL to Workers/D1 through contract analysis, parity-first migration, multi-tenant security, browser validation and verifiable recovery.
status: active-development
statusLabel: Technically validated migration; acceptance remains separate
year: 2026
role: Migration architecture, full-stack implementation, security and operational QA
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
  - Remote screenshots of the reception journey
  - Mobile visual evidence from the accepted candidate
  - Remote Product Acceptance evidence
---

## The story does not start with Cloudflare

HMS Cloudflare is stronger when understood as the evolution of an existing operational system, not as another isolated serverless project.

The technical sequence is:

`HMS Elite / Rust + Axum + PostgreSQL → contract inventory → parity-first migration → Workers + Hono + D1 → product and recovery validation → governed agentic integration as the next layer`

The source `hotel-management-system` repository first modeled reservations, reception, rooms, guests, housekeeping, billing, permissions and multi-hotel operations. The migration could not treat that behavior as disposable.

## Changing architecture without silently changing the product

HMS Cloudflare replaces infrastructure and data topology while preserving the observable product contract.

That forces questions beyond “does it compile?”:

- are the state transitions reception relies on preserved?;
- do permissions retain their semantics?;
- how is each hotel isolated without PostgreSQL RLS?;
- which operations need atomicity inside one database?;
- what evidence proves a real browser journey?;
- does a backup actually restore a reconciled state?

## From PostgreSQL to an explicit D1 topology

The active architecture uses:

- one `CONTROL_DB` for identities, hotels, memberships, roles and routing;
- one separate operational D1 per hotel for bookings, rooms, guests, billing, housekeeping and audit.

Physical separation does not replace authorization. Every request must validate identity, membership, role and context before resolving the correct operational database.

The architecture also refuses to pretend cross-D1 writes are atomic. Critical business operations stay inside one hotel database whenever atomicity matters.

## Layered security

1. Cloudflare Access authenticates the person at the edge.
2. The API validates that identity.
3. HMS maps it to memberships and roles.
4. The requested hotel or network context is authorized.
5. Only then is the corresponding D1 resolved.

Infrastructure authentication and business authority are different boundaries.

## Parity-first and evidence

The migration is decomposed into verifiable increments: foundation, source-contract inventory, rooms/guests/bookings, reception, housekeeping, maintenance, billing, security, administration, reporting and operational readiness.

Validation combines type checking, unit and integration tests, targeted regressions, browser journeys, RBAC/tenant checks, failure paths, concurrency, migration rehearsal, backup/restore and independent review.

The recovery rehearsal exports the databases, introduces synthetic mutations, restores the backup and verifies checksums and reconciliation. It is presented as local recovery evidence, not as a false claim of remote atomic rollback across D1.

## HMS Elite does not disappear: it becomes the first half of the story

Keeping HMS Elite as a separate historical case still has value, but the stronger evidence comes from continuity:

- first, an operational SaaS had to be modeled in Rust/PostgreSQL;
- then its observable contract had to be identified;
- then infrastructure changed without losing behavior or authority;
- finally, the boundary became explicit enough for an agentic layer to integrate without making the model the source of truth.

Agent Core belongs to another repository and another gate. The portfolio connects them as an architecture evolution, not as if they were one monorepo.

## What this story demonstrates

- brownfield migration rather than greenfield-only work;
- domain-contract preservation;
- Rust/PostgreSQL and edge/serverless in one evolution;
- multi-tenant isolation and RBAC;
- transaction and concurrency reasoning;
- browser-level product validation;
- migration and recovery engineering;
- separation between Technical PASS, Product Acceptance, Production Readiness and Release.

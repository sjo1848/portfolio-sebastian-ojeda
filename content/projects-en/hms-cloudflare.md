---
title: HMS Cloudflare
slug: hms-cloudflare
order: 2
featured: true
category: Brownfield cloud-native migration for hotel operations
summary: Parity-first migration of an existing HMS to Workers and D1 while preserving domain behavior, authorization, multi-hotel isolation, recovery and product evidence.
status: active-development
statusLabel: Active migration and validation
year: 2026
role: Migration architecture, full-stack implementation, security and operational QA
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
  - Screenshots of the reception journey in staging
  - Visual evidence of the mobile experience
  - Remote Product Acceptance evidence
---

## Changing architecture without silently changing the product

HMS Cloudflare takes an already-modeled hotel system and migrates it from a traditional architecture to Cloudflare Workers + D1. The goal is not to rewrite a CRUD application, but to preserve the observable product contract while changing infrastructure, tenant isolation and operational deployment.

The project covers reception, rooms, guests, housekeeping, maintenance, billing, reporting, multi-hotel administration, authorization and operational recovery.

## The problem

A brownfield migration can be technically successful and still break the product. Major risks include:

- changing state transitions users already rely on;
- losing authorization semantics while replacing infrastructure;
- assuming transactions that do not exist across separate D1 databases;
- confusing edge authentication with application authorization;
- declaring parity because APIs respond without proving the real user journey;
- keeping backups without proving that restore returns the system to a reconciled state.

The strategy is therefore **parity-first**: preserve semantics and behavior before optimizing or evolving the product.

## Multi-hotel architecture

The active topology uses:

- **one control-plane D1**, containing identities, hotels, memberships, roles and routing metadata;
- **one operational D1 per hotel**, containing rooms, guests, bookings, billing, housekeeping and audit records.

Physical separation reduces cross-hotel exposure, but does not replace application authorization. Each request must validate identity, membership, role and hotel context before resolving the relevant operational database.

The architecture does not pretend that cross-D1 writes are atomic. Critical operations are kept inside one hotel database whenever atomicity matters.

## Layered security

1. Cloudflare Access authenticates the person at the edge.
2. The API verifies that identity.
3. HMS maps it to memberships and roles.
4. The requested hotel or network context is authorized.
5. Only then is the relevant operational D1 resolved.

This keeps **authentication** separate from **business authority**.

## Migration strategy

The migration was decomposed into verifiable increments:

1. Cloudflare foundation;
2. source-contract inventory;
3. rooms, guests and bookings parity;
4. reception lifecycle;
5. housekeeping and maintenance;
6. billing;
7. security and administration;
8. analytics and reporting;
9. migration and local operational readiness.

Each increment adds specific evidence instead of inferring product state from one generic test suite.

## QA, browser journeys and recovery

Validation combines:

- type checking;
- unit and integration tests;
- increment-specific regression suites;
- browser journeys;
- migration rehearsal;
- tenant/RBAC/security checks;
- failure paths and concurrency;
- backup/restore rehearsal;
- independent review;
- Human Product Acceptance as a separate authority boundary.

The recovery rehearsal exports all three D1 databases, introduces synthetic mutations, restores the backup, and verifies checksums and machine reconciliation to prove that those mutations disappeared. This is deliberately presented as local recovery evidence, not as proof of remote atomic rollback across D1.

## Relationship to AI-first engineering

This project does not need an LLM on every screen to belong in an AI-first portfolio. It demonstrates the substrate AI needs in order to operate safely: stable domain rules, explicit authorization, isolation, verifiable contracts, observability, recovery and clear authority boundaries.

The repository also acts as a testbed for the Project Method / Harness: state persisted outside conversational memory, Task Contracts, evidence gates, independent Critic review and an explicit distinction between Technical PASS, Product Acceptance, Production Readiness and Release.

## What this project demonstrates

- brownfield migration with behavior preservation;
- serverless/edge architecture;
- multi-tenant isolation through topology and authorization;
- RBAC and authentication/authorization separation;
- transaction and concurrency reasoning;
- browser-level validation;
- migration and recovery engineering;
- evidence-driven CI;
- systems designed to integrate automation and AI without weakening operational controls.

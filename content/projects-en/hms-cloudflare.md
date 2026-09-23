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

## Problem

HMS Cloudflare did not start as a new serverless application. It is the evolution of a hotel-management system that already modeled bookings, reception, rooms, guests, housekeeping, billing, permissions, and multi-hotel operations.

The problem was to change infrastructure and data topology without silently changing the product. Moving from Rust + Axum + PostgreSQL to Workers, Hono, and D1 required preserving states, permissions, hotel isolation, and observable behavior while also proving backup and recovery in a verifiable way.

## Context and constraints

The technical sequence is:

`HMS Elite / Rust + Axum + PostgreSQL → contract inventory → parity-first migration → Workers + Hono + D1 → product and recovery validation → Agent Core as a later layer`

The work was constrained by several concrete requirements:

- preserve reception-facing state transitions;
- retain membership and permission semantics;
- replace PostgreSQL RLS without losing tenant isolation;
- avoid claiming distributed atomicity where D1 does not provide it;
- validate real browser journeys rather than compilation alone;
- keep Technical PASS, Product Acceptance, Production Readiness, and Release as separate gates.

## Architecture

The active architecture separates two responsibilities:

- `CONTROL_DB`: identities, hotels, memberships, roles, and routing;
- one operational D1 per hotel: bookings, rooms, guests, billing, housekeeping, and audit.

Every request validates identity, membership, role, and context before resolving the corresponding operational database. Physical separation reduces blast radius, but it does not replace authorization.

Cloudflare Access authenticates at the edge; the API validates that identity and HMS applies business authority. Those are intentionally different layers.

## Engineering decisions

**Parity-first before redesign.** The migration preserves the observable contract before introducing new capabilities.

**Local atomicity.** Critical operations stay inside one hotel's D1 whenever transactional consistency matters. The architecture does not pretend a nonexistent distributed transaction exists.

**Explicit authority.** Access handles infrastructure authentication; memberships and RBAC handle business authority.

**Recovery as tested behavior.** A backup is not treated as sufficient evidence until it is restored and the resulting state is reconciled.

## Implementation

The migration was decomposed into verifiable increments: foundation, source-contract inventory, rooms/guests/bookings, reception, housekeeping, maintenance, billing, security, administration, reporting, and operational readiness.

The work spans backend, data, interfaces, security, and infrastructure. HMS Elite provides the source contract; HMS Cloudflare implements the new runtime and topology; Agent Core remains a separate repository and gate and integrates only over an explicit operational boundary.

## QA and validation

Validation combines:

- type checking plus unit and integration tests;
- targeted domain regressions;
- browser journeys;
- RBAC and tenant-isolation checks;
- failure paths and concurrency;
- migration and backup/restore;
- independent review.

The recovery rehearsal exports the databases, introduces synthetic mutations, restores the backup, and verifies checksums and reconciliation. It is presented as local recovery evidence, not as proof of remote atomic rollback across D1 databases.

## Visual evidence

The following screenshots are versioned in the repository and come from Playwright regressions against the migrated runtime. They document reproducible local behavior; they are not presented as remote acceptance or production proof.

<img src="/media/projects/hms-cloudflare/cf-i04-reception-lifecycle.png" alt="HMS Cloudflare reception workflow" width="1440" height="1296" loading="lazy" decoding="async" />

*Reception: operational lifecycle captured during the project regression suite.*

<img src="/media/projects/hms-cloudflare/cf-i05-integrated-housekeeping.png" alt="HMS Cloudflare housekeeping workspace" width="1440" height="900" loading="lazy" decoding="async" />

*Housekeeping: evidence of the integrated workspace on the Cloudflare migration.*

<img src="/media/projects/hms-cloudflare/cf-i06-billing.png" alt="HMS Cloudflare billing workflow" width="1440" height="900" loading="lazy" decoding="async" />

*Billing: product behavior captured by Playwright; it does not imply remote Product Acceptance.*

<img src="/media/projects/hms-cloudflare/cf-i07-admin.png" alt="HMS Cloudflare administrative workspace" width="1440" height="900" loading="lazy" decoding="async" />

*Administration: current access and roles workspace captured by Playwright.*

## Current result

The migration reached technical validation while preserving an explicit separation between technical acceptance and product acceptance. The case demonstrates continuity between a Rust/PostgreSQL backend and an edge/serverless architecture instead of presenting the latter as disconnected from the original domain.

## Evidence and limits

Available evidence covers code, migration contracts, automated tests, browser journeys, Playwright screenshots, and recovery rehearsal. Remote reception screenshots, final mobile visual evidence, and remote Product Acceptance evidence remain pending.

The published status is therefore **technically validated migration; acceptance remains separate**. It is not presented as a final production release.

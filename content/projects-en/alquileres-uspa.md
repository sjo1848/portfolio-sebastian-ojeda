---
title: Alquileres Uspallata
slug: alquileres-uspa
order: 5
featured: true
category: Vacation-rental catalog and management
summary: Full-stack platform for publishing properties, reviewing listings, tracking availability, and connecting visitors with owners.
status: active-development
statusLabel: Active development
year: 2026
role: Domain analysis, architecture, and full-stack development
repository: https://github.com/sjo1848/alquileres-uspa
demo: null
stack:
  - NestJS
  - Vue
  - TypeScript
  - Prisma
  - PostgreSQL
  - Vitest
evidenceNeeded:
  - Public property catalog
  - Public listing with availability
  - Review and publication workflow
  - Direct contact and administrative audit
---

## Problem

A vacation-rental catalog is not solved by displaying cards alone. It also needs to control who can edit a listing, when publication is approved, whether availability is still current, and how a visitor inquiry reaches the correct owner without exposing internal data.

Alquileres Uspallata addresses that journey as a full-stack system with a public catalog, private owner and administration workflows, timestamped availability, and auditability for sensitive actions.

## Context and constraints

The domain combines public information with private operations. A visible listing must pass explicit review and publication steps, while availability can become stale even if the listing remains published.

The main constraints were:

- separate ownership, review, and publication;
- derive the owner from the authenticated session;
- never trust arbitrary owner identity sent by the client;
- expose only allowed fields through public routes;
- preserve rejection reasons and administrative actions;
- avoid presenting stale availability as currently confirmed availability.

## Architecture

The NestJS API organizes authentication, owners, listings, review, contact, and auditing. Prisma and PostgreSQL support the transactional model. Vue consumes separate routes for the public experience, owner workflows, and administration.

The system separates public fields from ownership, storage, review, and audit data. Private operations derive owner context from the session, and administrative actions are associated with actor, action, entity, target owner, and timestamp.

## Engineering decisions

**Review and publication are separate states.** A listing can move from `DRAFT` to `SUBMITTED`, then to `APPROVED` or `REJECTED`; only an approved listing can be published. Editing or reviewing does not automatically make a listing visible.

**Availability has explicit freshness.** Availability stores a last-confirmed timestamp so the UI can distinguish fresh information from potentially stale information.

**Server-side authority.** The browser does not decide which owner controls a listing or which internal fields become public.

**Auditable assisted actions.** Relevant administrative operations leave a trace tied to the actor and affected entity.

## Implementation

The implemented flow covers:

- drafts and submission for review;
- approval or rejection with a persisted reason;
- controlled publication;
- paginated public catalog with filters;
- public listing with availability;
- direct contact with the correct owner;
- administrative actions with audit records.

The core stack combines NestJS, Vue, TypeScript, Prisma, and PostgreSQL with a clear separation between API, persistence, and user experience.

## QA and validation

The repository includes versioned migrations, API and guard tests, linting, builds, secret validation, and a health smoke test. Documented checkpoints cover catalog, review, availability, contact, and audit workflows.

Validation focuses especially on authorization boundaries, public responses without internal data, and consistent state transitions.

## Current result

The product core is implemented and remains in active development. The platform already models the full journey from listing creation and review through publication, public discovery, and contact without mixing client authority with server authority.

## Evidence and limits

Available evidence is in the repository, automated tests, and documented case study. A public verifiable deployment and final visual evidence for the catalog, listing detail, review/publication, and administrative audit remain pending.

The current scope **does not include** reservations, payments, realtime flows, notifications, full tourism operations, or a public production deployment. The demo therefore remains unset and the project is presented as active development rather than a finished production product.

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

## A public catalog with operational controls

Alquileres Uspallata is a platform for managing and publishing vacation rentals. It combines a public catalog with private owner and administration workflows, so a listing must pass explicit review and publication steps before it becomes visible to visitors.

The solution is designed for a domain where information changes, availability needs confirmation, and administrative actions must remain explainable later. The system separates public fields from internal ownership, review, storage, and audit data.

## The problem

A rental catalog is not solved by displaying cards alone. It also needs to control who can edit a listing, when publication is approved, whether availability is current, and how a visitor inquiry reaches the correct owner.

The platform addresses that journey with:

- Drafts and owner submission for review.
- Administrative approval or rejection with a persisted reason.
- Publication independent from review status.
- A paginated public catalog filtered by location, price, and guest count.
- Public listing pages exposing only allowed fields.
- Availability status and last-confirmed timestamp.
- Direct visitor contact without accepting owner identity from the client.
- Admin-assisted actions with an audit record.

## State model

Review status and publication status are independent. A listing can move from `DRAFT` to `SUBMITTED`, become `APPROVED` or `REJECTED`, and only an approved listing can be published. This separation prevents editing or reviewing a listing from making it visible automatically.

Availability has its own status and timestamp. The catalog exposes whether the confirmation is fresh or stale without turning an old timestamp into a promise of current availability.

## Architecture and security

The NestJS API organizes authentication, owners, listings, review, contact, and auditing. Prisma and PostgreSQL support the transactional model, while the Vue application consumes separate routes for public and administrative experiences.

Private routes derive ownership from the authenticated session. The server does not accept an arbitrary owner supplied by the browser. Credentials, tokens, storage keys, and internal data are never returned in public responses. Assisted administrative operations are associated with an actor, action, entity, target owner, and timestamp.

## Current state

The repository includes versioned migrations, API and guard tests, linting, builds, secret validation, and a health smoke test. Catalog, review, availability, contact, and audit workflows are part of the documented project checkpoint.

The current scope excludes reservations, payments, full tourism operations, realtime flows, notifications, and a public production deployment. The portfolio therefore presents it as active development and leaves the demo unset until a verifiable instance is available.

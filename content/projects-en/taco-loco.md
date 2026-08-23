---
title: Taco Loco Foodtrack
slug: taco-loco
order: 4
featured: true
category: Digital menu and order management
summary: Mobile-first system connecting a QR menu, product customization, intent registration, and administrative follow-up through WhatsApp.
status: functional-mvp
statusLabel: Functional MVP
year: 2026
role: Product analysis, UX, architecture, and full-stack development
repository: https://github.com/sjo1848/taco-loco-foodtrack
demo: null
stack:
  - Next.js
  - TypeScript
  - React
  - Prisma
  - PostgreSQL
  - Vitest
evidenceNeeded:
  - Public mobile menu
  - Product customization and order summary
  - Administrative inbox
  - Intent flow into WhatsApp
---

## A conversion-oriented digital menu

Taco Loco Foodtrack is a mobile-first system for a food business. The public experience starts with a QR-accessible menu, lets customers browse products, choose modifiers, and prepare an order intent before continuing through WhatsApp.

The project carefully separates what the system can confirm from what happens in an external channel. Foodtrack records the intent and prepares the message, but does not present the order as sent or confirmed because the final response happens inside WhatsApp.

## The problem

A digital menu can display products without solving the operational journey that follows. When selection, availability, and communication with the business remain disconnected, orders become ambiguous, data gets stale, and the experience is difficult to follow.

Foodtrack models a clearer flow:

- The customer opens a responsive catalog from a QR code.
- The system shows availability and applicable modifiers.
- The selection is reviewed before leaving the menu.
- The server validates products, quantities, prices, and options again.
- The intent is registered for administration.
- WhatsApp opens with a prefilled message while confirmation remains manual.

## The solution

The MVP includes a product catalog, categories, availability, modifiers, session-persistent selection, order summary, idempotency references, and an administrative inbox for reviewing intents. The mobile journey uses focused layers for customization and review, while desktop keeps a broader presentation without losing menu context.

The backend does not trust prices or names sent by the browser. It resolves the snapshot from the database and applies the rules before registering the intent. This boundary protects order consistency and lets the interface evolve without making the client the source of truth.

## Product decisions

### Register intent, do not confirm

The application uses states and copy that reflect its actual scope: the order is prepared for follow-up and the customer must confirm it inside WhatsApp. The system does not claim that the business received or accepted the order automatically.

### WhatsApp as continuation

The external channel is integrated through a prefilled message. On mobile, the native application is preferred when available with a web fallback; on desktop, a new tab preserves access to the menu.

### Layers over the menu

Customization and review use sheets or dialogs with focus handling, Escape support, focus restoration, and reduced-motion support. Customers can review their selection without losing the catalog.

## Quality and current state

The repository includes type checking, linting, tests, database validation, and QA-cycle documentation. The closed scope covers the local MVP, menu experience, and intent registration. Payments, delivery, tracking, automatic WhatsApp confirmation, advanced analytics, and an official WhatsApp Business integration remain out of scope.

Pending public evidence includes a hosted demo and final physical validation on real devices. For that reason, the portfolio describes the product as a functional MVP rather than as a deployed production platform.

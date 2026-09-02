# Sebastián Ojeda

**Software Developer | AI-First | Full Stack & Systems**

Mendoza, Argentina  
sebastian.ojeda.dev@gmail.com  
github.com/sjo1848  
sebastian-ojeda.pages.dev

Remote | Hybrid or on-site in Mendoza | Relocation considered | Intermediate English

## Professional profile

Software developer focused on building end-to-end solutions for real operational processes. I work from domain and architecture through backend, interfaces, data, integrations, testing, CI/CD and operations. I build multi-tenant systems, cloud/serverless migrations and AI/agentic experiences with governed tool calling, Human-in-the-Loop, auditability, idempotency and deterministic fallback.

## Skills

- **AI / Agentic:** LLMs, model routing, tool calling, HITL, policies, telemetry, and fallback.
- **Backend:** TypeScript, Node.js, NestJS, Rust/Axum, Hono, REST, and OpenAPI.
- **Frontend / Mobile:** React, Vue 3, React Native, Vite, and Tailwind.
- **Data / Cloud:** PostgreSQL, SQLx, Prisma, SQLite/D1, Docker, Cloudflare Workers, and Linux.
- **Quality / Enterprise:** Playwright, Vitest, E2E, GitHub Actions, SAP Basis, PI/PO, and CPI.

## Selected projects

### AI Commerce Platform - Multi-tenant Agent Core

**Stack:** TypeScript, LLMs, tooling, and staging.

- Separates LLM interpretation from operational authority through registered tools, trusted context, policies, HITL, auditability, and idempotency.
- Integrates with HMS for availability, quoting, and reservations; includes model evaluation, latency/cost telemetry, and adversarial QA.
- Current state: active staging validation; it is not presented as production or as having final product acceptance.
- Repository: https://github.com/sjo1848/ai-commerce-platform

### HMS Elite - Multi-hotel management system

**Stack:** Rust/Axum, PostgreSQL, and React/TypeScript.

- Reservations, check-in/out, rooms, housekeeping, charges, and payments with modular domain boundaries and OpenAPI contracts.
- RBAC, hotel isolation, selective RLS, full-stack CI, browser/mobile E2E, security, and recovery.
- Repository: https://github.com/sjo1848/hotel-management-system

### HMS Cloudflare - Brownfield cloud-native migration

**Stack:** Cloudflare Workers, Hono, D1/SQLite, and React.

- Parity-first migration to Workers + D1 while preserving observable behavior, domain rules, and authorization.
- Control plane + per-hotel D1, Cloudflare Access, RBAC, regressions, browser journeys, and backup/restore rehearsal.
- Repository: https://github.com/sjo1848/hms-cloudflare

### GasFlow - Mobile Delivery Operations

**Stack:** React Native, Rust/Axum, and PostgreSQL.

- Mobile MVP for scheduled orders, driver assignment, deliveries, stock, and cylinder reconciliation.
- JWT, audit events, metrics/request IDs, mobile persistence, and CI with backend and app tests.
- Repository: https://github.com/sjo1848/gasflow

### Alquileres Uspallata - Rental catalog and management

**Stack:** NestJS, Vue 3, PostgreSQL, and Prisma.

- Public catalog plus OWNER/ADMIN workflows for review, publication, availability, contact, and audit.
- Repository: https://github.com/sjo1848/alquileres-uspa

## Professional experience

### Gotechy - SAP Basis & Integrations Consultant | 2022-2023

- SAP/HANA, jobs, dumps, certificates, and backups; incident diagnosis and service continuity.
- PI/PO, CPI, IDoc, and workflows/automation with SAP BTP/BPA.

### Rubinzal Culzoni - Technical Support / Junior PHP Developer

- User support, troubleshooting, and PHP application development and maintenance.

## AI-first method and quality

- Project Method / Harness with verifiable objectives and exit criteria, Task Contracts, canonical state, and traceability.
- Independent Critic, Integration Review, Human Gates, and CI evidence before declaring PASS.
- AI is used for interpretation, planning, and assistance; operational authority, validation, and safety boundaries remain explicit and verifiable.

## Education

- UTN - incomplete university studies in Information Systems Engineering and Electronic Engineering.
- Mining Logistics Management Program - ISTEEC - in progress.
- Intermediate Power BI, Introduction to Data Science, and Business English - Santander Open Academy.

## PDF generation

Both public resume PDFs are generated deterministically through:

```bash
npm run generate:cv
```

Stable outputs:

```text
public/cv-sebastian-ojeda.pdf
public/cv-sebastian-ojeda-en.pdf
```

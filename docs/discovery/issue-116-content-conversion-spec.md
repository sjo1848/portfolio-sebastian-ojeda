# Issue #116 — Conversion Content Contract

## 1. Content rule

Every Home block must answer one recruiter question.

If a block cannot answer a distinct recruiter question, it does not deserve a standalone section.

## 2. Recruiter questions mapped to sections

Hero:
**Who is this person and what kind of role/work do they do?**

Selected Work:
**Can they show real systems and evidence?**

Operating Mindset:
**How do they think and what differentiates their engineering approach?**

About:
**Who are they beyond the technical pitch?**

Additional Work:
**Is there breadth beyond the three lead cases?**

Contact:
**How do I interview/contact them now?**

## 3. Claims policy

No new factual claim may be introduced solely because it sounds stronger.

Use only supported facts from:
- current site data;
- case-study content;
- accepted evidence;
- verified project state.

Do not convert:
- technically validated → production;
- active development → finished product;
- local evidence → remote acceptance;
- prototype → production system.

## 4. Lead project quick-scan content

### 01 — HMS Cloudflare
Category:
`Brownfield evolution of an operational SaaS`

Commercial short signal:
`Migrated an operational hotel system from Rust/PostgreSQL toward Workers/D1 while preserving domain states, tenant boundaries and recovery evidence.`

Role:
`Migration architecture, full-stack implementation, security and operational QA`

Status:
`Technically validated migration; acceptance remains separate`

Primary proof themes:
- parity-first migration;
- multi-tenant authority;
- browser journeys;
- backup/recovery rehearsal;
- approved visual evidence.

### 02 — Alquileres Uspallata
Category:
`Vacation-rental catalog and management`

Commercial short signal:
`Built a full-stack rental workflow with controlled review/publication, server-side ownership, availability freshness and administrative audit.`

Role:
`Domain analysis, architecture and full-stack development`

Status:
`Active development`

Primary proof themes:
- NestJS/Vue full stack;
- authorization boundaries;
- review/publication states;
- public/private data separation;
- reproducible visual evidence.

### 03 — AI Commerce + HMS
Category:
`Agent connected to a real operational system`

Commercial short signal:
`Connected an LLM-driven experience to HMS through governed tools, policies, HITL, auditability and idempotency without giving the model operational authority.`

Role:
`Product architecture, development, evaluation and orchestration`

Status:
`Experimental prototype · Phase 2.6 under validation`

Primary proof themes:
- tool calling;
- deterministic authority;
- Human-in-the-Loop;
- trusted context;
- audit/idempotency;
- adversarial evaluation.

## 5. CTA hierarchy

Global header:
- Resume/CV is always directly reachable.

Hero:
1. View selected work
2. Download resume

Selected Work:
- View case study per project
- GitHub may be secondary inside project detail, not required on every row.

Contact:
1. Send email
2. Download resume
3. GitHub
4. Copy email

## 6. Language parity

ES and EN must:
- preserve the same project ordering;
- preserve status meaning;
- preserve evidence limitations;
- preserve CTA hierarchy;
- avoid stronger claims in one language.

Copy need not be literal translation if naturalness improves, but factual scope must remain equivalent.

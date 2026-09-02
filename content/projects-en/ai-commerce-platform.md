---
title: AI Commerce + HMS
slug: ai-commerce-platform
order: 1
featured: true
category: Agent connected to a real operational system
summary: LLM and Agent Core connected to HMS through governed tools, policies, HITL, auditability and idempotency without handing operational authority to the model.
status: active-development
statusLabel: Phase 2.6 under agentic validation
year: 2026
role: Product architecture, development, evaluation and orchestration
repository: https://github.com/sjo1848/ai-commerce-platform
demo: null
stack:
  - TypeScript
  - LLMs
  - Tool Calling
  - Cloudflare Workers
  - Service Binding
  - Human-in-the-Loop
  - Model Routing
  - GitHub Actions
evidenceNeeded:
  - Screenshot of the real-model HMS conversational flow
  - Visual Human-in-the-Loop approval evidence
  - Public summary of the 2.6 adversarial corpus
---

## An agent connected to real operations without turning the model into authority

This is the portfolio's primary story because the problem is not “build a chatbot.” The problem is allowing a model to understand natural language and operate on a real hotel system without being able to invent permissions, trusted context or side effects.

AI Commerce Platform connects a conversational experience to HMS. The LLM interprets intent, context and ambiguity; Agent Core retains execution authority.

`Channel → ChatOrchestrator → ModelRouter → AgentCoreExecutor → ToolRegistry → PolicyEngine → Adapter → HMS`

## What the model can and cannot do

The model can:

- interpret natural requests;
- maintain controlled conversational context;
- propose structured tool plans;
- request clarification;
- compose responses grounded in real results.

The model cannot:

- choose trusted tenant, hotel or actor context;
- elevate permissions;
- access the database directly;
- invent approval metadata;
- create arbitrary operation tokens;
- bypass server-side revalidation.

The separation between **intelligence** and **authority** is the central architecture decision.

## Operational evidence reached

Phase 2.5 closed the HMS staging operations proof with:

- real availability and quoting through Service Binding;
- controlled reservation creation;
- controlled cancellation;
- HITL approval bound to the exact operation;
- durable approval challenges;
- booking ownership;
- replay and conflict semantics;
- inventory removal and restoration;
- audit and idempotency controls;
- synthetic cross-repository E2E with cleanup.

The current phase, 2.6, is not presented as closed. It is replacing the deterministic parser as the primary experience with a provider-independent `LLMModelRouter`, while retaining the deterministic router as fallback and reproducible fixture.

## Why this is AI-first rather than AI-only

AI is used where it has leverage: language, context, ambiguity and composition. Responsibilities that require certainty remain deterministic:

- registered tools;
- policies and permissions;
- trusted identity and context;
- idempotency;
- approvals;
- auditability;
- HMS operational state.

The important capability is not “using an LLM”; it is deciding which responsibilities the model receives and which ones it is explicitly denied.

## What this story demonstrates

- LLM integration with an existing operational system;
- governed tool calling with server-side revalidation;
- Human-in-the-Loop for sensitive side effects;
- multi-tenancy and trusted context outside the prompt;
- idempotency, replay and auditability;
- model routing and deterministic fallback;
- adversarial evaluation and product gates;
- an explicit boundary between probabilistic interpretation and operational authority.

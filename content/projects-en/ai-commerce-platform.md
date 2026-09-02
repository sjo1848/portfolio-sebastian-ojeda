---
title: AI Commerce Platform
slug: ai-commerce-platform
order: 1
featured: true
category: Multi-tenant agentic platform for real operations
summary: Agent Core that connects natural language to operational systems through governed tools, policies, Human-in-the-Loop, auditability and idempotency.
status: active-development
statusLabel: Agentic staging validation
year: 2026
role: Product architecture, development, evaluation and orchestration
repository: https://github.com/sjo1848/ai-commerce-platform
demo: null
stack:
  - TypeScript
  - LLMs
  - Tool Calling
  - Cloudflare Workers
  - Node.js
  - GitHub Actions
evidenceNeeded:
  - Screenshot of the HMS staging conversation flow
  - Visual evidence of Human-in-the-Loop approval
  - Public summary of the Model Router evaluation corpus
---

## AI interprets; deterministic controls execute

AI Commerce Platform is a multi-tenant Agent Core designed to connect conversational experiences with real operational systems without giving direct authority to the model. The goal is not an isolated chatbot, but a reusable agentic layer where the model interprets intent and context while the platform retains control over permissions, tools, approvals, idempotency and auditability.

The architecture deliberately separates **intelligence** from **operational authority**. The LLM may interpret a request, propose a tool plan, ask for clarification and compose a response; it cannot choose trusted tenant context, elevate permissions, set approval metadata or access the database directly.

## The problem

Connecting generative AI to real operations introduces risks that do not exist in an informational chatbot:

- a response can become a real reservation or cancellation;
- a model may understand language correctly and still propose an unauthorized action;
- conversational context must not replace trusted system context;
- retries and duplicates must not execute the same operation twice;
- sensitive actions need human approval tied to the exact operation;
- the system needs a safe path when the LLM provider fails or returns invalid output.

The model is therefore treated as a replaceable reasoning and interpretation layer, not as the source of truth or execution authority.

## Architecture

The main flow follows this separation:

`Channel → ChatOrchestrator → ModelRouter → AgentCoreExecutor → ToolRegistry → PolicyEngine → Adapter → Operational system`

### Model Router

The model layer turns natural language and conversational context into structured plans. Current work evolves from a deterministic router toward a provider-independent `LLMModelRouter`, while keeping the deterministic router as a safe fallback and reproducible test fixture.

### Agent Core

Before a tool can execute, the core:

- resolves trusted tenant, hotel and actor context;
- validates the structured plan;
- applies policies and permissions;
- decides whether Human-in-the-Loop is required;
- controls idempotency and operation tokens;
- records evidence and audit events;
- delegates to the relevant domain adapter.

### Adapters

Adapters isolate each vertical integration. HMS is the first real proof. A second vertical remains blocked until the agentic experience proves that it can preserve the same safety boundaries.

## HMS evidence reached

The staging flow has already demonstrated:

- real HMS availability and quoting through Service Binding;
- controlled reservation creation and cancellation;
- exact-operation Human-in-the-Loop approval;
- durable approval challenges;
- booking ownership;
- downstream replay and conflict semantics;
- inventory removal and restoration;
- audit and idempotency controls;
- synthetic cross-repository E2E with cleanup.

The current phase focuses on natural conversational quality with a real model. Its gate requires a frozen corpus, structured planning, server-side revalidation, safe multi-turn context, usage/latency/cost telemetry, fallback, adversarial QA, real-model staging E2E and Human Product Acceptance.

## What AI-first means here

AI-first does not mean replacing every rule with an LLM. In this system:

- AI interprets language, context and ambiguity;
- tools define which actions exist;
- policies determine what is allowed;
- HITL protects sensitive side effects;
- the operational system remains the source of truth;
- deterministic fallback keeps a controlled path when the model is not reliable.

Choosing **where not to use AI** is part of the design.

## Quality and method

The repository uses an explicit phase contract and separates technical evidence from product acceptance. Validation includes type checking, tests, adversarial QA, telemetry and human gates. A phase does not close because the model looked good in a demo; reproducible evidence must satisfy the defined exit criteria.

## What this project demonstrates

- agentic systems with bounded authority;
- governed tool calling with server-side revalidation;
- Human-in-the-Loop for real side effects;
- multi-tenancy and trusted context outside the prompt;
- idempotency, auditability and replay semantics;
- model routing and deterministic fallback;
- conversational and adversarial evaluation;
- AI integration with an existing operational system;
- product gates before expanding autonomy or scope.

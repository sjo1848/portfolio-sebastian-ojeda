---
title: Agentic Engineering Governance
slug: agentic-engineering-governance
order: 8
featured: true
category: DICS + Project Integrity Kernel
summary: Two complementary systems for authority, evidence, stale detection, handoffs and context recovery in agent-executed projects.
status: active-development
statusLabel: Experimental prototypes under validation
year: 2026
role: Applied research, architecture, implementation and evidence-contract design
repository: null
demo: null
stack:
  - Go
  - SQLite
  - TypeScript
  - Vitest
  - GitHub API
  - Durable State
  - Evidence Contracts
  - Human Gates
evidenceNeeded:
  - Public DICS / PIK relationship diagram
  - Sanitized Context Amnesia Test evidence
  - DICS M1 real-source validation
---

## Governing agentic work without depending on conversational memory

DICS and Project Integrity Kernel are separate repositories because they solve different problems, but together they express one capability: **Agentic Engineering Governance / Decision & Evidence Systems**.

Their shared thesis is simple: a project executed with agents cannot treat chat as the canonical source of state, evidence or authority.

> Conversation is cache; durable state is authority.

The implementation repositories are private. This case study publishes the architecture and evidence boundaries without pretending there is a public product release.

## DICS: observing decisions and sources without taking control of the product

DICS is a `Decision Intelligence & Control System`. Its current M1 projection is deliberately read-only.

It models:

- sources and claims;
- authority and configuration precedence;
- zero-write adapter contracts;
- local bootstrap and session primitives;
- replay fixtures;
- static no-write audit.

The important decision is negative: **DICS does not execute product work and does not write to governed GitHub, Drive or ledger sources in M1**. Canonical truth remains in the original sources and any DICS cache is disposable.

The M1.5 contract also prevents a false conclusion: green CI does not prove usefulness against real sources. Live validation remains a separate gate.

## Project Integrity Kernel: integrity, evidence and recovery

PIK is a runtime-agnostic kernel implemented in Go + SQLite for reconstructing the state of agent-executed projects.

The EK-EXP-001 experiment already proves properties stronger than merely “saving state”:

- multi-source ingestion with explicit authority;
- stale handoff detection;
- authoritative artifact resolution;
- REWORK lineage preservation;
- immutable evaluation snapshots;
- exact evidence-to-artifact binding;
- no automatic PASS inheritance;
- kernel-computed Critic independence;
- ResumePack freshness and tamper detection;
- optimistic `STALE_WRITE` rejection;
- precise Human Gate recovery;
- a genuine Context Amnesia Test from a fresh runtime.

PIK remains an experimental prototype ready for local evaluation. It is not presented as a SaaS platform, PM suite or agent runtime.

## Why they belong together

DICS answers: **what is happening, which sources claim what, and which decisions need attention?**

PIK answers: **which state and evidence can be considered intact after handoffs, rework or total context loss?**

Together they form an engineering story about authority, provenance, staleness, evidence and recovery rather than “agents doing more tasks.”

## What this story demonstrates

- agentic system design with authority outside chat;
- evidence-bound reviews;
- stale detection and optimistic concurrency;
- recoverable handoffs between runtimes;
- explicit Human Gates;
- separation between governance/observation and execution;
- local-first, runtime-agnostic architecture;
- discipline not to market experimental capabilities as production.

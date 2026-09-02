---
title: Agentic Engineering Governance
slug: agentic-engineering-governance
order: 8
featured: true
category: DICS + Project Integrity Kernel
summary: Dos sistemas complementarios para autoridad, evidencia, stale detection, handoffs y recuperación de contexto en proyectos ejecutados con agentes.
status: active-development
statusLabel: Prototipos experimentales en validación
year: 2026
role: Investigación aplicada, arquitectura, implementación y diseño de contratos de evidencia
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
  - Diagrama público de la relación DICS / PIK
  - Evidencia sanitizada del Context Amnesia Test
  - Validación real-source M1 de DICS
---

## Gobernar trabajo agentic sin depender de la memoria de la conversación

DICS y Project Integrity Kernel son repositorios distintos porque resuelven problemas distintos, pero juntos expresan una capacidad: **Agentic Engineering Governance / Decision & Evidence Systems**.

La tesis compartida es simple: un proyecto ejecutado con agentes no puede tratar el chat como fuente canónica de estado, evidencia o autoridad.

> Conversation is cache; durable state is authority.

Los repositorios de implementación son privados. Este case study publica la arquitectura y los límites de evidencia sin fingir que existe una release pública del producto.

## DICS: observar decisiones y fuentes sin tomar control del producto

DICS es un `Decision Intelligence & Control System`. Su M1 actual es deliberadamente read-only.

El sistema modela:

- fuentes y claims;
- configuración y precedencia de autoridad;
- adapters zero-write;
- sesiones y bootstrap local;
- replay de fixtures;
- auditoría estática de no-escritura.

La decisión importante es negativa: **DICS no ejecuta trabajo de producto ni escribe sobre GitHub, Drive o ledgers gobernados en M1**. La verdad canónica permanece en las fuentes originales y cualquier cache de DICS es descartable.

El contrato M1.5 también evita una falsa conclusión: CI verde no prueba utilidad contra fuentes reales. La validación live sigue siendo un gate separado.

## Project Integrity Kernel: integridad, evidencia y recuperación

PIK es un kernel runtime-agnostic implementado en Go + SQLite para reconstruir el estado de proyectos ejecutados con agentes.

El experimento EK-EXP-001 ya prueba propiedades más duras que “guardar estado”:

- ingestión multi-fuente con autoridad explícita;
- detección de handoffs stale;
- resolución de artefacto autoritativo;
- preservación de lineage REWORK;
- snapshots de evaluación inmutables;
- binding exacto entre evidencia y artefacto;
- no herencia automática de PASS;
- Critic independence computada por el kernel;
- detección de tampering y freshness en ResumePack;
- rechazo optimista `STALE_WRITE`;
- recuperación precisa de Human Gates;
- Context Amnesia Test desde un runtime fresco.

PIK sigue siendo un prototipo experimental listo para evaluación local. No se presenta como plataforma SaaS, PM suite ni motor de agentes.

## Por qué presentarlos juntos

DICS responde: **¿qué está pasando, qué fuentes dicen qué y qué decisiones necesitan atención?**

PIK responde: **¿qué estado y evidencia pueden considerarse íntegros después de handoffs, rework o pérdida total de contexto?**

Juntos forman una historia de ingeniería sobre autoridad, provenance, staleness, evidencia y recuperación, no sobre “agentes que hacen más tareas”.

## Qué demuestra esta historia

- diseño de sistemas agentic con autoridad fuera del chat;
- evidence-bound reviews;
- stale detection y optimistic concurrency;
- handoffs recuperables entre runtimes;
- Human Gates explícitos;
- separación entre observación/gobierno y ejecución;
- arquitectura local-first y runtime-agnostic;
- disciplina para no presentar capacidades experimentales como producción.

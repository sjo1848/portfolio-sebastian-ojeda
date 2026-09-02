---
title: AI Commerce + HMS
slug: ai-commerce-platform
order: 1
featured: true
category: Agent conectado a un sistema operacional real
summary: LLM y Agent Core conectados a HMS mediante tools gobernadas, políticas, HITL, auditoría e idempotencia sin entregar autoridad operacional al modelo.
status: active-development
statusLabel: Fase 2.6 en validación agentic
year: 2026
role: Arquitectura, desarrollo, evaluación y orquestación del producto
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
  - Captura del flujo conversacional HMS con modelo real
  - Evidencia visual de aprobación Human-in-the-Loop
  - Resumen público del corpus adversarial de 2.6
---

## Un agente conectado a operaciones reales sin convertir al modelo en autoridad

Esta es la historia principal del portfolio porque el problema no es “hacer un chatbot”. El problema es permitir que un modelo entienda lenguaje natural y opere sobre un sistema hotelero real sin poder inventar permisos, contexto confiable o efectos laterales.

AI Commerce Platform conecta una experiencia conversacional con HMS. El LLM interpreta intención, contexto y ambigüedad; el Agent Core conserva la autoridad de ejecución.

`Channel → ChatOrchestrator → ModelRouter → AgentCoreExecutor → ToolRegistry → PolicyEngine → Adapter → HMS`

## Qué puede hacer el modelo y qué no

El modelo puede:

- interpretar pedidos naturales;
- mantener contexto conversacional controlado;
- proponer planes estructurados de tools;
- pedir aclaraciones;
- redactar respuestas basadas en resultados reales.

El modelo no puede:

- elegir el tenant, hotel o actor confiable;
- elevar permisos;
- acceder directamente a la base de datos;
- inventar metadata de aprobación;
- crear tokens de operación arbitrarios;
- saltar la revalidación server-side.

La separación entre **inteligencia** y **autoridad** es la decisión arquitectónica central.

## Evidencia operacional alcanzada

La fase 2.5 cerró la prueba de operaciones HMS en staging con:

- disponibilidad y cotización reales mediante Service Binding;
- creación controlada de reservas;
- cancelación controlada;
- aprobación Human-in-the-Loop ligada a la operación exacta;
- challenges de aprobación durables;
- ownership de reservas;
- semántica de replay y conflicto;
- retiro y restauración de inventario;
- auditoría e idempotencia;
- E2E sintético entre repositorios con cleanup.

La fase actual, 2.6, no se presenta como cerrada. Está reemplazando el parser determinista como experiencia primaria por un `LLMModelRouter` independiente del proveedor, manteniendo el router determinista como fallback y fixture reproducible.

## Por qué esto es AI-first y no AI-only

La IA se usa donde tiene ventaja: lenguaje, contexto, ambigüedad y composición. Los elementos que requieren certeza siguen siendo deterministas:

- tools registradas;
- políticas y permisos;
- identidad y contexto confiable;
- idempotencia;
- aprobaciones;
- auditoría;
- estado operacional de HMS.

La capacidad importante no es “usar un LLM”; es decidir qué responsabilidad darle y qué responsabilidad negarle.

## Qué demuestra esta historia

- integración de LLMs con un sistema operacional existente;
- tool calling gobernado y revalidado en servidor;
- Human-in-the-Loop para side effects sensibles;
- multi-tenancy y contexto confiable fuera del prompt;
- idempotencia, replay y auditabilidad;
- model routing y fallback determinista;
- evaluación adversarial y gates de producto;
- una frontera explícita entre interpretación probabilística y autoridad operacional.

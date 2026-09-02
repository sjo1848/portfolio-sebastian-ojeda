---
title: AI Commerce Platform
slug: ai-commerce-platform
order: 1
featured: true
category: Plataforma agentic multi-tenant para operaciones reales
summary: Agent Core que conecta lenguaje natural con sistemas operativos mediante tools gobernadas, políticas, Human-in-the-Loop, auditoría e idempotencia.
status: active-development
statusLabel: Validación agentic en staging
year: 2026
role: Arquitectura, desarrollo, evaluación y orquestación del producto
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
  - Captura del flujo conversacional HMS en staging
  - Evidencia visual del Human-in-the-Loop
  - Resumen público del corpus de evaluación del Model Router
---

## IA para interpretar; controles deterministas para ejecutar

AI Commerce Platform es un Agent Core multi-tenant diseñado para conectar experiencias conversacionales con sistemas operativos reales sin entregar autoridad directa al modelo. El objetivo no es construir un chatbot aislado, sino una capa agentic reutilizable donde el modelo interpreta intención y contexto mientras la plataforma conserva el control sobre permisos, herramientas, aprobaciones, idempotencia y auditoría.

La arquitectura separa deliberadamente **inteligencia** de **autoridad operacional**. El LLM puede interpretar una solicitud, proponer un plan de tools, pedir aclaraciones y redactar una respuesta; no puede elegir por sí mismo el tenant confiable, elevar permisos, modificar metadata de aprobación ni acceder directamente a la base de datos.

## El problema

Conectar IA generativa con operaciones reales introduce riesgos que no aparecen en un chatbot informativo:

- una respuesta puede convertirse en una reserva o cancelación real;
- el modelo puede interpretar correctamente el lenguaje y aun así proponer una acción no autorizada;
- el contexto conversacional no debe reemplazar el contexto confiable del sistema;
- reintentos y duplicados deben resolverse sin ejecutar dos veces la misma operación;
- las acciones sensibles necesitan una aprobación humana ligada a la operación exacta;
- el sistema debe seguir funcionando de forma segura si el proveedor LLM falla o entrega una salida inválida.

Por eso el proyecto trata al modelo como una capa reemplazable de razonamiento e interpretación, no como fuente de verdad ni como autoridad de ejecución.

## Arquitectura

El flujo principal sigue esta separación:

`Channel → ChatOrchestrator → ModelRouter → AgentCoreExecutor → ToolRegistry → PolicyEngine → Adapter → Sistema operacional`

### Model Router

La capa de modelo transforma lenguaje natural y contexto conversacional en planes estructurados. El trabajo actual evoluciona desde un router determinista hacia un `LLMModelRouter` independiente del proveedor, manteniendo el router determinista como fallback seguro y fixture reproducible.

### Agent Core

Antes de ejecutar una tool, el núcleo:

- resuelve contexto confiable del tenant, hotel y actor;
- valida el plan estructurado;
- aplica políticas y permisos;
- determina si requiere Human-in-the-Loop;
- controla idempotencia y tokens de operación;
- registra evidencia y auditoría;
- delega al adapter de dominio correspondiente.

### Adapters

Los adapters aíslan la integración con cada vertical. HMS funciona como primera prueba real; la incorporación de una segunda vertical está bloqueada hasta demostrar que la experiencia agentic conserva las mismas fronteras de seguridad.

## Evidencia HMS alcanzada

El flujo de staging ya demostró:

- disponibilidad y cotización reales desde HMS mediante Service Binding;
- creación y cancelación controlada de reservas;
- aprobación Human-in-the-Loop ligada a la operación exacta;
- challenges de aprobación durables;
- ownership de la reserva;
- semántica de replay y conflicto aguas abajo;
- retiro y restauración de inventario;
- controles de auditoría e idempotencia;
- E2E sintético entre repositorios con limpieza posterior.

La fase actual trabaja sobre la calidad de la experiencia conversacional con un modelo real. El gate exige corpus congelado, planificación estructurada, revalidación server-side, contexto multi-turn seguro, telemetría de uso/latencia/costo, fallback, QA adversarial, E2E real en staging y aceptación humana del producto.

## Qué significa AI-first acá

AI-first no significa sustituir toda la lógica por un LLM. En este sistema:

- la IA interpreta lenguaje, contexto y ambigüedad;
- las tools definen qué acciones existen;
- las políticas deciden qué está permitido;
- HITL protege acciones sensibles;
- el sistema operacional sigue siendo la fuente de verdad;
- el fallback determinista mantiene una ruta controlada cuando el modelo no es confiable.

La decisión de **dónde no usar IA** es parte del diseño.

## Calidad y método

El repositorio usa un contrato de fase explícito y separa la evidencia técnica de la aceptación del producto. La validación incluye type checking, tests, QA adversarial, telemetría y gates humanos. Una fase no se declara cerrada porque “el modelo respondió bien” en una demostración: debe existir evidencia reproducible contra los criterios de salida definidos.

## Qué demuestra este proyecto

- diseño de sistemas agentic con autoridad limitada;
- tool calling gobernado y revalidado del lado servidor;
- Human-in-the-Loop para side effects reales;
- multi-tenancy y contexto confiable fuera del prompt;
- idempotencia, auditoría y replay semantics;
- model routing y fallback determinista;
- evaluación conversacional y adversarial;
- integración de IA con un sistema operacional existente;
- uso de gates de producto antes de ampliar autonomía o alcance.

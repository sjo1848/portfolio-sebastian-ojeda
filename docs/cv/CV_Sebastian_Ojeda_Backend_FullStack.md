# Sebastián Ojeda

**Software Developer | AI-First | Full Stack & Systems**

Mendoza, Argentina  
sebastian.ojeda.dev@gmail.com  
github.com/sjo1848  
sebastian-ojeda.pages.dev

Remoto | Híbrido o presencial en Mendoza | Relocalización evaluable | Inglés intermedio

## Perfil profesional

Desarrollador de software orientado a construir soluciones end-to-end para procesos reales. Trabajo desde dominio y arquitectura hasta backend, interfaces, datos, integraciones, testing, CI/CD y operación. Desarrollo sistemas multi-tenant, migraciones cloud/serverless y experiencias AI/agentic con tool calling gobernado, Human-in-the-Loop, auditoría, idempotencia y fallback determinista.

## Competencias

- **AI / Agentic:** LLMs, model routing, tool calling, HITL, policies, telemetry y fallback.
- **Backend:** TypeScript, Node.js, NestJS, Rust/Axum, Hono, REST y OpenAPI.
- **Frontend / Mobile:** React, Vue 3, React Native, Vite y Tailwind.
- **Datos / Cloud:** PostgreSQL, SQLx, Prisma, SQLite/D1, Docker, Cloudflare Workers y Linux.
- **Quality / Enterprise:** Playwright, Vitest, E2E, GitHub Actions, SAP Basis, PI/PO y CPI.

## Proyectos seleccionados

### AI Commerce Platform - Agent Core multi-tenant

**Stack:** TypeScript, LLMs, tooling y staging.

- Separa interpretación LLM de autoridad operacional mediante tools registradas, contexto confiable, políticas, HITL, auditoría e idempotencia.
- Integra HMS para disponibilidad, cotización y reservas; incluye evaluación de modelos, telemetría de latencia/costo y QA adversarial.
- Estado actual: validación activa en staging; no se presenta como producción ni como aceptación final cerrada.
- Repositorio: https://github.com/sjo1848/ai-commerce-platform

### HMS Elite - Sistema hotelero multi-hotel

**Stack:** Rust/Axum, PostgreSQL y React/TypeScript.

- Reservas, check-in/out, habitaciones, housekeeping, cargos y pagos con dominio modular y contratos OpenAPI.
- RBAC, aislamiento por hotel, RLS selectivo, CI full-stack, E2E browser/mobile, seguridad y recovery.
- Repositorio: https://github.com/sjo1848/hotel-management-system

### HMS Cloudflare - Migración brownfield cloud-native

**Stack:** Cloudflare Workers, Hono, D1/SQLite y React.

- Migración parity-first a Workers + D1 preservando comportamiento observable, reglas de dominio y autorización.
- Control plane + D1 por hotel, Cloudflare Access, RBAC, regresiones, browser journeys y backup/restore rehearsal.
- Repositorio: https://github.com/sjo1848/hms-cloudflare

### GasFlow - Mobile Delivery Operations

**Stack:** React Native, Rust/Axum y PostgreSQL.

- MVP móvil para pedidos programados, asignación de repartidores, entregas, stock y conciliación de envases.
- JWT, auditoría, métricas/request IDs, persistencia móvil y CI con pruebas de backend y app.
- Repositorio: https://github.com/sjo1848/gasflow

### Alquileres Uspallata - Catálogo y gestión

**Stack:** NestJS, Vue 3, PostgreSQL y Prisma.

- Catálogo público y flujos OWNER/ADMIN para revisión, publicación, disponibilidad, contacto y auditoría.
- Repositorio: https://github.com/sjo1848/alquileres-uspa

## Experiencia profesional

### Gotechy - Consultor SAP Basis e Integraciones | 2022-2023

- SAP/HANA, jobs, dumps, certificados y backups; diagnóstico de incidencias y continuidad operativa.
- PI/PO, CPI, IDoc y workflows/automatización con SAP BTP/BPA.

### Rubinzal Culzoni - Soporte Técnico / Programador PHP Jr.

- Soporte a usuarios, troubleshooting y desarrollo/mantenimiento de aplicaciones PHP.

## Método AI-first y calidad

- Project Method / Harness con objetivos y criterios de salida verificables, Task Contracts, estado canónico y trazabilidad.
- Critic independiente, Integration Review, Human Gates y evidencia de CI antes de declarar PASS.
- La IA se usa para interpretar, planificar y asistir; la autoridad operacional, la validación y los límites de seguridad permanecen explícitos y verificables.

## Formación

- UTN - estudios universitarios incompletos en Ingeniería en Sistemas de Información e Ingeniería Electrónica.
- Gestor en Logística Minera - ISTEEC - en curso.
- Power BI Intermedio, Introducción a Ciencia de Datos y Business English - Santander Open Academy.

## Generación del PDF

Los PDF públicos en español e inglés se generan de forma determinista mediante:

```bash
npm run generate:cv
```

Salidas estables:

```text
public/cv-sebastian-ojeda.pdf
public/cv-sebastian-ojeda-en.pdf
```

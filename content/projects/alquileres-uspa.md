---
title: Alquileres Uspallata
slug: alquileres-uspa
order: 5
featured: true
category: Catálogo y gestión de alquileres turísticos
summary: Plataforma full stack para publicar alojamientos, revisar fichas, controlar disponibilidad y conectar visitantes con propietarios.
status: active-development
statusLabel: Desarrollo activo
year: 2026
role: Análisis de dominio, arquitectura y desarrollo full stack
repository: https://github.com/sjo1848/alquileres-uspa
demo: null
stack:
  - NestJS
  - Vue
  - TypeScript
  - Prisma
  - PostgreSQL
  - Vitest
evidenceNeeded:
  - Catálogo público de alojamientos
  - Ficha pública con disponibilidad
  - Flujo de revisión y publicación
  - Contacto directo y auditoría administrativa
---

## Problema

Un catálogo de alojamientos no se resuelve mostrando tarjetas. También necesita controlar quién puede editar una ficha, cuándo una publicación queda aprobada, si la disponibilidad sigue vigente y cómo llega una consulta al propietario correcto sin exponer datos internos.

Alquileres Uspallata aborda ese recorrido como un sistema full stack con catálogo público, workflows privados para propietarios y administración, disponibilidad con marca temporal y auditoría de acciones sensibles.

## Contexto y restricciones

El dominio combina información pública y operación privada. Una ficha visible debe atravesar revisión y publicación explícitas, mientras que la disponibilidad puede quedar desactualizada aunque la ficha siga publicada.

Las restricciones principales fueron:

- separar propiedad, revisión y publicación;
- derivar al propietario desde la sesión autenticada;
- no aceptar identidad arbitraria enviada por el cliente;
- exponer solo campos permitidos en rutas públicas;
- conservar motivos de rechazo y acciones administrativas;
- no presentar disponibilidad vieja como disponibilidad confirmada actual.

## Arquitectura

La API NestJS organiza autenticación, propietarios, listados, revisión, contacto y auditoría. Prisma y PostgreSQL sostienen el modelo transaccional. Vue consume rutas diferenciadas para la experiencia pública, el propietario y la administración.

El sistema separa campos públicos de ownership, almacenamiento, revisión y auditoría. Las operaciones privadas obtienen el contexto de propietario desde la sesión y las acciones administrativas quedan asociadas a actor, acción, entidad, propietario objetivo y fecha.

## Decisiones de ingeniería

**Revisión y publicación son estados distintos.** Una ficha puede pasar de `DRAFT` a `SUBMITTED`, luego a `APPROVED` o `REJECTED`; solo una ficha aprobada puede publicarse. Editar o revisar no implica hacer visible la publicación.

**Disponibilidad con frescura explícita.** El estado de disponibilidad guarda una fecha de última confirmación para diferenciar información reciente de información potencialmente obsoleta.

**Autoridad del servidor.** El navegador no decide qué propietario modifica una ficha ni qué datos internos se exponen.

**Auditoría de acciones asistidas.** Las operaciones administrativas relevantes dejan una traza asociada al actor y a la entidad afectada.

## Implementación

El flujo implementado cubre:

- borradores y envío a revisión;
- aprobación o rechazo con motivo persistido;
- publicación controlada;
- catálogo público paginado con filtros;
- ficha pública con disponibilidad;
- contacto directo al propietario correcto;
- acciones administrativas con auditoría.

El stack principal combina NestJS, Vue, TypeScript, Prisma y PostgreSQL, con separación clara entre API, persistencia y experiencia de usuario.

## QA y validación

El repositorio incluye migraciones versionadas, pruebas de API y guards, lint, build, validación de secretos y smoke test de salud. Los checkpoints documentados cubren catálogo, revisión, disponibilidad, contacto y auditoría.

La validación prioriza especialmente límites de autorización, respuestas públicas sin datos internos y consistencia de las transiciones de estado.

## Resultado actual

El núcleo del producto está implementado y en desarrollo activo. La plataforma ya modela el recorrido completo desde creación y revisión de una ficha hasta publicación, consulta pública y contacto, sin mezclar autoridad del cliente con autoridad del servidor.

## Evidencia y límites

La evidencia disponible está en el repositorio, las pruebas y el caso documentado. Siguen pendientes una instancia pública verificable y evidencia visual definitiva de catálogo, ficha pública, revisión/publicación y auditoría administrativa.

El alcance actual **no incluye** reservas, pagos, realtime, notificaciones, turismo completo ni despliegue productivo público. Por eso la demo permanece sin URL y el proyecto se presenta como desarrollo activo, no como producto terminado en producción.

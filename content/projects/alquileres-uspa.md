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

## Catálogo público con control operativo

Alquileres Uspallata es una plataforma para gestionar y publicar alojamientos turísticos. El proyecto combina un catálogo público con flujos privados para propietarios y administración, de modo que una ficha visible debe atravesar revisión y publicación explícitas antes de aparecer para visitantes.

La solución está pensada para un dominio donde la información cambia, la disponibilidad necesita confirmación y las acciones administrativas deben poder explicarse después. El sistema diferencia los datos públicos de los campos internos de propiedad, revisión, almacenamiento y auditoría.

## El problema

Un catálogo de alojamientos no se resuelve únicamente mostrando tarjetas. También necesita controlar quién puede editar una ficha, cuándo una publicación está aprobada, si la disponibilidad está actualizada y cómo llega una consulta al propietario correcto.

La plataforma aborda ese recorrido con:

- Borradores y envío a revisión por parte de propietarios.
- Aprobación o rechazo administrativo con motivo persistido.
- Publicación independiente del estado de revisión.
- Catálogo público paginado con filtros por ubicación, precio y huéspedes.
- Fichas públicas que exponen solo campos permitidos.
- Estado de disponibilidad y fecha de última confirmación.
- Contacto directo del visitante sin aceptar identidad del propietario desde el cliente.
- Acciones asistidas por administración con registro de auditoría.

## Modelo de estados

El estado de revisión y el estado de publicación son independientes. Una ficha puede avanzar de `DRAFT` a `SUBMITTED`, ser `APPROVED` o `REJECTED`, y solo una ficha aprobada puede publicarse. Esta separación evita que editar o revisar una ficha implique hacerla visible automáticamente.

La disponibilidad también tiene su propio estado y una marca temporal. El catálogo expone si la confirmación es reciente o antigua, sin convertir una fecha vieja en una promesa de disponibilidad actual.

## Arquitectura y seguridad

La API NestJS organiza autenticación, propietarios, listados, revisión, contacto y auditoría. Prisma y PostgreSQL sostienen el modelo transaccional, mientras que la aplicación Vue consume rutas diferenciadas para la experiencia pública y la administración.

Las rutas privadas derivan la propiedad desde la sesión autenticada. El servidor no acepta un propietario arbitrario enviado por el navegador. Las credenciales, tokens, claves de almacenamiento y datos internos no se devuelven en respuestas públicas. Las operaciones administrativas asistidas quedan asociadas a actor, acción, entidad, propietario objetivo y fecha.

## Estado real

El repositorio incluye migraciones versionadas, pruebas de API y guards, lint, build, validación de secretos y smoke test de salud. El catálogo y los flujos de revisión, disponibilidad, contacto y auditoría forman parte del checkpoint documentado del proyecto.

El alcance actual no incluye reservas, pagos, turismo completo, realtime, notificaciones ni un despliegue productivo público. Por eso el portfolio lo presenta como desarrollo activo y mantiene la demo sin URL hasta contar con una instancia verificable.

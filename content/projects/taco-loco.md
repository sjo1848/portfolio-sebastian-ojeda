---
title: Taco Loco Foodtrack
slug: taco-loco
order: 4
featured: true
category: Menú digital y gestión de pedidos
summary: Sistema mobile-first que conecta un menú QR, personalización de productos, registro de intención y seguimiento administrativo mediante WhatsApp.
status: functional-mvp
statusLabel: MVP funcional
year: 2026
role: Análisis de producto, UX, arquitectura y desarrollo full stack
repository: https://github.com/sjo1848/taco-loco-foodtrack
demo: null
stack:
  - Next.js
  - TypeScript
  - React
  - Prisma
  - PostgreSQL
  - Vitest
evidenceNeeded:
  - Menú público en mobile
  - Personalización y resumen del pedido
  - Bandeja administrativa
  - Flujo de intención hacia WhatsApp
---

## Menú digital orientado a la conversión

Taco Loco Foodtrack es un sistema mobile-first para un local gastronómico. La experiencia pública parte de un menú accesible por QR, permite explorar productos, elegir modificadores y preparar una intención de pedido para continuar por WhatsApp.

El proyecto separa con cuidado lo que el sistema puede confirmar de lo que ocurre en un canal externo. Foodtrack registra la intención y prepara el mensaje, pero no presenta el pedido como enviado o confirmado porque la respuesta final sucede dentro de WhatsApp.

## El problema

Un menú digital puede mostrar productos sin resolver el recorrido operativo posterior. Cuando la selección, la disponibilidad y la comunicación con el local quedan desconectadas, aparecen pedidos ambiguos, datos desactualizados y una experiencia difícil de seguir.

Foodtrack modela un flujo más claro:

- El cliente consulta un catálogo responsive desde un QR.
- El sistema muestra disponibilidad y modificadores aplicables.
- La selección se revisa antes de salir del menú.
- El servidor vuelve a validar productos, cantidades, precios y opciones.
- La intención queda registrada para administración.
- WhatsApp se abre con un mensaje prellenado y la confirmación continúa siendo manual.

## La solución

El MVP incluye catálogo de productos, categorías, disponibilidad, modificadores, selección persistente durante la sesión, resumen del pedido, referencias idempotentes y una bandeja administrativa para revisar intenciones. El recorrido mobile utiliza capas enfocadas para personalización y revisión, mientras que desktop conserva una presentación más amplia sin perder el contexto del menú.

El backend no confía en precios ni nombres enviados por el navegador. Resuelve el snapshot desde la base de datos y aplica las reglas antes de registrar la intención. Este límite protege la consistencia del pedido y permite que la interfaz evolucione sin convertir al cliente en fuente de verdad.

## Decisiones de producto

### Registrar intención, no confirmar

La aplicación usa estados y textos que reflejan el alcance real: el pedido queda preparado para seguimiento y el usuario debe confirmar dentro de WhatsApp. No se afirma que el local recibió o aceptó el pedido automáticamente.

### WhatsApp como continuación

El canal externo se integra con un mensaje prellenado. En mobile se prioriza la apertura de la aplicación cuando está disponible y se conserva un fallback web; en desktop se abre una pestaña nueva para mantener el menú disponible.

### Capas sobre el menú

La personalización y el resumen se presentan como sheets o diálogos, con foco, Escape, restauración de foco y soporte para movimiento reducido. Así el usuario puede revisar su selección sin perder el catálogo.

## Calidad y estado real

El repositorio incluye typecheck, lint, pruebas, validaciones de base de datos y documentación de ciclos de QA. El alcance cerrado cubre el MVP local, la experiencia del menú y el registro de intención. Pagos, delivery, tracking, confirmación automática de WhatsApp, analytics avanzada y una integración oficial de WhatsApp Business quedan fuera de este estado.

La evidencia pública pendiente corresponde a una demo alojada y a una validación física final en dispositivos reales. Por eso el portfolio describe el producto como MVP funcional y no como una plataforma productiva desplegada.

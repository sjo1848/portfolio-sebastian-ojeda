# Wireframes mobile-first

## Estado

Propuesta estructural lista para revisión. Define jerarquía, orden y comportamiento; no representa todavía el estilo visual final.

## Principios

- El mensaje profesional debe entenderse antes del primer scroll largo.
- Los proyectos son la evidencia principal y aparecen antes que la lista de tecnologías.
- El contenido debe funcionar sin animaciones.
- La navegación debe ser usable con teclado y en pantallas pequeñas.
- Cada sección debe responder una pregunta concreta.

## Página principal — móvil, 360 px

```text
┌──────────────────────────────────────┐
│ Sebastián Ojeda              [Menú] │
├──────────────────────────────────────┤
│                                      │
│ DESARROLLADOR FULL STACK             │
│ CON FOCO EN BACKEND                  │
│                                      │
│ Sistemas de gestión y aplicaciones   │
│ operativas con Rust, TypeScript,     │
│ React, React Native y PostgreSQL.     │
│                                      │
│ [Ver proyectos]                      │
│ [Descargar CV]                       │
│ GitHub · LinkedIn                    │
│                                      │
│ Señal breve: dominio → código → QA   │
├──────────────────────────────────────┤
│ PROYECTOS DESTACADOS                 │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ [Captura HMS Elite]             │ │
│ │ HMS Elite                       │ │
│ │ Plataforma SaaS hotelera        │ │
│ │ Rust · React · PostgreSQL       │ │
│ │ Estado: desarrollo activo       │ │
│ │ [Caso de estudio] [Código]      │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ [Captura GasFlow]               │ │
│ │ GasFlow                         │ │
│ │ Operaciones móviles             │ │
│ │ React Native · Rust            │ │
│ │ Estado: MVP funcional           │ │
│ │ [Caso de estudio] [Código]      │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ [Captura AMR]                   │ │
│ │ A-M-R Refrigeración             │ │
│ │ Sitio comercial y SEO           │ │
│ │ Astro · TypeScript             │ │
│ │ Estado: sitio funcional         │ │
│ │ [Caso de estudio] [Código]      │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ CÓMO TRABAJO                         │
│                                      │
│ 01 Entender el dominio               │
│ 02 Diseñar el flujo                  │
│ 03 Construir la solución             │
│ 04 Validar la calidad                │
│ 05 Preparar la operación             │
├──────────────────────────────────────┤
│ CAPACIDADES                          │
│                                      │
│ Backend y arquitectura      [+]      │
│ Web y móvil                 [+]      │
│ Datos e integración         [+]      │
│ QA e infraestructura        [+]      │
├──────────────────────────────────────┤
│ EXPERIENCIA Y CONTEXTO               │
│                                      │
│ Sistemas empresariales, SAP,         │
│ integraciones y procesos operativos. │
├──────────────────────────────────────┤
│ SOBRE MÍ                             │
│                                      │
│ Resumen profesional breve.           │
├──────────────────────────────────────┤
│ CONTACTO                             │
│                                      │
│ Busco oportunidades en backend,      │
│ full stack y software operativo.     │
│                                      │
│ [Enviar email] [LinkedIn]            │
├──────────────────────────────────────┤
│ GitHub · CV · Mendoza, Argentina     │
└──────────────────────────────────────┘
```

## Comportamiento móvil

### Header

- Altura compacta.
- Nombre visible.
- Menú abre un panel simple, no pantalla completa animada.
- El botón de menú tiene etiqueta accesible y estado `aria-expanded`.

### Hero

- Una sola columna.
- El título ocupa entre tres y cinco líneas según ancho.
- CTA principal y secundario apilados hasta 480 px.
- No incluir fotografía dentro del primer viewport mientras no exista una imagen profesional aprobada.

### Tarjetas de proyecto

- Imagen con relación aproximada 16:10.
- Título y función antes del stack.
- Estado visible como texto, no solo por color.
- Botón del caso de estudio con mayor jerarquía que el enlace al código.

### Capacidades

- En móvil pueden funcionar como bloques expandibles.
- El contenido esencial debe seguir disponible sin JavaScript.
- Evitar más de cinco elementos visibles por grupo.

## Página principal — desktop, 1440 px

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Sebastián Ojeda     Proyectos  Proceso  Experiencia  Contacto  [CV]       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ ┌────────────────────────────────────┐ ┌─────────────────────────────────┐ │
│ │ BACKEND-FOCUSED FULL-STACK         │ │ Evidencia / composición visual │ │
│ │ DEVELOPER                          │ │ - diagrama de arquitectura      │ │
│ │                                    │ │ - recorte real de proyecto      │ │
│ │ Desarrollo sistemas de gestión... │ │ - estado de CI                  │ │
│ │                                    │ │                                 │ │
│ │ [Ver proyectos] [Descargar CV]     │ │ No usar mockup decorativo vacío │ │
│ │ GitHub · LinkedIn                  │ │                                 │ │
│ └────────────────────────────────────┘ └─────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────┤
│ PROYECTOS DESTACADOS                                                       │
│                                                                            │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐ │
│ │ HMS Elite            │ │ GasFlow              │ │ A-M-R Refrigeración  │ │
│ │ captura              │ │ captura              │ │ captura              │ │
│ │ resumen              │ │ resumen              │ │ resumen              │ │
│ │ estado + stack       │ │ estado + stack       │ │ estado + stack       │ │
│ │ enlaces              │ │ enlaces              │ │ enlaces              │ │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────┤
│ CÓMO TRABAJO                                                               │
│ 01 Dominio → 02 Flujo → 03 Construcción → 04 QA → 05 Operación            │
├────────────────────────────────────────────────────────────────────────────┤
│ CAPACIDADES                      │ EXPERIENCIA Y CONTEXTO                   │
│ Backend / Web / Datos / QA       │ SAP, integraciones, operaciones          │
├────────────────────────────────────────────────────────────────────────────┤
│ SOBRE MÍ                         │ CONTACTO                                 │
└────────────────────────────────────────────────────────────────────────────┘
```

## Comportamiento desktop

- Contenedor máximo entre 1180 y 1240 px.
- El hero usa dos columnas solo si existe evidencia visual útil.
- Las tres tarjetas se muestran en una fila a partir de aproximadamente 1100 px.
- Entre 768 y 1099 px, usar una tarjeta destacada y dos secundarias o una grilla de dos columnas.
- El header puede ser sticky, pero sin ocultar contenido ni cambiar de tamaño agresivamente.

## Caso de estudio — móvil

```text
┌──────────────────────────────────────┐
│ Header                               │
├──────────────────────────────────────┤
│ Proyecto / categoría                 │
│ Título                               │
│ Resumen                              │
│ Estado · rol · año                   │
│ [Código] [Demo cuando exista]        │
│ [Imagen principal]                   │
├──────────────────────────────────────┤
│ Problema                             │
├──────────────────────────────────────┤
│ Usuarios y contexto                  │
├──────────────────────────────────────┤
│ Solución y flujo                     │
├──────────────────────────────────────┤
│ Arquitectura                         │
│ [Diagrama]                           │
├──────────────────────────────────────┤
│ Decisiones técnicas                  │
├──────────────────────────────────────┤
│ UX y estados                         │
├──────────────────────────────────────┤
│ QA, seguridad y operación            │
├──────────────────────────────────────┤
│ Estado real                          │
│ [Tabla adaptable]                    │
├──────────────────────────────────────┤
│ Aprendizajes y próximos pasos        │
├──────────────────────────────────────┤
│ Proyecto anterior / siguiente        │
└──────────────────────────────────────┘
```

## Caso de estudio — desktop

- Hero de dos columnas: información y captura.
- Navegación lateral opcional solo si no bloquea lectura ni teclado.
- Ancho de lectura entre 680 y 760 px para párrafos largos.
- Diagramas y capturas pueden exceder el ancho de lectura dentro del contenedor principal.
- La tabla de estado debe tener alternativa apilada en móvil.

## Estados de contenido

### Sin captura disponible

Mostrar un bloque de evidencia técnica con:

- Arquitectura.
- CI.
- Stack.
- Flujo principal.

No usar mockups genéricos que puedan confundirse con el producto real.

### Sin demo disponible

No mostrar un botón deshabilitado. Omitir la acción y explicar el estado en el caso de estudio.

### Datos de contacto pendientes

Mantener los placeholders únicamente en contenido interno. La build de producción deberá fallar si permanecen valores `PENDING_CONFIRMATION`.

## Criterios de aceptación

- El orden funciona desde 360 px sin reordenamientos semánticos.
- El primer proyecto aparece antes de una lista extensa de tecnologías.
- Todos los CTA son comprensibles fuera de contexto.
- El estado de los proyectos no depende del color.
- La navegación es alcanzable y visible con teclado.
- El diseño puede implementarse sin JavaScript cliente obligatorio.

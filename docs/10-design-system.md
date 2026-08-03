# Sistema visual inicial

## Estado

Propuesta visual provisional. Las decisiones buscan una identidad sobria y distintiva sin convertir el portafolio en una interfaz temática.

## Concepto

**Ingeniería clara con contexto operativo.**

La identidad combina:

- Fondos cálidos y sobrios para evitar el aspecto genérico de dashboard.
- Texto oscuro de alto contraste.
- Un acento cobre relacionado de forma sutil con materialidad, industria y Mendoza.
- Líneas y diagramas técnicos como recursos funcionales.
- Capturas reales como principal elemento visual.

No se usarán montañas, minería o terminales como decoración dominante.

## Paleta propuesta

| Token | Valor | Uso |
|---|---:|---|
| `canvas` | `#F4F1EA` | Fondo principal cálido |
| `surface` | `#FFFFFF` | Tarjetas y bloques elevados |
| `ink` | `#151A1F` | Texto principal |
| `muted` | `#5B6570` | Texto secundario |
| `line` | `#D8D3CA` | Bordes y divisores |
| `accent` | `#A94F1C` | CTA, enlaces destacados y foco |
| `accent-strong` | `#843A13` | Hover/active sobre fondos claros |
| `night` | `#111820` | Secciones oscuras puntuales |
| `night-text` | `#F7F4ED` | Texto sobre `night` |
| `success` | `#176B4D` | Estado positivo acompañado por texto |
| `warning` | `#8A5A00` | Estado parcial acompañado por texto |

El acento `#A94F1C` supera contraste AA para texto normal sobre blanco y sobre el fondo principal. Los colores de estado nunca serán la única señal.

## Tipografía

### Opción recomendada

- Sans principal: `Inter`, con fallback a `system-ui`, `sans-serif`.
- Monoespaciada: `ui-monospace`, `SFMono-Regular`, `Consolas`, `monospace`.

### Uso

- Sans para todo el contenido y navegación.
- Monoespaciada solo para stacks, rutas, estados técnicos y fragmentos breves.
- No usar monoespaciada en párrafos, títulos principales ni CTA.

## Escala tipográfica

| Token | Mobile | Desktop | Uso |
|---|---:|---:|---|
| `display` | 44/46 | 72/74 | Título del hero |
| `h1` | 38/42 | 56/60 | Título de caso de estudio |
| `h2` | 30/36 | 42/48 | Secciones principales |
| `h3` | 23/29 | 28/34 | Tarjetas y subsecciones |
| `body-lg` | 19/30 | 21/32 | Introducciones |
| `body` | 16/26 | 17/28 | Texto general |
| `small` | 14/22 | 14/22 | Metadatos |
| `label` | 12/18 | 12/18 | Etiquetas mayúsculas limitadas |

Los pares indican tamaño/interlineado en píxeles de referencia. La implementación usará `rem` y `clamp()` donde aporte fluidez.

## Espaciado

Base de 4 px con pasos principales:

```text
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
```

### Reglas

- Separación interna mínima de tarjeta: 24 px móvil, 28–32 px desktop.
- Secciones: 72–96 px móvil y 112–144 px desktop.
- Longitud de línea: 60–75 caracteres para lectura continua.
- Los elementos interactivos deben tener al menos 44 × 44 px de área utilizable.

## Bordes y elevación

- Radio pequeño: 6 px.
- Radio de tarjeta: 12 px.
- Radio grande: 18 px, solo para contenedores destacados.
- Bordes de 1 px con `line`.
- Sombras suaves y escasas; preferir borde y contraste de superficie.
- No usar tarjetas flotantes para cada párrafo.

## Iconografía

- Trazo simple y consistente.
- Tamaños 16, 20 y 24 px.
- Todo icono interactivo lleva etiqueta accesible.
- No usar iconos como sustituto exclusivo de “Código”, “CV” o “Contacto”.

## Imágenes y diagramas

### Capturas

- Capturas reales y actuales.
- Sin información personal, credenciales o datos de terceros.
- Relación estable por proyecto.
- Pie de imagen cuando el contexto no sea evidente.

### Diagramas

- Fondo simple.
- Máximo de dos niveles visuales principales.
- Leyenda solo cuando sea necesaria.
- Versión textual o explicación adyacente.

## Botones y enlaces

### Botón primario

- Fondo `accent`.
- Texto blanco.
- Hover `accent-strong`.
- Focus visible de 3 px con separación.

### Botón secundario

- Fondo transparente o `surface`.
- Texto `ink`.
- Borde `line`.
- Hover con cambio de fondo y borde.

### Enlace textual

- Subrayado visible al hover y focus.
- No depender solo de cambio de color.

## Tarjeta de proyecto

Orden interno:

1. Captura o evidencia.
2. Tipo de solución.
3. Nombre.
4. Resumen.
5. Estado.
6. Stack breve.
7. Acciones.

La tarjeta completa no será un único enlace si contiene varias acciones.

## Movimiento

- Transiciones de 120–200 ms.
- Solo opacidad, color o desplazamientos mínimos.
- Respetar `prefers-reduced-motion`.
- No usar scroll hijacking, parallax o animación de escritura.

## Tema oscuro

No forma parte del MVP. Puede evaluarse después del lanzamiento si no duplica deuda visual y QA.

## Identidad con o sin retrato

### MVP recomendado

Iniciar sin retrato hasta contar con una fotografía profesional aprobada. El hero utilizará evidencia de proyectos y arquitectura.

### Incorporación posterior

La fotografía puede agregarse sin reestructurar el hero, siempre que aporte confianza y no desplace la evidencia técnica.

## Criterios de aceptación

- Contraste AA para texto e interacción.
- La paleta funciona en capturas, tablas y diagramas.
- Los componentes mantienen una jerarquía consistente.
- El sistema no depende de efectos visuales para comunicar calidad.
- La estética no compite con el contenido de los proyectos.

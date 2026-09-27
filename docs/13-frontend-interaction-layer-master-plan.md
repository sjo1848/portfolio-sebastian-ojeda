# Frontend Interaction Layer — Master Plan

## Estado

**Fase actual:** DEFINITION → DESIGN  
**Build:** BLOQUEADO hasta Human Gate  
**Issue de control:** #75  
**Implementador:** Codex  
**Controller / UX-Frontend Architect + Gatekeeper:** ChatGPT  
**Fuente de verdad técnica:** este documento + `docs/12-project-method.md`

---

## 1. Propósito

Este documento define el contrato maestro para evolucionar el portfolio de Sebastián Ojeda desde una experiencia principalmente estática a una experiencia frontend interactiva que:

1. mejore la UX real, especialmente en mobile;
2. demuestre habilidades frontend modernas sin convertir el portfolio en una demo de componentes;
3. mantenga Astro como shell, contenido y routing principal;
4. introduzca React únicamente como islas interactivas;
5. use shadcn/ui de manera selectiva y justificable;
6. preserve accesibilidad, performance, SEO, bilingüismo y la identidad visual Stone / Andes Copper;
7. mantenga el trabajo alineado al Project Method del repositorio.

El objetivo no es “usar shadcn”. El objetivo es que un recruiter o developer pueda inferir del propio producto que existe criterio en responsive UX, component composition, state management, accessibility, browser APIs, media interaction y progressive enhancement.

---

## 2. Resultado esperado

La versión resultante debe comunicar dos cosas simultáneamente:

### 2.1 Como portfolio

- quién es Sebastián;
- qué construye;
- qué proyectos son importantes;
- cómo trabaja;
- cómo acceder a cada caso de estudio;
- qué evidencia existe.

### 2.2 Como demostración frontend

La experiencia debe evidenciar:

- React + TypeScript integrado dentro de Astro;
- arquitectura de islas;
- responsive composition;
- componentes accesibles;
- manejo de estado acotado;
- comportamiento mouse / teclado / touch;
- adaptación desktop / mobile;
- IntersectionObserver u otras browser APIs donde aporten;
- motion reducido y focus management;
- media gallery usable;
- decisiones de hidratación proporcionales;
- QA responsive y de accesibilidad.

---

## 3. Roles y responsabilidades

### 3.1 Controller / UX-Frontend Architect + Gatekeeper — ChatGPT

Responsabilidades:

- conservar fase, alcance, restricciones y decisiones;
- definir contratos de UX, frontend y responsive;
- mantener este documento como fuente de verdad;
- abrir Human Gates cuando cambie alcance, estrategia o riesgo;
- revisar outputs de Codex;
- exigir evidencia de tests y comportamiento;
- coordinar Independent Critic / Verifier;
- realizar Integration Review;
- impedir que BUILD avance sobre supuestos no aprobados.

No implementa el código productivo de esta iniciativa.

### 3.2 Implementador — Codex

Codex es el único implementador autorizado para este alcance.

Debe:

- leer primero `docs/12-project-method.md`;
- leer este documento completo antes de modificar código;
- trabajar por incrementos pequeños y trazables;
- usar subagentes especialistas con contratos acotados;
- no delegar decisiones de producto o UX que ya estén fijadas aquí;
- no introducir componentes fuera del alcance sin Human Gate;
- no migrar el portfolio completo a React;
- producir evidencia de cada incremento;
- solicitar revisión independiente antes de integrar;
- dejar documentación y QA actualizados.

### 3.3 Subagentes mínimos requeridos para BUILD

Codex debe usar al menos los siguientes roles lógicos, aunque pueda resolverlos con diferentes subagentes concretos:

1. **Frontend / React Specialist**
   - componentes;
   - estado;
   - integración Astro/React;
   - shadcn/ui;
   - TypeScript.

2. **Responsive UX / Accessibility Specialist**
   - keyboard;
   - focus;
   - touch;
   - ARIA;
   - reduced motion;
   - mobile behavior.

3. **QA / Validation Specialist**
   - tests;
   - viewport matrix;
   - regression;
   - Lighthouse;
   - behavior validation.

4. **Independent Critic / Verifier**
   - no implementa;
   - revisa contra este contrato;
   - emite PASS / REWORK / HUMAN_GATE.

5. **Integration Review**
   - comprueba coherencia con portfolio completo;
   - revisa deuda, redundancia, estética y performance;
   - evita “component zoo”.

Un subagente no puede aprobar su propio trabajo.

---

## 4. Decisión arquitectónica principal

### 4.1 Opción aprobada

**Astro + React Islands + shadcn/ui selectivo.**

Astro continúa siendo responsable de:

- routing;
- layouts;
- contenido;
- SEO;
- generación estática;
- páginas de proyecto;
- contenido que no necesita estado cliente.

React se incorpora exclusivamente para componentes interactivos que lo justifiquen.

### 4.2 No se aprueba

- migrar la home completa a React;
- convertir cada sección en una isla;
- SPA routing;
- estado global de aplicación;
- Redux/Zustand u otro store global para esta iniciativa;
- reemplazar el design system Stone / Andes Copper por defaults visuales de shadcn;
- introducir componentes sólo para demostrar que existen.

### 4.3 Regla de hidratación

Cada isla debe responder:

> ¿Qué comportamiento pierde el usuario si este componente no hidrata?

Si la respuesta es “ninguno relevante”, no debe ser una isla React.

---

## 5. Baseline y problemas identificados

### 5.1 Project Card mobile

El CTA `Ver caso de estudio` existe en el código, pero el usuario reporta que no aparece o no resulta accesible en mobile.

Esto se clasifica como **P0 de UX**.

Antes de cualquier rediseño se debe validar:

- si el CTA existe en el HTML de producción;
- si está recortado, desplazado o visualmente perdido;
- si existe diferencia entre build local y deploy;
- si el problema ocurre en 360 / 390 / 430 px;
- si alguna combinación de altura de contenido o card variant provoca el fallo.

El caso de estudio no puede depender de hover.

### 5.2 Header mobile

La implementación actual muestra la navegación mobile como una grilla de enlaces.

El diseño ya documentado del repositorio define un menú mobile compacto.

La nueva solución debe usar un **Sheet mobile** y mantener navegación desktop visible.

### 5.3 Case studies

Los casos de estudio actuales son funcionales, pero largos.

Problemas:

- poca orientación dentro del documento;
- galería mejorable;
- evidencia visual abre en otra pestaña;
- mobile no tiene una navegación contextual compacta;
- no existe sección activa sincronizada.

### 5.4 Interactividad actual

El portfolio tiene buen HTML/CSS, pero demuestra poco manejo explícito de frontend interactivo.

La nueva capa debe elevar esa señal sin degradar el carácter editorial y técnico del sitio.

---

## 6. Principios de diseño de interacción

1. **Una interacción necesita una razón.**
2. **Mobile no es desktop reducido.**
3. **Nada esencial depende de hover.**
4. **El contenido debe seguir siendo navegable con JavaScript limitado.**
5. **Las acciones principales deben ser visibles.**
6. **El estado debe comunicarse visual y semánticamente.**
7. **La UI no debe competir con los proyectos.**
8. **La navegación del case study debe reducir esfuerzo, no agregar chrome.**
9. **Los componentes shadcn deben ser adaptados al design system existente.**
10. **No se introduce una dependencia si una solución nativa equivalente es más simple, salvo que la interacción elegida forme parte explícita de la demostración frontend aprobada.**

---

## 7. Componentes aprobados

## 7.1 MobileNavigation

### Patrón

Desktop:
- navegación inline existente refinada.

Mobile:
- trigger compacto;
- Sheet lateral o equivalente shadcn;
- navegación vertical.

### Objetivo frontend

Demostrar:

- responsive composition;
- overlay;
- focus management;
- escape;
- keyboard;
- state;
- React island;
- accessibility.

### Requisitos

- nombre visible;
- selector ES/EN visible;
- botón menú con nombre accesible;
- `aria-expanded`;
- focus trap correcto mientras está abierto;
- Escape cierra;
- click en una opción navega y cierra;
- scroll body bloqueado mientras corresponde;
- focus vuelve al trigger al cerrar;
- sin navegación duplicada accesible para screen reader.

### Hidratación

**`client:load`**.

Justificación: es navegación primaria y debe estar disponible de inmediato.

---

## 7.2 ResponsiveMediaDialog

### Patrón

Desktop:
- Dialog.

Mobile:
- Drawer o presentación fullscreen equivalente.

Debe existir como una única abstracción de producto, aunque internamente componga dos primitivas.

### Objetivo frontend

Demostrar:

- responsive behavior;
- component composition;
- breakpoint-aware rendering;
- accessible modal behavior;
- reusable API.

### Requisitos

- trigger desde screenshot;
- título y descripción accesibles;
- Escape;
- focus trap;
- click externo según comportamiento elegido;
- botón cerrar visible;
- imagen mantiene proporción;
- no overflow horizontal;
- mobile respeta safe area;
- navegación anterior/siguiente si se invoca desde una galería.

### Breakpoint de referencia

Usar la frontera existente del sistema: aproximadamente **48rem**.

No crear un breakpoint alternativo sólo para este componente sin justificación.

---

## 7.3 EvidenceGallery

### Desktop

Grid de evidencia.

### Mobile

Carousel.

### Integración

Al activar una imagen:
- abre `ResponsiveMediaDialog`;
- conserva índice activo;
- puede navegar al asset anterior/siguiente.

### Objetivo frontend

Demostrar:

- state;
- component composition;
- responsive rendering;
- touch;
- keyboard;
- media;
- coordinación Gallery → Dialog/Drawer.

### Requisitos

- no autoplay;
- indicadores de posición;
- controles con nombres accesibles;
- soporte touch/swipe si la librería elegida lo ofrece;
- flechas de teclado cuando el foco está dentro de la galería/modal;
- reduced motion;
- imágenes con dimensiones conocidas;
- lazy loading donde corresponda;
- desktop no debe forzar carrusel si el grid es más escaneable.

### Decisión sobre shadcn Carousel

Aprobado para evaluación durante BUILD.

Si se adopta, debe justificarse el peso y dependencias. Si un carousel accesible ya incluido por shadcn introduce una dependencia razonable, se acepta porque esta interacción forma parte de la demostración frontend.

---

## 7.4 CaseStudyNavigation

### Desktop

Sidebar / TOC sticky.

### Mobile

Botón “Contenido” que abre Sheet/Drawer.

### Secciones

El TOC no puede derivarse de strings arbitrarios duplicados manualmente si existe una fuente estructurada reutilizable.

Mínimo esperado cuando exista en el proyecto:

- Overview / Resumen;
- Problema;
- Contexto;
- Solución;
- Arquitectura;
- Decisiones;
- UX / estados;
- QA / validación;
- Estado actual;
- Evidencia;
- Próximos pasos.

No todos los proyectos deben fingir tener todas las secciones. El TOC debe reflejar el contenido real.

### Active section

Usar `IntersectionObserver` o mecanismo equivalente.

La navegación por anchors debe seguir funcionando aunque el tracking activo falle.

### Objetivo frontend

Demostrar:

- browser APIs;
- sticky layout;
- responsive adaptation;
- derived state;
- scroll behavior;
- accessible anchors.

### Requisitos

- anchor offset correcto con header sticky;
- estado activo no depende sólo de color;
- no scroll hijacking;
- click en item no debe romper back/forward;
- mobile cierra el Sheet después de navegar;
- el primer render no debe saltar por hidratación.

### Hidratación

Preferir **`client:idle`** o equivalente si la navegación básica ya funciona con anchors sin React.

---

## 7.5 CopyAction

### Uso inicial

- copiar email;
- opcionalmente copiar link del case study.

### Feedback

Usar cambio de estado inline y, si se agrega feedback global, usar **Sonner**, no el Toast legado.

### Objetivo frontend

Demostrar:

- Clipboard API;
- async state;
- feedback;
- error fallback;
- microinteraction.

### Requisitos

Estados mínimos:

- idle;
- copied;
- error.

El feedback debe ser comprensible sin depender únicamente de un toast.

---

## 8. Componentes no aprobados para esta fase

### Alert Dialog

No existe una acción destructiva o irreversible que lo justifique.

### Hover Card

No debe usarse para información esencial y no mejora mobile.

### Menubar

No corresponde a la arquitectura de información del portfolio.

### Native Select

Dos idiomas no justifican un select.

### Navigation Menu

La navegación principal no tiene jerarquía suficiente para justificar un mega/navigation menu.

### Dropdown Menu

No aprobado salvo que surja un conjunto real de acciones secundarias.

### Popover

No aprobado salvo necesidad concreta de acciones contextuales.

### Tabs

No deben usarse para fragmentar el case study principal.

Podrán evaluarse en una fase posterior para comparaciones acotadas, por ejemplo:
- Desktop / Mobile;
- Before / After;
- Architecture / Flow.

Debe existir una necesidad real.

---

## 9. ProjectCard — contrato mobile

La card debe mantener esta jerarquía:

1. evidencia/captura;
2. estado;
3. título;
4. resumen;
5. rol;
6. stack breve;
7. CTA.

### CTA

En mobile:

- visible sin hover;
- ancho suficiente;
- target mínimo 44 px;
- texto explícito;
- flecha opcional;
- no quedar pegado al borde inferior.

### Accesos redundantes permitidos

Pueden navegar al caso:

- título;
- captura;
- CTA.

No convertir toda la card en un único anchor si contiene otras acciones.

### Acceptance

A 360 / 390 / 430 px:

- CTA siempre visible;
- no overflow;
- no solapamiento;
- no corte por alturas implícitas;
- texto no invade imagen;
- focus visible.

---

## 10. Diseño de case study

## 10.1 Desktop

Layout conceptual:

```text
┌───────────────┬──────────────────────────────────────┐
│ TOC sticky    │ Case study content                   │
│               │                                      │
│ Overview      │ Hero                                 │
│ Problem       │ Evidence                             │
│ Architecture  │ Sections                             │
│ UX            │                                      │
│ QA            │                                      │
│ Evidence      │                                      │
└───────────────┴──────────────────────────────────────┘
```

El TOC no debe reducir excesivamente el ancho de lectura.

## 10.2 Mobile

```text
Header

Project hero

[ Contenido ]

Main content

Evidence carousel

...
```

“Contenido” abre un Sheet/Drawer.

---

## 11. Design system integration

shadcn no define la identidad visual del portfolio.

Los componentes deben mapearse a los tokens actuales:

- `--canvas`;
- `--paper`;
- `--surface`;
- `--ink`;
- `--muted`;
- `--line`;
- `--accent`;
- `--accent-strong`;
- `--accent-soft`;
- `--night`;
- `--night-raised`;
- `--night-text`;
- `--focus`.

### Reglas

- no introducir una segunda paleta;
- no dejar componentes con apariencia default de shadcn si rompe coherencia;
- preservar radios y densidad actuales salvo razón UX;
- no convertir la UI en dashboard;
- motion entre 120–200 ms salvo interacción que requiera otra curva;
- respetar `prefers-reduced-motion`.

---

## 12. Estrategia Astro + React

### 12.1 Estructura propuesta

```text
src/
  components/
    astro/
      ...
    interactive/
      MobileNavigation.tsx
      ResponsiveMediaDialog.tsx
      EvidenceGallery.tsx
      CaseStudyNavigation.tsx
      CopyAction.tsx
    ui/
      ...componentes shadcn seleccionados
```

Codex puede ajustar nombres si mantiene la separación conceptual.

### 12.2 Regla de importación

Los componentes shadcn viven en la capa `ui`.

Los componentes de producto no deben exportar directamente detalles de primitivas.

Ejemplo:

`EvidenceGallery` puede usar `Carousel`, `Dialog` y `Drawer`, pero la página Astro consume `EvidenceGallery`, no las primitivas.

### 12.3 No estado global

Cada isla mantiene el mínimo estado local necesario.

No se comparte estado entre islas salvo que aparezca una necesidad material y pase Human Gate.

---

## 13. Progressive enhancement

Requisitos:

- anchors del case study funcionan sin tracking activo;
- contenido del proyecto existe en HTML;
- imágenes tienen links o fallback navegable cuando sea razonable;
- el portfolio no depende de React para mostrar contenido esencial;
- si falla una isla, la navegación general y lectura siguen siendo posibles.

No se exige equivalencia completa sin JavaScript para modal/carousel, pero sí acceso al contenido.

---

## 14. Accessibility contract

Todo incremento debe validar:

### Keyboard

- Tab alcanza todas las acciones;
- Shift+Tab funciona;
- Escape cierra overlays;
- Enter/Space activan controles correspondientes;
- arrows se usan sólo donde el patrón accesible lo define.

### Focus

- focus visible;
- focus trap dentro de Dialog/Drawer;
- focus restaurado al trigger;
- no focus oculto detrás de overlay.

### Screen reader

- nombres accesibles;
- títulos y descripciones de Dialog/Drawer;
- estado expandido;
- controles siguiente/anterior;
- índice de galería;
- estado “copiado” disponible.

### Touch

- targets >= 44 × 44 px;
- no acciones hover-only;
- no drag obligatorio sin alternativa.

### Motion

- reduced motion;
- no parallax;
- no scroll hijacking;
- no animaciones que bloqueen interacción.

---

## 15. Responsive validation matrix

Mínimo obligatorio:

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- 1024 px;
- 1440 px.

La automatización existente ya cubre:

- 360;
- 768;
- 1440.

Codex debe ampliar las pruebas manuales o automatizadas para cubrir 390 y 430 en las interacciones críticas.

### Rutas prioritarias

- home ES;
- home EN;
- HMS Cloudflare ES/EN;
- Alquileres Uspallata ES/EN.

HMS es el caso principal para validar comportamiento complejo.

---

## 16. Performance contract

Se preservan los thresholds actuales de Lighthouse:

- Performance >= 0.90;
- Accessibility >= 0.95;
- Best Practices >= 0.95;
- SEO >= 0.95.

Además:

- React no debe hidratar toda la página;
- MobileNavigation puede usar `client:load`;
- componentes below-the-fold deben preferir `client:idle` o `client:visible` cuando corresponda;
- no introducir paquetes grandes sin justificación;
- imágenes no deben perder dimensiones explícitas;
- no agregar autoplay;
- no convertir capturas a fondos CSS si son contenido.

Si una dependencia baja Lighthouse bajo el gate, el resultado es REWORK.

---

## 17. Testing contract

Codex debe definir y ejecutar tests en tres niveles.

### 17.1 Unit / component

Cuando sea proporcional:

- estado del ResponsiveMediaDialog;
- índice de EvidenceGallery;
- comportamiento de CopyAction;
- lógica de active section.

### 17.2 Browser behavior

Debe probarse al menos:

#### MobileNavigation
- abre;
- cierra;
- Escape;
- navegación;
- focus restore.

#### ResponsiveMediaDialog
- Dialog desktop;
- Drawer mobile;
- close;
- next/previous;
- keyboard.

#### EvidenceGallery
- índice;
- controls;
- mobile;
- dialog integration.

#### CaseStudyNavigation
- anchors;
- sección activa;
- Sheet mobile.

#### ProjectCard
- CTA visible y navegable en mobile.

### 17.3 Regression

- `npm run check`;
- `npm run qa:release`;
- Lighthouse;
- Visual Review;
- no overflow;
- ES/EN parity.

---

## 18. Evidencia requerida por incremento

Cada PR de BUILD debe incluir:

1. objetivo;
2. componente o comportamiento;
3. rutas afectadas;
4. desktop evidence;
5. mobile evidence;
6. tests ejecutados;
7. resultados;
8. riesgos residuales;
9. Independent Critic verdict;
10. Integration Review verdict.

No aceptar “se ve bien” como evidencia.

---

## 19. Secuencia de BUILD propuesta

Codex no debe implementar todo en un único PR.

### Incremento 0 — Foundation

- integrar React en Astro;
- configurar shadcn para el proyecto existente;
- aliases si hacen falta;
- adaptar tokens;
- Button/Sheet/Dialog/Drawer base;
- sin rediseñar páginas.

**Gate:** build + Lighthouse + smoke visual.

### Incremento 1 — Mobile Project Access + Navigation

- corregir CTA mobile;
- MobileNavigation con Sheet;
- validar 360/390/430.

**Gate:** P0 resuelto.

### Incremento 2 — Responsive Media Viewer

- ResponsiveMediaDialog;
- Desktop Dialog;
- Mobile Drawer;
- una ruta piloto: HMS.

### Incremento 3 — EvidenceGallery

- grid desktop;
- carousel mobile;
- integración con viewer;
- navegación de imágenes.

### Incremento 4 — CaseStudyNavigation

- TOC generado;
- sidebar desktop;
- Sheet mobile;
- active section tracking.

### Incremento 5 — CopyAction + microfeedback

- copiar email;
- feedback inline;
- Sonner sólo si sigue justificado.

### Incremento 6 — Portfolio-wide hardening

- ES/EN;
- HMS + Alquileres;
- responsive;
- accessibility;
- performance;
- visual polish;
- documentation.

Cada incremento pasa VALIDATE antes de continuar si toca una primitiva base o una interacción crítica.

---

## 20. Estrategia de subagentes para Codex

Para cada incremento:

```text
Controller contract
      ↓
Codex Orchestrator
      ↓
Frontend Specialist
      ↓
Responsive/A11y Specialist
      ↓
QA Specialist
      ↓
Independent Critic
      ↓
Integration Review
      ↓
PASS / REWORK / HUMAN_GATE
```

### Reglas

- cada subagente recibe scope, inputs, outputs y criterios;
- evitar pedir “revisa todo el portfolio” a un specialist;
- Critic recibe el contrato original, no sólo el resumen del implementador;
- Integration Review ocurre después de Critic;
- cualquier cambio de arquitectura vuelve a Human Gate.

---

## 21. Human Gates

Se requiere Human Gate antes de:

- BUILD inicial;
- migrar más partes a React;
- agregar estado global;
- agregar nuevas dependencias relevantes;
- cambiar la identidad visual;
- cambiar la IA de la home;
- reemplazar el case study por tabs;
- añadir componentes no aprobados;
- cambiar thresholds de QA;
- aceptar una regresión de performance;
- cambiar el objetivo de “portfolio demostrativo” por “component showcase”.

---

## 22. Criterios de aceptación de producto

El trabajo se considera exitoso cuando:

1. el caso de estudio es accesible claramente desde mobile;
2. el header mobile deja de ser una grilla comprimida;
3. el portfolio demuestra React sin convertirse en una SPA;
4. la galería se siente natural en touch;
5. Dialog y Drawer responden al dispositivo;
6. los case studies largos se pueden recorrer con claridad;
7. teclado y focus funcionan;
8. no hay dependencia de hover;
9. Lighthouse mantiene los gates;
10. no aparece una estética genérica shadcn;
11. ES/EN mantienen paridad;
12. el portfolio sigue cargando contenido esencial desde Astro;
13. la interacción agrega valor real;
14. un reviewer puede identificar decisiones frontend concretas;
15. la implementación puede explicarse en una entrevista técnica.

---

## 23. Qué debería poder explicar Sebastián en una entrevista

Después de este trabajo, el portfolio debe permitir responder con ejemplos reales:

- por qué se mantuvo Astro;
- por qué React se usó sólo en islas;
- cuándo usar `client:load` vs `client:idle` / `client:visible`;
- cómo se compuso Dialog desktop + Drawer mobile;
- cómo se manejó focus;
- cómo se modeló una galería responsive;
- cómo se usó IntersectionObserver;
- cómo se evitó estado global innecesario;
- cómo se preservó performance;
- cómo se validó mobile;
- cómo se adaptó shadcn a un design system existente;
- cómo se diseñó una interacción usable con teclado y touch.

---

## 24. Fuentes técnicas de referencia

Referencias externas autorizadas para BUILD:

- shadcn/ui — Astro installation: https://ui.shadcn.com/docs/installation/astro
- shadcn/ui — Drawer / responsive Dialog: https://ui.shadcn.com/docs/components/base/drawer
- shadcn/ui — Tailwind v4: https://ui.shadcn.com/docs/tailwind-v4
- Astro — React integration: https://docs.astro.build/en/guides/integrations-guide/react/
- Astro — Framework components / client directives: https://docs.astro.build/en/guides/framework-components/

Codex debe volver a verificar documentación vigente antes de instalar o migrar dependencias.

---

## 25. Gate actual

### Estado

**DEFINITION/DESIGN MASTER CONTRACT: READY FOR HUMAN REVIEW**

### BUILD

**BLOCKED**

### Próxima decisión humana

Aprobar o modificar:

- arquitectura Astro + React Islands;
- componentes aprobados;
- secuencia de incrementos;
- criterios de aceptación;
- estrategia de subagentes;
- límites de shadcn.

Sólo después de esa aprobación Codex puede comenzar Incremento 0.

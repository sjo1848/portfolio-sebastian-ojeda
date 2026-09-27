# Frontend Interaction Layer — Master Plan

## Estado

**Versión:** 2.1 — Excellence Rework after Independent Critic  
**Fase actual:** DEFINITION → DESIGN  
**Build:** BLOQUEADO hasta Human Gate  
**Issue de control:** #75  
**Implementador:** Codex  
**Controller / UX-Frontend Architect + Gatekeeper:** ChatGPT  
**Fuente de verdad:** este documento + `docs/12-project-method.md`

---

## 1. Propósito

Evolucionar el portfolio de Sebastián Ojeda hacia un producto frontend de excelencia que cumpla simultáneamente cuatro objetivos:

1. **Convertir mejor:** que recruiters, engineering managers y technical leads entiendan rápido el perfil, encuentren evidencia y lleguen a los casos de estudio sin fricción.
2. **Demostrar frontend:** que la propia experiencia evidencie React, TypeScript, responsive composition, accesibilidad, state management acotado, browser APIs y criterio de interacción.
3. **Preservar calidad técnica:** mantener Astro como shell estático, limitar JavaScript cliente, conservar SEO, performance, resiliencia y trazabilidad.
4. **Mostrar criterio de producto:** la excelencia no se demostrará por cantidad de componentes, sino por decisiones justificadas, detalle de interacción, consistencia y validación.

El objetivo no es “usar shadcn”. El objetivo es que el resultado parezca diseñado y construido deliberadamente, no ensamblado desde una librería.

---

## 2. Definición de excelencia

Para esta iniciativa, **producto de excelencia** significa:

- claridad antes que ornamentación;
- interacción útil antes que interactividad decorativa;
- mobile diseñado como experiencia propia;
- evidencia visible antes que claims;
- estados completos, no sólo happy path;
- accesibilidad tratada como contrato;
- performance controlada como presupuesto;
- comportamiento consistente entre navegadores;
- fallos degradados de forma segura;
- decisiones frontend explicables en una entrevista;
- ausencia de deuda visual evidente;
- ausencia de “component zoo”.

Una implementación técnicamente correcta que se sienta genérica, inconsistente, pesada o innecesariamente compleja **no pasa**.

---

## 3. Audiencias y journeys críticos

### 3.1 Recruiter — scan de 10–30 segundos

Debe poder:

1. identificar a Sebastián;
2. clasificarlo como Full-Stack Software Developer;
3. entender el diferenciador;
4. ver proyectos reales;
5. abrir un caso de estudio sin buscar el CTA.

### 3.2 Technical reviewer — 3–5 minutos

Debe poder:

1. entrar a un caso;
2. orientarse dentro de un documento largo;
3. encontrar arquitectura, decisiones, QA y evidencia;
4. ampliar screenshots;
5. navegar entre evidencias;
6. abrir repositorio cuando corresponda.

### 3.3 Mobile recruiter

Debe poder completar el journey principal con una mano, sin hover y sin menús comprimidos:

`Header → Proyectos → Caso de estudio → Evidencia → Contacto/GitHub`.

### 3.4 Reviewer accesible por teclado

Debe poder completar las mismas tareas sin mouse, con foco siempre visible y nunca oculto por headers, drawers o overlays.

---

## 4. North Star de experiencia

La experiencia debe sentirse:

- **rápida**: sin espera perceptible para navegar contenido;
- **calma**: motion breve, sin estímulos constantes;
- **precisa**: acciones obvias, estados claros;
- **editorial-técnica**: producto y evidencia dominan sobre chrome;
- **coherente**: homepage y case studies pertenecen al mismo sistema;
- **robusta**: si una isla React falla, el contenido esencial permanece disponible.

### Anti-objetivos

No debe sentirse como:

- dashboard SaaS;
- showcase de shadcn;
- template genérico;
- landing con animaciones;
- SPA innecesaria;
- portafolio “hacker”;
- playground de efectos frontend.

---

## 5. Roles y responsabilidades

### 5.1 Controller / UX-Frontend Architect + Gatekeeper — ChatGPT

Responsabilidades:

- custodiar fase, alcance y decisiones;
- mantener este contrato;
- definir journeys, behavior contracts y criterios de aceptación;
- abrir Human Gates ante cambios materiales;
- revisar outputs y evidencia;
- exigir Independent Critic;
- ejecutar Integration Review;
- bloquear BUILD cuando falte evidencia o exista contradicción.

No implementa código productivo de esta iniciativa.

### 5.2 Implementador — Codex

Codex es el único implementador autorizado.

Antes de tocar código debe:

1. leer `docs/12-project-method.md`;
2. leer este documento completo;
3. revisar baseline relevante;
4. emitir plan de incremento;
5. asignar subagentes;
6. declarar archivos y rutas que espera modificar;
7. declarar riesgos.

Codex no puede:

- migrar el portfolio completo a React;
- introducir estado global sin Human Gate;
- agregar primitivas no aprobadas;
- cambiar la identidad visual;
- bajar gates de QA;
- aceptar performance regression como “trade-off” sin aprobación;
- fusionar su propio trabajo sin critic independiente.

### 5.3 Subagentes mínimos

Cada incremento debe utilizar roles separados:

**Frontend / React Specialist**
- Astro/React;
- TypeScript;
- composition;
- state;
- shadcn.

**Responsive / Interaction Specialist**
- touch;
- layout;
- breakpoints;
- safe areas;
- interaction details.

**Accessibility Specialist**
- keyboard;
- focus;
- ARIA;
- reduced motion;
- WCAG 2.2.

**QA / Browser Specialist**
- Playwright;
- cross-browser;
- visual evidence;
- regression.

**Independent Critic / Verifier**
- revisa contra el contrato original;
- no implementa;
- emite PASS / REWORK / HUMAN_GATE.

**Integration Review**
- evalúa producto completo;
- busca inconsistencias, duplicación, deuda y sobreingeniería.

Un agente que implementó un cambio no puede emitir su PASS final.

---

## 6. Arquitectura aprobada

### 6.1 Decisión

**Astro + React Islands + shadcn/ui selectivo.**

Astro conserva:

- routing;
- layouts;
- contenido;
- Markdown;
- SEO;
- generación estática;
- estructura semántica;
- contenido esencial.

React se usa exclusivamente para comportamiento interactivo con estado cliente.

### 6.2 Precedencia documental

Para esta iniciativa, la precedencia es:

1. decisiones explícitas del usuario y Human Gates vigentes;
2. este Master Plan;
3. `docs/12-project-method.md`;
4. branding/definition y decisiones aprobadas posteriores;
5. documentación histórica previa.

Los documentos iniciales que todavía muestran CV visible en header/home o un set anterior de proyectos se consideran baseline histórico en esos puntos. Una decisión posterior del portfolio eliminó deliberadamente los CTA visibles de CV y priorizó casos de estudio, GitHub y contacto. Este incremento **no reintroduce CV visible** salvo un nuevo Human Gate.

### 6.3 Principio de islas

Cada isla debe responder:

> ¿Qué comportamiento específico requiere JavaScript cliente y por qué no conviene resolverlo sólo con HTML/CSS?

Si no existe una respuesta material, no debe ser React.

Astro permite hidratar sólo componentes explícitos y usar prioridades distintas con `client:load`, `client:idle` y `client:visible`. Esa propiedad es parte de la solución, no sólo una optimización posterior.

### 6.4 No aprobado

- SPA routing;
- React root global;
- Redux/Zustand/contexto global de aplicación;
- hydration de secciones estáticas;
- duplicar contenido Astro dentro de React;
- reemplazar Stone / Andes Copper por estilos default de shadcn.

---

## 7. Fuente única de contenido

La capa interactiva no debe crear una segunda fuente de verdad.

### CaseStudyNavigation

Debe derivar headings de Astro Content.

`render(project)` expone `headings`; Astro también genera IDs para headings Markdown. Se debe aprovechar esa estructura para producir el TOC y pasar sólo los datos necesarios a la isla React.

No mantener manualmente:

- lista de headings en Markdown;
- lista duplicada en TS;
- lista duplicada en React.

### Gallery

Metadata de media permanece en la fuente actual de media/proyecto. React recibe un modelo serializable, no vuelve a descubrir contenido en runtime.

### TOC compuesto

El TOC se deriva en build/render time a partir de dos fuentes controladas:

1. **secciones estructurales de la página** con IDs estables, por ejemplo evidencia visual cuando existe;
2. **`render(project).headings`** para headings provenientes del Markdown.

La composición ocurre una sola vez antes de pasar props a React. No se mantiene una lista manual distinta por proyecto y no se redescubren headings en runtime.

---

## 8. Baseline obligatorio antes de BUILD

Incremento 0 empieza con medición, no con instalación.

Codex debe registrar:

- bundle actual;
- JavaScript cliente actual por ruta;
- Lighthouse actual;
- screenshots baseline;
- navegación actual 360/390/430;
- current layout shifts observables;
- CTA de ProjectCard en mobile;
- comportamiento de galleries;
- console warnings/errors;
- rutas prioritarias ES/EN.

El baseline se guarda como evidencia.

Sin baseline no se puede afirmar “sin regresión”.

---

## 9. Componentes de producto aprobados

### 9.1 MobileNavigation

**Desktop:** navegación inline.  
**Mobile:** trigger + Sheet.

Debe demostrar:

- responsive composition;
- state;
- focus management;
- overlay;
- keyboard;
- React island.

Requisitos:

- nombre visible;
- ES/EN visible;
- trigger mínimo 44×44;
- `aria-expanded`;
- Escape;
- focus trap;
- focus restore;
- navegación vertical;
- cierra después de elegir destino;
- body sin scroll accidental;
- ningún enlace esencial depende de JS para existir en el producto completo;
- no layout jump al hidratar.

**Hidratación:** `client:load`.

#### Detalle de excelencia

- hover sólo como enhancement bajo dispositivos con hover;
- active/pressed state consistente;
- overlay no debe producir parpadeo;
- apertura/cierre debe sentirse instantánea;
- no scroll “teleport” al cerrar;
- validar iOS/WebKit.

---

### 9.2 ResponsiveMediaViewer

Abstracción de producto única.

**Desktop:** Dialog.  
**Mobile:** Drawer casi fullscreen o equivalente aprobado.

No exponer primitivas directamente a la página.

Debe demostrar:

- responsive composition;
- modal state;
- breakpoint behavior;
- reusable API;
- focus management.

Requisitos:

- título;
- caption/description;
- close explícito;
- Escape;
- focus trap;
- focus restore;
- inert background;
- safe areas;
- imagen sin crop destructivo;
- zoom del navegador no rompe layout;
- no horizontal overflow;
- next/previous si pertenece a gallery;
- index actual visible;
- loading/error state de imagen;
- fallback “abrir imagen original” si la visualización falla.

#### Mobile

- usar `100dvh`, no asumir `100vh`;
- considerar safe-area insets;
- swipe no puede ser la única forma de cerrar o navegar;
- no utilizar snap points salvo que exista necesidad de producto.

---

### 9.3 EvidenceGallery

**0 assets:** no renderizar container vacío.  
**1 asset:** evidencia estática + viewer, sin carousel.  
**2+ assets:** grid desktop + carousel mobile.

Esto evita introducir carousel donde no aporta.

Debe demostrar:

- derived state;
- touch;
- keyboard;
- responsive composition;
- integración Gallery → Viewer.

Requisitos:

- no autoplay;
- no loop infinito por default;
- previous/next;
- índice actual;
- swipe + botones;
- teclado;
- reduced motion;
- alt/captions;
- dimensiones explícitas;
- lazy loading;
- preserve aspect ratio;
- error fallback;
- no pérdida de contexto al cerrar viewer;
- el asset completo debe poder verse sin crop destructivo;
- thumbnails pueden usar un recorte curado sólo si el viewer conserva el asset completo y el recorte no oculta el significado de la evidencia.

#### GIF evidence

La galería actual ya soporta GIFs y esa capacidad se preserva:

- no autoplay;
- carga diferida;
- reproducción sólo por acción explícita;
- control Play/Stop accesible;
- el usuario puede pausar la animación;
- fallback/link al GIF original;
- no descargar el GIF animado antes de que la interacción o estrategia de carga lo justifique.

**Hidratación:** preferir `client:visible`.

El carousel de shadcn usa Embla; cualquier adopción debe registrar impacto de bundle.

---

### 9.4 CaseStudyNavigation

#### Desktop ancho

Sidebar sticky.

#### Tablet / mobile

Trigger “Contenido” + Sheet/Drawer.

No forzar sidebar en anchos donde reduzca lectura.

Breakpoint recomendado para sidebar: evaluar a partir de la zona desktop real del diseño, probablemente alrededor de `68.75rem`, no automáticamente a 48rem.

Debe demostrar:

- Astro headings;
- IntersectionObserver;
- derived state;
- anchors;
- sticky layout.

Requisitos:

- TOC derivado de headings reales;
- anchors funcionan sin tracking;
- active section clara y redundante;
- sticky header no tapa el destino;
- `scroll-margin-top` / `scroll-padding-top`;
- no scroll hijacking;
- historial/back funcionan;
- mobile Sheet cierra al navegar;
- hidratación no mueve layout.

**Hidratación:** `client:idle` si los anchors base ya funcionan sin JS.

---

### 9.5 CopyAction

Uso:

- copiar email;
- copiar link del case study si sigue aportando.

Estados:

- idle;
- pending;
- copied;
- error.

Requisitos:

- Clipboard API;
- fallback si Clipboard API no está disponible;
- feedback inline obligatorio;
- Sonner opcional y complementario, nunca única señal;
- anuncio accesible del estado;
- reset no abrupto.

---

## 10. Componentes explícitamente no aprobados

No se añaden en esta fase salvo Human Gate:

- Alert Dialog;
- Hover Card;
- Menubar;
- Native Select;
- Navigation Menu;
- Dropdown Menu;
- Popover;
- Tabs como estructura primaria;
- Sidebar global de aplicación;
- Skeletons artificiales para contenido estático.

### Tabs

Sólo podrían aprobarse más adelante para comparaciones locales:

- Desktop / Mobile;
- Before / After;
- Architecture / Flow.

Nunca para esconder el case study principal.

---

## 11. ProjectCard — P0 mobile

La card debe mantener:

1. evidencia;
2. estado;
3. título;
4. resumen;
5. rol;
6. stack breve;
7. CTA.

### Acceso al case study

Se permiten tres entradas coherentes:

- captura;
- título;
- CTA explícito.

No hacer toda la card un enlace si existen acciones secundarias.

### CTA mobile

- siempre visible;
- no depende de hover;
- mínimo 44 px de área;
- jerarquía visual clara;
- separación suficiente;
- no recortado por overflow/height.

### Gate P0

Debe probarse en:

- 360;
- 390;
- 430 px.

Y en cards:

- hero;
- story;
- secondary;
- con imagen;
- sin imagen;
- resumen corto/largo.

---

## 12. Diseño del case study

### 12.1 Desktop

```text
┌────────────────┬────────────────────────────────────┐
│ TOC            │ Hero                               │
│ sticky         │                                    │
│                │ Summary / Metadata                 │
│ Overview       │                                    │
│ Problem        │ Evidence                           │
│ Architecture   │                                    │
│ UX             │ Main content                       │
│ QA             │                                    │
│ Result         │                                    │
└────────────────┴────────────────────────────────────┘
```

El ancho principal de lectura debe seguir dentro de aproximadamente 60–75 caracteres.

### 12.2 Tablet

No asumir sidebar.

Priorizar lectura y usar trigger de contenido si el sidebar comprime excesivamente.

### 12.3 Mobile

```text
Header
Project hero
Primary actions
[ Contenido ]
Case content
Evidence carousel
Next project / Contact
```

El usuario nunca debe llegar a un dead-end al final de un caso.

---

## 13. Design system y craft visual

shadcn aporta primitivas; **Stone / Andes Copper define la identidad**.

Todos los componentes deben mapearse a tokens existentes.

### Craft requirements

- spacing coherente con escala existente;
- radios coherentes;
- border treatment coherente;
- overlays con opacidad consistente;
- estados hover/focus/active definidos;
- ninguna primitive queda con estilos default reconocibles;
- iconografía consistente;
- no usar iconos si un label textual es más claro;
- motion 120–200 ms en interacciones simples;
- curvas y duración consistentes;
- reduce motion elimina desplazamiento no esencial.

### Interaction polish

Cada control relevante debe definir:

- default;
- hover;
- focus-visible;
- active;
- open/expanded;
- disabled si existe;
- error si existe.

---

## 14. Accesibilidad — estándar de excelencia

### Target

**WCAG 2.2 AA como mínimo.**

Además se adopta internamente un estándar más fuerte para focus visible.

WCAG 2.2 incorpora, entre otros, Focus Not Obscured y Target Size Minimum. El portfolio mantendrá targets de **44×44 px** para controles principales, superior al mínimo normativo de 24×24 px.

### Focus

- nunca oculto por sticky header;
- nunca detrás de overlays;
- outline visible;
- objetivo interno: focus indicator equivalente al menos a un perímetro de 2 CSS px y contraste 3:1 cuando sea controlable;
- focus restore después de overlays.

### Keyboard

- flujo completo sin mouse;
- Escape;
- Enter/Space;
- arrows sólo en patrones correspondientes;
- no focus traps accidentales.

### Pointer / touch

- drag nunca es obligatorio;
- swipe tiene botones alternativos;
- controles no dependen de hover;
- evitar targets cercanos difíciles de tocar.

### Screen reader

- landmarks;
- nombres accesibles;
- Dialog/Drawer title y description;
- states expandidos;
- live feedback cuando corresponda;
- índice de carousel comprensible.

### Testing

Automático con axe/Playwright cuando sea viable, más revisión manual. Los tests automáticos no sustituyen el test manual de teclado y screen reader.

---

## 15. Performance y Core Web Vitals

Se mantienen como hard gates:

- Lighthouse Performance >= 0.90;
- Accessibility >= 0.95;
- Best Practices >= 0.95;
- SEO >= 0.95.

Además se adoptan como **targets de experiencia en campo**:

- **LCP <= 2.5 s**
- **INP <= 200 ms**
- **CLS <= 0.1**

Los Core Web Vitals se evalúan correctamente sobre datos reales, típicamente en el percentil 75. Por tanto:

- pre-release usa Lighthouse, bundle, layout-shift observado y tests de interacción como gates de laboratorio;
- CrUX/RUM se usa como evidencia de campo sólo cuando exista suficiente tráfico/dato disponible;
- no se agregará analítica o RUM únicamente para fabricar un PASS de esta iniciativa;
- la ausencia de datos de campo se documenta como `NOT_YET_OBSERVABLE`, no como PASS ni FAIL de CWV.

### Presupuesto de JavaScript

Antes de instalar React/shadcn se mide baseline.

Después:

- registrar bytes transferidos/gzip por ruta;
- registrar delta por incremento;
- home no carga Gallery/Viewer si no lo necesita;
- Gallery usa `client:visible`;
- TOC evita eager hydration;
- sólo MobileNavigation puede justificar `client:load` inicialmente.

### Soft budget inicial

Hasta medir el baseline, se establece como objetivo:

- **home initial client JS <= 100 KB gzip**;
- **case study initial client JS <= 150 KB gzip**, excluyendo código diferido de gallery cuando no es visible.

Si no se puede cumplir, no se baja silenciosamente el objetivo: se abre Human Gate con bundle breakdown.

### Otros gates

- cero hydration mismatch;
- cero console error;
- cero layout shift introducido por hidratación;
- no imagen LCP cargada con lazy;
- media below-the-fold sí puede usar lazy;
- no autoplay;
- dependencies auditadas.

---

## 16. Resiliencia y failure states

La excelencia incluye comportamiento cuando algo falla.

### React no hidrata

No se exige equivalencia total de las mejoras React. Se exige **traversability** y acceso al contenido esencial.

Debe permanecer utilizable sin la hidratación de una isla:

- contenido principal generado por Astro;
- brand/home link;
- ProjectCard CTA y links estáticos al case study;
- case-study back link;
- anchors nativos del contenido cuando existan;
- contacto y GitHub;
- links directos a assets de evidencia cuando el viewer no monta.

El Sheet mobile enriquecido puede dejar de abrir si la isla no hidrata; eso no puede bloquear el acceso a proyectos, lectura, retorno a home o contacto. No se afirmará paridad funcional completa sin JavaScript.

### Imagen falla

- container mantiene tamaño;
- fallback visual;
- caption sigue disponible;
- link a asset original cuando corresponda.

### Clipboard falla

- feedback de error;
- email sigue visible/copiable manualmente.

### IntersectionObserver no disponible/falla

- anchors siguen funcionando;
- sólo se pierde el active tracking.

### Drawer/Dialog

Si el componente interactivo no monta, el screenshot debe seguir siendo un enlace usable al asset.

---

## 17. Browser y device quality matrix

### Browsers

Automatizar con Playwright:

- Chromium;
- Firefox;
- WebKit.

### Device profiles mínimos

- Desktop Chromium;
- Desktop Firefox;
- Desktop WebKit;
- Mobile Chrome emulado;
- Mobile Safari/WebKit emulado.

### Width matrix visual

- 360;
- 390;
- 430;
- 768;
- 1024;
- 1440.

### Casos especiales

Validar específicamente:

- iOS/WebKit Drawer;
- `100dvh`;
- body scroll lock;
- sticky TOC;
- focus after close;
- carousel touch;
- orientation/resize básico.

---

## 18. Testing contract

### 18.1 Component / logic

Cuando sea proporcional:

- gallery index;
- copy state;
- TOC active-section derivation;
- responsive viewer state.

### 18.2 Browser interaction

#### MobileNavigation
- open;
- close;
- outside;
- Escape;
- focus trap;
- focus restore;
- navigate;
- body scroll;
- static traversal paths remain usable when the React island is deliberately prevented from hydrating.

#### ResponsiveMediaViewer
- desktop Dialog;
- mobile Drawer;
- next/previous;
- image error;
- keyboard;
- close.

#### EvidenceGallery
- 0/1/multiple assets;
- image and GIF assets;
- controls;
- swipe;
- keyboard;
- viewer integration;
- reduced motion;
- GIF Play/Stop and deferred loading;
- complete asset visible in viewer without destructive crop.

#### CaseStudyNavigation
- headings source;
- anchors;
- active section;
- sticky behavior;
- mobile sheet.

#### ProjectCard
- CTA mobile;
- image/title/CTA links;
- no clipping.

### 18.3 Accessibility scans

Axe debe ejecutarse:

- página base;
- mobile nav abierto;
- viewer abierto;
- TOC mobile abierto;
- carousel interaction state.

### 18.4 Visual states

Visual Review no debe capturar sólo páginas cerradas.

Debe guardar evidencia de estados:

- mobile nav open;
- Dialog open;
- Drawer open;
- carousel item intermedio;
- active TOC;
- ProjectCard 390 px;
- reduced-motion smoke cuando corresponda.

---

## 19. Quality Gates por incremento

Cada incremento requiere:

### Functional Gate
Comportamiento correcto.

### Responsive Gate
360/390/430 + desktop relevante.

### Accessibility Gate
Keyboard + axe + focus.

### Performance Gate
Bundle delta + Lighthouse relevante.

### Cross-browser Gate
Chromium + Firefox + WebKit para interacciones tocadas.

### Visual Craft Gate
Comparación con baseline y revisión humana.

### Independent Critic
PASS / REWORK / HUMAN_GATE.

### Integration Review
Comprueba coherencia de producto completo.

Un PASS técnico sin Visual Craft Gate e Integration Review no es suficiente.

---

## 20. Secuencia de BUILD revisada

### Incremento 0 — Baseline + Foundation

1. medir baseline;
2. integrar React;
3. configurar shadcn para Astro existente;
4. aliases;
5. tokens;
6. primitivas mínimas: Button, Sheet, Dialog, Drawer;
7. instalar sólo dependencias requeridas;
8. establecer Playwright cross-browser si no existe.

No modificar UX sustancial todavía.

**Gate:** no regresión baseline + bundle report.

---

### Incremento 1 — P0 Mobile Access + Navigation

- root-cause CTA mobile;
- corregir ProjectCard;
- captura/título/CTA;
- MobileNavigation Sheet;
- 360/390/430;
- WebKit mobile.

**Gate:** principal journey mobile completo.

---

### Incremento 2 — Responsive Media Viewer

Piloto HMS:

- Dialog desktop;
- Drawer mobile;
- focus;
- safe area;
- fallback link;
- media error state.

**Gate:** Desktop + Mobile Safari/WebKit.

---

### Incremento 3 — EvidenceGallery

- 0/1/multiple logic;
- grid desktop;
- carousel mobile;
- viewer integration;
- no autoplay;
- keyboard/touch.

**Gate:** interaction + bundle + a11y.

---

### Incremento 4 — CaseStudyNavigation

- usar `headings` de Astro;
- TOC único;
- sticky sólo donde aporta;
- tablet fallback;
- mobile Sheet;
- IntersectionObserver;
- anchors resilient.

**Gate:** lectura larga mejora sin comprimir contenido.

---

### Incremento 5 — Microfeedback

- CopyAction;
- inline feedback;
- Sonner sólo si mejora producto después de evaluar coste.

**Gate:** no agregar notification infrastructure sin uso suficiente.

---

### Incremento 6 — Excellence Hardening

- ES/EN;
- HMS;
- Alquileres;
- todos los variants de card;
- Chromium/Firefox/WebKit;
- axe;
- visual state matrix;
- Lighthouse;
- bundle;
- console;
- reduced motion;
- failure states;
- documentación.

---

## 21. Evidencia obligatoria por PR

Cada PR debe incluir:

1. fase;
2. objetivo;
3. baseline relevante;
4. scope;
5. fuera de scope;
6. subagentes utilizados;
7. rutas;
8. desktop screenshots;
9. mobile screenshots;
10. interaction-state screenshots;
11. tests;
12. browser matrix;
13. accessibility result;
14. Lighthouse;
15. bundle delta;
16. console status;
17. residual risks;
18. Independent Critic;
19. Integration Review;
20. decisión final.

No aceptar:

- “se ve bien”;
- “funciona local”;
- “tests verdes” sin evidencia de comportamiento;
- screenshots sólo desktop;
- aprobación del mismo implementador.

---

## 22. Human Gates

Human Gate obligatorio si se propone:

- React fuera de islas aprobadas;
- estado global;
- nueva primitive;
- dependencia relevante;
- animation library;
- cambio visual de marca;
- cambio de IA;
- tabs primarias;
- pérdida de progressive enhancement;
- performance por debajo de gate;
- bundle por encima del soft budget;
- cambio de breakpoint estructural;
- cambio de contenido/copy no requerido por la interacción;
- eliminación de evidencia;
- reducción de browser coverage;
- reducción de accessibility target.

---

## 23. Definition of Excellence

La iniciativa sólo puede declararse completada si:

1. el CTA mobile funciona de forma inequívoca;
2. el journey mobile principal puede completarse sin hover;
3. navigation mobile se siente nativa, no comprimida;
4. los case studies largos son fáciles de recorrer;
5. evidence viewing funciona con mouse, teclado y touch;
6. cada interacción tiene fallback razonable;
7. React está acotado a islas;
8. ninguna hidratación produce salto visual;
9. no hay errores de consola;
10. WCAG 2.2 AA es el mínimo de accesibilidad;
11. focus nunca queda oculto;
12. cross-browser pasa;
13. Lighthouse mantiene gates;
14. los gates de laboratorio no muestran regresión material y los CWV de campo quedan PASS/FAIL sólo cuando exista evidencia real suficiente;
15. bundle está medido y justificado;
16. shadcn no domina la identidad;
17. Stone / Andes Copper sigue siendo reconocible;
18. screenshots continúan siendo evidencia, no decoración;
19. ES/EN mantienen paridad;
20. Independent Critic da PASS;
21. Integration Review da PASS;
22. Sebastián puede explicar las decisiones técnicas sin recurrir a “lo hizo la librería”.

---

## 24. Interview Evidence

El resultado debe permitir explicar con código real:

- por qué Astro sigue siendo el shell;
- por qué React se limita a islas;
- elección de `client:load`, `client:idle`, `client:visible`;
- cómo se compone Dialog/Drawer;
- cómo se maneja focus;
- cómo se evita hydration shift;
- cómo se usa Astro `headings` para TOC;
- cómo funciona IntersectionObserver;
- cómo se diseña carousel con fallback;
- cómo se prueba Chromium/Firefox/WebKit;
- cómo se usa axe sin confundir automatización con accesibilidad completa;
- cómo se mide el coste de cada dependencia;
- cómo se protege performance;
- cómo se diseña mobile desde comportamiento y no sólo CSS.

---

## 25. Referencias técnicas autorizadas

Codex debe verificar documentación vigente antes de instalar.

- Astro Islands Architecture: https://docs.astro.build/en/concepts/islands/
- Astro Content Collections `render()` / `headings`: https://docs.astro.build/en/reference/modules/astro-content/
- shadcn Astro: https://ui.shadcn.com/docs/installation/astro
- shadcn Drawer / responsive Dialog: https://ui.shadcn.com/docs/components/base/drawer
- shadcn Dialog: https://ui.shadcn.com/docs/components/base/dialog
- shadcn Carousel: https://ui.shadcn.com/docs/components/base/carousel
- shadcn Sonner: https://ui.shadcn.com/docs/components/aria/sonner
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 changes: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Core Web Vitals: https://web.dev/articles/vitals
- Playwright browsers: https://playwright.dev/docs/browsers
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing

---

## 26. Gate actual

**EXCELLENCE REWORK: READY FOR HUMAN REVIEW**

BUILD continúa:

**BLOCKED**

La próxima decisión humana debe validar:

- definición de excelencia;
- journeys;
- arquitectura;
- component scope;
- accessibility target;
- performance/CWV contract;
- browser matrix;
- failure states;
- build sequence;
- evidence requirements.

Sólo después de ese Human Gate Codex puede iniciar Incremento 0.

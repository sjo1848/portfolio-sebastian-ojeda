# Issue #113 — Portfolio Visual & Motion Excellence

**Fase:** DISCOVERY → DEFINITION → DESIGN
**BUILD:** bloqueado hasta aprobación del Controller / Product Owner
**Auditoría:** 2026-09-29
**Producción:** https://sebastian-ojeda.pages.dev
**Baseline:** main c1834d627f468dfc61c34e764a4d7d4493c41117
**Naturaleza de este documento:** auditoría y diseño propuesto; no autoriza implementación.

## 1. Executive summary

El portfolio ya presenta con claridad el posicionamiento Full-Stack Software Developer, backend-oriented, y los tres lead cases aprobados: HMS Cloudflare, Alquileres Uspallata y AI Commerce + HMS. También mantiene estados honestos, arquitectura Astro-first, acceso bilingüe, contenido largo, galerías, Sheet móvil y navegación de caso.

La oportunidad es visual y compositiva: la calidad percibida de la superficie todavía no refleja toda la especificidad de la ingeniería que los casos documentan. El hero combina tipografía amplia, CTA y estados con un motivo radial abstracto, pero no muestra evidencia de producto antes del primer scroll. El primer proyecto sí tiene media aprobada; HMS Cloudflare no usa su captura autorizada como portada; AI Commerce carece de imagen de producto y su tratamiento tipográfico actual es honesto pero desigual. Capabilities, Experience y Method repiten una cadencia de encabezados y bloques.

Dirección recomendada: **Stone / Andes Copper — ingeniería editorial basada en evidencia**. Mantener paleta, claims, jerarquía, contenido esencial, HTML estático y patrones de interacción aprobados. Reducir el protagonismo decorativo del hero; conectar antes promesa y prueba con assets aprobados; diferenciar los tres lead cases por su evidencia real, no mediante UI simulada; sumar ritmo editorial a Home y case studies; y definir motion breve para feedback y continuidad espacial.

La propuesta altera el motivo visual actual del hero y la estrategia de medios above-the-fold. Son cambios materiales expresamente sujetos a HUMAN_GATE en #113. Estado recomendado para esta fase: **PASS FOR HUMAN GATE**, condicionado a los dos reviews y a decisión explícita del Controller/Product Owner. BUILD sigue bloqueado.

## 2. Current-state visual audit

### Cobertura y método

- Issue #113 completo, metodología del repositorio y las decisiones relevantes de Issues #99 y #108.
- Inspección de Home en producción a 360, 390, 430, 768, 1024, 1280 y 1440 CSS px; navegación abierta a 390 px.
- Inspección de HMS Cloudflare a 390 y 1440 px, Alquileres Uspallata y AI Commerce + HMS a 1440 px.
- Revisión de HomePage, ProjectCard, ProjectPage, CaseStudyContents, EvidenceGallery, ResponsiveMediaViewer, MobileNavigation y estilos globales/branding.
- Capturas Chromium mediante Playwright CLI y SHA-256 en output/playwright/issue-113-baseline/.
- No se modificó código, contenido, configuración, dependencia o runtime. No se ejecutaron Lighthouse ni regresión. Las mediciones existentes de #108 se citan como baseline, sin presentarlas como mediciones nuevas.

### Hallazgos

| Zona | Observación | Evaluación |
|---|---|---|
| Identidad | Canvas cálido, tinta, cobre, sans dominante, mono para metadatos | Base distintiva suficiente; mantener |
| Hero Home | Rol, orientación backend, dos acciones y tres estados; anillos radiales cobre | Copia eficaz; composición grande y abstracta, sin prueba visual en primer viewport |
| Cards lead | Orden aprobado; HMS/Alquileres tienen capturas, AI no tiene portada | Buena jerarquía y honestidad, pero tratamiento visual desigual |
| Header | Navegación inline en desktop; Sheet con idioma en mobile | Mobile claro; validar espacio/wrap a 768–1024 |
| Case heroes | Nombre, resumen, status, rol, año, repo y stack/evidencia | Buena información; peso y tratamiento cambian según disponibilidad de cover |
| Cases largos | Quick scan, galería y narrativa Markdown; Contents adaptativo | Buen esqueleto técnico; oportunidad para más contraste editorial dentro de la lectura |
| Secciones Home | Oscuro puntual, superficies claras y bloques separados | Coherente, pero Experience/Capabilities/Method comparten cadencia y chrome |
| Motion | Hover/focus de cards, underline, color de CTA, overlay y scroll-snap | Sobrio y barato; falta un sistema común visible |

Las páginas son legibles, funcionales y coherentes con la identidad aprobada. No hay evidencia de que se necesite otra paleta, nueva tipografía o arquitectura distinta. La deuda observada es de composición y jerarquía, no de componentes faltantes.

## 3. What must be preserved

- Astro para routing, contenido, Markdown, semántica, generación estática y SEO; React únicamente en islas que necesitan interacción real.
- Posicionamiento, claims aprobados, orden de los tres lead cases y acceso a los seis secundarios.
- Lifecycle/status separados de proof mode/readiness/provenance/limitations como en #108.
- Stone / Andes Copper, URLs canónicas, paridad ES/EN, estados de foco y experiencia sin JavaScript.
- Sheet móvil, Dialog/Drawer, galerías, viewer, GIF Play/Stop, quick scan y profundidad de los casos.
- No CV visible, no LinkedIn sin URL exacta aprobada, no analytics, no demos inventadas ni implementación en repos externos.

## 4. Recruiter: first 20 seconds

El primer viewport deja identificar el rol, la orientación backend, el valor de conectar workflows con software end-to-end, los tres casos líderes con su estado real, y un CTA a casos más GitHub. La comprensión textual es rápida y no depende de scroll.

La confianza visual llega después: no se muestra una interfaz o artefacto antes del primer scroll. En mobile los tres estados ocupan bastante altura y AI se envuelve en varias líneas. En desktop queda una superficie radial grande sin contenido. El CTA está visible y bien jerarquizado; no corresponde añadir CV, LinkedIn o un tercer CTA.

**Conclusión:** la promesa profesional se comprende en 10–20 s; la prueba visual está separada de esa promesa. La prioridad visual debe cerrar esa distancia sin rotar automáticamente los proyectos, duplicar acciones ni introducir una nueva navegación.

## 5. Home audit by section

| Sección | Lo que funciona | Dirección propuesta |
|---|---|---|
| Header/navigation | Marca, anclas y ES/EN visibles; Sheet en móvil | Mantener patrón; validar breakpoint y wrap en 768/1024, sin nueva acción global |
| Hero | H1 y orientación clara, CTA principal y GitHub | Balancear tipografía y prueba aprobada. No agrandar más el H1. Eliminar o reducir el radial abstracto si se aprueba HG-1 |
| Lead proof links | Tres casos y status a la vista | Conservar orden; tratar nombres como índice editorial y estados como segunda lectura. Evitar labels demasiado pequeños |
| Selected work | Exactamente tres leads, con caso y acción de evidencia | Marco común y escala legible para media. Diferenciar brownfield, producto con fixtures sintéticos y agente experimental |
| Capabilities | Capacidad agrupada y enlazada a pruebas | Reducir feeling de catálogo mediante tipos, separadores y espacio; sin nubes de logos |
| Experience | Contexto operativo relevante | Más compacto/editorial, sin timeline con fechas no verificadas |
| Method | Pasos observables y disclosure nativo | Contrastar su ritmo con Experience; mantener contenido disponible sin JS |
| About | Contexto humano singular | Afinar ancho, cortes y espacio; sin paisaje genérico ni retrato no aprobado |
| Secondary work | Los seis casos siguen accesibles | Presentarlos como índice/archivo con menos peso, no eliminarlos |
| Contact/footer | Email, copy inline, GitHub y ubicación | Cierre claro y sereno; no toast ni acción laboral no aprobada |

### Preguntas obligatorias, respuesta breve

1. Genérico/subdiseñado: motivo radial grande, falta de prueba visual en hero y repetición de cards/headers.
2. Distintivo: calidez Stone, cobre, tipografía expresiva, tono técnico y estados honestos.
3. Confianza inmediata: rol preciso, orientación backend, tres leads y status reales.
4. Evidencia en hero: no, aún no.
5. Diferenciación visual de leads: semántica sí; composición/media aún no.
6. Densidad: texto suficiente; jerarquía entre espacio y prueba desequilibrada. Roster de status ocupa mucho alto en mobile.
7. Motion actual: discreto, sin sistema unificador.
8. Aporte real: feedback de hover/foco/active, apertura modal y continuidad de imagen.
9. Daño probable: scroll-reveal general, blur, typing, delays o animar contenido largo.
10. Evidencia: correcta con captions, pero pequeños screenshots y portadas faltantes reducen legibilidad en preview.
11. Storytelling visual antes de narrativa: sí, quick scan y proof frame pueden guiar; sin borrar profundidad.
12. Simplificación: Experience/Capabilities/Method pueden tener cadencias diferentes y menos bloques con chrome idéntico.
13. Cards: cuidadas, pero repetición de radios/bordes/sombra las acerca a una plantilla de catálogo.
14. Stone / Andes Copper: suficientemente fuerte; refinar uso y contraste, no reemplazar tokens.
15. Mejor impacto/costo: reutilizar media aprobada, editorializar hero/cards/case hierarchy y usar CSS; sin nuevas islas.

## 6. Case-study audit by section

| Área | Hallazgo actual | Propuesta |
|---|---|---|
| Hero | HMS sin cover en esta zona pese a capturas locales; Alquileres muestra captura grande; AI es textual | Gramática común con variantes reales: screenshot, diagrama aprobado o hero tipográfico; no llenar todos los espacios por simetría |
| Metadata | Estado, rol, año y stack presentes | Jerarquía más clara label/valor; el status nunca depende sólo de color |
| Quick scan | Reduce síntesis de problema, ownership, arquitectura, evidencia/limitación | Mejor agrupación y orden visual; mantener datos verificables y link correcto |
| Gallery | Capturas/captions y assets reconocibles | Ampliar visualmente sin recortar significado; hacer provenance/limitación legible |
| Viewer | Dialog desktop / Drawer mobile con controles | Pulir continuidad de thumbnail, loading/error y close; conservar interacción existente |
| Contents | TOC sticky desktop y panel/fallback angosto | Active mark visible, anchors nativos y foco; sin scroll hijacking |
| Long-form | Columna legible, heading, tabla y code styles | Variar secciones por tipografía y reglas, no añadir card por párrafo |
| Proof CTA | Status y proof readiness ya están separados | Mantener copy state-based; screenshot no implica producción |
| Return route | CTA “back to projects” visible en hero | Puede repetirse al final del caso si el flujo lo necesita; no agregar router cliente |

### Tres lead cases

- **HMS Cloudflare:** caso de brownfield/migración. Ya existen capturas locales aprobadas de recepción, housekeeping, billing y admin. Mostrar una como prueba con caption/contexto; aceptación sigue siendo separada.
- **Alquileres Uspallata:** caso de producto de catálogo/gestión. Usar capturas sintéticas del runtime y conservar ese contexto. Los textos diminutos de la captura completa pierden legibilidad en la card.
- **AI Commerce + HMS:** caso de agente y gobernanza. Mantener fase 2.6 experimental/bajo validación. No hay portada de producto. Un diagrama estático derivado del case study puede apoyar comprensión sólo con revisión factual y etiqueta “arquitectura”, nunca como UI capturada.

## 7. Mobile, tablet and desktop findings

### 360–430

No hay overflow visible en las capturas. Nav Sheet, marca y trigger tienen presencia clara; hero muestra acciones y los tres casos. El estado ocupa bastante pantalla y Selected Work apenas comienza debajo del primer viewport. Recomiendo mantener el orden, comprimir la segunda lectura del estado y acercar el primer proof visual a la apertura. Mantener todo usable con una mano, targets ≥44 px y captions completos.

### 768

El header cambia a inline en 48rem; marca, seis links y selector caben, aunque con margen menor. El primer card pasa a distribución horizontal y su media domina. Validar longitud EN, zoom 200% y wrapping antes de congelar este breakpoint.

### 1024

Las tres cards aún usan grilla de dos columnas y el lead principal abarca el ancho. Evitar que parezca un panel de dashboard. Contents se mantiene como Sheet hasta 68.75rem, lo que protege lectura y es apropiado.

### 1440

Hay espacio para composición editorial, prueba grande, case TOC sticky y lectura de 680–760 px. Evitar grandes vacíos sin narrativa y no usar sidebar/chrome por toda la página.

La futura matriz visual ejecutable es 360/390/430/768/1024/1440 para Home y rutas prioritarias, con desktop/mobile states de nav, viewer, gallery y Contents. Una captura en una anchura no prueba toda la matriz.

## 8. Visual hierarchy

Hoy predominan la secuencia eyebrow mono → heading → body gris → card en surface; fondos distintos ayudan, pero la cadencia se repite. La propuesta crea tres escalas: hero/proof dominante, lead cases editoriales, soporte conciso. Diferenciar las superficies con proporción, ritmo, separadores y blancos, no con colores nuevos. Usar cobre para acción, foco, índice y active; reducir gradientes decorativos. Los medios deben ser legibles y conservar su contexto, no quedar como imagen de fondo de un marco tipo laptop. Secundarios continúan como archivo visual más liviano.

## 9. Motion-system proposal

El carácter de movimiento será preciso y silencioso:

| Token | Caso | Duración | Regla |
|---|---|---:|---|
| M0 | Base y reduced motion | 0 ms | Todo contenido está visible al render |
| M1 | CTA, nav, card y focus | 120–180 ms | Color/borde/subrayado, elevate máx. 2–3 px |
| M2 | Sheet/Dialog/Drawer/carousel | 160–220 ms | Opacity + translate mínimo; sin blur |
| M3 | Entrada de hero/proof, sólo si justificada | 180–240 ms, una vez | Fade + desplazamiento ≤8 px; sin texto por caracteres |

CSS primero; View Transitions sólo progresivamente mejoradas con navegación normal como fallback; Web Animations API únicamente si simplifica un patrón real. Propiedades preferidas: transform y opacity; evitar animar blur, layout, grandes sombras o scroll. Si reduced motion está activo, llegar al estado final inmediatamente, sin smooth scroll ni desplazamiento. Nunca esconder contenido esperando JS/intersection.

| Candidato | Decisión |
|---|---|
| Hero reveal | Opcional y muy breve, sólo si no retrasa paint |
| Lead stagger | No animar item por item en mobile; si se aprueba, grupos pequeños visibles desde el inicio |
| ProjectCard | Refinar estado existente; focus-within equivalente a hover |
| Evidence viewer | Continuidad visual corta y estado claro; navegación y media completas |
| Sheet/Dialog | Mantener overlay pattern; transiciones cortas con reduce |
| Carousel | Posición/selección visible; nunca autoplay ni loop |
| Scroll-reveal de headings | No global; no ocultar texto |
| TOC/nav/current state | Indicador simple color/borde, no seguir scroll con movimiento |
| Copy feedback | Mantener inline, inmediato; no Toast |
| Diagrama técnico | Animar sólo si enseña un flujo real; no prioridad inicial |

No cursor follower, parallax, typing, loop ambient, counters falsos, atención forzada o scroll custom.

## 10. Accessibility and reduced-motion implications

El futuro trabajo sostiene WCAG 2.2 AA; esta auditoría no declara un nuevo axe PASS.

- Mantener semántica, foco visible y orden de headings; nada esencial depende de color o movimiento.
- Verificar targets de 44×44 en botones de cerrar, nav, idioma, previous/next y copy.
- Sheet/Drawer/Dialog conserva label, descripción, focus trap/restore, Escape, fondo inert y safe areas.
- Carousel operable por teclado y touch; swipe no es obligatorio; posición, labels, caption y alt permanecen.
- Reduced motion cubre scroll, reveal, transiciones, cards y navegación de media. El contenido y estados aparecen completos por defecto.
- Revisar contraste de accent/muted/fondos y metadatos pequeños; priorizar ≥12 CSS px para labels auxiliares.
- QA futuro: axe en página base y estados abiertos, keyboard manual, inspección del accessibility tree y lectores de pantalla en overlays.
- GIF sigue con Play/Stop explícitos; no autoplay ni consumo antes de una estrategia/interacción justificada.

## 11. Performance and JS implications

Baseline documentado por Issue #108: Home initial client JS 94,062 B gzip / 100,000 B (margen 5,938 B); HMS/Alquileres case 95,343 B / 150,000 B; AI case 95,081 B. Delta de Wave 1: 0 B. #112 fue docs-only. Lighthouse de #108 pasó con la configuración y thresholds reportados; medianas Home 0.93 EN / 0.98 ES y Alquileres 0.96 EN / 0.94 ES. El lab LCP más alto de Alquileres ES fue 2,642 ms. Field CWV sigue NOT_YET_OBSERVABLE.

- Motion CSS: delta de client JS esperado 0 B; sin librería.
- El hero con imagen puede beneficiar confianza y empeorar LCP. El asset HMSC cover local es 1440×900, ~188 KB PNG; Alquileres desktop 1440×1200, ~140 KB PNG. Medir peso/formato responsive y candidato LCP antes de promoverlos; dimensions explícitas, hero media no lazy; below-fold sí diferida.
- Home tiene menos de 6 KB gzip de margen, por lo que no añadir island. CSS no suma JS, pero estilos pesados, fuentes o imágenes sí afectan render/bytes.
- Case gallery sigue con hidratación diferida existente; no descargar todas las imágenes al inicio.
- No bajar thresholds. Separar Lighthouse lab de field CWV; no afirmar Core Web Vitals de campo sin datos suficientes.

## 12. Component opportunities

| Patrón | Valor | Decisión |
|---|---|---|
| ProjectCard / EvidenceFrame | Compara proof, rol, estado, CTA | Evolucionar el componente existente |
| Proof header/metadata | Sitúa madurez y límites | Componer con el modelo #108, no duplicarlo |
| Dialog/Drawer/Sheet | Ver media, nav y Contents móvil | Ya aprobado; polishing visual y de estado |
| Carousel | Gallery mobile con 2+ items | Mantener sin autoplay |
| TOC | Caso largo | Mantener anchor nativo y progressive enhancement |
| Tabs | Contenido de caso | Sin caso; ocultan contenido y añaden estado |
| Toast | Copy email | No: feedback inline ya resuelve |
| Popover/Hover Card | Detalles por hover | No: información no debe depender de mouse |
| Navigation Menu | Expandir desktop | No: nav actual y Sheet bastan |
| Native Select | Filtrar portfolio | No hay flujo o volumen que lo necesite |
| Diagrama AI | Explicar policies/HITL/flujo | Condicional, estático, sourceable y revisado; no UI falsa |

Modernidad aquí significa componer patrones existentes con precisión, no exhibir una librería.

## 13. Token refinements

No hay necesidad de cambio cromático, otra familia tipográfica, tema oscuro o dependencia de fonts. Se puede formalizar escala de motion M0–M3, espacios entre heading/caption/media, borde como nivel base de elevación y una sola sombra en énfasis. Mantener radios actuales moderados, acento cobre actual y focus token. Refinar usos de tokens semánticos ya existentes, evitando alias duplicados. No se modifica branding dentro de Discovery.

## 14. Before/after behavior specification (no implementation)

| Journey | Hoy | Resultado propuesto |
|---|---|---|
| Recruiter Home | Entiende rol/casos/status antes del scroll; prueba visual abajo | Conserva texto/orden y encuentra proof real identificado en el primer tramo |
| Elegir lead | Dos tarjetas visuales y una principalmente tipográfica | Variantes de evidencia intencionales; ninguna UI inventada |
| Abrir caso | Hero, datos y acciones; quick scan sigue | Status/ownership y una prueba contextual más conectados; quick scan preserva limitación |
| Leer | Long form con headings y Contents | Secciones más diferenciadas; mismos anchors y profundidad |
| Abrir media | Viewer responsive y controles existentes | Origen/destino legible, imagen completa, controles/status visibles |
| Mobile | Sheet nav y Contents; cards apiladas | Composición dedicada, estados compactos, targets amplios; ningún hover requerido |
| Sin JS | Contenido y enlaces nativos | Igual disponibilidad; motion ausente no degrada el flujo |

Copy action mantiene confirmación inline.

## 15. Recommended visual direction

**Etiqueta operativa:** Stone / Andes Copper — editorial evidence studio. No constituye renaming de branding.

- Papel cálido, tinta, cobre selectivo, línea fina y surface oscura puntual.
- Hero tipográfico con balance y proof, no mayor H1 ni shape abstracta protagonista.
- Jerarquía de Home con los tres leads intactos; primera prueba HMSC aprobada junto al argumento si el gate de media/LCP se acepta.
- Cards con marco y caption coherentes, variantes por evidencia real: screenshot, diagrama técnico factual o tipografía.
- En case studies: problema/ownership/status primero, prueba después, narrativa profunda intacta; TOC sin competir con lectura.
- Secciones de soporte con ritmo tipográfico/editorial y menos repetición de chrome.
- En mobile: contenido en columna, roles/status bajo título, acción y primera prueba próximas, media completa y captions legibles.

La firma visual debe ser la evidencia de software real y cómo se explica. No una secuencia genérica de hero, logos, feature cards y paneles tipo pricing.

## 16. Contemporary references — pattern research only

- [Tarik Karahodžić — Portfolio Website (2025)](https://www.tarikkarahodzic.dev/projects/personal-site): presenta tono de página impresa, warm paper, tipografía y acento limitado. Aplicable como foco tranquilo sobre el trabajo; no copiar tipografía ni layout.
- [Jit Gohil — Portfolio Site Engineering (2025)](https://portfolio.jgohil.com/case-studies/portfolio-site): muestra el valor de explicar accesibilidad e ingeniería como parte de la UI, a la vez que un nivel alto de interacción/carrusel requiere inversión y superficie adicional. Aprendizaje: cada efecto exige un comportamiento y presupuesto; no transferir su dark mode/media complexity.
- [Codrops — Stefan Vitasović Portfolio (2025)](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/): portfolio dirigido a creative development cuyo núcleo profesional justifica motion/WebGL. Ayuda a definir el contraste: esa inversión no representa el perfil backend-oriented de Sebastián.

Las fuentes se consultaron el 2026-09-29; el informe deriva principios generales y no reproduce recursos, copy o layout.

## 17. Explicit non-goals

- No cambiar identidad, posicionamiento, claims, contenido profesional, jerarquía, proof model, status, SEO o canonical.
- No rehacer como SaaS/dashboard, cyberpunk, bento general, WebGL, dark mode o galería de efectos.
- No introducir librería de motion, isla nueva para decoración, router, estado global, analytics o tracking.
- No agregar CV visible ni LinkedIn, publicar demos, editar repos externos, crear screenshot/mockup artificial o atribuir métricas.
- No retirar secundarios, limitar lectura técnica, esconder contenido tras JS, cambiar thresholds o autoplay.
- No ejecutar BUILD en #113.

## 18. Proposed BUILD increments (not authorized)

Cada incremento tiene PR acotado, before/after ES/EN, evidence y revisión independiente, pero sólo comienza después de resolver los Human Gates.

### I0 — Visual baseline

Screenshots Home + 6 case routes ES/EN en 360/390/430/768/1024/1440; estados nav/Contents/Viewer/Drawer/Gallery; dimensión/hash; commit baseline; inventario media/provenance; console/layout shifts. Acceptance: reproducible manifest, sin cambios a contenido. No declarar matrices/browser que no se corrieron.

### I1 — Foundations / motion language

Formalizar tokens de espacio/media/elevación/motion M0–M3 y reduced motion. Acceptance: ningún paquete nuevo; contenido igual estático y sin hydration nueva; JS delta 0 B; focus/contrast no regresan; capturas de todos los estados.

### I2 — Hero + navigation polish

Conectar rol, proof links y media aprobada sin CTA extra. Acceptance: scan ≤20 s encuentra role, lead roster/status y prueba; media con provenance, dimensions y load priority; LCP medido antes/después; nav desktop/mobile/ES/EN con keyboard/touch; sin shift.

### I3 — Lead cards / selected work

Componer HMS/Alquileres/AI según evidencia propia. Acceptance: orden exacto; todos status/proof action desde modelo #108; assets aprobados; AI no tiene UI simulada; mobile no-hover; targets ≥44 px; lectura y contenido en ES/EN.

### I4 — Evidence presentation

Afinar media frame, caption, thumbnails y viewer. Acceptance: imagen completa en Dialog/Drawer, loading/error/original/prev/next/index/alt; focus trap/restore/Escape/inert/safe-area; GIF Play/Stop; no autoplay ni horizontal overflow.

### I5 — Case-study visual hierarchy

Jerarquizar quick scan, heading y evidencia sin perder profundidad. Acceptance: problema, ownership, arquitectura/backend/datos, seguridad, QA, trade-offs, estado, limits y repo accesibles en scan; anchors/back-forward; TOC desktop vs Sheet/fallback; diagram AI revisado; no-JS válido.

### I6 — Supporting sections / contact

Variar ritmo de Capabilities/Experience/Method/About/Contact. Acceptance: mismo contenido/claims, no tarjetas por párrafo, email/GitHub/copy inline, no CV/LinkedIn; HTML estático y ES/EN parity.

### I7 — Responsive/mobile composition

Diseñar para seis anchuras ejecutables. Acceptance: 360/390/430/768/1024/1440 sin overflow/wrap roto; secuencia semántica; menu Sheet; safe area/100dvh; captions, tables, code legibles; tap targets ≥44.

### I8 — Motion/accessibility/performance hardening

Acceptance: Chromium/Firefox/WebKit + Mobile profiles; keyboard; axe en base y overlay/carousel; reduced motion; no-JS; console/hydration 0; determinista screenshot diff; Lighthouse gates intactos; Home JS ≤100 KB gzip, case ≤150 KB; LCP lab/field separados.

### I9 — Release / Learn

Acceptance: CI y release QA, smoke ES/EN canonical, prod screenshots, SEO/canonical/sitemap/robots, browser matrix, console/hydration, bundle/Lighthouse, limitations/rollback, Independent Critic e Integration Review PASS. LEARN separa observación de recruiter de resultados medidos; sin analytics nuevas.

## 19. Global acceptance criteria

1. En 10–20 s se comprende rol, diferenciador backend, tres leads, status y ruta a evidencia.
2. Apariencia de portfolio técnico editorial; no template SaaS ni show de motion.
3. Media tiene alt/caption/dimensiones/provenance; ningún screenshot da claim de producción.
4. Status/proof no se codifican sólo por color ni proof mode infiere lifecycle.
5. AI no recibe UI falsa ni claim visual no validado.
6. Los seis casos secundarios permanecen accesibles.
7. Mobile sigue flujo semántico y funciona sin hover.
8. Motion tiene propósito y equivalente estático.
9. Reduced motion no esconde, demora o desplaza información.
10. No hay dependencia nueva ni regression de JS, lighthouse, browser, a11y, SEO o no-JS gates.
11. ES/EN mantiene semántica, copy, captions, status y orden.
12. No hay regresión material en los flujos de #78/#91/#99/#108.

## 20. Risks and contradictions

- Prueba visual above-the-fold favorece confianza, pero puede elevar LCP y repetirse en card.
- La captura de Alquileres representa datos sintéticos; al sacar su imagen del caption se pierde contexto.
- AI no tiene portada; igualar las tres cards mediante mock UI reduce honestidad y confianza.
- Reducir el radial visible cambia un motivo visual actual y requiere gate aunque se mantengan tokens.
- Textos EN/ES tienen altura distinta y pueden romper ritmo/layout.
- Home JS tiene solo 5,938 B de margen; no añadir islas.
- #108 Lighthouse refleja laboratorio/configuración reportados, no field CWV.
- No hay datos de recruiter conversion; uplift es hipótesis, no hecho.
- Issue #108 CDN cache residual fue aceptado y cerrado; no se reabre ni sondea desde esta auditoría.

## 21. Independent Critic

**PASS FOR HUMAN GATE.** El critic pidió REWORK de la captura Home 1024×768: el primer archivo repetía dimensiones y hash de Home 1440; un intento posterior capturó la ruta HMS Elite anterior en la sesión. Se rehízo en secuencia explícita: navegar al canonical Home, fijar 1024×768 y capturar. Inspección visual confirma Home, H1, CTA y los tres lead links; la inspección de archivo confirma 1024×768; SHA-256 b3dd035d98e77476d2d78fa5906b2e0c422e3b45253105e58596c65d617b56f1, distinto de Home 1440. SHA256SUMS se regeneró y el critic verificó el hash y la captura final. No hubo cambios de producto ni queda rework técnico.

## 22. Integration Review

**PASS — Integration Review.** El reviewer contrastó §§2–23 con Issue #113, main c1834d6, la evidencia de #99/#108, identidad Stone / Andes Copper, jerarquía recruiter, Astro-first, budgets, accessibility/SEO y el plan de incrementos. Confirmó que la propuesta conserva límites y estados, recomienda motion CSS-first/reduced-motion y diferencia patrones útiles de componentes innecesarios. Consideró justificados HG-1/HG-2 y el plan I0–I9 revisable. No encontró contradicciones ni scope creep. Tras el rework de la captura Home 1024×768, el informe no atribuye a la imagen errónea ninguna observación. No se ejecutó BUILD.

## 23. HUMAN_GATE decisions required

### HG-1 — Motivo/dirección del hero

- Problema: sustituir el protagonismo del radial con composición editorial basada en evidencia modifica materialmente el tratamiento de identidad.
- Evidencia: capturas Home 360/390/430/768/1024/1440 en output/playwright/issue-113-baseline; el primer viewport actual tiene rol/CTA/status, radial y ninguna captura.
- Opción A: conservar el radial, reducir escala/opacidad y mejorar jerarquía tipográfica; proof se queda en Selected Work.
- Opción B (recomendada): bajar o retirar el radial y usar composición editorial Stone/Andes Copper con prueba HMSC aprobada en el primer tramo, manteniendo H1, CTA y lead order.
- Trade-off: A es conservadora y evita peso/duplicación, pero separa promesa y prueba. B eleva especificidad y credibilidad, pero cambia identidad de composición y requiere medir LCP/diseño responsive.
- Decisión: Controller/PO acepta A o B antes de I2. BUILD sigue bloqueado.

### HG-2 — Ubicación/media above-the-fold

- Problema: elegir una imagen real como candidata LCP cambia estrategia de media y puede duplicar evidencia en el primer case card.
- Evidencia: HMSC cover aprobada 1440×900 aprox. 188 KB PNG; Alquileres 1440×1200 aprox. 140 KB PNG; AI no tiene portada. Home actual no carga captura en su primer viewport.
- Opción A: mantener Home hero tipográfico y usar HMSC cover únicamente en Selected Work.
- Opción B (recomendada si HG-1 B): promover una variante HMSC aprobada al hero; dar tratamiento distinto a la card para no repetir imagen; optimizar derivados responsivos; AI continúa tipográfico salvo diagrama estático revisado.
- Trade-off: A limita LCP/cambio de media; B muestra prueba antes y exige optimización, capturas comparables y aceptación de candidate LCP.
- Decisión: aprobación de ubicación y uso del asset antes de I2/I3; no requiere dependencia nueva.

### No requieren gate

Duraciones CSS, spacing, hover/focus, nombres internos y reuse de componentes dentro de dirección aprobada son decisiones rutinarias. No se propone motion library; no requiere gate.

**Fase actual:** PASS FOR HUMAN GATE. Independent Critic y Integration Review dieron PASS. La propuesta no autoriza BUILD. BUILD seguirá bloqueado hasta que Controller/PO resuelvan HG-1 y HG-2 explícitamente y emitan autorización nueva.

## Evidence and commands

- Contrato: gh issue view 113 --repo sjo1848/portfolio-sebastian-ojeda --json title,state,body,comments,url
- Baseline: git fetch origin main; git log -1 origin/main → c1834d6, cierre docs-only de Issue #108 (#112)
- Browser: Playwright CLI sobre canonical; Home 360×800, 390×844, 430×932, 768×1024, 1024×768, 1280×720 y 1440×1000; HMS 390×844/1440×1000; Alquileres y AI 1440×1000; Sheet abierto 390×844.
- Capturas + SHA-256: output/playwright/issue-113-baseline/
- Baseline de budgets/browser/Lighthouse: docs/qa/issue-108-wave-1-validation.md; no se reejecutó esa suite en Discovery.
- Research contemporáneo consultado el 2026-09-29; las fuentes están vinculadas en sección 16.
- No se ejecutó build/test ni se tocó producto, dependencias, lockfile, workflow, contenido publicado, SEO/config o runtime.

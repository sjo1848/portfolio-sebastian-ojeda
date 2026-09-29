# Issue #108 — estrategia de evidencia y demos del portfolio

**Fase:** DISCOVERY → DEFINITION → DESIGN
**Build:** no autorizado; este documento no implementa links, demos, animaciones ni cambios de producto.
**Portfolio auditado:** `sjo1848/portfolio-sebastian-ojeda`, `main` `aebccd0a424d9587f5f5bf09048371eb13f7c456` (29-09-2026).
**Contrato:** [Issue #108](https://github.com/sjo1848/portfolio-sebastian-ojeda/issues/108) y su último comentario del Product Owner sobre motion.
**Canónico de producción del portfolio:** `https://sebastian-ojeda.pages.dev`.

## 1. Executive summary

No conviene convertir los nueve casos en productos públicos. El portfolio debe ofrecer una prueba fácil de entender, segura y proporcional al estado real de cada proyecto. En esta revisión, las nueve entradas tienen `demo: null`; tampoco encontré una URL de producto pública verificada en el frontmatter ni en el campo `homepage` de los repositorios públicos consultados.

Recomiendo usar las capturas existentes para HMS Cloudflare y Alquileres, y evidencia visual acotada para HMS Elite, JM Soluciones y Taco Loco. AI Commerce, UspaYa y GasFlow podrían justificar un walkthrough grabado, sujeto a gates de sus propios proyectos. Agentic Engineering Governance debe permanecer como caso/repo only hasta tener artefactos públicos aprobados. Alquileres Cloudflare es candidato a `LIVE_PRODUCT` únicamente después de su propio release como producto de comunidad; no se debe crear un clon de demo en el portfolio.

No recomiendo ningún `CONTROLLED_DEMO` público permanente: en estos casos exigiría operar API, credenciales, datos, reset y abuso sin que eso mejore suficientemente la prueba laboral. Un walkthrough puede mostrar el runtime real sin convertir esa superficie en un servicio abierto. En la mayoría de casos el CTA principal debe continuar hacia el case study o evidencia ya disponible, y cambiar a “Abrir producto” o “Ver walkthrough” solo tras verificar gates y URL.

**HUMAN_GATE requerido:** cuatro assets locales de UspaYa están incluidos bajo `public/` y una captura de repartidor es accesible desde producción con HTTP 200. La imagen contiene datos de destino/contacto con apariencia personal; el repositorio del portfolio no conserva provenance que permita probar que esos valores concretos son sintéticos. No se la muestra en el case study, pero la ruta pública directa existe. Antes de mantener/publicitar esos archivos, el Product Owner debe confirmar provenance/autorización o elegir que se oculten/reemplacen. No hice cambios en ellos.

## 2. Inventario de evidencia de los nueve casos

En las nueve entradas de `content/projects/*.md` el campo `demo` está en `null`. Los case studies publicados responden en el canonical del portfolio; los nueve paths fueron consultados el 29-09-2026 y devolvieron HTTP 200. “Publicado” aquí significa case study del portfolio, no release del producto externo.

| Caso | Repo / URL declarada en el portfolio | Evidencia que el portfolio conserva hoy | Estado actual que se debe comunicar |
| --- | --- | --- | --- |
| HMS Cloudflare | [Repo](https://github.com/sjo1848/hms-cloudflare) | Cuatro capturas autorizadas locales de recepción, housekeeping, billing y administración; otras copias/variantes de algunos archivos están bajo `public/media/projects/hms-cloudflare/`. Case study documenta regresiones Playwright del runtime local y límites. | Migración técnicamente validada; aceptación remota, evidencia mobile del candidato y release son gates separados. |
| Alquileres Uspallata / futura Cloudflare | [Repo baseline](https://github.com/sjo1848/alquileres-uspa). [Lab Cloudflare](https://github.com/sjo1848/alquileres-uspa-cloudflare), sin URL de producto declarada. | Capturas desktop catálogo y ficha, más catálogo mobile 390 px; fuente/documentación, hashes y workflow de captura contrastados con el repo original. Todas son synthetic fixtures. | Alquileres original: desarrollo activo, sin despliegue. Lab Cloudflare está en DISCOVERY/FEASIBILITY y REWORK; no es producto publicado. |
| AI Commerce + HMS | [Repo](https://github.com/sjo1848/ai-commerce-platform) | Narrativa de staging/E2E en el case study; sin screenshot, GIF, walkthrough ni URL de runtime en el portfolio. | Fase 2.5 de staging con reservas/cancelaciones y HITL aceptada; fase 2.6 LLM Model Router sigue siendo trabajo actual. |
| UspaYa | [Repo](https://github.com/sjo1848/UspaYa) | Cuatro PNG locales bajo `public/media/projects/uspaya/`, sin entrada en `projectMedia.ts`, sin galería en el case study. Ruta directa de al menos la captura de courier devuelve 200. | Vertical frontend cerrada, hardening pre-piloto; repo declara no listo para piloto cerrado ni release público. |
| GasFlow | [Repo](https://github.com/sjo1848/gasflow) | El case study referencia PRD/backlog, arquitectura/ADR, backend, app, migraciones y CI. Sin capturas/video en `public/` ni un media set. | MVP funcional bajo desarrollo; README dice que screenshots verificados, build mobile distribuible y backend hosted están pendientes. |
| Agentic Engineering Governance | `repository: null`; los repos de implementación se describen como privados. | Solo caso escrito; no diagrama público versionado ni evidencia sanitizada de Context Amnesia Test en el portfolio. `evidenceNeeded` identifica esas lagunas. | Prototipos experimentales en validación; no release pública. |
| HMS Elite | [Repo](https://github.com/sjo1848/hotel-management-system) | Cover local más seis assets remotos versionados en `projectMedia.ts`: screenshots y dos GIFs, URLs raw de GitHub ancladas al commit `4df56a6217caab611f2f5fcbd98bde8386bb5629`. Las captions atribuyen los walkthroughs a dataset synthetic; el README fuente lo confirma para el demo seed. | Desarrollo activo; amplio sistema de referencia, sin demo hosted. |
| JM Soluciones | [Repo](https://github.com/sjo1848/jm-soluciones) | Una captura desktop local del orientador de servicios; caption ligada al workflow/commit `0a00f7f44735…`, sin PII identificada en la imagen revisada. Sin galería. | Sitio comercial estáticamente preparado para release; README de deploy deja URL/dominio final como pasos pendientes. No hay URL de producción aprobada en el portfolio. |
| Taco Loco | [Repo](https://github.com/sjo1848/taco-loco-foodtrack) | Capturas desktop y mobile del menú, locales bajo `public/media/projects/taco-loco/`; source caption atribuye la captura a Playwright del MVP. No hay walkthrough del pedido/intención ni demo URL. | MVP local funcional, no producto publicado. Pagos/entrega/confirmación automática quedan fuera; WhatsApp es continuación externa. |

### Rutas canónicas publicadas del portfolio

Las nueve rutas verificadas en el origin son `/projects/{slug}/` (y sus variantes `/es/projects/{slug}/`): `hms-cloudflare`, `alquileres-uspa`, `ai-commerce-platform`, `uspaya`, `gasflow`, `agentic-engineering-governance`, `hms-elite`, `jm-soluciones` y `taco-loco`. Ejemplo: [HMS Cloudflare](https://sebastian-ojeda.pages.dev/projects/hms-cloudflare/) y [Alquileres Uspallata](https://sebastian-ojeda.pages.dev/projects/alquileres-uspa/).

Las principales evidencias visuales están publicadas bajo `/media/` y/o se consumen desde `src/data/projectMedia.ts`. HMS Elite usa también `raw.githubusercontent.com` para media pinned al commit mencionado; esto crea dependencia externa de disponibilidad/cache y comparte metadata de solicitud con el CDN de GitHub. Las URLs de portfolio son case studies y archivos de evidencia, no demos del sistema.

## 3. URLs existentes y provenance

La inspección combinó el commit de portfolio arriba indicado, los case studies ES, `src/data/projectMedia.ts`, `src/components/ProjectPage.astro`, `src/data/projectQuickScans.ts`, `docs/qa/issue-99-increment-5-evidence-status.md`, y consultas de solo lectura a repos externos. No se modificó ningún repo externo.

| Caso/evidencia | Path o URL | Provenance y qué prueba | Caveat |
| --- | --- | --- | --- |
| HMSC reception | `public/media/projects/hms-cloudflare/cf-i04-reception-authorized.png` (1440×1899), SHA-256 `7c88509f…780378` | Portfolio commit `c435085` “Capture HMS screens with authorized fixtures”; copias con nombres lifecycle/authorized tienen bytes idénticos. El case study describe Playwright local. | Demuestra una pantalla/estado local sobre fixture autorizado, no aceptación remota, operación de hotel ni release. |
| HMSC housekeeping/billing/admin | `public/media/projects/hms-cloudflare/cf-i05-*`, `cf-i06-*`, `cf-i07-*`; hashes registrados en git, `d315db1` bust-cache sobre `c435085`. | Capturas de regresión local, publicadas en el case study. | Sin evidencia mobile del candidato aceptado; gates remotos expresamente abiertos. |
| Alquileres catálogo desktop | `public/media/projects/alquileres-uspa/catalog-results-desktop-1440x1200.png`, SHA-256 `b5f734fb…dd36a0` | Igual al archivo del repo fuente; workflow PostgreSQL + Nest + Vue con `portfolio-demo-*`/imágenes generadas. | Es screenshot del runtime reproducible, no demo pública ni prueba del deploy. |
| Alquileres ficha desktop | `public/media/projects/alquileres-uspa/listing-detail-desktop-1440x1200.png`, SHA-256 `f12dc2b7…92e7b3` | Igual al asset fuente; propiedad y arte son synthetic. | No demuestra revisión/admin/contacto end-to-end. |
| Alquileres catálogo mobile | `public/media/projects/alquileres-uspa/catalog-results-mobile-390x844.png`, SHA-256 `3fee3939…14a6c` | Igual al asset fuente, tamaño mobile documentado. | Solo 390px; no es matriz device real ni public service. |
| UspaYa cuatro actores mobile | `public/media/projects/uspaya/uspaya-{customer,merchant,operations,courier}-mobile.png`; agregado/copiado en portfolio por commit `8bf595f`. | Las imágenes parecen capturas de app/runtime e incluyen UI/fixture values; la captura customer muestra nombres claramente de piloto. No existe enlace de provenance de cada imagen a un run/fixture en el portfolio. | La captura courier presenta destino y teléfono con apariencia personal. Aunque la seed pública contiene `@uspaya.test` y sucursal “Uspallata centro”, no encontré esos valores de courier en la seed pública. No inferir que la imagen completa es sintética. Los archivos están en `public/` y la ruta courier devolvió 200. |
| HMS Elite cover + gallery | cover local `public/media/projects/hms-elite/ui-actual.png` (1266×643), SHA-256 `ba1b6f63…312089c`; cuatro screenshots y dos GIFs remotos en `projectMedia.ts`. | Cover entra con portfolio commit `1e0e026`; galería remota pinned al commit fuente `4df56a6…`. Repo documenta seed de hotel sintético y README/screenshots walkthrough. | Las URLs raw no son una demo, ni un runtime live; depender de assets remotos tiene coste de disponibilidad/privacidad/CDN. Algunos textos muestran actores/fechas sintéticas; no usar esos datos como outcomes reales. |
| JM guide | `public/media/jm-guide-desktop.webp` (480×221), SHA-256 `06dca1b1…e6d6e6`; portfolio caption cita commit `0a00f7f44735…`. | Repo fuente incorpora flujo de tres pasos y screenshot verificado por GitHub Actions. | Una imagen del resultado prueba estado visual, no cada transición ni despliegue de producción. |
| Taco menú desktop/mobile | `public/media/projects/taco-loco/menu-current-{desktop,mobile}.png`, SHA-256 `fdf8528f…cd209d` y `81b04396…44778b`. | Portfolio commit `1e0e026`; captions señalan Playwright/MVP local y el repo tiene acta QA C9. | Fotos/precios/nombre comercial requieren confirmar uso público y vigencia antes de otra captura. No prueba el ciclo de intención ni entrega de WhatsApp. |
| AI, GasFlow, Agentic | Sin media local enlazada en el portfolio. | Case studies y repos/README son la evidencia actual. AI README main `05d808f…`; GasFlow `abcf927…`; Agentic case declara repos privados y evidencia pendiente. | Nada de ello autoriza a exponer staging, credenciales, datos, corpus adversarial o repos privados. |

**Verificación pública relevante:** la ruta `https://sebastian-ojeda.pages.dev/media/projects/uspaya/uspaya-courier-mobile.png` devolvió HTTP 200 el 29-09-2026. Que no figure en una galería no equivale a que el archivo no sea público. No consulté datos de clientes ni accedí a sesiones/productos privados.

## 4. Proof mode y CTA recomendados por proyecto

El “modo recomendado” representa el mejor objetivo de prueba, no afirma que ya exista. La columna de estado indica qué puede enlazarse ahora sin cambiar la madurez declarada.

| # | Caso | Proof mode recomendado | Superficie utilizable hoy | CTA primario recomendado | Condición para elevar/cambiar el CTA |
| --- | --- | --- | --- | --- | --- |
| 1 | HMS Cloudflare | `RECORDED_WALKTHROUGH` | `VISUAL_EVIDENCE` existente, etiquetada como captura local de regresión. | **Ver evidencia** (ahora); después **Ver walkthrough**. | No grabar como aceptación del producto hasta que termine el REWORK mobile, se despliegue al staging deliberado y Product Owner registre ACCEPT conforme al propio status remoto. |
| 2 | Alquileres Uspallata / Cloudflare | `LIVE_PRODUCT` futuro | `VISUAL_EVIDENCE` synthetic de la app Nest/Vue real. | **Ver evidencia** (ahora); eventualmente **Abrir producto**. | Únicamente si el producto Cloudflare completa su roadmap y gates de release propios, tiene URL pública durable y el PO autoriza enlazarla. Nada de fork portfolio-only. |
| 3 | AI Commerce + HMS | `RECORDED_WALKTHROUGH` de staging controlado | Narrativa de evidencia 2.5; no hay asset visual publicado. | **Ver caso de estudio** (ahora); después **Ver walkthrough**. | Registrar explícitamente qué versión se ve: 2.5 staging controlado o 2.6 solo después de todos los gates 2.6 (incluido real-model E2E y Product Acceptance). Nunca mostrar una fase como otra. |
| 4 | UspaYa | `RECORDED_WALKTHROUGH` sintético y redacted, condicional | Por ahora **REPOSITORY_CASE_ONLY**: no usar las cuatro imágenes hasta cerrar el gate de provenance/privacy. | **Ver caso de estudio** (ahora); después **Ver walkthrough**. | Auth apta para piloto, lost-PIN/fallback, validación con actores y autorización del propio proyecto. Grabación nueva con destino, teléfono y PIN synthetic; jamás live/public release antes de sus gates. |
| 5 | GasFlow | `RECORDED_WALKTHROUGH` local/mobile, condicional | **REPOSITORY_CASE_ONLY**; no hay screenshot/video en portfolio. | **Ver caso de estudio** (ahora); después **Ver walkthrough**. | Completar captura confiable de Admin → asignación → Driver → resultado → conciliación; validación mobile/dispositivo y fixture synthetic, sin cuentas expuestas ni backend público. |
| 6 | Agentic Engineering Governance | `VISUAL_EVIDENCE` con diagrama sanitizado | **REPOSITORY_CASE_ONLY**; no hay repo público ni assets. | **Ver caso de estudio**. | Publicar diagrama/Context Amnesia artefacto solo tras revisión de IP, datos, secretos y autorización de los repos propietarios. Si no se puede sanitizar, mantener case only. |
| 7 | HMS Elite | `VISUAL_EVIDENCE` existente | Cover, gallery y dos GIFs de runtime local/demo seed en `projectMedia.ts`. | **Ver evidencia**; repo como enlace secundario dentro del caso. | Conservar como prueba de dominio/base Rust-React; no crear un segundo live/controlled demo hotelero junto a HMSC. Si media remota falla, fallback textual/local autorizado. |
| 8 | JM Soluciones | `LIVE_PRODUCT` condicional | `VISUAL_EVIDENCE` del orientador desktop; case study/repo. | **Ver caso de estudio** (ahora); eventualmente **Abrir producto**. | Aprobación explícita del negocio, URL de dominio final y deploy actual verificado, política de contacto/media vigente, canonical/robots/HTTP y rollback comprobados. Repo actual dice que dominio final aún falta. |
| 9 | Taco Loco Foodtrack | `VISUAL_EVIDENCE` existente | Screenshots desktop/mobile del menú MVP. | **Ver evidencia**; **Ver caso de estudio** para el límite operacional. | Confirmar autorización/vigencia de la marca, menú, imágenes y precios. No hace falta alojar un demo; solo reconsiderar walkthrough si evidencia de uso recruiter prueba valor adicional. |

No hay caso recomendado para un `CONTROLLED_DEMO` público separado. Donde es útil la interacción, el walkthrough ofrece contexto de runtime sin hosting abierto, cuentas demo reutilizables ni escrituras públicas. Un recording no reemplaza repos, pruebas o release; debe señalar la fecha, commit/fase, dataset synthetic y limitaciones.

## 5. Evaluación recruiter/técnica y riesgos por caso

| Caso | Valor recruiter y backend/sistemas | Valor visual / madurez | Seguridad, privacidad y operación | Costo y mantenimiento relativo | Riesgo de sobreafirmar / solapamiento |
| --- | --- | --- | --- | --- | --- |
| HMS Cloudflare | **Muy alto**: migración brownfield, paridad, tenancy, D1, recovery; excelente ajuste backend. | Alto: workflows de recepción, housekeeping, billing y admin visibles. Madurez: technical PASS en varios dominios, producto/release aún gated. | No compartir tenant, sesiones, nombres reales, reservas ni Access creds. Live read-only conserva auth/tenant/abuse/cost y staging upkeep. Walkthrough fixture-safe cuesta poco en operaciones continuas. | Bajo para reusar capturas; bajo-medio para grabar/revisar un walkthrough por release candidate. Alto si se opera un live surface. | Alto si “migrado” se convierte en “aceptado/producción”. Solapa hotelería con Elite; diferenciar migración/topología/recovery del dominio de origen. |
| Alquileres | **Alto**: autoridad, DTO/API, persistencia, review/publication, privacidad y fecha de disponibilidad. | Alto para catálogo y detalle. Producto original activo; Cloudflare lab sigue investigación/rework y no release. | Fichas, owners, consultas e imágenes son sensibles; no live link ni demo propia hasta release real. LIVE requiere costo/abuse/support, pero pertenecería al producto comunitario y no a un duplicado de portfolio. | Muy bajo con capturas synthetic existentes. Operar live suma costo/soporte propio del producto comunitario; no crear ni mantener demo paralela en portfolio. | Alta si la captura synthetic se entiende como inventario real o se confunde el lab con producción. Diferenciarlo de UspaYa por publicación/alojamiento vs transacción/última milla. |
| AI Commerce + HMS | **Muy alto** y singular: autoridad del modelo, tool plan, HITL, policy, idempotencia y resultado de sistema real. | Potencial visual alto; hoy solo narrativa del flujo y estado 2.6. | No exponer prompts/logs sensibles, tenant, tokens, tool credentials, customer data ni URL de staging abierta. Walkthrough requiere fixture approved, redaction, consentimiento de staging y costo de llamada modelo visible/controlado. | Medio para preparar y revalidar un clip por fase; alto para demo persistente por staging, modelo, cuotas y soporte. | Muy alto: no llamar “AI live/production”, no presentar 2.5 aceptada como 2.6, ni repetir solo pantallas HMS. El centro debe ser plan → policy/HITL → efecto HMS. |
| UspaYa | **Alto**: transactional lifecycle multi-actor, idempotencia, optimistic concurrency, privacidad temporal, atomic completion y recovery. | El recorrido se entiende mejor en cuatro pantallas móviles en secuencia; aún no hay assets aprobados para mostrar. Maturity pre-pilot. | **Riesgo alto** por dirección/teléfono/PIN y datos personales. No auth live ni piloto real para recruiter. Video synthetic y privacy-reviewed minimiza ops; live implica account abuse y datos. | Medio: requiere resolver provenance, redaction y capturar un flujo fixture nuevo; luego el costo recurrente del clip es bajo. Live sube a alto. | Alto si “vertical técnica cerrada” se presenta como listo para piloto. Distinguirlo de GasFlow por transacción multi-actor y privacidad vs stock/distribución. |
| GasFlow | **Medio-alto**: backend Rust/Axum/Postgres, scheduling, assignment, deliveries, stock, audit y app React Native. | Un journey mobile corto explica más que screenshots sueltos; hoy evidencia visual pendiente. Functional MVP. | Admin/driver auth y operaciones locales; no publicar credenciales del README, backend abierto o datos de reparto. Recording local con synthetic fixture requiere menos cuidado/ops que demo. | Medio para grabar y revalidar en build/dispositivo; alto si se opera backend hosted o soporte continuo. | Alto si MVP se presenta como operación real o tested offline completa. Solapa UspaYa en móvil/entrega, pero no en dominio gas/stock. |
| Agentic Governance | **Medio-alto para engineering leaders**, evidencia fuerte de governance/provenance; encaje distinto del CRUD/backend tradicional. | Diagramas pueden explicar arquitectura, pero no existen artefactos públicos sanitizados en el case. Experimental. | Repos de implementación privados; riesgo de filtrar source/IP, repositorios/datos conectados, tokens, modelos o evaluación adversarial. Caso escrito tiene coste mínimo; live demo tendría carga inaceptable hoy. | Bajo para un diagrama sanitizado revisado; muy alto para mantener un runtime que exponga repos o flujos agentic. | Muy alto si se llama framework/producto listo o “agents autonomously ship”. Se solapa con Project Method; presentar evidencia verificable concreta, no repetir claims de proceso. |
| HMS Elite | **Alto** como full-stack/domain proof; menos diferenciador para backend-oriented que HMSC en primer scan. | Mayor catálogo de pantallas/GIF de los casos. Madurez de implementación amplio pero sin producto demo público. | Multi-tenant, guest, billing y auth; mejor evidencia capturada con demo seed y sin live service. Assets actuales pinned, pero cross-origin raw GitHub añade CDN dependency. | Bajo-medio si se conservan assets actuales; moderado para traerlos localmente con revisión de derechos, hash, tamaño y fallback. | Muy alto overlap con HMSC. Úsese como source/reference baseline y profundidad del dominio, no como otro hotel demo. |
| JM Soluciones | **Medio** para producto/UX/performance/static delivery; bajo para backend role target. | Evidencia compacta y comercial: flujo guía + caso de conversión. Site es técnicamente release-prepared, deployment final no verificado. | El sitio expone ubicación/WhatsApp/servicios del negocio; requiere business approval vigente, links/galería con permiso y operación del propietario. Static hosting es de baja carga; no portal de consultas. | Bajo para mantener screenshot; bajo-medio para publicar static site tras autorización, dominio y smoke/rollback del dueño. | Bajo si se describe como sitio comercial, alto si se infiere uso/conversión real sin métricas. Solapa Taco en sitios de negocio local; conservar sus distintos problemas. |
| Taco Loco | **Medio**: validation server-side de selección/price snapshot, intent tracking y límites explícitos de WhatsApp. Relevancia backend menor que top three. | Las dos capturas hacen el menú mobile legible; no enseñan personalización, registro de intención y handoff completo. MVP local. | Menu, customer input, WhatsApp e intent/contact events pueden revelar personas/negocio. No demo productiva ni claim de pedido aceptado/pagado; synthetic/local walkthrough only si se necesita. | Muy bajo para evidencia visual vigente una vez autorizado; medio-alto para un walkthrough con catálogo y handoff que deben mantenerse correctos. | Muy alto si “pedido” parece reservado/confirmado automáticamente. Se solapa con conversion UI de JM en negocio local y parcialmente con Alquileres en catálogo; no ampliar el zoo de demos. |

La visualización del `HMS Cloudflare` actual muestra claramente “local acceptance” y “synthetic fixture”, una buena práctica de provenance. La captura de Alquileres lleva labels demo y el footer “Entorno local · R1”. Evitar recortar etiquetas que contextualizan el dataset.

## 6. Privacidad, seguridad y operación: reglas de integración

- **No demo live por defecto.** `LIVE_PRODUCT` requiere producto y release reales, owner del sistema, límites/monitoreo/rollback y URL verificada. Un login escondido o usuario demo no constituye aislamiento.
- **Staging y recordings:** fixture synthetic; scrub de navegador, logs, emails, nombres de tenant, origin, API tokens y datos ocultos; guion revela fase/runtime exactos; captions/transcript; confirmación de proyecto antes de grabar/redistribuir.
- **Assets:** cada archivo público debe tener `source`, repo + commit/run, viewport, escenario, clase de datos, permiso, hash y fecha de verificación. Revisar texto dentro de screenshots, no solo metadata. `public/` hace la ruta directa servible aun si no se agrega a la galería.
- **Auth/roles:** no compartir sesiones, tokens, cuentas de staging ni credenciales locales. Un walkthrough no debe incluir Network tab/headers/secret panes. Para screens recordadas, usar un fresh seeded DB/runtime.
- **Costo:** revisar cuota real, request/model costs, media transfer, CI recapture y soporte. No describir GitHub/Cloudflare como “gratis” sin plan y envelope verificados. Preferir artefactos existentes frente a operación permanente.
- **Madurez:** etiqueta visible en evidencia: local reproducible, controlled staging, experimental, product accepted, release; son estados diferentes. No inferir uno del otro.

## 7. Duplicación y solapamiento entre pruebas

1. **HMS Elite ↔ HMS Cloudflare:** mantener dos historias, una sola categoría de demo si alguna se aprueba. HMS Elite explica source product/modelo hotelero; Cloudflare demuestra migración brownfield, paridad, nueva topología, recuperación. Reutilizar screen solo cuando corresponda y atribuir fuente; no lanzar dos dashboards para el recruiter.
2. **AI Commerce ↔ HMS Cloudflare/Elite:** el clip AI muestra intención/model routing, tool plan, autoridad/policy, HITL y respuesta de HMS. Evitar volver a narrar reservas/recepción como el valor principal.
3. **UspaYa ↔ GasFlow:** no repetir un video de “pedido entregado”. UspaYa enfatiza actores, temporal privacy y transacción idempotente; GasFlow enfatiza móvil de repartidor, schedule y conciliación de cilindros.
4. **Alquileres ↔ UspaYa ↔ Taco:** son productos distintos, pero todos muestran negocio local/CRUD/catalogue. Alquileres diferencia disponibilidad/freshness y publication; UspaYa privacy/transaction lifecycle; Taco modificadores/intent handoff. No crear tres demos públicas abiertas.
5. **JM ↔ Taco:** ambos tienen CTA de conversión local; JM prueba static product/SEO/business wizard, Taco ordering intent. Mantener evidencia visual, no nuevos live environments simultáneos.
6. **Agentic ↔ Project Method:** el portfolio method explica cómo se trabaja; Agentic debe probar artefactos concretos sobre autoridad, lineage, freshness y recovery, si pueden publicarse. No duplicar diagramas genéricos de agentes.

## 8. Motion y UI moderna por proyecto

Todo motion posterior será opt-in de experiencia, no prueba de “modernidad”: `prefers-reduced-motion`, foco visible, no significado exclusivo del movimiento, CSS/View Transitions/native primero, animación corta y cancelable, screenshots y LCP/JS budget intactos. No scroll-jacking, parallax excesivo, autoplay ni reveals que retrasen lectura. No se recomienda añadir una librería de motion.

| Caso / superficie | Motion que aporta claridad | No hacer / patrón UI |
| --- | --- | --- |
| HMS Cloudflare | En walkthrough, corte/cambio directo entre pasos de recepción y resultados. En portfolio, transición sutil al abrir/cerrar galería con Dialog desktop / Drawer mobile ya existente. | No animar booking/status como real en screenshot ni ocultar local/synthetic banner. No crear Tabs como navegación principal. |
| Alquileres | Si el producto real lo justifica, feedback breve al aplicar filtros y al expandir ficha; solo en el producto externo y después de release tests. En portfolio, imagen completa en viewer. | No animar disponibilidad como si fuera actualización live. Sin demo paralela, parallax de casas ni skeleton para screenshots estáticos. |
| AI Commerce | Walkthrough con etapas comprensibles plan → policy/HITL → resultado; transición solo si el evento ocurrió de verdad. | No fake typing, “thinking” animado prolongado, pulse continuo ni Toast como sustituto de estado explicable. |
| UspaYa | Video puede pausar por actor y mostrar transiciones reales de lifecycle con labels. La confirmación crítica debe seguir siendo explícita, no una transición que se interprete como éxito. | No animar/zoom sobre dirección, teléfono o PIN; no conectar screenshots con movimiento que sugiera que un rider tiene acceso antes de custodia. |
| GasFlow | Cambio sutil de assignment a delivery y conciliación cuando ocurre; haptics solo dentro de la app móvil si ya están soportados y accesibles. | No usar un contador animado como fuente única de stock ni sumar una app de animación pesada. |
| Agentic Governance | Un diagrama estático primero; reveal opcional por pasos en un walkthrough si aclara autoridad/provenance. | No animación continua de nodos, canvas/WebGL, ni motion como prueba de autonomía. Preferir SVG/CSS con texto íntegro sin JS. |
| HMS Elite | La galería ya ofrece evidencia suficiente; transición breve al abrir un GIF manualmente o Dialog/Drawer responsive. | GIF no autoplay; no añadir otro dashboard live ni animar todos los estados del hotel. |
| JM Soluciones | El orientador de 3 pasos puede hacer transición discreta entre pregunta → recomendación, manteniendo el foco y los datos visibles. | Evitar scroll reveal y transiciones que retrasen el contacto. El screenshot actual muestra resultado, no debe simular un click-through. |
| Taco Loco | Sheet/Dialog de personalización/resumen y feedback inline al preparar intención; preservar el menú detrás y el mensaje de “no confirmado”. | No confetti/toast que implique que el negocio aceptó el pedido, no autoplay de galería y no animar precios como checkout/payment. |

Componentes existentes del portfolio que pueden reutilizarse sin catálogo de componentes adicional: responsive Dialog/Drawer para media, `EvidenceGallery` para grupos reales, Sheet solo para navegación/Contents ya acordados. Native Select permanece apropiado para filters. Tabs, Dropdown Menu, Hover Card, Menubar, Alert Dialog y Toast no tienen caso de portfolio probado en esta estrategia; no se agregan por exhibición.

## 9. Wave 1 — mejorar el retorno con evidencia ya disponible

Orden sugerido después de una nueva autorización de BUILD:

1. **Cerrar HUMAN_GATE de assets UspaYa primero.** Elegir/confirmar provenance synthetic y permiso, o suprimir/reemplazar los cuatro archivos. No enlazar evidencia adicional antes de resolverlo.
2. **Modelo/contrato mínimo portfolio-only:** hacer explícito por caso el modo recomendado, disponibilidad del artefacto, CTA/proof URL (solo verificada), provenance/commit, clase de datos, limitaciones y última verificación. Mantener `repository`, `demo` y source urls consistentes ES/EN; `demo` sigue vacío donde no hay runtime publicable.
3. **Hacer evidence CTA state-aware** en los tres lead cases: HMSC y Alquileres a galerías verificadas; AI a case/repo hasta tener walkthrough aprobado. Evitar el rótulo genérico “Demo” si es un screenshot.
4. **Consolidar provenance de galerías existentes:** mover HMS Elite raw media a assets locales pinneados solo tras preservar derechos/hashes, verificar datos synthetic y controlar peso; guardar manifest hash/source/commit. No duplicar HMSC source screenshots.
5. **Case-only secundarios sin CTA falso:** mantener case study/repos donde disponibles. Corregir `evidenceNeeded` solo cuando exista evidencia aprobada; no tratarlo como tarea pública/screenshot request en sí.
6. Revalidar ES/EN, links, accessibility/reduced-motion, privacy scan de todos los assets, Lighthouse y JS budget antes de integrar cualquiera de esos cambios.

Esta ola no despliega proyectos externos ni pone Alquileres en live. Su valor es volver comprensible la diferencia entre case, capture, walkthrough y producto.

## 10. Wave 2 — pruebas de más valor tras milestones externos

- **AI Commerce:** `RECORDED_WALKTHROUGH` de 2.6 solo al completar su corpus, adapter/LLM router, structured plans, safe fallback/telemetry, adversarial QA, real-model staging E2E y Product Acceptance. Escena corta, synthetic hotel/tenant; evidencia fase 2.5 se etiqueta aparte.
- **HMS Cloudflare:** tras completar `CF-UX-MOBILE-001-REWORK`, precritic y staging remoto autorizado, capturar walkthrough de recepción y media mobile en el candidato aceptado; Product Owner registra ACCEPT/REWORK. No prometer producción.
- **JM Soluciones:** si negocio autoriza, owner libera con dominio final y evidencia de prod/reversibilidad; validar HTTP, canonical, pages, imágenes, WhatsApp CTA y permiso del material; entonces cambiar CTA a “Abrir producto”.
- **GasFlow/UspaYa:** grabación por actor/etapa usando fixtures y build de mobile; no crear backend public-facing. Separar videos y limitarse a 60–90 s si ilustran flujo completo.
- **Alquileres Cloudflare:** solo recibe CTA “Abrir producto” cuando complete su propio feasibility/rework, implementación/product gates, privacidad/seguridad/costo, aceptación community/product y release. El portfolio solo consuma su URL ya aprobada.

## 11. Wave 3 — no crear demos salvo nueva evidencia

- **Agentic Engineering Governance:** mantener `REPOSITORY_CASE_ONLY` si repos y artefactos siguen privados. No inventar repos públicos, diagramas o claims de Context Amnesia.
- **HMS Elite:** conservar screenshots/GIF con atribución y media de respaldo; no mantener demo alojada paralela a HMSC.
- **Taco Loco:** conservar evidencia visual actual tras aprobación de negocio/assets; no montar un catálogo con WhatsApp activo. Reabrir walkthrough solo si pruebas con recruiters indican que un clip agrega señal técnica/material.
- No demo para secundarios por simetría. Wave 3 es una decisión de no invertir por defecto; cualquier reconsideración requiere gap de evidencia concreto.

## 12. Cambios propuestos al data model del portfolio

El modelo actual combina frontmatter `repository`, `demo`, status y `evidenceNeeded` con galerías tipadas en `src/data/projectMedia.ts`; HMSC tiene galerías en Markdown. UspaYa ya tiene imágenes en `public/` pero ninguna asociación al proyecto. `demo: null` no diferencia “no existe”, “externo gated”, “staging privado” y “solo evidencia”.

Propuesta mínima para una futura implementación (no realizada aquí):

- `preferredProofMode`: enum `live-product | controlled-demo | recorded-walkthrough | visual-evidence | repository-case-only`.
- `proofReadiness`: `available | pending-external-gate | unavailable`.
- `proofHref`: opcional; se llena solo tras verificar URL/consent/deploy y debe apuntar a la superficie descrita.
- `proofProvenance`: source repo, commit or capture run, dataset classification, capturedAt, SHA-256/asset IDs, external approval where applicable.
- `proofLimitations`: local/recorded/staging/product phase and constraints, localized through copy dictionary.

No mantener un campo `demo` separado que repita `proofHref` con semántica ambigua. Considerar `proofs[]` únicamente si un mismo case realmente ofrece más de una superficie vigente. Mantener los assets/galleries localizados ES/EN bajo un único registro source-of-truth en lugar de split gallery Markdown + TypeScript, siempre que el esquema pueda validar provenance. No agregar timeline/motion model si no hay uso.

Los lifecycle `status`/`statusLabel` actuales no deben ser inferidos del proof mode. Un `VISUAL_EVIDENCE` no cambia un estado `active-development` a `released`.

## 13. Handoffs externos (sin implementar)

| Proyecto/repo | Handoff exacto al owner del proyecto antes de integrarlo en portfolio | Evidencia que debe devolver |
| --- | --- | --- |
| HMS Cloudflare | Cerrar [estado canónico remoto](https://github.com/sjo1848/hms-cloudflare/blob/main/.orchestration/STATUS.json): rework mobile, critic/precritic; luego staging remoto deliberado autorizado y Product Owner manual acceptance. No URL pública aún. | Candidate SHA, gate/result, lista de fixtures usados, móvil real/captura y permiso de redistribución; si `ACCEPT`, video del mismo SHA/entorno y limitations. |
| Alquileres CF | Cerrar CF-AU-I00 REWORK-1 (read-only feasibility report, specialist/critic/integration, auth/R2/cost drivers); no siguiente migración antes de independent PASS. Después seguir release/product gates del roadmap, community readiness, privacidad, soporte, abuse, costo/rollback. | Estado/gates y una URL de producción del producto, solo después de release; dominio canonical y soporte/reversibilidad. Nunca crear portfolio fork. |
| AI Commerce | Completar nueve criterios 2.6 desde README pinned `05d808f…`, incluido LLM staging E2E real y Human Product Acceptance; mantener 2.5 vs 2.6 explícito. | Walkthrough con prompt/plan/HITL/resultado y snapshot de fixture; redaction review, costos/latency safe range, `tenant` sintético y record owner approval. |
| UspaYa | Resolver roadmap pre-pilot: auth idónea, lost-PIN, fallback, actor validation, y decisión de readiness (README main `e9d5c7a…`). Aclarar provenance exacta de screenshot courier y otros tres archivos (screenshot-run fixture + data values) antes de que la cartera los exhiba. | Run/commit reproducible, synthetic asset manifest, privacidad redaction approval y video de Customer → Merchant → Operations → Courier con PIN/address/phone falsos. |
| GasFlow | Completar screenshot móvil/Admin + driver success/failure/stock cycle, device validation, reconnection/accessibility evidence; quitar seeds/credentials de cualquier build publicable. No es requisito para la cartera desplegar su backend. | Clip capturado en synthetic local runtime y manifest; QA/device matrix y limits (offline/reconnect) sin claim de prueba de campo. |
| Agentic Gov | Obtener autorización de propietarios privados para cada artefacto; revisar secrets, repo identifiers, connected source data, adversarial corpus, customer data; publicar artefacto sanitizado solamente si autorizado. | Diagrama DICS/PIK, Context Amnesia summary reproducible sin secretos, boundary statement de private repo, outcome/limits. Si no, handoff “case only”. |
| HMS Elite | Mantener repo/release status y synthetic seed; aprobar media para distribución pública y hospedar localmente la media del pinned commit si links raw no son confiables. No desplegar demo de hotel sin producto request. | Screenshot/GIF source commit, media hash/size, seeded dataset evidence y claramente “local/demo”. |
| JM Soluciones | Confirmar el Product/Business Owner autoriza link y assets; completar dominio/canonical, release/staging/prod y smoke/rollback del README de deploy. | URL HTTPS estable verificada, business consent, image/WhatsApp permissions, canonical/robots/HTTP and date. |
| Taco Loco | Confirmar permiso de dueño/restaurante, vigencia del menú/imágenes/precios; producir fixtures seguros y desactivar WhatsApp/contact writes si se solicita demo/read-only. | Captura/clip de selection → summary → intent → handoff con status honesto; no presentar intención como pedido recibido/aceptado. |

## 14. Riesgos y contradicciones

1. **Riesgo expuesto hoy:** los assets UspaYa están bajo el root público y una URL responde 200; uno contiene destino/contacto de apariencia personal. “No aparece en el case” no es control de acceso. Provenance exacta ausente en portfolio. Esto requiere decisión humana, no puede certificarse como safe únicamente porque seed principal use correos `.test`.
2. Los frontmatter `featured: true` para todos los nueve contradicen la separación aprobada entre tres lead y secundarios; `order` numérico también contiene colisiones de orden entre HMS/AI/GasFlow. Esta auditoría no cambia el home hierarchy, pero el futuro model contract debe derivar featured status del roster canónico y probar lead order; no tratar todos como recruiter lead.
3. `demo: null` es honesto, pero el texto/código de quick scan ofrece un bloque “Demo” con no-public-demo para algunos casos; separar CTA a evidencia e indicar `no public demo` para que screenshot no se confunda.
4. La case AI afirma la fase 2.5 accepted y 2.6 actual; video de 2.5 puede dar impresión de la capacidad LLM si fase no va impresa dentro del asset/caption.
5. La captura de Alquileres dice “Disponibilidad” en una ficha synthetic, pero portada visual indica demo; no cortar el contexto en preview/social art. No live URL hasta release community product.
6. HMS Elite usa `raw.githubusercontent.com` para media. Pin commit reduce drift pero no garantiza CDN/privacy/SLA y media puede desaparecer. Rehost solo si derechos/peso/provenance verificados.
7. JM “Release preparado” es lifecycle del código, no URL publicada ni negocio autorizó. El data field actual no verifica domains/consent.
8. Un screenshot de UspaYa indica “API disponible” en contexto local; directo en portfolio podría sugerir live status. Si en algún momento se publica, describir captura + fecha, no current API health.
9. El “case study” conserva una parte técnica larga valiosa para técnico; no reemplazar esa lectura con demo/video. Recruiter quick scan y visual proof son entrada, code/evidence permanecen.
10. Motion puede aumentar recapture budget y LCP; que exista componente Dialog/Drawer no implica usarlo para todo. Ninguna animación debe cambiar la verdad de estados.

## 15. Independent Critic

**PASS — Independent Critic.** La revisión independiente confirmó cobertura de los nueve casos y dimensiones del contrato, proof mode/CTA y condiciones presentes vs. futuras, provenance, recruiter/backend value, visual/maturity/privacy/auth/operations/overclaim/overlap, waves, motion, data model y external handoffs. Verificó el riesgo del asset público UspaYa y que el informe no propone modificar o desplegar proyectos externos ni autoriza BUILD. No pidió rework.

## 16. Integration Review

**PASS — Integration Review.** La revisión confirmó alineación con `docs/12-project-method.md`, el orden recruiter aprobado por Issue #99, el modelo bilingüe de contenido/evidencia y la frontera portfolio/external repos. Consideró explícitos los costos y mantenimiento, seguridad/provenance y gates; no encontró rework material. No implementó el informe.

## 17. HUMAN_GATE requerido

### HG-1 — archivos UspaYa accesibles públicamente

- **Problema:** cuatro PNGs viven bajo `public/media/projects/uspaya`; la URL del courier devuelve 200 y la imagen incluye información de destino/contacto de apariencia personal. No están en su galería, pero `public/` hace servible el path. La seed pública no prueba los valores concretos de screenshot y no hallé una provenance/run manifest correspondiente en el portfolio.
- **Evidencia:** asset `uspaya-courier-mobile.png`, SHA-256 `777e1c74…ffc18bc`, route pública respondía 200 el 29-09-2026; portfolio history solo anota su copia local en `8bf595f`; el `seed.ts` público tiene un dataset de piloto distinto.
- **Impacto:** posible exposición de PII si la imagen es real o si un tercero identifica la ubicación/telefono; además un recruiter puede interpretar “API disponible” como service live.
- **Opción A:** Product Owner confirma provenance completa y autorización, y ordena una versión redacted/synthetic antes de usarla en case/gallery; el artefacto actual permanece fuera de la estrategia pública nueva hasta comprobarse.
- **Opción B:** remover los cuatro archivos o reemplazarlos por assets que sí correspondan a fixtures synthetic y capturas reproducibles, conservando la estrategia de walkthrough futuro.
- **Trade-off / recomendación:** A preserva evidencia útil si se prueba su origen; B falla cerrado y reduce exposición. Recomiendo no usar ni enlazar estos archivos hasta la decisión. Como las URLs directas responden públicamente hoy, Product Owner debe decidir si se deben retirar/reemplazar ahora en un bounded portfolio-only cleanup. Este issue no efectúa la limpieza.

### HG-2 — autorización de estrategia antes de BUILD

El Controller/Product Owner debe aceptar o ajustar los proof modes, waves y mínimos del data model. Este documento no autoriza links, media nuevas ni deployments. JM, Alquileres y los walkthroughs restantes conservan gates de sus proyectos externos; el portfolio no los puede dar por satisfechos.

### Resolución del Product Owner — 2026-09-29

- **HG-1: RESUELTO — Opción B aprobada.** Retirar del artefacto público del portfolio los cuatro PNG actuales bajo `public/media/projects/uspaya/`. Se conserva el case study. Los archivos solo podrán reintroducirse con evidencia sintética o redacted, reproducible, con provenance clara y revisión de privacidad. El bounded cleanup se ejecuta en Issue #108 Wave 1; la retirada se verificará en producción tras el release.
- **HG-2: RESUELTO — estrategia aprobada.** Quedan aprobados los proof modes por proyecto, Waves 1–3, CTAs, modelo mínimo de evidencia, política de motion y la separación estricta entre portfolio y proyectos externos.
- La fase DISCOVERY → DEFINITION → DESIGN queda cerrada con PASS tras integrar PR #109 (`d383f733c0bcfc32a9a061b20d18d2506f67dd1d`). Independent Critic e Integration Review: PASS. CI completo del commit candidato: PASS.
- Wave 1 queda autorizada con contrato separado en [`docs/implementation/issue-108-wave-1-build-contract.md`](../implementation/issue-108-wave-1-build-contract.md). Wave 2 y Wave 3 siguen fuera del incremento autorizado.

## Evidence and commands

- `gh issue view 108 --repo sjo1848/portfolio-sebastian-ojeda --json ...` incluyó body y todos los comentarios disponibles; el comentario más reciente establece los principios de motion integrados en §8.
- Portfolio source revisado a `aebccd0a424d9587f5f5bf09048371eb13f7c456`: `content/projects/*.md`, EN parity, `src/data/projectMedia.ts`, `projectQuickScans.ts`, `ProjectPage.astro`, `content.config.ts`, issue-99 evidence reconciliation y public assets.
- `git status --short --branch`; `git log -1` por asset; `file`, `sha256sum`; comprobación de media a simple vista.
- GitHub REST read-only para metadata/repos/main SHA y raw README/status files de HMSC, Alquileres CF, AI Commerce, UspaYa, GasFlow, HMS Elite, JM y Taco; todos los campos `homepage` consultados estaban en null.
- `curl -L -o /dev/null -w '%{http_code} %{url_effective}'` para las nueve rutas portfolio y la ruta courier UspaYa; todas devolvieron 200 en esa inspección.
- No se tocó ni desplegó ningún proyecto externo. No se ejecutaron build/tests porque solo se prepara estrategia/evidencia y no hubo cambios de aplicación; no se creó contenido de demo, animación, link o visual.

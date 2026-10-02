# Issue #124 — C2 Recruiter Proof UX and Content Contract

**State:** C2 UX/content contract only.  
**Authority:** latest Controller review on Issue #124, C0_CONTROLLER_PASS / C1_C2_BLOCK_AUTHORIZED.  
**Related contract:** docs/design/issue-124-proof-architecture.md.  
**Boundary:** exact future behavior and copy; no current UI/content/media/link is changed.

## 1. Journey and hierarchy

The case study remains the primary route from Selected Work. Evidence is a secondary shortcut into a specific existing case-study evidence section. A proof link must never replace the case-study link, imply that a product is publicly available, or upgrade project status.

| Surface | Behavior |
|---|---|
| Selected Work | Preserve each case-study link as the primary action. If the approved design includes a proof shortcut/state, make it a separate ordinary anchor to the verified in-page evidence section. It must not add a new dashboard/card or make the whole card an ambiguous multi-action link. |
| Case-study quick scan | Keep the current primary in-page case-study navigation. Place proof CTA as a subordinate action with an explicit evidence label. |
| Evidence section | Static image evidence is available without JavaScript. Captions/limitations appear adjacent to the relevant image. No autoplay or interaction is required to understand what the image proves. |
| Future HMS walkthrough | Add only after external gates and a new authorization. The video is supplemental to the static evidence and case study; direct anchor/file playback, transcript/captions, and static fallback remain available without JavaScript. |
| Alquileres | Static evidence remains the complete portfolio proof surface. Do not add a walkthrough or external product link. |

The route's product lifecycle label remains unchanged and independent from proof labels.

## 2. Exact EN/ES labels and state copy

### HMS Cloudflare — current static evidence

**Selected Work / case proof link**

| Locale | Accessible label |
|---|---|
| EN | View evidence |
| ES | Ver evidencia |

**Short state label**

| Locale | Copy |
|---|---|
| EN | Local test evidence |
| ES | Evidencia de pruebas local |

**Case-study limitation, adjacent to the CTA or evidence heading**

| Locale | Exact copy |
|---|---|
| EN | Local regression captures with authorized test fixtures. They do not show remote Product Acceptance or a production release. |
| ES | Capturas de regresión local con fixtures de prueba autorizados. No muestran Product Acceptance remoto ni un release de producción. |

**Canonical full-page reception image caption**

| Locale | Exact copy |
|---|---|
| EN | Local HMS reception workspace across booking, billing, and cash sections. Authorized synthetic fixture, not persisted. The capture shows interface areas; it does not prove a completed booking, payment, cash-close, remote acceptance, or production release. |
| ES | Workspace local de recepción de HMS con secciones de reservas, facturación y caja. Fixture sintético autorizado, no persistido. La captura muestra áreas de interfaz; no prueba una reserva, pago o cierre de caja completado, aceptación remota ni release de producción. |

The caption must be visible in the normal reading flow, not only in alt text, hover, or an optional modal. Keep the case study's existing factual migration status and long-form technical evidence.

### Alquileres Uspallata — current static evidence

**Selected Work / case proof link**

| Locale | Accessible label |
|---|---|
| EN | View evidence |
| ES | Ver evidencia |

**Short state label**

| Locale | Copy |
|---|---|
| EN | Synthetic visual evidence |
| ES | Evidencia visual sintética |

**Gallery-level limitation**

| Locale | Exact copy |
|---|---|
| EN | Reproducible local captures from the NestJS/Vue product. Listings and illustrations are synthetic. There is no public deployment, and the images do not show real availability. |
| ES | Capturas locales reproducibles del producto NestJS/Vue. Los alojamientos y las ilustraciones son sintéticos. No hay despliegue público y las imágenes no muestran disponibilidad real. |

**Catalog caption**

| Locale | Exact copy |
|---|---|
| EN | Synthetic catalog captured from the reproducible local runtime. Availability labels are fixture states, not current property availability. |
| ES | Catálogo sintético capturado desde el runtime local reproducible. Las etiquetas de disponibilidad son estados del fixture, no disponibilidad actual de propiedades. |

**Listing detail caption**

| Locale | Exact copy |
|---|---|
| EN | Synthetic listing detail from the local runtime; it is not a real property listing or current availability. |
| ES | Detalle sintético de una propiedad en el runtime local; no es una publicación real ni disponibilidad actual. |

**Mobile capture caption**

| Locale | Exact copy |
|---|---|
| EN | Synthetic catalog capture at 390 × 844. It documents this mobile layout only; it does not establish touch/accessibility coverage for every device. |
| ES | Captura de catálogo sintético en 390 × 844. Documenta solo esta composición mobile; no acredita cobertura touch/accesibilidad en todos los dispositivos. |

Do not label this surface Live, Product, Demo, Open product, or Try demo. The project remains active development and has no verified public deployment.

## 3. Future HMS walkthrough state and transition

Only after the HMS external gate and new Controller authorization:

**CTA label**

| Locale | Copy |
|---|---|
| EN | View recorded walkthrough |
| ES | Ver walkthrough grabado |

**State/disclosure**

| Locale | Copy |
|---|---|
| EN | Local recording · synthetic test fixtures · not Product Acceptance |
| ES | Grabación local · fixtures de prueba sintéticos · no es Product Acceptance |

The state identifies a recording, not an interactive demo or live service. Keep the existing static evidence CTA/section available as fallback. The ordinary case-study link stays primary. Do not use “Live”, “Production”, “Open product”, or “Try demo”.

The walkthrough link must point to the exact versioned recording whose provenance manifest has passed its gate. If no such approved file exists, render no walkthrough CTA and use the fallback below.

## 4. Walkthrough unavailable fallback

Fallback is shown only if a future authorized recording cannot be served; it does not replace the static evidence or case study.

| Locale | Exact copy |
|---|---|
| EN | The local walkthrough is currently unavailable. You can still inspect the evidence below and read the case study. |
| ES | El walkthrough local no está disponible en este momento. Puedes revisar la evidencia de abajo y leer el caso de estudio. |

Behavior:

- The case study, static image evidence, repository link and in-page navigation continue to work.
- A failed video request does not block the page, hide images, or trap focus.
- Provide a normal link to the evidence section; do not require React hydration.
- No empty player frame or false “coming soon” state.
- Do not dynamically fall back to a project runtime or external URL.

For the currently approved state, there is no walkthrough link and no unavailable message; HMS shows the static-evidence state/copy above. Alquileres never uses this recording fallback.

## 5. Link and accessibility behavior

- Proof links are normal anchors with localized, specific accessible names.
- Resolve only to the exact existing internal anchors: HMS EN #visual-evidence, ES #evidencia-visual; Alquileres #gallery-alquileres-uspa in both locales.
- Preserve native browser back/forward, keyboard activation, visible focus, reduced-motion behavior and no-JS navigation.
- Keep adjacent text as visible HTML; do not rely on image-only disclosure, color, animation, tooltip or hover.
- Any future video must have captions/transcript, controls, no autoplay and a static-image alternative.
- Keep proof secondary in visual hierarchy. Do not add cards, badges or top-level navigation beyond approved existing case surfaces.

## 6. Copy truth constraints

- “Local” describes capture environment, not public availability.
- “Synthetic” describes data/assets and must be backed by the corresponding provenance manifest.
- “Recorded walkthrough” means a fixed recording of a real local run, not an interactive demo.
- A visible UI state does not establish its successful backend mutation unless the capture records the result.
- Screenshots of billing/cash UI do not establish transaction completion.
- An admin screen does not prove authorization enforcement.
- Synthetic availability labels are not real availability.
- Proof readiness does not change project status, release or acceptance.

## 7. C2 gate

This contract defines bilingual labels, captions, limitations, anchors, fallback and hierarchy while preserving ordinary case-study navigation. It authorizes no new link, media, UI or deployment. No source code, current content, assets, dependencies, external project, or runtime was changed.

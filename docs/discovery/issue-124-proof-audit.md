# Issue #124 — C0 Proof Audit

**Estado:** C0 completado; listo para Controller review.  
**Portfolio baseline:** main, 66478c59e3362d289e5b01ca1448600731a74b61.  
**Alcance:** evidencia de HMS Cloudflare y Alquileres Uspallata. Este informe no autoriza C1 ni cambios de producto.

## 1. Executive summary

Los dos casos tienen valor técnico y evidencia verificable, pero cubren necesidades distintas.

- **HMS Cloudflare:** la evidencia estática es desigual. Algunas capturas no muestran el flujo sugerido por su nombre y llevan una etiqueta visual “Staging · Access active”, mientras el case study las describe como regresiones locales y el estado externo mantiene pendiente el trabajo de UX móvil y la aceptación remota. Recomendación: conservar la evidencia estática actual como entrada y considerar, en una fase posterior autorizada y tras cerrar los gates externos, un walkthrough local y reproducible (modo B) que muestre una transición operacional y una denegación cross-tenant, con provenance y límites explícitos.
- **Alquileres Uspallata:** tres capturas sintéticas actuales tienen hashes coincidentes con evidencia del repositorio externo. Muestran catálogo, detalle y mobile, con disponibilidad/frescura. Son suficientes para la primera comprensión visual. Recomendación: mantener modo A, evidencia estática; no duplicar con otra demo.

No se justifican ahora una demo interactiva pública (C) ni un entorno efímero (D): agregan riesgo y operación sin una necesidad probatoria proporcional. No hay URL pública verificada de ninguno de los productos. La auditoría no cambia claims, status, CTAs o contenido vigente ni convierte evidencia técnica en aceptación o producción.

## 2. Inventario de evidencia

### HMS Cloudflare

Portfolio: el caso publicado tiene status active-development y separa validación técnica de aceptación. Explica Rust/Axum/PostgreSQL y la migración a Workers/Hono/D1, CONTROL_DB y bases por hotel, autenticación de Cloudflare Access frente a autenticación de negocio, aislamiento tenant, recuperación y suites de pruebas. Declara evidencia pendiente, incluyendo captura remota y aceptación.

Hay cuatro PNG públicos y no se encontró video/GIF:

| Asset | SHA-256 | Inspección visual |
|---|---|---|
| cf-i04-reception-authorized.png | 7c88509f2520b0027723a9b07423114627b6ee2e7ac54c9a65582ac69e780378 | Formulario/cola de recepción; perfil local dice fixture sintético y no persistido. No muestra una transición completa del lifecycle. |
| cf-i05-housekeeping-authorized.png | 9d64973880788129623d1f67cd6d04089dde5a71c072bb99dbc34958f6acd533 | Vista housekeeping con cero habitaciones y cero tareas; débil como prueba de workflow. |
| cf-i06-billing-authorized.png | 000281ddcd08a777e50bdd3a114e1349cb0bab4ee9c54d13155ee4378c8bbec8 | El viewport visible es recepción, no billing; el artefacto no sustenta bien el nombre. |
| cf-i07-admin-authorized.png | b2e64b05add48abf65bbc98432fd07ce46620292acf4cad46fee1e6acd12e87f | UI de administración con IDs @migration.invalid y acciones create/deactivate. No prueba enforcement de roles. |

Las cuatro muestran “Staging · Access active”. El case study dice que son capturas locales; el estado actual externo mantiene aceptación remota pendiente después de trabajo móvil. La imagen aislada puede sugerir una disponibilidad o aceptación más amplia que la documentada. No se concluye que el badge sea falso: falta contexto visible y lineage.

Los hashes de estos medios no coinciden con las salidas análogas en el HEAD externo inspeccionado. No prueba falsedad, pero no permite fijar asset → commit/ejecución actual.

Repositorio externo inspeccionado: main dd7d536848708346ca9616e0f54b0fc48ace0b07. STATUS indica CF_UX_MOBILE_001_REWORK, resume_authorized=false, runtime RUNNING; aceptación remota prevista después del trabajo móvil. El runbook describe Worker/D1 sintético, API 127.0.0.1:8787, web 127.0.0.1:4174, reset determinístico, smoke de dos hoteles, denegación cross-hotel y backup/restore. Documentación distingue evidencia técnica local de aceptación humana. No se verificó app pública. Hay evidencia CI, contratos, tests, migración, smoke y recovery. El guardrail de coste indicado es Cloudflare Free / objetivo $0 al mes; no equivale a factura ni coste observado.

### Alquileres Uspallata

Portfolio: status active-development, sin URL de producción. El caso explica catálogo, detalle, freshness, autoridad de servidor/owner, review/publish, contacto y auditoría. Hay tres capturas y no se encontró video/GIF.

| Asset | SHA-256 | Inspección visual |
|---|---|---|
| catalog-results-desktop-1440x1200.png | b5f734fbaa270ddf73e055d41f6b510d9e669d6d001e571b653f2acf1ddd36a0 | Catálogo sintético con no disponible, stale/no reconfirmado y disponible. |
| listing-detail-desktop-1440x1200.png | f12dc2b7334d956f4f3c4598cafc0c8159793f7fc0d7007857e5ae22a692e7b3 | Detalle sintético de una ficha. |
| catalog-results-mobile-390x844.png | 3fee3939f6ee7fb3f578bc830d909ef6f08ec5551dcbff88b1a9faf87c514a6c | Catálogo responsive con copy de fixture. |

Los hashes coinciden con docs/media/portfolio del repo externo; revisión visual no encontró PII. Las ilustraciones son locales/generadas.

Repositorio externo inspeccionado: main 267c531f3e3d5869240894063d3a194fa1f9680b. docs/portfolio-evidence.md describe runtime local PostgreSQL + Nest API + Vue, seed sintético, IDs portfolio-demo-*, owner example.test, capturas Chrome y artifact retenido 14 días. Los estados semánticos se reproducen, pero seed usa la fecha actual y stale = 45 días anterior, así que timestamp/hash pueden cambiar. El workflow portfolio-evidence.yml tiene contents: write y auto-commitea assets; cualquier reutilización exige revisión de privilegio mínimo. STATUS indica PRODUCT_ACCEPTANCE, resume_authorized=false, I13, candidato 8e11bebdb197321d500678f06233d6f174f03438, listo pero pendiente aceptación humana. No hay URL desplegada verificada. Issue #24 es propuesta, no autorización BUILD. No se accedió al laboratorio alquileres-uspa-cloudflare.

## 3. Recruiter journeys (máximo tres por caso)

| Caso | Flujo | Valor | Evidencia actual |
|---|---|---|---|
| HMS | Registrar/consultar una operación de recepción hasta ver resultado | Hace tangible el sistema operacional y el backend | La imagen muestra formulario/cola, no resultado de transición. |
| HMS | Intento cross-hotel denegado | Prueba aislamiento multi-tenant y criterio de seguridad | Tests/runbook locales; resultado poco escaneable desde portfolio. |
| HMS | Migración o recuperación preserva continuidad | Demuestra ownership fuera del happy path | Evidencia técnica en repo, no resumida en una pieza breve. |
| Alquileres | Explorar catálogo y entender disponibilidad/frescura | Explica producto y dato temporal rápidamente | Screenshot desktop sintético. |
| Alquileres | Abrir ficha y entender el detalle | Concreta la experiencia y modelado | Screenshot sintético de detalle. |
| Alquileres | Revisar catálogo mobile | Muestra responsive en viewport real | Screenshot 390×844; no prueba todos los gestos/estados. |

## 4. Proof-gap matrix

Confianza alta significa artefacto y provenance enlazables; media requiere navegar tests o fuentes; baja significa que imagen/contexto no sustenta el claim completo.

| Claim | Evidencia | Confianza | Brecha | Prueba más simple |
|---|---|---|---|---|
| HMS recepción end-to-end | cf-i04 | Baja-media | No se ve transición/resultante ni SHA de generación fijado | Walkthrough local de estado inicial y resultado, con commit y límites |
| HMS housekeeping | cf-i05 vacío | Baja | Cero tareas no demuestra workflow | No usar como prueba principal; capturar fixture poblado solo en fase autorizada |
| HMS billing | cf-i06 muestra recepción | Baja | Captura no contiene billing visible | No presentarla como prueba de billing hasta reconciliar artefacto |
| HMS administración | cf-i07 | Media-baja | UI no prueba autorización efectiva; badge ambiguo | Walkthrough local con rol/resultado y denegación, sin credenciales |
| HMS aislamiento tenant | Tests y smoke documentados | Media-alta | Hallazgo difícil de escanear; capturas sin lineage exacto | Mostrar request permitido y denial cross-tenant enlazados a test |
| HMS staging/acceptance | Case local; badge staging; aceptación pendiente | Baja/ambigua | Lectura visual más fuerte que el estado conocido | Contexto/provenance inequívocos en futura evidencia |
| Alquileres catálogo/freshness | Screenshot cuyo hash coincide | Alta para apariencia; media para comportamiento | Imagen no prueba reglas de actualización completas | Mantener imagen y enlazar explicación/tests existentes |
| Alquileres detalle | Screenshot sintético coincidente | Alta para estructura | No prueba persistencia ni administración | Mantener evidencia estática + case study |
| Alquileres mobile | Screenshot 390×844 coincidente | Alta para ese viewport | No cubre touch, anchos ni accesibilidad completa | Mantener viewport rotulado y QA como soporte |
| Alquileres estado | Product Acceptance pendiente; sin URL | Alta para limitación | Riesgo de interpretarlo como producto live | Mantener explícito status y ausencia de URL |

## 5. Security / exposure boundary

### HMS

- Datos observados son fixtures locales; IDs @migration.invalid. No se vieron datos personales o secretos.
- cf-i07 muestra UI privilegiada y acciones mutables. No publicar credenciales ni convertir panel admin en superficie operable.
- El caso distingue Access de auth de negocio; no compartir Access tokens ni secretos.
- Recepción/admin mutan estado en runtime local. Una demo pública necesitaría límites que este audit no diseña.
- El aislamiento tenant es claim importante: nunca exponer datos de otro hotel; evidenciar denial.
- Un endpoint público introduce abuso/coste. Objetivo Free/$0 no es permiso de despliegue ni coste garantizado.
- Nunca exponer credenciales, datos reales, tenant ajeno, mutaciones públicas o staging no aprobado.

### Alquileres

- Assets inspeccionados son sintéticos, con portfolio-demo-* y example.test; no se encontró PII.
- Runtime incluye owner/admin, contacto, review/publish y auditoría. No exponer sesiones, controles privilegiados ni rutas de escritura.
- No mostrar disponibilidad real, reservas, pagos o ContactEvents; no usar fotos/propiedades reales sin autorización.
- API y base pública implicarían abuso, mantenimiento, monitorización y respuesta operativa, fuera de evidencia disponible.
- El workflow de evidencia da contents: write; revisar least privilege antes de reutilizarlo. No se modificó.

## 6. Proof mode y comparación

Modos: A = evidencia estática actual; B = walkthrough local guiado/grabado; C = demo interactiva pública controlada; D = entorno efímero.

| Caso | Modo | Razonamiento/coste |
|---|---|---|
| HMS | A ahora; B como mejora futura condicionada | A no agrega infraestructura, pero capturas son desiguales. B mostraría transición + aislamiento en runtime sintético sin servicio persistente; requiere captura/revisión/provenance y solo tras gates externos y autorización. |
| Alquileres | A | Assets sintéticos verificables cubren primera lectura desktop/mobile. Nueva demo duplicaría superficie; no se encontró brecha que justifique B. |

A tiene menor coste/superficie y menor profundidad. B aclara comportamiento evitando runtime público. C ofrece interacción más fiel, pero más exposición/mantenimiento y riesgo de inflar madurez. D reduce persistencia, no elimina operación, seguridad, limpieza, coste o abuso. C y D no se justifican.

## 7. Zero-cost feasibility

- HMS A: incrementalmente sin infraestructura nueva.
- HMS B: factible sin hosting si se graba localmente con runtime sintético y se publica artefacto estático; $0 es condición de diseño, no gasto verificado. Tiempo de producción/revisión no cuantificado.
- Alquileres A: sin runtime nuevo; assets ya existen.
- Alquileres B: quizá bajo coste infra local, pero no aporta valor demostrado suficiente.
- C/D: coste cero no demostrado; requieren operación, control de abuso, limpieza y configuración.

No hay factura ni presupuesto medido para estimar coste monetario. No se propone cambiar plan, permisos, dominio o despliegue.

## 8. Conversion hypothesis

**HMS:** walkthrough corto con una transición y denial cross-tenant, local/sintético, SHA de origen y límites explícitos podría reducir la duda sobre si el caso solo describe arquitectura o fue ejercitado en runtime. Mantener separados tests locales, staging y aceptación.

**Alquileres:** las capturas actuales dejan entender el producto sin instalar un stack; conservarlas y dirigir a explicación técnica es mejor retorno que demo duplicada.

Son hipótesis cualitativas. No hay datos de conversión ni experimentos que permitan afirmar impacto medido.

## 9. Decision table

| Proyecto | Modo ahora | CTA coherente | Siguiente prueba | Evitar |
|---|---|---|---|---|
| HMS Cloudflare | A | Mantener CTA actual hasta URL/prueba verificada; case study es destino seguro | Evaluar B local tras rework móvil y gates de Product Acceptance; transición + denial con provenance | URL pública, credenciales, claims de producción/aceptación |
| Alquileres | A | Ver evidencia / Ver caso de estudio; no Abrir producto o Ver demo sin URL verificada | Ninguna para primera comprensión | Demo paralela o producto desplegado/aceptado como claim |

Estas recomendaciones no autorizan editar CTA o links. Cualquier URL debe verificarse y requerir autorización.

## 10. Risks and contradictions

1. Badge “Staging · Access active” de HMS puede contradecir lectura de captura local y aceptación pendiente.
2. I06 no muestra billing; I05 está vacía. No sustentan esos flujos.
3. Hashes de imágenes HMS no fijan lineage al HEAD externo actual.
4. Alquileres reproduce semántica, no necesariamente bytes: fecha de ejecución altera timestamps/capturas.
5. Aceptación humana de Alquileres continúa pendiente; evidencia técnica no es Product Acceptance.
6. Workflow de Alquileres auto-commitea con contents: write.
7. Issue #24 no habilita BUILD ni demo.
8. Demos públicas duplicarían portfolio como producto, sumarían mantenimiento y riesgo.
9. No usar live, production-ready o accepted sin evidencia aprobada.

## 11. Follow-up scope proposal

Sujeto a Controller review y nueva autorización:

1. Confirmar que gates externos HMS permiten grabar flujo local tras rework móvil.
2. Fijar flujo de recepción y denial cross-tenant, duración/captions, SHA, label sintético/local y limitaciones; no credenciales ni endpoints operables.
3. Mantener Alquileres A; si se mejora generación, revisar permisos del workflow antes de cualquier cambio externo.
4. Solo tras BUILD autorizado, evaluar presentación de evidencia en portfolio.

## 12. HUMAN_GATE

No hubo decisión humana que impidiera completar C0. Hace falta Controller review de este informe antes de cualquier C1. No se solicita aprobación para demo o servicio.

Gates externos preservados: HMS continúa con resume_authorized=false durante rework/aceptación; Alquileres continúa en PRODUCT_ACCEPTANCE, resume_authorized=false, candidato I13 pendiente de Product Acceptance. Este informe no altera estados ni concede permiso de publicación.

## 13. Sources and method

- Issue #124 completo y último comentario Controller: C0_PROOF_AUDIT_AUTHORIZED.
- Portfolio main 66478c59e3362d289e5b01ca1448600731a74b61.
- HMS main dd7d536848708346ca9616e0f54b0fc48ace0b07.
- Alquileres main 267c531f3e3d5869240894063d3a194fa1f9680b.
- Portfolio sources: content/projects/hms-cloudflare.md, content/projects/alquileres-uspa.md, src/data/projectMedia.ts, public/media/projects/hms-cloudflare/.
- External status, runbooks, docs/portfolio-evidence.md, seeds, media outputs and portfolio evidence workflow.
- Static image inspection and SHA-256 comparison. No application/test/build/deploy/service execution; no dependency installation.
- No changes to code, claims, status, links, content, dependencies, deployments, analytics, or external projects. Cloudflare Alquileres lab was not accessed.

## 14. C0 closure

**Resultado:** informe listo para Controller review. Recomendación: conservar prueba estática para ambos; considerar walkthrough local HMS solo en futura fase autorizada; no crear demo interactiva pública ni entorno efímero.

C1 no comenzó. La única salida durable de esta tarea es este informe.

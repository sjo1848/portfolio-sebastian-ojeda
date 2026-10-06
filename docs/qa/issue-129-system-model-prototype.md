# Issue #129 — personal brand Hero prototype

State: **LOCAL PROTOTYPE / HUMAN VISUAL REVIEW READY**. This checkpoint is not a release candidate.

## Intent and scope

The Hero presents Sebastián Ojeda as a backend-oriented Full-Stack Software Developer. Its conceptual system model shows the layers behind a visible interface: workflow, authority, data and evidence. It does not depict a released product or select a flagship case. The Selected Work index and case studies remain available in their existing order.

The EN/ES thesis is now personal: “I build the systems behind real work.” / “Construyo los sistemas detrás del trabajo real.” The supporting copy names backend, data, integrations, interfaces, decisions, evidence and pending validation. Project status and proof claims are unchanged.

## Visual evidence

- [EN desktop 1440×900](../../artifacts/visual/issue-129-system-prototype/en-desktop-1440.png)
- [EN laptop 1366×768](../../artifacts/visual/issue-129-system-prototype/en-laptop-1366x768.png)
- [EN mobile 390 Hero](../../artifacts/visual/issue-129-system-prototype/en-mobile-390-hero.png)
- [ES mobile 390 Hero](../../artifacts/visual/issue-129-system-prototype/es-mobile-390-hero.png)

Local preview: `http://127.0.0.1:4184/` and `http://127.0.0.1:4184/es/`.

## Focused checks

- `npm run check`, `npm run validate:content`, `npm run validate:presentation`, `npm run build`, `npm run qa:release`: PASS.
- Home information hierarchy, Issue #129 live motion and signature fallback tests in Chromium and Mobile Chromium: 59 passed, 5 expected skips.
- The 360×640 short-mobile height finding was corrected; EN/ES Chromium and WebKit rerun: 4 passed.
- Additional relevant Home content, visual and legacy Hero tests in Chromium: 18 passed.
- Final 1366×768 EN/ES boundary tests in Chromium and WebKit: 4 passed. Both primary and Resume CTAs remain within the first viewport.
- Reduced-motion and no-JS tests, including axe in the tested states: PASS.
- No horizontal overflow or page errors in the focused browser tests.
- Home initial JavaScript: **95,378 B gzip** in EN and ES, unchanged from the preceding local checkpoint and under the 100,000 B limit. No new dependency or client island.

The full browser matrix and Lighthouse release gates are deferred until the visual direction is accepted. The model is an illustration of the engineering approach; it must never be presented as project evidence.

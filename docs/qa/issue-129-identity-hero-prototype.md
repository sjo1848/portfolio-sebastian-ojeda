# Issue #129 — identity-led Hero prototype

State: **LOCAL PROTOTYPE / HUMAN VISUAL REVIEW READY**. This is not a release candidate.

## Design correction

The previous five-layer system diagram was rejected in human visual review. It made the Hero feel like a technical slide and competed with Sebastián's identity. The new Hero uses the personal name and thesis as its visual material. The word lines rise once into place, followed by a copper structural rule and the supporting copy/actions. Motion ends in a stable composition; there is no loop or scroll gate. The Selected Work section continues below without a flagship project in the Hero.

Thesis: “I build the systems behind real work.” / “Construyo los sistemas detrás del trabajo real.” The visual uses the approved Stone / Andes Copper palette and keeps the role, location, selected-work CTA, Resume/CV and GitHub available on load. The claims and the nine project cases are unchanged.

## Visual evidence

- [EN desktop 1440×900](../../output/playwright/issue-129-identity-hero/en-1440.png)
- [ES desktop 1440×900](../../output/playwright/issue-129-identity-hero/es-1440.png)
- [EN mobile 390×844](../../output/playwright/issue-129-identity-hero/en-390.png)
- [ES mobile 390×844](../../output/playwright/issue-129-identity-hero/es-390.png)

Local preview: `http://127.0.0.1:4184/` and `http://127.0.0.1:4184/es/`. Reload to inspect the entry motion.

## Focused checks

- `npm run check` (0 errors/warnings/hints), `npm run build` and `npm run validate:presentation`: PASS.
- `npx playwright test tests/browser/issue-129-live-motion.spec.ts tests/browser/issue-129-signature-motion.spec.ts --project=chromium --project=webkit --grep='#129' --workers=4 --config=playwright.focus.config.ts --reporter=line`: 32 passed. The temporary config reused the live local preview server.
- Focused coverage includes EN/ES, 1366×768, 1024×768, 390×844, 360×640, ordinary forward/reverse scroll, reduced motion, no JavaScript, keyboard CTA, axe and console errors.
- No new dependency or client island. CSS-only Hero motion. Home JavaScript chunks are unchanged from the previous local checkpoint (95,378 B gzip).

Full release browser matrix and Lighthouse remain pending human visual acceptance, as requested. This local prototype has not been pushed, merged or deployed.

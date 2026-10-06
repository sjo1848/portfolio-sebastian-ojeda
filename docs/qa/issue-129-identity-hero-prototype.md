# Issue #129 — identity-led Hero prototype

State: **LOCAL PROTOTYPE / HUMAN VISUAL REVIEW READY**. This is not a release candidate.

## Design correction

The previous five-layer system diagram was rejected in human visual review. It made the Hero feel like a technical slide and competed with Sebastián's identity. The new Hero uses the personal name and thesis as its visual material. After a further design critique, the name became the primary visual anchor. Only “SYSTEMS BEHIND” / “SISTEMAS DETRÁS” rises into place; its copper underline settles as a structural mark. The same copper seam begins Selected Work at the content edge. Motion ends in a stable composition; there is no loop or scroll gate. Selected Work continues below without a flagship project in the Hero.

Thesis: “I build the systems behind real work.” / “Construyo los sistemas detrás del trabajo real.” The supporting copy now leads with backend-oriented operational work and points to the case-study evaluation and limitations. The visual uses the approved Stone / Andes Copper palette and keeps the role, location, selected-work CTA, Resume/CV and GitHub available on load. The nine project cases and their claims are unchanged.

## Visual evidence

- [EN desktop 1440×900](../../output/playwright/issue-129-identity-hero/en-1440.png)
- [ES desktop 1440×900](../../output/playwright/issue-129-identity-hero/es-1440.png)
- [EN mobile 390×844](../../output/playwright/issue-129-identity-hero/en-390.png)
- [ES mobile 390×844](../../output/playwright/issue-129-identity-hero/es-390.png)

Local preview: `http://127.0.0.1:4184/` and `http://127.0.0.1:4184/es/`. Reload to inspect the entry motion.

## Focused checks

- `npm run check` (0 errors/warnings/hints), `npm run validate:content`, `npm run validate:presentation` and `npm run build`: PASS.
- Issue #129 WebKit tests run serially: 17 passed. The relevant content hierarchy and axe retry across Chromium/WebKit: 16 passed. The initial four-worker run saturated the local browser environment and timed out in WebKit; the affected tests passed when repeated serially with a 45-second test timeout. The temporary config reused the live local preview server.
- Focused coverage includes EN/ES, 1366×768, 1024×768, 390×844, 360×640, ordinary forward/reverse scroll, the Hero/Selected Work seam alignment, reduced motion, no JavaScript, keyboard CTA, axe and console errors.
- No new dependency or client island. CSS-only Hero motion. Home JavaScript chunks are unchanged from the previous local checkpoint (95,378 B gzip).

Full release browser matrix and Lighthouse remain pending human visual acceptance, as requested. This local prototype has not been pushed, merged or deployed.

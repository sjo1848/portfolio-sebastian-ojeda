# Issue #129 — Hero scroll animation prototype

State: **LOCAL PROTOTYPE / HUMAN VISUAL REVIEW READY**. No merge or deployment.

## Design decision

The earlier load animation hid part of the headline during the first second and had finished by the time a visitor was ready to look. The thesis now appears fully readable on load. As the visitor scrolls toward Selected Work, the copper emphasis in “REAL WORK.” / “DEL TRABAJO REAL.” progressively becomes ink-light text while the copper rule completes. Reverse scrolling restores the initial composition. The motion transfers emphasis from the claim to the work; it does not single out HMS or add another project to the Hero.

Sebastián Ojeda stays in the persistent SiteHeader, without a duplicate name in the Hero. Copy, project hierarchy, evidence and IA remain unchanged. The implementation uses a small scroll listener, `requestAnimationFrame`, and CSS custom properties; there is no animation library or new island. It is a visual prototype, pending human judgment of the motion itself.

## Preview and visual evidence

Local preview: `http://127.0.0.1:4184/` and `http://127.0.0.1:4184/es/`. Scroll slowly through the first ~250 px, then reverse. The static first frame is intentional; no content waits for an animation.

- [EN desktop forward and reverse recording](../../output/playwright/issue-129-hero-scroll/en-forward-reverse.webm)
- [ES mobile forward and reverse recording](../../output/playwright/issue-129-hero-scroll/es-forward-reverse.webm)
- [EN top](../../output/playwright/issue-129-hero-scroll/en-top.png) / [Selected Work entry](../../output/playwright/issue-129-hero-scroll/en-work-entry.png)
- [ES mobile top](../../output/playwright/issue-129-hero-scroll/es-top.png) / [Selected Work entry](../../output/playwright/issue-129-hero-scroll/es-work-entry.png)

## Focused verification

- `npm run check`: 81 files, zero errors, warnings or hints.
- `npm run build` and `npm run validate:presentation`: PASS.
- Focused Playwright on Chromium and WebKit: 18 PASS. Firefox: 5 PASS. Coverage includes EN/ES, desktop 1366×768, mobile 390×844, forward/reverse scroll, no-JS, reduced-motion and a mid-scroll preference change. Tests also check Hero geometry, absence of page/console errors, and keyboard access on relevant routes.
- Browser-observed initial Home JavaScript: 8 fetched scripts totaling 92,080 B gzip plus 1,640 B gzip inline modules = **93,720 B gzip** on EN and ES; below the 100,000 B gate. No dependency added.
- On reduced-motion, the Hero remains at its complete, static initial state. Without JS, its essential text and links remain available.

Full release browser matrix and Lighthouse are deferred until human visual acceptance, per the current review boundary. This prototype has not been pushed, merged or deployed.

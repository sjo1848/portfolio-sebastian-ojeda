# Issue #129 — Hero motion prototype

State: **LOCAL PROTOTYPE / HUMAN VISUAL REVIEW READY**. No merge or deployment.

## Design decision

The earlier load animation hid part of the headline during the first second and had finished by the time a visitor was ready to look. The thesis now appears fully readable on load. As the visitor scrolls toward Selected Work, copper gives way to the cream text while the copper rule completes. Reverse scrolling restores the initial composition. The motion transfers emphasis from the claim to the work; it does not single out HMS or add another project to the Hero.

The follow-up visual reference was [Spring.io](https://spring.io/). Its useful principles are a stable, immediately legible statement, one changing point of emphasis, and bold flat brand geometry. The local adaptation uses one finite copper plane behind “REAL WORK.” / “DEL TRABAJO REAL.” It sweeps in on entry without hiding the words, then yields on scroll. There is no rotating claim or continuous loop. The copper plane and dark lettering are a visual prototype for human review, not a claim that this treatment has been accepted.

Sebastián Ojeda stays in the persistent SiteHeader, without a duplicate name in the Hero. Copy, project hierarchy, evidence and IA remain unchanged. The implementation uses a small scroll listener, `requestAnimationFrame`, and CSS custom properties; there is no animation library or new island. It is a visual prototype, pending human judgment of the motion itself.

## Preview and visual evidence

Local preview: `http://127.0.0.1:4184/` and `http://127.0.0.1:4184/es/`. Reload to see the copper plane enter over roughly two seconds. Then scroll slowly through the first ~250 px and reverse. All words remain readable throughout.

- [EN desktop entry, scroll and reverse recording](../../output/playwright/issue-129-spring-inspired/en-entry-scroll-reverse.webm)
- [ES mobile entry, scroll and reverse recording](../../output/playwright/issue-129-spring-inspired/es-entry-scroll-reverse.webm)
- [EN desktop entry](../../output/playwright/issue-129-spring-inspired/en-entry.png) / [settled](../../output/playwright/issue-129-spring-inspired/en-settled.png)
- [ES mobile entry](../../output/playwright/issue-129-spring-inspired/es-entry.png) / [settled](../../output/playwright/issue-129-spring-inspired/es-settled.png)
- [ES short mobile 360 px settled](../../output/playwright/issue-129-spring-inspired/es-360-settled.png)

Prior, quieter scroll prototype for comparison:

- [EN desktop forward and reverse recording](../../output/playwright/issue-129-hero-scroll/en-forward-reverse.webm)
- [ES mobile forward and reverse recording](../../output/playwright/issue-129-hero-scroll/es-forward-reverse.webm)
- [EN top](../../output/playwright/issue-129-hero-scroll/en-top.png) / [Selected Work entry](../../output/playwright/issue-129-hero-scroll/en-work-entry.png)
- [ES mobile top](../../output/playwright/issue-129-hero-scroll/es-top.png) / [Selected Work entry](../../output/playwright/issue-129-hero-scroll/es-work-entry.png)

## Focused verification

- `npm run check`: 81 files, zero errors, warnings or hints.
- `npm run build` and `npm run validate:presentation`: PASS.
- Focused Playwright across Chromium, Firefox and WebKit: 22/24 on the first parallel run. The Firefox axe timeout and WebKit preference-toggle timeout both passed on isolated rerun. The earlier scroll prototype had 23 focused tests pass. The two first-run timeouts remain a QA note for the eventual release matrix; no product error was reproduced.
- The follow-up visual change is CSS only. Previous browser-observed initial Home JavaScript: 8 fetched scripts totaling 92,080 B gzip plus 1,640 B gzip inline modules = **93,720 B gzip** on EN and ES; the JavaScript assets are unchanged and below the 100,000 B gate. No dependency added.
- EN desktop 1366 px, ES mobile 390 and 360 px: zero page overflow, zero headline clipping, zero console/page errors in the visual probe. At 360 px, the Spanish final line has 25.5 px of right inset after the proportional type adjustment.
- On reduced-motion, the Hero remains at its complete, static initial state. Without JS, its essential text and links remain available.

Full release browser matrix and Lighthouse are deferred until human visual acceptance, per the current review boundary. This prototype has not been pushed, merged or deployed.

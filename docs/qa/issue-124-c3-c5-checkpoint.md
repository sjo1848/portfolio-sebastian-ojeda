# Issue #124 — C3/C4/C5 checkpoint

**State:** `C3_C4_C5_PASS / C6_NOT_STARTED`  
**Branch:** `build/issue-124-proof-conversion`  
**Base:** `design/issue-124-c1-c2` at `255e3842e22c5162a28d8af9fe5faf112af3836f`  
**Scope:** portfolio proof reconciliation and presentation only. No PR, merge, deployment, or external-project change was made.

## Commits

| Increment | Commit | Result |
|---|---|---|
| C3 — HMS static proof reconciliation | `3a2cd5f48ca0903cad66b6a39bf2bdba1f9e9232` | Canonical local lifecycle evidence, accurate EN/ES limits, fail-closed HMS vendoring. |
| C4 — Alquileres static proof reconciliation | `4d536c99adf9bc028d22de4e4eb216e150874e50` | Three approved synthetic captures, exact source pin and copy. |
| C3 bounded test migration | `cdd341c` | Updated the no-JS HMS assertion to the one canonical static image. |
| C4 bounded gallery-copy rework | `700580b2a9c1b9789fd9280ec1f6f14bb45a6dc1` | Put the approved no-public-deployment limitation inside the Alquileres gallery. |
| C5 — conversion integration | `b9e6171a36aae5fe34a1ad49a010632bf3f1b9bf` | Added desktop Selected Work proof state/action synchronized with its evidence panel. |
| Evidence/report checkpoint | recorded in this commit | Screenshots, Lighthouse audit JSON, performance trace, and this report. |

## C3 — HMS Cloudflare

- Current proof remains `visual-evidence`; preferred future mode remains gated `recorded-walkthrough`; readiness is `pending-external-gate`.
- The source capture commit is `null` because exact capture lineage is still unknown. The retained files have SHA-256 checks; no source SHA was inferred.
- The reception lifecycle image is the only case-study evidence image. The full-page caption and adjacent limitation use the approved C2 EN/ES text and do not claim completed booking, payment, cash-close, remote acceptance, or production release.
- The cover is used only as the Selected Work preview with local/synthetic/non-production disclosure. The misleading billing, empty housekeeping, admin/users and duplicate assets are absent from public/build output.
- HMS media vendoring now fails closed because the current portfolio bytes cannot be tied to the pinned upstream capture commit.
- The no-JS regression was migrated to assert one canonical lifecycle image and its direct original-image link.

## C4 — Alquileres Uspallata

- Current and preferred proof remain `visual-evidence`; readiness is `available`; proof destination is the internal gallery only.
- Source commit is `267c531f3e3d5869240894063d3a194fa1f9680b`; all three published capture hashes are verified.
- Catalog, listing-detail and mobile captions plus the gallery limitation use the exact approved C2 copy in both locales.
- The gallery now visibly states that captures are reproducible and local, data and illustrations are synthetic, there is no public deployment, and availability is not real. The lifecycle label remains `Active development / Desarrollo activo`.
- No live-product URL or CTA was added.

## C5 — proof hierarchy

- Desktop Selected Work preserves the case-study row as primary navigation. The evidence pane adds the exact short state and a subordinate `View evidence / Ver evidencia` anchor for HMS and Alquileres.
- Active project changes update proof state, label and `href` together with the evidence panel. AI Commerce has no proof CTA or fabricated URL.
- Mobile keeps the existing direct case-study rows and HMS's disclosed cover image; it has no duplicate proof CTA. Proof is directly reachable inside each case study, including with JavaScript disabled.
- These additions reuse the existing vanilla Selected Work enhancement. No dependency, island, public runtime, analytics, or external service was added.
- HMS state copy is `Local test evidence / Evidencia de pruebas local`. Alquileres state copy is `Synthetic visual evidence / Evidencia visual sintética`.
- Forbidden product/demo actions (`Live`, `Production`, `Open product`, `Try demo`) are absent from proof CTAs.

## Validation

Final release QA ran after the last source changes:

```text
npm run qa:release
```

Result: PASS. Content and presentation validators passed; Astro check reported 0 errors, warnings, or hints; the static build completed with 22 HTML pages; static-asset, social-card, social-metadata, SEO, UX/accessibility, build, and sitemap validators passed. The sitemap contains 20 canonical URLs.

Browser and focused model evidence:

- A focused 230-case regression batch across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit passed 171 cases; 59 were expected skips because tests are restricted to their intended browser/profile. It found one stale pre-C3 assertion expecting multiple HMS evidence images; that assertion was migrated in `cdd341c` and its Chromium suite then passed 8/8.
- After the final C2 copy and gallery-placement rework, the changed-surface matrix ran 45 cases across the same five projects: **38 passed, 7 expected skips, 0 failed**. This includes Selected Work active proof synchronization, desktop/mobile composition, touch navigation, case-study proof links, and both-locale gallery limitation.
- Final `project-proof-model.spec.ts`: **7 passed** in Chromium. It checks all published proof records, artifact hashes, canonical/obsolete HMS assets in `public/` and `dist/`, exact C3/C4 copy, and UspaYa's withdrawn assets.
- The focused matrix also ran axe with WCAG 2.2 AA tags on Alquileres and AI active states, keyboard-focus activation, reduced-motion behavior, no-JS proof navigation, original-image fallback, and console/pageerror assertions. No page errors or console errors were reported.
- Case-study quick-scan and entry tests passed for HMS, Alquileres and AI Commerce in EN/ES, including their no-JS navigation paths.

The browser suite used a temporary, untracked Playwright config because Astro's preview command daemonizes and the repository `webServer` hook treats its early parent-process exit as a server failure. The temporary config retained the repository's five browser projects and `http://127.0.0.1:4184` base URL; the local preview and config were removed after validation.

## Home JavaScript and performance evidence

Home initial client JavaScript is **95,728 B gzip**, with **4,272 B** below the 100,000 B hard limit. The captured report lists the individual script responses and method in [`home-js-budget.json`](../../artifacts/lighthouse/issue-124-c5/home-js-budget.json). Method: sum the browser `ResourceTiming.encodedBodySize` of unique JavaScript responses after hydration plus gzip level 9 of executable inline script bodies, excluding JSON-LD. This is **598 B above** the Issue #116 I8 reported 95,130 B and remains within the preferred +3,000 B motion delta. No dependency or new island was added.

Chrome DevTools Lighthouse navigation audits of local Home EN returned 100/100 for Accessibility, Best Practices and SEO on desktop and mobile (zero failed audits). The tool does not provide a Lighthouse Performance category score. A separate local, unthrottled performance trace recorded LCP 290 ms and CLS 0.00; it is a single lab observation, not a Lighthouse Performance score or field Core Web Vitals result. CrUX had no field data (`NOT_YET_OBSERVABLE`). The JSON audit reports and compressed trace are in [`artifacts/lighthouse/issue-124-c5/`](../../artifacts/lighthouse/issue-124-c5/).

## Visual evidence

The representative screenshot set is in [`artifacts/visual/issue-124-c3-c5/`](../../artifacts/visual/issue-124-c3-c5/):

- Selected Work, HMS active: EN/ES desktop 1440.
- Selected Work, Alquileres active: EN/ES desktop 1440.
- HMS canonical evidence: EN/ES desktop 1440 and mobile 390.
- Alquileres gallery, including its explicit limitation: EN/ES desktop 1440 and mobile 390.

## Remaining boundary

C3–C5 are complete for Controller review. No Independent Critic was run because the Controller explicitly reserved that review for later. C6 has not started. No PR was opened, and this branch has not been merged or deployed.

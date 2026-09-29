# Issue #99 — Increment 3: case-study quick scan

## Contract and provenance

- Phase: BUILD — Increment 3.
- Base: I2 merged in PR #102, `552a51a`.
- Objective: let a hiring reviewer find the problem, system shape, evidence, material limitations, personal role/status, and repo/demo availability before reading the long narrative on the three approved lead cases.
- Implementation: static Astro markup; no new React island, client import, global state, content collection field, dependency, or build setting.
- A separate read-only evidence audit inspected the three linked source repositories. It supports source attribution but does not substitute for product acceptance or claim an independent security review.

## Delivered

- Added one reusable `CaseStudyQuickScan.astro` component, rendered only for HMS Cloudflare, Alquileres Uspallata, and AI Commerce + HMS.
- The case hero already presents the authored role, status, repository link, and stack. The quick scan adds four concise fields—problem, system, available evidence/validation, and limitations—without repeating role/status and stretching the mobile scan.
- The quick scan appears after the existing case hero and before the evidence gallery and long technical narrative. Its final link jumps to the first case-study heading using a native fragment URL.
- Repository access is explicit in the hero and quick scan. Because all three case `demo` fields are null, the quick scan says that no public demo link is provided; it does not imply that the repository is a deployed demo.
- Every original Markdown narrative and secondary case remains unchanged. The current status labels are reused as authored; I5 owns the planned status/evidence reconciliation.
- All copy is bilingual and carries existing Stone / Andes Copper tokens and the project button contract. The cards stack at mobile widths, use two columns on tablet, and three on wide desktop. Buttons preserve the existing 44 px minimum target.

## Field/source audit

The copy below is a concise synthesis of existing case material, with the additional Alquileres screenshot provenance checked against its public source repository. Nothing below asserts customer usage, production acceptance, outcomes, seniority, or sole authorship.

| Lead case | Problem / system source | Evidence and limit source | Repository evidence snapshot |
| --- | --- | --- | --- |
| HMS Cloudflare | Portfolio EN/ES `Problem` / `Problema` and `Architecture` / `Arquitectura` sections; authored role remains in frontmatter. | Portfolio EN/ES `QA and validation` / `QA y validación` and `Evidence and limits` / `Evidencia y límites`. Text explicitly keeps remote acceptance, mobile evidence, readiness, and release separate. | `sjo1848/hms-cloudflare` at `dd7d536848708346ca9616e0f54b0fc48ace0b07`: README architecture and QA, browser-regression scripts, local backup/restore rehearsal, and versioned Playwright evidence. Its orchestration status still identifies product acceptance as pending. |
| Alquileres Uspallata | Portfolio EN/ES `Problem` / `Problema` and `Architecture` / `Arquitectura`; authored role remains in frontmatter. | Portfolio EN/ES `QA and validation` / `QA y validación`, `Evidence and limits` / `Evidencia y límites`, and visible catalog/listing screenshots. The repo audit verified the capture workflow uses synthetic fixtures and that there is no public deployment; review/publication and admin-audit walkthroughs remain absent from the visible gallery. | `sjo1848/alquileres-uspa` at `5bcde39e0ca8abd2d5d2e0a9e9c90c5b3bf47a51`: `docs/portfolio-evidence.md`, seeded capture scripts/workflow, screenshot assets and API/authorization/contact tests. The repo's current candidate is awaiting Product Acceptance; the public case status itself is left untouched for I5. |
| AI Commerce + HMS | Portfolio EN/ES opening architecture story and `What the model can and cannot do` / `Qué puede hacer el modelo y qué no`; authored role remains in frontmatter. | Portfolio EN/ES `Operational evidence reached` / `Evidencia operacional alcanzada` and its explicit Phase 2.5/2.6 boundary. The quick scan scopes staging evidence to 2.5 and does not imply current-phase acceptance or a public demo. | `sjo1848/ai-commerce-platform` at `05d808f6b16053113d42119705bf42196cc85f4d`: README phase boundary, `.orchestration/evidence/ACP-2.5-CLOSURE.md`, and `.orchestration/STATUS.json` current phase/gate state. |

The three `role` values are published ownership summaries. This work preserves them as author-declared contribution statements; the audited repositories did not provide per-field attribution sufficient to independently prove sole ownership. The quick scan does not strengthen those claims.

## Source files and routes

| Area | Files |
| --- | --- |
| Static case scan data/component and placement | `src/data/projectQuickScans.ts`, `src/components/CaseStudyQuickScan.astro`, `src/components/ProjectPage.astro` |
| Stone / Andes Copper responsive presentation | `src/styles/global.css` |
| Bilingual browser/a11y/fallback checks | `tests/browser/case-study-quick-scan.spec.ts` |

Affected routes: HMS Cloudflare, Alquileres Uspallata, and AI Commerce + HMS in English and Spanish. Other case routes keep their existing page structure; every case long-form narrative stays intact.

## Validation

- `npm ci` with Node `24.21.0`, npm `11.19.0`: **PASS**, 350 packages audited, 0 vulnerabilities. npm emitted its existing esbuild install-script notice; no dependency or lockfile changes resulted.
- `npm run qa:release`: **PASS**. Astro check covered 59 files with 0 errors/warnings/hints; static build produced 22 pages; social card, static assets, social metadata, SEO/structured data, UX/accessibility, build, and 20 canonical sitemap URLs passed.
- `tests/browser/case-study-quick-scan.spec.ts`: **90/90 PASS** over Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. Each of the three cases in both locales is checked at 390 and 1440 px; all 12 desktop/mobile view scans run axe with WCAG 2.2 AA tags and report zero violations.
- Six locale/case combinations also load with JavaScript disabled, render all four quick-scan fields, and follow the native fragment link to the first detailed heading.
- Browser page console capture: zero page errors/warnings. Runner-only `NO_COLOR`/`FORCE_COLOR` Node notices do not originate from the pages.
- Hosted CI release/regression and Lighthouse gates: **PASS** in run `36506081837`. The responsive/accessibility browser matrix and its evidence upload passed; Lighthouse ran three samples each for `/`, `/es/`, and `/projects/hms-elite/`, all configured assertions passed, and the Lighthouse artifact was uploaded. No threshold was changed. Field CWV remain `NOT_YET_OBSERVABLE`.

## Performance

- No island, import, hydration directive, or browser script was added. The generated JavaScript assets are byte-identical to the I2 base build; initial JS remains the established **94,062 B gzip** on Home and **95,343 B gzip** on case pages. Case routes remain **54,657 B** below the 150,000 B soft target; Home remains **5,938 B** below 100,000 B.
- Compared a clean build at `552a51a` to the I3 worktree, case-page linked CSS changes from 52,796 B raw / 10,921 B gzip to 54,269 B raw / 11,145 B gzip: **+1,473 B raw / +224 B gzip**. Home CSS changes by the same shared +224 B gzip; its Home-specific CSS is unchanged. The delta is the static layout and responsive card styling.
- The quick-scan island-aware client-JS delta is **0 B**. Existing Lighthouse category thresholds remain in force; this report does not infer field Core Web Vitals from Lighthouse.

## Visual evidence

- [12 responsive quick-scan screenshots with SHA-256/size manifest](../../artifacts/visual/issue-99-increment-3/): all three lead cases × EN/ES × 390×844 / 1440×900.
- [Capture manifest and viewport metadata](../../output/playwright/issue-99-increment-3/capture-manifest.json).
- Screenshots show the rendered case scan under the sticky header; the browser tests additionally confirm all lower content and links.

## Risks and scope limits

- The Alquileres “synthetic, reproducible capture” statement was verified against the public repository commit above. It describes the capture fixtures/process, not a public demo or product deployment.
- HMS local regressions and recovery rehearsal do not close remote Product Acceptance. AI Commerce Phase 2.5 staging proof does not close Phase 2.6. Alquileres stays in the already-published active-development state until I5 reconciles that label against its current external status.
- No content outside the three new compact scans, branding, home hierarchy, contact methods, status metadata, professional facts, public demo, CV, LinkedIn, SEO metadata, canonical configuration, or project visibility changed.

## Independent gates

- Independent Critic: **PASS**. Verified contract scope, bilingual source-backed scan content, role/status and repo/demo metadata, preservation of full narratives and secondary cases, JS-disabled fragment behavior, screenshot evidence, and the declared client-JS/CSS deltas. Hosted Lighthouse remained pending at review time.
- Integration Review: **PASS**. Confirmed the scan follows each existing role/status hero and precedes the gallery and full narrative; evidence limits and demo availability are clear; secondary cases and technical depth remain intact; the Astro component adds 0 B client JS. Hosted release QA/Lighthouse remains the final external gate.
- Hosted release QA / Lighthouse: **PASS**. Branch checks passed responsive evidence capture, release contract, secret scan, full responsive/accessibility browser matrix, and Lighthouse budget assertions. [Lighthouse artifact](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36506081837/artifacts/11006904190) and [browser evidence artifact](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36506081837/artifacts/11007726373).

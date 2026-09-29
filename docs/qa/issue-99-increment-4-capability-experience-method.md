# Issue #99 — Increment 4: capability, experience, and method layering

## Contract and scope

- Phase: BUILD — Increment 4.
- Base: I3 merged to `main` as `37593981478b878e9e82e82992cafe8aab6c069b` (PR #103).
- Objective: connect listed capabilities to the three approved proof cases, improve the scan structure of existing operational experience, and replace competing process explanations with one brief path plus the complete Project Method.
- No new career facts, dates, tenure, seniority, metrics, project status, or outcomes were introduced.
- CV, LinkedIn, public demos, published case narratives, contact data, branding, Astro/React architecture, SEO configuration, and project order were not changed.

## Delivered

### Capability → evidence

Each of the five existing capability groups now includes direct links to the relevant lead case's static quick-scan anchor:

| Capability group | Proof links |
| --- | --- |
| Backend and architecture | HMS Cloudflare; Alquileres Uspallata |
| Web and mobile interfaces | Alquileres Uspallata |
| Data, cloud, and integration | HMS Cloudflare |
| AI and agentic systems | AI Commerce + HMS |
| Quality and operations | HMS Cloudflare; AI Commerce + HMS |

EN and ES use the same mapping and native URLs. The underlined proof links remain part of the existing Stone / Andes Copper visual system.

### Experience scanability

The two existing experience paragraphs are preserved verbatim and displayed as separate, labeled blocks: operational experience (SAP Basis, PI/PO and operational processes) and how that context informs current software work. No employment timeline or unsupported career claim was added. The human story remains intact and in its existing position after Method.

### Method layering

- The visible quick scan now presents three concise stages: Discover, Build, Verify (localized in Spanish as Descubrir, Construir, Verificar).
- The former five-step process list has been removed as a competing explanation. Its substantive ideas are summarized across those three stages.
- All eight canonical Project Method phases remain in the page in their existing sequence inside native `<details>/<summary>` disclosure. It works by keyboard and with JavaScript disabled.
- The details disclosure starts closed; it uses no hydrated component or client-side state.

## Files and affected routes

| Area | Files |
| --- | --- |
| Home composition, links, method disclosure, and responsive styles | `src/components/HomePage.astro` |
| Bilingual capability mappings and labels/copy | `src/data/site.ts` |
| Responsive, bilingual, keyboard, no-JS, and browser error tests | `tests/browser/home-capability-method.spec.ts` |
| Existing recruiter hierarchy regression | `tests/browser/home-information-hierarchy.spec.ts` |
| Durable screenshots | `artifacts/visual/issue-99-increment-4/` |

Affected routes are Home EN (`/`) and Home ES (`/es/`). Lead case routes are destinations only; their I3 content is unchanged.

## Validation

- Node `24.21.0`, npm `11.19.0`.
- `npm run qa:release`: **PASS**; Astro check reports 60 files, 0 errors/warnings/hints; all 22 generated pages, 20 sitemap URLs, content, assets, metadata, SEO/structured data, UX/a11y and build validators pass.
- `tests/browser/home-capability-method.spec.ts`: **40/40 PASS** across Chromium, Firefox, WebKit, Mobile Chromium and Mobile WebKit; EN/ES, widths 390/768/1440. This includes native summary keyboard activation, proof links, zero page errors/console errors, and two no-JavaScript end-to-end checks.
- Combined capability/method, home hierarchy, and baseline axe suites: **82 passed, 48 expected skips, 0 failed** across Chromium, Firefox, WebKit, Mobile Chromium, and Mobile WebKit. The 48 skips are the axe checks intentionally limited to Chromium.
- The axe suite checks Home EN/ES and HMS/Alquileres EN/ES at 390 and 1440 px in Chromium. Zero violations passed on all 12 states.
- Page output remains static except for the pre-existing CopyAction island. Method details and capability links add no React islands, hydration, or client JavaScript.
- Compared clean I3 commit `3759398` and the I4 build: Home linked CSS is 60,270 B raw / 12,607 B gzip at I3 and 62,433 B raw / 12,930 B gzip at I4 (**+2,163 B raw / +323 B gzip**). A representative case-study route is unchanged at 54,269 B raw / 11,145 B gzip. Generated/referenced client JavaScript is unchanged; client-JS delta is **0 B**. Existing Home and case JS budget headroom from I3 remains unchanged.
- No performance or accessibility threshold was changed. Field CWV remain `NOT_YET_OBSERVABLE`.

## Visual evidence

Playwright CLI viewport captures use a local built preview at 390 × 844, 768 × 900, and 1440 × 900. Both locale capability sections are represented at all widths; Spanish Method is captured closed and expanded to show all eight canonical phases.

| Screenshot | SHA-256 |
| --- | --- |
| `en-capabilities-390.png` | `f5260496227e677cf12d4f153bceef6f5829e66a73ce73a804d9d6ade84032bc` |
| `en-capabilities-768.png` | `0b8d3a9bcaea0838d754fea0781a1b5e8f2fbf0ccf74358ace87e686bb94f46e` |
| `en-capabilities-1440.png` | `0444a902343c0e84be74e7baa7831f6ece1586b954030bec8b3022308e574fea` |
| `es-capabilities-390.png` | `ab77c9b5df4cc4f50d0fe104f48526f4a568910ffbfc41fb7f146e17f73bab75` |
| `es-capabilities-768.png` | `1a6946e817867f634ece0dc420d35560568ac23f2b2d062911eb02c26b09b40b` |
| `es-capabilities-1440.png` | `eb8f98517ef7f5e8182c573466c13a0baf25f4c20ec5d12fb8c12a4315a96c63` |
| `es-method-closed-1440.png` | `734616c7d74851490c3198ff7bea8da0670fe46241665fb802970a0243b3cdd2` |
| `es-method-open-1440.png` | `ee90d55f7011f438582181e7ece44b0caa0431b1ab05dc072c90f6c5e4ed6232` |

## Independent gates

- Independent Critic: **PASS**. Confirmed all five groups map to the I1-approved lead-case evidence; the original experience copy and all method phases are preserved; native no-JS interaction, EN/ES parity, image hashes, and the zero-JS delta are supported. No unapproved CV, LinkedIn, demo, or professional claim was added.
- Integration Review: **PASS**. Confirmed coherence with I2/I3, static Astro delivery, accessible native disclosure, unchanged human story and project routes, no duplicate competing process, and local QA/browser/axe/no-JS validation.
- Hosted release QA/Lighthouse: **PENDING**. Deployment verification is reserved for I7 RELEASE.

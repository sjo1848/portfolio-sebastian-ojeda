# Issue #89 — Portfolio Quality & Conversion Discovery

**Phase:** DISCOVERY only
**Repository state inspected:** `main`, `bb65ce6427b338b2f0a2bd2c72af831c6dce85d8` (`bb65ce6`)
**Audit date:** 2026-09-28
**Outcome:** **PASS FOR HUMAN GATE**
**Build authorization:** none. This report makes recommendations only; no product, dependency, lockfile, workflow, published-content, design, SEO/configuration, or behavior changes were made.

## 1. Executive summary

The current release remains technically sound as a static Astro-first portfolio, but its maintenance baseline needs attention before another feature initiative: the lock resolves Astro 5.18.2, and current npm advisory data reports eight vulnerable package nodes, including a critical Astro aggregate finding; CI still uses Node 20, which reached EOL on 2026-03-24. Most individual findings are build/editor-tooling risks rather than exposed production server vulnerabilities because the deployed site is pre-rendered static output. The Astro AVIF optimization advisory is the notable build-supply-chain risk if untrusted AVIF media ever enters the build. Remediation should be a deliberate, tested toolchain migration; `npm audit fix` is not an adequate plan.

Frontend Excellence preserved strong browser, accessibility, and Lighthouse results. The Home initial-JS estimate is 95,974 B gzip against 100,000 B, leaving only 4,026 B headroom. Alquileres LCP is a text paragraph in the case hero; a high outlier is dominated by local main-thread style/layout and script evaluation, not a slow image or origin. These are lab measurements, not field Core Web Vitals.

The recruiter scan quickly conveys full-stack scope and provides project/GitHub links, but role fit, differentiated experience, the best two or three proofs, personal ownership, and evidence maturity are spread across sections and long case studies. All nine published cases have no public demo URL. Existing images and narratives support several reproducible local evidence claims, but they do not establish product acceptance or production operation. Alquileres and Taco Loco are the best bounded candidates for a future synthetic demo/walkthrough, subject to scope and privacy review.

Technical SEO foundations are present and internally validated: canonical, bilingual alternates, sitemap/robots, Open Graph, Person and SoftwareSourceCode JSON-LD. `sameAs` currently includes GitHub only; LinkedIn is unset. No Search Console/Bing verification or outcome evidence was found, so search index status cannot be inferred.

The immediate decisions for the Product Owner are whether to prioritize a supported Node/Astro security migration, which two recruiter/evidence improvements to define next, and whether a visible CV is wanted. CV visibility was deliberately removed and remains an explicit Human Gate. **No BUILD is authorized by this report.**

## 2. Dependency/security matrix

### Method and resolved versions

Commands run from the canonical commit:

```text
npm ci
npm audit --json
npm outdated --json
npm ls --all --parseable
npm explain astro devalue esbuild fast-uri js-yaml nanoid sharp svgo
node --version  # v24.18.0
npm --version   # 12.0.2
```

`npm ci` exited 0, installed 433 packages, and reported **8 vulnerable package nodes: 1 critical, 5 high, 1 moderate, 1 low**. The count is by vulnerable package node, not the number of individual GHSA records below. It also warned that install scripts for `esbuild@0.27.7`, `sharp@0.34.5`, and `esbuild@0.25.12` were blocked by this local npm 12 allow-scripts policy. No dependency or lockfile changes were made. CI uses Node 20/npm bundled by setup-node; therefore the local blocked-script warning is an environment difference to check during the future runtime migration, not proof that CI's install is broken.

The user-provided “Astro 5.17.1” is the package range in `package.json` (`^5.17.1`), not the version installed by this commit's lockfile: the resolved version is **Astro 5.18.2**. Dependency snapshot: `@astrojs/react` 4.4.2; `@astrojs/sitemap` 3.7.3; `@tailwindcss/vite` and Tailwind 4.3.3; React/React DOM 19.3.0; Base UI 1.8.0; Playwright 1.63.0; TypeScript 5.9.3.

The current npm registry reports Astro 7.3.5 as latest and the only aggregate Astro remediation selected by npm audit (semver major); `@astrojs/react` latest is 7.0.0, sitemap has a 3.7.4 patch, and TypeScript latest is 7.0.2. Tailwind, React, Base UI, and Playwright are at their current installed/latest release lines from `npm outdated --json`. “Latest” is a time-sensitive registry observation, not a recommendation to upgrade everything.

### Individual audit advisories

Severity below is the advisory severity from GitHub Advisory Database/npm audit. “Static build” means code is present in CI/build or local developer tooling; it does not mean an affected code path is reachable from the deployed static pages.

| Package / installed | Advisory and severity | Directness and dependency path | Exposure and actual applicability here | Fixed version; major? | Likely regression surface |
| --- | --- | --- | --- | --- | --- |
| `astro` 5.18.2 | [GHSA-j687-52p2-xcff](https://github.com/advisories/GHSA-j687-52p2-xcff) — moderate XSS in `define:vars`; [fixed 6.1.6](https://github.com/advisories/GHSA-j687-52p2-xcff) | Direct root dependency | Static build/compiler. Requires the affected directive and unsafe values; no arbitrary-user data/render endpoint was found. Reduced runtime applicability. | 6.1.6; Astro major 5→6 | Astro migration, rendering output, integration compatibility, route/build checks. |
| `astro` 5.18.2 | [GHSA-xr5h-phrj-8vxv](https://github.com/advisories/GHSA-xr5h-phrj-8vxv) — low server-island replay; fixed 6.1.10 | Direct root dependency | Server Islands are not part of this statically generated site; no server-island runtime found. | 6.1.10; major | Same Astro major migration; low feature applicability. |
| `astro` 5.18.2 | [GHSA-jrpj-wcv7-9fh9](https://github.com/advisories/GHSA-jrpj-wcv7-9fh9) — moderate spread-prop attribute XSS; fixed 6.4.6 | Direct root dependency | Build/render path. Relevant if unsafe untrusted attribute names reach spreads; current content is repository-authored. | 6.4.6; major | Astro 5→6 and HTML output regression tests. |
| `astro` 5.18.2 | [GHSA-f48w-9m4c-m7f5](https://github.com/advisories/GHSA-f48w-9m4c-m7f5) — moderate incomplete spread-attribute XSS fix; fixed 7.0.6 | Direct root dependency | Build/render path; depends on affected spread attributes and unsafe names, not an exposed request handler. | 7.0.6; major 5→7 | Astro 6/7 migration, output and integration compatibility. |
| `astro` 5.18.2 | [GHSA-7pw4-f3q4-r2p2](https://github.com/advisories/GHSA-7pw4-f3q4-r2p2) — low hydrated-island transition directive XSS; fixed 7.0.4 | Direct root dependency | Static render/hydrated island output; specific `transition:*` path. Review of current islands shows no View Transitions behavior in use, lowering applicability. | 7.0.4; major 5→7 | Astro 7 renderer/hydration output and generated-site regression. |
| `astro` 5.18.2 | [GHSA-4g3v-8h47-v7g6](https://github.com/advisories/GHSA-4g3v-8h47-v7g6) — moderate reflected XSS via View Transition properties; fixed 7.1.0 | Direct root dependency | No request-time SSR; affected transition properties not identified in product. | 7.1.0; major 5→7 | Astro 7 changes and HTML/hydration validation. |
| `astro` 5.18.2 | [GHSA-2pvr-wf23-7pc7](https://github.com/advisories/GHSA-2pvr-wf23-7pc7) — high Host-header SSRF in prerendered error-page fetch; fixed 6.4.6 | Direct root dependency | Build-time prerender error handling; not an always-on public server. Build/CI exposure, with reduced attack path absent hostile build request/header inputs. | 6.4.6; major | Astro build/error-page behavior and static output. |
| `astro` 5.18.2 | [GHSA-8hv8-536x-4wqp](https://github.com/advisories/GHSA-8hv8-536x-4wqp) — high reflected XSS via slot name; fixed 6.3.3 | Direct root dependency | Build/render path. Current slot names are code-authored, not user input. | 6.3.3; major | Astro component/slot rendering migration and route QA. |
| `astro` 5.18.2 | [GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) — **critical** RCE through AVIF image optimization; fixed Astro 7.2.8 | Direct root dependency; related vulnerable optimizer is optional transitive `astro → sharp@0.34.5` | **Build-time supply-chain risk.** Static site has no image-processing request endpoint and current evidence assets are checked into the repo. A crafted AVIF processed by Sharp is the relevant path; risk rises if untrusted PRs/media can reach CI. | Astro 7.2.8+ and Sharp 0.35.4+; Astro major 5→7 | Highest risk: Astro/Vite migration, image optimizer output, CI permissions and asset pipeline. |
| `astro` 5.18.2 | [GHSA-376h-93r7-7g6f](https://github.com/advisories/GHSA-376h-93r7-7g6f) — moderate base-path authorization bypass; fixed 7.2.4 | Direct root dependency | No application server/base-path authorization surface in the static deployment; build-time route/base generation only. | 7.2.4; major 5→7 | Astro routing/build output; run static route/link and SEO checks. |
| `devalue` 5.9.0 | [GHSA-9rgm-9g3h-6x36](https://github.com/advisories/GHSA-9rgm-9g3h-6x36) — moderate malformed-input DoS; fixed 5.9.2 per advisory record | Transitive: root → Astro → devalue | Build serialization; no user-input server endpoint. Risk depends on untrusted serialized input, not established here. | 5.9.2; package patch/minor, no major; transitive resolution needs validation | Astro serialization/hydration output and lock-tree change. |
| `esbuild` 0.27.7 | [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) — low arbitrary file read from dev server on Windows; fixed 0.28.1 | Transitive: root → Astro → esbuild. Vite also installs `esbuild@0.25.12`, outside this advisory's affected range. | Local Windows development-server exposure only; not deployed static runtime and current CI is Ubuntu. | 0.28.1; semver minor, but Astro owns this resolution in current graph | Vite/esbuild transforms and dev-server behavior. |
| `fast-uri` 3.1.5 | [GHSA-5jgf-p345-68v8](https://github.com/advisories/GHSA-5jgf-p345-68v8) — high host confusion via IDN; fixed 3.1.6 | Transitive dev-only: root → `@astrojs/check` → language server → YAML service/server → Ajv → fast-uri | Editor/check tooling, no client/runtime path found. | 3.1.6; patch, no major | Language-server validation and dependency resolution. |
| `fast-uri` 3.1.5 | [GHSA-f65p-4m7j-42xc](https://github.com/advisories/GHSA-f65p-4m7j-42xc) — high malformed IPv6 SSRF; fixed 3.1.6 | Same dev-only path via `@astrojs/check` / language server / Ajv | No deployed SSRF endpoint; dev/check tooling only. | 3.1.6; patch | Same language-server/tooling surface. |
| `fast-uri` 3.1.5 | [GHSA-fph4-wmhf-6fwf](https://github.com/advisories/GHSA-fph4-wmhf-6fwf) — high repeated percent-decoding SSRF; fixed 3.1.6 | Same dev-only path via `@astrojs/check` / language server / Ajv | No deployed SSRF endpoint; dev/check tooling only. | 3.1.6; patch | Same language-server/tooling surface. |
| `fast-uri` 3.1.5 | [GHSA-jqff-g426-hqxp](https://github.com/advisories/GHSA-jqff-g426-hqxp) — high percent-encoded scheme host confusion; fixed 3.1.6 | Same dev-only path via `@astrojs/check` / language server / Ajv | No deployed URL-fetch service; tooling only. | 3.1.6; patch | Same language-server/tooling surface. |
| `js-yaml` 4.3.1 | [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) — high CPU exhaustion from merge sources; fixed 4.3.2 | Transitive: root → Astro and root → Astro → `@astrojs/markdown-remark` → js-yaml | Build-time Markdown/frontmatter parsing. Repository frontmatter is reviewed source; applicability grows if untrusted content is built. | 4.3.2; patch | Content parsing, frontmatter/schema validation, build time. |
| `nanoid` 3.3.17 | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) — high zero-size custom generator loop; fixed 3.3.18 | Transitive: root → Astro → Vite → PostCSS → nanoid | CSS/build tooling; no direct application use or deployed runtime use found. | 3.3.18; patch | CSS build and generated identifiers. |
| `sharp` 0.34.5 | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) — high inherited libvips issues (CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591); fixed 0.35.0 | Optional transitive: root → Astro → optional Sharp | Build-time image processing only; depends on vulnerable formats/functions being reached. No runtime image service in deployment. | 0.35.0; patch/minor. Aggregate npm Astro fix selects major Astro 7.3.5. | Optimized media output, native libvips binaries/platforms. |
| `sharp` 0.34.5 | [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) — high libheif issues (GHSA-g89c-p67h-r497, GHSA-2jg2-4ch7-h545); fixed 0.35.4 | Same optional Astro → Sharp path | Build-time media optimization; critical companion risk if hostile AVIF/HEIF enters optimizer. | 0.35.4; patch/minor, but current aggregate resolution is through Astro major | Native image output and install/runtime binary compatibility. |
| `svgo` 4.0.2 | [GHSA-w27v-7q3p-w38r](https://github.com/advisories/GHSA-w27v-7q3p-w38r) — high sanitizer bypass through links/namespaces/control chars; fixed 4.1.0 | Transitive: root → Astro → SVGO | Build-time SVG optimization. Repository SVG is trusted source today; if affected sanitizer output is served as active SVG, browser impact is possible. Verify whether these SVGs traverse SVGO. | 4.1.0; minor | SVG optimizer output and media visual integrity. |
| `svgo` 4.0.2 | [GHSA-4vpr-x523-8j87](https://github.com/advisories/GHSA-4vpr-x523-8j87) — moderate executable `foreignObject` sanitizer bypass; fixed 4.1.0 | Same Astro → SVGO path | Same conditional build/asset exposure; no user-uploaded SVG path was found. | 4.1.0; minor | SVG optimizer/output and served asset behavior. |

**Interpretation:** directness is not exploitability. The major actionable concern is stale direct Astro plus Node CI being EOL. The transitive advisories are predominantly static-build, local editor, or optional media-tooling exposure. No public request-time Node runtime exists in the Cloudflare Pages artifact. For the AVIF RCE, do not accept untrusted image inputs into a build before the optimizer is remediated. Individual GHSA fix versions come from GitHub Advisory Database records fetched on audit date; npm's aggregate `fixAvailable` for Astro is Astro 7.3.5 and is major.

## 3. Runtime/support matrix

| Surface | Current state | Support finding | Discovery recommendation |
| --- | --- | --- | --- |
| GitHub Actions CI/release/visual | `node-version: 20` in `.github/workflows/ci.yml`, `release-readiness.yml`, `visual-review.yml` | Node 20 reached EOL 2026-03-24. No further upstream security updates. | Move CI/build to a supported even-numbered LTS line; validate Node 24 LTS first or Node 22.12+ as minimum-compatible target. Avoid Current/odd lines. |
| Astro 5.18.2 | Package range `^5.17.1`; resolved lock version 5.18.2; engine supports 18.20.8, 20.3+, 22+ | Current version can run on Node 22/24, but the CI line itself is EOL. Multiple advisories affect the resolved Astro; npm chooses Astro 7.3.5 as aggregate fix. | Supported path is staged Astro 5→6→7 per migration guides; Astro 7 requires Node >=22.12 and Vite 8. Do not treat this as a patch-only update. Astro 7.2.8 is minimum for critical advisory; latest audited fix was 7.3.5. |
| Astro React integration | `@astrojs/react` 4.4.2, supports React 17/18/19, Node 18.20.8/20.3/22+ | Compatible with present Astro 5/React 19 stack. Current major 7 supports React 19 and Node >=22.12, but integration migration adds OXC transform dependency and needs Astro 7 validation. | Upgrade in the Astro migration sequence, not independently by major. Confirm islands/client chunks and hydration in browser matrix. |
| Tailwind | Tailwind + `@tailwindcss/vite` 4.3.3; plugin peer Vite 5–8 | Current Astro/Vite config matches official Tailwind v4 Astro setup; the plugin's declared Vite peer range includes Vite 8. | No compatibility blocker found. Verify CSS/tokens/visual snapshots through Astro 7/Vite 8 migration. |
| React/Base UI | React + DOM 19.3.0; Base UI 1.8.0 peer supports React 17–19 | Peer metadata is compatible; Base UI is used by the approved Dialog/Drawer/Sheet primitives. | Retain unless a measured issue appears; test keyboard/touch/assistive tech after runtime/major migration. |
| Playwright | 1.63.0, requires Node >=20 | Technically accepts Node 22/24. | Browser suite can run on target LTS; rerun Chromium/Firefox/WebKit and mobile profiles after changing CI. |
| Deployment runtime | Static Cloudflare Pages build; no server adapter/runtime configured | Node is a build/test runtime, not public request runtime. | Keep deployment static; no server runtime addition is proposed. |

Official references: [Node release schedule](https://nodejs.org/en/about/previous-releases), [Astro installation requirements](https://docs.astro.build/en/install-and-setup/), [Astro v6 upgrade](https://docs.astro.build/en/guides/upgrade-to/v6/), [Astro v7 upgrade](https://docs.astro.build/en/guides/upgrade-to/v7/), [Tailwind Astro integration](https://tailwindcss.com/docs/installation/framework-guides/astro), [Playwright system requirements](https://playwright.dev/docs/intro#system-requirements).

**Unused dependency scan:** all declared direct packages have an observed use: Astro, React integration/islands, sitemap, Tailwind/Vite, Base UI primitives, React runtime/types, Astro check, axe and Playwright. No obviously removable direct dependency was identified. This was a repository import/config/test scan, not a tree-shaking proof. The npm registry showed newer major lines for Astro integration and TypeScript; their presence in `npm outdated` is not evidence they should be upgraded outside a coordinated migration.

## 4. Performance findings

Evidence source: 18 persisted Lighthouse JSON runs and the I6 report in `artifacts/lighthouse/frontend-excellence-increment-6/` and `docs/qa/frontend-excellence-increment-6.md`. The I6 report table omitted one Spanish Alquileres run: raw JSON includes 2,725.64 ms, so observed Alquileres ranges are **EN 2,431–2,873 ms; ES 2,429–2,726 ms**. This is a documentation reconciliation, not a new gate failure.

- **Actual LCP:** `header.case-hero > div.container > div > p.hero-copy`, the Alquileres case-summary paragraph, in the inspected EN and ES Lighthouse runs. It is text, not a screenshot/image.
- **Outlier (~2,872.8 ms):** Lighthouse reports TTFB ~28.7 ms, element-render delay ~1,230.7 ms, ~1.9 s total main-thread work, ~633 ms style/layout and ~462 ms script evaluation. This points to transient local render/main-thread scheduling/layout cost rather than a slow production origin. A single lab trace does not prove a stable root cause; investigate with repeat profiling before optimizing.
- **Images:** Alquileres screenshots are PNG RGB: desktop catalog 1440×1200 / 141,847 B; detail desktop 1440×1200 / 51,717 B; catalog mobile 390×844 / 45,967 B. A Lighthouse sample transferred all three, 240,445 B total, though they are gallery evidence and marked lazy/deferred in `EvidenceGallery.tsx`. Lab viewport/scroll can trigger below-fold media; this is not the initial-JS budget and should not be conflated with LCP ownership.
- **Resource snapshot:** representative ES trace transfers about 363,688 B total: images 240,445 B, scripts 100,715 B, CSS 12,150 B. One network report lists shared React renderer ~211,366 B raw / 67,179 B transferred, plus route/island chunks. Shared stylesheet is 52,876 B raw / 11,069 B gzip; route stylesheet transfer ~12 KB.
- **Initial JavaScript:** Home is estimated at 95,974 B gzip against 100,000 B = only **4,026 B** margin (4.03% of cap; 95.97% consumed). Case studies are 96,885 B gzip against 150,000 B. Navigation hydrates `client:load`; case contents use `client:idle`; evidence gallery/viewer chunks are `client:visible`/deferred. The Lighthouse trace may include visible gallery chunks, so total request bytes are higher than initial-route budget.
- **Field metrics:** no verified CrUX/RUM sample exists. LCP/INP/CLS field CWV remain **NOT_YET_OBSERVABLE**. Do not infer field LCP from Lighthouse or add tracking solely to create a pass.

Possible future investigations (no optimization performed): encode evidence PNG as high-quality WebP/AVIF only after text/diagram legibility review; ensure mobile `srcset/sizes` selects appropriately sized images; profile style/layout and script tasks on the Alquileres hero using repeatable traces; preserve deferred media and islands. Avoid global JS growth while Home has ~4 KB initial JS budget headroom. Lighthouse I6 thresholds and scores remained passing (performance minimum 0.93; accessibility, best practices and SEO 1.00; CLS 0). No regression evidence presently justifies removing React islands.

## 5. Recruiter journey audit

**10–30 second scan**

- The page immediately identifies “Full-stack software developer” and describes end-to-end work. It supplies direct case-study and GitHub actions.
- Five role targets live in `src/data/site.ts`, but the role list is not surfaced as a compact recruiter-readable choice on the page. Contact eventually says Full-Stack, Backend, Applied AI and automation.
- Differentiation—operational/SAP experience plus backend/integrations and controlled AI—is distributed through hero, experience, method and project narratives.
- The first proof is HMS Cloudflare, a credible brownfield technical migration whose acceptance remains explicitly separate. It is not a quick finished-product proof. Alquileres follows, then AI Commerce and UspaYa. The primary/secondary distinction (four primary, two complementary) exists but does not explain which evidence best fits a role.
- Cards help with title, status, summary, role, stack and CTA. The scan can find projects and contact, but not quickly compare evidence maturity or identify the strongest 2–3 for a specific hiring signal.

**3–5 minute technical review**

- Case study headers expose summary, status, personal role, year, stack and repository. HMS Cloudflare/Alquileres move into problem/context/architecture, with security/trade-offs/QA/results deeper in the narrative.
- Repo is discoverable, but no project has a public demo URL. Evidence maturity, limitations and remote acceptance details take scrolling to find; no compact “at a glance” summary unifies state, ownership, validation, limitations and demo/repo.
- A reader can find architecture, backend/data, security and QA in long cases; a time-boxed reviewer cannot reach all those topics consistently from one standard opening.
- Do not relabel a local reproducible build as production-validated or imply recruiter conversion without analytics/user research.

## 6. Content hierarchy findings

- Home sequence is Projects → About → Capabilities → Experience → Method → Contact. Recruiters must scan most project proof before receiving the operational background that differentiates the author.
- About has four paragraphs (~260 English words) centered on place, discovery, learning and mountains. It adds voice and personality, but no tenure/employer timeline; it is relatively long for the role-fit information it contributes to the hiring scan.
- Capabilities are four dense technology groupings. They substantiate breadth but are not consistently linked to case evidence from the capability label itself.
- Experience provides two paragraphs about SAP Basis, PI/PO, operations, permissions, data quality, AI/agents, CI/CD and observability. It gives useful context but not an explicit timeline, years, employment setting or scope of personal ownership.
- Method has an 8-phase Project Method sequence and a second five-step explanation; the hero repeats a 3-step Discover/Build/Verify summary. This is the clearest content redundancy/cognitive-load opportunity. The detailed public method remains a differentiator; any simplification is a product/content decision, not an automatic deletion.
- Contact provides email link/copy, GitHub, location, work mode and English level. LinkedIn is absent. No visible CV CTA exists by deliberate prior decision.
- Project titles are human-readable, though HMS Elite / HMS Cloudflare / AI Commerce + HMS and their repo naming require context. Statuses are honest but use a mixed vocabulary (active development, technical migration validated, acceptance pending, MVP, experimental, closed vertical/pre-pilot). A shared label taxonomy may help comparison but must preserve exact limitations.
- Visible content source is split: home About/experience comes from `src/data/humanStory.ts` and `src/data/site.ts`; `content/profile/about.md` and `experience.md` are marked draft/pending approval. This can mislead later editors about which copy ships. Do not rewrite content during this discovery.

## 7. Evidence/demo matrix

Classification applies to the **published evidence currently visible**, not the ultimate product. There are 9 published cases, zero public `demo` URLs, and ES/EN `evidenceNeeded` lists currently match. Repositories return HTTP 200 on the audit agent's HEAD checks; portfolio route responses also returned 200, but direct site fetch from this environment was restricted, so no fresh live demo/UI claims are made.

| Published case | Current classification | Repo/demo and strongest recruiter-visible proof | Gap / safe boundary |
| --- | --- | --- | --- |
| Agentic Engineering Governance | Experimental prototype | No public repository or demo link; narrative references local eval/DICS/PIK evidence. | Private implementation repos; evidenceNeeded includes sanitized Context Amnesia, DICS/PIK diagram, real-source M1 validation. Keep claims experimental; no public system artifact currently inspectable. |
| AI Commerce + HMS | Controlled demo (phase 2.5); 2.6 remains experimental/in progress | Public repo; narrative reports controlled staging availability/quote, reserve/cancel, HITL and synthetic cross-repo E2E. | No demo/screenshots. Need real-model conversation/HITL/adversarial evidence. Do not expose real tenant or staging; synthetic data and scrubbed credentials only. |
| Alquileres Uspallata | Reproducible local evidence | Public repo; catalog desktop, catalog mobile, detail desktop PNGs provide concrete UI proof. | Active development, no production deployment; no review/admin proof or captions/provenance. `evidenceNeeded` still asks for catalog/detail already present. Best candidate for a read-only synthetic catalog/detail demo. Never expose real owner/contact/availability data. |
| GasFlow | Reproducible local evidence | Public repo; local Docker/product narrative, current MVP status and role model. | No linked project screenshots; Android build/public demo pending; offline resilience not demonstrated. `evidenceNeeded` asks for admin, driver and end-to-end evidence. Consider a seeded recorded workflow only after reproducible build and synthetic data. |
| HMS Cloudflare | Reproducible local evidence | Public repo; local Playwright regression screenshots show reception, housekeeping, billing and admin workflows, primarily desktop. | Remote Product Acceptance is explicitly separate; no mobile evidence. `evidenceNeeded` still asks remote reception, accepted candidate mobile and remote acceptance. Good later sanitized technical walkthrough; no public live tenant. |
| HMS Elite | Reproducible local evidence | Public repo; `ui-actual.png` exists but is not linked as verified case media. | Active development; reproducible source/build provenance and workflow-specific verified captures remain pending. No demo. Do not treat a standalone unlinked image as validated evidence. |
| JM Soluciones | Reproducible local build/release evidence | Public repo; issue #25 records privacy-reviewed WebP cover and reproducible workflow screenshots. | Case currently has no `demo` URL and states staging/static release; confirm production URL/business consent before any public demo. No customer/worksite photos without explicit permission. |
| Taco Loco | Reproducible local evidence | Public repo; desktop and 390px mobile menu images exist but are not linked from the case. | MVP is local; hosted demo and physical device validation pending. A seeded synthetic menu→customize→intent walkthrough is a bounded candidate; it must state intent only (no payment/automatic confirmation). |
| UspaYa | Reproducible local evidence, vertical closed but not pilot-validated | Public repo; four mobile actor screenshots exist, not linked in the case. | Explicitly not ready for closed pilot/public release pending auth/fallback/real actors. Addresses, phone numbers and PIN/state data are privacy-sensitive; no interactive public demo. Use only sanitized evidence if later approved. |

**Candidate shortlist (only two):** (1) Alquileres read-only synthetic catalog/detail, reusing current desktop/mobile evidence; (2) Taco Loco synthetic seeded menu/intent recording or isolated read-only demo. Both require a later initiative contract, privacy confirmation, reproducibility criteria and explicit non-production claims. Do not deploy either from this discovery. `evidenceNeeded` reconciliation is warranted for Alquileres, Taco Loco, UspaYa, HMS Elite, and potentially other cases where media is present but unlinked; it should only remove an entry after source/provenance and acceptance are verified.

## 8. Professional conversion findings

- GitHub is prominently linked and appears in Person `sameAs`; portfolio repositories are public for eight cases. Agentic Engineering Governance is the exception and discloses private implementations.
- LinkedIn is `null` in `src/data/site.ts`, not shown in Contact, and absent from `sameAs`. No verified LinkedIn URL/profile evidence was found in repository sources. Owner must supply/approve the canonical profile before adding it.
- Email is direct and copyable; contact supports work mode, Mendoza location, and English level. No visible friction identified in the path to email.
- There is no compact employment/experience timeline or tenure/employer context. The SAP/operations narrative is useful differentiation but does not quantify professional experience or personal ownership by project consistently.
- CV/resume files exist in repository/generated output history, but the visible CV CTA was deliberately removed. Restoring a visible CV link is a **HUMAN_GATE** requiring Product Owner approval. This report neither recommends automatic restoration nor changes it.

## 9. SEO/discoverability findings

Current repository build and existing release evidence show:

- English canonical host is `https://sebastian-ojeda.pages.dev`; each route has one canonical; `og:url` matches.
- Reciprocal `en-US` / `es-AR` alternates and `x-default` (English) are emitted; legacy `/en` paths redirect to root. The generated pairs are checked by validators.
- `robots.txt` permits crawling and points to the sitemap index. Sitemap index and child sitemap contain 20 canonical page URLs (9 projects per language plus two home routes), excluding 404 and legacy routes.
- Open Graph and Twitter metadata/social image are present.
- Person and WebSite JSON-LD are emitted on site pages; project pages also emit SoftwareSourceCode with repository, language, image, author and canonical URL. `sameAs` presently lists GitHub only.
- Existing scripts validate build canonical/hreflang, social metadata, sitemap and structured data. Historical I6 production verification is documented in `docs/qa/frontend-excellence-increment-6.md` and #78.
- No Search Console/Bing verification file, property ownership evidence, indexing coverage, impressions or query data was found. Search visibility and index coverage are therefore **NOT_YET_OBSERVABLE**, not a proven failure.
- This audit environment received HTTP 403 on fresh direct checks to the live site/robots/sitemap; the SEO specialist did not claim a new live crawl. Existing #78 deployment evidence remains historical supporting evidence.

No Search Console, Bing, analytics, RUM, tracking or custom domain is proposed in DISCOVERY.

## 10. Legacy issue reconciliation

No issues were closed or edited. Classifications use current main/release evidence and the issue acceptance criteria.

| Issue | Classification | Evidence and rationale |
| --- | --- | --- |
| #10 — hosted production / launch evidence | **STILL_ACTIONABLE** (narrow residual) | Its original deployment SHA/host and several checkboxes are superseded by later releases, especially #78's post-deploy route/SEO/browser verification. CV download and visible-CV checks are superseded by the deliberate removal decision. However, its “review and publish LinkedIn before broad professional promotion” item is still open and LinkedIn is currently unset. Reconcile the issue text rather than treating its old hostname/checklist as current. |
| #63 — Branding release verification | **SUPERSEDED** | #78's later production verification on the selected canonical host and the post-branding main state supersede the old wait-on-commit checklist. I6 report includes visual/browser/ES-EN and release evidence; issue-specific live revalidation is historical, so do not reopen or repeat it automatically. |
| #5 — HMS Elite portfolio evidence | **STILL_ACTIONABLE** | The issue requires reproducible source/build provenance plus workflow-specific verified media and updated evidence/status table. An unlinked `ui-actual.png` exists, but does not satisfy the issue's reproducibility and purpose-specific acceptance conditions by itself. |
| #6 — GasFlow portfolio evidence | **STILL_ACTIONABLE** | Admin/driver/stock workflow captures, viewport/commit/seed/build provenance, synthetic data and integrated case evidence remain unchecked; issue #25 still tracks those captures. |
| #25 — GasFlow media / JM permissions | **STILL_ACTIONABLE** (GasFlow only) | JM Soluciones privacy-safe WebP cover and reproducible capture criteria are marked complete. The real-work photo permission is explicitly not a blocker because current evidence uses UI. GasFlow role captures and reproducibility remain pending. |

## 11. Risks and contradictions

1. **Astro baseline wording:** issue text names Astro 5.17.1; declared range is `^5.17.1`, lock resolves 5.18.2. The security conclusion remains, but remediation must be based on the locked tree.
2. **Lighthouse range omission:** existing I6 table omits an ES 2.726 s run found in persisted JSON; corrected ranges appear above. It does not alter Lighthouse pass/fail.
3. **Static does not mean zero build risk:** no public Node server exists, which lowers several runtime advisories, but PR-controlled media/content still reaches build tools. In particular, crafted AVIF processing can execute in CI/build.
4. **EOL CI vs current local environment:** workflows use Node 20; local audit used Node 24.18/npm 12. `npm ci` warns that three native/tool install scripts were blocked by npm 12 allow-scripts policy. Resolve this environment difference as part of choosing CI's supported LTS, without silently weakening installation controls.
5. **Evidence lists vs actual assets:** `evidenceNeeded` still lists visual work for cases that have unlinked or already-present assets. Assets should not count as evidence until provenance, relevance, privacy and case integration meet acceptance criteria.
6. **Conversion assumptions lack outcome data:** no recruiter interviews, funnel data, analytics or search-console data are available. Proposed hierarchy changes are hypotheses, not validated conversion improvements.
7. **LinkedIn and CV depend on owner authority:** the LinkedIn URL is absent; visible CV was intentionally removed. Neither identity link nor resume visibility should be fabricated or restored automatically.

## 12. Prioritized backlog

### P0

- Plan a coordinated supported-runtime and Astro security migration: target Node 22.12+ minimum (prefer a supported LTS selected by PO/Controller), then stage Astro 5→6→7 and aligned official integrations. Minimum audited Astro fix is 7.2.8; at audit time latest/fix candidate is 7.3.5. Include the sharp/AVIF build input boundary, native package install behavior, Vite 8, build/static output, SEO, all React islands, accessibility, and full browser/visual/performance regression. No upgrade is performed here.
- Replace Node 20 in all CI workflow surfaces after target runtime is selected and compatibility validated. Keep current security/release gates intact.

### P1

- Define a recruiter-first evidence hierarchy: state role fit, differentiator, personal contribution and 2–3 strongest proofs in a quick scan; retain honest project status/limitations. Validate content choices with Product Owner/recruiter feedback before editing.
- Define one compact case-study “at a glance” information contract for status, ownership, architecture, validation, limitations, repository and demo/evidence availability.
- Select at most one bounded future synthetic demo/walkthrough to start (Alquileres first recommendation; Taco Loco alternative), with privacy, synthetic data, reproducibility, responsive/keyboard QA and explicit “not production” labels.
- Reconcile `evidenceNeeded` against existing unlinked screenshots while preserving provenance/privacy acceptance; prioritize HMS Elite and GasFlow only after their capture recipes and input builds are reproducible.
- After runtime migration, repeat Alquileres EN/ES trace profiling and verify responsive evidence image sizing/format; no change is justified from the current single LCP outlier alone.

### P2

- Simplify or layer the overlapping hero/process/method summaries; keep the full Project Method available for technical readers.
- Make Experience/ownership evidence easier to scan; decide if a concise approved professional timeline adds value.
- Add a verified LinkedIn profile link and JSON-LD `sameAs` only after owner provides the exact public profile URL.
- Consider status vocabulary and public case naming consistency, preserving distinctions among local evidence, controlled demo, acceptance, production and experiment.
- Consider a Search Console/Bing verification/submission workflow only if the Product Owner authorizes it later; first establish an owner-controlled account/property. No tool or tracking added now.
- Reconcile legacy issue bodies (#10, #5, #6, #25) with completed and still-pending criteria; do not close in this DISCOVERY phase.

### NOT RECOMMENDED

- `npm audit fix`/`--force`, bulk dependency upgrades, or treating a green `npm audit` as a substitute for supported runtime and migration testing.
- Adding analytics/RUM/Search Console/custom domain or changing public SEO surfaces merely to make search/CWV observable.
- Reintroducing visible CV without the required Product Owner Human Gate.
- Public interactive demos for UspaYa or real hotel/tenant/customer data; claims of production/remote acceptance for local screenshots; exposing credentials, real addresses, phone numbers, tokens or customer records.
- Removing React islands, flattening the Astro-first architecture, or adding client state to solve the small LCP lab outlier without repeat evidence.
- Adding more cases, component demonstrations or new product copy before role/evidence hierarchy is agreed.

## 13. Proposed next initiative scope

**Recommended next Controller-defined initiative:** “Supported build toolchain migration and security closure,” a bounded BUILD/VALIDATE sequence after the Product Owner selects Node LTS target. Begin with Node CI alignment, then staged Astro 6 and Astro 7 migration on separate reviewable increments; align `@astrojs/react`/Vite, remediate remaining transitive packages, and prove no regression in static output, SEO, React island hydration, browser matrix, accessibility, bundle and Lighthouse. Do not combine content rewrite or public demo with the toolchain migration. A follow-on conversion/evidence initiative should be separately scoped after Product Owner chooses top role and top 2–3 proofs.

This is a recommendation to the Controller/Product Owner, **not permission to BUILD** and not a final architecture decision.

## 14. HUMAN_GATE decisions required

1. **Runtime target for future implementation:** choose supported Node LTS policy (recommended Node 24 LTS if all deployment/build integrations confirm it; Node 22.12+ is Astro 7's stated floor and remains supported at audit date). CI runs must prove the chosen line, and EOL policy must be explicit.
2. **Next initiative ordering:** prioritize security/runtime migration first (recommended due critical advisory + EOL CI), then choose recruiter/evidence hierarchy and demo scope as a distinct initiative.
3. **Professional target:** confirm which role is primary (Full-Stack, Backend, or Applied AI/automation) and approve the 2–3 proof projects that should lead the recruiter journey.
4. **CV visibility:** decide explicitly whether the deliberately removed visible CV should remain absent or be restored. Restoring it requires approval; default discovery recommendation is to leave current state unchanged until that decision.
5. **Demo candidate:** choose Alquileres synthetic catalog/detail or Taco Loco seeded menu/intent for the first bounded demo/walkthrough, or defer public demo. Confirm data/privacy boundaries before any demo BUILD or publication.
6. **LinkedIn:** provide and approve the exact public profile URL if it should be linked. No URL can be inferred safely from this repository.

These decisions do not block completion of DISCOVERY. They are handoff gates before a future implementation scope is authorized.

## 15. What must not be modified in DISCOVERY

- No product code, package versions, package lock, npm overrides, workflow runtime, or release process.
- No published content, project ordering, status labels, visual design, UX, behavior, or Astro/React architecture.
- No canonical/site URL, metadata, structured data, sitemap/robots configuration, tracking, analytics, RUM, Search Console, Bing, or custom-domain settings.
- No public demo, deployment, user/customer data, screenshot publication, or issue closure.
- No visible CV restoration without Product Owner approval.
- No BUILD after this report until a new Controller authorization arrives.

## Review gates

- Dependency/security specialist: completed, read-only.
- Performance specialist: completed, read-only.
- Recruiter/content UX specialist: completed, read-only.
- Project evidence specialist: completed, read-only.
- SEO/discoverability specialist: completed, read-only.
- Independent Critic: **PASS**; reviewed the completed 15-section report against the Controller Execution Contract.
- Integration Review: **PASS** after bounded report-only revalidation; confirmed section 10 contains one #5 row and final recommendations preserve the Issue #78 architecture and BUILD boundary.

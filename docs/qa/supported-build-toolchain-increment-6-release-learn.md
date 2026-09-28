# Supported Build Toolchain — Increment 6: RELEASE / LEARN

## Contract and release identity

- Issue: #91, Supported Build Toolchain Migration & Security Closure.
- Phase: RELEASE → LEARN.
- Release source: `main` at `71652be3b14eac04aa29e7502715ded8187e6bda` (PR #97 merge). PR #97 contains release-candidate evidence only; the product/toolchain state it validates is the state merged in PR #96 (`c2442d0348c3f285908c09c0b8e6deb3b1b565c4`).
- Canonical production host: `https://sebastian-ojeda.pages.dev`.
- Scope remained build-toolchain/security maintenance. No product source, content, recruiter hierarchy, design, UX, branding, canonical configuration, CV, or LinkedIn changes were part of I5/I6.
- No separate deployment mutation was required: the repository's existing Cloudflare Pages main-branch integration published the merged main state. Production was verified after the #97 merge. The Pages root does not expose a source SHA in HTTP; the production HTML references the same hashed stylesheet assets as a local build from the verified main tree. I5 was evidence-only, so it changed no generated site output.

## Final supported toolchain and audit

The pinned runtime and final resolved versions are recorded in [`final-toolchain.json`](../../artifacts/dependencies/supported-build-toolchain-increment-6/final-toolchain.json) and [`npm-ls-depth0.txt`](../../artifacts/dependencies/supported-build-toolchain-increment-6/npm-ls-depth0.txt).

| Component | Final version |
| --- | ---: |
| Node | 24.21.0 LTS |
| npm | 11.19.0 |
| Astro | 7.3.5 |
| `@astrojs/react` | 6.0.6 |
| `@astrojs/check` | 0.9.10 |
| `@astrojs/sitemap` | 3.7.3 |
| Vite | 8.3.1 |
| React / React DOM | 19.3.0 / 19.3.0 |
| Tailwind / `@tailwindcss/vite` | 4.3.3 / 4.3.3 |
| Base UI | 1.8.0 |
| Sharp | 0.35.5 |

- Exact-runtime `npm ci`: PASS, 349 packages, zero vulnerabilities. The existing npm install-script notice for esbuild remains; no script permission was added, and the clean install plus Astro build passed.
- Exact-runtime `npm run qa:release`: PASS; Astro check covered 55 files with 0 errors, warnings, or hints; static build produced 22 HTML pages and 20 sitemap URLs; existing content, presentation, asset, social metadata, SEO/structured data, accessibility/UX, sitemap, and build validators passed.
- Post-merge GitHub Actions on release main `71652be3b14eac04aa29e7502715ded8187e6bda`: [Portfolio CI](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36481999524) and [Release readiness](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36481999570) both PASS.
- Exact-runtime `npm audit --json`: 0 info, 0 low, 0 moderate, 0 high, 0 critical, 0 total. Full output: [`npm-audit-final.json`](../../artifacts/dependencies/supported-build-toolchain-increment-6/npm-audit-final.json).
- Staged migration history: Node 24 PR #93; Astro 6 PR #94; Astro 7/security floor PR #95; residual `devalue`/`fast-uri` advisory closure PR #96. No forced audit fix was used.

## Production verification

The live smoke artifact is [`live-smoke.json`](../../artifacts/production/supported-build-toolchain-increment-6/live-smoke.json). Against the canonical production host:

- All six priority routes returned HTTP 200 in both Chromium desktop and Mobile WebKit profiles (12 route/browser visits).
- No browser console errors or uncaught page errors were observed.
- Each route's canonical and `og:url` matched its exact canonical route; EN/ES hreflang alternates and the expected `Person`, `WebSite`, and case-study `SoftwareSourceCode` structured data were present.
- `robots.txt`, `sitemap-index.xml`, and the leaf sitemap returned 200. Robots declared the canonical sitemap; the leaf sitemap had 20 URLs and contained all six priority routes.
- Production HTML referenced the same hashed Home stylesheet assets as a fresh local Astro build of the main release tree.
- Responsive behavior, interaction, keyboard/accessibility, and browser regression coverage is from the complete Increment 5 hosted matrix: Chromium, Firefox, WebKit, Mobile Chrome, and Mobile WebKit; 344 passed, 171 expected skips, 0 failed. Both [hosted PR #97 CI runs](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36480966443) and [the duplicate run](https://github.com/sjo1848/portfolio-sebastian-ojeda/actions/runs/36480945627) passed the full release QA/Lighthouse job and secret scan.

## Performance and budget result

The unchanged Lighthouse CI assertions and floors passed against all six priority routes. Accessibility, Best Practices, and SEO were 1.00 for all local runs; CLS was 0. The raw report records Home Performance 0.88/0.89/0.96 and lab LCP up to 2,747 ms for Alquileres ES. This is run-to-run lab variation; the existing LHCI aggregate passes, but that is not a claim that every raw Home score exceeded 0.90. Field Core Web Vitals remain `NOT_YET_OBSERVABLE`.

Initial client-JS gzip is unchanged from I4 and remains below approved soft budgets:

| Route group | I0 baseline | Release candidate | Delta | Soft budget |
| --- | ---: | ---: | ---: | ---: |
| Home | 95,974 B | 94,062 B | −1,912 B | 100,000 B |
| HMS case study | 96,885 B | 95,343 B | −1,542 B | 150,000 B |

Deferred viewer (12,553 B) and gallery (14,220 B) chunks remain outside initial-JS totals. No hydration strategy or product interaction changed during this toolchain initiative.

## LEARN

**Hypothesis:** the portfolio can stay Astro-first and preserve its employment-facing story while moving to a supported runtime/framework line and closing applicable dependency vulnerabilities.

- **What worked:** the staged Node 24 → Astro 6 → Astro 7 sequence preserved the static route/SEO output, React island ownership, approved visual system, bilingual routes, and release/browser gates. Targeted lockfile resolution closed the residual audit findings without a forced upgrade. The production smoke agrees with the canonical metadata and static build output.
- **What did not:** Lighthouse raw results remain variable under the existing threshold aggregation; the aggregate CI gate is not a substitute for per-run stability or field CWV. No runtime field data was available to evaluate user-experienced CWV.
- **Residual risks:** esbuild's install script remains unapproved under npm's allowScripts notice, while clean install, Astro checks/build, and hosted browser/Lighthouse CI all pass without it. Lab LCP variability should remain visible in future release reviews. Field CWV stays `NOT_YET_OBSERVABLE`.
- **Do not continue adding scope from this result:** no React migration, component expansion, dependency modernization campaign, recruiter/content changes, analytics/RUM, or performance redesign is justified by this maintenance release alone.
- **Future action:** none is opened automatically. Revisit only on concrete upstream support/security changes or measured user-facing performance evidence.

## Independent release gates

- Independent Critic: **PASS** — independently rechecked final versions and zero audit, hosted browser/Lighthouse runs and floors, live routes/SEO/sitemap/robots/console evidence, performance qualification, product scope, deployment-attribution limitation, and LEARN conclusions.
- Integration Review: **PASS** — independently confirmed coherent staged migration/security evidence, preserved Astro-first product and scope, zero audit, production route/SEO/browser smoke, hosted gates, bundle/performance qualification, LEARN, and documented deployment-attribution limitation.

Issue #91 may be closed only after both final independent verdicts are PASS and production verification remains green.

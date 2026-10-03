# Issue #127 B0 — baseline

- Contract: GitHub Issue #127, BUILD authorized after Issue #125 Controller Review `5963507804` and Product Owner decision `5963563511`.
- Repository baseline: `origin/main` at `5f478a2b2da7ee470699e09e1e9587ded7f312fd`.
- Dedicated worktree: `/home/sjo1848/dev/portolio/portfolio-issue-127-aplus-build` on `build/issue-127-aplus`.
- Baseline implementation: the C+ hero in `src/components/HomePage.astro` and `src/styles/branding.css`; no Issue #127 implementation changes were present at baseline.
- `npm ci`: passed (349 packages; 0 vulnerabilities). npm reported `esbuild@0.28.2` install script blocked by local allow-scripts policy; the existing Astro check and production build ran successfully.
- `npm run qa:release`: passed on the baseline. Content, presentation, Astro check (77 files, 0 errors/warnings/hints), 22-page static build, social/static assets, social metadata, SEO, UX/accessibility, build and sitemap validations all passed.
- Browser baseline not separately captured in B0; current checked-in Issue #116 baseline artifacts provide C+ visual reference. Issue #127 browser matrix will be run after implementation.
- Scope: no #124 changes, no merge or deploy.

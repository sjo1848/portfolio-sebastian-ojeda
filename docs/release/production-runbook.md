# Production release and rollback runbook

## Scope

This runbook covers the static Astro portfolio deployed to Cloudflare Pages from the `main` branch.

Production URL: `https://portfolio-sebastian-ojeda.pages.dev`

## Release procedure

1. Confirm the pull request is approved and all GitHub Actions checks are green.
2. Confirm preview deployments remain disabled and the PR contains the complete intended batch.
3. Squash merge the PR into `main`.
4. In Cloudflare Pages, confirm exactly one production deployment starts from `main`.
5. Wait for the deployment status to become `Success`.

## Post-deployment verification

Check these routes:

- `/`
- `/cv-sebastian-ojeda.pdf`
- `/projects/hms-elite/`
- `/projects/gasflow/`
- `/projects/amr-refrigeracion/`
- `/robots.txt`
- `/sitemap-index.xml`
- `/pagina-que-no-existe`

Verify:

- the homepage loads without horizontal overflow;
- navigation and keyboard focus work;
- the CV opens or downloads;
- project routes return the expected content;
- the 404 page is shown for an invalid route;
- canonical URLs use the production domain;
- sitemap and robots reference the production domain;
- the HMS image loads and has meaningful alternative text.

## Rollback criteria

Rollback when production has any of these conditions:

- homepage or project pages fail to load;
- the CV is unavailable;
- canonical, sitemap or robots point to an incorrect domain;
- a serious accessibility regression blocks navigation;
- a broken asset materially damages the portfolio presentation.

## Rollback procedure

Preferred method:

1. Open Cloudflare Pages.
2. Go to `Deployments`.
3. Select the last known-good production deployment.
4. Use `Rollback to this deployment` or the equivalent restore action.
5. Verify the critical routes again.

Repository fallback:

1. Revert the merge commit on a new branch.
2. Run the full GitHub Actions validation.
3. Merge the revert into `main`.
4. Verify the new Cloudflare production deployment.

## Build-budget rule

- Work on feature branches.
- Validate with GitHub Actions.
- Keep Cloudflare preview builds disabled.
- Merge one complete batch to `main`.
- Avoid documentation-only pushes to `main` unless they must be publicly deployed.

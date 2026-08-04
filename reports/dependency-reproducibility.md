# Dependency reproducibility evidence

## Scope

This report defines the evidence required to accept the npm dependency baseline.

## Required repository state

- `package.json` and `package-lock.json` are versioned together.
- GitHub Actions installs with `npm ci`.
- npm cache keys are derived from the lockfile.
- Temporary lockfile-generation workflows are absent from the final branch.

## Required checks

```text
npm ci --no-audit --no-fund
npm run check
npm run build
```

## Acceptance rule

The dependency PR may leave draft state only when the checks above pass on its final head commit. A successful earlier commit does not validate a later generated lockfile or workflow change.

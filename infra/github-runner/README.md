# Local GitHub Actions runner (Docker)

This runner is a temporary/local execution target for the portfolio workflows when GitHub-hosted Actions minutes are unavailable.

## Security model

- It is repository-scoped.
- It does **not** mount `/var/run/docker.sock`.
- It should only run trusted workflows from this private repository.
- Do not expose it to untrusted fork PRs or reuse it broadly without reviewing the threat model.

## Requirements

- Linux x64 host.
- Docker Engine with Docker Compose v2.
- Outbound HTTPS access to GitHub, Node distribution endpoints and npm.
- The container runs the runner as a dedicated non-root user.

The image includes Git, Python 3, curl and Google Chrome because the current portfolio workflows require them. Node 20 is installed by `actions/setup-node` inside each job.

## 1. Get the one-time registration token

In GitHub open:

`portfolio-sebastian-ojeda -> Settings -> Actions -> Runners -> New self-hosted runner`

Choose Linux / x64. Copy the temporary token shown in the `./config.sh --url ... --token ...` command. Do not commit it.

## 2. Start the runner

From the repository root:

```bash
cd infra/github-runner
cp .env.example .env
```

Edit `.env` and replace `PASTE_ONE_TIME_REGISTRATION_TOKEN_HERE` with the temporary runner token.

Then:

```bash
docker compose up -d --build
```

Follow startup:

```bash
docker compose logs -f portfolio-runner
```

A successful registration ends with the runner listening for jobs.

## 3. Verify in GitHub

Open:

`Settings -> Actions -> Runners`

Expected runner:

- name: `portfolio-local-docker`
- status: `Idle` or `Active`
- labels: `self-hosted`, `Linux`, `X64`, `portfolio`, `docker`

The portfolio workflows target:

```yaml
runs-on: [self-hosted, Linux, X64, portfolio]
```

Only one job can run at a time on this single runner. Other jobs remain queued and execute sequentially.

The current PR workflows are expected to remain `queued` until this runner comes online. Once registration succeeds, GitHub should assign those queued jobs automatically; no extra rerun is normally needed.

## 4. Registration token lifecycle

`RUNNER_TOKEN` is only used for first registration. Runner credentials are copied into the `runner-state` Docker volume, so ordinary container restarts do not need a fresh registration token.

After successful registration remove the token value from the local `.env` file. Do not remove the `runner-state` volume unless you intend to register the runner again.

## Useful commands

```bash
# Status
docker compose ps

# Logs
docker compose logs -f portfolio-runner

# Restart
docker compose restart portfolio-runner

# Stop without deleting state
docker compose stop

# Start again
docker compose start

# Rebuild image while keeping volumes
docker compose up -d --build
```

If the runner needs to be completely recreated, remove it first from GitHub's Runners settings, obtain a fresh registration token, then remove the local state volume and start again.

## Why there is no Docker socket mount

The current portfolio CI does not require Docker commands or Docker container actions. Avoiding the host Docker socket keeps the runner container substantially more isolated from the host. If a future workflow genuinely needs Docker, add that capability deliberately rather than exposing the host daemon by default.

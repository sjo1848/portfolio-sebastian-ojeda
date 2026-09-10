#!/usr/bin/env bash
set -euo pipefail

RUNNER_HOME=/opt/actions-runner
STATE_DIR=/runner-state
REPO_URL=${REPO_URL:-https://github.com/sjo1848/portfolio-sebastian-ojeda}
RUNNER_NAME=${RUNNER_NAME:-portfolio-local-docker}
RUNNER_LABELS=${RUNNER_LABELS:-portfolio,docker}

cd "$RUNNER_HOME"

restore_state() {
  local file
  for file in .runner .credentials .credentials_rsaparams; do
    if [[ -f "$STATE_DIR/$file" ]]; then
      cp "$STATE_DIR/$file" "$RUNNER_HOME/$file"
    fi
  done
}

persist_state() {
  local file
  for file in .runner .credentials .credentials_rsaparams; do
    if [[ -f "$RUNNER_HOME/$file" ]]; then
      cp "$RUNNER_HOME/$file" "$STATE_DIR/$file"
    fi
  done
}

has_runner_state() {
  [[ -f "$STATE_DIR/.runner" && -f "$STATE_DIR/.credentials" ]]
}

restore_state

if ! has_runner_state; then
  if [[ -f .runner || -f .credentials ]]; then
    echo "Runner state is incomplete; refusing to register over partial local state." >&2
    echo "Remove the runner-state volume only after removing the runner from GitHub, then register again." >&2
    exit 1
  fi

  if [[ -z "${RUNNER_TOKEN:-}" ]]; then
    echo "RUNNER_TOKEN is required for first-time registration." >&2
    echo "GitHub: Settings -> Actions -> Runners -> New self-hosted runner." >&2
    exit 1
  fi

  ./config.sh \
    --unattended \
    --replace \
    --url "$REPO_URL" \
    --token "$RUNNER_TOKEN" \
    --name "$RUNNER_NAME" \
    --labels "$RUNNER_LABELS" \
    --work _work

  persist_state
fi

# The registration token is only needed while registering. Runner credentials
# are persisted in /runner-state so normal container restarts do not need it.
unset RUNNER_TOKEN

exec ./run.sh

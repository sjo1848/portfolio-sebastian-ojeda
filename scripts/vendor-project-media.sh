#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/media/projects/hms-cloudflare
mkdir -p public/media/projects/alquileres-uspa

download_png() {
  local url="$1"
  local output="$2"

  curl --fail --location --silent --show-error \
    --retry 4 --retry-all-errors --connect-timeout 15 --max-time 120 \
    "$url" --output "$output"

  local signature
  signature="$(head -c 8 "$output" | od -An -t x1 | tr -d ' \n')"
  if [[ "$signature" != "89504e470d0a1a0a" ]]; then
    echo "Invalid PNG signature: $output" >&2
    exit 1
  fi

  local bytes
  bytes="$(wc -c < "$output")"
  if (( bytes < 10000 )); then
    echo "PNG unexpectedly small ($bytes bytes): $output" >&2
    exit 1
  fi

  echo "Vendored $output ($bytes bytes)"
}

ALQUILERES_COMMIT="267c531f3e3d5869240894063d3a194fa1f9680b"

echo "HMS media vendoring disabled: exact source capture provenance is not verified." >&2

download_png \
  "https://raw.githubusercontent.com/sjo1848/alquileres-uspa/${ALQUILERES_COMMIT}/docs/media/portfolio/catalog-results-desktop-1440x1200.png" \
  "public/media/projects/alquileres-uspa/catalog-results-desktop-1440x1200.png"

#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/media/projects/hms-cloudflare
mkdir -p public/media/projects/uspaya
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

HMS_COMMIT="dd7d536848708346ca9616e0f54b0fc48ace0b07"
USPAYA_COMMIT="2abc58a3ea7efb131df248472ea4473d67445760"
ALQUILERES_COMMIT="5bcde39e0ca8abd2d5d2e0a9e9c90c5b3bf47a51"

for file in \
  cf-i04-reception-lifecycle.png \
  cf-i05-integrated-housekeeping.png \
  cf-i06-billing.png \
  cf-i07-admin.png; do
  download_png \
    "https://raw.githubusercontent.com/sjo1848/hms-cloudflare/${HMS_COMMIT}/output/playwright/${file}" \
    "public/media/projects/hms-cloudflare/${file}"
done

for file in \
  uspaya-operations-mobile.png \
  uspaya-customer-mobile.png \
  uspaya-merchant-mobile.png \
  uspaya-courier-mobile.png; do
  download_png \
    "https://raw.githubusercontent.com/sjo1848/UspaYa/${USPAYA_COMMIT}/docs/media/portfolio/${file}" \
    "public/media/projects/uspaya/${file}"
done

download_png \
  "https://raw.githubusercontent.com/sjo1848/alquileres-uspa/${ALQUILERES_COMMIT}/docs/media/portfolio/catalog-results-desktop-1440x1200.png" \
  "public/media/projects/alquileres-uspa/catalog-results-desktop-1440x1200.png"

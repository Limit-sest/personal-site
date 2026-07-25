#!/usr/bin/env bash
#
# Restores fonts that are licensed and therefore kept out of the repository.
#
# The Agrandir display font is gitignored, so a plain checkout builds without
# it. Nothing fails in that case: a CSS url() is never resolved at build time,
# and font-display: swap silently falls back to ClashDisplay-Semibold. That is
# how production ended up serving the wrong display font unnoticed.
#
# Set REQUIRE_LICENSED_FONTS=1 to turn a missing secret into an error. Do that
# on the deploy path so production can never ship without it. Leave it unset on
# the CI path, where a missing secret should not block a build from validating.

set -euo pipefail

dest="public/fonts/PPAgrandir-GrandHeavy.woff2"
require="${REQUIRE_LICENSED_FONTS:-0}"

if [ -z "${AGRANDIR_WOFF2_B64:-}" ]; then
  msg="AGRANDIR_WOFF2_B64 is not set"
  if [ "$require" = "1" ]; then
    echo "::error::${msg}; refusing to deploy without the Agrandir display font"
    exit 1
  fi
  echo "::warning::${msg}; building without Agrandir (falls back to ClashDisplay-Semibold)"
  exit 0
fi

mkdir -p "$(dirname "$dest")"
printf '%s' "$AGRANDIR_WOFF2_B64" | base64 -d >"$dest"

# Every woff2 file begins with the ASCII signature "wOF2". Checking it catches a
# mangled secret here, rather than as a broken font in the browser.
if [ "$(head -c 4 "$dest")" != "wOF2" ]; then
  echo "::error::decoded AGRANDIR_WOFF2_B64 is not a valid woff2 file"
  rm -f "$dest"
  exit 1
fi

# The signature alone still accepts a truncated file. The woff2 header declares
# the total length as a big-endian uint32 at offset 8, so compare it to reality.
declared=$(od -An -tu4 -N4 -j8 --endian=big "$dest" | tr -d '[:space:]')
actual=$(wc -c <"$dest")
if [ "$declared" != "$actual" ]; then
  echo "::error::decoded AGRANDIR_WOFF2_B64 is truncated or padded: header declares ${declared} bytes, got ${actual}"
  rm -f "$dest"
  exit 1
fi

echo "Restored ${dest} ($(wc -c <"$dest") bytes)"

#!/usr/bin/env bash
# Fetch the sound library (release "sound-kit", built by the "Thư viện âm thanh" workflow) into sound/:
#   sound/kit    1,100+ CC0 effects (opus-sound-layer)   sound/extra  CC0 foley + music fetched automatically
# Safe to call often; missing parts just mean the synth fallback is used.
set -uo pipefail
mkdir -p sound; ok=0
for part in kit extra; do
  [ -d "sound/$part" ] && { ok=1; continue; }
  if gh release download sound-kit -p "sound-$part.tar.gz" -D /tmp --clobber ${GITHUB_REPOSITORY:+-R "$GITHUB_REPOSITORY"} 2>/dev/null; then
    tar xzf "/tmp/sound-$part.tar.gz" -C sound && ok=1 && echo "sound/$part: đã tải"
  fi
done
[ "$ok" = 1 ] || { echo "chưa có thư viện âm thanh (workflow Thư viện âm thanh chưa chạy) — dùng âm thanh tổng hợp"; exit 1; }

#!/usr/bin/env bash
# Sound for one video. New sound layer first; if anything in it fails, the old synth + mix.sh path,
# so a video never ships silent because of the sound layer. Usage: scripts/audio.sh <slug> <out.m4a>
set -uo pipefail
S="$1"; OUT="$2"
scripts/get_kit.sh || true
if python3 scripts/audio.py "$S" "$OUT"; then exit 0; fi
echo "::warning::$S: lớp âm thanh mới lỗi → dùng cách cũ (âm thanh tổng hợp)"
set -e
mkdir -p out
python3 scripts/sfx.py --events "src/videos/$S/events.json" --timing "src/videos/$S/timing.json" --out "out/sfx_$S.wav"
scripts/mix.sh "assets/$S/voice.mp3" "out/sfx_$S.wav" "src/videos/$S/mix.json" "$OUT"

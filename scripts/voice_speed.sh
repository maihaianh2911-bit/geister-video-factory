#!/usr/bin/env bash
# Speed up a generated voice by config.json "voice_speed" (e.g. 1.1 = 10 % faster, pitch unchanged).
# Clone voices on 11labs.id.vn take no speed setting, so it is done here, before word alignment.
# Usage: scripts/voice_speed.sh <voice.mp3>
set -euo pipefail
F="$1"
SP=$(python3 -c "import json;print(float(json.load(open('config.json')).get('voice_speed',1.0)))" 2>/dev/null || echo 1.0)
python3 -c "import sys;sys.exit(0 if abs(float('$SP')-1.0)>0.001 else 1)" || { echo "voice_speed=1.0 — giữ nguyên"; exit 0; }
ffmpeg -v error -y -i "$F" -af "atempo=$SP" -c:a libmp3lame -q:a 2 "$F.tmp.mp3" && mv "$F.tmp.mp3" "$F"
echo "giọng nhanh hơn ×$SP"

#!/usr/bin/env bash
# Mix voice + SFX with gentle ducking, then bring the whole mix to a target loudness.
# Usage: scripts/mix.sh voice.mp3 sfx.wav mix.json out.m4a
# mix.json keys (all optional): voice_gain, sfx_gain, duck_threshold, duck_ratio, target_lufs
set -euo pipefail
VOICE="$1"; SFX="$2"; CFG="$3"; OUT="$4"
get() { python3 -c "import json,sys;d=json.load(open('$CFG')) if __import__('os').path.exists('$CFG') else {};print(d.get('$1',$2))"; }
VG=$(get voice_gain 0.5); SG=$(get sfx_gain 1.0); TH=$(get duck_threshold 0.1); RA=$(get duck_ratio 3); TL=$(get target_lufs -14)
echo "mix: voice_gain=$VG sfx_gain=$SG duck_threshold=$TH duck_ratio=$RA target=$TL LUFS"
TMP=$(mktemp -d)
ffmpeg -v error -y -i "$VOICE" -i "$SFX" -filter_complex \
  "[0:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-2:LRA=11,apad=pad_dur=4,asplit=2[v0][vsc];[v0]volume=$VG[v];[1:a]volume=$SG[s];[s][vsc]sidechaincompress=threshold=$TH:ratio=$RA:attack=20:release=400[sd];[v][sd]amix=inputs=2:duration=shortest:normalize=0[m]" \
  -map "[m]" -c:a pcm_s16le "$TMP/raw.wav"
I=$(ffmpeg -nostats -i "$TMP/raw.wav" -af ebur128=framelog=quiet -f null - 2>&1 | grep " I:" | tail -1 | grep -o "[-0-9.]*" | head -1)
GAIN=$(python3 -c "print(round($TL - ($I), 2))")
echo "mix loudness before: $I LUFS -> gain ${GAIN} dB"
ffmpeg -v error -y -i "$TMP/raw.wav" -af "volume=${GAIN}dB,alimiter=limit=0.89:level=false" -c:a aac -b:a 192k "$OUT"
ffmpeg -nostats -i "$OUT" -af ebur128=framelog=quiet -f null - 2>&1 | grep -E " I:| Peak:" | tail -2
rm -rf "$TMP"

#!/usr/bin/env bash
# QA on the final MP4: format, frame count vs. expected, full decode, long freezes, contact sheet.
# Usage: scripts/qa.sh out/geister.mp4 <expected_frames>
set -euo pipefail
F="$1"; EXP="${2:-0}"
echo "== probe"
ffprobe -v error -count_frames -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,pix_fmt,nb_read_frames -show_entries format=duration -of compact "$F" | tee out/qa_probe.txt
FRAMES=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$F")
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$F")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$F")
FAIL=0
[ "$W" = "1080" ] && [ "$H" = "1920" ] || { echo "FAIL size ${W}x${H}"; FAIL=1; }
if [ "$EXP" != "0" ] && [ "$FRAMES" != "$EXP" ]; then echo "FAIL frames $FRAMES != $EXP"; FAIL=1; fi
echo "== full decode"
ffmpeg -v error -xerror -i "$F" -f null - && echo "decode ok" || { echo "FAIL decode"; FAIL=1; }
echo "== freezes >= 2s (suspicious holds)"
ffmpeg -i "$F" -vf "freezedetect=n=0.001:d=2" -an -f null - 2>&1 | grep -o "freeze_start: [0-9.]*\|freeze_duration: [0-9.]*" | tee out/qa_freeze.txt || echo "none"
echo "== contact sheet"
ffmpeg -v error -y -i "$F" -vf "fps=1/2,scale=180:-1,tile=11x4" -frames:v 1 out/contact_sheet.jpg
exit $FAIL

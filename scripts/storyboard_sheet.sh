#!/usr/bin/env bash
# Number each storyboard still and tile them 4 per row. Usage: scripts/storyboard_sheet.sh <slug>
set -euo pipefail
D="out/preview/$1"; FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
rm -f "$D"/tile_*.png
shopt -s nullglob
i=0
for f in "$D"/sb_*.png "$D"/sb_*.jpg; do
  i=$((i+1)); n=$(basename "${f%.*}" | sed 's/sb_0*//')
  if [ -f "$FONT" ]; then
    ffmpeg -v error -y -i "$f" -vf "scale=360:640,drawbox=x=0:y=0:w=84:h=70:color=black@0.7:t=fill,drawtext=fontfile=$FONT:text='$n':x=18:y=12:fontsize=46:fontcolor=0xffd27a" "$D/tile_$(printf %02d $i).png"
  else
    ffmpeg -v error -y -i "$f" -vf "scale=360:640" "$D/tile_$(printf %02d $i).png"
  fi
done
[ "$i" -gt 0 ] || { echo "No storyboard images"; exit 1; }
COLS=4; ROWS=$(( (i + COLS - 1) / COLS ))
ffmpeg -v error -y -pattern_type glob -i "$D/tile_*.png" -vf "tile=${COLS}x${ROWS}:padding=8:color=0x0b1020" -frames:v 1 -q:v 3 "$D/storyboard.jpg"
echo "storyboard: $i shots -> $D/storyboard.jpg"


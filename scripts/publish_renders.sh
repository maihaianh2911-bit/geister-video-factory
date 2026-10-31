#!/usr/bin/env bash
# Copy files into a folder of the 'renders' branch and push. Usage: scripts/publish_renders.sh <dest_dir|.> file1 [file2 ...]
set -euo pipefail
DEST="$1"; shift
URL="https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
FILES=(); for f in "$@"; do FILES+=("$(realpath "$f")"); done
WT=$(mktemp -d)
git fetch -q --depth 1 "$URL" renders:refs/remotes/origin/renders
git worktree add -q --detach "$WT" origin/renders
cd "$WT"; git config user.name render-bot; git config user.email render-bot@users.noreply.github.com
# Several videos often finish at once. On a rejected push, start again from the new tip and copy the files again:
# rebasing onto a depth-1 fetch replays the other run's commit, conflicts, and (30/10, v69) pushed the tip without our files.
for i in 1 2 3 4 5 6; do
  git fetch -q --depth 1 "$URL" renders
  git reset -q --hard FETCH_HEAD
  mkdir -p "$DEST"; cp "${FILES[@]}" "$DEST/"
  git add -A; git commit -q -m "publish $DEST ($GITHUB_RUN_ID)" || true
  git push -q "$URL" HEAD:renders && { echo "published to renders/$DEST"; exit 0; }
  sleep $((i * 5))
done
echo "::error::không đẩy được lên renders"; exit 1

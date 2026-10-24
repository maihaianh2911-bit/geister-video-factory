#!/usr/bin/env bash
# Commit given paths to main and push with the workflow token (checkout runs without persisted credentials,
# so generated scene code executed in other steps can never read a token from .git/config).
# Usage: scripts/git_push.sh "message" path1 [path2 ...]
set -euo pipefail
MSG="$1"; shift
git config user.name render-bot; git config user.email render-bot@users.noreply.github.com
git add -- "$@" 2>/dev/null || true
if git diff --cached --quiet; then echo "nothing to commit"; exit 0; fi
git commit -q -m "$MSG"
URL="https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
for i in 1 2 3; do
  git pull -q --rebase "$URL" main && git push -q "$URL" HEAD:main && { echo "pushed: $MSG"; exit 0; }
  sleep $((i * 5))
done
echo "::error::không đẩy được lên main"; exit 1

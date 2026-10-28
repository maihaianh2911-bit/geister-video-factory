#!/usr/bin/env bash
# Start the Claude Code scheduled task right away (its API trigger), so work begins as soon as there is
# usage left instead of waiting for the hourly safety-net run. Needs repo secrets CLAUDE_TASK_URL (the
# task's "Fire URL") and CLAUDE_TASK_TOKEN. Never fails the workflow: if Claude is out of usage the
# hourly run picks the work up once usage is back.   Usage: scripts/wake_claude.sh "<why>"
set -u
[ -n "${CLAUDE_TASK_URL:-}" ] && [ -n "${CLAUDE_TASK_TOKEN:-}" ] || { echo "wake: chưa cài CLAUDE_TASK_URL/CLAUDE_TASK_TOKEN — chờ lượt hằng giờ"; exit 0; }
# A new video while 2 runs are already designing: those runs pick it up (they re-check the queue before each
# video), so starting a third run would only spend usage on a run that stops at once (AGENT_NIGHTLY allows 2).
if [ "${WAKE_SKIP_IF_BUSY:-0}" = 1 ] && [ -n "${GH_TOKEN:-}" ] && [ -n "${GITHUB_REPOSITORY:-}" ]; then
  BUSY=$(curl -s --max-time 20 -H "Authorization: Bearer $GH_TOKEN" "https://api.github.com/repos/$GITHUB_REPOSITORY/issues?state=open&labels=designing&per_page=10" \
    | python3 -c 'import json,sys;d=json.load(sys.stdin);print(len(d) if isinstance(d,list) else 0)' 2>/dev/null || echo 0)
  if [ "${BUSY:-0}" -ge 2 ]; then echo "wake: đang có $BUSY video được thiết kế — lượt đang chạy sẽ làm tiếp, không gọi thêm"; exit 0; fi
fi
WHY=$(printf '%s' "${1:-}" | python3 -c 'import json,sys;print(json.dumps({"text":sys.stdin.read()[:300]}))')
CODE=$(curl -s -o /tmp/wake.json -w '%{http_code}' --max-time 30 -X POST "$CLAUDE_TASK_URL" \
  -H "Authorization: Bearer $CLAUDE_TASK_TOKEN" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" -d "$WHY")
case "$CODE" in
  2*) echo "wake: Claude đã được gọi ($(python3 -c "import json;print(json.load(open('/tmp/wake.json')).get('claude_code_session_url',''))" 2>/dev/null))" ;;
  *)  echo "::warning::wake: gọi Claude không được (HTTP $CODE) — lượt hằng giờ sẽ làm"; head -c 300 /tmp/wake.json; echo ;;
esac
exit 0

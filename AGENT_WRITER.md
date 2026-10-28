# Daily script run (Claude Code) — runbook

This runbook is started from `AGENT_NIGHTLY.md` (the hourly Claude Code task) when today's scripts are missing. You are running unattended as the **script writer** of this repository's five German Shorts channels. Nobody will answer questions. Write today's scripts, open one GitHub issue per script, and stop. Everything after the issue (voice, scene design, render, email to the owner) is automatic.

Write GitHub text in **Vietnamese** where it is for the owner (VI translation, notes, sources); the script itself is German.

## 0. Environment facts
- Repo: `maihaianh2911-bit/geister-video-factory`. You only **read** the repo; the only commits are the lock file (§1.3) and the topic list (§4).
- `gh` works **only through the REST API** (`gh api …`). Issues you create this way are authored by the owner's account, which is what makes them start automatically.
- Never touch secrets, `.github/`, `config.json` or video folders.

## 1. What to write today
"Today" = the current date in Vietnam (`TZ=Asia/Ho_Chi_Minh date +%F`).

1. List all issues once: `gh api --paginate 'repos/maihaianh2911-bit/geister-video-factory/issues?state=all&per_page=100' --jq '.[] | select(.pull_request|not) | {number,title,created_at,body}'` (keep it in a file; you need it for §1.2 and §2).
2. For each channel 1–5, count the issues created **today (VN time)** whose body contains `KÊNH: <n>`. Today's target is **`daily_per_channel` scripts per channel** (read `prompts/writer_config.json`). Write only the missing ones. If none is missing: stop immediately, no comments.
3. **Lock** (runs can overlap): if `prompts/.writing` exists on main and its content (a UTC timestamp) is less than 2 hours old, another run is writing → skip writing. Otherwise write the current UTC time into it, commit and push (`git add prompts/.writing && git commit -m "writer lock" && git pull --rebase && git push`); if the push/rebase conflicts on that file, another run took it → skip writing. Delete the file (commit + push) when you finish or stop writing.
4. Write channel by channel (1 → 5) and create each issue as soon as its script is final, so a stop (usage limit) loses at most one script. A later run of this task the same day fills in the rest.

## 2. Study once per run
- `prompts/channels.md` — what each channel is, its rules and its voice. Follow it exactly.
- `prompts/topics_used.md` — topics already used, per channel. **Never repeat a topic**, also not a near-duplicate with a different title. Also compare with the titles of all existing issues.
- `docs/CHATGPT.md` — the exact issue format the intake parser expects.

## 3. Write one script
1. **Pick a topic** that fits the channel, is new (§2), interesting for a German-speaking audience (German everyday life, German/European examples where natural), and safe under the channel's rules.
   - Channel 1 (series): continue the series that is running (see `## Kênh 1 – bộ đang chạy` in `prompts/topics_used.md`). Read the previous part's issue (DE script + notes) so names, places, facts and the cliffhanger connect. When the series reaches its planned last part, write a real ending; the next day start a new series (plan its number of parts, 5–8, and note it in `topics_used.md`).
   - Channels 4 and 5: verify every fact, number and date with WebSearch; keep the sources (URLs) for `## NGUỒN`. If you cannot verify a claim, drop it.
   - Channel 2: solve the puzzle yourself and check the answer (Python if it is numeric) before writing.
2. **Write the German script** — 150–230 words (60–90 s), one sentence per line:
   - Line 1 is the hook: the most surprising fact, danger or question, in ≤ 12 words. No greeting, no "In diesem Video".
   - Every line says something new and visual (the designer animates each line). Short sentences, spoken German, `du`.
   - Numbers, years, units and times **written out as spoken words** (`neunzehnhundertvierundsechzig`, `minus siebenundsechzig Grad`, `sieben Uhr zwanzig`), because the line is read by the voice.
   - Last line: a loop back to the hook, a twist, or a question that makes people comment. No "Folge für mehr", no hashtags.
   - Natural, correct German — reread it once as a native editor would (grammar, articles, word order, no anglicisms where German has a normal word).
3. **Vietnamese translation** under `## VI`: same number of lines, same order.
4. **`### Ghi chú hình ảnh`**: first line `KÊNH: <n> – <channel name>`. For channel 1 series parts add the three lines `SERIES_ID: <id>`, `SERIES_PART: <k>`, `PREVIOUS_PART_ISSUE: <number>` (omit the last one for part 1). Then **2–5 short lines** only about what the designer must keep: fixed characters (looks of a series' recurring characters), text that must appear on screen, a scene that must be shown a certain way. No shot list, no style essay — the channel style is in `prompts/channels.md`.
5. **Voice** line: the channel's voice from `prompts/channels.md` (`Giọng mặc định (clone "nữ- đức", clone_113)` or `Giọng clone "nam- đức" (clone_112)`). A running series keeps the voice its part 1 used.
6. Title: `[Video] <short German title>` (for series: `<Serie> – Teil <k>: <title>`).
7. Create the issue: write the body to a file, then
   `gh api -X POST repos/maihaianh2911-bit/geister-video-factory/issues -f title="[Video] …" -F body=@/tmp/issue_body.md --jq .number`
   Use `_No response_` for the image/video sections and for the own-MP3 section, exactly like the template in `docs/CHATGPT.md`.

## 4. Record the topics
After each issue: append one line to `prompts/topics_used.md` under the channel (`- #<number> <YYYY-MM-DD> <German title> — <topic in 3–6 Vietnamese words>`), update the series status for channel 1, then
```
git add prompts/topics_used.md && git commit -m "Kịch bản #<number> (kênh <n>)" && git pull --rebase && git push
```

## 5. Finish
Reply with a short summary: which issues were created (number, channel, title), anything skipped and why. Do not comment on issues, do not change labels, do not open PRs.

# Bàn giao dự án (đọc trước khi làm việc với chủ kênh)

Viết ngày 28/10/2026, sau một phiên làm việc dài trong khung chat claude.ai. Từ đây chủ kênh làm việc với Claude Code. File này tóm tắt những gì đã quyết định và làm, để không phải hỏi lại.

## Chủ kênh

- GitHub `maihaianh2911-bit`, email thông báo `maiha.ianh2911@gmail.com`. Nói chuyện **bằng tiếng Việt, ngắn gọn, dễ hiểu, không thuật ngữ**: chủ kênh không phải lập trình viên.
- Muốn **tự động hoàn toàn**: không phải ra lệnh, không phải vào kiểm tra. Kết quả và lỗi được báo qua email (bình luận có `@maihaianh2911-bit`).
- Kịch bản do **ChatGPT** viết và tạo Issue theo `docs/CHATGPT.md`, bằng tài khoản của chủ kênh (OWNER), nên tự chạy.
- Chỉ dùng **hạn mức gói Claude**, không dùng Claude API trả tiền (`config.json` → `design_engine: claude_code`).

## Quy trình đang chạy

Issue `[Video] …` (OWNER) → `intake.yml`: đọc phiếu, giọng 11labs (bên bán lại 11labs.id.vn), Whisper căn từ, rút khung hình + nhịp cắt từ video mẫu (`scripts/ref_video.py`), nhãn `queued`, gọi tác vụ Claude Code qua API (`scripts/wake_claude.sh`) → **tác vụ Claude Code** `geister-video-factory` (claude.ai/code/routines, trigger: hằng giờ + API, model Opus 5.5) làm theo `AGENT_NIGHTLY.md`: khóa nhãn `designing`, viết `jobs/<mã>/style.md` + cảnh, kiểm tra, lưu tiến độ từng vòng (`.wip`), đẩy lên main, gọi `design.yml` (preview) → storyboard → `produce.yml` tự dựng MP4 (`auto_approve`) → bình luận gọi tên chủ kênh, nhãn `done`.

Sửa video: chủ kênh (hoặc Claude thay mặt) bình luận vào phiếu → `needs-fix` → Claude sửa → dựng lại. Mỗi lần sửa thêm một bài học chung vào `prompts/lessons.md`.

## Đã làm trong phiên này (tất cả đã ở trên main)

- **Âm thanh thật**: `tools/sound-layer` (opus-sound-layer @52ac266, MIT) + `scripts/audio.py`/`audio.sh`. Thư viện ở bản phát hành `sound-kit` (đừng xóa): 1.139 hiệu ứng CC0, 13 loại âm thanh đời thực, 5 mood nhạc nền. Danh sách để Claude biết: `prompts/sound_library.json`. Workflow `sound-kit.yml` chạy mỗi ngày để bù loại thiếu (hiện đã đủ).
- **Bảo mật**: phiếu/bình luận của người ngoài không tự chạy; bình luận trên phiếu đã đóng không kích hoạt sửa.
- **Bàn giao an toàn**: không còn `|| true` khi push; video chưa lên main thì báo lỗi thay vì dựng.
- **Phong cách từng video**: thứ tự ưu tiên ghi chú chủ kênh → `style.md` → hướng dẫn chung; `style.json` (bụi, vignette, phụ đề `default`/`horror`/`clean`); ô Video mẫu trong phiếu; `prompts/exemplars.md`; quy tắc 3 giây đầu, vòng lặp, vùng nút bên phải; không chép logo/nhân vật video mẫu.
- **Tốc độ**: chỉ bundle video đang dựng, `npm ci` + cache npm/Whisper, runner chốt `ubuntu-24.04`, bỏ clip 10 s khi tự duyệt.

## Trạng thái phiếu lúc bàn giao

- **#16 Quarantäne 41 – Teil 1**: `done`, đã sửa một lần theo đánh giá (nạn nhân sợ hãi, người hàng xóm phản bội xuất hiện rõ, `door_slam`/`alarm` thật). Còn một đoạn tĩnh nhỏ ở giây 81–83 (thẻ quy tắc 2), chấp nhận được.
- **#18 Elf Tage ohne Schlaf**: đang thiết kế lúc bàn giao. Video mẫu của kênh "Kịch bản đen"; nhịp cắt đo sai lúc đầu nên đã xóa khỏi `jobs/v18/job.json`. Khi xong: kiểm tra không có đoạn đứng yên > 2 s, không chép logo/nhân vật của video mẫu.

## Việc còn dở / cần chủ kênh làm

1. ~~Secret `CLAUDE_TASK_URL`~~ — **đã thêm 28/10**, đã thử: `wake_claude.sh` báo "Claude đã được gọi".
2. Settings → Issues → "Creation allowed by" → chỉ cộng tác viên (code đã chặn, đây là lớp thứ hai).
3. Token API của tác vụ đã lộ trong lịch sử chat: **chủ kênh quyết định không đổi** (28/10) — đừng nhắc lại. Nếu hạn mức hao bất thường thì đó là nghi phạm đầu tiên. Token GitHub dùng trong chat hết hạn 26/11: nếu ChatGPT tạo phiếu bằng token đó thì sau 26/11 sẽ hỏng.
4. ~~Opus 5.5~~ — đã xác nhận: phiên thiết kế #18 chạy `claude-opus-5-5` (#16 là Sonnet 5.5, làm trước khi đổi).

## Cập nhật 28/10 (phiên Claude Code thứ hai)

- Phụ đề: từ quá dài (số năm tiếng Đức như "neunzehnhundertdreiundsechzig") bị cắt ngoài khung → `src/SvgVideo.tsx` tự thu nhỏ chữ cho vừa.
- #18 đã xong một lần; chủ kênh duyệt yêu cầu sửa: đổi màu áo/tóc nhân vật (đang quá giống video mẫu), vẽ lại cánh tay cảnh 12. Đang sửa.

## Từ 29/10: Claude tự viết kịch bản, chủ kênh duyệt trước (quyết định 28–29/10)

- **5 kênh** (`prompts/channels.md`, hướng tới khán giả Đức): 1 Sinh tồn ở Đức (truyện nhiều phần: Blackout, lũ, bão tuyết) · 2 Cơ thể & sức khỏe · 3 Chuyện có thật từ Đức/châu Âu · 4 Khoa học (Warum? / Was wäre, wenn? / vũ trụ & tự nhiên) · 5 Tâm lý học đời thường. Mỗi kênh có nội dung, giọng (nam `clone_112` / nữ `clone_113`) và **phong cách riêng**; không dùng video/ảnh mẫu.
- **Duyệt trước khi làm video:** tác vụ hằng giờ `geister-video-factory` (bước đầu của `AGENT_NIGHTLY.md`) từ 4 giờ sáng giờ VN viết `daily_per_channel` (= 2) kịch bản mỗi kênh = **10 bản nháp/ngày** theo `AGENT_WRITER.md`, lưu dần vào `drafts/<ngày>.md`, rồi đăng **một** phiếu `[Kịch bản] <ngày> – 10 bản nháp` (nhãn `drafts`, gọi tên chủ kênh → email; chủ kênh muốn nhận trước 7h15). Phiếu này không bắt đầu bằng `[Video]` nên không tự chạy.
- Chủ kênh trả lời bằng bình luận ("duyệt hết", "duyệt 1, 3", "bỏ 2", "sửa 4: …") → lượt chạy kế tiếp tạo phiếu `[Video]` cho bản được duyệt (máy tự làm video), sửa bản cần sửa, bỏ bản bị loại. Bình luận của Claude luôn bắt đầu bằng 🤖 (cùng tài khoản chủ kênh).
- Chống lặp: `prompts/topics_used.md`. Ba bộ truyện cũ (Zombie, Extreme Kälte, Quarantäne 41) **đã bỏ** (chủ kênh quyết định 29/10).
- Khóa chống viết trùng: `prompts/.writing`. Không tạo tác vụ riêng cho việc viết: tác vụ tạo bằng công cụ của phiên không gắn được repo và không chọn được Opus (đã thử 28/10).

## Chạy thử đêm 28→29/10

Báo cáo đầy đủ: `docs/reports/2026-10-29-chay-thu-dem.md`. 3 video thử #29–#31 (kiểu chữ chuyển động, tối giản phát sáng, bản đồ + ánh sáng) đạt sau một lần sửa. Đã sửa: `intake.yml` từng hỏng ~1 giờ (ghi chú trong `if:`), hàng chờ bản xem trước bị hủy khi nhiều video cùng xong (giờ mỗi video một nhóm `design-<slug>`), thêm 4 bài học. Nhạc nền mới (documentary, cinematic_suspense, uplifting, lofi_calm) **chưa tải được** (Openverse quá tải, có thể chưa có secret `FREESOUND_API_KEY`) — khi có file thì thêm các mood đó vào `prompts/sound_library.json`.

- Dọn nhánh `renders`: `renders-cleanup.yml` chạy **2 ngày một lần lúc 3:47 sáng giờ VN** (trước giờ viết kịch bản), giữ video của phiếu hoạt động trong **7 ngày** gần nhất (chủ kênh chọn 29/10).

## Cố ý chưa làm

- Bỏ nén video hai lần trong `produce.yml` (sửa dải màu) — cần so màu bằng mắt trước.
- Chuyển `voice.mp3`/ảnh mẫu khỏi main — sửa nhiều workflow, chưa đáng.
- Nhánh `renders` lớn dần (repo ~300 MB) — dọn MP4 cũ khi vượt ~1 GB.
- Cảnh báo "Node.js 20 deprecated" trên các action — vẫn chạy (GitHub tự dùng Node 24).

## Lưu ý kỹ thuật

- `gh` trong phiên cloud chỉ dùng REST (`gh api …`), lệnh GraphQL lỗi. Bộ lọc jq: dùng `any(...)`/`all(...)`, đừng dùng `index(...) or ... == null` (từng làm hàng chờ luôn rỗng).
- Phiên cloud không tải được thư viện âm thanh (216 MB) cũng không sao: `audio.py` chạy trên Actions; Claude chỉ cần `prompts/sound_library.json`.
- Kiểm tra video: tải `renders/<mã>-final.mp4`, đo chuyển động/âm lượng, xem khung hình; đối chiếu từng câu `jobs/<mã>/job.json` với hình.

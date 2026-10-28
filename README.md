# geister-video-factory

Dây chuyền làm video 2D tiếng Đức (1080×1920, 30 FPS) chạy hoàn toàn trên GitHub: bạn dán kịch bản → máy tạo giọng (11labs), căn từng từ (Whisper), Claude thiết kế cảnh + chuyển động + âm thanh, Remotion dựng video.

## Làm một video

1. **Issues → New issue → 🎬 Yêu cầu video mới** ([mở thẳng](https://github.com/maihaianh2911-bit/geister-video-factory/issues/new/choose)). Dán kịch bản (`## DE` / `## VI` / `## NGUỒN`), kéo thả ảnh mẫu và/hoặc **một video mẫu** (MP4) nếu có, ghi chú hình ảnh → **Create**.
2. Máy **tự chạy ngay** (`auto_start`): đọc phiếu, tạo giọng (11labs), căn từng từ (Whisper), lấy khung hình + nhịp cắt từ video mẫu, đưa vào hàng chờ.
3. **Claude Code bắt đầu ngay khi còn hạn mức gói** (không tốn credit API): GitHub gọi tác vụ Claude Code qua API trigger (secret `CLAUDE_TASK_URL` + `CLAUDE_TASK_TOKEN`). Hết hạn mức thì dừng; lượt hằng giờ tự làm tiếp từ chỗ dở khi có hạn mức lại. Claude viết bản phong cách riêng cho video, thiết kế cảnh + chuyển động + âm thanh, tự kiểm tra, lưu tiến độ sau từng vòng.
4. Máy dựng storyboard, rồi **tự dựng luôn MP4 hoàn chỉnh** (`auto_approve`) → bình luận vào phiếu, nhãn **`done`**.
5. Muốn sửa: **bình luận** yêu cầu theo số cảnh (kể cả sau khi đã có MP4) → làm lại ở lượt kế tiếp; mỗi yêu cầu sửa cũng thành một dòng trong `prompts/lessons.md` để video sau không lặp lỗi. Đổi giọng → bình luận `/voice clone_112`.

Chỉ phiếu do chủ repo / cộng tác viên mở mới tự chạy. Phiếu của người khác: chỉ chạy khi bạn tự gắn nhãn `script-ready`.
Tắt tự chạy / tự duyệt: `config.json` → `auto_start` / `auto_approve` = `false` (khi đó gắn `script-ready` để bắt đầu, `visual-ok` để dựng bản cuối).

## Nhãn

| Nhãn            | Ý nghĩa                                                               |
|-----------------|-----------------------------------------------------------------------|
| `script-ready`  | Kịch bản đã chốt → máy chuẩn bị giọng (tự gắn khi `auto_start`)       |
| `queued`        | Đang chờ Claude thiết kế                                              |
| `designing`     | Claude đang làm video này (khóa, tự gỡ khi xong)                      |
| `urgent`        | Chế độ API: thiết kế ngay, không chờ (giá gấp đôi Batch)              |
| `mock`          | Chạy thử không gọi Claude — để kiểm tra hệ thống                      |
| `preview-ready` | Có storyboard                                                         |
| `needs-fix`     | Máy sẽ sửa theo bình luận ở lượt kế tiếp                              |
| `visual-ok`     | (khi tắt `auto_approve`) bạn duyệt hình → máy dựng bản cuối           |
| `done`          | Có MP4 hoàn chỉnh (link trong bình luận cuối)                         |
| `failed`        | Có lỗi — xem bình luận của máy                                        |

## Phong cách từng video

Ưu tiên khi mâu thuẫn: **ghi chú của bạn trong phiếu** → bản phong cách của video (`jobs/<mã>/style.md`, Claude viết từ ghi chú + ảnh/video mẫu) → hướng dẫn chung (`prompts/scene_system.md`). Video ma mẫu chỉ là chuẩn *tay nghề*, không phải phong cách bắt buộc. Mỗi video có `src/videos/<mã>/style.json`: bụi bay, vignette, kiểu phụ đề (`default` · `horror` · `clean`).

## Chạy tay (tab **Actions**)
| Workflow | Làm gì |
|---|---|
| **Thiết kế cảnh (Claude)** | `mode`: submit / collect / direct / mock / revise |
| **Sản xuất video** | Dựng bản cuối cho một mã video (vd `v12`, `geister`) |
| **Thử voice 11labs** | Số dư, danh sách giọng, đọc thử |
| **Render video** | Chỉ dựng hình video ma (không tiếng) |

File kết quả: nhánh **`renders`** (`previews/<mã>/…` và `<mã>-final.mp4`).

## Cấu hình

- `config.json`: `design_engine` (`claude_code` = phiên Claude Code hẹn giờ, mặc định; `api` = Claude API Batch qua đêm, cần `ANTHROPIC_API_KEY`), `max_per_night` (số video mỗi lượt), `auto_start`, `auto_approve`.
- **Secrets** (Settings → Secrets and variables → Actions): `VN11_API_KEY`, `VN11_VOICE_ID`; `ANTHROPIC_API_KEY` chỉ cần cho chế độ `api`.
- **Variables** (không bắt buộc, chế độ `api`): `MAX_PER_NIGHT`, `ANTHROPIC_MODEL` (mặc định `claude-opus-5-5`).
- Hướng dẫn cho phiên Claude Code hẹn giờ: `AGENT_NIGHTLY.md`.

## Âm thanh

Mỗi hiệu ứng trong `events.json` lấy âm thanh theo thứ tự: file bạn tự thêm (`assets/sfx/<loại>/`) → âm thanh đời thực CC0 tự tải (`sound/extra/sfx/<loại>/`) → kho **1.100+ hiệu ứng CC0** (Kenney + Freesound) → âm thanh tổng hợp bằng code (dự phòng, không bao giờ im lặng). Nhạc nền: `assets/music/<mood>/` rồi `sound/extra/music/<mood>/`. Bộ trộn (`tools/sound-layer`, từ [opus-sound-layer](https://github.com/Bodila51/opus-sound-layer)) đặt đỉnh âm đúng khoảnh khắc, cân âm lượng từng tiếng, giảm nhạc khi có giọng, chuẩn −14 LUFS. Nguồn mọi âm thanh trong từng video: `renders/<mã>-sound-credits.md`.

- **Tự động:** workflow **Thư viện âm thanh (CC0)** tự chạy khi phần âm thanh được cập nhật (lần đầu: ngay sau khi áp bản vá, ~20–30 phút). Nó xây kho hiệu ứng, tự tìm âm thanh đời thực + nhạc nền CC0 qua Openverse, tự loại file dở bằng phép đo, rồi lưu tất cả vào bản phát hành `sound-kit` (không làm nặng `main`). Đừng xóa bản phát hành này. Ảnh dạng sóng của các file đã chọn: phần *Artifacts* của lượt chạy.
- **Muốn tốt hơn bản tự tải:** bỏ file của bạn vào `assets/music/<mood>/` hoặc `assets/sfx/<loại>/` (luôn được ưu tiên), ghi nguồn vào `assets/CREDITS.md`.
- **Chỉnh trộn** (`src/videos/<mã>/mix.json`, đều không bắt buộc): `energy` (`punchy` | `calm`), `lufs`, `duck_db` (nhạc giảm bao nhiêu dB khi có giọng, mặc định 10), `music_lufs`, `bed_lufs`, `room` (`false` = khô).

## Cấu trúc
- `src/engine/core.js` — thư viện dùng chung: nhân vật (người, ma), bối cảnh, hàm chuyển động.
- `src/videos/<mã>/` — `scene.js` (cảnh do Claude viết), `events.json` (âm thanh), `storyboard.json`, `timing.json`, `lines.json`, `mix.json`.
- `prompts/` — hướng dẫn cho Claude (`scene_system.md`), video ma làm chuẩn tay nghề, `lessons.md` (bài học của kênh), `exemplars.md` (video đã làm theo thể loại).
- `scripts/` — đọc phiếu, 11labs, Whisper, thiết kế, kiểm tra, xem trước, âm thanh, trộn, QA.

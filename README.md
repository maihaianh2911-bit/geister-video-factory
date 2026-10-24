# geister-video-factory

Dây chuyền làm video 2D tiếng Đức (1080×1920, 30 FPS) chạy hoàn toàn trên GitHub: bạn dán kịch bản → máy tạo giọng (11labs), căn từng từ (Whisper), Claude thiết kế cảnh + chuyển động + âm thanh, Remotion dựng video.

## Làm một video
1. **Issues → New issue → 🎬 Yêu cầu video mới** ([mở thẳng](../../issues/new/choose)). Dán kịch bản (`## DE` / `## VI` / `## NGUỒN`), kéo thả ảnh mẫu nếu có → **Create**. Máy đọc lại phiếu và báo lỗi/lưu ý.
2. Gắn nhãn **`script-ready`** → máy khóa kịch bản, tạo giọng, căn từng từ, đưa vào **hàng chờ đêm nay**.
3. **23:00** máy gửi các phiếu trong hàng chờ cho Claude (Batch, rẻ 50 %). **01:00–05:00** lấy kết quả → kiểm tra code → dựng **storyboard + 10 giây đầu có tiếng** → bình luận vào phiếu, nhãn **`preview-ready`**.
4. Sáng: ưng → gắn **`visual-ok`** → ~15 phút sau có MP4, nhãn **`done`**.
   Chưa ưng → **bình luận** yêu cầu sửa theo số cảnh → máy sửa ngay và gửi bản xem trước mới.
   Đổi giọng → bình luận `/voice clone_112`.

## Nhãn
| Nhãn | Ý nghĩa |
|---|---|
| `script-ready` | Bạn chốt kịch bản → máy chuẩn bị giọng |
| `queued` | Đang chờ thiết kế đêm nay |
| `urgent` | Thiết kế ngay, không chờ đêm (giá gấp đôi Batch) |
| `mock` | Chạy thử không gọi Claude (không tốn tiền API) — để kiểm tra hệ thống |
| `preview-ready` | Có bản xem trước, chờ bạn duyệt |
| `needs-fix` | Máy đang sửa theo bình luận |
| `visual-ok` | Bạn duyệt hình → máy dựng bản cuối |
| `done` | Có MP4 hoàn chỉnh (link trong bình luận cuối) |
| `failed` | Có lỗi — xem bình luận của máy |

## Chạy tay (tab **Actions**)
| Workflow | Làm gì |
|---|---|
| **Thiết kế cảnh (Claude)** | `mode`: submit / collect / direct / mock / revise |
| **Sản xuất video** | Dựng bản cuối cho một mã video (vd `v12`, `geister`) |
| **Thử voice 11labs** | Số dư, danh sách giọng, đọc thử |
| **Render video** | Chỉ dựng hình video ma (không tiếng) |

File kết quả: nhánh **`renders`** (`previews/<mã>/…` và `<mã>-final.mp4`).

## Cấu hình
- **Secrets** (Settings → Secrets and variables → Actions): `VN11_API_KEY` ✅, `VN11_VOICE_ID` ✅, `ANTHROPIC_API_KEY` (cần cho thiết kế thật).
- **Variables** (cùng trang, tab Variables, không bắt buộc): `MAX_PER_NIGHT` (mặc định 5), `ANTHROPIC_MODEL` (mặc định `claude-opus-5-5`).
- Âm lượng mỗi video: `src/videos/<mã>/mix.json` (`voice_gain`, `sfx_gain`, `post_gain_db`).
- Chi phí Claude mỗi video được ghi ở `jobs/<mã>/usage.jsonl` và hiện trong bình luận bản xem trước.

## Cấu trúc
- `src/engine/core.js` — thư viện dùng chung: nhân vật (người, ma), bối cảnh, hàm chuyển động.
- `src/videos/<mã>/` — `scene.js` (cảnh do Claude viết), `events.json` (âm thanh), `storyboard.json`, `timing.json`, `lines.json`, `mix.json`.
- `prompts/` — hướng dẫn cho Claude + video ma làm chuẩn chất lượng.
- `scripts/` — đọc phiếu, 11labs, Whisper, thiết kế, kiểm tra, xem trước, âm thanh, trộn, QA.

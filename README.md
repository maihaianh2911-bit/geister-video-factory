# geister-video-factory

Dây chuyền làm video 2D tiếng Đức (1080×1920, 30 FPS): Remotion dựng hình, 11labs tạo giọng, Whisper căn từng từ, âm thanh tổng hợp bằng code — tất cả chạy trên GitHub Actions.

## Làm một video mới
1. Tab **Issues** → **New issue** → **🎬 Yêu cầu video mới**
   ([mở thẳng](../../issues/new/choose))
2. Dán kịch bản (giữ `## DE` / `## VI` / `## NGUỒN`), kéo thả ảnh mẫu nếu có → **Create**.
3. Cột phải **Labels** → gắn **`script-ready`**.
4. Sáng hôm sau: xem storyboard + 10 giây đầu trong phiếu → gắn **`visual-ok`**, hoặc bình luận yêu cầu sửa.
5. Khi phiếu có nhãn **`done`**: tải MP4 ở bình luận cuối.

> Bước 3–5 hoạt động sau khi hoàn thành giai đoạn 3–4 (cần secret `ANTHROPIC_API_KEY`).

## Chạy tay (tab **Actions**)
| Nút | Làm gì |
|---|---|
| **Sản xuất video (giọng + âm thanh + dựng)** | Tạo/dùng lại giọng, căn từng từ, trộn âm thanh, dựng MP4 có tiếng |
| **Render video** | Chỉ dựng hình (không tiếng) |
| **Thử voice 11labs** | Xem số dư, danh sách giọng, đọc thử một câu |

Kết quả mới nhất nằm ở nhánh **`renders`**.

## Chỉnh âm lượng
`src/videos/<video>/mix.json`: `voice_gain` (giọng), `sfx_gain` (nền + hiệu ứng), `post_gain_db` (độ to tổng).

## Secrets cần có (Settings → Secrets and variables → Actions)
| Tên | Trạng thái |
|---|---|
| `VN11_API_KEY` | ✅ |
| `VN11_VOICE_ID` (`clone_113`) | ✅ |
| `ANTHROPIC_API_KEY` | cần cho giai đoạn 3–4 |

## Tiến độ
- ✅ Giai đoạn 1 — Remotion + dựng trên Actions + QA
- ✅ Giai đoạn 2 — giọng 11labs (clone), căn từng từ (Whisper), phụ đề tô từng từ, âm thanh tổng hợp + trộn
- ⏳ Giai đoạn 3 — phiếu → bản xem trước (storyboard) → duyệt
- ⏳ Giai đoạn 4 — tự thiết kế cảnh qua đêm (Batch) → dựng → gắn MP4 vào phiếu

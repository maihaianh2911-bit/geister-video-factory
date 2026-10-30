# Người dẫn chuyện của từng kênh (kiểu E trong `prompts/channels.md`)

Lần đầu một kênh dùng người dẫn chuyện: người thiết kế ghi vào đây mô tả (tóc, mặt, quần áo, màu hex, phụ kiện, bàn làm việc, chữ trên laptop) và tên hàm vẽ trong `scene.js` của video đó (ví dụ `v31: drawHost(pose, t)`), để các video sau chép lại đúng y hệt. Không giống mascot của kênh người khác.

## Kênh 1 – Sinh tồn ở Đức
(chưa có)

## Kênh 2 – Cơ thể & sức khỏe
(chưa có)

## Kênh 3 – Chuyện có thật từ Đức và châu Âu
(chưa có)

## Kênh 4 – Khoa học
(chưa có)

## Kênh 5 – "Was passiert, wenn …?" kể thành chuyện (ngôi ich)
Người que kể chuyện (vẽ lần đầu ở v67, 30/10). Mã: `stick(x, y, s, o)` trong `src/videos/v67/shots/lib.js` (chép nguyên hàm này cùng `joint()`, `FIG`, `headPos()`, `walkFeet()` và bảng màu `K` cho video sau).
- (x, y) là điểm giữa hai bàn chân trên mặt đất; cao ≈ 470·s (s = 1,5 ở toàn cảnh).
- Đầu tròn to bán kính 58, nền trắng `#FFFFFF`, viền đen `#1B1B1F` 7 px; mắt hai chấm đen; lông mày nét ngắn (`brow`: calm/up/knit); miệng `smile`/`o`/`open`/`flat`/`worried`.
- Áo phông cam `#F28C28` hình thang bo, tay áo ngắn theo cánh tay; cổ, tay, chân là nét đen 7 px có khuỷu/gối (IK hai đoạn, mỗi đoạn 92/90), bàn tay là chấm đen tròn, bàn chân là nét ngắn quay ra ngoài.
- Điều khiển: `hL`/`hR` = vị trí bàn tay (tọa độ khung), `fL`/`fR` = vị trí bàn chân, `lean`, `look`/`lookY`, `bob`; đồ cầm tay vẽ qua `mid` (sau tay) hoặc `over`.
- Nền kênh: kem `#F4EFE6`, mảng màu phẳng, viền đen cùng độ dày; không bụi, không vignette.

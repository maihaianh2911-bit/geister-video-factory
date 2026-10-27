# Âm thanh thu sẵn của kênh

Mỗi thư mục con là một **loại âm thanh** = tên dùng trong `events.json` (`{"t": 4.2, "type": "door_slam"}`).
Có file trong thư mục này thì máy luôn dùng file của bạn trước kho CC0 và trước âm thanh tổng hợp. Nhiều file → máy xoay vòng để không lặp.

- Âm thanh va chạm (`door_slam`, `knock_heavy`, `crash`, `crack`, `clank`, `bonk`, `stamp`, `thud`…): đỉnh âm đặt đúng thời điểm sự kiện.
- Các loại khác (`creak`, `steps`, `ambience`, `heart`…): bắt đầu đúng thời điểm sự kiện.

Thêm loại mới: tạo thư mục mới (tên tiếng Anh, chữ thường, gạch dưới). Ghi nguồn từng file vào `assets/CREDITS.md`.

Không bắt buộc: máy đã tự tải âm thanh CC0 cho `creak`, `steps`, `heart`, `drip`, `crash`, `crack`, `clank`, `door_slam`, `knock_heavy`, `scream_distant`, `phone`, `alarm`, `ambience` (workflow Thư viện âm thanh). File bạn bỏ vào đây luôn được dùng trước.

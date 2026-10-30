# v64 – ghi chú tiến độ (lượt 30/10 chiều)

- Đã thiết kế đủ 38 cảnh (`src/videos/v64/shots/001–038.js`, bộ vẽ `lib.js`, `fall.js`, `cabin.js`, `jump.js`), storyboard, events, style. `validate_scene.mjs v64` → `errors: []`.
- Đã tự xem bản vẽ thô từng cảnh (SVG qua Chromium, không phụ đề) và sửa: Tuffi thấy rõ trong toa ở khung 0, voi ở lại trong nước sau khi rơi, trần toa bị hở, voi lơ lửng ở bờ (025), hình thợ ảnh đứng trên nước (035).
- **Chưa làm:** duyệt từng cảnh bắt buộc (`local_stills.cjs v64 --review` → `review_scenes.py`). Trong phiên này Chrome của Remotion không tải được font Inter từ fonts.gstatic.com (net::ERR_CERT_AUTHORITY_INVALID qua proxy), nên không dựng được ảnh duyệt.
- Lượt sau: chạy `node scripts/local_stills.cjs v64 --review`, `python3 scripts/review_scenes.py init v64 --round 1`, xem từng bảng, ghi nhận xét, rồi bàn giao như §3.7.

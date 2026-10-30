# v64 – ghi chú tiến độ (lượt 30/10 chiều)

- Đã thiết kế đủ 38 cảnh (`src/videos/v64/shots/001–038.js`, bộ vẽ `lib.js`, `fall.js`, `cabin.js`, `jump.js`), storyboard, events, style. `validate_scene.mjs v64` → `errors: []`.
- Đã tự xem bản vẽ thô từng cảnh (SVG qua Chromium, không phụ đề) và sửa: Tuffi thấy rõ trong toa ở khung 0, voi ở lại trong nước sau khi rơi, trần toa bị hở, voi lơ lửng ở bờ (025), hình thợ ảnh đứng trên nước (035).
- **Chưa làm:** duyệt từng cảnh bắt buộc (`local_stills.cjs v64 --review` → `review_scenes.py`). Trong phiên này Chrome của Remotion không tải được font Inter từ fonts.gstatic.com (net::ERR_CERT_AUTHORITY_INVALID qua proxy), nên không dựng được ảnh duyệt.
- Lượt sau: chạy `node scripts/local_stills.cjs v64 --review`, `python3 scripts/review_scenes.py init v64 --round 1`, xem từng bảng, ghi nhận xét, rồi bàn giao như §3.7.

## Lượt 30/10 tối – duyệt từng cảnh (3 vòng)
- Font Inter đã nằm sẵn trong kho nên dựng được ảnh duyệt.
- Sửa: giấy trống ở đầu cảnh 5, hộp ngày trống ở cảnh 6, chổi dán không có tay (8), thẻ che voi và kim nhảy (12), thợ ảnh nhìn về voi (15), thước và chữ SCHLAMM đè phụ đề (23), băng đầu không thấy (27), Althoff đứng im 3 s → rút ví (28), tiền 5×100 ≠ 450 (29), chấm đỏ đầu nét (31, 35), chai sữa lơ lửng (37), lông mày người trông như giận (lib).
- Còn yếu nhưng chấp nhận: voi nhỏ trong toàn cảnh 3/22, cú đẩy vách cảnh 19 đọc chủ yếu qua toa nghiêng.

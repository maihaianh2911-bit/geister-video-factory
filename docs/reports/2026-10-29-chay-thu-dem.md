# Báo cáo chạy thử đêm 28→29/10/2026

Claude tự chạy thử toàn bộ quy trình trong khoảng 1h20–4h20 sáng (giờ VN) khi chủ kênh đi ngủ.

## Tóm tắt nhanh

- **3 video thử đã xong**, mỗi video một phong cách mới, chạy trọn quy trình thật: viết kịch bản → giọng đọc → Claude thiết kế → dựng MP4 → kiểm tra → **sửa một lần** → dựng lại.
- **Chất lượng:** cả 3 đạt mức đăng được sau một lần sửa. Phong cách mới hoạt động tốt, nhất là chữ chuyển động (#29) và bản đồ cắt giấy (#31).
- **Tìm ra và đã sửa 5 lỗi của hệ thống** (chi tiết bên dưới). Ba lỗi trong số đó sẽ làm hỏng quy trình hằng ngày nếu không phát hiện kịp, trong đó có lỗi ở **khâu duyệt kịch bản mà sáng nay bạn dùng lần đầu**.
- **Đã thử khâu duyệt kịch bản** bằng một phiếu nháp rỗng ([#32](https://github.com/maihaianh2911-bit/geister-video-factory/issues/32)): sau khi sửa, chạy đúng.
- **Còn 1 việc dở:** nhạc nền mới chưa tải được, vì nguồn nhạc miễn phí bị quá tải cả đêm.

## 3 video thử

Tải video: bấm link, rồi bấm nút tải ⬇ ở góc phải.

| Phiếu | Kênh | Phong cách thử | Video | Đánh giá |
|---|---|---|---|---|
| [#29](https://github.com/maihaianh2911-bit/geister-video-factory/issues/29) Warum du Namen sofort vergisst | 5 Tâm lý | A – chữ chuyển động | [tải](https://github.com/maihaianh2911-bit/geister-video-factory/blob/renders/v29-final.mp4) | **Tốt (9/10).** Đúng kiểu video mẫu: nền giấy kem ô li, từ khóa to tô màu, chữ hiện đúng lúc đọc, có thanh tiến trình. Có "nhân vật" bộ não tím. Ví dụ Bäcker/Becker rất rõ. Không phải sửa. |
| [#30](https://github.com/maihaianh2911-bit/geister-video-factory/issues/30) Zweiundvierzig Mal falten – bis zum Mond? | 4 Khoa học | F – tối giản phát sáng | [tải](https://github.com/maihaianh2911-bit/geister-video-factory/blob/renders/v30-final.mp4) | **Khá (7,5/10) sau khi sửa.** Số liệu đúng (đã tính lại). Bản đầu có 2 lỗi: khung đầu tối, không hút mắt; số lần gấp và độ dày lệch nhau trong lúc chạy. Đã sửa cả hai. Phong cách này đẹp nhưng hơi trống, hợp video ngắn nhiều con số. |
| [#31](https://github.com/maihaianh2911-bit/geister-video-factory/issues/31) Mit einem selbstgenähten Ballon in den Westen | 3 Chuyện có thật | D + I – bản đồ + ánh sáng điện ảnh | [tải](https://github.com/maihaianh2911-bit/geister-video-factory/blob/renders/v31-final.mp4) | **Tốt (8,5/10) sau khi sửa.** Khinh khí cầu vá nhiều mảnh, bản đồ Đông–Tây Đức, xe cảnh sát Bayern, kể chuyện cuốn. Bản đầu có 3 lỗi: phụ đề chữ trắng không nền nên không đọc được trên bản đồ màu sáng; số mét vuông vải mới đếm tới 980 khi giọng đã nói "hơn 1.200"; máy tự bịa tên thị trấn mua vải. Đã sửa cả ba. |

Thời gian mỗi video: **27–47 phút** từ lúc tạo phiếu đến khi có MP4 (máy chỉ làm 2 video cùng lúc, video thứ ba phải chờ). Mỗi lần sửa mất **20–25 phút**.

Ba video này là nội dung thật, đúng 3 kênh mới, **bạn có thể đăng nếu thấy ổn**. Caption gợi ý:
- #29: *Du hörst einen Namen – und drei Sekunden später ist er weg. Schuld ist nicht dein Gedächtnis, sondern der Moment.*
- #30: *Zweiundvierzig Mal falten und du bist am Mond vorbei. Klingt verrückt? Rechne mit.*
- #31: *Acht Menschen, ein selbstgenähter Ballon und achtzehn Kilometer bis in die Freiheit. Würdest du einsteigen?*

## Lỗi hệ thống đã tìm ra và sửa

1. **File điều khiển phiếu bị hỏng (`intake.yml`)**, do chính mình sửa sai lúc tối: ghi chú đặt nhầm chỗ khiến GitHub không đọc được file. Trong khoảng 1 tiếng, phiếu mới không tự chạy. Phát hiện khi chạy thử và đã sửa ngay. Không phiếu thật nào bị ảnh hưởng.
2. **Bản xem trước bị hủy khi nhiều video xong cùng lúc.** GitHub chỉ giữ một lượt chờ, lượt chờ cũ bị hủy, video sẽ kẹt ở bước xem trước. Đêm nay xảy ra một lần (may là lượt trùng). Đã sửa: mỗi video một hàng chờ riêng. **Đây là lỗi sẽ gặp hằng ngày khi làm 10 video.**
3. **Phụ đề không đọc được trên nền sáng.** Đã thêm bài học chung: hễ có cảnh nền sáng hoặc nhiều chi tiết thì dùng phụ đề có hộp tối.
4. **Khâu duyệt kịch bản không gọi được Claude.** Dấu `#` trong câu lệnh làm câu lệnh bị cắt cụt, nên bình luận "duyệt" của bạn sẽ phải chờ tới lượt kiểm tra mỗi giờ (chậm tới 1 tiếng). Đã sửa và thử lại: bình luận xong thì Claude được gọi ngay, trả lời bằng bình luận 🤖, rồi đóng phiếu.
5. **Số chạy trên màn hình lệch lời đọc, khung đầu tối, chi tiết bịa trên hình.** Đã thêm 3 bài học chung vào `prompts/lessons.md`. Mọi video sau tự áp dụng.

## Tối ưu thêm trong đêm

- **Đỡ tốn hạn mức khi duyệt nhiều bản cùng lúc.** Trước đây, duyệt 10 bản thì Claude bị gọi 10 lần, 8 lần chỉ khởi động rồi tự dừng. Giờ nếu đã có 2 video đang được thiết kế thì máy không gọi thêm, vì 2 lượt đang chạy sẽ làm tiếp cả hàng chờ (mỗi lượt tối đa 5 video).

## Những gì chạy đúng như thiết kế

- Giới hạn **2 lượt thiết kế cùng lúc**: lượt thứ ba tự dừng, video thứ ba được lượt đang chạy làm tiếp.
- **Sửa theo bình luận:** bình luận vào phiếu thì máy tự sửa, tự dựng lại, rồi báo xong.
- **Chốt chặn 🤖:** bình luận caption do Claude đăng (bắt đầu bằng 🤖) không bị hiểu nhầm là yêu cầu sửa, video vẫn giữ trạng thái "xong".
- Claude **tự chọn phong cách** theo ghi chú và kênh, tự viết "kinh thánh phong cách" cho từng video (xem `jobs/v29/style.md`…).
- Không đoạn nào đứng yên quá 2 giây. Âm lượng chuẩn (khoảng −14 LUFS). Không lỗi giải mã.
- Hạn mức Claude: vẫn "được phép", chưa chạm giới hạn 5 giờ sau 3 video và 2 lần sửa.

## Việc còn dở / cần bạn biết

1. **Nhạc nền mới** (tài liệu hoài cổ, hồi hộp điện ảnh, tích cực, lofi) **chưa tải được.** Nguồn nhạc miễn phí Openverse lỗi quá tải suốt đêm, còn nguồn dự phòng Freesound cần một khóa miễn phí mà kho có vẻ chưa có. Máy tự thử lại mỗi ngày lúc 10h17. Nếu muốn chắc chắn: tạo tài khoản miễn phí ở freesound.org, xin "API key", rồi thêm vào GitHub với tên `FREESOUND_API_KEY` (cùng chỗ đã thêm `CLAUDE_TASK_URL`). Trong lúc chờ, máy dùng 5 kiểu nhạc cũ.
2. **Lượt kiểm tra mỗi giờ tốn một ít hạn mức** kể cả khi không có việc (mỗi lần khoảng 70.000 token để khởi động). Giờ máy đã được gọi ngay khi có việc, nên có thể giãn lượt dự phòng thành **2 tiếng một lần** cho đỡ tốn. Đổi ở trang tác vụ Claude → "Lặp lại". Không bắt buộc.
3. **Hai giọng Đức dùng chung cho 5 kênh** (đã nói trước): nên tạo thêm giọng trên 11labs.id.vn khi rảnh.

## Sáng nay

- **4h38**: Claude bắt đầu viết 10 kịch bản nháp (5 kênh × 2).
- **6h45**: mình kiểm tra lại 10 bản.
- **Trước 7h15**: bạn nhận email có phiếu "[Kịch bản] 2026-10-29 – 10 bản nháp". Duyệt bằng một bình luận, ví dụ `duyệt hết`, `duyệt 1, 3`, `bỏ 2`, `sửa 4: …`.

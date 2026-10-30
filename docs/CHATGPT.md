# Hướng dẫn cho ChatGPT: tạo phiếu video

> **Từ 30/10/2026: ChatGPT là người viết và dán kịch bản** (phần Claude tự viết kịch bản đã gỡ bỏ). Mỗi phiếu `[Video]` tạo đúng mẫu dưới đây thì máy tự làm video. Dòng đầu của `### Ghi chú hình ảnh` phải là `KÊNH: <1–5> – <tên kênh>` (tên kênh xem `prompts/channels.md`). Hướng 5 kênh và cách viết: `prompts/writing_guide.md` (§0 trước hết). Xem `prompts/topics_used.md` để không lặp chủ đề. Không đính kèm video hay ảnh mẫu.

Repo: `maihaianh2911-bit/geister-video-factory`. Mỗi video = **một Issue mới**. Tạo xong là máy tự làm hết (giọng → Claude thiết kế → dựng MP4 → báo email). Không gắn nhãn, không làm gì thêm.

## Quy tắc

- **Duyệt chủ đề trước khi viết, duyệt kịch bản trước khi đẩy GitHub** (chốt 31/10/2026). Không tự biến đề xuất chưa được duyệt thành phiếu video.
- **Kênh 5 xưng “bạn/du”**, thay cho ngôi “tôi/ich” cũ. Khi dịch DE phải giữ ngôi kể này.

- **Tạo Issue bằng tài khoản `maihaianh2911-bit`** (phiếu của tài khoản khác sẽ không tự chạy).
- **Tiêu đề:** `[Video] <tiêu đề tiếng Đức>`
- **Nội dung:** đúng các mục `###` bên dưới, giữ nguyên tên mục, không thêm mục khác.
- **Kịch bản:** mỗi câu tiếng Đức một dòng dưới `## DE`; dòng tiếng Việt tương ứng **cùng thứ tự, cùng số dòng** dưới `## VI`. Độ dài: **175–240 từ tiếng Đức, video dài hơn 60 giây** (TikTok chỉ trả thưởng cho video trên 1 phút).
- Viết số bằng chữ trong `## DE` khi đọc lên (ví dụ `Neunzehn Uhr zweiundvierzig`), vì đó là lời đọc.
- `### Ghi chú hình ảnh`: mô tả phong cách, màu, nhân vật, chữ bắt buộc trên hình nếu có (Claude ưu tiên ghi chú này hơn mọi quy tắc chung). Không có thì ghi `_No response_`.
- Mục ảnh / video mẫu: ghi `_No response_` (ảnh và video mẫu chỉ kéo thả được trên trang web).

## Mẫu nội dung (chép nguyên, thay phần trong < >)

```
### Kịch bản (bắt buộc)

## DE
<câu 1>
<câu 2>
...

## VI
<dịch câu 1>
<dịch câu 2>
...

## NGUỒN
<nguồn / ghi chú nguồn, mỗi nguồn một dòng>

### Ảnh mẫu phong cách (không bắt buộc)

_No response_

### Video mẫu (không bắt buộc)

_No response_

### Ảnh mẫu theo cảnh (không bắt buộc)

_No response_

### Ghi chú hình ảnh (không bắt buộc)

<ghi chú phong cách, hoặc _No response_>

### Giọng đọc

Giọng mặc định (clone "nữ- đức", clone_113)

### File MP3 của bạn (chỉ khi chọn "tự đính kèm")

_No response_
```

Giọng nam: thay dòng giọng bằng `Giọng clone "nam- đức" (clone_112)`.

## Báo Claude làm tiếp các video đang tạm giữ

Phiếu có nhãn `hold` là video đang tạm giữ: giọng đã có, nhưng máy chưa vẽ. Khi ChatGPT sửa repo xong và muốn máy làm tiếp, **tạo một issue có tiêu đề bắt đầu bằng `[Làm tiếp]`**, ví dụ `[Làm tiếp] Đã cải thiện quy tắc hình ảnh`. Trong nội dung, ghi ngắn đã sửa những gì.

Lượt chạy kế tiếp của Claude (tối đa 1 giờ) sẽ:
- bỏ `hold` khỏi các phiếu đó;
- cho chúng vào hàng làm video;
- trả lời và đóng issue `[Làm tiếp]`.

## Kiểm tra video cuối và gửi yêu cầu sửa (ChatGPT làm, từ 30/10)

Chủ kênh chốt: **ChatGPT kiểm tra video cuối**, Claude không tự kiểm tra nữa.

1. Khi phiếu có bình luận `✅ Video hoàn chỉnh đã xong` (nhãn `done`), tải `https://github.com/maihaianh2911-bit/geister-video-factory/raw/renders/v<N>-final.mp4` và xem. Bảng cảnh (số cảnh + thời gian) nằm trong bình luận `Bản xem trước` của phiếu; chi tiết ở `src/videos/v<N>/storyboard.json`.
2. Có lỗi → **viết một bình luận trên chính phiếu đó** (từ tài khoản chủ kênh, **không** bắt đầu bằng 🤖), mỗi lỗi một dòng:
   ```
   cảnh 12: chữ "700 KG" bị cắt ở mép phải → thu nhỏ thẻ, đặt vào trong khung
   cảnh 25: Tuffi lơ lửng trên bờ → chân phải chạm cỏ
   ```
   Ghi rõ số cảnh, lỗi nhìn thấy và muốn sửa thế nào. Gom hết lỗi của một video vào **một** bình luận.
3. Máy tự gắn `needs-fix`, gọi Claude sửa đúng các cảnh đó, duyệt lại rồi dựng bản mới (bình luận `🛠️ Đã nhận yêu cầu sửa`). Khi có `✅ Video hoàn chỉnh đã xong` mới thì kiểm tra lại.
4. Video đạt thì **không bình luận gì** trên phiếu: mọi bình luận của chủ kênh trên phiếu `done` đều tạo một lượt sửa.

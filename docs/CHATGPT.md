# Hướng dẫn cho ChatGPT: tạo phiếu video

> Từ 29/10/2026 **Claude tự viết kịch bản mỗi ngày** (`AGENT_WRITER.md`, 5 kênh trong `prompts/channels.md`), chủ kênh duyệt trong phiếu `[Kịch bản] …`. ChatGPT không cần gửi phiếu nữa; nếu vẫn gửi thì dòng đầu của `### Ghi chú hình ảnh` phải là `KÊNH: <1–5>` và không đính kèm video/ảnh mẫu. Mẫu nội dung bên dưới vẫn là định dạng chuẩn của phiếu.

Repo: `maihaianh2911-bit/geister-video-factory`. Mỗi video = **một Issue mới**. Tạo xong là máy tự làm hết (giọng → Claude thiết kế → dựng MP4 → báo email). Không gắn nhãn, không làm gì thêm.

## Quy tắc

- **Tạo Issue bằng tài khoản `maihaianh2911-bit`** (phiếu của tài khoản khác sẽ không tự chạy).
- **Tiêu đề:** `[Video] <tiêu đề tiếng Đức>`
- **Nội dung:** đúng các mục `###` bên dưới, giữ nguyên tên mục, không thêm mục khác.
- **Kịch bản:** mỗi câu tiếng Đức một dòng dưới `## DE`; dòng tiếng Việt tương ứng **cùng thứ tự, cùng số dòng** dưới `## VI`. Độ dài hợp lý **150–230 từ tiếng Đức** (60–90 giây).
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

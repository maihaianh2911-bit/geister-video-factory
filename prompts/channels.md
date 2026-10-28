# Năm kênh — nội dung và phong cách (owner-approved 28/10/2026)

Mỗi phiếu video có dòng đầu tiên trong `### Ghi chú hình ảnh`: `KÊNH: <số> – <tên>`. Người viết kịch bản (`AGENT_WRITER.md`) dùng phần **Nội dung** của kênh; người thiết kế cảnh (`AGENT_NIGHTLY.md`) dùng phần **Phong cách** làm style bible mặc định (ghi chú riêng của phiếu vẫn đứng trước).

Không dùng video mẫu / ảnh mẫu của người khác. Mỗi kênh có một nhận diện riêng, không giống kênh nào khác và không giống kênh của người khác.

Khán giả: người nói tiếng Đức (DE/AT/CH), xem Shorts/TikTok/Reels trên điện thoại. Xưng `du`.

---

## KÊNH 1 – Truyện sinh tồn

**Nội dung**
- Truyện giả tưởng nhiều phần (`Teil 1`, `Teil 2`, …), ngôi thứ hai ("Du …") hoặc một nhân vật cố định có tên Đức/quốc tế dễ đọc.
- Mỗi phần: câu mở là nguy hiểm hoặc nghịch lý ngay lập tức; giữa phần là **một mẹo sinh tồn có thật** (nước, nhiệt, ánh sáng, tiếng động, pin…) được kể bằng hành động, không giảng giải; kết bằng **một biến cố mới** + câu hỏi cho người xem.
- Mỗi lúc chỉ chạy **một bộ truyện**. Một bộ 5–8 phần, phần cuối có kết thúc thật (không treo mãi). Nhân vật, địa điểm, quy tắc của thế giới giữ nguyên trong cả bộ.
- Không máu me, không tra tấn, không tự hại; căng thẳng bằng âm thanh, bóng tối, dấu vết.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: đêm, ngột ngạt, một nguồn sáng ấm duy nhất giữa bóng tối lạnh.
- Palette: nền than lạnh `#141A1F` / `#1E2A30`, bóng tối xanh rêu `#24363A`; ánh đèn pin/nến hổ phách `#FFB547`; nguy hiểm đỏ `#E5484D` (chỉ dùng cho mối đe dọa); da nhân vật ấm `#E8B38A`.
- Nét: viền đậm 6 px màu `#0B0F12`, hình phẳng, bóng đổ cứng một hướng theo nguồn sáng.
- Nhân vật chính mỗi bộ: thiết kế riêng (màu áo, tóc, phụ kiện) ghi vào `style.md` của Teil 1 và dùng lại y hệt ở các phần sau.
- Máy quay: cận tay/đồ vật, nhìn qua mắt mèo/khe cửa/rèm, cảnh tầng nhà từ ngoài vào; cắt 1,5–2,5 s một lần.
- Chữ trên hình: chỉ giờ (`07:20`), ngày (`TAG 2`), số đếm quan trọng; kiểu nhãn mono trắng trên nền đen.
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "horror"}`. Nhạc: `horror_tension` (hoặc `mystery` cho phần nhẹ hơn).

---

## KÊNH 2 – Đố toán & logic

**Nội dung**
- Một câu đố/nghịch lý có lời giải đẹp: đưa đề → dẫn người xem vào **đáp án sai phổ biến** → "Stopp, denk kurz nach" → hé lộ mẹo → đáp án → một câu kết vì sao mẹo này hay.
- Đề phải đúng và có một đáp án chắc chắn; nêu rõ giả định (không hòa, ngựa chạy đều…). Kiểm tra lời giải bằng tay hoặc bằng Python trước khi viết.
- Giọng: nữ (`clone_113`).

**Phong cách**
- Mood: sáng, gọn, như sổ tay của một người thông minh.
- Palette: giấy kem `#F7F3EA`, mực xanh đậm `#1F2A44`, bút dạ vàng `#FFD84D` (điểm nhấn), sai `#FF6B5B`, đúng `#2BB673`, lưới ô li `#E4DED2`.
- Nét: viền 4 px `#1F2A44`, góc bo, hình học rõ; đối tượng của câu đố (đồng xu, ngựa, dừa…) là nhân vật chính, có mắt nhỏ biểu cảm.
- Máy quay: sơ đồ chiếm giữa khung, phóng to vào bước quan trọng; số và phép tính xuất hiện đúng chữ được đọc.
- Một khung "STOPP" 1 giây trước lời giải (chữ lớn, bút dạ vàng).
- `style.json`: `{"dust": false, "vignette": false, "subtitle": "default"}`. Nhạc: `science_curious` hoặc `explainer_light`.

---

## KÊNH 3 – Nếu điều đó xảy ra?

**Nội dung**
- Một giả định lớn và chuỗi hậu quả theo thời gian ("Sekunde 1 … Tag 1 … Jahr 1"), dựa trên khoa học thật; nói rõ chỗ nào là ước tính.
- **Tránh:** chiến tranh, vũ khí hạt nhân, khủng bố, thảm họa ở một thành phố thật có người, dịch bệnh có thật đang diễn ra. Chọn giả định kiểu: Trái Đất ngừng quay, Mặt Trăng biến mất, không còn Internet một tuần, mọi người cao gấp đôi, nước biển ngọt.
- Kết bằng một hậu quả bất ngờ hoặc một câu hỏi.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: điện ảnh, quy mô lớn, tò mò.
- Palette: không gian chàm `#0B1026` → `#1B2A5A` (gradient), cam mặt trời `#FF8A3D`, dữ liệu xanh lơ `#4FD1E8`, trắng sao `#F2F5FF`.
- Nét: viền mảnh 3 px, nhiều lớp chiều sâu (gần – xa), ánh sáng phát quang mềm.
- Máy quay: toàn cảnh địa cầu/bản đồ → zoom thẳng xuống một con phố → cận một người bình thường phản ứng; mốc thời gian chạy ở góc trên (`TAG 1 → TAG 30`).
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "default"}`. Nhạc: `mystery` hoặc `science_curious`.

---

## KÊNH 4 – Cơ thể & đời sống

**Nội dung**
- Một hiện tượng cơ thể hoặc thói quen quen thuộc của **chính người xem** ("Warum zuckst du beim Einschlafen?"): tình huống đời thường → bên trong cơ thể xảy ra gì → điều bất ngờ → một mẹo an toàn, chung chung.
- Chỉ dùng kiến thức có nguồn uy tín (NHS, Mayo Clinic, RKI, BfR, DGE, bài tổng quan khoa học) và ghi nguồn trong `## NGUỒN`. Không chẩn đoán, không khuyên thuốc/liều lượng; triệu chứng đáng lo thì nói "lass das ärztlich abklären".
- Giọng: nữ (`clone_113`).

**Phong cách**
- Mood: thân thiện, sạch sẽ, dễ hiểu.
- Palette: xanh ngọc `#2EC4B6`, trắng `#FFFFFF`, hồng cơ quan `#FF8FA3`, xanh mực `#16324F`, da ấm `#F1C6A5`, nền phòng pastel `#EAF6F4`.
- Nét: viền 4 px `#16324F`, hình tròn trịa; nhân vật chính là một người bình thường (thay đổi giữa các video), cơ quan nội tạng có mặt biểu cảm.
- Máy quay: cảnh đời thường → "kính lúp"/mặt cắt trong suốt vào cơ thể → quay lại người; số liệu thành bộ đếm hoặc thanh đo.
- `style.json`: `{"dust": false, "vignette": false, "subtitle": "default"}`. Nhạc: `explainer_light`.

---

## KÊNH 5 – Chuyện có thật khó tin

**Nội dung**
- Một sự kiện/thí nghiệm/hành trình **có thật** với người, năm, địa điểm cụ thể: mở bằng chi tiết khó tin nhất → bối cảnh → diễn biến theo mốc thời gian → kết quả → điều người ta học được hoặc điều vẫn chưa rõ.
- Kiểm tra mọi con số/ngày tháng bằng WebSearch và ghi nguồn. Không bịa lời thoại của người thật; không kể chuyện của người còn sống theo cách bôi nhọ. Tránh vụ án gây chết người gần đây.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: phim tài liệu cũ, hồ sơ lưu trữ.
- Palette: giấy ố `#EADBC0`, mực nâu đen `#3B2F2A`, đỏ con dấu `#B23A2E`, xanh ô liu nhạt `#6B7B4B`, bóng nâu `#8A6E52`.
- Nét: viền 4 px `#3B2F2A`, chất giấy, hạt phim nhẹ; nhân vật vẽ theo trang phục đúng thời đại nhưng là hình vẽ riêng (không chép ảnh thật).
- Máy quay: ảnh khung polaroid, bản đồ có ghim, tem ngày (`SAN DIEGO · 1964`), trang báo cũ trượt vào; cắt 2–3 s.
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "clean"}`. Nhạc: `mystery`.

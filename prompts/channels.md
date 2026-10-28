# Năm kênh — nội dung và phong cách (chủ kênh chốt 29/10/2026)

Mỗi phiếu video có dòng đầu tiên trong `### Ghi chú hình ảnh`: `KÊNH: <số> – <tên>`. Người viết kịch bản (`AGENT_WRITER.md`) dùng phần **Nội dung** của kênh; người thiết kế cảnh (`AGENT_NIGHTLY.md`) dùng phần **Phong cách** làm style bible mặc định (ghi chú riêng của phiếu vẫn đứng trước).

Không dùng video mẫu / ảnh mẫu của người khác. Mỗi kênh có một nhận diện riêng, không giống kênh nào khác và không giống kênh của người khác.

**Khán giả:** người nói tiếng Đức (DE/AT/CH), xem Shorts/TikTok/Reels trên điện thoại. Xưng `du`. Người Đức thích chuyện **gắn với Đức / châu Âu**, thích **chính xác**, ghét giật tít quá đà: con số phải đúng, không phóng đại, không hứa điều video không giữ. Dùng ví dụ, địa danh, đơn vị, thói quen của Đức khi tự nhiên (Pfand, Deutsche Bahn, Altbau, Winterzeit, BBK…). Tránh chính trị đảng phái, Thế chiến II/Đức Quốc xã, tôn giáo, người di cư.

---

## KÊNH 1 – Sinh tồn ở Đức

**Nội dung**
- Truyện giả tưởng nhiều phần (`Teil 1`, `Teil 2`, …) về **khủng hoảng có thể xảy ra thật ở Đức**: mất điện diện rộng (Blackout), lũ lụt, bão tuyết/rét đậm, nắng nóng, mất nước máy, sập mạng điện thoại. Đặt ở một nơi cụ thể của Đức (một khu Plattenbau ở Leipzig, một làng ở Eifel, một Altbau ở Hamburg…), nhân vật tên Đức.
- Mỗi phần: câu mở là nguy hiểm/nghịch lý ngay lập tức; giữa phần là **một mẹo sinh tồn có thật** (theo khuyến nghị của BBK — Bundesamt für Bevölkerungsschutz, Notvorrat 10 ngày, radio pin, nước, giữ ấm…), kể bằng hành động, không giảng giải; kết bằng **một biến cố mới** + câu hỏi cho người xem.
- Mỗi lúc chỉ chạy **một bộ truyện**. Một bộ 5–8 phần, phần cuối có kết thúc thật. Nhân vật, địa điểm, quy tắc giữ nguyên trong cả bộ. Mẹo phải đúng (kiểm tra với BBK/THW/DWD bằng WebSearch).
- Không máu me, không bạo lực chi tiết; căng thẳng bằng bóng tối, âm thanh, đồng hồ, dấu vết.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: đêm, ngột ngạt, một nguồn sáng ấm duy nhất giữa bóng tối lạnh.
- Palette: nền than lạnh `#141A1F` / `#1E2A30`, bóng tối xanh rêu `#24363A`; ánh đèn pin/nến hổ phách `#FFB547`; nguy hiểm đỏ `#E5484D` (chỉ cho mối đe dọa); da nhân vật ấm `#E8B38A`.
- Nét: viền đậm 6 px `#0B0F12`, hình phẳng, bóng đổ cứng theo nguồn sáng.
- Nhân vật chính mỗi bộ: thiết kế riêng (màu áo, tóc, phụ kiện) ghi vào `style.md` của Teil 1 và dùng lại y hệt ở các phần sau.
- Máy quay: cận tay/đồ vật, nhìn qua cửa sổ/khe cửa, cảnh tòa nhà từ ngoài vào, bản đồ khu phố; cắt 1,5–2,5 s một lần.
- Chữ trên hình: chỉ giờ (`07:20`), ngày (`TAG 2`), số quan trọng; nhãn mono trắng trên nền đen.
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "horror"}`. Nhạc: `horror_tension` (hoặc `mystery`).

---

## KÊNH 2 – Cơ thể & sức khỏe

**Nội dung**
- Một hiện tượng cơ thể hoặc thói quen quen thuộc của **chính người xem** ("Warum zuckst du beim Einschlafen?"): tình huống đời thường → bên trong cơ thể xảy ra gì → điều bất ngờ → một mẹo an toàn, chung chung.
- Chỉ dùng kiến thức có nguồn uy tín (NHS, Mayo Clinic, RKI, BfR, DGE, gesund.bund.de, bài tổng quan khoa học) và ghi nguồn. Không chẩn đoán, không khuyên thuốc/liều; triệu chứng đáng lo thì "lass das ärztlich abklären".
- Giọng: nữ (`clone_113`).

**Phong cách**
- Mood: thân thiện, sạch sẽ, dễ hiểu.
- Palette: xanh ngọc `#2EC4B6`, trắng `#FFFFFF`, hồng cơ quan `#FF8FA3`, xanh mực `#16324F`, da ấm `#F1C6A5`, nền phòng pastel `#EAF6F4`.
- Nét: viền 4 px `#16324F`, hình tròn trịa; nhân vật chính là một người bình thường (đổi giữa các video), cơ quan nội tạng có mặt biểu cảm.
- Máy quay: cảnh đời thường → "kính lúp"/mặt cắt trong suốt vào cơ thể → quay lại người; số liệu thành bộ đếm hoặc thanh đo.
- `style.json`: `{"dust": false, "vignette": false, "subtitle": "default"}`. Nhạc: `explainer_light`.

---

## KÊNH 3 – Chuyện có thật từ Đức và châu Âu

**Nội dung**
- Một sự kiện/hành trình/thí nghiệm **có thật**, ưu tiên ở Đức, Áo, Thụy Sĩ hoặc có người Đức là nhân vật chính (ví dụ kiểu: Ballonflucht 1979, Juliane Koepcke 1971, Kaspar Hauser, Hauptmann von Köpenick, Grubenunglück Lengede 1963). Mở bằng chi tiết khó tin nhất → bối cảnh → diễn biến theo mốc thời gian → kết quả → điều vẫn còn bí ẩn hoặc điều đáng nhớ.
- Kiểm tra mọi con số/ngày tháng/tên bằng WebSearch và ghi nguồn. Không bịa lời thoại của người thật; không kể người còn sống theo cách bôi nhọ; tránh vụ án mạng gần đây và chủ đề Đức Quốc xã.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: phim tài liệu cũ, hồ sơ lưu trữ.
- Palette: giấy ố `#EADBC0`, mực nâu đen `#3B2F2A`, đỏ con dấu `#B23A2E`, xanh ô liu nhạt `#6B7B4B`, bóng nâu `#8A6E52`.
- Nét: viền 4 px `#3B2F2A`, chất giấy, hạt phim nhẹ; nhân vật vẽ theo trang phục đúng thời đại nhưng là hình vẽ riêng (không chép ảnh thật).
- Máy quay: ảnh khung polaroid, bản đồ có ghim, tem ngày (`BERLIN · 1979`), trang báo cũ trượt vào; cắt 2–3 s.
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "clean"}`. Nhạc: `mystery`.

---

## KÊNH 4 – Khoa học

**Nội dung** — luân phiên 3 dạng:
- **"Warum …?"** – khoa học đời thường (vì sao băng trơn, vì sao trời chiều đỏ, vì sao Brot thì ỉu còn Kekse thì mềm).
- **"Was wäre, wenn …?"** – giả định lớn và chuỗi hậu quả theo thời gian (Sekunde 1 … Tag 1 … Jahr 1), gắn với Đức khi tự nhiên ("…wenn Deutschland eine Woche kein Internet hätte"). Nói rõ chỗ nào là ước tính. **Không** chiến tranh, vũ khí, khủng bố, thảm họa ở thành phố thật có người.
- **Vũ trụ & tự nhiên** – vũ trụ, Trái Đất, động vật kỳ lạ, hiện tượng tự nhiên ở Đức (núi lửa Eifel, Wattenmeer, Föhn).
- Kiểm tra con số bằng WebSearch, ghi nguồn. Kết bằng điều bất ngờ hoặc câu hỏi.
- Giọng: nam (`clone_112`).

**Phong cách**
- Mood: điện ảnh, tò mò, quy mô lớn.
- Palette: không gian chàm `#0B1026` → `#1B2A5A` (gradient), cam mặt trời `#FF8A3D`, dữ liệu xanh lơ `#4FD1E8`, trắng sao `#F2F5FF`.
- Nét: viền mảnh 3 px, nhiều lớp chiều sâu (gần – xa), phát quang mềm.
- Máy quay: toàn cảnh → zoom thẳng vào chi tiết (phân tử, con phố, một người phản ứng); mốc thời gian/số liệu chạy ở góc trên.
- Con số / kết luận quan trọng: một thẻ chữ lớn (từ khóa đậm tô màu + dòng nghiêng nhỏ, cách của kênh 5) chồng lên hình trong 1–2 s — chỉ cho 2–4 khoảnh khắc mỗi video, phần còn lại là hình minh họa.
- `style.json`: `{"dust": true, "vignette": true, "subtitle": "default"}`. Nhạc: `science_curious` (hoặc `mystery`).

---

## KÊNH 5 – Tâm lý học đời thường

**Nội dung**
- Một hiện tượng tâm lý mà ai cũng gặp ("Warum schiebst du alles auf?", "Warum vergisst du Namen sofort?", "Warum fühlt sich der Rückweg kürzer an?"): tình huống quen thuộc → tên hiện tượng / thí nghiệm nổi tiếng chứng minh nó (ai, năm nào) → vì sao não làm vậy → một mẹo nhỏ dùng được ngay.
- Chỉ dùng hiệu ứng có nghiên cứu thật, ghi nguồn; nói rõ nếu kết quả còn tranh cãi (ví dụ thí nghiệm không lặp lại được). Không chẩn đoán bệnh tâm lý.
- Giọng: nữ (`clone_113`).

**Phong cách — chữ chuyển động (kinetic typography), chủ kênh chọn 29/10**
- Mood: sạch, thông minh, như một trang sổ tay đẹp; chữ là nhân vật chính.
- Nền: giấy kem `#F4EFE6` có lưới ô li mờ `#E3DCCF`, bóng góc rất nhẹ. Không nền tối.
- Chữ: mỗi câu = một "thẻ" chữ giữa khung. Từ khóa **rất to, đậm, không chân** (Inter 900) tô màu; câu dẫn nhỏ hơn bằng **chữ nghiêng có chân** (serif italic, `font-family: "Liberation Serif", "DejaVu Serif", serif` — có sẵn trên máy dựng) màu mực `#2B2B2B`. Màu từ khóa: xanh lam `#2F4BDB`, đỏ `#E5484D`, cam `#F28C28`, xanh ngọc `#14A38B` (đúng/tốt), tím `#7A5AF8` (não, cảm xúc). Có thể gạch chân bằng vệt bút dạ vàng `#FFD84D` sau từ khóa.
- Chuyển động: chữ hiện theo đúng từ được đọc (đọc `chunks` trong timing): bật lên/trượt vào, từ khóa phóng to nhẹ khi được đọc; con số đếm lên; con dấu xiên (`STOPP`, `MYTHOS`, `BEWIESEN ✓`) đóng xuống có rung; khung chữ nét đứt kiểu ghi chú; dấu ✓ / ✗ tự vẽ. Đổi thẻ bằng cắt gọn hoặc trượt ngang nhanh — không để chữ đứng im quá 2 s.
- Hình: chỉ thêm biểu tượng phẳng nhỏ khi giúp hiểu (bộ não, đồng hồ, điện thoại, mũi tên vẽ tay) — tối đa 1 biểu tượng mỗi thẻ, cùng bảng màu, viền 3 px `#2B2B2B`.
- Thanh tiến trình mảnh ở mép trên (vạch mực + chấm tròn chạy theo thời lượng video) — kiểu riêng của kênh; không chép logo, tên kênh hay bố cục y hệt của video tham khảo.
- Chữ trên thẻ là **tiếng Đức**, ngắn (1–5 từ khóa + một dòng nghiêng), không lặp nguyên văn phụ đề; phụ đề vẫn chạy ở dưới.
- 3 giây đầu: thẻ đầu tiên đã có chữ to ngay khung hình đầu, chuyển động lớn trước 1 s.
- `style.json`: `{"dust": false, "vignette": false, "subtitle": "default"}`. Nhạc: `explainer_light` (hoặc `funny`).

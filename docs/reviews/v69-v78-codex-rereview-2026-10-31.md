# Duyệt lại v69–v78 sau sửa — 31/10/2026

## Kết luận và giới hạn

**Bảy MP4 mới v69, v70, v73, v75, v76, v77, v78 không còn lỗi hình ảnh bắt buộc sửa đã xác nhận trong các mẫu kiểm tra.** Mười hai mục hình ảnh đã sửa; hai mục căn chữ V73-01/V76-01 đã thay fallback chia đều bằng mốc từng từ khác nhau và cập nhật phụ đề thực tế trong MP4. Chưa phê duyệt độ khớp lời nói bằng nghe. Không phát hiện lỗi hình mới đủ chắc chắn để gửi yêu cầu dựng lại.

v71, v72, v74 có Git blob giữ nguyên so với báo cáo gốc: giữ nhận xét cũ, không yêu cầu làm lại.

Đây là duyệt **ảnh trích từ MP4 và dữ liệu kỹ thuật**, không phải xem từng khung hình/chuyển động liên tục hoặc đánh giá thính giác. Không có công cụ nghe đầu vào được sử dụng. Chưa kết luận phát âm, chất giọng, nhạc lấn lời hoặc độ hấp dẫn của âm thanh; LUFS, transcript và matched_words không thay được việc nghe. Các kết luận chỉ áp dụng cho đúng SHA bên dưới, không bảo đảm không còn lỗi ngoài mẫu.

## Phiên bản và điều kiện bắt đầu

- [Báo cáo gốc](https://github.com/maihaianh2911-bit/geister-video-factory/blob/032c2624f541581ba4ba47b70358dbb75e2086eb/docs/reviews/v69-v78-codex-batch-review-2026-10-31.md), commit `032c2624f541581ba4ba47b70358dbb75e2086eb`.
- MP4 được tải thật từ raw.githubusercontent.com tại renders commit **`c6eefe8993380b1fa739e4d31788dfa5114deba6`**, không dùng ảnh storyboard/contact sheet do bên dựng cung cấp làm bằng chứng thay MP4.
- job/storyboard/timing đối chiếu tại main commit **`bd753c73f210417f4a7cc2dbedf8a1667fdb8734`**. timing.json xuất trên renders khớp nội dung timing.json trên main cho cả bảy video.
- Trước khi duyệt, cả bảy issue có `done`, không có `needs-fix`, `designing`, `failed`; có bình luận xuất bản mới sau yêu cầu sửa 07:41–07:43 UTC. Tất cả bảy MP4 có Git blob khác bản gốc. Trục trặc xuất bản v69 trước đó đã được giải quyết: tệp thực tế nay đã đổi.
- Kiểm tra lại thư mục docs/reviews trước khi công bố: chưa có báo cáo rereview cho bộ SHA này. Head renders vẫn là commit ghim trên khi kết thúc kiểm tra.

| Video | Bình luận xuất bản mới ngày 31/10/2026 | Giờ UTC |
|---|---|---|
| v69 | [comment 6542271505](https://github.com/maihaianh2911-bit/geister-video-factory/issues/69#issuecomment-6542271505) | 10:32:49 |
| v70 | [comment 6541022419](https://github.com/maihaianh2911-bit/geister-video-factory/issues/70#issuecomment-6541022419) | 08:13:54 |
| v73 | [comment 6541114827](https://github.com/maihaianh2911-bit/geister-video-factory/issues/73#issuecomment-6541114827) | 08:24:08 |
| v75 | [comment 6540900228](https://github.com/maihaianh2911-bit/geister-video-factory/issues/75#issuecomment-6540900228) | 08:00:22 |
| v76 | [comment 6541202435](https://github.com/maihaianh2911-bit/geister-video-factory/issues/76#issuecomment-6541202435) | 08:34:07 |
| v77 | [comment 6540881067](https://github.com/maihaianh2911-bit/geister-video-factory/issues/77#issuecomment-6540881067) | 07:58:09 |
| v78 | [comment 6541142263](https://github.com/maihaianh2911-bit/geister-video-factory/issues/78#issuecomment-6541142263) | 08:27:13 |

## Cách kiểm tra

Đã tính lại SHA-256 và Git blob từ byte tải về, đối chiếu danh sách tệp GitHub. ffprobe xác nhận H.264 1080×1920/30 fps, AAC 48 kHz cho cả bảy. ffmpeg giải mã hết các luồng hình/tiếng, tất cả exit 0. Không thay đổi âm thanh hay xuất lại video khi đo loudness: đầu ra phép đo đi vào null.

Đã xem mẫu 1 fps xuyên suốt bảy video, mẫu giữa mọi cảnh, chuỗi khoảng 3 fps trước/trong/sau thao tác có lỗi và cảnh lân cận. Bổ sung 78 mẫu 3 fps ở 0–26 s của v73, 7 khung chọn chính xác quanh bộ đếm 21 (68,8–69,5 s). Đối chiếu phụ đề hiển thị, đồ vật/nhân vật, tiếp xúc và mạch hành động với job và storyboard mới. Các mốc trên ảnh ghép từ lọc fps là xấp xỉ; khung chọn theo số frame dùng mốc chính xác.

| Video | Dài (s) | Mẫu 1 fps | Giữa cảnh | Mẫu dày/chọn thêm | LUFS đầu vào | dBTP đầu vào |
|---|---:|---:|---:|---:|---:|---:|
| v69 | 76.715 | 77 | 22 | 29 | -14.37 | -1.90 |
| v70 | 81.515 | 81 | 29 | 24 | -14.23 | -1.92 |
| v73 | 79.851 | 80 | 22 | 114 | -14.28 | -1.86 |
| v75 | 83.413 | 83 | 28 | 24 | -14.32 | -1.91 |
| v76 | 82.091 | 82 | 38 | 43 | -14.08 | -1.82 |
| v77 | 70.976 | 71 | 28 | 16 | -14.09 | -1.98 |
| v78 | 79.211 | 79 | 25 | 23 | -14.69 | -1.02 |

Tổng **1018 mẫu** (553 xuyên video + 192 giữa cảnh + 273 dày/chọn thêm), có thể trùng thời điểm. Các số LUFS/dBTP chỉ mô tả tín hiệu.

## Trạng thái 14 mã lỗi

Mốc cảnh theo báo cáo gốc; đoạn có đổi timing được đối chiếu thêm với storyboard/timing mới.

| Mã | Vùng kiểm tra | Kết quả quan sát từ MP4 mới | Trạng thái |
|---|---|---|---|
| V69-01 | S5, 11,44–15,64 s | Tay người đàn ông tới mép khe cửa, kéo cửa hé; tay người ngăn nắm cẳng tay rồi kéo lại. Không còn chỉ giơ tay giữa không khí. | Đã sửa trong mẫu |
| V69-02 | S22, 71,40–76,64 s; dày cuối thao tác | Cứu hộ hạ người, tay nâng ở hai bên dưới nách/thân; bé được đưa lên ngưỡng hành lang. Không còn kéo đầu/cổ. | Đã sửa trong mẫu |
| V70-01 | S15–17, 35,08–43,28 s | Sau cảnh gia đình thoát, đoạn nhắc người còn mắc kẹt dùng khung minh họa riêng với người chung và biểu tượng cấm điện thoại/túi; không đưa đứa trẻ đã thoát trở lại tuyến giải cứu. | Đã sửa trong mẫu |
| V70-02 | S23, 59,48–63,48 s | Hai mẫu kính ESG/VERBUND tách riêng, minh họa vỡ vụn/giữ lớp; không còn sơ đồ DEIN AUTO gán loại kính cứng theo vị trí xe. | Đã sửa trong mẫu |
| V73-01 | 0–26 s; S18/S20 số liệu | Mốc từng từ đã thay đổi thực chất; phụ đề đầu video cập nhật. Bộ đếm cây đạt 21 trong khoảng 69,133–69,200 s, gần mốc kết từ 69,12 s trong timing mới. Xem chi tiết và giới hạn phía dưới. | Fallback đã sửa về dữ liệu/hình; chưa xác nhận bằng nghe |
| V73-02 | S12–13, 36,82–44,54 s | Nhóm người sát nhau, các khớp gập/mất điểm tựa, người sau chạm/ngã chồng lên người trước; không còn chỉ xoay nguyên hình que rồi trượt ngang. Minh họa giản lược, không máu me. | Đã sửa trong mẫu |
| V75-01 | S10, 23,42–27,42 s | Nhân vật chỉ giữ điện thoại, bàn tay kia trống; người bán vẫn chờ, không xuất hiện tiền mặt tự giải quyết cảnh này. | Đã sửa trong mẫu |
| V75-02 | S20, 55,72–59,80 s | Laptop vẫn hiện tài liệu cục bộ, router có đèn; dấu gạch tập trung ở kết nối/dịch vụ ONLINE. Không còn phủ dấu cấm toàn thiết bị. | Đã sửa trong mẫu |
| V76-01 | Hai câu đầu 0–8,76 s và cảnh 1–5 | Mốc từng từ khác nhau, có khoảng nghỉ; phụ đề và điểm cắt/hành động đầu đã thay đổi trong MP4. Xem chi tiết phía dưới. | Fallback đã sửa về dữ liệu/hình; chưa xác nhận bằng nghe |
| V76-02 | S16–18, 26,72–32,46 s | Đồng hồ biểu diễn thời gian/đau, sơ đồ nội tạng và mức khó ÄUSSERST SCHWER; bỏ khóa và dấu cấm tuyệt đối. Storyboard mới không còn ép nghĩa thành bất khả thi. | Đã sửa trong mẫu |
| V77-01 | S2, 2,60–4,90 s và S18, 37,78–40,68 s | Bánh đi cùng điểm cầm xuống đất trước khi tay buông; lúc nhấc, tay tới bánh/nắm rồi cả hai cùng lên. Không thấy bánh tự bay trước tay ở chuỗi đã kiểm. | Đã sửa trong mẫu |
| V78-01 | S6–18, 11,02–57,90 s | Các mốc TAG 4/13/18/22/25/27 đã thay bằng NACH EINIGEN TAGEN, AM WOCHENENDE, IN DEN FOLGENDEN TAGEN. Ngày mở đầu và ngày cuối chỉ định vị tình huống tháng. | Đã sửa trong mẫu |
| V78-02 | S12, 28,92–31,82 s | Có trục/bàn đạp; chân theo bàn đạp, người ngồi trên yên và tay giữ ghi đông. Không còn chân quẫy độc lập phía trên khung xe. | Đã sửa trong mẫu |
| V78-03 | S25, 74,48–79,16 s | Thấy tay kéo/gom vỏ gối thành bọc; bọc được giữ khi đưa tới máy; cắt cận cho thấy cửa mở trước lúc đưa đồ vào, rồi mới đóng. | Đã sửa trong mẫu |

### Chi tiết căn chữ v73 và v76

- **v73:** đầu 0–25 s bản cũ có 60 từ bắt đầu trong cửa sổ này, thời lượng gần như chỉ 0,410–0,411 s. Bản mới có 58 từ bắt đầu trong cùng cửa sổ, độ dài 0,073–1,020 s với 36 giá trị độ dài khác nhau. Số từ trong cửa sổ thay đổi do mốc thay đổi, không phải lời đọc bị cắt. Ví dụ mới: Du 0,384–0,480; Musikfestival 1,660–2,480; bestimmen 5,320–5,860. matched_words đổi 107/183 → 183/183. Đã xem chuỗi 3 fps 0–26 s để xác nhận phụ đề và minh họa thật đã cập nhật, không chỉ đổi precision. Ở cảnh số liệu, timing đặt Einundzwanzig 61,132–61,600, fünfhundert 63,500–63,920 và einundzwanzig cây 68,723–69,120. Counter đạt 21 ở khoảng 69,133–69,200 s trên MP4: sai khác nhỏ dưới 0,1 s so với kết từ lưu trong dữ liệu; không coi đây là lỗi buộc dựng lại. Chưa xác nhận các mốc này với lời nói bằng nghe.
- **v76:** 23 từ hai câu đầu trước đây đều 0,376–0,377 s. Nay dài 0,140–0,740 s với 15 giá trị khác nhau. Ví dụ Wie 0,320–0,480; amputiert 1,500–2,000; zuverlässige 2,720–3,440; gab 3,880–4,140; Du bắt đầu 4,820, sau một khoảng nghỉ. matched_words đổi 153/183 → 183/183. Có thay đổi thật về phụ đề đầu và điểm cắt cảnh (cảnh đầu kết 1,50 s), không dựa vào precision=word. Đã xem chuỗi 3 fps xuyên hai câu và mẫu toàn video để kiểm tra vùng liên quan. Chưa xác nhận độ khớp từng từ bằng nghe.
- Hai mục này được chấp nhận **trong phạm vi sửa fallback và hình/dữ liệu đã kiểm**, không phải chứng nhận đồng bộ thính giác chính xác toàn bài. Không có lỗi đồng bộ bằng nghe đã được xác nhận để gửi yêu cầu sửa; cũng không dùng matched_words suy ra lời đọc đã đúng/thiếu.

## Giữ nguyên kịch bản và nguồn giọng

Đối chiếu trường de/vi trong jobs/vN/job.json giữa commit báo cáo gốc và main ghim mới: cả bảy giữ nguyên. Các Git blob **assets/vN/voice.mp3** dưới đây giống hệt giữa hai cây Git; đây là đối chiếu tệp nguồn bằng Git, không chỉ tin chuỗi voice_sha trong timing. Chuỗi voice_sha trong timing cũng không đổi. Không tạo lại giọng trong lượt kiểm tra này; không khẳng định MP4 có luồng tiếng giống từng byte với voice.mp3 vì MP4 là bản trộn/mã hóa.

| Video | Git blob voice.mp3, cũ = mới |
|---|---|
| v69 | `e66c62110069c9483afae84901a88a8a423733a9` |
| v70 | `344b31f62eb25b2f0de08715c9acb5123b82ad39` |
| v73 | `ae1b668bc5b8346884c1990c4a034f437a1417f5` |
| v75 | `5752181434ceb14a3f9b0e1810f269d163f6b526` |
| v76 | `e4c3f4f9c4d044f14ea450e6076342c003bf4d09` |
| v77 | `94625c7eca19728ee81836aefdb5287150e06fff` |
| v78 | `6871926e6e8d7eb0e5b3214ddc374d55aa18985d` |

## Định danh bảy MP4 mới đã tải/kiểm tra

| Video | MP4 ghim theo commit renders | Byte | Git blob SHA | SHA-256 |
|---|---|---:|---|---|
| v69 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v69-final.mp4) | 10174781 | `17e5126a935575bfd1db60e30d12d0e75e517b47` | `0830088ab4a859949a358c1cd1b5e32807f06a8078961aba5b9ed35853d64320` |
| v70 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v70-final.mp4) | 16605884 | `66c37a93a3e8b6e773d8dd5380776ff968365450` | `bc922fcbe38df21aad46cdd312a866f2bcf7af5b528976b67cf122e3e67e6b34` |
| v73 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v73-final.mp4) | 17106261 | `2c0678ae6b5ea9883f04b4393cf91b2d2c898df4` | `63dc79b81d6c90adafa7fbf7b915e4b2b28a86d247f07abba479501d323e7630` |
| v75 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v75-final.mp4) | 10827822 | `5c23a2b539a31f36ebd1355273930fdfce29b27f` | `a3d12e7ab875a0f061c85d484a8f2b61f11261ad96b8fb145e9aa01780aca1f4` |
| v76 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v76-final.mp4) | 14221655 | `fb57fe547928770bf24a7b6174175f75e30e8bc2` | `a7e8614772c8ec6987904377a7cb36656967cdd1e94cc093a75005aea35c7ec2` |
| v77 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v77-final.mp4) | 12394172 | `ebbde7f8569b3e675cac5dfc212cddf8de62375a` | `777619c64eeab1cd91e6af4e62d635b48951e0f7ac76f7c0e7c7b345093a5d9b` |
| v78 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c6eefe8993380b1fa739e4d31788dfa5114deba6/v78-final.mp4) | 10012904 | `786c4c4a32cf7056b616c44df3709cc5b7657167` | `e45c60bb20b8bd10758fa54838e7381719023995e5aaf0fa3b00783fd6576acd` |

## Ba video giữ nhận xét cũ

Các blob hiện tại trên renders khớp báo cáo gốc, nên không tải/duyệt lại cùng nội dung và không yêu cầu dựng lại.

| Video | Git blob MP4, cũ = mới | Kết luận giữ lại |
|---|---|---|
| v71 | `c592a16a8d3335742cb583df0bfe862b5e8f5e0e` | Chưa thấy lỗi hình bắt buộc sửa trong phạm vi duyệt gốc; giảm lệ thuộc thanh đo chỉ là gợi ý. |
| v72 | `737cc247578a340b2a2ea7ab11c959c55c2549f4` | Chưa thấy lỗi hình bắt buộc sửa trong phạm vi duyệt gốc. |
| v74 | `c9c2e9a6fd9ebe20b1c424394f505f80a73c140b` | Chưa thấy lỗi hình bắt buộc sửa trong phạm vi duyệt gốc; matched_words không tự chứng minh lỗi giọng. |

## Gợi ý thẩm mỹ, không phải yêu cầu sửa

v75 còn nhiều đoạn diễn giải bằng biểu tượng/thanh đo, có thể thêm hành động đời thường khi làm video sau. Ở v78 cuối video, vỏ gối và bọc đồ sáng màu có thể tăng tương phản để thao tác rõ hơn trên màn hình nhỏ. Các gợi ý này không có đủ lý do bắt dựng lại những bản đã kiểm.

## Hành động sau duyệt

- Không gửi bình luận yêu cầu sửa mới vì chưa xác nhận lỗi bắt buộc còn lại; không bình luận “đạt” lên issue done để tránh kích hoạt revise.
- Chỉ thêm báo cáo này. Không sửa DE/VI, voice, video, workflow hoặc cấu hình dự án; không tự bật cơ chế duyệt nối tiếp.
- Kết thúc lượt duyệt lại tại bộ SHA này và tạm dừng tác vụ theo dõi hiện tại để không tạo vòng kiểm tra/thông báo lặp. Kết luận không tự áp dụng cho MP4 có SHA khác về sau.

# Kiểm tra độc lập 10 video v69–v78 — 31/10/2026

Kết quả: **7 video cần sửa (14 mục); 3 video chưa thấy lỗi hình ảnh bắt buộc sửa trong phạm vi lấy mẫu.** Không coi nhãn done hay kiểm tra kỹ thuật thành phê duyệt nội dung.

## Bản và phạm vi đã kiểm tra

- Đã tải trực tiếp cả 10 MP4 từ nhánh renders. Git blob của từng tệp khớp danh sách tại commit `c00136b7890829120b9fa53ce5f1e84f4703e809`.
- Mã storyboard/timing/job đối chiếu ở main, mốc đầu kiểm tra `a1befbe07423c01bf7eebc349421f572c1917f7d`.
- Đã xem ảnh trích từ chính MP4: 1 ảnh/giây suốt từng video, 1 ảnh giữa mỗi cảnh và chuỗi 3 ảnh/giây ở các thao tác nghi ngờ. Tổng 1387 mẫu (có thể trùng thời điểm); không phải xem mọi khung hình hay xem chuyển động liên tục. Các lỗi về tiếp xúc được kiểm tra trên chuỗi ảnh trước/trong/sau thao tác.
- Đã giải mã hết luồng hình/tiếng của 10 MP4 bằng ffmpeg: không lỗi giải mã. Cả bộ là H.264 1080×1920, 30 fps, AAC 48 kHz; thời lượng 68,84–83,41 giây.
- Kiểm tra kỹ thuật không ghi nhận khung đen toàn màn ≥0,25 s, freeze theo ngưỡng -50 dB ≥2 s hoặc im lặng theo ngưỡng -50 dB ≥1 s. Hạt bụi/zoom có thể khiến kiểm tra freeze không phát hiện cảnh đứng; các phép đo này không thay đánh giá nội dung.
- **Chưa nghe/đánh giá thính giác:** phiên này không hỗ trợ nghe đầu vào. LUFS/true peak chỉ là đo tín hiệu; chưa kết luận phát âm, giọng tự nhiên, nhạc lấn lời hay độ hấp dẫn của âm thanh. Số matched_words cũng không chứng minh lời đọc bị thiếu.
- Giữ nguyên DE/VI, chủ đề và voice.mp3 đã chốt. Yêu cầu sửa tập trung vào hình, phụ đề/thời gian và tính nhất quán. Đây chưa phải phê duyệt bản sau khi sửa.

## Tổng hợp

| Video | Chủ đề | Kết luận | Dài | Mẫu 1 fps / giữa cảnh / dày | LUFS / dBTP |
|---|---|---|---:|---:|---:|
| [#69](https://github.com/maihaianh2911-bit/geister-video-factory/issues/69) | Kẹt thang máy | Cần sửa | 76.71 s | 77 / 22 / 27 | -14.13 / -1.89 |
| [#70](https://github.com/maihaianh2911-bit/geister-video-factory/issues/70) | Xe chìm, cứu gia đình | Cần sửa | 81.51 s | 81 / 29 / 60 | -14.23 / -1.92 |
| [#71](https://github.com/maihaianh2911-bit/geister-video-factory/issues/71) | Thức trắng rồi đi làm | Chưa thấy lỗi hình bắt buộc sửa | 68.84 s | 69 / 23 / 31 | -14.19 / -1.98 |
| [#72](https://github.com/maihaianh2911-bit/geister-video-factory/issues/72) | Ăn bánh mì mốc | Chưa thấy lỗi hình bắt buộc sửa | 77.16 s | 77 / 26 / 24 | -14.16 / -1.95 |
| [#73](https://github.com/maihaianh2911-bit/geister-video-factory/issues/73) | Loveparade 2010 | Cần sửa | 79.85 s | 80 / 22 / 23 | -14.29 / -1.87 |
| [#74](https://github.com/maihaianh2911-bit/geister-video-factory/issues/74) | Đại úy Köpenick | Chưa thấy lỗi hình bắt buộc sửa | 75.71 s | 76 / 34 / 43 | -14.10 / -1.86 |
| [#75](https://github.com/maihaianh2911-bit/geister-video-factory/issues/75) | Mất Internet 24 giờ | Cần sửa | 83.41 s | 83 / 28 / 19 | -14.31 / -1.84 |
| [#76](https://github.com/maihaianh2911-bit/geister-video-factory/issues/76) | Phẫu thuật trước thuốc mê | Cần sửa | 82.09 s | 82 / 38 / 22 | -14.08 / -1.89 |
| [#77](https://github.com/maihaianh2911-bit/geister-video-factory/issues/77) | Bánh mì cạnh tổ kiến | Cần sửa | 70.98 s | 71 / 28 / 40 | -14.09 / -1.97 |
| [#78](https://github.com/maihaianh2911-bit/geister-video-factory/issues/78) | Một tháng không tắm | Cần sửa | 79.21 s | 79 / 25 / 48 | -14.69 / -1.02 |

## Lỗi và yêu cầu sửa

### v69 — Kẹt thang máy

Cần sửa.

**V69-01 — Cảnh 5 · 11,44–15,64 s**

Quan sát: Người đàn ông giơ hai tay trước ngực, cách khe cửa; không thấy tay chạm cửa để cạy. Tay người ngăn đã chạm cẳng tay, nhưng hành động cạy cửa chưa đọc được.

Yêu cầu: Đưa bàn tay người đàn ông tới đúng mép cửa trước khi người kia nắm cẳng tay kéo lại. Giữ tiếp xúc, tỉ lệ cánh tay và hướng lực; không chỉ giơ tay trong không khí.

**V69-02 — Cảnh 22 · 71,40–76,64 s; rõ nhất 74,3–76,3 s**

Quan sát: Hai bàn tay cứu hộ nằm sát hai bên đầu/cổ đứa trẻ; bé bị nâng lên như được kéo bằng đầu. Thân cứu hộ giữ thẳng trong khi hai cánh tay dài ra tới bé.

Yêu cầu: Dựng lại tư thế cứu hộ cúi xuống và nâng đỡ thân bé ở dưới nách/thân, không ở đầu/cổ; tay giữ đúng điểm tựa suốt lúc nâng. Cho thấy bé được đưa qua ngưỡng đã cố định, thay vì treo giữa cabin.


### v70 — Xe chìm, cứu gia đình

Cần sửa.

**V70-01 — Cảnh 15–17 · 35,08–43,28 s**

Quan sát: 35,1–36,4 s cả bốn người đã ngoài xe. 40,3–43,3 s lại xuất hiện một con còn trong xe, không có dấu hiệu đổi sang ví dụ/nhánh tình huống.

Yêu cầu: Giữ tuyến giải cứu nhất quán. Đoạn minh họa 'khi còn người mắc kẹt' phải được phân biệt rõ là tình huống đối chiếu, hoặc dùng hình cấm gom đồ/gọi điện mà không đưa một trẻ đã thoát trở lại xe. Không sửa lời đọc.

**V70-02 — Cảnh 23 · 59,48–63,48 s**

Quan sát: Sơ đồ ghi DEIN AUTO rồi ấn định kính hai bên phía sau và kính hậu là ESG, kính trước là kính nhiều lớp. Kịch bản không xác định cấu hình kính của chiếc xe/người xem.

Yêu cầu: Bỏ sơ đồ phân loại cố định theo vị trí dưới nhãn DEIN AUTO. Ưu tiên cận ký hiệu loại kính và hai ví dụ ESG/Verbundglas, nhấn việc kiểm tra đúng xe; không gán dấu tích phá kính cho các vị trí chưa được xác nhận.


### v71 — Thức trắng rồi đi làm

Chưa thấy lỗi hình bắt buộc sửa.

Giữ mạch đêm → cà phê → công việc → cáu gắt → lái xe; cảnh nhấc cốc có tiếp xúc, ví dụ 50 km/h – 3 s – >40 m đọc được. Có thể bớt lệ thuộc thanh đo ở 9,28–14,48 và 41,78–48,94 s trong lần nâng chất lượng sau; đây là gợi ý biên tập, không phải lỗi buộc dựng lại.

### v72 — Ăn bánh mì mốc

Chưa thấy lỗi hình bắt buộc sửa.

Giữ mặt cắt sợi nấm, phần bị cắt rơi đi, độc tố còn sau nướng và phân biệt Camembert. Đã kiểm tra dày cảnh cắt, cho bánh vào toaster và bỏ rác: không xác nhận lỗi 'cắt mà bánh không tách' từ ảnh giữa cảnh.

### v73 — Loveparade 2010

Cần sửa.

**V73-01 — timing.json; ưu tiên 0–25,052 s và cảnh số liệu 18, 20**

Quan sát: precision=estimated; matched_words=107/183. Năm câu đầu có thời lượng từng từ gần như đồng loạt 0,410–0,411 s, cho thấy fallback chia đều. Đây là thiếu bằng chứng khớp giọng, không phải bằng chứng giọng đã đọc thiếu 76 từ.

Yêu cầu: Căn lại trên voice.mp3 đang có, kiểm tra transcript và các mốc thực. Cập nhật phụ đề, storyboard/key_time và số liệu theo kết quả; không chỉ đổi precision, không chia đều lại, không tạo giọng mới. Đặc biệt cho bộ đếm 21 cây hoàn tất đúng lúc từ chỉ con số được đọc. Nếu còn đoạn không nhận diện, báo rõ và giữ chưa đạt.

**V73-02 — Cảnh 12–13 · 36,82–44,54 s**

Quan sát: Các hình người khá tách nhau; người ngã chủ yếu xoay nguyên khối rồi trượt ngang, người tiếp theo cũng đổ thành que ngang. Sự truyền lực/va chạm dẫn tới ngã chồng chưa rõ.

Yêu cầu: Dàn đám đông đủ sát và thể hiện một chuỗi mất thăng bằng → chạm người cạnh → mất điểm tựa → ngã chồng có tiếp xúc. Có thể dùng sơ đồ giản lược nghiêm túc nếu diễn cơ thể không đạt; không thêm nguyên nhân/cá nhân có lỗi, không hiệu ứng hài hoặc thương tích.


### v74 — Đại úy Köpenick

Chưa thấy lỗi hình bắt buộc sửa.

Giữ phục trang, bộ nhận diện Voigt/thị trưởng/quản quỹ, mạch chiếm quyền → lấy tiền → bị bắt → nổi tiếng. Các cảnh đội mũ, bắt giữ và bán ảnh có diễn biến nhìn thấy; không cần làm lại cả video. Dữ liệu khớp 165/176 từ là chẩn đoán, tự nó không chứng minh sai giọng.

### v75 — Mất Internet 24 giờ

Cần sửa.

**V75-01 — Cảnh 10 · 23,42–27,42 s; rõ nhất 26,0–27,0 s**

Quan sát: Ngay câu 'wer nur sein Handy mitgebracht hat' nhân vật chỉ có điện thoại, nhưng rồi tự lấy tiền mặt ra trả trong cùng cảnh. Hình giải quyết tình huống bằng một vật mà lời đọc vừa loại trừ.

Yêu cầu: Giữ nhân vật với điện thoại và bàn tay trống/trao đổi chưa thanh toán, thể hiện cần tìm cách trả khác. Để ví dụ tiền mặt đổi tay ở cảnh 23 như kịch bản, không móc sẵn tiền ở cảnh 10.

**V75-02 — Cảnh 20 · 55,72–59,80 s**

Quan sát: Dấu cấm phủ toàn bộ laptop/router, đối chiếu với đèn/tủ lạnh có tích, dễ đọc thành laptop hỏng/tắt. Trước đó video đã cho thấy máy vẫn mở được tài liệu cục bộ.

Yêu cầu: Giữ thiết bị có điện và màn hình tài liệu cục bộ hoạt động; chỉ gạch phần kết nối Internet hoặc dịch vụ online. Phân biệt rõ 'mất dịch vụ mạng' với 'máy ngừng hoạt động'.


### v76 — Phẫu thuật trước thuốc mê

Cần sửa.

**V76-01 — Cảnh 1–5 · 0–8,666 s; timing.json**

Quan sát: Dù precision=word, hai câu đầu có thời lượng mọi từ gần như đồng loạt 0,376–0,377 s. Có fallback cục bộ; matched_words toàn bài 153/183. Chưa đủ cơ sở coi các mốc đầu là theo lời nói thực.

Yêu cầu: Căn lại hai câu mở đầu bằng voice.mp3 gốc và kiểm tra các từ không khớp còn lại. Đồng bộ phụ đề/cắt cảnh/key_time bị ảnh hưởng, ghi rõ phần nào vẫn ước lượng nếu chưa xử lý được. Không đổi nhãn precision để bỏ qua, không tái tạo giọng.

**V76-02 — Cảnh 16–18 · 26,72–32,46 s**

Quan sát: Đồng hồ bị gạch cấm rồi thân người có ổ khóa đỏ, đẩy ý 'äußerst schwer' thành không thể thực hiện. Storyboard cảnh 16 cũng ghi 'không thể', mạnh hơn lời đọc.

Yêu cầu: Thay dấu cấm/khóa tuyệt đối bằng hình khó kéo dài ca mổ hoặc thao tác bị giới hạn bởi đau/thời gian; giữ đúng mức 'rất khó'. Sửa mô tả storyboard cho khớp, giữ nguyên DE/VI.


### v77 — Bánh mì cạnh tổ kiến

Cần sửa.

**V77-01 — Cảnh 2 · 2,60–4,90 s và cảnh 18 · 37,78–40,68 s**

Quan sát: Ở cảnh đặt bánh, tay di chuyển gần ngực/cằm trong khi bánh còn bên trái, rồi bánh đổi sang đất. Cảnh nhấc bánh: bánh tự lên cao trước khi tay gắn vào; không có chuỗi nắm–nhấc rõ.

Yêu cầu: Dùng chung điểm cầm cho bàn tay và bánh: hạ cả hai tới đất → bánh chạm đất → buông tay; chiều ngược lại tay phải tới bánh → nắm → nhấc. Không teleport bánh hoặc cho bánh chuyển động độc lập khi đang cầm. Giữ phần diễn giải đường mùi hiện có.


### v78 — Một tháng không tắm

Cần sửa.

**V78-01 — Cảnh 6–18 · 11,02–57,90 s**

Quan sát: Lịch gắn TAG 4, 13, 18, 22, 25, 27 vào mùi, bụi, tế bào chết và kích ứng. Những mốc này không có trong lời đọc; ghi chú còn xác định đây không phải tiến trình y khoa đúng ngày.

Yêu cầu: Bỏ các ngày cụ thể tự thêm. Dùng đúng các mốc lời đọc: NACH EINIGEN TAGEN, AM WOCHENENDE, IN DEN FOLGENDEN TAGEN hoặc không hiện lịch. Giữ ý một tháng/ngày cuối ở đoạn tắm; không sửa lời đọc.

**V78-02 — Cảnh 12 · 28,92–31,82 s**

Quan sát: Chân người đạp xe đổi vị trí trong không khí; không thấy bàn đạp/điểm tì tương ứng, nên trông như quẫy chân phía trên khung xe.

Yêu cầu: Bổ sung trục và bàn đạp, giữ hai bàn chân theo cùng quỹ đạo bàn đạp và tư thế ngồi trên yên; bàn tay giữ tay lái. Chuyển động chân phải gây ra chuyển động đạp, không chỉ đi vòng tự do.

**V78-03 — Cảnh 25 · 74,48–79,16 s**

Quan sát: Bọc đồ xuất hiện ở tay khi ga/gối đổi trạng thái nhanh, chưa thấy tháo vỏ; sau đó bọc đồ trôi vào mặt cửa máy giặt vẫn đóng.

Yêu cầu: Cho tay nắm/kéo một phần ga hoặc vỏ gối rồi gom lại thành bọc; giữ bọc trên tay khi bước tới máy. Mở cửa máy trước khi đưa đồ vào, sau đó mới đóng. Nếu thiếu thời gian, cắt cận thao tác thay cho cho đồ xuyên cửa.


## Định danh các MP4 đã kiểm tra

Mỗi liên kết dưới đây được ghim theo commit renders, không thay đổi khi xuất bản sửa.

| Video | MP4 được ghim | Git blob SHA | SHA-256 |
|---|---|---|---|
| v69 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v69-final.mp4) | `b8b770c7ccca70d6a0f54cd21cbdda13e87879c8` | `19d06dcf47b89ec1e5d12a1b8d66339588f6276f0ca7f0597f1b9914b2a8a198` |
| v70 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v70-final.mp4) | `a033071891e2461855f8a9dd41e87d80cfe04898` | `aeb6644b1149f47f7e917797b1ae1f0721f4f57f227c8062fb821ca3bc03da59` |
| v71 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v71-final.mp4) | `c592a16a8d3335742cb583df0bfe862b5e8f5e0e` | `a07760f17fb8acf9a32ac1ff0b42e72fdcc620532459caa52f3358067fb942b8` |
| v72 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v72-final.mp4) | `737cc247578a340b2a2ea7ab11c959c55c2549f4` | `f8e5fcf593f261f9efa1a20e9473eb9fd67f9b1c8702397e26dcd7fd7277fbb0` |
| v73 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v73-final.mp4) | `cd1511643672e1144f555791db7d197a19d58311` | `127d1dbdae0e15539ed6f19ea8b269b112f60900330da409cbea89d57214e45d` |
| v74 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v74-final.mp4) | `c9c2e9a6fd9ebe20b1c424394f505f80a73c140b` | `b85d07e7157565083144da14f5b70a147c68948d382cdc171963f12aaf4fa03b` |
| v75 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v75-final.mp4) | `6eab8a040da776a6d150270a98dbd975b3286747` | `5296e583750c4bb8b07a277db2a4dc875e622dab7fb5018cce8e96da0634eef3` |
| v76 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v76-final.mp4) | `d2bd62190e82db6f11796a85e759cb864574e8e5` | `92c188797c8bdcc17a8a3f75f62f2373f5e4e086c882e76ed7efc24e9c78b591` |
| v77 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v77-final.mp4) | `f8cd3395ae6c3be2765e66f5d9d2ce7ec4005d4b` | `adb0fe0d9a265257cf8d7361686ee4fad920cd82e5f00df6fbfaad682d5b5f2c` |
| v78 | [MP4](https://github.com/maihaianh2911-bit/geister-video-factory/blob/c00136b7890829120b9fa53ce5f1e84f4703e809/v78-final.mp4) | `831356d26d3bfa0b8aada0c8bfaedf2f7cadf1f4` | `4e21a1437dcdae6ff6942f18398090fbf8ad0d8080350e3bb930a4eeb607dd98` |

## Bàn giao

Gom lỗi mỗi video thành một bình luận trên đúng issue để luồng revise hiện có xử lý. Không bình luận 'đạt' trên ba issue còn lại vì bình luận chủ kênh trên issue done sẽ tự tạo lượt sửa. Dựng lại bản lỗi rồi cần kiểm tra MP4 mới theo đúng SHA; không tự suy ra đã đạt vì đã sửa mã hoặc có done mới. Không đổi workflow hay bật cơ chế duyệt tự động trong đợt kiểm tra này.

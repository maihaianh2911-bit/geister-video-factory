# v103 – Du mit achtzig (style bible)

- **Phong cách:** "đầu tròn đen" (`prompts/styles/dau-tron-den/`), chuẩn `reference2.jpg`. Bộ vẽ chép từ v101 (lib/sets/props) và thêm nhân vật mới trong `shots/lib.js` + `shots/sets3.js`.
- **Nhân vật cố định:**
  - `du` trẻ: hoodie xanh ngọc `#2fa59a`, dây mũ trắng.
  - `old` (du 80 tuổi): cùng dáng, áo len xanh ngọc bạc màu `#7fa9a2`, khăn quàng xám `#9a9ca3`, vài lọn tóc trắng xoăn trên đầu, kính tròn trắng, gậy gỗ, lưng còng (hunch .3), cùng nụ cười.
  - `lena` (chỉ trong ký ức): tóc đen dài ngang vai, áo len đỏ `#c8453c`.
  - `opa` (chỉ trong cuộc gọi): tóc bạc hai bên, ria mép trắng, áo len nâu `#8a5a3c`.
- **Bảng màu theo cảm xúc:** buổi tối ấm hổ phách (phòng khách, cửa căn hộ, đèn hành lang vàng `#e9b75c`), xanh lạnh dịu khi kể điều hối tiếc (câu 7–9), ký ức sepia `#c08a4a` có viền kem `#f6ead2`, biểu đồ và hai cánh cửa trên nền xanh than `#262a3a`, sáng nắng ở bếp sáng hôm sau, tối xanh + đèn ấm khi nhắn Lena, kết ấm.
- **Ký ức:** bong bóng tròn góc lớn, nền kem, ám sepia và viền tối; lỗi lầm (đám cưới, KÜNDIGUNG) nhỏ và tan đi; điều chưa làm (Lena, vé MADRID, điện thoại OPA) to, rõ, lớn dần.
- **Khung hình:** xen kẽ trung (đầu r≈160), cận (r≈280) và toàn (mở đầu lối vào); máy luôn đẩy/lia; không cảnh nào đứng yên quá ~4 s.
- **Ánh sáng:** một nguồn mỗi cảnh (đèn cây, đèn hành lang, cửa sổ nắng, khe cửa sáng) vẽ bằng `radialGradient`; chỉ nhóm nền xa được làm mờ (stdDeviation ≤ 4).
- **Chữ:** nhãn vàng viền đen (DU MIT ACHTZIG, CORNELL, KURZ DANACH, IM RÜCKBLICK, FEHLER, VERPASSTE CHANCE, AM NÄCHSTEN MORGEN, AM ABEND, DIESE WOCHE); bong bóng thoại trắng có đuôi nhọn, chữ đúng như lời đọc.
- **Âm thanh:** nghiêm túc, ít: chuông cửa (hai tiếng ting), cửa kẽo kẹt, tiếng xé giấy, cửa đóng sầm, bước chân, điện thoại; nhạc tự soạn nhẹ (warm_pad / documentary / curious_pluck), không hiệu ứng hài.
- **Tránh:** hiệu ứng hài, chữ trong vùng phụ đề (y > 1400), vật quan trọng ở x > 920 giữa y 900–1700.

# Gợi ý cho Claude: dùng thêm hạn mức để nâng chất lượng hình ảnh

Chủ repo đề nghị lưu các ý tưởng dưới đây như **gợi ý**, ngày 29/10/2026. Claude tự chọn phần phù hợp với từng video và hạn mức còn lại. Đây là hướng thử nghiệm về thẩm mỹ; chưa được chứng minh là luôn làm video đẹp hơn.

Mục tiêu chính là hình đẹp, diễn đạt rõ và chuyển động có chủ đích. Với video đang sửa, lấy phong cách và bản mà chủ repo đã thích làm chuẩn. Mỗi video có thể có nhân vật riêng hoặc hoàn toàn không có nhân vật. Khoảng trống, nét vẽ nhẹ và nhịp nghỉ có thể là lựa chọn tốt; phóng to chủ thể, tăng độ dày nét, thêm hộp, chi tiết hay hiệu ứng không tự động làm hình tốt hơn.

## 1. Thử nhiều cách dàn cảnh trước khi dựng toàn bộ

Khi chưa chắc cách minh họa nào tốt, thử tối đa **3 phương án dàn cảnh**. Mỗi phương án chỉ cần 3 khung đã dựng: mở đầu, đoạn giải thích chính và cao trào. Các phương án nên khác về ý tưởng hình, bố cục hoặc cách hành động diễn ra; chỉ đổi màu hay kích thước thường chưa đủ.

- So ở kích thước xem trên điện thoại, có phụ đề và vùng an toàn như bản cuối.
- Chọn theo độ rõ ý, điểm nhìn, cân bằng hình, phong cách và tiềm năng chuyển động; ghi ngắn lý do chọn.
- Với video đang sửa, phát triển trong phong cách chủ repo đã thích, trừ khi có yêu cầu đổi.
- Chỉ phát triển phương án được chọn thành video hoàn chỉnh. Tận dụng khung duyệt có sẵn khi phù hợp.

## 2. Nhờ một Claude riêng góp ý từ hình đã dựng

Nếu phiên Claude Code có hỗ trợ agent phụ và còn đủ hạn mức, có thể giao **một agent chỉ đọc** làm người góp ý hình ảnh. Cung cấp kịch bản liên quan, phong cách đã chọn, mẫu chủ repo thích, bảng hình thực tế và đoạn chuyển động ngắn khi có. Đánh giá từ hình đã mở xem; kết quả kiểm tra mã chỉ bổ trợ cho việc tìm lỗi.

Đề nghị người góp ý chọn **tối đa 3 cảnh yếu nhất**, không buộc phải tìm đủ 3 nếu không có vấn đề rõ. Với mỗi cảnh, ghi:

- Mã cảnh/thời điểm và bằng chứng đã xem.
- Vấn đề nhìn thấy: ý chưa rõ, bố cục lệch, hành động khó hiểu, chuyển động gượng, nhịp hụt hoặc chỗ nối chưa sạch.
- Một sửa đổi cụ thể và kết quả mong đợi trên hình.

Ví dụ: “Trước khi điện thoại thu nhỏ xong, lồng đã đi qua nó; cho lồng rơi sau khi điện thoại sang bên để tách hai hành động.” Góp ý kiểu “cinematic hơn” hoặc “thêm chi tiết cho đẹp” chưa đủ cụ thể.

Agent này chỉ tư vấn. Người dựng quyết định dựa trên hình, yêu cầu của chủ repo và so sánh các phiên bản. Nếu agent phụ không khả dụng, có thể thực hiện một lượt xem riêng sau khi dựng; ghi đúng cách đã làm. Lượt góp ý này không thay thế kiểm tra bắt buộc của repo và không tự phê duyệt sản xuất.

## 3. Trau chuốt có chọn lọc, luôn giữ bản tốt nhất

Có thể dành tối đa **2 lượt trau chuốt** cho những cảnh yếu nhất đã xác định. Tập trung vào cách chuẩn bị hành động → hành động chính → phản ứng, nhịp nghỉ, biểu cảm khi có nhân vật, quan hệ giữa các vật và lý do chuyển cảnh.

- Mỗi lượt nhắm một vài sửa đổi có thể nhìn thấy. So với bản trước ở cùng thời điểm, kích thước, phụ đề và giọng đọc.
- Với chuyển động khó, dựng một đoạn **3–5 giây** quanh hành động bằng composition thực tế, có đoạn giọng đọc tương ứng khi có sẵn. Bảng hình giúp xem bố cục; clip ngắn giúp xem nhịp và độ tự nhiên.
- Dùng lại giọng, căn từ và bằng chứng còn hợp lệ. Chỉ dựng lại phần cần xem; giữ quy trình tái sử dụng ảnh duyệt hiện có.
- Giữ phiên bản tốt hơn sau mỗi lần so sánh, kể cả khi đó là bản cũ. Không bắt buộc sửa cho đủ số lượt.
- Các lượt trau chuốt nằm **trong giới hạn tối đa 3 vòng review/fix của AGENT_NIGHTLY.md §3**, không cộng thêm thành 5 vòng. Nếu ngân sách vòng đã hết, giữ tiến độ và tuân thủ cách bàn giao/dừng hiện có.
- Sau bất kỳ sửa đổi hoặc khôi phục phiên bản nào, hoàn tất lại phần kiểm tra bị mất hiệu lực theo chữ ký nguồn và bằng chứng hiện tại. Chọn bản cũ không khôi phục tự động các dấu duyệt cũ.

Có thể ghi ngắn phương án đã thử, bằng chứng đã xem và bản được giữ trong `jobs/<slug>/quality_notes.md` để lượt chạy sau tiếp tục được. File này là ghi chú tùy chọn, không phải điều kiện mới của pipeline.

## 4. Cân nhắc mức suy nghĩ cao hơn khi môi trường hỗ trợ

Claude Code có mức effort `high` / `xhigh` trên các model hỗ trợ. Có thể cân nhắc mức cao hơn cho việc chọn ý tưởng hình hoặc giải chuyển động khó; mức phù hợp phụ thuộc model và phiên đang chạy. Kiểm tra model, effort thực tế, khả năng của môi trường và quyền cấu hình trước khi đề xuất điều chỉnh. Tài liệu này chỉ lưu gợi ý, không đặt hoặc thay đổi cấu hình tác vụ.

Agent phụ cũng dùng chung hạn mức của phiên/tài khoản. Chưa có số đo mức tăng hạn mức hoặc chất lượng cho quy trình đề xuất này. Nên thử trên một video trước rồi đánh giá theo gu của chủ repo.

Tài liệu chính thức tham khảo:

- [Claude Code: model configuration và effort](https://code.claude.com/docs/en/model-config)
- [Claude Code: custom subagents](https://code.claude.com/docs/en/sub-agents)

## Phạm vi áp dụng

Đây là phần bổ sung tùy chọn cho hướng dẫn thiết kế. Thứ tự ưu tiên ghi chú chủ repo → style bible → brief vẫn áp dụng. Không thêm vòng duyệt của người dùng, không yêu cầu một bản nháp toàn video khác, không áp một kiểu nhân vật cho mọi video. Các kiểm tra bắt buộc, định dạng đầu ra và quy trình sản xuất hiện có vẫn được thực hiện như trước.

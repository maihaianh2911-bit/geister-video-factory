# geister-video-factory

Dây chuyền video 2D tiếng Đức (1080×1920, 30 FPS) dựng bằng Remotion và chạy trên GitHub Actions.

## Hiện có (giai đoạn 1)
- `src/videos/geister/scene.js` — engine + toàn bộ cảnh của video "Gibt es Geister wirklich?" (88 s), mỗi lớp là hàm thuần của thời gian.
- `src/SvgVideo.tsx` — bọc engine vào Remotion (`useCurrentFrame`), phụ đề, audio tùy chọn.
- `.github/workflows/render.yml` — dựng MP4 trên Actions, kiểm tra bằng `scripts/qa.sh`, tải kết quả ở mục Artifacts của lần chạy.

## Chạy dựng
GitHub → tab **Actions** → **Render video** → **Run workflow**.

## Sắp làm
2. Voice + căn từng từ + phụ đề theo cụm + SFX
3. Issue → kịch bản Đức/Việt → duyệt
4. Batch qua đêm → dựng → QA → đính kèm vào issue

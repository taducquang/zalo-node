# Zalo Poll Node

Node Zalo Poll cho phép bạn quản lý bình chọn (poll) trong các nhóm Zalo.

## Các Thao Tác

### Tạo Bình Chọn (createPoll)
Tạo một bình chọn mới trong nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Group ID** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Question** | Câu hỏi bình chọn | |
| **Options** | Các lựa chọn (danh sách hoặc text phân cách bằng dấu phẩy) | |
| **Expired Time** | Thời gian hết hạn (tùy chọn) | |
| **Pin Act** | Ghim bình chọn lên đầu nhóm | |
| **Allow Multi Choices** | Cho phép chọn nhiều lựa chọn | |
| **Allow Add New Option** | Cho phép thêm lựa chọn mới | |
| **Hide Vote Preview** | Ẩn kết quả trước khi kết thúc | |
| **Is Anonymous** | Bình chọn ẩn danh | |

### Lấy Thông Tin Bình Chọn (getPoll)
Lấy thông tin chi tiết của một bình chọn.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Poll ID** | ID của bình chọn | |

### Khóa Bình Chọn (lockPoll)
Khóa (đóng) một bình chọn.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Poll ID** | ID của bình chọn cần khóa | |

## Ví Dụ Sử Dụng

### Tạo bình chọn từ trigger nhóm
```
Group ID: {{ $json["data"]["idTo"] }}
Question: Bạn thích ăn gì?
Options: Phở, Bún, Cơm
Allow Multi Choices: true
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi Group ID không hợp lệ
- Lỗi Poll ID không hợp lệ
- Lỗi quyền truy cập nhóm
- Lỗi kết nối mạng

# Zalo Send Message Node

Node Zalo Send Message cho phép bạn gửi tin nhắn đến người dùng hoặc nhóm trên Zalo.

## Tham Số

### Thread ID
ID của người nhận hoặc nhóm.

### Type
Loại tin nhắn:
- `User` (0): Gửi đến người dùng
- `Group` (1): Gửi đến nhóm

### Message
Nội dung tin nhắn cần gửi.

### Urgency
Mức độ khẩn cấp:
- `Default` (0): Mặc định
- `Important` (1): Quan trọng
- `Urgent` (2): Khẩn cấp

### Quote Message
Trích dẫn tin nhắn:
- `Message ID`: ID của tin nhắn cần trích dẫn
- `Sender ID`: ID của người gửi tin nhắn trích dẫn
- `Content`: Nội dung tin nhắn trích dẫn

### Mentions
Mention người dùng trong tin nhắn:
- `User ID`: ID của người dùng được mention
- `Position`: Vị trí mention trong tin nhắn
- `Length`: Độ dài của mention

### Attachments
Đính kèm file hoặc ảnh:
- `Image URL/File URL`: URL công khai của ảnh hoặc file
- Hỗ trợ nhiều URL phân cách bằng dấu phẩy

### Styles JSON *(MỚI)*
Định dạng tin nhắn bằng JSON:
```json
[
  {"start": 0, "len": 5, "st": "bold"},
  {"start": 6, "len": 3, "st": "italic"}
]
```

## Ví Dụ Sử Dụng

### Gửi tin nhắn văn bản
```
Thread ID: 123456789
Type: User
Message: Xin chào!
```

### Gửi tin nhắn với đính kèm
```
Thread ID: 123456789
Type: Group
Message: Đây là file báo cáo
Attachments: https://example.com/file1.pdf, https://example.com/file2.pdf
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi thread ID không hợp lệ
- Lỗi kết nối mạng
- Lỗi file đính kèm không hợp lệ

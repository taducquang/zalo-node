# Zalo Send Message Node

Node Zalo Send Message cho phép bạn gửi tin nhắn đến người dùng hoặc nhóm trên Zalo.

## Tham Số

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Thread ID** | ID của người nhận hoặc nhóm | `{{ $json["data"]["threadId"] }}` |
| **Type** | Loại tin nhắn: `0` = User, `1` = Group | `{{ $json["data"]["type"] }}` |
| **Message** | Nội dung tin nhắn cần gửi | |
| **Urgency** | Mức độ khẩn cấp: `0` = Default, `1` = Important, `2` = Urgent | |

### Quote Message
Trích dẫn tin nhắn:

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Message ID** | ID của tin nhắn cần trích dẫn | `{{ $json["data"]["data"]["msgId"] }}` |
| **Sender ID** | ID của người gửi tin nhắn trích dẫn | `{{ $json["data"]["data"]["uidFrom"] }}` |
| **Content** | Nội dung tin nhắn trích dẫn | `{{ $json["data"]["data"]["content"] }}` |

### Mentions
Mention người dùng trong tin nhắn:
- `User ID`: ID của người dùng được mention
- `Position`: Vị trí mention trong tin nhắn
- `Length`: Độ dài của mention

### Attachments
Đính kèm file hoặc ảnh:
- `Image URL/File URL`: URL công khai của ảnh hoặc file
- Hỗ trợ nhiều URL phân cách bằng dấu phẩy

### Styles JSON
Định dạng tin nhắn bằng JSON:
```json
[
  {"start": 0, "len": 5, "st": "bold"},
  {"start": 6, "len": 3, "st": "italic"}
]
```

## Ví Dụ Sử Dụng

### Gửi tin nhắn tự động từ trigger

```
Thread ID: {{ $json["data"]["threadId"] }}
Type: {{ $json["data"]["type"] }}
Message: Xin chào! Cảm ơn bạn đã nhắn tin.
```

### Gửi tin nhắn với đính kèm
```
Thread ID: {{ $json["data"]["threadId"] }}
Type: {{ $json["data"]["type"] }}
Message: Đây là file báo cáo
Attachments: https://example.com/file1.pdf, https://example.com/file2.pdf
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi thread ID không hợp lệ
- Lỗi kết nối mạng
- Lỗi file đính kèm không hợp lệ

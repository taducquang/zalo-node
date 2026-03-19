# Zalo Send Typing Event Node

## Mô tả

Node **Zalo Send Typing Event** cho phép gửi sự kiện "đang nhập" (typing indicator) tới một cuộc trò chuyện Zalo. Khi sự kiện được gửi, người nhận sẽ thấy trạng thái "đang nhập..." — hữu ích khi bạn muốn báo hiệu rằng hệ thống đang xử lý tin nhắn trước khi trả lời.

## Cấu hình

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Thread ID** | ID của cuộc trò chuyện (user ID hoặc group ID) | `{{ $json["data"]["threadId"] }}` |
| **Thread Type** | Loại cuộc trò chuyện: `0` = User, `1` = Group | `{{ $json["data"]["type"] }}` |

## Ví dụ sử dụng

### Gửi typing trước khi xử lý tin nhắn

Kết hợp với **Zalo Message Trigger** để hiển thị trạng thái "đang nhập" ngay khi nhận tin nhắn, trước khi xử lý và trả lời:

```
[Zalo Message Trigger] → [Zalo Send Typing Event] → [Xử lý logic] → [Zalo Send Message]
```

1. **Zalo Message Trigger** nhận tin nhắn từ Zalo
2. **Zalo Send Typing Event** gửi trạng thái "đang nhập..." cho người gửi
3. Xử lý logic (gọi AI, truy vấn database, v.v.)
4. **Zalo Send Message** gửi tin nhắn phản hồi

### Cấu hình tự động từ trigger

Sử dụng expression để lấy giá trị tự động từ trigger:

- **Thread ID**: `{{ $json["data"]["threadId"] }}`
- **Thread Type**: `{{ $json["data"]["type"] }}`

## Kết quả trả về

Node giữ nguyên toàn bộ dữ liệu đầu vào (từ trigger hoặc node trước đó) và thêm field `typingEvent`:

```json
{
  "data": {
    "uidFrom": "1234567890",
    "idTo": "1234567890",
    "msgId": "...",
    "content": "Xin chào"
  },
  "typingEvent": {
    "success": true,
    "threadId": "1234567890",
    "threadType": "User"
  }
}
```

Dữ liệu gốc từ trigger được giữ nguyên, nên các node phía sau (ví dụ **Zalo Send Message**) vẫn truy cập được `{{ $json["data"]["data"]["uidFrom"] }}`, `{{ $json["data"]["data"]["content"] }}`, v.v.

## Lưu ý

- Typing indicator tự động hết hiệu lực sau vài giây nếu không gửi tin nhắn
- Node **Zalo Send Message** đã tích hợp sẵn typing event trước khi gửi tin nhắn. Node này hữu ích khi bạn muốn hiển thị typing **ngay lập tức** khi nhận trigger, trước khi bắt đầu xử lý logic

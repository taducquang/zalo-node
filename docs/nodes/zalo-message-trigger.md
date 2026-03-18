# Zalo Message Trigger Node

Node Zalo Message Trigger cho phép bạn lắng nghe và xử lý các sự kiện tin nhắn trên Zalo theo thời gian thực.

## Cấu Hình

### Event Types
Chọn các loại sự kiện cần lắng nghe:
- **User Messages**: Tin nhắn từ người dùng
- **Group Messages**: Tin nhắn từ nhóm
- **Undo**: Sự kiện thu hồi tin nhắn *(MỚI)*
- **Typing**: Sự kiện đang gõ *(MỚI)*
- **Reaction**: Sự kiện biểu cảm *(MỚI)*
- **Group Event**: Sự kiện nhóm (thêm/xóa thành viên, đổi tên...) *(MỚI)*

### Self Listen
Cho phép lắng nghe tin nhắn của chính mình tự gửi.

## Tính Năng

### Tự động kết nối lại
Node tự động kết nối lại khi mất kết nối WebSocket (retryOnClose), đảm bảo hoạt động liên tục trong môi trường sản xuất.

### Proxy Support
Hỗ trợ proxy, cấu hình trong Zalo credentials.

## Dữ Liệu Trả Về

Mỗi sự kiện sẽ trả về object chứa:
- `eventName`: Tên sự kiện (message, undo, typing, reaction, group_event)
- Dữ liệu cụ thể của từng sự kiện

### Ví dụ dữ liệu tin nhắn
```json
{
  "eventName": "message",
  "data": {
    "threadId": "123456789",
    "type": 0,
    "content": "Xin chào!",
    "senderId": "987654321"
  }
}
```

### Ví dụ dữ liệu undo
```json
{
  "eventName": "undo",
  "data": {
    "threadId": "123456789",
    "msgId": "abc123"
  }
}
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi kết nối WebSocket
- Lỗi xác thực credentials
- Tự động kết nối lại khi mất kết nối

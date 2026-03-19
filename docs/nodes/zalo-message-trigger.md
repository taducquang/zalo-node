# Zalo Message Trigger Node

Node Zalo Message Trigger cho phép bạn lắng nghe và xử lý các sự kiện tin nhắn trên Zalo theo thời gian thực.

## Cấu Hình

| Trường | Mô tả |
|--------|-------|
| **Event Types** | Chọn các loại sự kiện cần lắng nghe (xem bên dưới) |
| **Self Listen** | Cho phép lắng nghe tin nhắn của chính mình tự gửi |
| **Only When Mentioned** | Chỉ nhận tin nhắn nhóm khi tài khoản Zalo được mention (@). Chỉ áp dụng cho Group Messages |

### Event Types
- **User Messages**: Tin nhắn từ người dùng
- **Group Messages**: Tin nhắn từ nhóm
- **Undo**: Sự kiện thu hồi tin nhắn
- **Typing**: Sự kiện đang gõ
- **Reaction**: Sự kiện biểu cảm
- **Group Event**: Sự kiện nhóm (thêm/xóa thành viên, đổi tên...)

## Tính Năng

### Lọc Mention (@)
Khi bật **Only When Mentioned**, trigger chỉ kích hoạt khi tin nhắn nhóm có mention đến tài khoản Zalo đang đăng nhập. Tính năng này hữu ích khi bạn muốn bot chỉ phản hồi khi được gọi tên.

### Tự động kết nối lại
Node tự động kết nối lại khi mất kết nối WebSocket (retryOnClose), đảm bảo hoạt động liên tục trong môi trường sản xuất.

### Proxy Support
Hỗ trợ proxy, cấu hình trong Zalo credentials.

## Dữ Liệu Trả Về

Mỗi sự kiện sẽ trả về object chứa:
- `eventName`: Tên sự kiện (message, undo, typing, reaction, group_event)
- `data`: Dữ liệu cụ thể của từng sự kiện

### Cấu trúc dữ liệu tin nhắn

| Trường | Đường dẫn | Mô tả |
|--------|-----------|-------|
| Thread ID | `data.threadId` | ID cuộc trò chuyện |
| Thread Type | `data.type` | `0` = User, `1` = Group |
| Sender ID | `data.data.uidFrom` | ID người gửi |
| Group/User ID | `data.data.idTo` | ID nhóm hoặc người nhận |
| Content | `data.data.content` | Nội dung tin nhắn |
| Message ID | `data.data.msgId` | ID tin nhắn |
| Client Message ID | `data.data.cliMsgId` | Client message ID |
| Is Self | `data.isSelf` | Tin nhắn từ chính mình |

### Ví dụ output tin nhắn nhóm
```json
{
  "eventName": "message",
  "data": {
    "type": 1,
    "data": {
      "msgId": "7638201645756",
      "cliMsgId": "1773952255324",
      "uidFrom": "8579341204121467292",
      "idTo": "1147193974930154872",
      "dName": "Memochou",
      "content": "hi",
      "ts": "1773952255383"
    },
    "threadId": "1147193974930154872",
    "isSelf": false
  }
}
```

### Mapping sang các node khác

Khi kết nối trigger với các node xử lý (Send Message, Send Typing Event, v.v.), sử dụng các expression sau:

| Mục đích | Expression |
|----------|-----------|
| Thread ID | `{{ $json["data"]["threadId"] }}` |
| Thread Type | `{{ $json["data"]["type"] }}` |
| Sender User ID | `{{ $json["data"]["data"]["uidFrom"] }}` |
| Group/Recipient ID | `{{ $json["data"]["data"]["idTo"] }}` |
| Message Content | `{{ $json["data"]["data"]["content"] }}` |
| Message ID | `{{ $json["data"]["data"]["msgId"] }}` |

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi kết nối WebSocket
- Lỗi xác thực credentials
- Tự động kết nối lại khi mất kết nối

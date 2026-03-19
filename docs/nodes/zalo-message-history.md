# Zalo Message History Node

Node Zalo Message History cho phép lấy lịch sử tin nhắn của cuộc trò chuyện Zalo — cả nhóm lẫn cá nhân.

## Cấu Hình

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Thread Type** | `Group` hoặc `User` | |
| **Thread ID** | ID cuộc trò chuyện (group ID hoặc user ID) | `{{ $json["data"]["threadId"] }}` |
| **Limit** | Số tin nhắn gần nhất cần lấy. Với Group, đặt `0` để lấy tất cả | |
| **Timeout** | Thời gian chờ tối đa (chỉ áp dụng cho User, mặc định 15 giây) | |

### Cách hoạt động

- **Group**: Sử dụng REST API `getGroupChatHistory` — nhanh, đáng tin cậy, hỗ trợ limit và fetch all
- **User**: Sử dụng WebSocket `requestOldMessages` — lấy tin nhắn gần nhất từ cuộc trò chuyện cá nhân, lọc theo threadId

## Dữ Liệu Trả Về

Node giữ nguyên dữ liệu đầu vào và thêm field `messageHistory`:

```json
{
  "data": { ... },
  "messageHistory": {
    "threadId": "8579341204121467292",
    "threadType": "user",
    "totalMessages": 10,
    "messages": [
      {
        "type": 0,
        "data": {
          "msgId": "...",
          "uidFrom": "...",
          "content": "Xin chào",
          "ts": "1773952255383"
        },
        "threadId": "...",
        "isSelf": false
      }
    ]
  }
}
```

## Ví Dụ Sử Dụng

### Bot phân tích ảnh từ người dùng

Khi người dùng gửi ảnh rồi nhắn "phân tích ảnh này":

```
[Zalo Message Trigger]
  → [Zalo Message History (User, Limit: 5)]
  → [Code Node: tìm tin nhắn có ảnh gần nhất]
  → [AI phân tích ảnh]
  → [Zalo Send Message]
```

1. **Zalo Message Trigger** nhận tin nhắn "phân tích ảnh này"
2. **Zalo Message History** lấy 5 tin nhắn gần nhất từ cuộc trò chuyện
3. **Code Node** lọc tin nhắn có chứa ảnh (content type image)
4. **AI** phân tích ảnh
5. **Zalo Send Message** gửi kết quả

### Bot trả lời dựa trên ngữ cảnh nhóm

Khi có người mention bot và hỏi về nội dung cuộc trò chuyện:

```
[Zalo Message Trigger (Only When Mentioned)]
  → [Zalo Message History (Group, Limit: 20)]
  → [AI tóm tắt nội dung]
  → [Zalo Send Message]
```

### Lấy tất cả tin nhắn nhóm

Đặt **Thread Type = Group** và **Limit = 0** để lấy toàn bộ tin nhắn có sẵn.

> **Lưu ý:** Fetch all chỉ hỗ trợ cho Group. Với User, hãy đặt limit phù hợp.

## Xử Lý Lỗi

- Lỗi Thread ID không hợp lệ
- Timeout khi lấy tin nhắn User (tăng timeout nếu cần)
- Lỗi quyền truy cập nhóm
- Lỗi kết nối mạng

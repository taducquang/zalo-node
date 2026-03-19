# Zalo Message History Node

Node Zalo Message History cho phép lấy lịch sử tin nhắn của nhóm Zalo. Hữu ích khi cần tra cứu nội dung cuộc trò chuyện, ví dụ khi bot cần ngữ cảnh để trả lời câu hỏi.

> **Lưu ý:** Hiện tại zca-js chỉ hỗ trợ lấy lịch sử tin nhắn nhóm (`getGroupChatHistory`). Lịch sử tin nhắn cá nhân chưa được API hỗ trợ.

## Cấu Hình

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Group ID** | ID của nhóm cần lấy lịch sử | `{{ $json["data"]["data"]["idTo"] }}` |
| **Limit** | Số lượng tin nhắn gần nhất cần lấy. Đặt `0` để lấy tất cả | |

## Dữ Liệu Trả Về

Node giữ nguyên dữ liệu đầu vào và thêm field `messageHistory`:

```json
{
  "data": { ... },
  "messageHistory": {
    "groupId": "1147193974930154872",
    "totalMessages": 50,
    "messages": [
      {
        "type": 1,
        "data": {
          "msgId": "...",
          "uidFrom": "...",
          "content": "Xin chào",
          "ts": "1773952255383"
        },
        "threadId": "...",
        "isSelf": false
      }
    ],
    "hasMore": true
  }
}
```

## Ví Dụ Sử Dụng

### Bot trả lời dựa trên ngữ cảnh nhóm

Khi có người mention bot và hỏi về nội dung cuộc trò chuyện:

```
[Zalo Message Trigger (Only When Mentioned)]
  → [Zalo Message History (Limit: 20)]
  → [AI/Logic xử lý nội dung]
  → [Zalo Send Message]
```

1. **Zalo Message Trigger** nhận tin nhắn mention bot
2. **Zalo Message History** lấy 20 tin nhắn gần nhất trong nhóm
3. Xử lý nội dung (gửi cho AI tóm tắt, phân tích, v.v.)
4. **Zalo Send Message** gửi phản hồi

### Lấy tất cả tin nhắn nhóm

Đặt **Limit = 0** để lấy toàn bộ tin nhắn có sẵn. Lưu ý có thể mất nhiều thời gian với nhóm có nhiều tin nhắn.

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi Group ID không hợp lệ
- Lỗi quyền truy cập nhóm
- Lỗi kết nối mạng

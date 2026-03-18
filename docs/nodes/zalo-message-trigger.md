# Zalo Message Trigger Node

Node Zalo Message Trigger cho phep ban lang nghe va xu ly cac su kien tin nhan tren Zalo theo thoi gian thuc.

## Cau Hinh

### Event Types
Chon cac loai su kien can lang nghe:
- **User Messages**: Tin nhan tu nguoi dung
- **Group Messages**: Tin nhan tu nhom
- **Undo**: Su kien thu hoi tin nhan *(MỚI)*
- **Typing**: Su kien dang go *(MỚI)*
- **Reaction**: Su kien bieu cam *(MỚI)*
- **Group Event**: Su kien nhom (them/xoa thanh vien, doi ten...) *(MỚI)*

### Self Listen
Cho phep lang nghe tin nhan cua chinh minh tu gui.

## Tinh Nang

### Tu dong ket noi lai
Node tu dong ket noi lai khi mat ket noi WebSocket (retryOnClose), dam bao hoat dong lien tuc trong moi truong san xuat.

### Proxy Support
Ho tro proxy qua HttpsProxyAgent, cau hinh trong Zalo credentials.

## Du Lieu Tra Ve

Moi su kien se tra ve object chua:
- `eventName`: Ten su kien (message, undo, typing, reaction, group_event)
- Du lieu cu the cua tung su kien

### Vi du du lieu tin nhan
```json
{
  "eventName": "message",
  "data": {
    "threadId": "123456789",
    "type": 0,
    "content": "Xin chao!",
    "senderId": "987654321"
  }
}
```

### Vi du du lieu undo
```json
{
  "eventName": "undo",
  "data": {
    "threadId": "123456789",
    "msgId": "abc123"
  }
}
```

## Xu Ly Loi

Node se xu ly cac loi pho bien sau:
- Loi ket noi WebSocket
- Loi xac thuc credentials
- Tu dong ket noi lai khi mat ket noi

# Zalo Friend Trigger Node

Node Zalo Friend Trigger cho phép bạn lắng nghe các sự kiện kết bạn trên Zalo theo thời gian thực.

## Cấu Hình

### Event Types
Chọn các loại sự kiện cần lắng nghe:
- **Friend Requests**: Yêu cầu kết bạn mới

### Self Listen
Cho phép lắng nghe sự kiện của chính mình.

## Tính Năng

### Tự động kết nối lại
Node tự động kết nối lại khi mất kết nối WebSocket (retryOnClose), đảm bảo hoạt động liên tục trong môi trường sản xuất.

### Proxy Support
Hỗ trợ proxy, cấu hình trong Zalo credentials.

## Dữ Liệu Trả Về

Mỗi sự kiện sẽ trả về object chứa thông tin về yêu cầu kết bạn:

### Ví dụ dữ liệu
```json
{
  "data": {
    "fromUid": "123456789",
    "toUid": "987654321",
    "type": 1
  }
}
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi kết nối WebSocket
- Lỗi xác thực credentials
- Tự động kết nối lại khi mất kết nối

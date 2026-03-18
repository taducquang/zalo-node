# Zalo Tag Node

Node Zalo Tag cho phép bạn quản lý thẻ (tag/label) trong Zalo.

## Các Thao Tác

### Danh Sách Thẻ (list)
Liệt kê tất cả các thẻ đã tạo.

Không cần tham số bổ sung.

## Dữ Liệu Trả Về

```json
{
  "success": true,
  "labels": [
    {
      "id": "123",
      "name": "Khách hàng",
      "color": "#FF0000"
    }
  ]
}
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi xác thực credentials
- Lỗi kết nối mạng

# Zalo Sticker Node *(MỚI)*

Node Zalo Sticker cho phép bạn tìm kiếm và quản lý sticker trên Zalo.

## Các Thao Tác

### Tìm Kiếm Sticker (searchSticker)
Tìm kiếm sticker theo từ khóa.

**Tham số:**
- `Keyword`: Từ khóa tìm kiếm
- `Limit`: Số lượng kết quả tối đa (mặc định: 20)

### Lấy Chi Tiết Danh Mục Sticker (getStickerCategoryDetail)
Lấy thông tin chi tiết của một danh mục sticker.

**Tham số:**
- `Category ID`: ID của danh mục sticker

## Ví Dụ Sử Dụng

### Tìm kiếm sticker
```
Keyword: xin chào
Limit: 10
```

### Lấy chi tiết danh mục
```
Category ID: 123
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi từ khóa không hợp lệ
- Lỗi Category ID không hợp lệ
- Lỗi kết nối mạng

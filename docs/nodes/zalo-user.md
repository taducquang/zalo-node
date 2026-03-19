# Zalo User Node

Node Zalo User cho phép bạn tương tác với API người dùng của Zalo, giúp quản lý thông tin người dùng, kết bạn và các cài đặt tài khoản.

## Các Thao Tác

### Chấp nhận lời mời kết bạn
Chấp nhận lời mời kết bạn từ một người dùng khác.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của người dùng cần chấp nhận | `{{ $json["data"]["uidFrom"] }}` |

### Gửi lời mời kết bạn
Gửi lời mời kết bạn đến một người dùng khác.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của người dùng | `{{ $json["data"]["uidFrom"] }}` |
| **Message** | Tin nhắn kèm theo lời mời kết bạn | |

### Chặn người dùng
Chặn một người dùng khác.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của người dùng cần chặn | `{{ $json["data"]["uidFrom"] }}` |

### Bỏ chặn người dùng
Bỏ chặn một người dùng đã bị chặn trước đó.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của người dùng cần bỏ chặn | `{{ $json["data"]["uidFrom"] }}` |

### Thay đổi cài đặt tài khoản
Cập nhật thông tin và cài đặt của tài khoản.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Name** | Tên hiển thị mới | |
| **Date of Birth** | Ngày sinh (YYYY-MM-DD) | |
| **Gender** | Giới tính: `1` = Nam, `2` = Nữ, `3` = Khác | |

### Lấy thông tin người dùng
Lấy thông tin chi tiết của một người dùng.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của người dùng | `{{ $json["data"]["uidFrom"] }}` |

### Lấy danh sách bạn bè
Lấy danh sách tất cả bạn bè của tài khoản.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Limit** | Số lượng bạn bè tối đa (mặc định: 50) | |

### Tìm kiếm người dùng
Tìm kiếm người dùng theo số điện thoại.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Phone Number** | Số điện thoại cần tìm kiếm | |

### Đổi tên gợi nhớ
Đặt tên gợi nhớ cho bạn bè.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **User ID** | ID của bạn bè | `{{ $json["data"]["uidFrom"] }}` |
| **Alias Name** | Tên gợi nhớ mới | |

### Thu hồi tin nhắn
Thu hồi (undo) một tin nhắn đã gửi.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Thread ID** | ID của cuộc trò chuyện | `{{ $json["data"]["threadId"] }}` |
| **Thread Type** | Loại: `0` = User, `1` = Group | `{{ $json["data"]["isGroup"] ? 1 : 0 }}` |
| **Message ID** | ID của tin nhắn cần thu hồi | `{{ $json["data"]["msgId"] }}` |
| **Client Message ID** | Client message ID | `{{ $json["data"]["cliMsgId"] }}` |

### Tìm kiếm người dùng theo username
Tìm kiếm người dùng bằng username Zalo.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Username** | Username của người dùng cần tìm | |

### Cập nhật tiểu sử
Cập nhật tiểu sử (bio) của tài khoản.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Bio** | Nội dung tiểu sử mới | |

### Lấy danh sách bạn thân
Lấy danh sách bạn thân (close friends).

Không cần tham số.

### Tìm nhiều người dùng theo số điện thoại
Tìm nhiều người dùng cùng lúc bằng danh sách số điện thoại.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Phone Numbers** | Danh sách SĐT, phân cách bằng dấu phẩy | |

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi ID người dùng không hợp lệ
- Lỗi quyền truy cập
- Lỗi định dạng dữ liệu
- Lỗi kết nối mạng

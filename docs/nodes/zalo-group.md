# Zalo Group Node

Node Zalo Group cho phép bạn tương tác với API nhóm của Zalo, giúp quản lý các nhóm và thành viên trong nhóm một cách dễ dàng.

## Các Thao Tác

### Tạo Nhóm
Tạo một nhóm mới trên Zalo.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Tên Nhóm** | Tên của nhóm mới | |
| **Danh Sách ID Thành Viên** | ID thành viên, phân cách bằng dấu phẩy | |

### Lấy Thông Tin Nhóm
Lấy thông tin chi tiết của một nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |

### Thêm Phó Nhóm
Thêm một người dùng làm phó nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **ID Người Dùng** | ID người dùng | `{{ $json["data"]["uidFrom"] }}` |

### Thêm Thành Viên Vào Nhóm
Thêm một hoặc nhiều thành viên vào nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Danh Sách ID Thành Viên** | ID thành viên, phân cách bằng dấu phẩy | |

### Đổi Avatar Nhóm
Thay đổi ảnh đại diện của nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **URL Ảnh** | URL của ảnh đại diện mới | |

### Đổi Tên Nhóm
Thay đổi tên của nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Tên Mới** | Tên mới của nhóm | |

### Lấy Danh Sách Thành Viên
Lấy danh sách các thành viên trong nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Giới Hạn** | Số lượng tối đa (mặc định: 50) | |

### Lấy Tất Cả Nhóm
Lấy danh sách tất cả các nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **Giới Hạn** | Số lượng tối đa (mặc định: 50) | |

### Xóa Thành Viên Khỏi Nhóm
Xóa một hoặc nhiều thành viên khỏi nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **ID Người Dùng** | ID thành viên, phân cách bằng dấu phẩy | `{{ $json["data"]["uidFrom"] }}` |

### Tạo Ghi Chú
Tạo ghi chú trong nhóm (có thể ghim).

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Nội Dung** | Nội dung ghi chú | |
| **Ghim** | Ghim ghi chú hay không | |

### Lấy Lịch Sử Tin Nhắn Nhóm
Lấy lịch sử tin nhắn của nhóm.

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm | `{{ $json["data"]["idTo"] }}` |
| **Số Lượng** | Số tin nhắn cần lấy (mặc định: 50) | |

### Nâng Cấp Nhóm Thành Cộng Đồng
Nâng cấp nhóm thành cộng đồng (community).

| Trường | Mô tả | Gợi ý giá trị n8n |
|--------|-------|-------------------|
| **ID Nhóm** | ID của nhóm cần nâng cấp | `{{ $json["data"]["idTo"] }}` |

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi ID nhóm không hợp lệ
- Lỗi ID người dùng không hợp lệ
- Lỗi quyền truy cập
- Lỗi kết nối mạng

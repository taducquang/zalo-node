# Zalo Login Via QR Code Node

Node Zalo Login Via QR Code cho phép bạn đăng nhập Zalo bằng mã QR và tự động lưu thông tin đăng nhập vào Credentials.

## Cấu Hình

### Credentials
- **n8n Account Credential** (bắt buộc): Credential chứa API Key và URL của n8n, dùng để tự động lưu thông tin đăng nhập Zalo
- **Zalo Credential** (tùy chọn): Credential Zalo đã có sẵn (để trống nếu tạo mới)

### Proxy
URL proxy nếu cần (định dạng: `https://user:pass@host:port`)

## Cách Sử Dụng

1. Kéo node "Zalo Login Via QR Code" vào workflow
2. Chọn **n8n Account Credential** đã tạo
3. Để trống **Zalo Credential** (nếu tạo mới)
4. Click **Test Step** để tạo mã QR
5. Mở Zalo trên điện thoại và quét mã QR
6. Xác nhận đăng nhập trên điện thoại
7. Credential Zalo sẽ được tự động tạo và lưu

## Lưu Ý

- Mã QR có thời gian hiệu lực giới hạn (30 giây)
- Cần có kết nối internet ổn định
- n8n API Key phải có quyền tạo credentials
- URL n8n phải bắt đầu bằng `https://`

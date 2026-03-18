# Zalo Send Message Node

Node Zalo Send Message cho phep ban gui tin nhan den nguoi dung hoac nhom tren Zalo.

## Tham So

### Thread ID
ID cua nguoi nhan hoac nhom.

### Type
Loai tin nhan:
- `User` (0): Gui den nguoi dung
- `Group` (1): Gui den nhom

### Message
Noi dung tin nhan can gui.

### Urgency
Muc do khan cap:
- `Default` (0): Mac dinh
- `Important` (1): Quan trong
- `Urgent` (2): Khan cap

### Quote Message
Trich dan tin nhan:
- `Message ID`: ID cua tin nhan can trich dan
- `Sender ID`: ID cua nguoi gui tin nhan trich dan
- `Content`: Noi dung tin nhan trich dan

### Mentions
Mention nguoi dung trong tin nhan:
- `User ID`: ID cua nguoi dung duoc mention
- `Position`: Vi tri mention trong tin nhan
- `Length`: Do dai cua mention

### Attachments
Dinh kem file hoac anh:
- `Image URL/File URL`: URL cong khai cua anh hoac file
- Ho tro nhieu URL phan cach bang dau phay

### Styles JSON *(MỚI)*
Dinh dang tin nhan bang JSON:
```json
[
  {"start": 0, "len": 5, "st": "bold"},
  {"start": 6, "len": 3, "st": "italic"}
]
```

## Vi Du Su Dung

### Gui tin nhan van ban
```
Thread ID: 123456789
Type: User
Message: Xin chao!
```

### Gui tin nhan voi dinh kem
```
Thread ID: 123456789
Type: Group
Message: Day la file bao cao
Attachments: https://example.com/file1.pdf, https://example.com/file2.pdf
```

## Xu Ly Loi

Node se xu ly cac loi pho bien sau:
- Loi thread ID khong hop le
- Loi ket noi mang
- Loi file dinh kem khong hop le

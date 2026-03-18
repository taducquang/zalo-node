# Zalo Group Node

Node Zalo Group cho phep ban tuong tac voi API nhom cua Zalo, giup quan ly cac nhom va thanh vien trong nhom mot cach de dang.

## Cac Thao Tac

### Tao Nhom
Tao mot nhom moi tren Zalo.

**Tham so:**
- `Ten Nhom`: Ten cua nhom moi
- `Danh Sach ID Thanh Vien`: Danh sach ID cua cac thanh vien ban dau, phan cach bang dau phay

### Lay Thong Tin Nhom
Lay thong tin chi tiet cua mot nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom can lay thong tin

### Them Pho Nhom
Them mot nguoi dung lam pho nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `ID Nguoi Dung`: ID cua nguoi dung can them lam pho nhom

### Them Thanh Vien Vao Nhom
Them mot hoac nhieu thanh vien vao nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `Danh Sach ID Thanh Vien`: Danh sach ID cua cac thanh vien can them, phan cach bang dau phay

### Doi Avatar Nhom
Thay doi anh dai dien cua nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `URL Anh`: URL cua anh dai dien moi

### Doi Ten Nhom
Thay doi ten cua nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `Ten Moi`: Ten moi cua nhom

### Lay Danh Sach Thanh Vien
Lay danh sach cac thanh vien trong nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `Gioi Han`: So luong thanh vien toi da can lay (mac dinh: 50)

### Lay Tat Ca Nhom
Lay danh sach tat ca cac nhom.

### Xoa Thanh Vien Khoi Nhom
Xoa mot hoac nhieu thanh vien khoi nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `ID Nguoi Dung`: Danh sach ID cua cac thanh vien can xoa, phan cach bang dau phay

### Tao Ghi Chu
Tao ghi chu trong nhom (co the ghim).

**Tham so:**
- `ID Nhom`: ID cua nhom
- `Noi Dung`: Noi dung ghi chu
- `Ghim`: Co ghim ghi chu hay khong

### Lay Lich Su Tin Nhan Nhom *(MỚI)*
Lay lich su tin nhan cua nhom.

**Tham so:**
- `ID Nhom`: ID cua nhom
- `So Luong`: So luong tin nhan can lay

### Nang Cap Nhom Thanh Cong Dong *(MỚI)*
Nang cap nhom thanh cong dong (community).

**Tham so:**
- `ID Nhom`: ID cua nhom can nang cap

## Vi Du Su Dung

### Tao Nhom Moi
```typescript
const groupName = "Nhom Cong Viec";
const userIds = "123456789,987654321";
```

### Lay Thong Tin Nhom
```typescript
const groupId = "123456789";
```

### Them Thanh Vien
```typescript
const groupId = "123456789";
const userIds = "111222333,444555666";
```

## Xu Ly Loi

Node se xu ly cac loi pho bien sau:
- Loi ID nhom khong hop le
- Loi ID nguoi dung khong hop le
- Loi quyen truy cap
- Loi ket noi mang

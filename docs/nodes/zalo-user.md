# Zalo User Node

Node Zalo User cho phep ban tuong tac voi API nguoi dung cua Zalo, giup quan ly thong tin nguoi dung, ket ban va cac cai dat tai khoan.

## Cac Thao Tac

### Chap nhan loi moi ket ban
Chap nhan loi moi ket ban tu mot nguoi dung khac.

**Tham so:**
- `User ID`: ID cua nguoi dung can chap nhan loi moi ket ban

### Gui loi moi ket ban
Gui loi moi ket ban den mot nguoi dung khac.

**Tham so:**
- `User ID`: ID cua nguoi dung can gui loi moi ket ban
- `Message`: Tin nhan kem theo loi moi ket ban

### Chan nguoi dung
Chan mot nguoi dung khac.

**Tham so:**
- `User ID`: ID cua nguoi dung can chan

### Bo chan nguoi dung
Bo chan mot nguoi dung da bi chan truoc do.

**Tham so:**
- `User ID`: ID cua nguoi dung can bo chan

### Thay doi cai dat tai khoan
Cap nhat thong tin va cai dat cua tai khoan.

**Tham so:**
- `Name`: Ten hien thi moi
- `Date of Birth`: Ngay sinh (dinh dang YYYY-MM-DD)
- `Gender`: Gioi tinh (1: Nam, 2: Nu, 3: Khac)

### Lay thong tin nguoi dung
Lay thong tin chi tiet cua mot nguoi dung.

**Tham so:**
- `User ID`: ID cua nguoi dung can lay thong tin

### Lay danh sach ban be
Lay danh sach tat ca ban be cua tai khoan.

**Tham so:**
- `Limit`: So luong ban be toi da can lay (mac dinh: 50)

### Tim kiem nguoi dung
Tim kiem nguoi dung theo so dien thoai.

**Tham so:**
- `Phone Number`: So dien thoai can tim kiem

### Doi ten goi nho
Dat ten goi nho cho ban be.

**Tham so:**
- `User ID`: ID cua ban be
- `Alias Name`: Ten goi nho moi

### Thu hoi tin nhan
Thu hoi (undo) mot tin nhan da gui.

**Tham so:**
- `Thread ID`: ID cua cuoc tro chuyen
- `Thread Type`: Loai (User hoac Group)
- `Message ID`: ID cua tin nhan can thu hoi
- `Client Message ID`: Client message ID

### Tim kiem nguoi dung theo username *(MỚI)*
Tim kiem nguoi dung bang username Zalo.

**Tham so:**
- `Username`: Username cua nguoi dung can tim

### Cap nhat tieu su *(MỚI)*
Cap nhat tieu su (bio) cua tai khoan.

**Tham so:**
- `Bio`: Noi dung tieu su moi

### Lay danh sach ban than *(MỚI)*
Lay danh sach ban than (close friends).

Khong can tham so.

### Tim nhieu nguoi dung theo so dien thoai *(MỚI)*
Tim nhieu nguoi dung cung luc bang danh sach so dien thoai.

**Tham so:**
- `Phone Numbers`: Danh sach so dien thoai, phan cach bang dau phay

## Vi Du Su Dung

### Gui loi moi ket ban
```typescript
const userId = "123456789";
const message = "Xin chao! Toi muon ket ban voi ban.";
```

### Thay doi cai dat tai khoan
```typescript
const name = "Nguyen Van A";
const dob = "1990-01-01";
const gender = 1; // 1: Nam
```

### Tim kiem nguoi dung
```typescript
const phoneNumber = "0987654321";
```

## Xu Ly Loi

Node se xu ly cac loi pho bien sau:
- Loi ID nguoi dung khong hop le
- Loi quyen truy cap
- Loi dinh dang du lieu
- Loi ket noi mang

## Best Practices

1. **Quan ly ket ban:**
   - Gui tin nhan ca nhan khi ket ban
   - Khong gui qua nhieu loi moi ket ban trong thoi gian ngan

2. **Cap nhat thong tin:**
   - Cap nhat thong tin chinh xac va day du

3. **Tim kiem nguoi dung:**
   - Su dung so dien thoai chinh xac
   - Gioi han so luong ket qua tim kiem phu hop

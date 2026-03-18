# Zalo Poll Node

Node Zalo Poll cho phep ban quan ly binh chon (poll) trong cac nhom Zalo.

## Cac Thao Tac

### Tao Binh Chon (createPoll)
Tao mot binh chon moi trong nhom.

**Tham so:**
- `Group ID`: ID cua nhom
- `Question`: Cau hoi binh chon
- `Options`: Cac lua chon (nhap bang danh sach hoac text phan cach bang dau phay)
- `Expired Time`: Thoi gian het han (tuy chon)
- `Pin Act`: Ghim binh chon len dau nhom
- `Allow Multi Choices`: Cho phep chon nhieu lua chon
- `Allow Add New Option`: Cho phep them lua chon moi
- `Hide Vote Preview`: An ket qua truoc khi ket thuc
- `Is Anonymous`: Binh chon an danh

### Lay Thong Tin Binh Chon (getPoll)
Lay thong tin chi tiet cua mot binh chon.

**Tham so:**
- `Poll ID`: ID cua binh chon can lay thong tin

### Khoa Binh Chon (lockPoll)
Khoa (dong) mot binh chon.

**Tham so:**
- `Poll ID`: ID cua binh chon can khoa

## Vi Du Su Dung

### Tao binh chon moi
```
Group ID: 123456789
Question: Ban thich an gi?
Options: Pho, Bun, Com
Allow Multi Choices: true
```

## Xu Ly Loi

Node se xu ly cac loi pho bien sau:
- Loi Group ID khong hop le
- Loi Poll ID khong hop le
- Loi quyen truy cap nhom
- Loi ket noi mang

# Cai dat

# Cai dat Zalo User Nodes

## Gioi thieu ve Community Nodes

Community Nodes la cac nodes duoc phat trien boi cong dong n8n. Zalo Nodes la mot trong nhung community nodes nay, cho phep ban tich hop va tu dong hoa cac tac vu voi Zalo.

### Luu y quan trong

- Zalo User Nodes chi kha dung tren cac phien ban n8n tu host
- Khong co san tren n8n cloud
- Yeu cau ban phai tu host n8n
- Phien ban moi nhat hien tai: 0.6.0

## Cai dat qua GUI

### Yeu cau
- n8n phien ban 0.200.0 tro len
- Quyen quan tri tren n8n

### Cac buoc cai dat

1. Mo n8n va dang nhap vao tai khoan cua ban
2. Dieu huong den phan "Settings" (Cai dat)
3. Chon "Community Nodes" (Nodes cong dong)
4. Nhap ten package: `n8n-nodes-zalo-tools`
5. Click "Install" (Cai dat)
6. Cho qua trinh cai dat hoan tat
7. Khoi dong lai n8n de ap dung cac thay doi

## Cai dat thu cong

### Yeu cau
- Node.js phien ban 18 tro len
- npm hoac pnpm
- Quyen truy cap vao thu muc cai dat n8n

### Cac buoc cai dat

1. Truy cap vao thu muc cai dat n8n cua ban
2. Chay lenh sau de cai dat Zalo Nodes:

```bash
npm install https://github.com/taducquang/zalo-node
```

3. Khoi dong lai n8n de ap dung cac thay doi

## Xac minh cai dat

Sau khi cai dat thanh cong, ban co the xac minh bang cach:

1. Mo n8n
2. Tao mot workflow moi
3. Tim kiem "Zalo" trong danh sach nodes
4. Ban se thay cac nodes sau:
- Zalo Login Via QR Code
- Zalo Message Trigger
- Zalo Friend Trigger
- Zalo Send Message
- Zalo Group
- Zalo User
- Zalo Poll
- Zalo Tag
- Zalo Sticker

## Xu ly su co

### Kiem tra phien ban

1. Kiem tra phien ban n8n:
```bash
n8n -v
```

2. Kiem tra phien ban Node.js:
```bash
node -v
```

3. Kiem tra phien ban npm:
```bash
npm -v
```

### Xoa cache npm

Neu gap van de voi cache, hay thu:

```bash
npm cache clean --force
```

### Khoi dong lai Docker

Neu ban dang chay n8n trong Docker:

```bash
docker-compose restart
```

### Cai dat lai

Neu van gap van de, hay thu cai dat lai:

```bash
npm uninstall n8n-nodes-zalo-tools
npm install https://github.com/taducquang/zalo-node
```

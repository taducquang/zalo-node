![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-zalo-tools

Node dành riêng cho n8n này được thiết kế hoạt động hoàn toàn bên trong instance n8n của bạn. Không cần sử dụng API của bên thứ ba hay phụ thuộc ngoại vi nào — chỉ có sự tự động hóa quy trình thuần túy, đảm bảo dữ liệu của bạn luôn được giữ riêng tư và an toàn.

Node này mô phỏng trình duyệt để tương tác trực tiếp với Zalo Web, cho phép tự động hóa liền mạch ngay trong n8n. Đây là dự án mã nguồn mở, mở rộng cơ hội cho cộng đồng cùng đóng góp ý kiến và phát triển thêm các tính năng mới, nhằm xây dựng hệ thống tự động hóa Zalo tiên tiến, hiệu quả và an toàn hơn.

## Hướng dẫn cài đặt node này:
**Cài đặt thủ công**

Bạn cũng có thể cài đặt node này theo cách thủ công:

```
cd YOUR_N8N_INSTALLATION_DIRECTORY
npm install https://github.com/taducquang/zalo-node
```

## Available Nodes

### 1. Zalo Login By QR
Node cho phép đăng nhập vào Zalo thông qua mã QR.

### 2. Zalo Group
Node quản lý các hoạt động nhóm.
Operations:
- createGroup: Tạo nhóm mới
- getGroupInfo: Lấy thông tin nhóm
- addGroupDeputy: Thêm phó nhóm
- addUserToGroup: Thêm thành viên
- changeGroupAvatar: Đổi avatar nhóm
- changeGroupName: Đổi tên nhóm
- getGroupMembers: Lấy danh sách thành viên
- getAllGroups: Lấy tất cả nhóm
- removeUserFromGroup: Xóa thành viên
- createNote: Tạo ghi chú trong nhóm
- **getGroupChatHistory: Lấy lịch sử tin nhắn nhóm** *(NEW)*
- **upgradeGroupToCommunity: Nâng cấp nhóm thành cộng đồng** *(NEW)*

### 3. Zalo User
Node quản lý người dùng và bạn bè.
Operations:
- acceptFriendRequest: Chấp nhận lời mời kết bạn
- sendFriendRequest: Gửi lời mời kết bạn
- blockUser: Chặn người dùng
- unblockUser: Bỏ chặn người dùng
- changeAccountSetting: Thay đổi cài đặt tài khoản (name, dob, gender)
- getUserInfo: Lấy thông tin người dùng
- getAllFriends: Lấy danh sách bạn bè
- findUser: Tìm kiếm người dùng qua số điện thoại
- changeAliasName: Đổi tên gợi nhớ của bạn bè
- undoMessage: Thu hồi tin nhắn
- **findUserByUsername: Tìm kiếm người dùng theo username** *(NEW)*
- **updateProfileBio: Cập nhật tiểu sử cá nhân** *(NEW)*
- **getCloseFriends: Lấy danh sách bạn thân** *(NEW)*
- **getMultiUsersByPhones: Tìm nhiều người dùng theo số điện thoại** *(NEW)*

### 4. Zalo Send Message
Node gửi tin nhắn tới người dùng hoặc nhóm.
Features:
- Gửi tin nhắn văn bản với urgency level
- Trích dẫn tin nhắn (quote)
- Mention người dùng
- Đính kèm file/ảnh qua URL (hỗ trợ nhiều URL phân cách bằng dấu phẩy)
- **Định dạng tin nhắn qua JSON styles (bold, italic...)** *(NEW)*
- Typing event indicator

### 5. Zalo Message Trigger
Node lắng nghe và xử lý các sự kiện tin nhắn.
Events:
- Tin nhắn người dùng
- Tin nhắn nhóm
- **Undo (thu hồi tin nhắn)** *(NEW)*
- **Typing (đang gõ)** *(NEW)*
- **Reaction (biểu cảm)** *(NEW)*
- **Group Events (sự kiện nhóm)** *(NEW)*
- Tự động kết nối lại khi mất kết nối (WebSocket auto-reconnect)

### 6. Zalo Friend Trigger
Node lắng nghe sự kiện kết bạn.
Events:
- Lời mời kết bạn mới
- Tự động kết nối lại khi mất kết nối (WebSocket auto-reconnect)

### 7. Zalo Poll
Node quản lý bình chọn trong nhóm.
Operations:
- createPoll: Tạo bình chọn (multi-choice, anonymous, hide results, expiration)
- getPoll: Lấy thông tin bình chọn
- lockPoll: Khóa bình chọn

### 8. Zalo Tag
Node quản lý thẻ (tag/label).
Operations:
- list: Liệt kê tất cả thẻ

### 9. Zalo Sticker *(NEW)*
Node tìm kiếm và quản lý sticker.
Operations:
- **searchSticker: Tìm kiếm sticker theo từ khóa**
- **getStickerCategoryDetail: Lấy chi tiết danh mục sticker**

## Changelog v0.6.0

### Breaking Changes
- Nâng cấp `zca-js` từ `2.0.0-beta.24` lên `2.1.2`
- `updateProfile` API thay đổi signature (tự động xử lý trong node)
- `sendTypingEvent` API thay đổi signature (tự động xử lý trong node)
- Proxy config thay đổi từ `proxy` string sang `agent` (HttpsProxyAgent)

### New Features
- Thêm node **Zalo Sticker** (searchSticker, getStickerCategoryDetail)
- Thêm 4 operations cho Zalo User (findUserByUsername, updateProfileBio, getCloseFriends, getMultiUsersByPhones)
- Thêm 2 operations cho Zalo Group (getGroupChatHistory, upgradeGroupToCommunity)
- Thêm 4 event types cho Message Trigger (undo, typing, reaction, group_event)
- Hỗ trợ nhiều URL attachment (phân cách bằng dấu phẩy)
- Hỗ trợ styles JSON cho tin nhắn
- WebSocket auto-reconnect cho trigger nodes
- Proxy support qua HttpsProxyAgent cho tất cả nodes

### Bug Fixes
- Sửa `loginQR` deprecated API
- Sửa deprecated listener methods (onConnected, onError, onMessage)
- Sửa `getPollDetail` type mismatch

## Warning and Thanks

**Please read this carefully before using the Zalo nodes:**

Lưu ý: việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.

We would like to thank [ZCA-JS](https://github.com/nicenathapong/zca-js) for their work on this library.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

import { INodeProperties } from 'n8n-workflow';

export const zaloUserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
			},
		},
		options: [
			{
				name: 'Chấp nhận lời mời kết bạn',
				value: 'acceptFriendRequest',
				action: 'Chấp nhận lời mời kết bạn',
			},
			{
				name: 'Gửi lời mời kết bạn',
				value: 'sendFriendRequest',
				description: 'Gửi lời mời kết bạn',
				action: 'Gửi lời mời kết bạn',
			},
			{
				name: 'Chặn người dùng',
				value: 'blockUser',
				description: 'Chặn người dùng',
				action: 'Chặn người dùng',
			},
			{
				name: 'Bỏ chặn người dùng',
				value: 'unblockUser',
				description: 'Bỏ chặn người dùng',
				action: 'Bỏ chặn người dùng',
			},
			// {
			// 	name: 'Đổi ảnh đại diện',
			// 	value: 'changeAccountAvatar',
			// 	description: 'Đổi ảnh đại diện',
			// 	action: 'Đổi ảnh đại diện',
			// },
			{
				name: 'Thay đổi cài đặt tài khoản',
				value: 'changeAccountSetting',
				description: 'Thay đổi cài đặt tài khoản',
				action: 'Thay đổi cài đặt tài khoản',
			},
			{
				name: 'Lấy thông tin người dùng',
				value: 'getUserInfo',
				description: 'Lấy thông tin người dùng',
				action: 'Lấy thông tin người dùng',
			},
			{
				name: 'Lấy danh sách bạn bè',
				value: 'getAllFriends',
				description: 'Lấy danh sách bạn bè',
				action: 'Lấy danh sách bạn bè',
			},
			{
				name: 'Tìm kiếm người dùng',
				value: 'findUser',
				description: 'Tìm kiếm người dùng',
				action: 'Tìm kiếm người dùng',
			},
			{
				name: 'Đổi tên gợi nhớ',
				value: 'changeAliasName',
				description: 'Đổi tên gợi nhớ của bạn bè',
				action: 'Đổi tên gợi nhớ',
			},
			{
				name: 'Thu hồi tin nhắn',
				value: 'undoMessage',
				description: 'Thu hồi tin nhắn',
				action: 'Thu hồi tin nhắn',
			},
			{
				name: 'Tìm kiếm theo username',
				value: 'findUserByUsername',
				description: 'Tìm kiếm người dùng theo username',
				action: 'Tìm kiếm theo username',
			},
			{
				name: 'Cập nhật tiểu sử',
				value: 'updateProfileBio',
				description: 'Cập nhật tiểu sử cá nhân',
				action: 'Cập nhật tiểu sử',
			},
			{
				name: 'Lấy danh sách bạn thân',
				value: 'getCloseFriends',
				description: 'Lấy danh sách bạn thân',
				action: 'Lấy danh sách bạn thân',
			},
			{
				name: 'Tìm nhiều người theo SĐT',
				value: 'getMultiUsersByPhones',
				description: 'Tìm nhiều người dùng theo số điện thoại',
				action: 'Tìm nhiều người theo SĐT',
			},
		],
		default: 'getUserInfo',
	},
];

export const zaloUserFields: INodeProperties[] = [
	//Undo Message
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'ID của cuộc trò chuyện cần thu hồi tin nhắn. Gợi ý: {{ $json["data"]["threadId"] }}',
	},
	{
		displayName: 'Thread Type',
		name: 'threadType',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: 0,
		description: 'Loại cuộc trò chuyện: 0 = User (cá nhân), 1 = Group (nhóm). Gợi ý: {{ $json["data"]["isGroup"] ? 1 : 0 }}',
	},
	{
		displayName: 'Message ID',
		name: 'msgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'ID của tin nhắn cần thu hồi. Gợi ý: {{ $json["data"]["msgId"] }}',
	},
	{
		displayName: 'Client Message ID',
		name: 'cliMsgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Client message ID. Gợi ý: {{ $json["data"]["cliMsgId"] }}',
	},
		// Change alias name
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'ID của người dùng cần đổi tên gợi nhớ. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},
	{
		displayName: 'Alias Name',
		name: 'aliasName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'Tên gợi nhớ mới',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['acceptFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chấp nhận lời mời kết bạn. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},

	// Send Friend Request
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần gửi lời mời kết bạn. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'Tin nhắn kèm theo lời mời kết bạn',
	},

	// Block User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['blockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chặn. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},

	// Unblock User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['unblockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần bỏ chặn. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},

	// // Change Account Avatar
	// {
	// 	displayName: 'User ID',
	// 	name: 'userId',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'ID của người dùng cần đổi ảnh đại diện',
	// },
	// {
	// 	displayName: 'File Path',
	// 	name: 'filePath',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'Đường dẫn đến file ảnh đại diện',
	// },

	// Change Account Setting
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Tên hiển thị',
	},
	{
		displayName: 'Date of Birth',
		name: 'dob',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngày sinh (YYYY-MM-DD)',
	},
	{
		displayName: 'Gender',
		name: 'gender',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		options: [
			{
				name: 'Male',
				value: 1,
			},
			{
				name: 'Female',
				value: 2,
			},
			{
				name: 'Other',
				value: 3,
			},
		],
		default: 1,
		description: 'Giới tính',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngôn ngữ (vi, en)',
	},

	// Get User Info
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getUserInfo'],
			},
		},
		default: '',
		description: 'ID của người dùng cần lấy thông tin. Gợi ý: {{ $json["data"]["uidFrom"] }}',
	},

	// Get All Friends
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getAllFriends'],
			},
		},
		default: 50,
		description: 'Số lượng bạn bè tối đa cần lấy',
	},

	// Find User
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: '',
		description: 'Số điện thoại cần tìm kiếm',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: 50,
		description: 'Số lượng kết quả tối đa',
	},

	// Find User By Username
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUserByUsername'],
			},
		},
		default: '',
		description: 'Username của người dùng cần tìm kiếm',
	},

	// Update Profile Bio
	{
		displayName: 'Tiểu Sử',
		name: 'bio',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['updateProfileBio'],
			},
		},
		default: '',
		description: 'Nội dung tiểu sử cá nhân',
	},

	// Get Multi Users By Phones
	{
		displayName: 'Danh Sách Số Điện Thoại',
		name: 'phoneNumbers',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getMultiUsersByPhones'],
			},
		},
		default: '',
		description: 'Danh sách số điện thoại, phân cách bằng dấu phẩy',
	},
];

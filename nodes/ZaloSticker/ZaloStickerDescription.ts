import { INodeProperties } from 'n8n-workflow';

export const zaloStickerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloSticker'],
			},
		},
		options: [
			{
				name: 'Tìm Kiếm Sticker',
				value: 'searchSticker',
				description: 'Tìm kiếm sticker theo từ khóa',
				action: 'Tìm Kiếm Sticker',
			},
			{
				name: 'Chi Tiết Danh Mục Sticker',
				value: 'getStickerCategoryDetail',
				description: 'Lấy chi tiết danh mục sticker',
				action: 'Chi Tiết Danh Mục Sticker',
			},
		],
		default: 'searchSticker',
	},
];

export const zaloStickerFields: INodeProperties[] = [
	{
		displayName: 'Từ Khóa',
		name: 'keyword',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloSticker'],
				operation: ['searchSticker'],
			},
		},
		description: 'Từ khóa tìm kiếm sticker',
	},
	{
		displayName: 'Giới Hạn',
		name: 'limit',
		type: 'number',
		default: 20,
		required: false,
		displayOptions: {
			show: {
				resource: ['zaloSticker'],
				operation: ['searchSticker'],
			},
		},
		description: 'Số lượng kết quả tối đa',
	},
	{
		displayName: 'ID Danh Mục',
		name: 'categoryId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['zaloSticker'],
				operation: ['getStickerCategoryDetail'],
			},
		},
		description: 'ID của danh mục sticker',
	},
];

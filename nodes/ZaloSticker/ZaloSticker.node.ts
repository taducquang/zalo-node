import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { zaloStickerOperations, zaloStickerFields } from './ZaloStickerDescription';
import { Zalo } from 'zca-js';
import { parseCookie } from '../utils/helper';
const { HttpsProxyAgent } = require('https-proxy-agent');

export class ZaloSticker implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Sticker',
		name: 'zaloSticker',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Tìm kiếm và quản lý sticker Zalo',
		defaults: {
			name: 'Zalo Sticker',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Sticker',
						value: 'zaloSticker',
					},
				],
				default: 'zaloSticker',
			},
			...zaloStickerOperations,
			...zaloStickerFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const zaloCred = await this.getCredentials('zaloApi');

		const cookieFromCred = parseCookie(zaloCred.cookie as string);
		const imeiFromCred = zaloCred.imei as string;
		const userAgentFromCred = zaloCred.userAgent as string;
		const proxy = (zaloCred.proxy as string) || '';

		const cookie = cookieFromCred ?? items.find((x) => x.json.cookie)?.json.cookie as any;
		const imei = imeiFromCred ?? items.find((x) => x.json.imei)?.json.imei as string;
		const userAgent = userAgentFromCred ?? items.find((x) => x.json.userAgent)?.json.userAgent as string;

		const zaloOptions: any = {};
		if (proxy) {
			zaloOptions.agent = new HttpsProxyAgent(proxy);
		}

		const zalo = new Zalo(zaloOptions);
		const api = await zalo.login({ cookie, imei, userAgent });

		if (!api) {
			throw new NodeOperationError(this.getNode(), 'No API instance found. Please make sure to provide valid credentials.');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'zaloSticker') {
					// Tìm kiếm sticker
					if (operation === 'searchSticker') {
						const keyword = this.getNodeParameter('keyword', i) as string;
						const limit = this.getNodeParameter('limit', i, 20) as number;

						const response = await api.searchSticker(keyword, limit);

						returnData.push({
							json: { stickers: response },
							pairedItem: { item: i },
						});
					}

					// Chi tiết danh mục sticker
					else if (operation === 'getStickerCategoryDetail') {
						const categoryId = this.getNodeParameter('categoryId', i) as number;

						const response = await api.getStickerCategoryDetail(categoryId);

						returnData.push({
							json: { stickers: response },
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Zalo } from 'zca-js';
import { parseCookie, createProxyAgent } from '../utils/helper';

export class ZaloMessageHistory implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Message History',
		name: 'zaloMessageHistory',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 1,
		subtitle: 'Lấy lịch sử tin nhắn nhóm',
		description: 'Lấy lịch sử tin nhắn của nhóm Zalo (chỉ hỗ trợ nhóm)',
		defaults: {
			name: 'Zalo Message History',
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
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của nhóm cần lấy lịch sử tin nhắn. Gợi ý: {{ $json["data"]["data"]["idTo"] }}',
			},
			{
				displayName: 'Limit',
				name: 'count',
				type: 'number',
				default: 50,
				description: 'Số lượng tin nhắn gần nhất cần lấy. Đặt 0 để lấy tất cả tin nhắn có sẵn',
				typeOptions: {
					minValue: 0,
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const zaloCred = await this.getCredentials('zaloApi');

		const cookieFromCred = parseCookie(zaloCred.cookie as string);
		const imeiFromCred = zaloCred.imei as string;
		const userAgentFromCred = zaloCred.userAgent as string;
		const proxy = (zaloCred.proxy as string) || '';

		const zaloOptions: any = {};
		if (proxy) {
			zaloOptions.agent = createProxyAgent(proxy);
		}

		const zalo = new Zalo(zaloOptions);
		const api = await zalo.login({ cookie: cookieFromCred, imei: imeiFromCred, userAgent: userAgentFromCred });

		if (!api) {
			throw new NodeOperationError(this.getNode(), 'No API instance found. Please make sure to provide valid credentials.');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const groupId = this.getNodeParameter('groupId', i) as string;
				const count = this.getNodeParameter('count', i) as number;

				if (count === 0) {
					// Fetch all available messages by paginating
					const allMessages: any[] = [];
					let hasMore = true;
					let fetchCount = 100;

					while (hasMore) {
						const result = await api.getGroupChatHistory(groupId, fetchCount);
						if (result && result.groupMsgs && result.groupMsgs.length > 0) {
							allMessages.push(...result.groupMsgs);
							hasMore = result.more === 1;
							fetchCount = fetchCount + 100;
						} else {
							hasMore = false;
						}
					}

					returnData.push({
						json: {
							...items[i].json,
							messageHistory: {
								groupId,
								totalMessages: allMessages.length,
								messages: allMessages,
							},
						},
						pairedItem: { item: i },
					});
				} else {
					const result = await api.getGroupChatHistory(groupId, count);

					returnData.push({
						json: {
							...items[i].json,
							messageHistory: {
								groupId,
								totalMessages: result?.groupMsgs?.length ?? 0,
								messages: result?.groupMsgs ?? [],
								hasMore: result?.more === 1,
							},
						},
						pairedItem: { item: i },
					});
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

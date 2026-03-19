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
		subtitle: '={{ $parameter["threadType"] === 1 ? "Group" : "User" }}',
		description: 'Lấy lịch sử tin nhắn của cuộc trò chuyện Zalo (hỗ trợ cả user và group)',
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
				displayName: 'Thread Type',
				name: 'threadType',
				type: 'number',
				default: 0,
				required: true,
				description: 'Loại cuộc trò chuyện: 0 = User (cá nhân), 1 = Group (nhóm). Gợi ý: {{ $json["data"]["type"] }}',
			},
			{
				displayName: 'Thread ID',
				name: 'threadId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của cuộc trò chuyện (group ID hoặc user ID). Gợi ý: {{ $json["data"]["threadId"] }}',
			},
			{
				displayName: 'Limit',
				name: 'count',
				type: 'number',
				default: 50,
				description: 'Số lượng tin nhắn gần nhất cần lấy. Với Group, đặt 0 để lấy tất cả',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Timeout (giây)',
				name: 'timeout',
				type: 'number',
				default: 15,
				description: 'Thời gian chờ tối đa để nhận lịch sử tin nhắn (chỉ áp dụng cho User, Thread Type = 0)',
				typeOptions: {
					minValue: 5,
					maxValue: 60,
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
				const threadType = this.getNodeParameter('threadType', i) as number;
				const threadId = this.getNodeParameter('threadId', i) as string;
				const count = this.getNodeParameter('count', i) as number;

				if (threadType === 1) {
					// Group: use REST API getGroupChatHistory
					if (count === 0) {
						const allMessages: any[] = [];
						let hasMore = true;
						let fetchCount = 100;

						while (hasMore) {
							const result = await api.getGroupChatHistory(threadId, fetchCount);
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
									threadId,
									threadType: 'group',
									totalMessages: allMessages.length,
									messages: allMessages,
								},
							},
							pairedItem: { item: i },
						});
					} else {
						const result = await api.getGroupChatHistory(threadId, count);

						returnData.push({
							json: {
								...items[i].json,
								messageHistory: {
									threadId,
									threadType: 'group',
									totalMessages: result?.groupMsgs?.length ?? 0,
									messages: result?.groupMsgs ?? [],
									hasMore: result?.more === 1,
								},
							},
							pairedItem: { item: i },
						});
					}
				} else {
					// User: use WebSocket requestOldMessages + filter by threadId
					const timeout = this.getNodeParameter('timeout', i, 15) as number;

					const messages = await new Promise<any[]>((resolve) => {
						const timer = setTimeout(() => {
							resolve([]);
						}, timeout * 1000);

						api.listener.on('old_messages', (msgs: any[], type: any) => {
							clearTimeout(timer);
							// Filter messages for the specific thread
							const filtered = msgs.filter((msg: any) => {
								return msg.threadId === threadId ||
									msg.data?.uidFrom === threadId ||
									msg.data?.idTo === threadId;
							});
							resolve(filtered);
						});

						api.listener.start();
						api.listener.requestOldMessages(0); // ThreadType.User = 0
					});

					// Stop listener after getting messages
					try { api.listener.stop(); } catch (_) {}

					const limitedMessages = count > 0 ? messages.slice(-count) : messages;

					returnData.push({
						json: {
							...items[i].json,
							messageHistory: {
								threadId,
								threadType: 'user',
								totalMessages: limitedMessages.length,
								messages: limitedMessages,
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

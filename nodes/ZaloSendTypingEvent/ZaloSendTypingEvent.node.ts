import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Zalo } from 'zca-js';
import { parseCookie, createProxyAgent } from '../utils/helper';

export class ZaloSendTypingEvent implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Send Typing Event',
		name: 'zaloSendTypingEvent',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 1,
		subtitle: 'Gửi trạng thái đang nhập',
		description: 'Gửi sự kiện "đang nhập" (typing) tới cuộc trò chuyện Zalo',
		defaults: {
			name: 'Zalo Send Typing Event',
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
				displayName: 'Thread ID',
				name: 'threadId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của cuộc trò chuyện (user ID hoặc group ID)',
			},
			{
				displayName: 'Thread Type',
				name: 'threadType',
				type: 'options',
				options: [
					{
						name: 'User',
						value: 0,
						description: 'Cuộc trò chuyện cá nhân',
					},
					{
						name: 'Group',
						value: 1,
						description: 'Cuộc trò chuyện nhóm',
					},
				],
				default: 0,
				description: 'Loại cuộc trò chuyện',
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

		const cookie = cookieFromCred ?? items.find((x) => x.json.cookie)?.json.cookie as any;
		const imei = imeiFromCred ?? items.find((x) => x.json.imei)?.json.imei as string;
		const userAgent = userAgentFromCred ?? items.find((x) => x.json.userAgent)?.json.userAgent as string;

		const zaloOptions: any = {};
		if (proxy) {
			zaloOptions.agent = createProxyAgent(proxy);
		}

		const zalo = new Zalo(zaloOptions);
		const api = await zalo.login({ cookie, imei, userAgent });

		if (!api) {
			throw new NodeOperationError(this.getNode(), 'No API instance found. Please make sure to provide valid credentials.');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const threadId = this.getNodeParameter('threadId', i) as string;
				const threadType = this.getNodeParameter('threadType', i) as number;

				const result = await api.sendTypingEvent(threadId, threadType);

				returnData.push({
					json: {
						success: !!result,
						threadId,
						threadType: threadType === 0 ? 'User' : 'Group',
					},
					pairedItem: { item: i },
				});
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

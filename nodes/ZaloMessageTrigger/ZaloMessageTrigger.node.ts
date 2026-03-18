import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeOperationError,
	IHookFunctions,
} from 'n8n-workflow';
import { API, Zalo, Undo, GroupEvent } from 'zca-js';
const { HttpsProxyAgent } = require('https-proxy-agent');

let api: API | undefined;
let reconnectTimer: NodeJS.Timeout | undefined;

export class ZaloMessageTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Message Trigger',
		name: 'zaloMessageTrigger',
		icon: 'file:../shared/zalo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Sự kiện lắng nghe tin nhắn trên Zalo',
		defaults: {
			name: 'Zalo Message Trigger',
		},
		// @ts-ignore
		inputs: [],
		// @ts-ignore
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
		],
		properties: [
			{
				displayName: 'Event Types',
				name: 'eventTypes',
				type: 'multiOptions',
				options: [
					{
						name: 'User Messages',
						value: 'message_user',
						description: 'Lắng nghe tin nhắn từ người dùng',
					},
					{
						name: 'Group Messages',
						value: 'message_group',
						description: 'Lắng nghe tin nhắn từ nhóm',
					},
					{
						name: 'Undo (Thu hồi tin nhắn)',
						value: 'undo',
						description: 'Lắng nghe sự kiện thu hồi tin nhắn',
					},
					{
						name: 'Typing',
						value: 'typing',
						description: 'Lắng nghe sự kiện đang gõ',
					},
					{
						name: 'Reaction',
						value: 'reaction',
						description: 'Lắng nghe sự kiện reaction tin nhắn',
					},
					{
						name: 'Group Events',
						value: 'group_event',
						description: 'Lắng nghe sự kiện nhóm (vào/ra/thay đổi)',
					},
				],
				default: ['message_user', 'message_group'],
				required: true,
				description: 'Types of messages to listen for',
			},
			{
				displayName: 'Self Listen',
				name: 'selfListen',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Cho phép lắng nghe tin nhắn của chính mình tự gửi',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				return !!webhookData.isConnected;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('zaloApi');

				if (!credentials) {
					throw new NodeOperationError(this.getNode(), 'No credentials found');
				}

				try {
					const cookieFromCred = JSON.parse(credentials.cookie as string);
					const imeiFromCred = credentials.imei as string;
					const userAgentFromCred = credentials.userAgent as string;

					const selfListen = this.getNodeParameter('selfListen', 0) as boolean;
					const proxy = (credentials.proxy as string) || '';
					const zaloOptions: any = { selfListen };
					if (proxy) {
						zaloOptions.agent = new HttpsProxyAgent(proxy);
					}
					const zalo = new Zalo(zaloOptions);
					api = await zalo.login({ cookie: cookieFromCred, imei: imeiFromCred, userAgent: userAgentFromCred });

					if (!api) {
						throw new NodeOperationError(
							this.getNode(),
							'No API instance found. Please make sure to provide valid credentials.',
						);
					}
                    const webhookUrl = this.getNodeWebhookUrl('default') as string;
					const eventTypes = this.getNodeParameter('eventTypes', 0) as string[];

					// Message events
					api.listener.on('message', async (message: any) => {
						const isUserMessage = !message.isGroup;
						const isGroupMessage = message.isGroup;

						if ((isUserMessage && eventTypes.includes('message_user')) ||
							(isGroupMessage && eventTypes.includes('message_group'))) {
							this.helpers.httpRequest({
								method: 'POST',
								url: webhookUrl,
								body: { eventName: 'message', data: message },
								headers: { 'Content-Type': 'application/json' },
							});
						}
						const webhookData = this.getWorkflowStaticData('node');
						webhookData.lastMessage = message;
					});

					// Undo events
					if (eventTypes.includes('undo')) {
						api.listener.on('undo', async (undo: Undo) => {
							this.helpers.httpRequest({
								method: 'POST',
								url: webhookUrl,
								body: { eventName: 'undo', data: undo },
								headers: { 'Content-Type': 'application/json' },
							});
						});
					}

					// Typing events
					if (eventTypes.includes('typing')) {
						api.listener.on('typing', async (typing: any) => {
							this.helpers.httpRequest({
								method: 'POST',
								url: webhookUrl,
								body: { eventName: 'typing', data: typing },
								headers: { 'Content-Type': 'application/json' },
							});
						});
					}

					// Reaction events
					if (eventTypes.includes('reaction')) {
						api.listener.on('reaction', async (reaction: any) => {
							this.helpers.httpRequest({
								method: 'POST',
								url: webhookUrl,
								body: { eventName: 'reaction', data: reaction },
								headers: { 'Content-Type': 'application/json' },
							});
						});
					}

					// Group events
					if (eventTypes.includes('group_event')) {
						api.listener.on('group_event', async (event: GroupEvent) => {
							this.helpers.httpRequest({
								method: 'POST',
								url: webhookUrl,
								body: { eventName: 'group_event', data: event },
								headers: { 'Content-Type': 'application/json' },
							});
						});
					}

					// Start listening
					api.listener.start({ retryOnClose: true });

					const webhookData = this.getWorkflowStaticData('node');
					webhookData.isConnected = true;
					webhookData.eventTypes = this.getNodeParameter('eventTypes', 0) as string[];

					return true;
				} catch (error) {
					throw new NodeOperationError(this.getNode(), 'Zalo connection failed');
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (api) {
					api.listener.stop();
					api = undefined;
				}

				if (reconnectTimer) {
					clearTimeout(reconnectTimer);
					reconnectTimer = undefined;
				}

				delete webhookData.isConnected;
				delete webhookData.eventTypes;
				delete webhookData.lastMessage;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const req = this.getRequestObject();
		const webhookData = this.getWorkflowStaticData('node');


		// Clear the message after processing
		delete webhookData.lastMessage;


		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
	}
}

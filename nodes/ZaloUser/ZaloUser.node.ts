import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { zaloUserOperations, zaloUserFields } from './ZaloUserDescription';
import { ThreadType, Zalo } from 'zca-js';
import { parseCookie } from '../utils/helper';
const { HttpsProxyAgent } = require('https-proxy-agent');

export class ZaloUser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo User',
		name: 'zaloUser',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Quản lý người dùng Zalo',
		defaults: {
			name: 'Zalo User',
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
						name: 'Zalo User',
						value: 'zaloUser',
					},
				],
				default: 'zaloUser',
			},
			...zaloUserOperations,
			...zaloUserFields,
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

		const cookie = cookieFromCred ?? items.find((x) => x.json.cookie)?.json.cookie as any;
		const imei = imeiFromCred ?? items.find((x) => x.json.imei)?.json.imei as string;
		const userAgent = userAgentFromCred ?? items.find((x) => x.json.userAgent)?.json.userAgent as string;

		const proxy = (zaloCred.proxy as string) || '';

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
				if (resource === 'zaloUser') {
					// Chấp nhận lời mời kết bạn
					if (operation === 'acceptFriendRequest') {
						const userId = this.getNodeParameter('userId', i) as string;

						const response = await api.acceptFriendRequest(userId);

						returnData.push({
							json: {
                                status: "Thành công",
                                response: response,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// Gửi lời mời kết bạn
					else if (operation === 'sendFriendRequest') {
						const userId = this.getNodeParameter('userId', i) as string;
						const message = this.getNodeParameter('message', i) as string;

						const response = await api.sendFriendRequest(message, userId);

						returnData.push({
							json: {
                                status: "Thành công",
                                response: response,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// Chặn người dùng
					else if (operation === 'blockUser') {
						const userId = this.getNodeParameter('userId', i) as string;

						const response = await api.blockUser(userId);

						returnData.push({
							json: {
                                status: "Thành công",
                                response: response,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// Bỏ chặn người dùng
					else if (operation === 'unblockUser') {
						const userId = this.getNodeParameter('userId', i) as string;

						const response = await api.unblockUser(userId);

						returnData.push({
							json: {
                                status: "Thành công",
                                response: response,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// // Đổi ảnh đại diện
					// else if (operation === 'changeAccountAvatar') {
					// 	const userId = this.getNodeParameter('userId', i) as string;
					// 	const filePath = this.getNodeParameter('filePath', i) as string;

					// 	const response = await api.changeAccountAvatar(userId, filePath);

					// 	returnData.push({
					// 		json: {
                    //             status: "Thành công",
                    //             response: response,
                    //         },
					// 		pairedItem: {
					// 			item: i,
					// 		},
					// 	});
					// }

					// Thay đổi cài đặt tài khoản
					else if (operation === 'changeAccountSetting') {
						const name = this.getNodeParameter('name', i) as string;
						const dob = this.getNodeParameter('dob', i) as any;
						const gender = this.getNodeParameter('gender', i) as number;

						const response = await api.updateProfile({
							profile: { name, dob, gender }
						});

						returnData.push({
							json: {
                                status: "Thành công",
                                response: response,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy thông tin người dùng
					else if (operation === 'getUserInfo') {
						const userId = this.getNodeParameter('userId', i) as string;

						const response = await api.getUserInfo(userId);

						returnData.push({
							json: response,
							pairedItem: {
								item: i,
							},
						});
					}

					// Lấy danh sách bạn bè
					else if (operation === 'getAllFriends') {
						const limit = this.getNodeParameter('limit', i) as number;

						const response = await api.getAllFriends();
						const friends = response.slice(0, limit) || [];

						returnData.push({
							json: {
                                friends: friends,
                            },
							pairedItem: {
								item: i,
							},
						});
					}

					// Tìm kiếm người dùng
					else if (operation === 'findUser') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						const response = await api.findUser(phoneNumber);

						returnData.push({
							json: response,
							pairedItem: {
								item: i,
							},
						});
					}

					// Đổi tên gợi nhớ
					else if (operation === 'changeAliasName') {
						const userId = this.getNodeParameter('userId', i) as string;
						const aliasName = this.getNodeParameter('aliasName', i) as string;

						const response = await api.changeFriendAlias(aliasName, userId);

						returnData.push({
							json: {
								status: "Thành công",
								response: response,
							},
							pairedItem: {
								item: i,
							},
						});
					}

					//Undo message
					else if (operation === 'undoMessage') {
						const threadId = this.getNodeParameter('threadId', i) as string;
						const type = this.getNodeParameter('threadType', i) as ThreadType;
						const msgId = this.getNodeParameter('msgId', i) as string;
						const cliMsgId = this.getNodeParameter('cliMsgId', i) as string;

						const UndoOptions = {
							msgId: msgId,
							cliMsgId: cliMsgId
						}

						const response = await api.undo(UndoOptions, threadId, type);

						returnData.push({
							json: {
								status: "Thành công",
								response: response,
							},
							pairedItem: {
								item: i,
							},
						});
					}

					// Tìm kiếm người dùng theo username
					else if (operation === 'findUserByUsername') {
						const username = this.getNodeParameter('username', i) as string;
						const response = await api.findUserByUsername(username);
						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					}

					// Cập nhật tiểu sử
					else if (operation === 'updateProfileBio') {
						const status = this.getNodeParameter('bio', i) as string;
						const response = await api.updateProfileBio(status);
						returnData.push({
							json: {
								status: "Thành công",
								response: response,
							},
							pairedItem: { item: i },
						});
					}

					// Lấy danh sách bạn thân
					else if (operation === 'getCloseFriends') {
						const response = await api.getCloseFriends();
						returnData.push({
							json: { friends: response },
							pairedItem: { item: i },
						});
					}

					// Tìm nhiều người dùng theo số điện thoại
					else if (operation === 'getMultiUsersByPhones') {
						const phones = this.getNodeParameter('phoneNumbers', i) as string;
						const phoneList = phones.split(',').map(p => p.trim()).filter(p => p);
						const response = await api.getMultiUsersByPhones(phoneList);
						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}

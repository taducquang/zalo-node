import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Zalo } from 'zca-js';
import { createProxyAgent } from '../utils/helper';
import axios from 'axios';

export class ZaloLoginByQr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Login Via QR Code',
		name: 'zaloLoginByQr',
		group: ['Zalo'],
		version: 1,
		description: 'LĐăng nhập Zalo bằng QR code và lưu thông tin vào Credentia',
		defaults: {
			name: 'Zalo Login Via QR Code',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		icon: 'file:../shared/zalo.svg',
		credentials: [
			{
				name: 'zaloApi',
				required: false,
				displayName: 'Zalo Credential to connect with',
			},
			{
				name: 'n8nZaloApi',
				required: true,
				displayName: 'n8n Account Credential',
			  },
		],
		properties: [
			{
				displayName: 'Proxy',
				name: 'proxy',
				type: 'string',
				default: '',
				placeholder: 'https://user:pass@host:port',
				description: 'HTTP proxy to use for Zalo API requests',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const proxy = this.getNodeParameter('proxy', 0, '') as string;
		const timeout = 30;
		const fileName = 'zalo-qr-code.png';

		let zaloCredential : any;
		let n8nCredential : any;

		try {
			zaloCredential = await this.getCredentials('zaloApi');
		} catch (error) {
			// No Zalo credential selected
		}

		try {
			n8nCredential = await this.getCredentials('n8nZaloApi');
		} catch (error) {
			// No n8n credential selected
		}

		let selectedCredential = undefined;

		if (n8nCredential) {
			selectedCredential = n8nCredential;
		} else if (zaloCredential) {
			selectedCredential = zaloCredential;
		}

		try {
			const zaloOptions: any = {
				selfListen: true,
				logging: true,
			};

			if (proxy) {
				zaloOptions.agent = createProxyAgent(proxy);
			}

			let zalo: any;

			if (selectedCredential) {
				zalo = new Zalo(zaloOptions);

				if (selectedCredential === n8nCredential) {
					// n8n credential — fall through to QR login
					zalo = new Zalo(zaloOptions);
				} else {
					const cookie = selectedCredential.cookie as string;
					const imei = selectedCredential.imei as string;
					const userAgent = selectedCredential.userAgent as string;
					const supportCode = selectedCredential.supportCode as string;
					const licenseKey = selectedCredential.licenseKey as string;

					if (selectedCredential.proxy) {
						zaloOptions.agent = createProxyAgent(selectedCredential.proxy as string);
					}

					await zalo.login({
						cookie,
						imei,
						userAgent,
						supportCode,
						licenseKey,
					} as any);
				}
			} else {
				zalo = new Zalo(zaloOptions);
			}

			const qrCodePromise = new Promise<string>(async (resolve, reject) => {
				let isResolved = false;

				const timeoutId = setTimeout(() => {
					if (!isResolved) {
						isResolved = true;
						reject(new NodeOperationError(this.getNode(), 'Timeout generating QR code. Please try again or check your Zalo connection.'));
					}
				}, timeout * 1000);

				try {
					// @ts-ignore
					let api = await zalo.loginQR({}, (qrEvent: any) => {
						switch (qrEvent.type) {
							case 0: // QRCodeGenerated
								if (qrEvent?.data?.image) {
									const qrCodeBase64 = qrEvent.data.image;
									if (isResolved) return;
									clearTimeout(timeoutId);
									if (qrCodeBase64) {
										isResolved = true;
										resolve(qrCodeBase64);
									}
								} else {
									reject(new Error("Could not get QR code"));
								}
								break;

							case 1: // QRCodeExpired
								break;

							case 2: // QRCodeScanned
								break;

							case 3: // QRCodeDeclined
								break;

							case 4: // GotLoginInfo
								if (qrEvent?.data) {
									const cookie = qrEvent.data.cookie || [];
									const imei = qrEvent.data.imei || '';
									const userAgent = qrEvent.data.userAgent || '';

									try {
										if (cookie.length > 0 || imei || userAgent) {
											const credentialName = 'Zalo API Credentials';
											const credentialData = {
												cookie: JSON.stringify(cookie),
												imei: imei,
												userAgent: userAgent,
												proxy: proxy || '',
												supportCode: '',
												licenseKey: ''
											};

											try {
												const credentialApiData = {
													name: credentialName,
													type: 'zaloApi',
													nodesAccess: [],
													data: credentialData
												};

												const createCredentialOnPort = async (port: number) => {
													const n8nApi = await this.getCredentials('n8nZaloApi');
													const n8nApiUrl = n8nApi.url as string;
													const fullApiUrl = `${n8nApiUrl}/api/v1/credentials`;
													const n8nApiKey = n8nApi.apiKey as string;

													try {
														await axios.post(fullApiUrl, credentialApiData, {
															headers: {
																'Content-Type': 'application/json',
																'X-N8N-API-KEY': n8nApiKey as string
															},
														});
														return true;
													} catch (apiError: any) {
														return false;
													}
												};

												const ports = [5678];
												(async () => {
													for (const port of ports) {
														try {
															const result = await createCredentialOnPort.call(this, port);
															if (result) break;
														} catch (error) {
															// Port attempt failed, try next
														}
													}
												})().catch(() => {});
											} catch (error: any) {
												// Credential auto-creation failed
											}
										}
									} catch (fileError: any) {
										// Error processing login info
									}
								}
								break;

							default:
								break;
						}
					});

					api.listener.start();

					api.listener.on('connected', () => {
						// Connected
					});

					api.listener.on('error', (error: any) => {
						// Listener error
					});
				} catch (error: any) {
					clearTimeout(timeoutId);
					if (!isResolved) {
						isResolved = true;
						reject(error);
					}
				}
			});

			const qrCodeBase64 = await qrCodePromise;
			const binaryData = Buffer.from(qrCodeBase64, 'base64');

			const newItem: INodeExecutionData = {
				json: {
					success: true,
					message: selectedCredential === n8nCredential
						? 'Using n8n account credential. QR code generated successfully.'
						: (selectedCredential === zaloCredential
							? 'Using existing Zalo credentials. QR code generated successfully.'
							: 'QR code generated successfully. Scan with Zalo app to login.'),
					fileName,
					usingExistingCredential: !!selectedCredential,
					credentialType: selectedCredential === n8nCredential ? 'n8nZaloApi' : (selectedCredential === zaloCredential ? 'zaloApi' : null),
				},
				binary: {
					data: await this.helpers.prepareBinaryData(binaryData, fileName, 'image/png'),
				},
			};

			returnData.push(newItem);

			if (returnData[0] && returnData[0].json) {
				if (!selectedCredential) {
					returnData[0].json.credentialInstructions = 'Credentials will be created automatically if n8n API credentials are provided.';
					returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API if n8n API credentials are provided.';
				} else if (selectedCredential === n8nCredential) {
					returnData[0].json.credentialInstructions = 'Using n8n account credential. New Zalo credentials will be created automatically after successful login.';
					returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
					returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
					returnData[0].json.credentialType = 'n8nZaloApi';
					returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API after successful login.';
				} else {
					returnData[0].json.credentialInstructions = 'Using existing Zalo credentials from the selected credential.';
					returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
					returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
					returnData[0].json.credentialType = 'zaloApi';
				}
			}

			return [returnData];
		} catch (error: any) {
			if (this.continueOnFail()) {
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: error.message }),
					{ itemData: { item: 0 } },
				);
				return [executionData];
			} else {
				throw error;
			}
		}
	}
}

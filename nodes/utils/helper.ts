import axios from 'axios';
import fs from 'fs';
import os from 'os';
import path from 'path';
import * as http from 'http';
import * as tls from 'tls';
import * as net from 'net';

/**
 * Create a proxy agent using Node.js built-in modules (no external dependency)
 */
export function createProxyAgent(proxyUrl: string): http.Agent {
	const parsed = new URL(proxyUrl);
	const proxyHost = parsed.hostname;
	const proxyPort = parseInt(parsed.port) || (parsed.protocol === 'https:' ? 443 : 80);
	const proxyAuth = parsed.username
		? `${decodeURIComponent(parsed.username)}:${decodeURIComponent(parsed.password)}`
		: undefined;

	return new (class extends http.Agent {
		createConnection(options: any, callback: (err: Error | null, socket?: net.Socket) => void): net.Socket {
			const connectHeaders: Record<string, string> = {
				Host: `${options.host}:${options.port}`,
			};
			if (proxyAuth) {
				connectHeaders['Proxy-Authorization'] = `Basic ${Buffer.from(proxyAuth).toString('base64')}`;
			}

			const req = http.request({
				host: proxyHost,
				port: proxyPort,
				method: 'CONNECT',
				path: `${options.host}:${options.port}`,
				headers: connectHeaders,
			});

			req.on('connect', (_res, socket) => {
				if (options.port === 443 || options.port === '443') {
					const tlsSocket = tls.connect({
						socket: socket,
						servername: options.host,
					});
					callback(null, tlsSocket as any);
				} else {
					callback(null, socket);
				}
			});

			req.on('error', (err) => {
				callback(err);
			});

			req.end();
			return new net.Socket();
		}
	})();
}

/**
 * Parse cookie JSON string from credentials with error handling
 */
export function parseCookie(cookieStr: string): any {
	try {
		return JSON.parse(cookieStr);
	} catch {
		throw new Error('Cookie credential is not valid JSON. Please check your Zalo credentials.');
	}
}

/**
 * Tải file bất kỳ (ảnh, pdf, zip...) và lưu vào thư mục tạm trong n8n
 */
export async function saveFile(url: string): Promise<string | null> {
	try {
		// Validate URL scheme to prevent SSRF
		const parsed = new URL(url);
		if (!['http:', 'https:'].includes(parsed.protocol)) {
			return null;
		}

		const n8nUserFolder = process.env.N8N_USER_FOLDER || path.join(os.homedir(), '.n8n');
		const dataStoragePath = path.join(n8nUserFolder, 'temp_files');

		if (!fs.existsSync(dataStoragePath)) {
			fs.mkdirSync(dataStoragePath, { recursive: true });
		}

		// Lấy phần mở rộng từ URL (nếu có), ví dụ: .png, .pdf
		const urlPath = new URL(url).pathname;
		const ext = path.extname(urlPath) || '.bin';

		const timestamp = Date.now();
		const filePath = path.join(dataStoragePath, `temp-${timestamp}${ext}`);

		const { data } = await axios.get(url, { responseType: 'arraybuffer' });
		fs.writeFileSync(filePath, data); // đúng kiểu nhị phân

		return filePath;
	} catch (error) {
		// File download/save failed
		return null;
	}
}

/**
 * Xoá file đã lưu
 */
export function removeFile(filePath: string): void {
	try {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	} catch (error) {
		// File removal failed
	}
}

/**
 * Simple image metadata getter (fallback without sharp)
 * Returns null to let zca-js handle images without metadata
 */
export async function getImageMetadata(filePath: string): Promise<{ width: number; height: number; size: number } | null> {
	try {
		const stats = fs.statSync(filePath);
		return {
			width: 0,
			height: 0,
			size: stats.size,
		};
	} catch {
		return null;
	}
}

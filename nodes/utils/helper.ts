import axios from 'axios';
import fs from 'fs';
import os from 'os';
import path from 'path';

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

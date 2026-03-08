import { useAuthStore } from '../store/authStore';
import config from '../config';
import { notifyError } from '../components/Notify';
import { buildTextError } from '../utils/array-object';

function getAccessToken() {
	const { token } = useAuthStore.getState();
	return token || null;
}

function buildQueryString(params) {
	if (!params || typeof params !== 'object') return '';
	const searchParams = new URLSearchParams(
		Object.entries(params).filter(([, value]) => value !== null && value !== undefined),
	);
	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : '';
}

function buildUrl(endPoint, params) {
	const baseURL = config.BASE_API + config.END_API;
	const queryString = buildQueryString(params);
	return baseURL + endPoint + queryString;
}

/**
 * Memperbaiki scope variabel dan header
 */
function buildHeaders(options) {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const token = getAccessToken();

	const headers = {
		'Content-Type': 'application/json',
		'X-Timezone': timezone,
		...options.headers, // Biarkan options.headers menimpa default jika ada
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return { ...options, headers };
}

/**
 * Request API dengan penanganan error sesuai spesifikasi
 */
async function api(endPoint, options = {}) {
	const { params, ...fetchOptions } = options;
	const fullUrl = buildUrl(endPoint, params);
	const finalOptions = buildHeaders(fetchOptions);

	let response;
	try {
		response = await fetch(fullUrl, finalOptions);
	} catch (networkError) {
		// Network error (server mati, timeout, no internet, dll)
		console.error('[Network Error]', networkError);
		notifyError({ message: 'Tidak dapat terhubung ke server!' });
		throw networkError;
	}

	const responseJson = await response.json();

	if (!response.ok) {
		// API error
		const errMessage = buildTextError(responseJson.message);
		notifyError({ message: errMessage });
		throw responseJson;
	}

	return responseJson;
}

export default api;

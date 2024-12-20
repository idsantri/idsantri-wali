import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
	baseURL: 'http://localhost:8000/wali',
});

api.defaults.withCredentials = true;

// request
api.interceptors.request.use((config) => {
	const { auth } = useAuthStore.getState();
	if (auth.token) {
		config.headers.Authorization = `Bearer ${auth.token}`;
	}
	return config;
});

// response
api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (!err.response) {
			console.log('ERROR: Tidak dapat terhubung ke server');
		} else {
			return Promise.reject(err);
		}
	},
);
export const apiGet = (endpoint) => api.get(endpoint);
export const apiPost = (endpoint, data) => api.post(endpoint, data);

export default api;

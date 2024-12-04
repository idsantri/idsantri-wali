import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import config from '../config';
import { notifyError } from '../components/Notify';

const api = axios.create({
	baseURL: config.BASE_API + config.END_API,
	withCredentials: true,
});

// request
api.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState().auth;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// response
api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (!err.response) {
			// console.log('Tidak dapat terhubung ke server!');
			notifyError({ message: 'Tidak dapat terhubung ke server!', title: 'Server error' });
		} else {
			return Promise.reject(err);
		}
	},
);
export const apiGet = (endpoint) => api.get(endpoint);
export const apiPost = (endpoint, data) => api.post(endpoint, data);

export default api;

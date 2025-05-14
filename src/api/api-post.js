import api from '.';
import apiError from './api-error';
import { notifySuccess } from '@/components/Notify';

async function apiPost({ endPoint, data, params, notify = true }) {
	try {
		const res = await api.post(endPoint, data, { params });
		if (notify) notifySuccess({ message: res.data.message, autoClose: 1500 });
		const result = res.data.data;
		result.message = res.data.message;
		return result;
	} catch (error) {
		apiError(error);
		return false;
	}
}

export default apiPost;

import api from '.';
import apiError from './api-error';
import { notifySuccess } from '../components/Notify';

async function apiGet({ endPoint, params, notify = false }) {
	try {
		const { data } = await api.get(endPoint, { params });
		if (notify) notifySuccess({ message: data.message });
		return data;
	} catch (error) {
		apiError(error);
		return false;
	}
}

export default apiGet;

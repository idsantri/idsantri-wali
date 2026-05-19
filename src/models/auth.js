import { notifySuccess } from '../components/Notify';
import api from './api';

export async function login(santri_id, tgl_lahir) {
	try {
		const response = await api('login', {
			method: 'POST',
			body: JSON.stringify({ santri_id, tgl_lahir }),
		});
		notifySuccess({ message: response.message });
		return response.data;
	} catch (error) {
		console.log('🚀 ~ login ~ error:', error);
		return false;
		// throw error;
	}
}

import { notifySuccess } from '../components/Notify';
import api from './api';

export async function appWali() {
	try {
		const response = await api('app-wali', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('🚀 ~ login ~ error:', error);
	}
}

export async function profiles() {
	try {
		const response = await api('profiles', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('🚀 ~ login ~ error:', error);
	}
}

export async function va() {
	try {
		const response = await api('va', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('🚀 ~ login ~ error:', error);
	}
}

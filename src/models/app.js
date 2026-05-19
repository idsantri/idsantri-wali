import { notifySuccess } from '../components/Notify';
import api from './api';

export async function getAppWali() {
	try {
		const response = await api('app-wali', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('Gagal mengambil data app-wali:', error);
		return false;
	}
}

export async function getProfiles() {
	try {
		const response = await api('profiles', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('Gagal mengambil data profiles:', error);
		return false;
	}
}

export async function getVA() {
	try {
		const response = await api('va', {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.log('Gagal mengambil data va:', error);
		return false;
	}
}

export async function getTatib() {
	try {
		const response = await api('tatib-santri', { method: 'GET' });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data tatib:', error);
		return false;
	}
}

import api from './api';

export async function getSantri() {
	try {
		const response = await api('santri', { method: 'GET' });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data santri:', error);
		return false; // Return false agar pengecekan di useEffect lebih mudah
	}
}

export async function getIuran() {
	try {
		const response = await api('iuran', { method: 'GET' });
		return {
			iuran: response.data?.iuran,
			message: response.message,
		};
	} catch (error) {
		console.error('Gagal mengambil data iuran:', error);
		return false;
	}
}

export async function getDomisili() {
	try {
		const response = await api('domisili', { method: 'GET' });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data domisili:', error);
		return false;
	}
}

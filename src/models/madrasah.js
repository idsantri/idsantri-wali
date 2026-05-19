import api from './api';

export async function getKelas() {
	try {
		const response = await api('kelas', { method: 'GET' });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data kelas:', error);
		return false;
	}
}

export async function getNilaiAhwal(kelas_id) {
	try {
		const response = await api('nilai-ahwal', { method: 'GET', params: { kelas_id } });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data nilai ahwal:', error);
		return false;
	}
}

export async function getNilaiMapel(kelas_id, category) {
	try {
		const response = await api('nilai-mapel', { method: 'GET', params: { kelas_id, category } });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data nilai mapel:', error);
		return false;
	}
}

export async function getAbsensi(kelas_id, category) {
	try {
		const response = await api('absensi', { method: 'GET', params: { kelas_id, category } });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data absensi:', error);
		return false;
	}
}

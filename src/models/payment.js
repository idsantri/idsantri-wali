import api from './api';

export async function midtrans(params) {
	try {
		const response = await api('payment/midtrans', { method: 'POST', data: params });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data midtrans:', error);
		return false; // Return false agar pengecekan di useEffect lebih mudah
	}
}

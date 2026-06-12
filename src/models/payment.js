import api from './api';

export async function getPayments() {
	try {
		const response = await api('payments', { method: 'GET' });
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data payments:', error);
		return false;
	}
}

export async function payWithMidtrans(params) {
	try {
		const response = await api('payments/midtrans', {
			method: 'POST',
			body: JSON.stringify(params),
		});
		return response.data;
	} catch (error) {
		console.error('Gagal mengambil data midtrans:', error);
		return false; // Return false agar pengecekan di useEffect lebih mudah
	}
}

import { useEffect, useState } from 'react';
import { getPayments, payWithMidtrans } from '../../models/payment';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
import { Icon } from '@iconify/react/dist/iconify.js';
import { notifyError, notifySuccess } from '../../components/Notify';
import '../../utils/rupiah';

const HistoryPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const location = useLocation();
	const iuran = location?.state?.iuran || [];
	const santri = JSON.parse(localStorage.getItem('santri') || 'null');
	const [midtrans, setMidtrans] = useState(null);
	const [selectedIds, setSelectedIds] = useState(() => iuran.map((item) => item.id));
	const [customerDetails, setCustomerDetails] = useState({
		first_name: santri?.wali_nama || '',
		email: santri?.wali_email || '',
		phone: santri?.wali_telepon || '',
	});
	const [isScriptLoaded, setIsScriptLoaded] = useState(() => typeof window.snap !== 'undefined');
	const navigate = useNavigate();

	const removeScript = (script_url) => {
		if (!script_url) return;
		document.querySelectorAll('script[src="' + script_url + '"]').forEach((script) => script.remove());
	};

	useEffect(() => {
		let isMounted = true;
		let scriptElement = null;

		getPayments()
			.then((res) => {
				if (!isMounted) return;
				if (res && res.payments && res.payments.midtrans) {
					setMidtrans(res.payments.midtrans);

					const scriptUrl = res.payments.midtrans.snap_script_url;

					// Remove first if exists
					removeScript(scriptUrl);

					// Script only added after data is ready
					const script = document.createElement('script');
					script.src = scriptUrl;
					script.setAttribute('data-client-key', res.payments.midtrans.client_key);
					script.async = true;
					script.onload = () => {
						if (isMounted) setIsScriptLoaded(true);
					};
					script.onerror = () => {
						console.error('Failed to load Midtrans Snap script');
						if (isMounted) setIsScriptLoaded(false);
					};
					document.head.appendChild(script);
					scriptElement = script;
				}
			})
			.finally(() => {
				if (isMounted) setIsLoading(false);
			});

		// Cleanup on unmount
		return () => {
			isMounted = false;
			if (scriptElement) {
				scriptElement.remove();
			}
		};
	}, []);

	const handleToggle = (id) => {
		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCustomerDetails((prev) => ({ ...prev, [name]: value }));
	};

	const totalAmount = iuran
		.filter((item) => selectedIds.includes(item.id))
		.reduce((total, item) => total + item.nominal, 0);

	const isFormValid =
		customerDetails.first_name.trim() !== '' &&
		customerDetails.email.trim() !== '' &&
		customerDetails.phone.trim() !== '';

	const handlePayment = async (e) => {
		e.preventDefault();
		if (!isFormValid || selectedIds.length === 0 || isLoading || isProcessing) return;

		if (!window.snap) {
			notifyError({
				message: 'Sistem pembayaran Midtrans belum siap. Silakan muat ulang atau tunggu beberapa saat.',
			});
			return;
		}

		setIsProcessing(true);
		try {
			const data = await payWithMidtrans({
				iuran_ids: selectedIds,
				customer_details: customerDetails,
			});

			if (data && data.token) {
				window.snap.pay(data.token, {
					onSuccess: function (result) {
						console.log('Payment successful:', result);
						notifySuccess({ message: 'Pembayaran berhasil diproses!' });
						navigate('/iuran', { replace: true });
					},
					onError: function (error) {
						console.error('Payment error:', error);
						notifyError({ message: 'Pembayaran gagal. Silakan coba lagi.' });
					},
					onClose: function () {
						console.log('Payment closed');
						notifyError({ message: 'Pembayaran dibatalkan.' });
						navigate('/iuran', { replace: true });
					},
					onPending: function (result) {
						console.log('Payment pending', result);
						notifySuccess({ message: 'Pembayaran sedang ditangguhkan (pending).' });
						navigate('/iuran', { replace: true });
					},
				});
			} else {
				notifyError({ message: 'Gagal membuat transaksi pembayaran. Silakan coba beberapa saat lagi.' });
			}
		} catch (error) {
			console.error('Payment request error:', error);
			notifyError({ message: 'Terjadi kesalahan sistem saat memproses pembayaran.' });
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<>
			<CardHeader title='Bayar Iuran/Tagihan' />
			History Page
		</>
	);
};

export default HistoryPage;

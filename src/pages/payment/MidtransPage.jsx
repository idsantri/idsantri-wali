import { useEffect, useState } from 'react';
import { getPayments, payWithMidtrans } from '../../models/payment';
import { useLocation, Link } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
import { Icon } from '@iconify/react/dist/iconify.js';
import { notifyError, notifySuccess } from '../../components/Notify';
import '../../utils/rupiah';

const MidtransPage = () => {
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
					},
					onError: function (error) {
						console.error('Payment error:', error);
						notifyError({ message: 'Pembayaran gagal. Silakan coba lagi.' });
					},
					onClose: function () {
						console.log('Payment closed');
						notifyError({ message: 'Pembayaran dibatalkan.' });
					},
					onPending: function (result) {
						console.log('Payment pending', result);
						notifySuccess({ message: 'Pembayaran sedang ditangguhkan (pending).' });
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
			{iuran.length === 0 ? (
				<div className='flex flex-col items-center justify-center px-4 py-8 mt-2 space-y-4 text-sm italic font-light text-center rounded-md shadow-sm bg-info text-info-content'>
					<p>Tidak ada tagihan untuk atas nama santri ini atau sesi pembayaran telah selesai.</p>
					<Link to='/iuran' className='gap-1 btn btn-sm btn-primary text-primary-content'>
						<Icon icon='ion:arrow-back-outline' width='1.2em' height='1.2em' />
						Kembali ke Riwayat Iuran
					</Link>
				</div>
			) : (
				<div className='space-y-2'>
					<div className='flex items-center justify-between my-4'>
						<Link to='/iuran' className='gap-1 btn btn-xs btn-outline btn-primary'>
							<Icon icon='ion:arrow-back-outline' />
							Kembali
						</Link>
					</div>
					<div className='grid gap-2'>
						{iuran.map((item) => (
							<label
								key={item.id}
								className={`flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer transition-all active:scale-95 ${
									selectedIds.includes(item.id)
										? 'border-primary bg-primary/5'
										: 'border-base-300 bg-base-100'
								}`}
							>
								<div className='flex-1'>
									<div className='flex items-baseline gap-2'>
										<div className='text-base-content'>{item.item}</div>
										<div className='text-[10px] font-semibold uppercase tracking-wider text-base-content/75'>
											{item.th_ajaran_h}
										</div>
									</div>
									<div className='text-sm font-bold text-primary'>{item.nominal.toRupiah()}</div>
								</div>
								<div className='ml-4'>
									<input
										type='checkbox'
										className='checkbox checkbox-primary checkbox-sm'
										checked={selectedIds.includes(item.id)}
										onChange={() => handleToggle(item.id)}
									/>
								</div>
							</label>
						))}
					</div>

					<form onSubmit={handlePayment} className='space-y-4'>
						<div className='p-2 space-y-2 border rounded-md bg-base-100 border-primary'>
							<h3 className='text-sm font-medium text-base-content/70'>Informasi Kontak</h3>
							<div className='space-y-2'>
								<input
									required
									type='text'
									name='first_name'
									placeholder='Nama Lengkap'
									className='w-full input input-bordered input-sm focus:input-primary'
									value={customerDetails.first_name}
									onChange={handleInputChange}
								/>
								<input
									required
									type='email'
									name='email'
									placeholder='Email'
									className='w-full input input-bordered input-sm focus:input-primary'
									value={customerDetails.email}
									onChange={handleInputChange}
								/>
								<input
									required
									type='tel'
									name='phone'
									placeholder='Nomor WhatsApp (08xxxxx)'
									className='w-full input input-bordered input-sm focus:input-primary'
									value={customerDetails.phone}
									onChange={handleInputChange}
								/>
							</div>

							{/* button */}
							<div className='p-2 mt-4 rounded-md bg-base-200'>
								<div className='flex items-center justify-between mb-2'>
									<div>
										<div className='text-xs font-medium text-base-content/60'>Total Tagihan</div>
										<div className='flex flex-wrap items-center gap-2'>
											<div className='text-xl font-black text-primary'>
												{totalAmount?.toRupiah()}
											</div>
											{midtrans?.admin_fee !== undefined && (
												<div className='text-xs font-normal text-base-content/70'>
													+ Admin: {midtrans.admin_fee.toRupiah()}
												</div>
											)}
										</div>
										{midtrans?.admin_fee !== undefined && (
											<div className='mt-1 text-xs text-base-content/60'>
												Total Bayar:{' '}
												<span className='font-bold'>
													{(totalAmount + Number(midtrans.admin_fee || 0)).toRupiah()}
												</span>
											</div>
										)}
									</div>
									<div className='text-right'>
										<div className='text-xs font-medium text-base-content/60'>Item</div>
										<div className='text-lg font-bold'>{selectedIds.length}</div>
									</div>
								</div>

								<button
									type='submit'
									className='w-full btn btn-primary'
									disabled={
										isLoading ||
										isProcessing ||
										selectedIds.length === 0 ||
										!isFormValid ||
										!isScriptLoaded
									}
								>
									{isProcessing ? (
										<span className='loading loading-spinner'></span>
									) : (
										'Bayar Sekarang'
									)}
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default MidtransPage;

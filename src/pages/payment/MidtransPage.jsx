import { useEffect, useState } from 'react';
import { getPayments, payWithMidtrans } from '../../models/payment';
import { useLocation } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
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
		first_name: santri?.wali_nama,
		email: santri?.wali_email,
		phone: santri?.wali_telepon,
	});

	const removeScript = (script_url) => {
		if (!script_url) return;
		document.querySelectorAll('script[src="' + script_url + '"]').forEach((script) => script.remove());
	};

	useEffect(() => {
		getPayments()
			.then((res) => {
				if (res && res.payments && res.payments.midtrans) {
					setMidtrans(res.payments.midtrans);

					// remove first if exists
					removeScript(res.payments.midtrans.snap_script_url);

					// Script hanya ditambahkan setelah data siap
					const script = document.createElement('script');
					script.src = res.payments.midtrans.snap_script_url;
					script.setAttribute('data-client-key', res.payments.midtrans.client_key);
					script.async = true;
					document.head.appendChild(script);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});

		// cleanup di return effect
		return () => removeScript(midtrans?.snap_script_url);
	}, [midtrans?.snap_script_url]);

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
					},
					onError: function (error) {
						console.error('Payment error:', error);
					},
					onClose: function () {
						console.log('Payment closed');
					},
					onPending: function (result) {
						console.log('Payment pending', result);
					},
				});
			}
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<>
			<CardHeader title='Bayar Iuran/Tagihan' />
			{iuran.length === 0 ? (
				<div className='px-2 py-4 mt-2 text-sm italic font-light text-center bg-info text-info-content'>
					<p>Tidak ada tagihan untuk atas nama santri ini</p>
				</div>
			) : (
				<div className='space-y-4'>
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
									<div className='flex items-center gap-2'>
										<div className='font-semibold text-base-content'>{item.item}</div>
										<div className='text-[10px] font-bold uppercase tracking-wider text-base-content/75'>
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
							<div className='p-4 mt-4 rounded-md bg-base-200'>
								<div className='flex items-center justify-between mb-4'>
									<div>
										<div className='text-xs font-medium text-base-content/60'>Total Tagihan</div>
										<div className='flex items-center gap-2'>
											<div className='text-xl font-black text-primary'>
												{totalAmount?.toRupiah()}{' '}
											</div>
											<div className='text-sm font-light '>
												(+ biaya admin {midtrans?.admin_fee?.toRupiah()})
											</div>
										</div>
									</div>
									<div className='text-right'>
										<div className='text-xs font-medium text-base-content/60'>Item</div>
										<div className='text-lg font-bold'>{selectedIds.length}</div>
									</div>
								</div>

								<button
									type='submit'
									className='w-full btn btn-primary'
									disabled={isLoading || isProcessing || selectedIds.length === 0 || !isFormValid}
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

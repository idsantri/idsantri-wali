import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';

function IuranPage() {
	const santri = JSON.parse(localStorage.getItem('santri'));
	const [iuran, setIuran] = useState(null);
	const [alert, setAlert] = useState(null);
	useEffect(() => {
		apiGet('/iuran')
			.then((res) => {
				const { iuran, message } = res.data;
				const result = groupByThAjaranH(iuran);
				setIuran(result);
				setAlert(message);
				// console.log('🚀 ~ .then ~ groupByThAjaranH(iuran):', result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function groupByThAjaranH(data) {
		return Object.values(
			data.reduce((acc, item) => {
				if (!acc[item.th_ajaran_h]) {
					acc[item.th_ajaran_h] = {
						th_ajaran_h: item.th_ajaran_h,
						data: [],
						total: 0, // Tambahkan total awal
					};
				}

				// Hitung total dengan nominal * qty
				const total = item.nominal * item.qty;

				acc[item.th_ajaran_h].data.push(item);
				acc[item.th_ajaran_h].total += total; // Tambahkan ke total group

				return acc;
			}, {}),
		);
	}

	return (
		<>
			<CardHeader>Riwayat Iuran</CardHeader>
			<div className='my-2 bg-color2 text-center rounded-sm'>
				<div className='p-2 fw-bold'>
					<div>{santri.nama}</div>
					<div className='text-sm font-light'>{santri.data_akhir}</div>
				</div>
			</div>
			{!iuran ? (
				<Loading />
			) : iuran.length == 0 ? (
				<div role='alert' className='alert alert-warning rounded-sm text-center text-color8'>
					<span> Yang bersangkutan belum memiliki riwayat pembayaran!</span>
				</div>
			) : (
				<div>
					<div className='join join-vertical w-full rounded-sm'>
						{iuran.map((iur) => (
							<div className='collapse collapse-arrow join-item border-base-300 border bg-color0' key={iur.th_ajaran_h}>
								<input name='radio' type='radio' />
								<div className='collapse-title font-light flex items-center justify-between'>
									<div>Tahun Ajaran: {iur.th_ajaran_h}</div>
									<div className='font-normal'>
										{iur.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
									</div>
								</div>
								<div className='collapse-content'>
									{iur.data.map((i) => (
										<div key={i.id} className='border-separated border border-base-300 bg-jingga-100 py-1 px-3 flex items-center justify-between'>
											<div>
												<div className='font-light'>{i.iuran}</div>
												<div className='text-xs'>{i.cr_at}</div>
											</div>
											<div className='font-light'>
												{(i.nominal * i.qty).toLocaleString('id-ID', {
													style: 'currency',
													currency: 'IDR',
													minimumFractionDigits: 0,
													maximumFractionDigits: 0,
												})}
											</div>
											{/* <pre className='mt-3'>{JSON.stringify(i, null, 2)}</pre> */}
										</div>
									))}
								</div>
							</div>
						))}
						{/* <hr /> */}
						{/* <pre className='mt-3'>{JSON.stringify(iuran, null, 2)}</pre> */}
					</div>
					{alert && (
						<div className='rounded-sm text-jingga-100 bg-jingga-400 mt-2 px-2 py-4 border border-base-300 text-center italic font-light'>
							<span>{alert}</span>
						</div>
					)}
				</div>
			)}
		</>
	);
}
export default IuranPage;

import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import AlertNotFound from '../components/AlertNotFound';
import { addHours, format } from 'date-fns';

function IuranPage() {
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		apiGet({ endPoint: 'iuran' }).then((res) => {
			if (res) {
				const { iuran, message } = res;
				const result = groupByThAjaranH(iuran);
				setIuran(result);
				setInfo(message);
			}
			setIsLoading(false);
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

	function RenderIuran() {
		return (
			<div>
				<div className='join join-vertical w-full rounded-sm'>
					{iuran.map((tahun) => (
						<div className='collapse collapse-arrow join-item border-base-300 border bg-color0' key={tahun.th_ajaran_h}>
							<input name='radio' type='radio' />
							<div className='collapse-title font-light flex items-center justify-between'>
								<div>Tahun Ajaran: {tahun.th_ajaran_h}</div>
								<div className='font-normal'>
									{tahun.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
								</div>
							</div>
							<div className='collapse-content'>
								{tahun.data.map((item) => (
									<div key={item.id} className='border-separated border border-base-300 bg-jingga-100 py-1 px-3 flex items-center justify-between'>
										<div>
											<div className='font-light'>{item.iuran}</div>
											{/* <div className='text-xs'>{item.cr_at}</div> */}
											<div className='text-xs'> {format(addHours(item.cr_at, 7), 'yyyy-MM-dd HH:mm:ss')}</div>
										</div>
										<div className='font-light'>
											{(item.nominal * item.qty).toLocaleString('id-ID', {
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
				</div>
				{info && (
					<div className='rounded-sm text-jingga-800 bg-jingga-300 mt-2 px-2 py-4 border border-base-300 text-center italic font-light'>
						<span>{info}</span>
					</div>
				)}
			</div>
		);
	}

	return (
		<>
			<CardHeader title='Riwayat Iuran' />
			{isLoading ? <Loading /> : !iuran || iuran.length == 0 ? <AlertNotFound /> : <RenderIuran />}
		</>
	);
}
export default IuranPage;

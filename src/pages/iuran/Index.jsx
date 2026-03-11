import { useEffect, useState } from 'react';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import CardHeader from '../../components/CardHeader';
import apiGet from '@/api/api-get';
import AlertNotFound from '../../components/AlertNotFound';
import RenderTahun from './RenderTahun';
import RenderFooter from './RenderFooter';

function IuranPage() {
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		apiGet({ endPoint: 'iuran' }).then((res) => {
			if (res) {
				const { iuran, message } = res;
				const result = groupByThAjaranH(iuran);
				// console.log('🚀 ~ apiGet ~ result:', result);
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
						totalLunas: 0, // Tambahkan total awal
					};
				}

				const total = item.nominal;
				const totalLunas = item.lunas ? item.nominal : 0; // Hitung total lunas

				acc[item.th_ajaran_h].data.push(item);
				acc[item.th_ajaran_h].totalLunas += totalLunas; // Tambahkan ke total lunas
				acc[item.th_ajaran_h].total += total; // Tambahkan ke total group

				return acc;
			}, {}),
		);
	}

	return (
		<>
			<CardHeader title='Riwayat Iuran' />
			{isLoading && <LoadingAbsolute />}
			{!iuran || iuran.length == 0 ? (
				<AlertNotFound />
			) : (
				<>
					<div className='overflow-hidden border rounded-md border-accent'>
						{iuran.map((item, index) => (
							<RenderTahun
								key={item.th_ajaran_h}
								iuran={item}
								className={index == 0 ? '' : 'border-t border-accent'}
								title='Klik untuk melihat selengkapnya'
							/>
						))}
					</div>
					{info && (
						<div className='px-2 py-4 mt-2 text-sm italic font-light text-center rounded-sm text-info-content bg-info'>
							{info}
						</div>
					)}
					<RenderFooter />
				</>
			)}
		</>
	);
}
export default IuranPage;

import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import CardHeader from '@/components/CardHeader';
import apiGet from '@/api/api-get';
import AlertNotFound from '@/components/AlertNotFound';
import RenderTahun from './RenderTahun';
import RenderFooter from './RenderFooter';

function IuranPage() {
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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
			{isLoading ? (
				<Loading />
			) : !iuran || iuran.length == 0 ? (
				<AlertNotFound />
			) : (
				<div className=''>
					<div className='overflow-hidden border rounded-md border-jingga-300/75'>
						{iuran.map((item, index) => (
							<RenderTahun
								key={item.th_ajaran_h}
								iuran={item}
								className={index == 0 ? '' : 'border-t border-jingga-300/75'}
								title='Klik untuk melihat selengkapnya'
							/>
						))}
					</div>
					{info && (
						<div className='px-2 py-4 mt-2 italic font-light text-sm text-center border rounded-sm text-jingga-800 bg-jingga-300 border-jingga-400'>
							{info}
						</div>
					)}
					<RenderFooter />
				</div>
			)}
		</>
	);
}
export default IuranPage;

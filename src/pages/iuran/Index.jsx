import { useEffect, useState } from 'react';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import CardHeader from '../../components/CardHeader';
import AlertNotFound from '../../components/AlertNotFound';
import RenderTahun from './RenderTahun';
import { getIuran } from '../../models/santri';
import RenderMidtrans from './RenderMidtrans';

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

function IuranPage() {
	const [iuranGroup, setIuranGroup] = useState(null);
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getIuran()
			.then((res) => {
				if (res) {
					const { iuran, message } = res;
					setIuran(iuran);
					const result = groupByThAjaranH(iuran);
					setIuranGroup(result);
					setInfo(message);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<CardHeader title='Riwayat Iuran' />
			{isLoading && <LoadingAbsolute />}
			{/* {console.log(iuran)} */}
			{!iuranGroup || iuranGroup.length == 0 ? (
				<AlertNotFound />
			) : (
				<>
					<div className='overflow-hidden border rounded-md border-accent'>
						{iuranGroup.map((item, index) => (
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
					<RenderMidtrans iuran={iuran} />
				</>
			)}
		</>
	);
}
export default IuranPage;

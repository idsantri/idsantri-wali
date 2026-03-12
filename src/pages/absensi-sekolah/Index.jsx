import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
import CardKelas from '../../components/CardKelas';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import { getBulanHijri } from '@/utils/hijri';
import AlertNotFound from '../../components/AlertNotFound';
import { useReadLocalStorage } from 'usehooks-ts';
import { getAbsensi } from '../../models/madrasah';

function Index() {
	const { kelas_id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [absensi, setAbsensi] = useState(null);
	const category = 'sekolah';

	const kelas = useReadLocalStorage('kelas');
	const kelasData = kelas.find((item) => item.id == kelas_id);

	useEffect(() => {
		setIsLoading(true);
		getAbsensi(kelas_id, category)
			.then((data) => {
				if (data && data.absensi_sekolah) {
					setAbsensi(data.absensi_sekolah);
				}
			})
			.finally(() => setIsLoading(false));
	}, [kelas_id]);

	function RenderAbsensi({ absensi, className }) {
		return (
			<div className={`${className} w-full my-2 border rounded-md border-accent/75`}>
				<div className='p-2 text-center bg-accent/25 text-accent-content'>Data Absensi Sekolah</div>
				<div className='px-2 py-4 text-center'>
					{!absensi || absensi.length === 0 ? (
						<AlertNotFound />
					) : (
						<div className='overflow-x-auto'>
							<table className='table'>
								<thead>
									<tr className='bg-secondary/50 text-secondary-content'>
										<th className='font-medium'>Bulan</th>
										<th className='font-medium text-center'>Sakit</th>
										<th className='font-medium text-center'>Izin</th>
										<th className='font-medium text-center'>Alpa</th>
										<th className='font-medium text-center'>Terlambat</th>
									</tr>
								</thead>
								<tbody>
									{absensi.map((n, i) => (
										<RenderItem key={i} absensi={n} />
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		);
	}

	function RenderItem({ absensi: a }) {
		const intBulan = a.bulan_ujian.substring(0, 2);
		return (
			<tr>
				<td>{getBulanHijri(intBulan)}</td>
				<td className='text-center'>
					{(parseInt(a.p1s) || 0) +
						(parseInt(a.p2s) || 0) +
						(parseInt(a.p3s) || 0) +
						(parseInt(a.p4s) || 0) +
						(parseInt(a.p5s) || 0)}
				</td>
				<td className='text-center'>
					{(parseInt(a.p1i) || 0) +
						(parseInt(a.p2i) || 0) +
						(parseInt(a.p3i) || 0) +
						(parseInt(a.p4i) || 0) +
						(parseInt(a.p5i) || 0)}
				</td>
				<td className='text-center'>
					{(parseInt(a.p1a) || 0) +
						(parseInt(a.p2a) || 0) +
						(parseInt(a.p3a) || 0) +
						(parseInt(a.p4a) || 0) +
						(parseInt(a.p5a) || 0)}
				</td>
				<td className='text-center'>
					{(parseInt(a.p1t) || 0) +
						(parseInt(a.p2t) || 0) +
						(parseInt(a.p3t) || 0) +
						(parseInt(a.p4t) || 0) +
						(parseInt(a.p5t) || 0)}
				</td>
			</tr>
		);
	}
	return (
		<>
			<CardHeader title='Absensi Sekolah' />
			<CardKelas data={kelasData} />
			{isLoading && <LoadingAbsolute />}
			<RenderAbsensi absensi={absensi} />
		</>
	);
}

export default Index;

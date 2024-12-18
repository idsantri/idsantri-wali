import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import apiGet from '@/api/api-get';
import CardHeader from '@/components/CardHeader';
import Rating from 'react-rating';
import { Icon } from '@iconify/react/dist/iconify.js';

function Index() {
	const { kelas_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [nilaiAhwal, setNilaiAhwal] = useState(null);

	const kelas = JSON.parse(localStorage.getItem('kelas')) || [];
	const kelasData = kelas.find((item) => item.id == kelas_id);

	useEffect(() => {
		apiGet({ endPoint: 'nilai-ahwal', params: { kelas_id } }).then((data) => {
			if (data) {
				setNilaiAhwal(data.nilai_ahwal);
				// console.log(nilaiAhwal);
			}
			setIsLoading(false);
		});
	}, [kelas_id]);

	function RenderKelas({ className }) {
		return (
			<div className={`${className} w-full border rounded-md border-jingga-200 bg-jingga-100`}>
				<div className='px-2 py-4 text-center text-jingga-800 bg-jingga-300'>
					{kelasData.th_ajaran_h} | {kelasData.tingkat} | {kelasData.kelas}
				</div>
			</div>
		);
	}

	function RenderNilai({ nilai, className }) {
		return (
			<div className={`${className} w-full my-2 border rounded-md border-jingga-200 bg-jingga-200`}>
				<div className='p-2 text-center bg-jingga-300 text-jingga-900'>Data Nilai Ahwal (Kepribadian)</div>
				<div className='px-2 py-4 text-center text-jingga-800'>
					{!nilai || nilai.length === 0 ? (
						<div className='p-4 italic font-light text-center text-red-900 bg-red-200 rounded-md'>
							Tidak ada data untuk ditampilkan!
						</div>
					) : (
						<div className='overflow-x-auto'>
							<table className='table'>
								<thead>
									<tr className='text-jingga-800'>
										<th className='font-medium'>Cawu/Semester</th>
										<th className='font-medium'>Kesopanan</th>
										<th className='font-medium'>Kedisiplinan</th>
										<th className='font-medium'>Kerapian</th>
									</tr>
								</thead>
								<tbody>
									{nilai.map((n, i) => (
										<RenderItem nilai={n} index={i} key={i} />
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		);
	}

	function RenderItem({ nilai }) {
		return (
			<>
				<tr className='text-nowrap'>
					<td>Ke-{nilai.ujian_ke}</td>
					<td className=''>
						<Rating
							initialRating={nilai.sopan}
							readonly
							emptySymbol={<Icon icon='mdi:star-outline' className='icon' />}
							fullSymbol={<Icon icon='mdi:star' className='icon' />}
						/>
						{/* {nilai.sopan} */}
					</td>
					<td>
						<Rating
							initialRating={nilai.disiplin}
							readonly
							emptySymbol={<Icon icon='mdi:star-outline' className='icon' />}
							fullSymbol={<Icon icon='mdi:star' className='icon' />}
						/>
						{/* {nilai.disiplin} */}
					</td>
					<td>
						<Rating
							initialRating={nilai.rapi}
							readonly
							emptySymbol={<Icon icon='mdi:star-outline' className='icon' />}
							fullSymbol={<Icon icon='mdi:star' className='icon' />}
						/>
						{/* {nilai.rapi} */}
					</td>
				</tr>
			</>
		);
	}
	return (
		<>
			<CardHeader title='Nilai Mata Pelajaran' />
			<RenderKelas />
			{isLoading ? <Loading /> : <RenderNilai nilai={nilaiAhwal} />}
		</>
	);
}

export default Index;

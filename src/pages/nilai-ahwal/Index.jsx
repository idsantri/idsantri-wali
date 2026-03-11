import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '@/api/api-get';
import CardHeader from '../../components/CardHeader';
import Rating from 'react-rating';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardKelas from '../../components/CardKelas';
import AlertNotFound from '../../components/AlertNotFound';
import LoadingAbsolute from '../../components/LoadingAbsolute';

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

	function RenderNilai({ nilai, className }) {
		return (
			<div className={`${className} w-full my-2 border rounded-md border-accent/75`}>
				<div className='p-2 text-center bg-accent/25 text-accent-content'>Data Nilai Ahwal (Kepribadian)</div>
				<div className='px-2 py-4 text-center'>
					{!nilai || nilai.length === 0 ? (
						<AlertNotFound />
					) : (
						<div className='overflow-x-auto'>
							<table className='table'>
								<thead>
									<tr className='text-center bg-secondary/50 text-secondary-content'>
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
			<CardKelas data={kelasData} />
			{isLoading && <LoadingAbsolute />}
			<RenderNilai nilai={nilaiAhwal} />
		</>
	);
}

export default Index;

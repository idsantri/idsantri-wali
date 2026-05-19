import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
import Rating from 'react-rating';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardKelas from '../../components/CardKelas';
import AlertNotFound from '../../components/AlertNotFound';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import { getNilaiAhwal } from '../../models/madrasah';
import { useReadLocalStorage } from 'usehooks-ts';

function Index() {
	const { kelas_id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [nilaiAhwal, setNilaiAhwal] = useState(null);

	const kelas = useReadLocalStorage('kelas');
	const kelasData = kelas.find((item) => item.id == kelas_id);

	useEffect(() => {
		setIsLoading(true);
		getNilaiAhwal(kelas_id)
			.then((data) => {
				if (data && data.nilai_ahwal) {
					setNilaiAhwal(data.nilai_ahwal);
				}
			})
			.finally(() => setIsLoading(false));
	}, [kelas_id]);

	function RenderNilai({ nilai }) {
		return (
			<div className='w-full border rounded-md border-accent/75'>
				<div className='overflow-x-auto'>
					<table className='table'>
						<thead>
							<tr className='text-center bg-secondary/50 text-secondary-content'>
								<th className='font-light'>Cawu/Semester</th>
								<th className='font-light'>Kesopanan</th>
								<th className='font-light'>Kedisiplinan</th>
								<th className='font-light'>Kerapian</th>
							</tr>
						</thead>
						<tbody>
							{nilai.map((n, i) => (
								<RenderItem nilai={n} index={i} key={i} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	function RenderItem({ nilai }) {
		return (
			<>
				<tr className='text-nowrap'>
					<td>Ke-{nilai.ujian_ke}</td>
					<td className='text-primary'>
						<Rating
							initialRating={nilai.sopan}
							readonly
							emptySymbol={<Icon icon='mdi:star-outline' className='icon' />}
							fullSymbol={<Icon icon='mdi:star' className='icon' />}
						/>
						{/* {nilai.sopan} */}
					</td>
					<td className='text-primary'>
						<Rating
							initialRating={nilai.disiplin}
							readonly
							emptySymbol={<Icon icon='mdi:star-outline' className='icon' />}
							fullSymbol={<Icon icon='mdi:star' className='icon' />}
						/>
						{/* {nilai.disiplin} */}
					</td>
					<td className='text-primary'>
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
			<CardHeader title='Nilai Kepribadian' />
			<CardKelas data={kelasData} />
			{isLoading && <LoadingAbsolute />}
			<div className='my-2'>
				{!nilaiAhwal || nilaiAhwal.length === 0 ? <AlertNotFound /> : <RenderNilai nilai={nilaiAhwal} />}
			</div>
		</>
	);
}

export default Index;

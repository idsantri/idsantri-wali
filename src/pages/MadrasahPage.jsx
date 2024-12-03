import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';

function KelasPage() {
	const [kelas, setKelas] = useState(null);

	useEffect(() => {
		apiGet('/kelas')
			.then((res) => {
				setKelas(res.data.kelas);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<CardHeader title='Riwayat Kelas' />

			{!kelas ? (
				<Loading />
			) : kelas.length == 0 ? (
				<div role='alert' className='alert alert-info rounded-sm text-center bg-jingga-600 text-jingga-100'>
					<span> Yang bersangkutan belum memiliki riwayat kelas!</span>
				</div>
			) : (
				<div className='join join-vertical w-full rounded-sm '>
					{kelas.map((k) => (
						<div className='collapse collapse-arrow join-item border-base-300 border bg-jingga-100' key={k.id}>
							<input name='radio' type='radio' className='' />
							<div className='collapse-title font-light'>
								{k.th_ajaran_h} | {k.tingkat_id} | {k.kelas}
							</div>
							<div className='collapse-content'>
								<div className='flex gap-2 mt-3'>
									<Link className='btn btn-ghost btn-outline btn-sm font-light' to={`/kelas/${k.id}/nilai`}>
										Nilai
									</Link>
									<Link className='btn btn-ghost btn-outline btn-sm font-light' to={`/kelas/${k.id}/absensi`}>
										Absensi
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* <pre className='mt-3'>{JSON.stringify(kelas, null, 2)}</pre> */}
		</>
	);
}
export default KelasPage;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import AlertNotFound from '../components/AlertNotFound';

function KelasPage() {
	const [kelas, setKelas] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiGet({ endPoint: 'kelas' }).then((data) => {
			if (data) setKelas(data.kelas);
			setIsLoading(false);
		});
	}, []);

	function RenderKelas() {
		return (
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
		);
	}

	return (
		<>
			<CardHeader title='Riwayat Kelas' />
			{isLoading ? <Loading /> : !kelas || kelas.length === 0 ? <AlertNotFound /> : <RenderKelas />}
		</>
	);
}
export default KelasPage;

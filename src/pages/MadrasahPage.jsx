import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api';
import useNotify from '../hooks/use-notify';
import Notify from '../components/__Notify--';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';

function KelasPage() {
	const { objNotify, setObjNotify } = useNotify();
	const santri = JSON.parse(localStorage.getItem('santri'));
	const [kelas, setKelas] = useState(null);
	useEffect(() => {
		apiGet('/kelas')
			.then((res) => {
				setKelas(res.data.kelas);
			})
			.catch((error) => {
				setObjNotify((prevNotify) => ({
					...prevNotify,
					message: error.response?.data?.message || 'Terjadi kesalahan',
					show: true,
					code: error.status,
				}));
			});
	}, [setObjNotify]);

	return (
		<>
			<CardHeader>Riwayat Kelas</CardHeader>
			<div className='my-2 bg-color2 text-center rounded-sm'>
				<div className='p-2 fw-bold'>
					<div>{santri.nama}</div>
					<div className='text-sm font-light'>{santri.data_akhir}</div>
				</div>
			</div>
			<Notify {...objNotify} />

			{!kelas ? (
				<Loading />
			) : kelas.length == 0 ? (
				<div role='alert' className='alert alert-warning rounded-sm text-center text-color8'>
					<span> Yang bersangkutan belum memiliki riwayat kelas!</span>
				</div>
			) : (
				<div className='join join-vertical w-full rounded-sm'>
					{kelas.map((k) => (
						<div className='collapse collapse-arrow join-item border-base-300 border bg-color0' key={k.id}>
							<input name='radio' type='radio' />
							<div className='collapse-title font-light'>
								{k.th_ajaran_h} | {k.tingkat_id} | {k.kelas}
							</div>
							<div className='collapse-content'>
								<div className='flex gap-2'>
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

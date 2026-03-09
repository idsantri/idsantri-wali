import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardHeader from '../../components/CardHeader';
import apiGet from '@/api/api-get';
import AlertNotFound from '../../components/AlertNotFound';
import LoadingAbsolute from '../../components/LoadingAbsolute';

function KelasPage() {
	const [kelas, setKelas] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		apiGet({ endPoint: 'kelas' }).then((data) => {
			if (data) setKelas(data.kelas);
			localStorage.setItem('kelas', JSON.stringify(data.kelas));
			setIsLoading(false);
		});
	}, []);

	function RenderItem({ kelas, ...props }) {
		const [show, setShow] = useState(false);
		return (
			<div {...props} className='w-full my-1 border rounded-md border-accent bg-accent/10 text-base-content'>
				<div
					className='flex items-center justify-between px-2 py-4 cursor-pointer text-base-content'
					onClick={() => setShow(!show)}
				>
					<div className='text-sm'>
						{kelas.th_ajaran_h} | {kelas.tingkat} | {kelas.kelas}
					</div>
					<Icon icon={show ? 'entypo:chevron-up' : 'entypo:chevron-down'} width='1em' />
				</div>
				<AnimatePresence>
					{show && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className='px-2 py-2 bg-accent/15 '>
								<div className='mb-2'>
									<span className='text-sm font-light'> Wali Kelas: </span>{' '}
									<span className='text-sm'>{kelas.wali_kelas || '-'}</span>
								</div>
								<div className='flex flex-wrap gap-2 text-nowrap'>
									<Link
										className='w-24 font-light btn btn-primary btn-sm'
										to={`/kelas/${kelas.id}/nilai-mapel`}
									>
										Nilai Mapel
									</Link>
									<Link
										className='w-24 font-light btn btn-success btn-sm'
										to={`/kelas/${kelas.id}/nilai-ahwal`}
									>
										Nilai Ahwal
									</Link>
									<Link
										className='w-24 font-light btn btn-warning btn-sm'
										to={`/kelas/${kelas.id}/absensi-sekolah`}
									>
										Absensi
									</Link>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}
	return (
		<>
			<CardHeader title='Riwayat Kelas' />
			{isLoading && <LoadingAbsolute />}
			{!kelas || kelas.length === 0 ? <AlertNotFound /> : kelas.map((k) => <RenderItem key={k.id} kelas={k} />)}
		</>
	);
}
export default KelasPage;

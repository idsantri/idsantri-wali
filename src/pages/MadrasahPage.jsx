import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import AlertNotFound from '../components/AlertNotFound';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';

function KelasPage() {
	const [kelas, setKelas] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiGet({ endPoint: 'kelas' }).then((data) => {
			if (data) setKelas(data.kelas);
			setIsLoading(false);
		});
	}, []);

	function RenderItem({ kelas, ...props }) {
		const [show, setShow] = useState(false);
		return (
			<div {...props}>
				<div className='w-full my-1 border rounded-md border-jingga-200 bg-jingga-100'>
					<div
						className='flex items-center justify-between px-2 py-4 cursor-pointer text-jingga-800'
						onClick={() => setShow(!show)}
					>
						<div>
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
								<div className='px-2 py-2 bg-jingga-300/25'>
									<div className='mb-2'>
										<span className='text-sm font-light'> Wali Kelas: </span>{' '}
										<span className='text-sm'>{kelas.wali_kelas || '-'}</span>
									</div>
									<div className='flex gap-2'>
										<Link
											className='font-light btn btn-ghost btn-outline btn-sm'
											to={`/kelas/${kelas.id}/nilai`}
										>
											Nilai
										</Link>
										<Link
											className='font-light btn btn-ghost btn-outline btn-sm'
											to={`/kelas/${kelas.id}/absensi`}
										>
											Absensi
										</Link>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		);
	}
	return (
		<>
			<CardHeader title='Riwayat Kelas' />
			{isLoading ? (
				<Loading />
			) : !kelas || kelas.length === 0 ? (
				<AlertNotFound />
			) : (
				kelas.map((k) => <RenderItem key={k.id} kelas={k} />)
			)}
		</>
	);
}
export default KelasPage;

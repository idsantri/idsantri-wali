import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import AlertNotFound from '../components/AlertNotFound';
import { addHours, format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';

function IuranPage() {
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		apiGet({ endPoint: 'iuran' }).then((res) => {
			if (res) {
				const { iuran, message } = res;
				const result = groupByThAjaranH(iuran);
				setIuran(result);
				setInfo(message);
			}
			setIsLoading(false);
		});
	}, []);

	function groupByThAjaranH(data) {
		return Object.values(
			data.reduce((acc, item) => {
				if (!acc[item.th_ajaran_h]) {
					acc[item.th_ajaran_h] = {
						th_ajaran_h: item.th_ajaran_h,
						data: [],
						total: 0, // Tambahkan total awal
					};
				}

				// Hitung total dengan nominal * qty
				const total = item.nominal * item.qty;

				acc[item.th_ajaran_h].data.push(item);
				acc[item.th_ajaran_h].total += total; // Tambahkan ke total group

				return acc;
			}, {}),
		);
	}

	function RenderDetail({ item, index, ...props }) {
		return (
			<div {...props} className={`flex items-center justify-between p-1 ${index == 0 ? '' : 'border-t border-jingga-300'}`}>
				<div>
					<div>{item.iuran}</div>
					<div className='text-xs italic'>{format(addHours(item.cr_at, 7), 'yyyy-MM-dd')}</div>
				</div>
				<div className=''>
					{(item.nominal * item.qty).toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
				</div>
			</div>
		);
	}

	function RenderItem({ iuran, className, ...props }) {
		const [showDetail, setShowDetail] = useState(false);
		const data = iuran.data;
		// console.log('🚀 ~ CardIuran ~ iuran:', iuran);
		return (
			<div {...props} className={`px-2 py-2 bg-jingga-200/50 ${className}`}>
				<div className='flex items-center justify-between py-2 cursor-pointer ' onClick={() => setShowDetail(!showDetail)}>
					<div className=''>
						<span className='text-sm font-normal'>Th Ajaran: </span>
						<span className='font-normal text-jingga-800'>{iuran.th_ajaran_h}</span>
					</div>
					<div className='flex items-center gap-2 text-jingga-800'>
						<div className='font-semibold '>
							{iuran.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
						</div>
						<Icon icon={showDetail ? 'entypo:chevron-up' : 'entypo:chevron-down'} width='1em' />
					</div>
				</div>
				<AnimatePresence>
					{showDetail && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className='px-2 bg-jingga-300/25'
						>
							{data.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{
										duration: 0.2,
										delay: 0.1,
									}}
								>
									<RenderDetail item={item} index={index} />
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}
	return (
		<>
			<CardHeader title='Riwayat Iuran' />
			{isLoading ? (
				<Loading />
			) : !iuran || iuran.length == 0 ? (
				<AlertNotFound />
			) : (
				<>
					<div className='overflow-hidden border rounded-md border-jingga-300/75'>
						{iuran.map((item, index) => (
							<RenderItem key={item.th_ajaran_h} iuran={item} className={index == 0 ? '' : 'border-t border-jingga-300/75'} title='Klik untuk melihat selengkapnya' />
						))}
					</div>
					{info && (
						<div className='px-2 py-4 mt-2 italic font-light text-center border rounded-sm text-jingga-800 bg-jingga-300 border-base-300'>
							<span>{info}</span>
						</div>
					)}
				</>
			)}
		</>
	);
}
export default IuranPage;

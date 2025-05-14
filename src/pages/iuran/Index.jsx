import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import CardHeader from '@/components/CardHeader';
import apiGet from '@/api/api-get';
import AlertNotFound from '@/components/AlertNotFound';
// import { addHours, format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';

function IuranPage() {
	const [iuran, setIuran] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const appWali = JSON.parse(localStorage.getItem('app_wali')) ?? null;
	const santri = JSON.parse(localStorage.getItem('santri')) ?? null;
	const textWa = `Assalamu'alaikum, \nSaya ingin melakukan pembayaran iuran santri untuk \n- Nama: ${santri?.nama} \n- ID Santri: ${santri?.id} \n`;
	useEffect(() => {
		apiGet({ endPoint: 'iuran' }).then((res) => {
			if (res) {
				const { iuran, message } = res;
				const result = groupByThAjaranH(iuran);
				// console.log('🚀 ~ apiGet ~ result:', result);
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
						totalLunas: 0, // Tambahkan total awal
					};
				}

				const total = item.nominal;
				const totalLunas = item.lunas ? item.nominal : 0; // Hitung total lunas

				acc[item.th_ajaran_h].data.push(item);
				acc[item.th_ajaran_h].totalLunas += totalLunas; // Tambahkan ke total lunas
				acc[item.th_ajaran_h].total += total; // Tambahkan ke total group

				return acc;
			}, {}),
		);
	}

	function RenderRow({ item }) {
		return (
			<motion.tr
				key={item.id}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{
					duration: 0.2,
					delay: 0.1,
				}}
				className='border-t border-jingga-300/50'
			>
				<td className=''>{item.item}</td>
				<td className=' text-right font-semibold'>
					{item.nominal.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
				</td>
				<td className=' text-nowrap text-center '>
					{item.lunas ? (
						<div className='badge badge-success text-jingga-200 text-xs'>Ya</div>
					) : (
						<div className='badge badge-error text-jingga-200 text-xs'>Tidak</div>
					)}
				</td>
			</motion.tr>
		);
	}

	function RenderItem({ iuran, className, ...props }) {
		const [showDetail, setShowDetail] = useState(false);
		const data = iuran.data;
		// console.log('🚀 ~ CardIuran ~ iuran:', iuran);
		const notLunas = Number(iuran.totalLunas ?? 0) - Number(iuran.total ?? 0);
		// console.log('🚀 ~ RenderItem ~ notLunas:', notLunas);
		return (
			<div {...props} className={`px-2 py-2 bg-jingga-200/50 ${className}`}>
				<div
					className='flex items-center justify-between py-2 cursor-pointer '
					onClick={() => setShowDetail(!showDetail)}
				>
					<div className=''>
						<span className='text-sm font-normal'>Th Ajaran: </span>
						<span className='font-normal text-jingga-800'>{iuran.th_ajaran_h}</span>
					</div>
					<div className='flex items-center gap-2 text-jingga-800'>
						<div className='font-semibold '>
							{notLunas.toLocaleString('id-ID', {
								style: 'currency',
								currency: 'IDR',
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							})}
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
							className=''
						>
							<div className='overflow-x-auto rounded-md border border-jingga-300/75'>
								<table className='table text-xs text-jingga-800 table-sm'>
									<thead>
										<tr className='bg-jingga-300/25 border-none'>
											<th className=''>Item</th>
											<th className=' text-right'>Tagihan</th>
											<th className=' text-center'>Lunas</th>
											{/* <th className=''>Tanggal Pembayaran</th> */}
										</tr>
									</thead>
									<tbody>
										{data.map((item) => (
											<RenderRow key={item.id} item={item} />
										))}
									</tbody>
								</table>
							</div>
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
				<div className=''>
					<div className='overflow-hidden border rounded-md border-jingga-300/75'>
						{iuran.map((item, index) => (
							<RenderItem
								key={item.th_ajaran_h}
								iuran={item}
								className={index == 0 ? '' : 'border-t border-jingga-300/75'}
								title='Klik untuk melihat selengkapnya'
							/>
						))}
					</div>
					{info && (
						<div className='px-2 py-4 mt-2 italic font-light text-sm text-center border rounded-sm text-jingga-800 bg-jingga-300 border-jingga-400'>
							{info}
						</div>
					)}
					<div className='mt-2 border rounded-sm text-jingga-800 bg-jingga-200 border-jingga-400 flex items-center justify-between'>
						<div className='p-4 ml-4'>Info Pembayaran</div>
						<a
							target='_blank'
							href={'https://wa.me/' + appWali?.cs + '?text=' + encodeURIComponent(textWa)}
							className='p-4 mr-4'
						>
							<Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
						</a>
					</div>
				</div>
			)}
		</>
	);
}
export default IuranPage;

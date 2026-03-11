import { AnimatePresence, motion } from 'framer-motion';
import RenderItem from './RenderItem';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

function RenderTahun({ iuran, className, ...props }) {
	const [showDetail, setShowDetail] = useState(false);
	const data = iuran.data;
	const notLunas = Number(iuran.totalLunas ?? 0) - Number(iuran.total ?? 0);

	return (
		<div {...props} className={`px-2 py-2 bg-accent/10 ${className}`}>
			<div
				className='flex items-center justify-between py-2 cursor-pointer '
				onClick={() => setShowDetail(!showDetail)}
			>
				<div className='text-sm'>
					<span className=''>Th Ajaran: </span>
					<span className='font-bold'>{iuran.th_ajaran_h}</span>
				</div>
				<div className='flex items-center gap-2'>
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
						<div className='overflow-x-auto border rounded-md border-accent/50 bg-accent/15'>
							<div className='table text-xs table-sm'>
								{data.map((item, index) => (
									<RenderItem key={item.id} item={item} index={index} />
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
export default RenderTahun;

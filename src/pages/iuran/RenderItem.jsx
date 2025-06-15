import { notifyError, notifySuccess } from '../../components/Notify';
import { motion } from 'framer-motion';

function RenderItem({ item, index }) {
	// console.log('🚀 ~ RenderItem ~ item:', item);
	async function copyText(text) {
		try {
			await navigator.clipboard.writeText(text);
			notifySuccess({
				message: `<span class="text-xs">Virtual Account berhasil disalin: <strong>${text}</strong></span>`,
				position: 'bottom-center',
				autoClose: 3000,
			});
			return true;
		} catch (err) {
			notifyError({
				message: `<span class="text-xs">Gagal menyalin VA: <strong>${err}</strong></span>`,
				position: 'bottom-center',
				autoClose: 3000,
			});
			return false;
		}
	}

	return (
		<motion.div
			key={item.id}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{
				duration: 0.2,
				delay: 0.1,
			}}
			className={index != 0 ? 'border-t border-jingga-300/75 px-2 py-2' : 'px-2 py-2'}
			title=''
		>
			<div className='flex items-center justify-between mb-1'>
				<div className=''>{item.item}</div>
				<div className=' text-right font-semibold'>
					{item.nominal.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
				</div>
			</div>
			<div className='flex items-center justify-between text-xs text-jingga-800'>
				<div className=' text-nowrap text-center '>
					{item.lunas ? (
						<div className='badge badge-success text-jingga-200 text-xs'>Lunas</div>
					) : (
						<div className='badge badge-error text-jingga-200 text-xs'>Belum Lunas</div>
					)}
				</div>
				<div>
					{!item.lunas && item.bank_va ? (
						<>
							{item.bank_name}: {item.bank_va}
							<button
								className='badge badge-outline text-jingga-700 text-xs ml-2'
								onClick={() => copyText(item.bank_va)}
							>
								Salin
							</button>
						</>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default RenderItem;

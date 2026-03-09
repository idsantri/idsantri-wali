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
			className={index != 0 ? 'border-t border-accent/50 px-2 py-2' : 'px-2 py-2'}
			title=''
		>
			<div className='flex items-center justify-between mb-1'>
				<div className=''>{item.item}</div>
				<div className='font-semibold text-right '>
					{item.nominal.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
				</div>
			</div>
			<div className='flex items-center justify-between text-xs'>
				<div className='text-center text-nowrap'>
					{item.lunas ? (
						<div className='text-xs badge badge-primary '>Lunas</div>
					) : (
						<div className='text-xs badge badge-error '>Belum Lunas</div>
					)}
				</div>
				<div>
					{!item.lunas && item.bank_va ? (
						<>
							{item.bank_name}: {String(item.bank_va).replace(/(\d{4})(?=\d)/g, '$1.')}
							<button className='ml-2 text-xs badge badge-outline' onClick={() => copyText(item.bank_va)}>
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

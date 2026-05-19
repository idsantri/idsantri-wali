import { Icon } from '@iconify/react/dist/iconify.js';
import parse from 'html-react-parser';

function RenderFooter() {
	const app_wali = JSON.parse(localStorage.getItem('app_wali')) ?? null;
	const santri = JSON.parse(localStorage.getItem('santri')) ?? null;
	const va = JSON.parse(localStorage.getItem('va')) ?? null;
	// console.log('🚀 ~ IuranPage ~ va:', va);
	const textWa = `Assalamu'alaikum, \nSaya ingin melakukan pembayaran iuran santri untuk \n- Nama: ${santri?.nama} \n- ID Santri: ${santri?.id} \n`;

	return (
		<div className='mt-2 overflow-hidden rounded-md text-info-content'>
			{va?.info && <div className='p-4 text-sm bg-info/50'>{parse(va.info)}</div>}
			<div className='flex items-center justify-between p-4 bg-info/25'>
				<a
					href={va?.link_info_pembayaran || '#'}
					target='_blank'
					className={
						va?.link_info_pembayaran
							? ' text-blue-500 hover:text-blue-700 underline'
							: ' text-gray-500 cursor-not-allowed'
					}
				>
					Petunjuk Pembayaran
				</a>
				<a
					target='_blank'
					href={'https://wa.me/' + app_wali?.cs + '?text=' + encodeURIComponent(textWa)}
					className=''
				>
					<Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
				</a>
			</div>
		</div>
	);
}
export default RenderFooter;

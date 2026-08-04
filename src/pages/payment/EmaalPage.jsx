import { Link } from 'react-router-dom';
import CardHeader from '../../components/CardHeader';
import { Icon } from '@iconify/react/dist/iconify.js';
import config from '../../config';

const EmaalPage = () => {
	const santri = JSON.parse(localStorage.getItem('santri') || 'null');
	return (
		<>
			<CardHeader title='Bayar Via Emaal' />
			<div className='space-y-2'>
				<div className='flex items-center justify-between my-4'>
					<Link to='/iuran' className='gap-1 btn btn-xs btn-outline btn-primary'>
						<Icon icon='ion:arrow-back-outline' />
						Kembali
					</Link>
				</div>
				<div className='w-full p-4 border rounded-md border-accent bg-base-200/50'>
					<div className='text-lg font-semibold'>Petunjuk Pembayaran Iuran Via Emaal</div>
					<ul className='pl-8 list-disc'>
						<li>Buka aplikasi Emaal.</li>
						<li>Pilih PESANTRENKU.</li>
						<li>Pilih {config.INS_NAME}</li>
						<li>Pada jenis pembayaran, pilih iuran/tagihan yang ingin Anda bayar.</li>
						<li>
							Masukkan ID Santri <span className='font-semibold'>{santri.id}</span>.
						</li>
						<li>Nominal akan muncul secara otomatis.</li>
						<li>Masukkan PIN.</li>
						<li>Tekan tombol Lanjut/Bayar untuk menyelesaikan pembayaran.</li>
					</ul>
					<div className='px-4 py-2 mt-4 border rounded-md border-accent bg-warning text-warning-content'>
						<div className='text-sm font-semibold'>Catatan:</div>
						<ul className='pl-6 text-sm list-disc'>
							<li>
								Pembayaran via Emaal hanya valid untuk iuran/tagihan pada tahun ajaran berjalan (saat
								ini).
							</li>
							<li>Untuk iuran/tagihan pada tahun ajaran sebelumnya, gunakan alternatif lain.</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmaalPage;

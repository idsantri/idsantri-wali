import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

function InstallPwa({ className }) {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [showInstallBanner, setShowInstallBanner] = useState(false);
	const [showIosComp, setShowIosComp] = useState(false);

	const getOS = () => {
		const userAgent = window.navigator.userAgent;
		const osList = [
			{ regex: /windows/i, name: 'Windows' },
			{ regex: /android/i, name: 'Android' },
			{ regex: /(iphone|ipad|ipod)/i, name: 'iOS' },
			{ regex: /linux/i, name: 'Linux' },
			{ regex: /mac/i, name: 'Mac/iOS' },
		];

		return osList.find(({ regex }) => regex.test(userAgent))?.name || 'Unknown OS';
	};
	const isIos = () => getOS() === 'iOS';
	const isAndroid = () => getOS() === 'Android';

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			// Mencegah browser menampilkan prompt default
			e.preventDefault();
			// Simpan event ke state
			setDeferredPrompt(e);
			// Tampilkan UI khusus untuk instalasi

			if (isIos() || isAndroid()) {
				setShowInstallBanner(true);
			}
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	});

	const installPwa = () => {
		if (deferredPrompt) {
			// Tampilkan prompt instalasi
			deferredPrompt.prompt();
			// Tangani hasil pengguna
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt');
				} else {
					console.log('User dismissed the install prompt');
				}
				// Reset event
				setDeferredPrompt(null);
				setShowInstallBanner(false);
			});
		}
	};

	return (
		<>
			{showInstallBanner && (
				<>
					<div role='alert' className={`alert rounded-md bg-jingga-600 text-jingga-100 shadow-md shadow-jingga-500 border-jingga-200 ${className}`}>
						<div className='flex items-center space-x-2'>
							<div>
								<Icon icon='typcn:info' height='32' className='text-yellow-200' />
							</div>
							<div className='text-left italic'>Instal aplikasi untuk pengalaman lebih baik!</div>
							{isAndroid() && (
								<button className='btn btn-ghost px-2 font-medium border-none bg-jingga-200 text-jingga-900 shadow-jingga-950 shadow-sm' onClick={installPwa}>
									<Icon icon='material-symbols-light:install-mobile' height='32' />
									Instal
								</button>
							)}
							{isIos() && (
								<button
									className='btn btn-ghost rounded-full btn-circle btn-sm font-medium border-none bg-jingga-200 text-jingga-900 shadow-jingga-950 shadow-sm'
									onClick={() => setShowIosComp(!showIosComp)}
								>
									{showIosComp ? <Icon icon='mingcute:down-fill' width='24' height='24' /> : <Icon icon='mingcute:up-fill' width='24' height='24' />}
								</button>
							)}
						</div>
						{showIosComp && (
							<div className='w-full text-left border rounded-md py-2 px-4 bg-jingga-700'>
								<p>Bagi Pengguna iOS!</p>
								<ul className='list-decimal list-outside font-light ml-4 text-sm'>
									<li className=''>
										Pastikan Anda menggunakan browser <span className='font-semibold'>Safari</span>;
									</li>
									<li className=''>Ketuk ikon bagikan (sebuah kotak dengan panah ke atas) di bagian bawah layar;</li>
									<li>Gulir ke bawah dalam menu bagikan dan pilih opsi &lsquo;Tambahkan ke Layar Utama&rdquo;;</li>
									<li>Anda mungkin akan diminta untuk memberikan nama dan mengonfigurasi ikon;</li>
									<li>Ketuk &ldquo;Tambahkan&rdquo; di pojok kanan atas layar untuk menyelesaikan proses;</li>
								</ul>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default InstallPwa;

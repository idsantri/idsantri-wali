import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

function InstallPwa() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [showInstallBanner, setShowInstallBanner] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			// Mencegah browser menampilkan prompt default
			e.preventDefault();
			// Simpan event ke state
			setDeferredPrompt(e);
			// Tampilkan UI khusus untuk instalasi
			setShowInstallBanner(true);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	});

	const handleInstallClick = () => {
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
					<div role='alert' className='alert rounded-md bg-jingga-600 text-jingga-100 shadow-md shadow-jingga-500'>
						<div className='flex items-center space-x-2'>
							<div>
								<Icon icon='typcn:info' height='32' />
							</div>
							<div className='text-left italic'>Instal aplikasi untuk pengalaman lebih baik!</div>
							<button className='btn btn-ghost px-2 font-medium border-none bg-jingga-200 text-jingga-900 shadow-jingga-950 shadow-sm' onClick={handleInstallClick}>
								<Icon icon='material-symbols-light:install-mobile' height='32' />
								Instal
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default InstallPwa;

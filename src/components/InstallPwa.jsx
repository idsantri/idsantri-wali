import { useEffect, useState } from 'react';

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
					<div role='alert' className='alert rounded-md bg-jingga-500 text-jingga-100 shadow-md shadow-jingga-500'>
						<span>Install aplikasi untuk pengalaman lebih baik!</span>
						<button className='btn btn-ghost btn-outline btn-md font-medium bg-jingga-700 text-jingga-200 shadow-jingga-50 shadow-sm' onClick={handleInstallClick}>
							Install
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default InstallPwa;

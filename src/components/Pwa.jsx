import { useEffect, useState } from 'react';

function Pwa() {
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
					<div className=''>
						<div role='alert' className='alert alert-info rounded-md'>
							<span>Install aplikasi untuk pengalaman lebih baik!</span>
							<button className='btn btn-ghost btn-outline' onClick={handleInstallClick}>
								Install
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Pwa;

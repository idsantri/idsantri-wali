import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

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
				<Alert variant='success' className='m-0'>
					<Alert.Heading>Install</Alert.Heading>
					<p>Install aplikasi untuk pengalaman lebih baik!</p>
					<Button variant='success' className='d-flex ms-auto' onClick={handleInstallClick}>
						Install
					</Button>
				</Alert>
			)}
		</>
	);
}

export default Pwa;

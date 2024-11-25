import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Pendaftaran service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}

createRoot(document.getElementById('root'), { identifierPrefix: 'id-santri-' }).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

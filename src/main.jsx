import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import App from './App.jsx';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

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
		<ConfirmDialogProvider>
			<App />
		</ConfirmDialogProvider>
	</StrictMode>,
);

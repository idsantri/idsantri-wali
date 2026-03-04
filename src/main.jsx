import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmDialogProvider } from '@/context/ConfirmDialogContext';
import App from '@/App';
import './App.css';
import useThemeStore from './store/modeStore';

useThemeStore.getState().initializeTheme();

createRoot(document.getElementById('root'), { identifierPrefix: 'id-santri-' }).render(
	<StrictMode>
		<ConfirmDialogProvider>
			<App />
		</ConfirmDialogProvider>
	</StrictMode>,
);

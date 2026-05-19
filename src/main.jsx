import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import { ThemeProvider } from './context/ThemeContext';
import App from '@/App';
import './App.css';

// import { useThemeStore } from './store/themeStore';
// const theme = useThemeStore.getState()
// theme.initializeTheme();

createRoot(document.getElementById('root'), { identifierPrefix: 'id-santri-' }).render(
	<StrictMode>
		<ThemeProvider>
			<ConfirmDialogProvider>
				<App />
			</ConfirmDialogProvider>
		</ThemeProvider>
	</StrictMode>,
);

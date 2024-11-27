import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: true, // Aktifkan PWA untuk development
			},
			registerType: 'autoUpdate', // Service worker akan otomatis diperbarui
			manifest: manifest,
		}),
	],
});

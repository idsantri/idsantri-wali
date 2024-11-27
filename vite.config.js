import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate', // Untuk otomatis memperbarui service worker
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // Tambahkan aset tambahan
			manifest: manifest,
		}),
	],
	// server: {
	// 	port: 3000,
	// },
});

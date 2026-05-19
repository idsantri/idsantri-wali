import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate', // Untuk otomatis memperbarui service worker
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // Tambahkan aset tambahan
			manifest: manifest,
			devOptions: {
				enabled: false, // Aktifkan PWA untuk development
			},
		}),
	],

	server: {
		host: '0.0.0.0', // Ensure the server listens on all network interfaces
		port: 5173, // Ensure the port matches your script
	},

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
});

import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				jingga: {
					50: '#fffcf5',
					100: '#FFF2D4',
					200: '#FFE7B0',
					300: '#EBC97B',
					400: '#CCAD64',
					500: '#AD914F',
					600: '#8F763B',
					700: '#735D2A',
					800: '#5E4B1F',
					900: '#423311',
					950: '#302305',
				},
			},
		},
	},
	plugins: [daisyui],
};

import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#302305',
				white: '#fffcf5',
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
			boxShadow: {
				'md-top': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
				'sm-top': '0 -2px 4px -1px rgb(0 0 0 / 0.05), 0 -1px 2px -1px rgb(0 0 0 / 0.05)',
			},
		},
	},
	plugins: [daisyui],
};

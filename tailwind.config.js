import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			jingga: {
				50: '#fffcf5',
				100: '#fff6e3',
				200: '#eddbb0',
				300: '#c9af7f',
				400: '#af8557',
				500: '#94704a',
				600: '#7a5c3d',
				700: '#69482c',
				800: '#4a321d',
				900: '#292010',
			},
		},
		extend: {},
	},
	plugins: [daisyui],
};

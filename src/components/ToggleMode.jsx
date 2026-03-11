import { Icon } from '@iconify/react/dist/iconify.js';
import { useTheme } from '../hooks/useTheme';

function ToggleMode({ className }) {
	const { toggleTheme, isDarkMode } = useTheme();

	const isDark = isDarkMode();

	return (
		<button
			onClick={toggleTheme}
			className={`${className} p-2 rounded-full border-0 transition-colors duration-200
                ${isDark ? 'text-base-100 border-base-100 bg-warning' : 'text-accent border-accent bg-neutral-700'}`}
			title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<Icon icon={isDark ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode'} width='24' />
		</button>
	);
}

export default ToggleMode;

import { Icon } from '@iconify/react/dist/iconify.js';
import { useTheme } from '../hooks/useTheme';

function ToggleMode({ className }) {
	const { toggleTheme, isDarkMode } = useTheme();

	const isDark = isDarkMode();

	return (
		<button
			onClick={toggleTheme}
			className={`${className}
				p-2 rounded-full transition-colors duration-500 ring-offset-1 ring ring-offset-base-100
				text-accent bg-accent-content
				dark:text-accent dark:bg-warning dark:ring-warning
			`}
			title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<Icon icon={isDark ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode'} width='24' />
		</button>
	);
}

export default ToggleMode;

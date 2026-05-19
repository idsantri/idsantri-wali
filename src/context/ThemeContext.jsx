import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	// Ambil initial value dari localStorage atau default ke 'system'
	const [theme, setThemeState] = useState(() => {
		return localStorage.getItem('theme-storage') || 'system';
	});

	const themeLight = 'lemonade';
	const themeDark = 'coffee';

	const updateDOM = useCallback((currentTheme) => {
		const html = document.documentElement;
		let effectiveTheme = currentTheme;

		if (currentTheme === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			effectiveTheme = prefersDark ? 'dark' : 'light';
		}

		html.setAttribute('data-theme', effectiveTheme === 'dark' ? themeDark : themeLight);
	}, []);

	const setTheme = (mode) => {
		setThemeState(mode);
		localStorage.setItem('theme-storage', mode);
		updateDOM(mode);
	};

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	const isDarkMode = () => {
		if (theme === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return theme === 'dark';
	};

	// Effect untuk inisialisasi awal dan listener perubahan sistem
	useEffect(() => {
		updateDOM(theme);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (theme === 'system') updateDOM('system');
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [theme, updateDOM]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>{children}</ThemeContext.Provider>
	);
};

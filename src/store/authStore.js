import { create } from 'zustand';

export const useAuthStore = create((set) => ({
	auth: JSON.parse(sessionStorage.getItem('auth')) || {
		isAuthenticated: false,
		token: null,
		user: null,
	},
	login: (authData) => {
		sessionStorage.setItem('auth', JSON.stringify(authData));
		set({ auth: authData });
	},
	logout: () => {
		sessionStorage.removeItem('auth');
		set({ auth: { isAuthenticated: false, token: null, user: null } });
		window.location.href = '/login';
	},
}));

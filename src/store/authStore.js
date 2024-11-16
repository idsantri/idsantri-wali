import { create } from 'zustand';

export const useAuthStore = create((set) => ({
	auth: JSON.parse(localStorage.getItem('auth')) || {
		isAuthenticated: false,
		token: null,
		user: null,
	},
	login: (authData) => {
		localStorage.setItem('auth', JSON.stringify(authData));
		set({ auth: authData });
	},
	logout: () => {
		localStorage.removeItem('auth');
		set({
			auth: {
				isAuthenticated: false,
				token: null,
				user: null,
			},
		});
	},
}));

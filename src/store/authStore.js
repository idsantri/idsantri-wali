import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
	persist(
		(set, get) => ({
			token: null,
			isLoggedIn: false,
			login: (newToken) => {
				set({ token: newToken, isLoggedIn: true });
			},
			logout: () => {
				set({ token: null, isLoggedIn: false });
			},
		}),
		{ name: 'auth', storage: createJSONStorage(() => sessionStorage) },
	),
);

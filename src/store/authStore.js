import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login as loginApi } from '../models/auth';

export const useAuthStore = create(
	persist(
		(set, get) => ({
			token: null,
			isLoggedIn: false,
			loading: false,

			login: (santri_id, tgl_lahir) => {
				set({ loading: true });
				loginApi(santri_id, tgl_lahir)
					.then((res) => {
						if (res) {
							set({ token: res.token, isLoggedIn: true });
						}
					})
					.finally(() => set({ loading: false }));
			},

			logout: () => {
				set({ token: null, isLoggedIn: false });
			},
		}),
		{ name: 'auth', storage: createJSONStorage(() => sessionStorage) },
	),
);

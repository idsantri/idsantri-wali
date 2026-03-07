import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAuthStore from '@/store/authStore';
import { notifyError } from '@/components/Notify';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import { login as loginApi } from '../../models/auth';
import { appWali, profiles, va } from '../../models/app';

const Login = () => {
	const navigate = useNavigate();
	const { login, auth } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	useEffect(() => {
		const fetchAllData = async () => {
			setLoading(true);
			try {
				const [resWali, resProfiles, resVa] = await Promise.all([appWali(), profiles(), va()]);

				if (resWali?.app_wali) {
					localStorage.setItem('app_wali', JSON.stringify(resWali.app_wali));
				}

				if (resProfiles?.profiles) {
					localStorage.setItem('profiles', JSON.stringify(resProfiles.profiles));
				}

				if (resVa?.va) {
					localStorage.setItem('va', JSON.stringify(resVa.va));
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());
		if (!formObject.santri_id || !formObject.tgl_lahir) {
			return notifyError({ message: 'Lengkapi data login' });
		}
		setLoadingSubmit(true);
		loginApi(formObject.santri_id, formObject.tgl_lahir)
			.then((res) => {
				if (res) {
					login({
						isAuthenticated: true,
						token: res.token,
						user: { name: 'User' },
					});
				}
			})
			.finally(() => setLoadingSubmit(false));
	};

	if (auth.isAuthenticated) {
		return <Navigate to='/santri' />;
	}

	// For WhatsApp link in render
	const getAppWaliCS = () => {
		const appWali = localStorage.getItem('app_wali');
		return appWali ? JSON.parse(appWali)?.cs : null;
	};

	return (
		<>
			<h2 style={{ fontSize: '1.5em' }} className='font-normal my-7'>
				Login
			</h2>
			<form action='' onSubmit={handleLogin} className='relative'>
				{loading && <LoadingAbsolute />}
				<input
					type='text'
					name='santri_id'
					placeholder='ID Santri'
					className='w-full max-w-xs text-center input'
					readOnly
					onFocus={(e) => {
						e.target.removeAttribute('readonly');
					}}
					onBlur={(e) => {
						e.target.setAttribute('readonly', 'readonly');
					}}
					disabled={loadingSubmit}
				/>
				<input
					type='text'
					name='tgl_lahir'
					placeholder='Tanggal Lahir Santri (hhbbtttt)'
					className='w-full max-w-xs mt-3 text-center input'
					readOnly
					onFocus={(e) => {
						e.target.removeAttribute('readonly');
					}}
					onBlur={(e) => {
						e.target.setAttribute('readonly', 'readonly');
					}}
					disabled={loadingSubmit}
				/>
				<p className='pt-1 text-xs'>01012000 = 1 Januari 2000</p>
				<button type='submit' className='w-full max-w-xs mt-3 btn btn-primary' disabled={loadingSubmit}>
					{loadingSubmit ? (
						<>
							<div className='loading loading-ring loading-md' />
							<span className='font-light'>Tunggu sebentar …</span>
						</>
					) : (
						<span className='font-medium'>Login</span>
					)}
				</button>
			</form>
			<div className='mt-3'>
				<a
					target='_blank'
					className='w-full max-w-xs border-0 btn d-flex justify-content-center btn-info'
					href={'https://wa.me/' + getAppWaliCS()}
					disabled={!getAppWaliCS()}
				>
					<span className='font-light'>Tidak Bisa Login? Hubungi Pengurus…!</span>
					{loading ? (
						<div className='loading loading-ring loading-md' />
					) : (
						getAppWaliCS() && (
							<Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
						)
					)}
				</a>
			</div>
		</>
	);
};

export default Login;

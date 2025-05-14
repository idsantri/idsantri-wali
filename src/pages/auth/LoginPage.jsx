import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAuthStore from '@/store/authStore';
import { notifyError } from '@/components/Notify';
import apiPost from '@/api/api-post';
import apiGet from '@/api/api-get';

const Login = () => {
	const navigate = useNavigate();
	const { login, auth } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [appWali, setAppWali] = useState(null);
	const [loadingAppWali, setLoadingAppWali] = useState(false);

	useEffect(() => {
		setLoadingAppWali(true);
		apiGet({ endPoint: 'profile' }).then((data) => {
			setLoadingAppWali(false);
			if (data?.app_wali) {
				setAppWali(data?.app_wali ?? null);
				localStorage.setItem('app_wali', JSON.stringify(data?.app_wali ?? {}));
			}
		});
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());
		if (!formObject.santri_id || !formObject.tgl_lahir) {
			return notifyError({ message: 'Lengkapi data login' });
		}
		setLoading(true);
		apiPost({ endPoint: 'login', data: formObject, notify: true }).then((res) => {
			setLoading(false);
			if (res) {
				login({
					isAuthenticated: true,
					token: res.token,
					user: { name: 'User' },
				});
				navigate('/santri');
			}
		});
	};

	if (auth.isAuthenticated) {
		return <Navigate to='/santri' />;
	}

	return (
		<>
			<h2 style={{ fontSize: '1.5em' }} className='font-normal my-7 text-jingga-900'>
				Login
			</h2>
			<form action='' onSubmit={handleLogin}>
				<input
					type='text'
					name='santri_id'
					placeholder='ID Santri'
					className='w-full max-w-xs input input-bordered bg-jingga-50 text-jingga-950'
					readOnly
					onFocus={(e) => {
						e.target.removeAttribute('readonly');
					}}
					onBlur={(e) => {
						e.target.setAttribute('readonly', 'readonly');
					}}
				/>
				<input
					type='text'
					name='tgl_lahir'
					placeholder='Tanggal Lahir Santri (hhbbtttt)'
					className='w-full max-w-xs mt-3 input input-bordered bg-jingga-50 text-jingga-950'
					readOnly
					onFocus={(e) => {
						e.target.removeAttribute('readonly');
					}}
					onBlur={(e) => {
						e.target.setAttribute('readonly', 'readonly');
					}}
				/>
				<p className='text-xs text-jingga-800 pt-1'>01022000 = 1 Februari 2000</p>
				<button
					type='submit'
					className='w-full max-w-xs mt-3 btn bg-jingga-700 text-jingga-100'
					disabled={loading}
				>
					{loading ? (
						<>
							<div className='loading loading-ring loading-md text-jingga-900' />
							<span className='font-light text-jingga-700'>Tunggu sebentar …</span>
						</>
					) : (
						<span className='font-medium'>Login</span>
					)}
				</button>
			</form>
			<p className='mt-3'>
				<a
					target='_blank'
					className='w-full max-w-xs border-0 btn d-flex justify-content-center bg-jingga-100 text-jingga-800'
					href={'https://wa.me/' + appWali?.cs}
					disabled={appWali?.cs ? false : true}
				>
					<span className='font-light'>Tidak Bisa Login? Hubungi Pengurus…!</span>
					{loadingAppWali ? (
						<div className='loading loading-ring loading-md text-jingga-900' />
					) : (
						appWali?.cs && <Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
					)}
				</a>
			</p>
		</>
	);
};

export default Login;

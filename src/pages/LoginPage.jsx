import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiPost } from '../api';
import { Icon } from '@iconify/react/dist/iconify.js';
import { notifyError, notifySuccess } from '../components/Notify';
import config from '../config';

const Login = () => {
	const navigate = useNavigate();
	const { login, auth } = useAuthStore();
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());
		if (!formObject.santri_id || !formObject.nik) {
			return notifyError('Lengkapi data login', 'Error');
		}
		try {
			setLoading(true);
			const { data } = await apiPost('login', formObject);
			notifySuccess(data?.message, 'Berhasil Login');
			login({
				isAuthenticated: true,
				token: data.token,
				user: { name: 'User' },
			});
			navigate('/');
		} catch (error) {
			notifyError(error.response?.data?.message || 'Terjadi kesalahan', 'Error ' + error.status);
		} finally {
			setLoading(false);
		}
	};

	if (auth.isAuthenticated) {
		return <Navigate to='/' />;
	}

	const wa = 'https://wa.me/' + config.PHONE;
	return (
		<>
			<h2 style={{ fontSize: '1.5em' }} className='font-normal my-7'>
				Login
			</h2>
			<form action='' onSubmit={handleLogin}>
				<input type='text' name='santri_id' placeholder='Masukkan ID Santri' className='input input-bordered w-full max-w-xs' />
				<input type='text' name='nik' placeholder='Masukkan NIK Santri' className='input input-bordered w-full max-w-xs mt-3' />
				<button type='submit' className='btn w-full max-w-xs mt-3 bg-color1 text-color6 font-medium' disabled={loading}>
					{loading ? (
						<>
							<div className='loading loading-ring loading-md' />
							<span className='font-light'>Tunggu sebentar …</span>
						</>
					) : (
						<span className='font-medium'>Login</span>
					)}
				</button>
			</form>
			<p className='mt-3'>
				<a target='_blank' className='btn w-full max-w-xs border-0 bg-color4 text-color1 d-flex justify-content-center' href={wa}>
					<span className='font-light'>Tidak Bisa Login? Hubungi Pengurus…!</span>
					<Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
				</a>
			</p>
		</>
	);
};

export default Login;

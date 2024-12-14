import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAuthStore from '@/store/authStore';
import { notifyError } from '@/components/Notify';
import config from '@/config';
import apiPost from '@/api/api-post';

const Login = () => {
	const navigate = useNavigate();
	const { login, auth } = useAuthStore();
	const [loading, setLoading] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());
		if (!formObject.santri_id || !formObject.nik) {
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

	const wa = 'https://wa.me/' + config.PHONE;
	return (
		<>
			<h2 style={{ fontSize: '1.5em' }} className='font-normal my-7 text-jingga-900'>
				Login
			</h2>
			<form action='' onSubmit={handleLogin}>
				<input
					type='text'
					name='santri_id'
					placeholder='Masukkan ID Santri'
					className='w-full max-w-xs input input-bordered bg-jingga-50 text-jingga-950'
				/>
				<input
					type='text'
					name='nik'
					placeholder='Masukkan NIK Santri'
					className='w-full max-w-xs mt-3 input input-bordered bg-jingga-50 text-jingga-950'
				/>
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
					href={wa}
				>
					<span className='font-light'>Tidak Bisa Login? Hubungi Pengurus…!</span>
					<Icon className='ms-2' icon='logos:whatsapp-icon' width='1.5em' height='1.5em' />
				</a>
			</p>
		</>
	);
};

export default Login;

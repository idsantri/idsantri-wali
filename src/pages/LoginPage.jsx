import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiPost } from '../api';
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap';
import Notify from '../components/Notify';
import { Icon } from '@iconify/react/dist/iconify.js';

const Login = () => {
	const navigate = useNavigate();
	const { login, auth } = useAuthStore();
	const [objNotify, setObjNotify] = useState({
		message: '',
		title: 'Error',
		code: '',
		isError: true,
		show: false,
		onClose: () => setObjNotify((prevNotify) => ({ ...prevNotify, show: false })),
	});
	const [loading, setLoading] = useState(false);
	// {
	// 	santri_id: '1234',
	// 	nik: '1122331234567890',
	// }
	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formObject = Object.fromEntries(formData.entries());
		if (!formObject.santri_id || !formObject.nik) {
			setObjNotify((prevState) => ({
				...prevState,
				message: 'Lengkapi data login',
				show: true,
				code: '401',
			}));
			return;
		}
		try {
			setLoading(true);
			const { data } = await apiPost('login', formObject);
			setObjNotify((prevState) => ({
				...prevState,
				message: data?.message || 'Sukses',
				show: true,
				title: 'Sukses',
				isError: false,
			}));
			setTimeout(() => {
				login({
					isAuthenticated: true,
					token: data.token,
					user: { name: 'User' },
				});
				navigate('/');
			}, 1000);
		} catch (error) {
			setObjNotify((prevState) => ({
				...prevState,
				message: error.response?.data?.message || 'Terjadi kesalahan',
				show: true,
				code: error.status,
			}));
		} finally {
			setLoading(false);
		}
	};

	if (auth.isAuthenticated) {
		return <Navigate to="/" />;
	}
	return (
		<>
			<Notify {...objNotify} />
			<h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Login</h2>
			<form action="" onSubmit={handleLogin}>
				<FloatingLabel controlId="floatingPassword" label="ID Santri" className="mb-3">
					<Form.Control name="santri_id" type="text" placeholder="" required />
				</FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="NIK Santri" className="mb-3">
					<Form.Control name="nik" type="text" placeholder="" required />
				</FloatingLabel>
				<Button type="submit" variant="outline-primary" style={{ width: '100%' }} disabled={loading}>
					{loading ? (
						<>
							<Spinner animation="border" role="status" size="sm" /> {'Tunggu sebentar …'}
						</>
					) : (
						'Login'
					)}
				</Button>
			</form>
			<p className="m-0 mt-3">
				<a target="_blank" className="btn btn-outline-secondary d-flex justify-content-center text-color7" href="https://wa.me/6285259787553">
					Tidak Bisa Login? Hubungi Pengurus…!
					<Icon className="ms-2" icon="logos:whatsapp-icon" width="1.5em" height="1.5em" />
				</a>
			</p>
		</>
	);
};

export default Login;

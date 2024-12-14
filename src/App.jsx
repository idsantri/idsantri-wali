import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AuthMiddleware from '@/middleware/AuthMiddleware';
import SantriPage from '@/pages/santri/Index';
import IuranPage from '@/pages/iuran/Index';
import Dashboard from '@/pages/dashboard/Index';
import MadrasahPage from '@/pages/madrasah/Index';
import TatibPage from '@/pages/tatib/Index';
import LoginPage from '@/pages/auth/LoginPage';
import PesantrenPage from '@/pages/pesantren/Index';
import ErrorPage from '@/pages/ErrorPage';

const App = () => {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Navigate to='/dashboard' replace />} />
				<Route element={<AuthLayout />}>
					<Route path='/login' element={<LoginPage />} />
				</Route>
				<Route
					element={
						<AuthMiddleware>
							<MainLayout />
						</AuthMiddleware>
					}
				>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/santri' element={<SantriPage />} />
					<Route path='/madrasah' element={<MadrasahPage />} />
					<Route path='/iuran' element={<IuranPage />} />
					<Route path='/pesantren' element={<PesantrenPage />} />
					<Route path='/tatib' element={<TatibPage />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;

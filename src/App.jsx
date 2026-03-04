import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AuthMiddleware from '@/middleware/AuthMiddleware';
import { lazy } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('@/pages/dashboard/Index'));
const SantriPage = lazy(() => import('@/pages/santri/Index'));
const MadrasahPage = lazy(() => import('@/pages/madrasah/Index'));
const NilaiMapelPage = lazy(() => import('@/pages/nilai-mapel/Index'));
const NilaiAhwalPage = lazy(() => import('@/pages/nilai-ahwal/Index'));
const AbsensiSekolahPage = lazy(() => import('@/pages/absensi-sekolah/Index'));
const IuranPage = lazy(() => import('@/pages/iuran/Index'));
const PesantrenPage = lazy(() => import('@/pages/domisili/Index'));
const TatibPage = lazy(() => import('@/pages/tatib/Index'));
const ProfilePage = lazy(() => import('@/pages/profile/Index'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

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
					<Route path='/kelas/:kelas_id/nilai-mapel' element={<NilaiMapelPage />} />
					<Route path='/kelas/:kelas_id/nilai-ahwal' element={<NilaiAhwalPage />} />
					<Route path='/kelas/:kelas_id/absensi-sekolah' element={<AbsensiSekolahPage />} />
					<Route path='/iuran' element={<IuranPage />} />
					<Route path='/domisili' element={<PesantrenPage />} />
					<Route path='/tatib' element={<TatibPage />} />
					<Route path='/profile' element={<ProfilePage />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AuthMiddleware from './middleware/AuthMiddleware';
import SantriPage from './pages/SantriPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import KelasPage from './pages/KelasPage';

const App = () => {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route path='/' element={<Navigate to='/santri' replace />} />
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
					<Route path='/santri' element={<SantriPage />} />
					<Route path='/kelas' element={<KelasPage />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;

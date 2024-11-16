import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AuthMiddleware from './middleware/AuthMiddleware';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import './App.css';

const App = () => {
	return (
		<Router
			future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
		>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route
					element={
						<AuthMiddleware>
							<MainLayout />
						</AuthMiddleware>
					}
				>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;

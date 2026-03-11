import { Navigate, Outlet } from 'react-router-dom';
import MainTop from './_components/MainTop';
import DockNavigation from './_components/DockNavigation';
import { useAuthStore } from '../store/authStore';

const MainLayout = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	if (!isLoggedIn) {
		return <Navigate to='/login' replace />;
	}

	return (
		<div className='min-h-screen bg-base-100'>
			<header className='fixed top-0 w-screen z-1000 '>
				<MainTop />
			</header>
			<main className='pt-21.5 pb-18.5'>
				<div className='m-2'>
					<Outlet />
				</div>
			</main>
			<footer className='fixed bottom-0 w-screen z-1000'>
				<DockNavigation />
			</footer>
		</div>
	);
};

export default MainLayout;

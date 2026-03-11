import { Navigate, Outlet } from 'react-router-dom';
import InstallPwa from '@/layouts/_components/InstallPwa';
import HeaderGuest from './_components/HeaderGuest';
import { useAuthStore } from '../store/authStore';

const AuthLayout = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	if (isLoggedIn) {
		return <Navigate to='/' replace />;
	}

	return (
		<>
			<div className='grid min-h-screen p-4 bg-base-300 place-content-center'>
				<div className='max-w-sm text-center'>
					<InstallPwa className='mb-4' />
					<div className='relative px-4 py-10 rounded-md shadow-sm bg-base-100 shadow-base-300'>
						<HeaderGuest />
						<main>
							<Outlet />
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;

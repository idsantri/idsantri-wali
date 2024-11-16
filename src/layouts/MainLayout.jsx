import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const MainLayout = () => {
	const { logout } = useAuthStore();
	return (
		<div>
			<header>
				Main Header - <button onClick={logout}>Logout</button>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;

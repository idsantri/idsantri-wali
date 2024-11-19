import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Icon } from '@iconify/react';
import BottomNavigation from '../components/BottomNavigation';

const MainLayout = () => {
	const { logout } = useAuthStore();
	return (
		<div style={{ height: '100vh' }} className="">
			<header className="d-flex align-items-center justify-content-between p-2 bg-color2">
				<a className="text-decoration-none" href="/">
					<h1
						className="p-0 m-0 text-color7"
						style={{ fontSize: '1.6em', fontWeight: 400 }}
					>
						App Wali Santri
					</h1>
					<p
						className="p-0 m-0 text-color8"
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.5em',
							fontWeight: 300,
						}}
					>
						Pondok Pesantren
					</p>
					<p
						className="p-0 m-0 text-color8"
						style={{ fontWeight: 400 }}
					>
						Syaichona Moh Cholil Bangkalan
					</p>
				</a>
				<button onClick={logout} className="btn btn-danger">
					<Icon
						icon="icomoon-free:exit"
						width="1.2em"
						height="1.2em"
						className="my-2 ms-1 text-color1"
					/>
				</button>
			</header>
			<main className="m-2">
				<div className="card p-2 bg-color1">
					<Outlet />
				</div>
				<BottomNavigation />
			</main>
		</div>
	);
};

export default MainLayout;

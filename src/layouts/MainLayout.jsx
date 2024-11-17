import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const MainLayout = () => {
	const { logout } = useAuthStore();
	return (
		<>
			<header className="d-flex align-items-center justify-content-between bg-dark-subtle p-2">
				<div>
					<h1 className="p-0 m-0" style={{ fontSize: '1.6em' }}>
						Wali Santri
					</h1>
					<p
						className="p-0 m-0"
						style={{ fontVariant: 'small-caps', fontSize: '1.5em' }}
					>
						Pondok Pesantren
					</p>
					<p className="p-0 m-0" style={{ fontWeight: 500 }}>
						Syaichona Moh Cholil Bangkalan
					</p>
				</div>
				<div>
					<button onClick={logout} className="btn btn-danger">
						Keluar
					</button>
				</div>
			</header>
			<main className="m-2">
				<Outlet />
			</main>
		</>
	);
};

export default MainLayout;

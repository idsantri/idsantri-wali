import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const MainLayout = () => {
	const { logout } = useAuthStore();
	return (
		<div style={{ height: '100vh' }} className="">
			<header className="d-flex align-items-center justify-content-between p-2 bg-color2">
				<button
					className=""
					onClick={() => window.location.replace('/')}
					style={{
						cursor: 'pointer',
						outline: 'none',
						border: 'none',
						background: 'none',
						textAlign: 'left',
					}}
				>
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
				</button>
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
				<div
					style={{ position: 'fixed', bottom: '10px', left: '10px' }}
				>
					<Dropdown drop="up">
						<Dropdown.Toggle
							variant="outline-success"
							id="dropdown-basic"
						>
							Menu
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/kelas">
								Kelas
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</main>
		</div>
	);
};

export default MainLayout;

import { Outlet } from 'react-router-dom';
import InstallPwa from '../components/InstallPwa';

const AuthLayout = () => {
	return (
		<div className='h-screen bg-color0 grid place-content-center'>
			<div style={{ maxWidth: '400px' }} className='mx-auto'>
				<InstallPwa />
			</div>
			<div
				style={{
					textAlign: 'center',
					maxWidth: '400px',
				}}
				className='bg-color2 text-color7 m-3 p-4 rounded-md shadow-md'
			>
				<header className=''>
					<h1 style={{ fontSize: '1.6em' }} className='font-medium'>
						Aplikasi Wali Santri
					</h1>
					<p>
						<span style={{ fontSize: '1.2em' }} className='font-medium'>
							Pondok Pesantren
						</span>
						<br />
						<span style={{ fontVariant: 'small-caps', fontSize: '1.5em' }}>Syaichona Moh Cholil</span>
					</p>
				</header>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AuthLayout;

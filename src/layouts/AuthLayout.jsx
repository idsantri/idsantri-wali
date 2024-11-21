import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Pwa from '../components/PWA';

const AuthLayout = () => {
	return (
		<div style={{ margin: '20px' }}>
			<div className='mx-auto' style={{ maxWidth: '500px' }}>
				<Pwa />
				<Card
					style={{
						marginTop: '20vh',
						padding: '20px',
						textAlign: 'center',
					}}
					className='bg-color2 text-color7'
				>
					<header>
						<h1 style={{ fontSize: '1.8em', fontWeight: 300 }}>Aplikasi Wali Santri</h1>
						<p>
							<span style={{ fontSize: '1.2em', fontWeight: 500 }}>Pondok Pesantren</span>
							<br />
							<span style={{ fontVariant: 'small-caps', fontSize: '1.5em' }}>Syaichona Moh Cholil</span>
						</p>
					</header>
					<main>
						<Outlet />
					</main>
				</Card>
			</div>
		</div>
	);
};

export default AuthLayout;

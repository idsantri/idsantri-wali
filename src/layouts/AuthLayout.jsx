import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
	<div style={{ margin: '20px' }}>
		<Card
			style={{
				maxWidth: '500px',
				margin: 'auto',
				marginTop: '20vh',
				padding: '20px',
				textAlign: 'center',
			}}
			className="bg-color2 text-color7"
		>
			<header>
				<h1 style={{ fontSize: '1.8em' }}>Aplikasi Wali Santri</h1>
				<p style={{ fontSize: '1.2em' }}>
					Pondok Pesantren
					<br />
					Syaichona Moh Cholil
				</p>
			</header>
			<main>
				<Outlet />
			</main>
		</Card>
	</div>
);

export default AuthLayout;

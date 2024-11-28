import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Icon } from '@iconify/react';
import BottomNavigation from '../components/BottomNavigation';
import useConfirmDialog from '../hooks/use-confirm-dialog';

const MainLayout = () => {
	const { logout } = useAuthStore();
	const dialog = useConfirmDialog();
	async function handleLogout() {
		const isConfirmed = await dialog({
			title: 'Logout?',
			message: 'Keluar dari Aplikasi?',
		});
		if (!isConfirmed) return;
		logout();
	}
	return (
		<div className='h-screen'>
			<header className='flex items-center justify-between p-2 bg-color2'>
				<a className='text-decoration-none' href='/'>
					<h1 className='p-0 m-0 text-jingga-600' style={{ fontSize: '1.5em', fontWeight: 400, lineHeight: '25px' }}>
						App Wali Santri
					</h1>
					<p
						className='p-0 m-0  text-jingga-800'
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.3em',
							fontWeight: 300,
							lineHeight: '22px',
						}}
					>
						Pondok Pesantren
					</p>
					<p className='p-0 m-0 text-jingga-800' style={{ fontWeight: 400, lineHeight: '20px' }}>
						Syaichona Moh Cholil Bangkalan
					</p>
				</a>
				<button
					onClick={handleLogout}
					style={{
						backgroundColor: 'initial',
						backgroundImage: 'linear-gradient(-180deg, #FF7E31, #E62C03)',
						borderRadius: '6px',
						boxShadow: 'rgba(0, 0, 0, 0.1) 0 2px 4px',
						color: '#FFFFFF',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '50px',
						height: '50px',
						lineHeight: '50px',
						outline: '0',
						overflow: 'hidden',
						pointerEvents: 'auto',
						position: 'relative',
						textAlign: 'center',
						touchAction: 'manipulation',
						userSelect: 'none',
						whiteSpace: 'nowrap',
						border: '0',
						transition: 'box-shadow .2s',
					}}
				>
					<Icon icon='icomoon-free:exit' width='1.25em' height='1.25em' className='text-color1' />
				</button>
			</header>
			<main className=''>
				<div className='m-2 p-2 bg-color1'>
					<Outlet />
				</div>
				<BottomNavigation />
			</main>
		</div>
	);
};

export default MainLayout;
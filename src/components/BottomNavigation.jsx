import ButtonNavigation from './ButtonNavigation';
import ButtonMore from './ButtonMore';
import useAuthStore from '../store/authStore';
import useConfirmDialog from '../hooks/use-confirm-dialog';

function BottomNavigation() {
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
		<nav className='fixed bottom-0 w-screen border-t bg-jingga-800 border-base-300'>
			<ul className='grid grid-flow-col auto-cols-fr'>
				<ButtonNavigation iconName='healthicons:i-training-class-24px' to='/madrasah' label='Madrasah' />
				<ButtonNavigation iconName='ic:round-meeting-room' to='/pesantren' label='Asrama' />
				<ButtonNavigation iconName='entypo:home' to='/' label='Beranda' />
				<ButtonNavigation iconName='majesticons:creditcard-hand' to='/iuran' label='Iuran' />
				<ButtonMore clickLogout={handleLogout} />
			</ul>
		</nav>
	);
}

export default BottomNavigation;

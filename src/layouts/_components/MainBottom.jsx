import ButtonNavigation from '@/layouts/_components/ButtonNavigation';
import ButtonMore from '@/layouts/_components/ButtonMore';
import useAuthStore from '@/store/authStore';
import useConfirmDialog from '@/hooks/use-confirm-dialog';

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
		<nav className='border-t bg-gradient-to-t from-jingga-800 to-jingga-700 shadow-sm-top shadow-jingga-400 border-jingga-400'>
			<ul className='grid grid-flow-col auto-cols-fr'>
				<ButtonNavigation iconName='solar:user-id-linear' to='/santri' label='Santri' />
				<ButtonNavigation iconName='healthicons:i-training-class-24px' to='/madrasah' label='Madrasah' />
				<ButtonNavigation iconName='entypo:home' to='/' label='Beranda' />
				<ButtonNavigation iconName='majesticons:creditcard-hand' to='/iuran' label='Iuran' />
				<ButtonMore clickLogout={handleLogout} />
			</ul>
		</nav>
	);
}

export default BottomNavigation;

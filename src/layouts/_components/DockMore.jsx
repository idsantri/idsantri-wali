import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import useConfirmDialog from '@/hooks/use-confirm-dialog';

function DockMore() {
	const { logout } = useAuthStore();
	const dialog = useConfirmDialog();

	function blur() {
		document.activeElement.blur();
	}

	async function handleLogout() {
		blur();
		const isConfirmed = await dialog({
			title: 'Logout?',
			message: 'Keluar dari Aplikasi?',
		});
		if (!isConfirmed) return;
		logout();
	}

	return (
		<div className='dropdown dropdown-top dropdown-end'>
			<div tabIndex={0} role='button' className=''>
				<Icon className='w-full' icon='basil:other-1-solid' width='1.5em' />
				<span className='block pb-1 text-xs font-light text-center '>Lainnya</span>
			</div>
			<ul
				tabIndex='-1'
				className='w-48 p-0 mb-4 -mr-5 rounded-md shadow-md dropdown-content menu bg-neutral-700 text-neutral-content z-1'
			>
				<li className='p-2'>
					<Link to='/tatib' onClick={blur()}>
						<Icon icon='codicon:symbol-ruler' width='24' height='24' />
						Tata Tertib
					</Link>
				</li>
				<li className='p-2'>
					<Link to='/domisili' onClick={blur()}>
						<Icon icon='mdi:bed-outline' width='24' height='24' />
						Riwayat Domisili
					</Link>
				</li>

				<li className='p-2 bg-warning text-warning-content'>
					<button onClick={handleLogout} className='cursor-pointer hover:cursor-pointer'>
						<Icon icon='bitcoin-icons:exit-filled' width='24' height='24' />
						Keluar
					</button>
				</li>
			</ul>
		</div>
	);
}

export default DockMore;

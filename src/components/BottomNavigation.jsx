import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function BottomNavigation() {
	return (
		<nav className='bg-color2 border-t border-base-300 fixed bottom-0 w-screen'>
			<ul className='grid grid-flow-col auto-cols-fr'>
				<li className='p-2'>
					<Link to='/kelas' className='text-lg text-base-content hover:text-base-content'>
						<Icon className='w-full' icon='healthicons:i-training-class-24px' width='1.2em' height='1.2em' />
						<span className='text-center text-sm block'>Madrasah</span>
					</Link>
				</li>
				<li className='p-2 bg-orange-100'>
					<Link to='/' className='text-lg text-base-content hover:text-base-content btn-disabled'>
						<Icon className='w-full' icon='ic:round-meeting-room' width='1.2em' height='1.2em' />
						<span className='text-center text-sm block'>Pesantren</span>
					</Link>
				</li>
				<li className='p-2'>
					<Link to='/' className='text-lg text-base-content hover:text-base-content'>
						<Icon className='w-full' icon='entypo:home' width='1.2em' height='1.2em' />
						<span className='text-center text-sm block'>Beranda</span>
					</Link>
				</li>
				<li className='p-2 bg-orange-100'>
					<Link to='/' className='text-lg text-base-content hover:text-base-content btn-disabled'>
						<Icon className='w-full' icon='majesticons:creditcard-hand' width='1.2em' height='1.2em' />
						<span className='text-center text-sm block'>Iuran</span>
					</Link>
				</li>
				<li className='p-2 bg-orange-100 text-lg text-base-content hover:text-base-content dropdown dropdown-top dropdown-end'>
					<div tabIndex={0} role='button' className='btn-disabled'>
						<Icon className='w-full' icon='basil:other-1-solid' width='1.2em' height='1.2em' />
						<span className='text-center text-sm block'>Lainnya</span>
					</div>
					<ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
						<li>
							<Link to='/'>Item 1</Link>
						</li>
						<li>
							<Link to={'/'}>Item 2</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}

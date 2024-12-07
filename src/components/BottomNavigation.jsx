import { Icon } from '@iconify/react';
import ButtonNavigation from './ButtonNavigation';

export default function BottomNavigation() {
	return (
		<nav className='fixed bottom-0 w-screen border-t bg-jingga-800 border-base-300'>
			<ul className='grid grid-flow-col auto-cols-fr'>
				<ButtonNavigation iconName='healthicons:i-training-class-24px' to='/madrasah' label='Madrasah' />
				<ButtonNavigation iconName='ic:round-meeting-room' to='/pesantren' label='Pesantren' />
				<ButtonNavigation iconName='entypo:home' to='/santri' label='Beranda' />
				<ButtonNavigation iconName='majesticons:creditcard-hand' to='/iuran' label='Iuran' />
				<li className='py-4 text-lg hover:bg-jingga-900 dropdown dropdown-top dropdown-end'>
					<div tabIndex={0} role='button' className=''>
						<Icon className='w-full text-jingga-100' icon='basil:other-1-solid' width='1.2em' height='1.2em' />
						<span className='block pt-1 text-xs font-light text-center text-jingga-200'>Lainnya</span>
					</div>
					<ul tabIndex={0} className='dropdown-content menu bg-jingga-200 rounded-box z-[1] w-52 p-2 shadow'>
						<li className='p-2'>Link 1 (belum) </li>
						<li className='p-2'>Link 2 (belum)</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}

import DockMore from './DockMore';
import DockButton from './DockButton';
import { useLocation } from 'react-router-dom';

function DockNavigation({ clickLogout, disabled }) {
	// console.log('DockNavigation render', disable);
	const location = useLocation();
	const currentPath = location.pathname;

	const isActiveForPath = (targetPath) => {
		if (currentPath === targetPath) return true;
		if (targetPath !== '/' && currentPath.startsWith(targetPath + '/')) return true;
		return false;
	};

	const anyActive =
		isActiveForPath('/santri') ||
		isActiveForPath('/madrasah') ||
		isActiveForPath('/dashboard') ||
		isActiveForPath('/iuran');

	return (
		<nav className=''>
			<ul className='dock bg-base-300 '>
				<DockButton
					iconName='solar:user-id-linear'
					to='/santri'
					label='Santri'
					className={isActiveForPath('/santri') ? 'dock-active' : ''}
				/>
				<DockButton
					iconName='healthicons:i-training-class-24px'
					to='/madrasah'
					label='Madrasah'
					className={isActiveForPath('/madrasah') ? 'dock-active' : ''}
				/>
				<DockButton
					iconName='entypo:home'
					to='/dashboard'
					label='Beranda'
					className={isActiveForPath('/dashboard') ? 'dock-active' : ''}
				/>
				<DockButton
					iconName='majesticons:creditcard-hand'
					to='/iuran'
					label='Iuran'
					className={isActiveForPath('/iuran') ? 'dock-active' : ''}
				/>
				<li className={!anyActive ? 'dock-active' : ''}>
					<DockMore />
				</li>
			</ul>
		</nav>
	);
}

export default DockNavigation;

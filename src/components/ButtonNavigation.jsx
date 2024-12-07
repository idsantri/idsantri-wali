import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

function ButtonNavigation({ label = 'Label', iconName = 'entypo:home', to = '/' }) {
	return (
		<li className='py-4 hover:bg-jingga-900'>
			<Link to={to} className='text-lg text-base-content hover:text-base-content'>
				<Icon className='w-full text-jingga-100' icon={iconName} width='1.2em' height='1.2em' />
				<span className='block pt-1 text-xs font-light text-center text-jingga-200'>{label}</span>
			</Link>
		</li>
	);
}

export default ButtonNavigation;

import { Icon } from '@iconify/react/dist/iconify.js';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const appWali = JSON.parse(localStorage.getItem('app_wali')) ?? null;

	return (
		<>
			<div className='relative mb-2 overflow-hidden rounded-md bg-accent'>
				<h2 className='p-2 m-0 text-xl font-light text-center'>Profile Pesantren</h2>
				<Link className='absolute block top-2 left-2' to='/dashboard'>
					<Icon icon='ic:round-arrow-back' width='28' height='28' />
				</Link>
			</div>

			<div className='p-4 text-sm border rounded-md bg-accent/10 border-accent'>{parse(appWali?.profile)}</div>
		</>
	);
}

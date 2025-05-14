import { Icon } from '@iconify/react/dist/iconify.js';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const appWali = JSON.parse(localStorage.getItem('app_wali')) ?? null;

	return (
		<>
			<div className='mb-2 overflow-hidden border rounded-md border-jingga-300 relative'>
				<h2 className='p-2 m-0 text-xl font-light text-center bg-jingga-100 text-jingga-800'>
					Profile Pesantren
				</h2>
				<Link className='block absolute top-2 left-2 text-jingga-700' to='/dashboard'>
					<Icon icon='ic:round-arrow-back' width='28' height='28' />
				</Link>
			</div>

			<div className='text-sm border border-jingga-300/50 rounded-md p-4 text-jingga-900'>
				{parse(appWali?.profile)}
			</div>
		</>
	);
}

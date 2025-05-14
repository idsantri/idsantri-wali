import { Icon } from '@iconify/react/dist/iconify.js';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const appWali = JSON.parse(localStorage.getItem('app_wali')) ?? null;
	const banners = appWali?.banners ?? null;
	// console.log('🚀 ~ Dashboard ~ appWali:', appWali);

	return (
		<>
			<div className='mb-2 overflow-hidden border rounded-md border-jingga-300 relative'>
				<h2 className='p-2 m-0 text-xl font-light text-center bg-jingga-100 text-jingga-800'>Info</h2>
				<Link className='block absolute top-2 right-2 text-jingga-700' to='/profile'>
					<Icon icon='ic:round-school' width='28' height='28' />
				</Link>
			</div>

			<div className='text-sm'>
				{banners?.length > 0 &&
					banners.map((banner, i) => (
						<div key={i} className='border border-jingga-300/50 rounded-lg p-4 mb-4 text-jingga-900'>
							{parse(banner?.content)}
						</div>
					))}
			</div>
		</>
	);
}

import { Icon } from '@iconify/react/dist/iconify.js';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export default function Dashboard() {
	const appWali = JSON.parse(localStorage.getItem('app_wali')) ?? null;
	const banners = appWali?.banners ?? null;
	// console.log('🚀 ~ Dashboard ~ appWali:', appWali);

	return (
		<>
			<div className='relative mb-2 overflow-hidden rounded-md bg-accent'>
				<h2 className='p-2 m-0 text-xl font-light text-center'>Info</h2>
				<Link className='absolute block top-2 right-2' to='/profile'>
					<Icon icon='ic:round-school' width='28' height='28' />
				</Link>
			</div>

			<div className='flex flex-col gap-2'>
				{banners?.length > 0 &&
					banners.map((banner, i) => (
						<div key={i} className='p-4 text-sm border rounded-md bg-accent/10 border-accent'>
							{parse(banner?.content)}
						</div>
					))}
			</div>
		</>
	);
}

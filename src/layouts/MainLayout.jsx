import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import config from '../config';

const MainLayout = () => {
	return (
		<div className='min-h-screen'>
			<header className='flex items-center justify-between p-2 bg-jingga-700'>
				<a className='text-decoration-none' href='/'>
					<h1 className='p-0 m-0 text-jingga-200' style={{ fontSize: '1.15em', fontWeight: 400, lineHeight: '25px' }}>
						{config.APP_NAME}
					</h1>
					<p
						className='p-0 m-0 text-jingga-100'
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.25em',
							fontWeight: 300,
							lineHeight: '22px',
						}}
					>
						{config.INS_DESC}
					</p>
					<p className='p-0 m-0 text-jingga-100' style={{ fontSize: '1.1em', fontWeight: 400, lineHeight: '20px' }}>
						{config.INS_NAME}
					</p>
				</a>
			</header>
			<main className=''>
				<div className='m-2'>
					<Outlet />
				</div>
				<BottomNavigation />
			</main>
		</div>
	);
};

export default MainLayout;

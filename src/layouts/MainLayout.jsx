import { Outlet } from 'react-router-dom';
import MainTop from './_components/MainTop';
import DockNavigation from './_components/DockNavigation';

const MainLayout = () => {
	return (
		<div className='min-h-screen bg-base-100'>
			<header className='fixed top-0 w-screen z-1000 '>
				<MainTop />
			</header>
			<main className='pt-21.5 pb-18.5'>
				<div className='m-2'>
					<Outlet />
				</div>
			</main>
			<footer className='fixed bottom-0 w-screen z-1000'>
				<DockNavigation />
			</footer>
		</div>
	);
};

export default MainLayout;

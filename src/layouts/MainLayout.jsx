import { Outlet } from 'react-router-dom';
import MainBottom from '@/layouts/_components/MainBottom';
import MainTop from '@/layouts/_components/MainTop';

const MainLayout = () => {
	return (
		<div className='min-h-screen bg-jingga-50 text-jingga-950 dark:bg-jingga-950 dark:text-jingga-200'>
			<header className='fixed top-0 w-screen z-1000 '>
				<MainTop />
			</header>
			<main className='pt-21.5 pb-18.5'>
				<div className='m-2'>
					<Outlet />
				</div>
			</main>
			<footer className='fixed bottom-0 w-screen z-1000'>
				<MainBottom />
			</footer>
		</div>
	);
};

export default MainLayout;

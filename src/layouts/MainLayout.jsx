import { Outlet } from 'react-router-dom';
import MainBottom from '../components/MainBottom';
import MainTop from '../components/MainTop';

const MainLayout = () => {
	return (
		<div className='min-h-screen bg-jingga-50 text-jingga-950'>
			<header className='fixed top-0 z-[1000] w-screen '>
				<MainTop />
			</header>
			<main className='pt-[86px] pb-[74px] m-2'>
				<Outlet />
			</main>
			<footer className='fixed bottom-0 z-[1000] w-screen'>
				<MainBottom />
			</footer>
		</div>
	);
};

export default MainLayout;

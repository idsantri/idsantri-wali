import { Outlet } from 'react-router-dom';
import config from '@/config';
import InstallPwa from '@/layouts/_components/InstallPwa';
import LogoAvatar from '@/layouts/_components/LogoAvatar';
import ToggleMode from '../components/ToggleMode';

const AuthLayout = () => {
	return (
		<>
			<div className='grid min-h-screen p-4 bg-base-300 place-content-center'>
				<div className='max-w-sm text-center'>
					<InstallPwa className='mb-4' />
					<div className='relative px-4 py-10 rounded-md shadow-sm bg-base-100 shadow-base-300'>
						<ToggleMode className='absolute top-2 right-2' />
						<header className=''>
							<LogoAvatar className='w-28' />
							<div className=''>
								<h1 style={{ fontSize: '1.6em' }} className='mt-4 font-medium'>
									{config.APP_NAME}
								</h1>
								<p>
									<span style={{ fontSize: '1.2em' }} className='font-medium'>
										{config.INS_DESC}
									</span>
									<br />
									<span style={{ fontVariant: 'small-caps', fontSize: '1.5em' }} className=''>
										{config.INS_NAME}
									</span>
								</p>
							</div>
						</header>
						<main>
							<Outlet />
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;

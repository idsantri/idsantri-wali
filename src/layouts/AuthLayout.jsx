import { Outlet } from 'react-router-dom';
import InstallPwa from '../components/InstallPwa';
import config from '../config';

const AuthLayout = () => {
	return (
		<>
			{/* <ColorPallet /> */}
			<div className='grid min-h-screen p-4 bg-white place-content-center'>
				<div
					style={{
						textAlign: 'center',
						maxWidth: '400px',
					}}
				>
					<InstallPwa className='mb-4' />
					<div className='px-4 py-10 rounded-md shadow-md bg-jingga-200 shadow-jingga-500'>
						<header className=''>
							<div className='avatar'>
								<div className='border-2 rounded-full w-28 border-jingga-700'>
									<img src='icons/icon-128x128.png' />
								</div>
							</div>
							<h1 style={{ fontSize: '1.6em' }} className='mt-4 font-medium text-jingga-700'>
								{config.APP_NAME}
							</h1>
							<p>
								<span style={{ fontSize: '1.2em' }} className='font-medium text-jingga-800'>
									{config.INS_DESC}
								</span>
								<br />
								<span style={{ fontVariant: 'small-caps', fontSize: '1.5em' }} className='text-jingga-900'>
									{config.INS_NAME}
								</span>
							</p>
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

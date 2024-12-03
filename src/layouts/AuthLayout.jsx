import { Outlet } from 'react-router-dom';
import InstallPwa from '../components/InstallPwa';
import config from '../config';

const AuthLayout = () => {
	return (
		<>
			{/* <ColorPallet /> */}
			<div className='min-h-screen bg-jingga-50 grid place-content-center'>
				<div
					style={{
						textAlign: 'center',
						maxWidth: '400px',
					}}
				>
					<div className='mb-4'>
						<InstallPwa />
					</div>
					<div className='rounded-md bg-jingga-200 p-4 shadow-md shadow-jingga-500'>
						<header className=''>
							<div className='avatar my-4'>
								<div className='w-28 rounded-full  border-jingga-700 border-2'>
									<img src='icons/icon-128x128.png' />
								</div>
							</div>
							<h1 style={{ fontSize: '1.6em' }} className='font-medium text-jingga-700'>
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

import config from '@/config';
import LogoAvatar from '@/layouts/_components/LogoAvatar';
import ToggleMode from '../../components/ToggleMode';

export default function HeaderGuest() {
	return (
		<header className=''>
			<ToggleMode className='absolute top-2 right-2' />
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
	);
}

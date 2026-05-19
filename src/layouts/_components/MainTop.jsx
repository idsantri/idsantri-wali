import config from '../../config';
import LogoAvatar from '../../layouts/_components/LogoAvatar';
import ToggleMode from '../../components/ToggleMode';

function MainTop() {
	return (
		<div className='flex items-center justify-between gap-2 p-2 border-b shadow-sm bg-linear-to-b from-base-100 to-base-300 shadow-primary border-primary'>
			<div className='flex items-center gap-2'>
				<a href='/' className='block text-decoration-none'>
					<LogoAvatar className='w-16' />
				</a>
				<div>
					<h1
						className='p-0 m-0 text-base-content'
						style={{ fontSize: '1.15em', fontWeight: 400, lineHeight: '25px' }}
					>
						{config.APP_NAME}
					</h1>
					<p
						className='p-0 m-0 text-base-content small-caps'
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.25em',
							fontWeight: 300,
							lineHeight: '22px',
						}}
					>
						{config.INS_DESC}
					</p>
					<p
						className='p-0 m-0 text-base-content'
						style={{ fontSize: '1.1em', fontWeight: 400, lineHeight: '20px' }}
					>
						{config.INS_NAME}
					</p>
				</div>
			</div>
			<ToggleMode className='' />
		</div>
	);
}

export default MainTop;

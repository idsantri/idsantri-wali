import config from '@/config';
import LogoAvatar from '@/layouts/_components/LogoAvatar';
import ToggleMode from '../../components/ToggleMode';

function MainTop() {
	return (
		<div className='flex items-center justify-between gap-2 p-2 border-b shadow-md bg-gradient-to-b from-jingga-800 to-jingga-600 shadow-jingga-400 border-jingga-400'>
			<div className='flex items-center gap-2'>
				<a href='/' className='text-decoration-none block'>
					<LogoAvatar className='w-16' />
				</a>
				<div>
					<h1
						className='p-0 m-0 text-jingga-200'
						style={{ fontSize: '1.15em', fontWeight: 400, lineHeight: '25px' }}
					>
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
					<p
						className='p-0 m-0 text-jingga-100'
						style={{ fontSize: '1.1em', fontWeight: 400, lineHeight: '20px' }}
					>
						{config.INS_NAME}
					</p>
				</div>
			</div>
			{/* Button Mode */}
			<ToggleMode className='bg-jingga-100 hidden' />
		</div>
	);
}

export default MainTop;

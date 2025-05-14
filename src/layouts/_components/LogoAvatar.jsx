function LogoAvatar({ className }) {
	return (
		<div className={`avatar ${className}`}>
			<div className='border-2 rounded-full border-jingga-700'>
				<img className='' src='/icons/icon-128x128.png' alt='logo' />
			</div>
		</div>
	);
}

export default LogoAvatar;

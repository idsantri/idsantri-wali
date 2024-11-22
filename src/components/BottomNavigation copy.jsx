import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<nav className='p-1 navbar navbar-expand fixed-bottom border-top navbar-dark bg-color2'>
			<ul className='navbar-nav nav-justified w-100'>
				<li className='nav-item '>
					<Link to={'/kelas'} className='text-decoration-none text-color7'>
						<Icon icon='healthicons:i-training-class-24px' width='1.2em' height='1.2em' />
						<span className='small d-block'>Madrasah</span>
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={'/'} className='text-decoration-none text-color7' style={{ pointerEvents: 'none', color: 'grey' }}>
						<Icon icon='ic:round-meeting-room' width='1.2em' height='1.2em' />
						<span className='small d-block'>Pesantren</span>
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={'/'} className='text-decoration-none text-color7'>
						<Icon icon='entypo:home' width='1.2em' height='1.2em' />
						<span className='small d-block'>Beranda</span>
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={'/'} className='text-decoration-none text-color7' style={{ pointerEvents: 'none', color: 'grey' }}>
						<Icon icon='majesticons:creditcard-hand' width='1.2em' height='1.2em' />
						<span className='small d-block'>Iuran</span>
					</Link>
				</li>
				{/* <li className='nav-item '>
					<button className='text-secondary btn py-0 px-2 border-0 disabled'>
						<Icon icon='material-symbols:other-admission-outline-rounded' />
						<span className='small d-block'>Lainnya</span>
					</button>
				</li> */}

				<li className='nav-item dropdown'>
					<div className='btn-group dropup'>
						<button type='button' className='btn btn-secondary dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
							Dropup
						</button>
						<ul className='dropdown-menu'>
							<li>
								<a className='dropdown-item' href='#'>
									Action
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Another action
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Something else here
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</nav>
	);
}

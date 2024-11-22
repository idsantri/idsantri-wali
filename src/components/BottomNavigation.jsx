import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<>
			<style>{`.custom-dropdown::after {display: none !important;}`}</style>
			<Navbar fixed='bottom' className='border-top bg-color2'>
				<Nav className='nav-justified w-100'>
					<Nav.Item>
						<Link to='/kelas' className='text-decoration-none text-color7'>
							<Icon icon='healthicons:i-training-class-24px' width='1.2em' height='1.2em' />
							<span className='small d-block'>Madrasah</span>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to='/' className='text-decoration-none text-color7' style={{ pointerEvents: 'none', color: 'grey' }}>
							<Icon icon='ic:round-meeting-room' width='1.2em' height='1.2em' />
							<span className='small d-block'>Pesantren</span>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to='/' className='text-decoration-none text-color7'>
							<Icon icon='entypo:home' width='1.2em' height='1.2em' />
							<span className='small d-block'>Beranda</span>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to='/' className='text-decoration-none text-color7' style={{ pointerEvents: 'none', color: 'grey' }}>
							<Icon icon='majesticons:creditcard-hand' width='1.2em' height='1.2em' />
							<span className='small d-block'>Iuran</span>
						</Link>
					</Nav.Item>
					<Dropdown as={Nav.Item} drop='up'>
						<Dropdown.Toggle
							className='d-flex flex-column align-items-center custom-dropdown text-color7'
							style={{ pointerEvents: 'none', color: 'grey', background: 'none', border: 'none' }}
						>
							{/* <Icon icon='material-symbols:other-admission-outline-rounded' /> */}
							<Icon icon='basil:other-1-solid' width='1.2em' height='1.2em' />
							<span className='small'>Lainnya</span>
						</Dropdown.Toggle>
						<Dropdown.Menu align='end'>
							<Dropdown.Item as={Link} to='/'>
								Santri
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/kelas'>
								Kelas
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar>
		</>
	);
}

import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

function RenderEmaal() {
	// console.log(notLunas);
	return (
		<div className='mt-2'>
			<Link className='w-full btn btn-accent text-accent-content' to='/payments/emaal'>
				<Icon className='ms-2' icon='uiw:pay' width='1.5em' height='1.5em' />
				Bayar Iuran<span className='italic'>(via Emaal)</span>
			</Link>
		</div>
	);
}
export default RenderEmaal;

import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

function RenderMidtrans({ iuran }) {
	const notLunas = iuran.filter((item) => !item.lunas);
	// console.log(notLunas);
	return (
		<div className='mt-2'>
			<div>
				<Link
					disabled={notLunas.length === 0}
					className='w-full btn btn-primary text-primary-content'
					to='/payment-midtrans'
					state={{ iuran: notLunas }}
				>
					<Icon className='ms-2' icon='uiw:pay' width='1.5em' height='1.5em' />
					Bayar Iuran
				</Link>
			</div>
		</div>
	);
}
export default RenderMidtrans;

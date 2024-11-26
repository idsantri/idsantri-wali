import { toast } from 'react-toastify';

const notifySuccess = (message, title = 'Sukses') => {
	toast.success(
		<div>
			<strong className='text-success font-light'>{title}</strong>
			<br />
			{message}
		</div>,
		{
			position: 'bottom-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		},
	);
};
const notifyError = (message, title = 'Sukses') => {
	toast.error(
		<div>
			<strong className='text-red-600 font-light'>{title}</strong>
			<br />
			{message}
		</div>,
		{
			position: 'bottom-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		},
	);
};

export { notifySuccess, notifyError };

// eslint-disable-next-line react/prop-types
const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
	<div className='fixed inset-0 flex items-center justify-center bg-jingga-900 bg-opacity-70 z-50'>
		<div className='bg-jingga-400 rounded-md shadow-lg py-4 px-6 w-80'>
			<h2 className='text-lg font-medium mb-2 text-jingga-200'>{title}</h2>
			<p className='text-sm font-light mb-4 text-jingga-100'>{message}</p>
			<div className='flex justify-end space-x-2'>
				<button className='btn btn-outline font-medium btn-sm rounded-md w-16' onClick={onCancel}>
					Tidak
				</button>
				<button className='btn bg-jingga-200 font-medium btn-sm rounded-md w-16' onClick={onConfirm}>
					Ya
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;

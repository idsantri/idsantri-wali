const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
	<div className='fixed inset-0 flex items-center justify-center bg-jingga-900 bg-opacity-70 z-50'>
		<div className='bg-jingga-300 rounded-md shadow-lg py-4 px-6 w-80'>
			<h2 className='text-lg font-medium mb-2 text-jingga-800'>{title}</h2>
			<p className='text-sm font-light mb-4 text-jingga-900'>{message}</p>
			<div className='flex justify-end space-x-2'>
				<button className='btn btn-outline font-medium btn-sm rounded-md w-16 bg-jingga-200 text-jingga-700 shadow-sm shadow-jingga-600 border-none' onClick={onCancel}>
					Tidak
				</button>
				<button
					className='btn font-medium btn-sm rounded-md w-16 bg-jingga-700 text-jingga-200 shadow-sm shadow-jingga-100 border-none hover:text-jingga-950'
					onClick={onConfirm}
				>
					Ya
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;

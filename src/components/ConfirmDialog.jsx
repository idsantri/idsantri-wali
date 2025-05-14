const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
	<div className='fixed inset-0 z-50 flex items-center justify-center bg-jingga-900 bg-opacity-70'>
		<div className='px-6 py-4 rounded-md shadow-lg bg-jingga-300 w-80'>
			<h2 className='mb-2 text-lg font-medium text-jingga-800'>{title}</h2>
			<p className='mb-4 text-sm font-light text-jingga-900'>{message}</p>
			<div className='flex justify-end space-x-2'>
				<button className='w-16 font-medium border-none rounded-md shadow-sm btn btn-outline btn-sm bg-jingga-200 text-jingga-700 shadow-jingga-600' onClick={onCancel}>
					Tidak
				</button>
				<button
					className='w-16 font-medium border-none rounded-md shadow-sm btn btn-sm bg-jingga-700 text-jingga-200 shadow-jingga-100 hover:text-jingga-950'
					onClick={onConfirm}
				>
					Ya
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;

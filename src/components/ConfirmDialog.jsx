const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
	<div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] bg-base-300/50'>
		<div className='px-6 py-4 rounded-md shadow-lg bg-warning text-warning-content w-80'>
			<h2 className='mb-2 text-lg font-medium'>{title}</h2>
			<p className='mb-4 text-sm font-light'>{message}</p>
			<div className='flex justify-end space-x-2'>
				<button className='w-16 btn btn-sm btn-secondary' onClick={onCancel}>
					Tidak
				</button>
				<button className='w-16 btn btn-sm btn-primary' onClick={onConfirm}>
					Ya
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;

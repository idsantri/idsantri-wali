export default function CardHeader({ title }) {
	const santri = JSON.parse(localStorage.getItem('santri') || 'null');

	return (
		<div className='mb-2 overflow-hidden rounded-md'>
			<h2 className='p-2 m-0 font-light text-center bg-accent text-accent-content'>{title}</h2>
			{santri && (
				<div className='text-center bg-info text-info-content'>
					<div className='p-2'>
						<div>{santri.nama}</div>
						<div className='text-xs font-light'>{santri.data_akhir}</div>
					</div>
				</div>
			)}
		</div>
	);
}

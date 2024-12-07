import PropTypes from 'prop-types';

function CardHeader({ title }) {
	const santri = JSON.parse(localStorage.getItem('santri') || 'null');

	return (
		<div className='mb-2 overflow-hidden rounded-md'>
			<h2 className='p-2 m-0 text-xl font-light text-center bg-jingga-100 text-jingga-800'>{title}</h2>
			{santri && (
				<div className='text-center bg-jingga-200'>
					<div className='p-2'>
						<div>{santri.nama}</div>
						<div className='text-xs font-light'>{santri.data_akhir}</div>
					</div>
				</div>
			)}
		</div>
	);
}
CardHeader.propTypes = {
	title: PropTypes.string.isRequired,
};
export default CardHeader;

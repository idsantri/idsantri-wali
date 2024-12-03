import PropTypes from 'prop-types';

function CardHeader({ title }) {
	const santri = JSON.parse(localStorage.getItem('santri'));

	return (
		<>
			<h2
				style={{
					fontSize: '1.4em',
					textAlign: 'center',
					fontWeight: 300,
				}}
				className='m-0 p-2 bg-jingga-100'
			>
				{title}
			</h2>
			{santri && (
				<div className='bg-jingga-200 text-center rounded-sm mb-2'>
					<div className='p-2 fw-bold'>
						<div>{santri.nama}</div>
						<div className='text-sm font-light'>{santri.data_akhir}</div>
					</div>
				</div>
			)}
		</>
	);
}
CardHeader.propTypes = {
	title: PropTypes.string.isRequired,
};
export default CardHeader;

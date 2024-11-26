import PropTypes from 'prop-types';

function CardHeader({ children }) {
	return (
		<h2
			style={{
				fontSize: '1.4em',
				textAlign: 'center',
				fontWeight: 300,
			}}
			className='m-0 p-2 bg-color3'
		>
			{children}
		</h2>
	);
}
CardHeader.propTypes = {
	children: PropTypes.string.isRequired,
};
export default CardHeader;

import { Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<div
			style={{
				width: '100px',
				height: '100px',
				margin: 'auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Spinner animation="grow" size="xl" style={{ scale: '1.25' }} />
		</div>
	);
};
export default Loading;

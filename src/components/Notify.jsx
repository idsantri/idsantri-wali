import PropTypes from 'prop-types';
import { Toast, ToastContainer } from 'react-bootstrap';

function Notify({
	message,
	title,
	code,
	show,
	onClose,
	delay = 2500,
	isError,
}) {
	return (
		<ToastContainer
			className={`${isError ? 'bg-danger' : 'bg-success'}`}
			style={{
				zIndex: 1,
				position: 'fixed',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				bottom: '10px',
			}}
		>
			<Toast show={show} onClose={onClose} delay={delay} autohide>
				<Toast.Header>
					<strong className="me-auto">{title}</strong>
					{code && <small>{code}</small>}
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
Notify.propTypes = {
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	code: PropTypes.string,
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	delay: PropTypes.number,
	isError: PropTypes.bool,
};

export default Notify;

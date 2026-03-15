import { toast } from 'react-toastify';

const notifySuccess = ({ message, position = 'bottom-center p-2', autoClose = 2500 }) => {
	toast.success(<div dangerouslySetInnerHTML={{ __html: message }} />, {
		position: position,
		autoClose: autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

const notifyError = ({ message, position = 'bottom-center p-2', autoClose = 2500 }) => {
	toast.error(<div dangerouslySetInnerHTML={{ __html: message }} />, {
		position: position,
		autoClose: autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export { notifySuccess, notifyError };

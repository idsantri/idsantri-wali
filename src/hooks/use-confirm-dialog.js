import { useContext } from 'react';
import { ConfirmDialogContext } from '../context/ConfirmDialog';

const useConfirmDialog = () => {
	const confirmDialog = useContext(ConfirmDialogContext);
	return confirmDialog;
};

export default useConfirmDialog;

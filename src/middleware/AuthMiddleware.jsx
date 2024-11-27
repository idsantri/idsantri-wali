import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/authStore';

const AuthMiddleware = ({ children }) => {
	const { isAuthenticated } = useAuthStore.getState().auth;
	return isAuthenticated ? children : <Navigate to='/login' />;
};

// Validasi prop children
AuthMiddleware.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthMiddleware;

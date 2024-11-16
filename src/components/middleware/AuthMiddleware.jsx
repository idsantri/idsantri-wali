import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthMiddleware = ({ children }) => {
	const { auth } = useAuthStore();
	return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

// Validasi prop children
AuthMiddleware.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthMiddleware;

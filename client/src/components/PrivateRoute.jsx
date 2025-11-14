import { Navigate } from 'react-router-dom';
import auth from '../user/auth-helper';

const PrivateRoute = ({ children }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

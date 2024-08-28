/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = true; // Ideally, check for a valid token from local storage or state
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;

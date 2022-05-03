import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { token } = useSelector((store) => store.authentication);
  return token ? (
    children
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace={true} />
  );
};

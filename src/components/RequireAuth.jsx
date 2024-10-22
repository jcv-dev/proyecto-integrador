import { Navigate, Outlet } from 'react-router-dom';
import userStore from '../stores/userStore';

const RequireAuth = () => {
  const currentUser = userStore((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;

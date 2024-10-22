import { Navigate, Outlet } from 'react-router-dom';
import userStore from '../stores/userStore';

const RequireAuth = () => {
  const currentUser = userStore((state) => state.user);
  console.log("User signed in CHECK:", currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;

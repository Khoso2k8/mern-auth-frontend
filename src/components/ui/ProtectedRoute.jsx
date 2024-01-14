import { Navigate, Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/userSlice';
function ProtectedRoute() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const tokenExpiration = 2 * 60 * 60 * 1000;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch(logout());
      }, tokenExpiration);
      return () => clearInterval(id);
    },
    [dispatch, tokenExpiration]
  );

  return <>{user ? <Outlet /> : <Navigate to="/login" replace />}</>;
}

export default ProtectedRoute;

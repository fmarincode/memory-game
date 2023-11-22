import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Contexts/auth/AuthProvider';

const RequireAuth = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);


  if (!auth) {
    return <Navigate to="/" />;
  }

  if (requiredRole.includes(auth.role)) {
    return children;
  }

  return <Navigate to="/" />;
};

export default RequireAuth;
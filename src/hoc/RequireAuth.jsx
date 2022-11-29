import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const RequireAuth = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { RequireAuth };

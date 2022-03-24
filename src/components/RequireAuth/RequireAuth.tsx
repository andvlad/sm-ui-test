import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { selectToken } from 'pages/Login/store/selectors';
import { IRequireAuth } from './RequireAuth.types';

export function RequireAuth({ children }: IRequireAuth) {
  const token = useAppSelector(selectToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

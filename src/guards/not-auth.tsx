import { useAuthStore } from '$stores/auth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type NotAuthGuardProps = {
  children?: React.ReactNode;
};

export const NotAuthGuard: React.FC<NotAuthGuardProps> = ({ children }) => {
  const isAuth = useAuthStore((s) => s.isAuth);
  if (isAuth) return <Navigate to='/' replace={true} />;
  return <>{children ?? <Outlet />}</>;
};

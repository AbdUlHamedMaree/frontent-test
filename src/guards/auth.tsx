import { LoginPage } from '$pages/auth/login';
import { useAuthStore } from '$stores/auth';
import React from 'react';
import { Outlet } from 'react-router-dom';

export type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuth = useAuthStore((s) => s.isAuth);
  if (!isAuth) return <LoginPage />;
  return <>{children ?? <Outlet />}</>;
};

import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainHeader } from './header';

export type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <Container component='main' maxWidth='xl'>
        {children ?? <Outlet />}
      </Container>
    </>
  );
};

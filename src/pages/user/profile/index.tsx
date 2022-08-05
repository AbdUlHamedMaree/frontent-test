import { useAuthStore } from '$stores/auth';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

export type UserProfilePageProps = {
  //
};

export const UserProfilePage: React.FC<UserProfilePageProps> = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          src={user?.picture}
          sx={{ objectFit: 'cover', width: 150, height: 150, borderRadius: '50%' }}
        />
        <Typography component='h1' variant='h5'>
          {user?.name}
        </Typography>
        <Typography component='h3' variant='h6'>
          {user?.username}
        </Typography>
      </Box>
    </Container>
  );
};

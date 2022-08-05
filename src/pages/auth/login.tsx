import { authApi } from '$api/auth';
import { storage } from '$libs/storage';
import { useAuthStore } from '$stores/auth';
import { LockOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import shallow from 'zustand/shallow';

export type LoginPageProps = {
  //
};

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [setIsAuth, setUser] = useAuthStore((s) => [s.setIsAuth, s.setUser], shallow);

  const loginMutation = useMutation(['post', 'auth/login'], authApi.login, {
    onSuccess: ({ data: { accessToken, user } }) => {
      setIsAuth(true);
      setUser(user);
      storage.accessToken.set(accessToken);
    },
  });
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      loginMutation.mutateAsync({
        username: data.get('username') as string,
        password: data.get('password') as string,
      });
    },
    [loginMutation],
  );

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Typography variant='body2' display='inline'>
                {"Don't have an account? "}
              </Typography>
              <Link component={RouterLink} to='/auth/sign-up' variant='body2'>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

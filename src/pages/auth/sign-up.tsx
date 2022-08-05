import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { authApi } from '$api/auth';
import { storage } from '$libs/storage';
import { useAuthStore } from '$stores/auth';
import { useMutation } from '@tanstack/react-query';
import shallow from 'zustand/shallow';
import { ButtonBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { fileToBase64 } from '$utils/file-to-base64';
import { Link as RouterLink } from 'react-router-dom';

const defaultProfilePicture = '/default-avatar.png';
export type SignUpPageProps = {
  //
};

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  const [setIsAuth, setUser] = useAuthStore((s) => [s.setIsAuth, s.setUser], shallow);

  const signUpMutation = useMutation(['post', 'auth/sign-up'], authApi.signUp, {
    onSuccess: ({ data: { accessToken, user } }) => {
      setIsAuth(true);
      setUser(user);
      storage.accessToken.set(accessToken);
    },
  });

  const handlePictureChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      setProfilePicture(await fileToBase64(file));
    },
    [],
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      signUpMutation.mutateAsync({
        username: data.get('username') as string,
        name: data.get('name') as string,
        password: data.get('password') as string,
        picture: profilePicture === defaultProfilePicture ? undefined : profilePicture,
      });
    },
    [profilePicture, signUpMutation],
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ButtonBase component='label' sx={{ borderRadius: '50%' }}>
                <Box
                  component='img'
                  src={profilePicture}
                  sx={{ objectFit: 'cover', width: 150, height: 150, borderRadius: '50%' }}
                />
                <input hidden accept='image/*' type='file' onChange={handlePictureChange} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='full-name'
                name='fullName'
                required
                fullWidth
                id='fullName'
                label='Full Name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={signUpMutation.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Typography variant='body2' display='inline'>
                {'Already have an account? '}
              </Typography>

              <Link component={RouterLink} to='/auth/login' variant='body2'>
                Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

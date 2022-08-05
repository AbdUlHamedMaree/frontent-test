import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@tanstack/react-query';
import { ButtonBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { fileToBase64 } from '$utils/file-to-base64';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { postsApi } from '$api/posts';

const defaultPostPicture = '/default-image.png';
export type NewPostPageProps = {
  //
};

export const NewPostPage: React.FC<NewPostPageProps> = () => {
  const [postPicture, setPostPicture] = useState(defaultPostPicture);
  const navigate = useNavigate();

  const createPostMutation = useMutation(['post', 'posts'], postsApi.createPost, {
    onSuccess: () => {
      navigate('/');
    },
  });

  const handlePictureChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      setPostPicture(await fileToBase64(file));
    },
    [],
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      createPostMutation.mutateAsync({
        category: data.get('category') as string,
        content: data.get('content') as string,
        image: postPicture === defaultPostPicture ? (undefined as any) : postPicture,
      });
    },
    [postPicture, createPostMutation],
  );

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Add />
        </Avatar>
        <Typography component='h1' variant='h5'>
          New Post
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ButtonBase component='label'>
                <Box
                  component='img'
                  src={postPicture}
                  sx={{ objectFit: 'cover', width: 150, height: 150 }}
                />
                <input hidden accept='image/*' type='file' onChange={handlePictureChange} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='post-category'
                name='category'
                id='category'
                label='Category'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='content'
                label='Content'
                name='content'
                minRows={3}
                required
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={createPostMutation.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            create
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

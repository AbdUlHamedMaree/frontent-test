import { favoritesApi } from '$api/favorite';
import { postsApi } from '$api/posts';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useMemo } from 'react';
import { Post } from '$components/post';

export type FeedsPageProps = {
  //
};

export const FeedsPage: React.FC<FeedsPageProps> = () => {
  const postsQuery = useQuery(['get', 'posts'], postsApi.getPosts);
  const favoritesQuery = useQuery(['get', 'favorites'], favoritesApi.getMyFavorites);
  const toggleFavoriteMutation = useMutation(['put', 'favorites/:id'], favoritesApi.toggleFavorite);

  const toggleFavorite = useCallback(
    (id: string) => () => toggleFavoriteMutation.mutateAsync(id),
    [],
  );

  const isFav = useCallback(
    (id: string) => favoritesQuery.data?.data.includes(id),
    [favoritesQuery.data?.data],
  );

  const posts = useMemo(
    () =>
      postsQuery.data?.data.map((el) => (
        <Grid key={el.id} item xs={12} md={6} lg={4}>
          <Post {...el} isFav={isFav(el.id)} toggleFav={toggleFavorite(el.id)} />
        </Grid>
      )),
    [isFav, postsQuery.data?.data, toggleFavorite],
  );

  if (postsQuery.isLoading && favoritesQuery.isLoading)
    return (
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size='4rem' />
      </Box>
    );

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {posts}
      </Grid>
    </Box>
  );
};

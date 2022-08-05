import { Box, Typography } from '@mui/material';
import React from 'react';

export type NotFoundPageProps = {
  //
};

export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h1'>Page Not Found</Typography>
    </Box>
  );
};

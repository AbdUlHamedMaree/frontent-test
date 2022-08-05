import { queryClient } from '$config/react-query';
import { routes } from '$routes';
import { theme } from '$theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';

export const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

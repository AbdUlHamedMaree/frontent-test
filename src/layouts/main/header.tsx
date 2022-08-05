import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '$stores/auth';
import shallow from 'zustand/shallow';
import { storage } from '$libs/storage';

export type MainHeaderProps = {
  //
};

export const MainHeader: React.FC<MainHeaderProps> = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = useAuthStore((s) => s.user);
  const [setIsAuth, setUser] = useAuthStore((s) => [s.setIsAuth, s.setUser], shallow);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = useCallback(() => {
    setIsAuth(false);
    setUser(null);
    storage.accessToken.remove();
    navigate('/');
  }, []);

  return (
    <AppBar position='static' component='header'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box component='nav' sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to='/' color='inherit' underline='none'>
              Feeds
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title={user.name}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.picture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={RouterLink} to='/user/profile'>
                    <Typography textAlign='center'>Profile</Typography>
                  </MenuItem>
                  <MenuItem component={RouterLink} to='/posts/new'>
                    <Typography textAlign='center'>New Post</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button LinkComponent={RouterLink} color='inherit' variant='text' sx={{ mr: 2 }}>
                  login
                </Button>
                <Button LinkComponent={RouterLink} color='inherit' variant='outlined'>
                  sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

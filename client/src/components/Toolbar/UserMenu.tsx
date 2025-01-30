import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/usersSlice.ts';
import { logout } from '../../features/users/usersThunks.ts';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/login');
  }

  return (
    <>
      <Typography variant="h3" component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
        Spotify
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Button
          onClick={handleClick}
          color="inherit"
        >
          Hello {user.username}!
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              navigate('/track_history');
              setAnchorEl(null);
            }}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            Listened tracks history
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
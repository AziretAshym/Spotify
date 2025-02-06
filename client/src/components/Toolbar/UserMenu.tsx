import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/usersSlice.ts';
import { logout } from '../../features/users/usersThunks.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../globalConstants.ts';

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


  const userAvatar = (() => {
    if (typeof user.avatar === "string") {
      return user.avatar.startsWith("images/") ? `${apiUrl}/${user.avatar}` : user.avatar;
    }
    return undefined;
  })();

  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <>
      <Typography variant="h3" component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
        Spotify
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Avatar alt={user.displayName} src={userAvatar} />
        <Button
          onClick={handleClick}
          color="inherit"
        >
          {user.displayName}
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
          >
            Listened tracks history
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/add-new-artist');
              setAnchorEl(null);
            }}
          >
            Add new artist
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/add-new-album');
              setAnchorEl(null);
            }}
          >
            Add new album
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/add-new-track');
              setAnchorEl(null);
            }}
          >
            Add new track
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
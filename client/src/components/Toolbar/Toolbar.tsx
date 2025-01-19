import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/usersSlice.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';


const AppToolbar = () => {
  const user = useAppSelector(selectUser)
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "60px" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h3" component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
            Spotify
          </Typography>
          {user ?
            <>
              <UserMenu user={user} />
            </>
           :
            <AnonymousMenu />
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;

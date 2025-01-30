import { AppBar, Box, Toolbar } from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/usersSlice.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';


const AppToolbar = () => {
  const user = useAppSelector(selectUser)
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "15px" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const AppToolbar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "60px" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h3" component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
            Spotify
          </Typography>
          <Button component={NavLink} to="/register" color="inherit">
            Sing up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;

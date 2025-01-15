import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const AppToolbar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "60px" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center"}}>
          <Typography variant="h3" component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
            Spotify
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;

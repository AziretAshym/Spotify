import { AppBar, Box, Toolbar, Typography } from '@mui/material';


const AppToolbar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "60px" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center"}}>
          <Typography variant="h3">
            Spotify
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;

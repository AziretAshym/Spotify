import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Box marginLeft={"auto"}>
        <Button component={NavLink} to="/register" color="inherit">
          Sing up
        </Button>
        <Button component={NavLink} to="/login" color="inherit">
          Sing in
        </Button>
      </Box>
    </>
  );
};

export default AnonymousMenu;
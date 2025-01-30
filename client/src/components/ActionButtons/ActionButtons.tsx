import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ActionButtons = () => {
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px', marginBottom: '40px'}}>
        <Button
          component={NavLink}
          to="/add-new-artist"
          variant="contained"
        >
          Add-new-artist
        </Button>
        <Button
          component={NavLink}
          to="/add-new-album"
          variant="contained"
          >
          Add-new-album
        </Button>
        <Button
          component={NavLink}
          to="/add-new-track"
          variant="contained"
        >
          Add-new-track
        </Button>
      </Box>
    </>
  );
};

export default ActionButtons;
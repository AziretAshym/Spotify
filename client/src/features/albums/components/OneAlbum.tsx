import { IAlbum } from '../../../types';
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { apiUrl } from '../../../globalConstants.ts';
import NoPictureImage from '../../../assets/NoPictureImage.jpeg';

interface Props {
  album: IAlbum,
}

const OneAlbum: React.FC<Props> = ({ album }) => {
  const albumImage = album.image ? `${apiUrl}/${album.image}` : NoPictureImage;

  return (
    <Card sx={{ width: "330px", margin: 2 }}>
      <CardMedia
        component="img"
        height="140px"
        image={albumImage}
        alt={album.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" fontWeight={600}>
          {album.title}
        </Typography>
        <Typography color="text.secondary">
          Year: <strong>{album.yearOfIssue}</strong>
        </Typography>
        <Typography color="text.secondary">
          Count of tracks: <strong>{album.trackCount}</strong>
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <NavLink to={`/albums/${album._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="primary">
              View Tracks
            </Typography>
          </NavLink>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OneAlbum;

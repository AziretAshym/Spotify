import { IAlbum } from '../../../types';
import React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { apiUrl } from '../../../globalConstants.ts';
import NoPictureImage from '../../../assets/NoPictureImage.jpeg';
import { Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { deleteAlbum, fetchAlbums } from '../albumsThunks.ts';
import { toast } from 'react-toastify';

interface Props {
  album: IAlbum;
  onDelete: (albumId: string) => void;
}

const OneAlbum: React.FC<Props> = ({ album, onDelete }) => {
  const albumImage = album.image ? `${apiUrl}/${album.image}` : NoPictureImage;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);

  const handleDelete = async () => {
    if (!onDelete) {
      console.error("onDelete is not a function");
      return;
    }

    try {
      await dispatch(deleteAlbum(album._id));
      onDelete(album._id);
      dispatch(fetchAlbums(album.artist?._id));
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete the album.');
    }
  };

  return (
    <Card sx={{ width: "330px", margin: 2, position: "relative" }}>
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

        <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <NavLink to={`/albums/${album._id}/tracks`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="primary">
              View Tracks
            </Typography>
          </NavLink>
          {user?.role === 'admin' && (
            <IconButton
              sx={{
                backgroundColor: "error.main",
                color: "#fff",
                '&:hover': {
                  backgroundColor: "error.dark",
                }
              }}
              onClick={handleDelete}
            >
              <Delete />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default OneAlbum;

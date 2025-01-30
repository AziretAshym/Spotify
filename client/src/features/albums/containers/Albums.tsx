import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchAlbums } from '../albumsThunks.ts';
import { fetchOneArtist } from '../../artists/artistsThunks.ts';
import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OneAlbum from '../components/OneAlbum.tsx';
import { toast } from 'react-toastify';

const Albums = () => {
  const { artistId } = useParams();
  const dispatch = useAppDispatch();

  const [artistName, setArtistName] = useState<string>('');
  const albums = useAppSelector(state => state.albums.albums);
  const isLoading = useAppSelector(state => state.albums.fetchLoading);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));

      dispatch(fetchOneArtist(artistId))
        .unwrap()
        .then((artist) => {
          setArtistName(artist.name);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, artistId]);

  const handleDeleteAlbum = (albumId: string) => {
    toast.success(`Album with ID ${albumId} deleted successfully.`);
  };

  return (
    <div>
      <Typography variant="h4">
        {artistName}/Albums
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {albums.length === 0 ? (
            <Typography variant="h6">No albums</Typography>
          ) : (
            albums.map((album) => (
              <OneAlbum key={album._id} album={album} onDelete={handleDeleteAlbum} />
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default Albums;

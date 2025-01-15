import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchTracks } from '../tracksThunks.ts';
import { fetchAlbums } from '../../albums/albumsThunks.ts';
import { fetchOneArtist } from '../../artists/artistsThunks.ts';
import { CircularProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Tracks = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();

  const tracks = useAppSelector((state) => state.tracks.tracks);
  const album = useAppSelector((state) => state.albums.albums.find(a => a._id === albumId));
  const artist = useAppSelector((state) => state.artists.artists.find(a => a._id === album?.artist));
  const isLoading = useAppSelector((state) => state.tracks.fetchLoading);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracks(albumId));
      dispatch(fetchAlbums(album?.artist || ''));
      dispatch(fetchOneArtist(album?.artist || ''));
    }
  }, [dispatch, albumId, album?.artist]);

  return (
    <Box sx={{ padding: '20px' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{fontWeight: '500', marginBottom: '40px'}} >
            {artist?.name} / {album?.title} / Tracks
          </Typography>

          <Grid container spacing={2}>
            {tracks.length === 0 ? (
              <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                No tracks
              </Typography>
            ) : (
              tracks.map((track) => (
                <Box
                  key={track._id}
                  sx={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography>{track.number}.</Typography>
                    <Typography variant="h5">
                      <strong>{track.title}</strong>
                    </Typography>
                  </div>
                  <Typography color="text.secondary">Duration: {track.duration}</Typography>
                </Box>
              ))
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Tracks;

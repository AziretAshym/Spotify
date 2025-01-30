import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchTracks, deleteTrack } from '../tracksThunks.ts';
import { fetchAlbums } from '../../albums/albumsThunks.ts';
import { fetchOneArtist } from '../../artists/artistsThunks.ts';
import { CircularProgress, Typography, Box, Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addTrackToHistory } from '../../tracks_history/tracksHistoryThunks.ts';
import { toast } from 'react-toastify';

const Tracks = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.tracks.tracks);
  const album = useAppSelector((state) =>
    state.albums.albums.find((album) => album._id === albumId)
  );
  const artist = useAppSelector((state) =>
    state.artists.artists.find((artist) => artist._id === album?.artist._id)
  );
  const isLoading = useAppSelector((state) => state.tracks.fetchLoading);
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracks(albumId));
    }
  }, [dispatch, albumId]);

  useEffect(() => {
    if (album && album.artist) {
      dispatch(fetchAlbums(album.artist._id));
      dispatch(fetchOneArtist(album.artist._id));
    }
  }, [dispatch, album]);

  const handleListenTrack = async (trackId: string) => {
    const track = tracks.find((track) => track._id === trackId);
    try {
      await dispatch(addTrackToHistory(trackId)).unwrap();
      toast.success(`Track "${track?.title}" added to listening history.`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    try {
      await dispatch(deleteTrack(trackId)).unwrap();
      dispatch(fetchTracks(albumId!));
      toast.success("Track deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete track");
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: '500', marginBottom: '40px' }}>
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
                    <Button onClick={() => handleListenTrack(track._id)}>
                      <PlayCircleOutlineIcon />
                    </Button>
                    <Typography variant="h5">
                      <strong>{track.title}</strong>
                    </Typography>
                  </div>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography color="text.secondary">Duration: {track.duration}</Typography>
                    {user?.role === 'admin' && (
                      <IconButton color="error" onClick={() => handleDeleteTrack(track._id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
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
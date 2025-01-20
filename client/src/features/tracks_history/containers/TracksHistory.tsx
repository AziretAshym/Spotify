import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getTracksHistory } from '../tracksHistoryThunks.ts';
import { ITrackHistory } from '../../../types';

const TracksHistory = () => {
  const dispatch = useAppDispatch();
  const tracksHistory = useAppSelector((state) => state.tracksHistory.history);
  const isLoading = useAppSelector((state) => state.tracksHistory.loading);

  useEffect(() => {
    dispatch(getTracksHistory());
  }, [dispatch]);

  return (
    <Box sx={{ padding: '20px' }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: '500', marginBottom: '40px' }}>
            History of listened tracks
          </Typography>

          <Grid container spacing={2}>
            {tracksHistory.length === 0 ? (
              <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                No listening history
              </Typography>
            ) : (
              tracksHistory.map((trackHistory: ITrackHistory) => (
                <Box
                  key={trackHistory._id}
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
                    <Typography variant="h5">
                      <strong>{trackHistory.track.title}</strong>
                      <br />
                      <Typography variant="body2" color="text.secondary">
                        Artist: <strong>{trackHistory.track.album.artist.name}</strong> / Album: <strong>{trackHistory.track.album.title}</strong>
                      </Typography>
                    </Typography>
                  </div>
                  <Typography color="text.secondary">
                    Listened: {new Date(trackHistory.datetime).toLocaleString()}
                  </Typography>
                </Box>
              ))
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default TracksHistory;

import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtists, selectArtistCreateLoading } from '../artistsSlice.ts';
import { useEffect } from 'react';
import { fetchArtists } from '../artistsThunks.ts';
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography, Box } from '@mui/material';
import OneArtist from '../components/OneArtist.tsx';
import { IArtist } from '../../../types';
import { toast } from 'react-toastify';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists: IArtist[] = useAppSelector(selectArtists);
  const isFetchArtistsLoading = useAppSelector(selectArtistCreateLoading);

  const handleDeleteArtist = () => {
    toast.success('Artist deleted successfully.');
  };

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (isFetchArtistsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4">
        Artists
      </Typography>
      <Box sx={{ padding: "20px" }}>
        {artists.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "text.secondary", marginTop: "20px" }}
          >
            No Artists Found
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {artists.map((artist: IArtist) => (
              <OneArtist
                key={artist._id}
                _id={artist._id}
                name={artist.name}
                image={artist.image}
                info={artist.info}
                isPublished={artist.isPublished}
                onDelete={handleDeleteArtist}
                deleteLoading={false}
              />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Artists;

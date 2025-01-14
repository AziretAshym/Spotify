import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtist, selectFetchLoading } from '../artistsSlice.ts';
import { useEffect } from 'react';
import { fetchArtists } from '../artistsThunks.ts';
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from '@mui/material';
import OneArtist from '../components/OneArtist.tsx';


const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);
  const isFetchArtistsLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <>
      <Grid container direction={"column"}>
        {isFetchArtistsLoading ? (
          <CircularProgress />
        ) : (
          <>
            {artists.length === 0 && !isFetchArtistsLoading ? (
              <Typography variant="h6">No Artists</Typography>
            ) : (
              <>
                {artists.map((artist) => (
                  <OneArtist
                    key={artist._id}
                    _id={artist._id}
                    name={artist.name}
                    image={artist.image}
                    info={artist.info}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Artists;
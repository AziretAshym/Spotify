import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import { fetchArtists, fetchOneArtist, createArtist } from './artistsThunks.ts';

interface ArtistsState {
  artists: IArtist[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectArtists = (state: { artists: ArtistsState }) => state.artists.artists;
export const selectArtistCreateLoading = (state: { artists: ArtistsState }) => state.artists.createLoading;

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action: PayloadAction<IArtist[]>) => {
        state.artists = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneArtist.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOneArtist.fulfilled, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchOneArtist.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const artistReducers = artistsSlice.reducer;


import { IArtist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunks.ts';
import { RootState } from '../../app/store.ts';

interface IArtistsState {
  artists: IArtist[];
  fetchLoading: boolean;
}

const initialState: IArtistsState = {
  artists: [],
  fetchLoading: false,
};

export const selectArtist =(state: RootState) => state.artists.artists;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artist}) => {
        state.fetchLoading = false;
        state.artists = artist;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false
      })

  }
});

export const artistReducers = artistsSlice.reducer;

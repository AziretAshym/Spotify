import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import { fetchArtists, fetchOneArtist, createArtist, deleteArtist, publishArtist } from './artistsThunks.ts';

interface ArtistsState {
  artists: IArtist[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  publishLoading: boolean;
  error: string | null;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  publishLoading: false,
  error: null,
};

export const selectArtists = (state: { artists: ArtistsState }) => state.artists.artists;
export const selectArtistCreateLoading = (state: { artists: ArtistsState }) => state.artists.createLoading;
export const selectPublishLoading = (state: { artists: ArtistsState }) => state.artists.publishLoading;

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action: PayloadAction<IArtist[]>) => {
        state.artists = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message || 'Failed to fetch artists';
      })

      .addCase(fetchOneArtist.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchOneArtist.fulfilled, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchOneArtist.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message || 'Failed to fetch artist';
      })

      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message || 'Failed to create artist';
      })

      .addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || 'Failed to delete artist';
      })

      .addCase(publishArtist.pending, (state) => {
        state.publishLoading = true;
        state.error = null;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(publishArtist.rejected, (state, action) => {
        state.publishLoading = false;
        state.error = action.error.message || 'Failed to update publish status';
      });
  },
});

export const artistReducers = artistsSlice.reducer;

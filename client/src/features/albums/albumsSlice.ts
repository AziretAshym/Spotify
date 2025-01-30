import { IAlbum } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAlbum, deleteAlbum, fetchAlbums } from './albumsThunks.ts';

interface AlbumState {
  albums: IAlbum[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albums: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: null,
}

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchLoading = true;
        state.error = null
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.error.message || 'Failed to fetch albums';
      })

      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message || 'Failed to create album'
      })

      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || 'Failed to delete album';
      });
  }
});

export const albumsReducer = albumsSlice.reducer;

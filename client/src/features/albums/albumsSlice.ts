import { IAlbum } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAlbum, fetchAlbums } from './albumsThunks.ts';


interface AlbumState {
  albums: IAlbum[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  fetchLoading: false,
  createLoading: false,
}



export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.createLoading = false;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;
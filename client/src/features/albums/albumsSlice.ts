import { IAlbum } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbums } from './albumsThunks.ts';


interface AlbumState {
  albums: IAlbum[];
  fetchLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  fetchLoading: false,
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
      });
  }
});

export const albumsReducer = albumsSlice.reducer;
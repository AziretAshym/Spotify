import { createSlice } from '@reduxjs/toolkit';
import { createTrack, fetchTracks } from './tracksThunks';
import { ITrack } from '../../types';

interface TracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  createLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createTrack.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

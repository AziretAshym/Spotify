import { createSlice } from '@reduxjs/toolkit';
import { createTrack, fetchTracks, deleteTrack } from './tracksThunks'; // Импортируем deleteTrack
import { ITrack } from '../../types';

interface TracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
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
      })

      .addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
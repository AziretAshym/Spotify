import { createSlice } from '@reduxjs/toolkit';
import { fetchTracks } from './tracksThunks';
import { ITrack } from '../../types';



interface TracksState {
  tracks: ITrack[];
  fetchLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
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
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTrackToHistory, getTracksHistory } from './tracksHistoryThunks';
import { GlobalError, ITrackHistory } from '../../types';

interface TracksHistoryState {
  history: ITrackHistory[];
  loading: boolean;
  error: GlobalError | null;
}

const initialState: TracksHistoryState = {
  history: [],
  loading: false,
  error: null,
};

export const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTrackToHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(getTracksHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTracksHistory.fulfilled, (state, action: PayloadAction<ITrackHistory[]>) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getTracksHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;

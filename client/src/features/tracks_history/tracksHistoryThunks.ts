import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';
import { GlobalError, ITrackHistory } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const addTrackToHistory = createAsyncThunk<
  ITrackHistory,
  string,
  { rejectValue: GlobalError }
>(
  'tracksHistory/add',
  async (trackId, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state.users.user?.token;

    try {
      const response = await axiosApi.post<ITrackHistory>(
        '/track_history',
        { track: trackId },
        { headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

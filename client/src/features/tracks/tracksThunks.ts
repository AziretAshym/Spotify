import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';


export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async (albumId: string) => {
    const response = await axiosApi(`/tracks?album_id=${albumId}`);
    return response.data;
  }
);
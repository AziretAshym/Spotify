import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (artistId: string) => {
    const response = await axiosApi.get(`/albums?artist_id=${artistId}`);
    return response.data || [];
  }
);
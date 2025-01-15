import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import axiosApi from '../../axiosApi.ts';


export const fetchArtists = createAsyncThunk<IArtist[], void>(
  "artists/fetchArtists",
  async () => {
    const response = await axiosApi<IArtist[]>("/artists");
    return response.data || [];
  }
);

export const fetchOneArtist = createAsyncThunk<IArtist, string>(
  'artists/fetchOneArtist',
  async (artistId) => {
    try {
      const response = await axiosApi<IArtist>(`/artists/${artistId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist:', error);
      throw error;
    }
  }
);
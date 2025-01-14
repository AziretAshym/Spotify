import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import axiosApi from '../../axiosApi.ts';


export const fetchArtists = createAsyncThunk<IArtist[], void>(
  "artists/fetchArtists",
  async () => {
    const response = await axiosApi<IArtist[]>("/artists");
    return response.data || [];
  }
)
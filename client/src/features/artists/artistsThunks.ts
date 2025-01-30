import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArtistMutation, IArtist } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';


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


export const createArtist = createAsyncThunk<void, ArtistMutation, { state: RootState }>(
  "artists/addNewArtist",
  async (artistMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      await axiosApi.post("/artists", formData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error('Error creating artist:', e);
    }
  }
);

export const deleteArtist = createAsyncThunk<void, string, { state: RootState }>(
  "artists/deleteArtist",
  async (artistId, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axiosApi.delete(`/artists/${artistId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
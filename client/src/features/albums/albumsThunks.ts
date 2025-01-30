import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AlbumMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (artistId: string | undefined) => {
    if (!artistId) {
      console.error('Artist must have a ID');
    }

    try {
      const response = await axiosApi.get(`/albums?artist_id=${artistId}`);
      return response.data || [];
    } catch (e) {
      console.error(e)
    }
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, { state: RootState }>(
  "albums/addNewAlbum",
  async (albumMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      await axiosApi.post("/albums", formData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error('Error creating artist:', e);
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string, { state: RootState }>(
  "albums/deleteAlbum",
  async (albumId, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axiosApi.delete(`/albums/${albumId}`, {
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
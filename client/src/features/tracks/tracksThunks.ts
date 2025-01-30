import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { TracksMutation } from '../../types';
import { RootState } from '../../app/store.ts';


export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async (albumId: string | null) => {
    if (!albumId) return [];
    const response = await axiosApi(`/tracks?album_id=${albumId}`);
    return response.data;
  }
);

export const createTrack = createAsyncThunk<void, TracksMutation, { state: RootState }>(
  "tracks/addNewTrack",
  async (tracksMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const trackData: TracksMutation = {
      title: tracksMutation.title,
      album: tracksMutation.album,
      duration: tracksMutation.duration,
      isPublished: false
    };


    try {
      await axiosApi.post("/tracks", trackData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteTrack = createAsyncThunk<void, string, { state: RootState }>(
  "tracks/deleteTrack",
  async (trackId, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axiosApi.delete(`/tracks/${trackId}`, {
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
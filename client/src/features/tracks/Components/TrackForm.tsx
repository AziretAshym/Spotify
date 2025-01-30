import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toast } from 'react-toastify';
import { TracksMutation } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { createTrack } from '../tracksThunks.ts';
import { fetchAlbums } from '../../albums/albumsThunks.ts';
import { fetchArtists } from '../../artists/artistsThunks.ts';

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(state => state.tracks.createLoading);
  const artists = useAppSelector(state => state.artists.artists);
  const albums = useAppSelector(state => state.albums.albums);
  const [form, setForm] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (form.artist) {
      dispatch(fetchAlbums(form.artist));
    }
  }, [form.artist, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setForm({ ...form, [e.target.name as string]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.album || !form.duration) {
      toast.error('Please fill all fields');
      return;
    }

    const trackData: TracksMutation = {
      title: form.title,
      album: form.album,
      duration: form.duration,
      isPublished: false,
    };

    try {
      await dispatch(createTrack(trackData)).unwrap();
      toast.success('Track created successfully!');
      setForm({ title: '', artist: '', album: '', duration: '' });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '500px',
        marginX: 'auto',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Artist</InputLabel>
        <Select
          name="artist"
          value={form.artist}
          onChange={handleSelectChange}
          required
        >
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Album</InputLabel>
        <Select
          name="album"
          value={form.album}
          onChange={handleSelectChange}
          required
          disabled={!form.artist}
        >
          {albums.map((album) => (
            <MenuItem key={album._id} value={album._id}>
              {album.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Track Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextField
        label="Duration"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained" color="primary" disabled={createLoading}>
        {createLoading ? <CircularProgress size={24} /> : 'Create Track'}
      </Button>
    </Box>
  );
};

export default TrackForm;

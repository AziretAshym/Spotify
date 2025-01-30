import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toast } from 'react-toastify';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../../types';
import { createAlbum } from '../albumsThunks.ts';
import { fetchArtists } from '../../artists/artistsThunks.ts';
import { selectArtists } from '../../artists/artistsSlice.ts';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(state => state.albums.createLoading);
  const artists = useAppSelector(selectArtists);

  const [form, setForm] = useState({
    title: '',
    artist: '',
    yearOfIssue: '',
    image: null as File | null,
    isPublished: false,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (name === 'yearOfIssue') {
      if (Number(value) > new Date().getFullYear()) {
        toast.error('The year of issue cannot be greater than the current year');
        return;
      }
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setForm({ ...form, artist: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const albumData: AlbumMutation = {
      title: form.title,
      artist: form.artist,
      yearOfIssue: Number(form.yearOfIssue),
      image: form.image ? form.image : undefined,
      isPublished: false,
    };

    try {
      await dispatch(createAlbum(albumData)).unwrap();
      toast.success('Album created successfully!');
      setForm({ title: '', artist: '', yearOfIssue: '', image: null, isPublished: false });
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
        marginX: 'auto'
      }}
    >
      <TextField
        label="Album title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Artist</InputLabel>
        <Select
          name="artist"
          value={form.artist}
          onChange={handleSelectChange}
          required
        >
          {artists.map(artist => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Year of Issue"
        name="yearOfIssue"
        type="number"
        value={form.yearOfIssue}
        onChange={handleChange}
        required
      />


      <FileInput name="image" label="Album Cover" onGetFile={handleFileChange} />

      <Button type="submit" variant="contained" color="primary" disabled={createLoading}>
        {createLoading ? <CircularProgress size={24} /> : 'Create Album'}
      </Button>
    </Box>
  );
};

export default AlbumForm;

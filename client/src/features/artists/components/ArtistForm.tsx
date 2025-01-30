import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { createArtist, fetchArtists } from '../artistsThunks.ts';
import { selectArtistCreateLoading } from '../artistsSlice.ts';
import { toast } from 'react-toastify';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { ArtistMutation } from '../../../types';
import { useNavigate } from 'react-router-dom';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectArtistCreateLoading);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    image: null as File | null,
    info: '',
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const artistData: ArtistMutation = {
      name: form.name,
      image: form.image ? form.image : undefined,
      info: form.info,
      isPublished: false,
    };

    try {
      await dispatch(createArtist(artistData)).unwrap();
      toast.success('Artist created successfully!');
      setForm({ name: '', image: null, info: '', isPublished: false });
      await dispatch(fetchArtists());
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
        label="Artist Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Info"
        name="info"
        value={form.info}
        onChange={handleChange}
      />
      <FileInput name="image" label="Artist Image" onGetFile={handleFileChange} />
      <Button type="submit" variant="contained" color="primary" disabled={createLoading}>
        {createLoading ? <CircularProgress size={24} /> : 'Create Artist'}
      </Button>
    </Box>
  );
};

export default ArtistForm;

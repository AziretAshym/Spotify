import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { register } from './usersThunks.ts';


const RegisterPage = () => {

  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e)
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }


  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} size={12} spacing={2}>
              <Grid>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={inputChange}
                  error={Boolean(getFieldError('username'))}
                  helperText={getFieldError('username')}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={inputChange}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
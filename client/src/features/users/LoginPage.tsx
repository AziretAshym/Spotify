import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from './usersThunks.ts';
import { LockOpenOutlined } from '@mui/icons-material';


const LoginPage = () => {

  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
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
      await dispatch(login(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e)
    }
  };

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
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && (
           <Alert severity="error" sx={{mt: 3, width: "100%"}}>
             {loginError.error}
           </Alert>
          )}
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <NavLink to="/register">
                  Haven't created an Account yet? Sign up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
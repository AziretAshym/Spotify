import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';
import { data } from 'react-router-dom';

export const googleLogin = createAsyncThunk<User, string, {rejectValue: GlobalError}>(
  'users/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', {credential: credential});
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);


export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: ValidationError}
>(
  'users/register',
  async (registerMutation: RegisterMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/register', registerMutation);
      console.log(response,data);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<
  User,
  LoginMutation,
  {rejectValue: GlobalError}
>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/session', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`users/session`, {headers: {'Authorization': token}});
  }
);

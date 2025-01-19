import { User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { register } from './usersThunks.ts';

interface UsersState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, {payload: registerResponse}) => {
        state.user = registerResponse.user;
        state.registerLoading = false
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })

  }
});


export const usersReducer = usersSlice.reducer;

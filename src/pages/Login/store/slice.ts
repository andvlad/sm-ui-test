import { createSlice } from '@reduxjs/toolkit';
import { ILoginState } from '../Login.types';
import { register } from 'services/auth';

const initialState: ILoginState = {
  sl_token: '',
  client_id: '',
  name: '',
  email: '',
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.name = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = payload.error ? 'failed' : 'idle';
        state.sl_token = payload.data?.sl_token;
        state.client_id = payload.data?.client_id;
        state.email = payload.data?.email;
      });
  },
});

export const { setUsername, setStatus } = authSlice.actions;

export default authSlice.reducer;

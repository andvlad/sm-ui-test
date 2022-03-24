import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '../pages/Login/Login.types';

export const register = createAsyncThunk(
  'auth/register',
  async (data: ILogin, { signal }) => {
    const response = await fetch('https://api.supermetrics.com/assignment/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      signal,
      body: JSON.stringify(data)
    });
    const result = await response.json();

    return result;
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { postLogin } from '../api';

const loginUser = createAsyncThunk(
  'auth/SignIn',
  async (userData, {dispatch, getState}) => {
    try {
      console.log(userData);
      const data = await postLogin(userData);
    } catch {
    }
  },
);

export default loginUser;


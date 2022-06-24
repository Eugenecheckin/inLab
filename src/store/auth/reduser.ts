/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthData {
  user: {
    email: string,
    name: string,
  };
}

const initialState: IAuthData = {
  user: {
    email: '',
    name: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string, name: string }>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
} = authSlice.actions;

export default authSlice.reducer;

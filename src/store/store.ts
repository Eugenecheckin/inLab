import { configureStore } from '@reduxjs/toolkit';
import pokeApiReducer from './pokeApiSlice';

export const store = configureStore({
  reducer: {
    pokeApi: pokeApiReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

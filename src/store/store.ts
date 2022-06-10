import { configureStore } from '@reduxjs/toolkit';
import pokeApiReducer from './pokeApiSlice';

export const store = configureStore({
  reducer: {
    pokeApi: pokeApiReducer,
  },
});

export type PokeStore = ReturnType<typeof store.getState>;

export type PokeDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import pokeApiReducer from './pokeApiSlice';

export default configureStore({
  reducer: {
    pokeApi: pokeApiReducer,
  },
});


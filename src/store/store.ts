import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import pokeReducer from './poke/reduser';

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

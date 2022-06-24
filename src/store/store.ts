import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import pokeReducer from './poke/reduser';
import authReduser from './auth/reduser';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    poke: pokeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

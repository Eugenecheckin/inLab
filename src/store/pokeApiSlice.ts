/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PokeSlice, IPokemon, IShortPokemon } from './types';

const initialState: PokeSlice = {
  isNoticed: false,
  personsShortListData: [],
  personListData: [],
  filterPersonListData: [],
  filter: {
    ability: '',
  },
};

export const pokeApiSlice = createSlice({
  name: 'pokeApi',
  initialState,
  reducers: {
    show: (state) => {
      state.isNoticed = true;
    },
    hide: (state) => {
      state.isNoticed = false;
    },
    invert: (state) => {
      state.isNoticed = !state.isNoticed;
    },
    setPersonListData: (state, action: PayloadAction<Array<IPokemon>>) => {
      return {
        ...state,
        personListData: [
          ...state.personListData,
          ...action.payload,
        ],
      };
    },
    clearFilter: (state) => {
      return {
        ...state,
        filter: {
          ability: '',
        },
      };
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: {
          ability: action.payload,
        },
      };
    },
    setFilterPersonListData: (state, action: PayloadAction<Array<IPokemon>>) => {
      return {
        ...state,
        filterPersonListData: action.payload,
      };
    },
    setPersonShortListData: (state, action: PayloadAction<Array<IShortPokemon>>) => {
      return {
        ...state,
        personShortListData: action.payload,
      };
    },
  },
});

export const { show, hide, invert, setPersonListData, setFilter, clearFilter, setFilterPersonListData, setPersonShortListData } = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

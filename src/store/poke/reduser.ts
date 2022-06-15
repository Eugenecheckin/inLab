/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PokeSlice, IPokemonBase, IExtendedAbility } from '../../constants/types';

const initialState: PokeSlice = {
  isNoticed: false,
  filteredPokemons: [],
  filter: {
    ability: '',
  },
  pokemons: [],
  extendedAbilities: [],
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
    setPokemons: (state, action: PayloadAction<Array<IPokemonBase>>) => {
      return {
        ...state,
        pokemons: [
          ...state.pokemons,
          ...action.payload,
        ],
      };
    },
    setExtendedAbilities: (state, action: PayloadAction<Array<IExtendedAbility>>) => {
      return {
        ...state,
        extendedAbilities: action.payload,
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
    setFilteredPokemons: (state, action: PayloadAction<Array<IPokemonBase>>) => {
      return {
        ...state,
        filteredPokemons: action.payload,
      };
    },
  },
});

export const { show, hide, invert, setPokemons, setExtendedAbilities, setFilter, clearFilter, setFilteredPokemons } = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

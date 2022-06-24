/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPokemonBase, IExtendedAbility } from '../../constants/types';

export interface IPokeSlice {
  isNoticed: boolean;
  filteredPokemons: Array<IPokemonBase>;
  filter: { ability: string };
  pokemons: Array<IPokemonBase>;
  extendedAbilities: Array<IExtendedAbility>
}

const initialState: IPokeSlice = {
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
    isVisible: (state) => {
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

export const {
  isVisible,
  setPokemons,
  setExtendedAbilities,
  setFilter,
  clearFilter,
  setFilteredPokemons,
} = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

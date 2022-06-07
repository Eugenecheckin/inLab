/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPerson {
  id: string;
  name: string;
  shortAbilities: {
    effect: {effect: any; short_effect: any}[];
    flavor: any[];
    name: string;
  }[];
  source: {
    front: string;
    frontShiny: string;
    back: string;
    backShiny: string;
  };
}
export const pokeApiSlice = createSlice({
  name: 'pokeApi',
  initialState: {
    isNoticed: false,
    personListData: [],
    filterPersonListData: [],
    filter: {
      ability: '',
    },
  },
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
    setPersonListData: (state, action: PayloadAction<Array<IPerson>>) => {
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
    setFilterPersonListData: (state, action: PayloadAction<Array<IPerson>>) => {
      return {
        ...state,
        filterPersonListData: action.payload,
      };
    },
  },
});

export const { show, hide, invert, setPersonListData, setFilter, clearFilter, setFilterPersonListData } = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

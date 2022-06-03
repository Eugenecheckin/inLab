import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const pokeApiSlice = createSlice({
  name: 'pokeApi',
  initialState: {
    isNoticed: false,
    personListData: [],
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
    setPersonListData: (state, action: PayloadAction<any>) => {
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
  },
});

export const { show, hide, invert, setPersonListData, setFilter, clearFilter } = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

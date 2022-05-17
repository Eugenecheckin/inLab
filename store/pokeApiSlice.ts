import { createSlice } from '@reduxjs/toolkit';

export const pokeApiSlice = createSlice({
  name: 'pokeApi',
  initialState: {
    isNoticed: false,
    personListData: [],
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
    setPersonListData: (state, action) => {
      console.log('action', action);
      state.personListData = action.payload;
    },
  },
});

export const { show, hide, invert, setPersonListData } = pokeApiSlice.actions;

export default pokeApiSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'react-native-flash-message';
import { setFilteredPokemons, setExtendedAbilities } from './reduser';
import pokeApi from '../../api/pokeApi';
import { RootStore, AppDispatch } from '../store';
import { IPokemonBase, IExtendedAbility } from '../../constants/types';

interface IFilter {
  ability: string;
}

const hasAbility = (person: IPokemonBase, filter: IFilter): boolean => {
  const result = person.abilities.find((item) =>
    item.ability.name === filter.ability);
  return Boolean(result);
};

export const getFilteredPokemons = createAsyncThunk<unknown, unknown, { dispatch: AppDispatch, state: RootStore }>(
  'getFilteredPokes',
  async (args, { dispatch, getState }) => {
    const {
      filter,
      pokemons,
    } = getState().poke;
    const filterPersonList: Array<IPokemonBase> = pokemons.filter((person) => {
      const isFilterIn = hasAbility(person, filter);
      if (isFilterIn) {
        return true;
      } else {
        return false;
      }
    });
    dispatch(setFilteredPokemons(filterPersonList));
  },
);

export const getAbilities = createAsyncThunk(
  'getAbilities',
  async (listUrl: Array<string>, { dispatch }) => {
    try {
      const promiseList: Array<Promise<IExtendedAbility>> = listUrl.map((url) => {
        return pokeApi.loadPersonAbility(url);
      });
      const results = await Promise.all(promiseList);
      dispatch(setExtendedAbilities(results));

    } catch (err) {
      const customErr = err as Error;
      showMessage({
        message: `${customErr.message}`,
        type: 'info',
      });
    }
  },
);

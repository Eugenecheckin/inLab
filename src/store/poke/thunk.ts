import { createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'react-native-flash-message';
import { setPokemons, setFilteredPokemons, setExtendedAbilities } from './reduser';
import { loadPokemons, loadPokemon, loadPersonAbility } from '../../api/pokeApi';
import { RootStore, AppDispatch } from '../store';
import { IPokemonBase, IExtendedAbility } from '../../constants/types';
import { createError } from '../../utils/createError';

interface IFilter {
  ability: string;
}

const hasAbility = (person: IPokemonBase, filter: IFilter): boolean => {
  const result = person.abilities.find((item) =>
    item.ability.name === filter.ability);
  return !!result;
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

export const getPokemons = createAsyncThunk(
  'getPokes',
  async (offset: number, { dispatch }) => {
    try {
      const promiseList: Array<Promise<IPokemonBase>> = [];
      const persons = await loadPokemons({ limit: '10', offset });
      persons.forEach((person: { name: string }) => {
        promiseList.push(loadPokemon({name: person.name}));
      });
      const results = await Promise.all(promiseList);
      dispatch(setPokemons(results));
    } catch (err) {
      const customErr = err as Error;
      if (customErr.name === 'AxiosError') {
        showMessage({
          message: 'castom',
          type: 'info',
        });
      } else {
        throw createError('thunk custom err', 'getPokes');
      }
    }
  },
);

export const getAbilities = createAsyncThunk(
  'getAbilities',
  async (listUrl: Array<string>, { dispatch }) => {
    try {
      const promiseList: Array<Promise<IExtendedAbility>> = listUrl.map((item) => {
        return loadPersonAbility({url: item});
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

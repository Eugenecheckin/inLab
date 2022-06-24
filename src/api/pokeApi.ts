import axios from './axios';
import { IPokemonBase, IShortPokemonsList, IExtendedAbility } from '../constants/types';

type baseParams = {
  limit: number;
  offset: number;
}

export const loadPokemons = async (params: baseParams) => {
  const { data } = await axios.poke.get<{results: Array<IShortPokemonsList>}>('', {params});
  const promiseList = data.results.map((person: { name: string }) => { return loadPokemon(person.name); });
  return promiseList;
};

export const loadPokemon = async (name: string) => {
  const { data }: { data: IPokemonBase } = await axios.poke.get(`/${name}`);
  return data;
};

export const loadPersonAbility = async (url: string) => {
  const { data } = await axios.poke.get<IExtendedAbility>(url);
  return data;
};

export default {
  loadPersonAbility,
  loadPokemons,
  loadPokemon,
};

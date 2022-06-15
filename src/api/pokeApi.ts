import axios from './axios';
import { IPokemonBase, IShortListPokemons, IExtendedAbility } from '../constants/types';

type baseParams = {
  limit: string;
  offset: number;
}

export const loadPokemons = async (params: baseParams) => {
  const { data } : { data: { results: Array<IShortListPokemons> } } = await axios.get('/', {params});
  return data.results;
};

export const loadPokemon = async (params: {name : string }) => {
  const { data } : { data: IPokemonBase} = await axios.get(`/${params.name}`);
  return data;
};

export const loadPersonAbility = async (params: { url: string }) => {
  const { data } : { data: IExtendedAbility} = await axios.get(`${params.url}`);
  return data;
};

export default {
  loadPersonAbility,
  loadPokemons,
  loadPokemon,
};

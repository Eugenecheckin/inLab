import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPersonListData, setFilterPersonListData, setPersonShortListData } from './pokeApiSlice';
import { loadPokemons, loadExtendPersonData, loadExtendAbilities } from '../api/pokeApi';
import { RootStore, AppDispatch } from './store';

interface IAbility {
  name: string;
}
interface IPerson {
  shortAbilities: Array<IAbility>,
}
interface IFilter {
  ability: string;
}

const hasAbility = (person: IPerson, filter: IFilter): boolean => {
  const result = person.shortAbilities.find((item) =>
    item.name === filter.ability);
  return !!result;
};

export const getFilteredList = createAsyncThunk<unknown, unknown, { dispatch: AppDispatch, state: RootStore }>(
  'getFilteredPokes',
  async (args, { dispatch, getState }) => {
    const {
      filter,
      personListData,
    } = getState().pokeApi;
    const filterPersonList: Array<IPerson> = [];
    personListData.forEach((person) => {
      const isFilterIn = hasAbility(person, filter);
      if (isFilterIn) {
        filterPersonList.push(person);
      }
    });
    dispatch(setFilterPersonListData(filterPersonList));
  },
);

type PersonsList = {
  id: string;
  name: string;
  shortAbilities: {
    effect: { effect: any; short_effect: any }[];
    flavor: any[];
    name: string;
  }[] | undefined;
  source: {
    front: string;
    frontShiny: string;
    back: string;
    backShiny: string;
  } | undefined;
}[]
const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const pokeListLoader = createAsyncThunk(
  'getPokes',
  async (ofset: number, { dispatch }) => {
    const personListData: PersonsList = [];
    const persons = await loadPokemons({ limit: '10', ofset });
    const keys = Object.keys(persons.results);
    for (let k = 0; k < keys.length; k++) {
      const person = persons.results[k];
      const shortAbilities = [];
      const extendPersonData = await loadExtendPersonData(person.url);
      if (extendPersonData) {
        const parsedEffect: { effect: any; short_effect: any }[] = [];
        const parsedFlavor: any[] = [];
        const nodes = Object.keys(extendPersonData.abilities);
        for (let i = 0; i < nodes.length; i++) {
          const { ability } = extendPersonData.abilities[i];
          // eslint-disable-next-line no-await-in-loop
          const loadedAbility = await loadExtendAbilities(ability.url);
          if (loadedAbility) {
            loadedAbility.effectEntries.forEach((item: { effect: any, short_effect: any, language: { name: string } }) => {
              if (item.language.name === 'en') {
                const { effect, short_effect } = item;
                parsedEffect.push({ effect, short_effect });
              }
            });
            loadedAbility.flavorEntries.forEach((flavor: { language: { name: string }, flavor_text: string, version_group: { name: string } }) => {
              if (flavor.language.name === 'en') {
                parsedFlavor.push(`${flavor.flavor_text}  -  ${flavor.version_group.name}`);
              }
            });
          }
          const shortAbility = {
            effect: parsedEffect,
            flavor: parsedFlavor,
            name: ability.name,
          };
          shortAbilities.push(shortAbility);
        }
        const personData = {
          id: extendPersonData.id,
          name: person.name,
          shortAbilities,
          source: {
            front: `${imageUrl}${extendPersonData.id}.png`,
            frontShiny: `${imageUrl}${extendPersonData.id}.png`,
            back: `${imageUrl}${extendPersonData.id}.png`,
            backShiny: `${imageUrl}${extendPersonData.id}.png`,
          },
        };
        personListData.push(personData);
      }
    }
    await dispatch(setPersonListData(personListData));
  },
);

type IPersonsShortList = {
  url: string,
  name: string,
}[]

export const pokeLoader1 = createAsyncThunk(
  'getPokes1',
  async (ofset: number, { dispatch }) => {
    const personsList: IPersonsShortList = [];
    const persons = await loadPokemons({ limit: '10', ofset });
    persons.results.forEach((person: { url: string, name: string }) => {
      personsList.push({ url: person.url, name: person.name });
    });
    await dispatch(setPersonShortListData(personsList));
  },
);

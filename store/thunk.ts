import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPersonListData } from './pokeApiSlice';
import { loadPersons, loadExtendPersonData, loadExtendAbilities } from '../api/pokeApi';

type PersonList = {
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
}[]

const pokeLoader = createAsyncThunk(
  'getPokes',
  async (ofset: number, {dispatch, getState}) => {
    const personListData: PersonList = [];

    const persons = await loadPersons(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ofset}`,
    );
    const keys = Object.keys(persons.results);
    for (let k = 0; k < keys.length; k++) {
      const person = persons.results[k];
      const shortAbilities = [];
      // eslint-disable-next-line no-await-in-loop
      const extendPersonData = await loadExtendPersonData(person.url);
      if (extendPersonData) {
        const parsedEffect: {effect: any; short_effect: any}[] = [];
        const parsedFlavor: any[] = [];
        const nodes = Object.keys(extendPersonData.abilities);
        for (let i = 0; i < nodes.length; i++) {
          const {ability} = extendPersonData.abilities[i];
          // eslint-disable-next-line no-await-in-loop
          const loadedAbility = await loadExtendAbilities(ability.url);
          if (loadedAbility) {
            loadedAbility.effectEntries.forEach((item: {effect: any, short_effect: any, language: {name: string}}) => {
              if (item.language.name === 'en') {
                const {effect, short_effect} = item;
                parsedEffect.push({effect, short_effect});
              }
            });
            loadedAbility.flavorEntries.forEach((flavor: {language: {name: string}, flavor_text: string, version_group: {name: string}}) => {
              if (flavor.language.name === 'en') {
                parsedFlavor.push(`${flavor.flavor_text  }  -  ${  flavor.version_group.name}`);
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
            front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extendPersonData.id}.png`,
            frontShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${extendPersonData.id}.png`,
            back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${extendPersonData.id}.png`,
            backShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${extendPersonData.id}.png`,
          },
        };
        personListData.push(personData);
      }
    }
    await dispatch(setPersonListData(personListData));
  },
);

export default pokeLoader;

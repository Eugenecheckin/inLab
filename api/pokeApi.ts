import axios from 'axios';

export const loadPersons = async (url: string) => {
  const {data} = await axios.get(url);
  return data;
};

export const loadExtendPersonData = async (url: string) => {
  const {data} = await axios.get(url);
  const {id, abilities, sprites} = data;
  return {id, abilities, sprites};
};

export const loadExtendAbilities = async (url: string) => {
  const {data} = await axios.get(url);
  const {effect_entries, flavor_text_entries} = data;
  return {effectEntries: effect_entries, flavorEntries: flavor_text_entries};
};

export default {
  loadPersons,
  loadExtendAbilities,
  loadExtendPersonData,
};

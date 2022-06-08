import axios from './axios';


interface IParams {
  limit: string;
  ofset: number;
}
export const loadPersons = async (params: IParams) => {
  const { data } = await axios.get('/', {params});
  return data;
};


interface IPerson {
  id: number;
}

export const loadShortPersonInfo = async (params: IPerson) => {
  const { data } = await axios.get('/', {params});
  return data;
};

export const loadPersonAbility = async (params: IPerson) => {
  const { data } = await axios.get('/ability', {params});
  return data;
};

export const loadExtendPersonData = async (url: string) => {
  const { data } = await axios.get(url);
  const { id, abilities, sprites } = data;
  return { id, abilities, sprites };
};

export const loadExtendAbilities = async (url: string) => {
  const { data } = await axios.get(url);
  const { effect_entries, flavor_text_entries } = data;
  return { effectEntries: effect_entries, flavorEntries: flavor_text_entries };
};

export default {
  loadPersons,
  loadExtendAbilities,
  loadExtendPersonData,
};

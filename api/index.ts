import axios from 'axios';

import { REMOTE_PORT } from '../config';

/**
 * @param {{
 * email: string;
 * password: string;
 * }} loginData
 */
export const postLogin = async (loginData: any) => axios.post(
  `http://localhost:${REMOTE_PORT}/auth/signin`,
  loginData,
);

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

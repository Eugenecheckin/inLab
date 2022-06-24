import { Platform } from 'react-native';

export const SERVER_HOST = (Platform.OS === 'android') ? '10.0.2.2' : 'localhost';
export const SERVER_PORT = 5000;
export const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
export const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';

export default {
  SERVER_HOST,
  SERVER_PORT,
  SERVER_URL,
  POKE_URL,
};

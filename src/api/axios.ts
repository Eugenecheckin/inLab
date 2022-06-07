import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export default customAxios;

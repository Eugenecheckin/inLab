import axios from 'axios';
import config from '../../config';

const poke = axios.create({
  baseURL: config.POKE_URL,
});

const auth = axios.create({
  baseURL: config.SERVER_URL,
});

export default {
  poke,
  auth,
};


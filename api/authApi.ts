import axios from 'axios';

import { REMOTE_PORT } from '../config';

/**
 * @param {{
 * email: string;
 * password: string;
 * }} loginData
 */
const postLogin = async (loginData: any) => axios.post(
  `http://localhost:${REMOTE_PORT}/auth/signin`,
  loginData,
);

export default postLogin;

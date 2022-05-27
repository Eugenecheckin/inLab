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
// 192.168.88.85
export default postLogin;

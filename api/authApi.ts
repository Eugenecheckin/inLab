import { Platform } from 'react-native';
import axios from 'axios';

import { REMOTE_PORT } from '../config';

// '192.168.88.85'
const host = (Platform.OS === 'android') ? '10.0.2.2' : 'localhost';
/**
 * @param {{
 * email: string;
 * password: string;
 * }} loginData
 */
const postLogin = async (loginData: any) => axios.post(
  `http://${host}:${REMOTE_PORT}/auth/signin`,
  loginData,
);

// 192.168.88.85
export default postLogin;

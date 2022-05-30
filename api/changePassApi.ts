import axios from 'axios';
import { Platform } from 'react-native';
import { REMOTE_PORT } from '../config';

const host = (Platform.OS === 'android') ? '10.0.2.2' : 'localhost';
/**
 * @param {{
 * email: string;
 * }} data
 */
export const forgotPass = async (data: {email: string}) => axios.post(
  `http://${host}:${REMOTE_PORT}/auth/forgotPass`,
  data,
  );

/**
 * @param {{
 * secret: string;
 * }} data
 */
export const confirmEmail = async (data: { secret:string }) => axios.post(
  `http://${host}:${REMOTE_PORT}/auth/confirmEmail`,
  data,
  );

  /**
 * @param {{
 * password: string;
 * secret: string;
 * }} data
 */
  export const confirmPass = async (data: { password:string, secret: string }) => axios.post(
    `http://${host}:${REMOTE_PORT}/auth/confirmPass`,
    data,
    );


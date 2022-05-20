import axios from 'axios';

import { REMOTE_PORT } from '../config';

/**
 * @param {{
 * email: string;
 * }} email
 */
export const forgotPass = async (email: string) => axios.post(
  `http://localhost:${REMOTE_PORT}/auth/forgotPass`,
  email,
  );

/**
 * @param {{
 * secret: string;
 * }} data
 */
export const confirmEmail = async (data: { secret:string }) => axios.post(
  `http://localhost:${REMOTE_PORT}/auth/confirmEmail`,
  data,
  );

  /**
 * @param {{
 * password: string;
 * secret: string;
 * }} data
 */
  export const confirmPass = async (data: { password:string, secret: string }) => axios.post(
    `http://localhost:${REMOTE_PORT}/auth/confirmPass`,
    data,
    );


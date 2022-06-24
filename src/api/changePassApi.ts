import axios from './axios';

export interface authResponce {
  message: string,
}

export const forgotPass = async (data: { email: string }) => axios.auth.post<authResponce>(
  '/auth/forgotPass',
  data,
);

export const confirmEmail = async (data: { secret: string }) => axios.auth.post<authResponce>(
  '/auth/confirmEmail',
  data,
);

export const confirmPass = async (data: { password: string, secret: string }) => axios.auth.post<authResponce>(
  '/auth/confirmPass',
  data,
);

export default {
  forgotPass,
  confirmEmail,
  confirmPass,
};

import axios from './axios';

interface ILoginData {
  email: string;
  password: string;
}

export const postSignIn = async (loginData: ILoginData) => axios.auth.post<{token: string, email: string, name: string}>(
  '/auth/signin',
  loginData,
);

export const getLogin = async (token: string) => axios.auth.post<{token:string, email: string, name: string}>(
  '/auth/login',
  {},
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);

export default {
  postSignIn,
  getLogin,
};

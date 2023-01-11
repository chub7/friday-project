import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const loginApi = {
  me() {
    return instance.post<any, { data: MeResponseType }>(`/auth/me`, {});
  },
  registration(email: string, password: string) {
    return instance.post(`/auth/register`, {email, password});
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance
        .post(`auth/login`, {email, password, rememberMe})
        .then((res) => res.data);
  },
};

export type MeResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};

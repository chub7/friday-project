import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const loginApi = {
  me() {
    return instance.post<any, MeResponseType>(`/auth/me`, {});
  },
  registration(email: string, password: string) {
    return instance.post(`/auth/register`, { email, password });
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

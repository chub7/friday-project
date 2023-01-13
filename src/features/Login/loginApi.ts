import axios, {AxiosResponse} from "axios";
import {SingInType, UserResponseType} from "../../types/types";

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const loginApi = {
  me() {
    return instance.post<any, AxiosResponse<UserResponseType>>(`/auth/me`, {});
  },
  registration(email: string, password: string) {
    return instance.post<{email: string, password: string},AxiosResponse<SingInType>>(`/auth/register`, {email, password});
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance
        .post(`auth/login`, {email, password, rememberMe})
        .then((res) => res.data);
  },
};




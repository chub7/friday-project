import axios, {AxiosResponse} from "axios";
import { instance } from "../../app/app-api";
import {SingInType, UserResponseType} from "../../common/types/types";


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




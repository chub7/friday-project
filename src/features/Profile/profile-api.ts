import axios, {AxiosResponse} from "axios";
import {BaseResponseType, ChangeNameType} from "../../types/types";

export const instance = axios.create({ 
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true, 
})

export const profileApi = {
   logOut(){
       return instance.delete<any, AxiosResponse<BaseResponseType>>('/auth/me')
   },
   changeProfileData(name:string){
       return instance.put<{ name: string }, AxiosResponse<ChangeNameType>>('/auth/me', {name})
   }
}


import axios, {AxiosResponse} from "axios";
import { instance } from "../../app/app-api";
import {BaseResponseType, ChangeNameType} from "../../types/types";


export const profileApi = {
   logOut(){
       return instance.delete<any, AxiosResponse<BaseResponseType>>('/auth/me')
   },
   changeProfileData(name:string){
       return instance.put<{ name: string }, AxiosResponse<ChangeNameType>>('/auth/me', {name})
   }
}


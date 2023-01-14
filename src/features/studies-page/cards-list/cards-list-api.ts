import axios, {AxiosResponse} from "axios";
import {GetCardOfPackResponseType} from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const cardListApi = {
    getCardsOfPack (_id: string = `63a6f5de89d9010004f8b721` ) {
        return instance.get<any, AxiosResponse<GetCardOfPackResponseType>>(`cards/card/?cardsPack_id=${_id}`)
    },

}
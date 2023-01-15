import axios, {AxiosResponse} from "axios";
import {GetPacksCardsResponseType} from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const packListApi = {
    getPacksCards () {
        return instance.get<any, AxiosResponse<GetPacksCardsResponseType>>(`cards/pack`,{
            params: { page: 1 , pageCount: 5 }
        })
    },

    createPack(){
        return instance.post(`cards/pack`,{
            cardsPack: {
                name: "MariaPack",
            }
        })
    }

}
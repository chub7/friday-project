import axios, {AxiosResponse} from "axios";
import {GetPacksCardsResponseType} from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const packListApi = {
    getPacksCards(packName: string, page: number, pageCount: number, isMyPack: string,min:number,max:number) {

        return instance.get<any, AxiosResponse<GetPacksCardsResponseType>>(`cards/pack`, {
            params: {page, pageCount, packName, user_id: isMyPack,min:min,max:max}
        })
    },

    createPack() {
        return instance.post(`cards/pack`, {
            cardsPack: {
                name: "MariaPack",
            }
        })
    }

}
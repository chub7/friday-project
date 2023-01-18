import axios, {AxiosResponse} from "axios";
import {GetPacksCardsResponseType} from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const packListApi = {
    getPacksCards(packName: string, page: number, pageCount: number, user_id: string, cardsCount: number[], sortPacks: string) {
        return instance.get<any, AxiosResponse<GetPacksCardsResponseType>>(`cards/pack`, {

            params: {page, pageCount, packName, user_id, min: cardsCount[0], max: cardsCount[1], sortPacks}
        })
    },


}
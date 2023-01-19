import axios, {AxiosResponse} from "axios";
import {AddPackResponseType, DeletePackResponseType, GetPacksCardsResponseType, UpdatePackResponseType} from "../../../common/types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const packsApi = {
    getPacksCards(packName: string, page: number, pageCount: number, user_id: string, cardsCount: number[], sortPacks: string) {
        return instance.get<any, AxiosResponse<GetPacksCardsResponseType>>(`cards/pack`, {

            params: {page, pageCount, packName, user_id, min: cardsCount[0], max: cardsCount[1], sortPacks}
        })
    },

    createPack(){
        return instance.post<any, AxiosResponse<AddPackResponseType>>(`cards/pack`,{
            cardsPack: {
                name: "New pack",
            }
        })
    },

    deletePack(id:string){
        return instance.delete<any, AxiosResponse<DeletePackResponseType>>(`cards/pack?id=${id}`)
    },

    changePackName(id: string) {
        return instance.put<any, AxiosResponse<UpdatePackResponseType>>(`cards/pack`, {
            cardsPack: {
                name: "Refactor name",
                _id:id
            }
        })
    }

}

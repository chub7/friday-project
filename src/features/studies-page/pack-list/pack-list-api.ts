import axios, {AxiosResponse} from "axios";
import {AddPackResponseType, DeletePackResponseType, GetPacksCardsResponseType, UpdatePackResponseType} from "../../../types/types";

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
                name: "New name",
                _id:id
            }
        })
    }

}

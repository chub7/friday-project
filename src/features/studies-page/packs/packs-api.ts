import {AxiosResponse} from "axios";
import {instance} from "../../../app/app-api";
import {
    AddPackResponseType,
    DeletePackResponseType,
    FilterParamsPack,
    GetPacksCardsResponseType,
    UpdatePackResponseType
} from "../../../common/types/types";


export const packsApi = {
    getPacksCards(packList: FilterParamsPack) {
        return instance.get<any, AxiosResponse<GetPacksCardsResponseType>>(`cards/pack`, {
            params: {...packList}
        })
    },
    createPack(){
        return instance.post<any, AxiosResponse<AddPackResponseType>>(`cards/pack`,{
            cardsPack: {name: "New pack",}
        })
    },
    deletePack(id:string | undefined){
        return instance.delete<any, AxiosResponse<DeletePackResponseType>>(`cards/pack?id=${id}`)
    },
    changePackName(id: string | undefined) {
        return instance.put<any, AxiosResponse<UpdatePackResponseType>>(`cards/pack`, {
            cardsPack: {name: "Refactor name", _id:id}
        })
    }
}

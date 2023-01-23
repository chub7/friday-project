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
    createPack(name:string ,isPrivatePack: boolean){
        return instance.post<any, AxiosResponse<AddPackResponseType>>(`cards/pack`,{
            cardsPack: {name, private: isPrivatePack}
        })
    },
    deletePack(id:string | undefined){
        return instance.delete<any, AxiosResponse<DeletePackResponseType>>(`cards/pack?id=${id}`)
    },
    changePackName(id: string | undefined, name :string, isPrivate:boolean) {
        return instance.put<any, AxiosResponse<UpdatePackResponseType>>(`cards/pack`, {
            cardsPack: {name: name, _id:id, private: isPrivate}
        })
    }
}

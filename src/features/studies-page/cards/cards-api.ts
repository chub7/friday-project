import { AxiosResponse } from "axios";
import { instance } from "../../../app/app-api";
import {
    AddCardResponseType,
    DeleteCardResponseType,
    GetCardOfPackResponseType,
    UpdateCardResponseType
} from "../../../common/types/types";


export const cardListApi = {

    getCardsOfPack(cardsPack_id: string = `63a6f5de89d9010004f8b721`, page: number, pageCount: number, sortCards: string,cardQuestion:string) {

        return instance.get<any, AxiosResponse<GetCardOfPackResponseType>>(`cards/card`, {
            params: {cardsPack_id, page, pageCount, sortCards,cardQuestion}
        })
    },

    createCard(_id: string | undefined) {
        return instance.post<any, AxiosResponse<AddCardResponseType>>(`cards/card`, {
            card: {
                cardsPack_id: _id,
                question: "new card",
                answer: "no answer",
                grade: 2,
                shots: 0,
                answerImg: "url or base 64",
                questionImg: "url or base 64",
                questionVideo: "url or base 64",
                answerVideo: "url or base 64"
            }})},

    updateCardName(_id: string) {
        return instance.put<any, AxiosResponse<UpdateCardResponseType>>(`cards/card`, {
            card: {
                _id,
                question: "new questiow"
            }
        })
    },

    deleteCard(_id: string) {
        return instance.delete<any, AxiosResponse<DeleteCardResponseType>>(`cards/card?id=${_id}`)
    }

}


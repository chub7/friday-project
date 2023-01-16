import axios, { AxiosResponse } from "axios";
import { AddCardResponseType, CardType, DeleteCardResponseType, GetCardOfPackResponseType, UpdateCardResponseType } from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const cardListApi = {
    getCardsOfPack(_id: string = `63a6f5de89d9010004f8b721`) {
        return instance.get<any, AxiosResponse<GetCardOfPackResponseType>>(`cards/card/?cardsPack_id=${_id}`)
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
            }

        })

    },

    updateCardName(_id: string) {
        return instance.put<any, AxiosResponse<UpdateCardResponseType>>(`cards/card`, {
            card: {
                _id,
                question: "new question"
            }
        })
    },

    deleteCard(_id: string) {
        return instance.delete<any, AxiosResponse<DeleteCardResponseType>>(`cards/card?id=${_id}`)
    }

}


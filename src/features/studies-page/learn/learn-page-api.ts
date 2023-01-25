import { AxiosResponse } from "axios";
import { instance } from "../../../app/app-api";
import {
    AddCardResponseType,
    DeleteCardResponseType,
    GetCardOfPackResponseType,
    UpdateCardResponseType
} from "../../../common/types/types";


export const cardForLearnApi = {

    getCardsOfPack(cardsPack_id: string | undefined) {

        return instance.get(`cards/card`, {
            params: {
                cardsPack_id,
                pageCount: 100
            }
        })
    },
    setCardGrade(grade: number, card_id: string) {
        return instance.put(`cards/grade`, {
            grade,
            card_id
        })
    }
}
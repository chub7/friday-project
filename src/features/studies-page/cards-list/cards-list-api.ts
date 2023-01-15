import axios, {AxiosResponse} from "axios";
import {GetCardOfPackResponseType} from "../../../types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});


export const cardListApi = {
    getCardsOfPack (_id: string = `63a6f5de89d9010004f8b721` ) {
        return instance.get<any, AxiosResponse<GetCardOfPackResponseType>>(`cards/card/?cardsPack_id=${_id}`)
    },
    createCard(){
        return instance.post(`cards/card`,{
            card: {
                cardsPack_id: "63c3ba56bbf2ab12e09c45f8",
                question: "card 1",
                answer: "no answer",
                grade: 2,
                shots: 0 ,
                answerImg: "url or base 64",
                questionImg: "url or base 64",
                questionVideo: "url or base 64",
                answerVideo: "url or base 64"
            }

        })

    }

}
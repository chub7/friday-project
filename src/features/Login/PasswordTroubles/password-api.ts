import axios, {AxiosResponse} from "axios"
import {BaseResponseType} from "../../../types/types";
import {instance} from "../../../app/app-api";



export const passwordApi = {
    getInstruction(email: string) {
        const data = {
            email: email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
    password recovery link: 
    <a href='http://localhost:3000/friday-project#/newpass/$token$'>
    link</a>
    </div>`
        }
        return instance.post<any, AxiosResponse<BaseResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', { ...data })
    },
    setNewPassword(password: string, token: string | undefined) {
        const data = {
            password:password,
            resetPasswordToken: token
        }
        return instance.post<any, AxiosResponse<BaseResponseType>>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', { ...data })
    }
}

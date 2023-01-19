import axios, {AxiosResponse} from "axios"
import {BaseResponseType} from "../../../common/types/types";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

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
        return axios.post<any, AxiosResponse<BaseResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', { ...data })
    },
    setNewPassword(password: string, token: string | undefined) {
        const data = {
            password:password,
            resetPasswordToken: token
        }
        return axios.post<any, AxiosResponse<BaseResponseType>>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', { ...data })
    }
}

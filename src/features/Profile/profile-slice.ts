import {AnyAction, createSlice, Dispatch} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import { profileApi } from "./profileApi";

export type ProfileDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}
export type initialStateType = {
    isLoggedIn: boolean
    profileData: ProfileDataType
}
const initialState = {
isLoggedIn: false,
profileData:{
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод
    created: Date,
    updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
}
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action){
            state.isLoggedIn = action.payload.status
        },
        setProfileData(state,action){
            state.profileData = {...action.payload.data}
        },
        setNewName(state,action){
            state.profileData.name = action.payload.name
        }
    }

})

export const profileSlice = slice.reducer


export const {setIsLoggedIn,setProfileData,setNewName} = slice.actions

export const authMeThunk = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        let res = await profileApi.me()
        dispatch(setIsLoggedIn({status:true}))
        dispatch(setProfileData({data:res.data}))
        console.log(res.data)
    } catch (e) {
        console.log(e)
    } finally {

    }
}

export const registarationThunk = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        let res = await profileApi.registration()
        console.log(res)
    } catch (e) {
        console.log(e)
    } finally {

    }
}

export const loginThunk = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        let res = await profileApi.login()
        console.log(res)
    } catch (e) {
        console.log(e)
    } finally {

    }
}

export const logOutThunk = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        let res = await profileApi.logOut()
        dispatch(setIsLoggedIn({status:false}))
        console.log(res)
    } catch (e) {
        console.log(e)
    } finally {

    }
}
export const changeNameThunk = (name:string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        let res = await profileApi.changeProfileData(name)
        dispatch(setNewName({name:name}))
        console.log(res)
    } catch (e) {
        console.log(e)
    } finally {

    }
}



export type AppActionsType = any

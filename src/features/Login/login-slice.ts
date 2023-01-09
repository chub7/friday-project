import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi} from "./loginApi";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../../app/store";
import {setProfile} from "../Profile/profile-slice";


type singUpData = {
    error: string | null
}


type loginType = {
    email: string
    password: string
    rememberMe: boolean
}


type TypeInitialState = {
    error: string | null
    isInProgress: boolean
}

const initialState: TypeInitialState = {
    isInProgress: false,
    error: null
}


const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setInProgressStatus: (state: TypeInitialState, action: PayloadAction<boolean>) => {
            state.isInProgress = action.payload
        },
        setErrorSingUp: (state: TypeInitialState, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }

    }

})

export const loginSlice = slice.reducer
export const {setInProgressStatus, setErrorSingUp} = slice.actions

export const singUp = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setErrorSingUp(null))
    dispatch(setInProgressStatus(true))
    try {
        await loginApi.registration(email, password)
        return Promise.resolve(`success`)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const finalError = (error as AxiosError<{ error: string }>).response?.data.error || error.message
            dispatch(setErrorSingUp(finalError))
        }
    } finally {
        dispatch(setInProgressStatus(false))
    }
}

export const signInThunk = (data: loginType, setStatus: any) => async (dispatch: AppDispatch) => {
    const {email, password, rememberMe} = data

    dispatch(setInProgressStatus(true))
    try {

        const data = await loginApi.login(email, password, rememberMe)
        dispatch(setProfile({profile: data}))

    } catch (error: any) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            const finalError = (error as AxiosError<{ error: string }>).response?.data.error || error.message
            setStatus({message: finalError})
            dispatch(setErrorSingUp(finalError))
        }

    } finally {
        dispatch(setInProgressStatus(false))

    }

}

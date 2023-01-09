import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi} from "./loginApi";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../../app/store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResultSignUpType = false | 'Created'
type isAuthType = {
    status: boolean,
    error: string | null
}
type singUpData = {
    error: string | null
    isInProgress: boolean
    result: ResultSignUpType

}
type TypeInitialState = {
    singUp: singUpData
    isAuth: isAuthType
    appStatus: RequestStatusType
}

const slice = createSlice({
    name: 'login',
    initialState: {
        singUp: {
            error: null,
            isInProgress: false,
            result: false
        },
        isAuth: {
            status: false,
            error: null
        },
        appStatus: 'idle'

    } as TypeInitialState,
    reducers: {
        setAppStatus: (state:TypeInitialState,action: PayloadAction<RequestStatusType>)=>{
            state.appStatus = action.payload
        },
        authorization: (state: TypeInitialState, action: PayloadAction<boolean>) => {
            state.isAuth.status = action.payload
        },
        authorizationError: (state: TypeInitialState, action: PayloadAction<string | null>) => {
            state.isAuth.error = action.payload
        },
        registration: (state: TypeInitialState, action: PayloadAction<ResultSignUpType>) => {
            state.singUp.result = action.payload
        },
        setInProgressStatus: (state: TypeInitialState, action: PayloadAction<boolean>) => {
            state.singUp.isInProgress = action.payload
        },
        setErrorSingUp: (state: TypeInitialState, action: PayloadAction<string | null>) => {
            state.singUp.error = action.payload
        }

    }

})

export const loginSlice = slice.reducer
const {actions} = slice;
export const {setInProgressStatus, setErrorSingUp,authorization,setAppStatus,registration,authorizationError} = actions

export const singUp = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(registration(false))
    dispatch(setErrorSingUp(null))
    dispatch(setInProgressStatus(true))
    try {
       const res = await loginApi.registration(email, password)
       dispatch(registration('Created'))

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const finalError = (error as AxiosError<{ error: string }>).response?.data.error || error.message
            dispatch(setErrorSingUp(finalError))
            alert(finalError)
        }
    } finally {
        dispatch(setInProgressStatus(false))
    }
}
export const authMe = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        let res = await loginApi.me()
        dispatch(authorization(true))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const finalError = (error as AxiosError<{ error: string }>).response?.data.error || error.message
            dispatch(authorizationError(finalError))
            dispatch(authorization(false))
        }


    } finally {
        dispatch(setAppStatus('idle'))
    }
}



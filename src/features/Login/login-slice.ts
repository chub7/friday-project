import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi, MeResponseType} from "./loginApi";
import axios, {AxiosError} from "axios";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {setProfile} from "../Profile/profile-slice";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResultSignUpType = false | 'Created'
type isAuthType = {
    meData: MeResponseType | null
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

const initialState: TypeInitialState = {
    singUp: {
        error: null,
        isInProgress: false,
        result: false
    },
    isAuth: {
        meData: null,
        status: false,
        error: null
    },
    appStatus: 'idle'
}



const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAppStatus: (state:TypeInitialState,action: PayloadAction<RequestStatusType>)=>{
            state.appStatus = action.payload
        },
        setMeData: (state: TypeInitialState, action: PayloadAction<MeResponseType>) => {
            state.isAuth.meData = action.payload
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
export const {setInProgressStatus, setErrorSingUp,authorization,
    setAppStatus,registration,authorizationError,setMeData} =slice.actions

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

export const signInThunk = (email: string, password: string, rememberMe: boolean, setStatus: any) => async (dispatch: AppDispatch) => {

    dispatch(setInProgressStatus(true))
    try {

        const data = await loginApi.login(email, password, rememberMe)
        dispatch(setProfile({profile: data}))

    } catch (error: any) {

        if (axios.isAxiosError(error)) {
            const finalError = (error as AxiosError<{ error: string }>).response?.data.error || error.message
            setStatus({message: finalError})
            /* dispatch(setErrorSingUp(finalError))*/
        }

    } finally {
        dispatch(setInProgressStatus(false))
    }

}



export const authMe = () => async (dispatch: AppDispatch, getState:  ()=> AppRootStateType) => {
    const meData = getState().login.isAuth.meData
    dispatch(setAppStatus('loading'))
    try {
        let res = await loginApi.me()
        dispatch(authorization(true))
        if (!meData) { dispatch(setMeData(res)) }

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



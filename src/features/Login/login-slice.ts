import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi} from "./loginApi";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../../app/store";


type singUpData = {
    error: string | null
}
type TypeInitialState = {
    singUp: singUpData
    isInProgress: boolean
    isAuth: false
}


const slice = createSlice({
    name: 'login',
    initialState: {
        isInProgress: false,
        singUp: {
            error: null
        }
    } as TypeInitialState,
    reducers: {
        setInProgressStatus: (state: TypeInitialState, action: PayloadAction<boolean>) => {
            state.isInProgress = action.payload
        },
        setErrorSingUp: (state: TypeInitialState, action: PayloadAction<string | null>) => {
            state.singUp.error = action.payload
        }

    }

})

export const loginSlice = slice.reducer
const {actions} = slice;
export const {setInProgressStatus, setErrorSingUp} = actions

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



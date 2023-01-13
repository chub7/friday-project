import axios from "axios";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


export const handleServerAppError = (error: any,
                                     dispatch: Dispatch,
                                     setError: ActionCreatorWithPayload<{ error: string | null }>) => {
    if (axios.isAxiosError(error)) {
        const finalError =
            (error as AxiosError<{ error: string }>).response?.data.error ||
            error.message;
        dispatch(setError({error: finalError}))
    } else {
        dispatch(setError({error: 'Some error occurred'}))

    }
}
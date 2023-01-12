import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi} from "./loginApi";
import {AppDispatch} from "../../app/store";
import {setProfile} from "../Profile/profile-slice";
import {setIsAuth} from "../../app/app-slice";
import {handleServerAppError} from "../../utils/AxiosError/handleServerAppError";

export type ResultSignUpType = false | "Created";

type TypeInitialState = {
    error: string | null;
    isInProgress: boolean;
    result: ResultSignUpType;
};

const initialState: TypeInitialState = {
    error: null,
    isInProgress: false,
    result: false,
};

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        registration: (state: TypeInitialState, action: PayloadAction<ResultSignUpType>) => {
            state.result = action.payload;
        },
        setInProgressStatus: (state: TypeInitialState, action: PayloadAction<boolean>) => {
            state.isInProgress = action.payload;
        },
        setErrorSingUp: (state: TypeInitialState, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
    },

});

export const loginSlice = slice.reducer;
export const {setInProgressStatus, setErrorSingUp, registration} = slice.actions;

export const singUp = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(registration(false));
    /* dispatch(setErrorSingUp({error: null}));*/
    dispatch(setInProgressStatus(true));
    try {
        await loginApi.registration(email, password);
        dispatch(registration("Created"));

    } catch (error) {
        handleServerAppError(error, dispatch, setErrorSingUp)
    } finally {
        dispatch(setInProgressStatus(false));
    }
};

export const signInThunk = (email: string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) => {

    dispatch(setInProgressStatus(true));

    try {
        const data = await loginApi.login(email, password, rememberMe);
        dispatch(setProfile({profile: data}));
        dispatch(setIsAuth({isAuthStatus: true}));

    } catch (error) {

        handleServerAppError(error, dispatch, setErrorSingUp)

    } finally {
        dispatch(setInProgressStatus(false));
    }
};

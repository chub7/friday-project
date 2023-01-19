import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi} from "./login-api";
import {TypedThunk} from "../../app/store";
import {clearProfileData, setError, setProfile} from "../profile/profile-slice";
import {setIsAppInProgress, setIsAuth} from "../../app/app-slice";
import {handleServerAppError} from "../../common/utils/handling-response-error/handleServerAppError";
import {profileApi} from "../profile/profile-api";

export type ResultSignUpType = false | "Created";

type TypeInitialState = {
    error: string | null;
    isInProgress: boolean;
    result: ResultSignUpType;
    success:string
};

const initialState: TypeInitialState = {
    error: null,
    isInProgress: false,
    result: false,
    success:''
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
        setSuccessLogin(state, action: PayloadAction<{ success: string }>) {
            state.success = action.payload.success
        },
    },

});

export const loginSlice = slice.reducer;
export const {setInProgressStatus, setErrorSingUp, registration,setSuccessLogin} = slice.actions;

export const singUp = (email: string, password: string) : TypedThunk =>
    async (dispatch) => {
    dispatch(registration(false));
    dispatch(setInProgressStatus(true));
    try {
        await loginApi.registration(email, password);
        dispatch(registration("Created"));
        dispatch(setSuccessLogin({success:'You  successfully sign up'}))

    } catch (error) {
        handleServerAppError(error, dispatch, setErrorSingUp)
    } finally {
        dispatch(setInProgressStatus(false));
    }
};

export const signInThunk = (email: string, password: string, rememberMe: boolean) : TypedThunk =>
    async (dispatch) => {
    dispatch(setInProgressStatus(true));
    try {
        const data = await loginApi.login(email, password, rememberMe);
        dispatch(setProfile({profile: data}));
        dispatch(setIsAuth({isAuthStatus: true}));
        dispatch(setSuccessLogin({success:'You  successfully logged in'}))

    } catch (error) {
        handleServerAppError(error, dispatch, setErrorSingUp)
    } finally {
        dispatch(setInProgressStatus(false));
    }
};

export const logOutThunk = (): TypedThunk => async (dispatch) => {
    dispatch(setIsAppInProgress({ appStatus: true }));
    try {
        await profileApi.logOut();
        dispatch(setIsAuth({ isAuthStatus: false }));
        dispatch(clearProfileData())
        dispatch(setSuccessLogin({ success: 'You successfully logged out' }))
    } catch (e) {
        handleServerAppError(e, dispatch, setError)
    } finally {
        dispatch(setIsAppInProgress({ appStatus: false }));
    }
};



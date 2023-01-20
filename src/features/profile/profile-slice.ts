import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {profileApi} from "./profile-api";
import {TypedThunk} from "../../app/store";
import {handleServerAppError} from "../../common/utils/handling-response-error/handleServerAppError";

export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
};
type TypeInitialState = {
    profile: ProfileType;
    successStatusForSnackBar: string
    errorForSnackBar: string | null
    isLoading: boolean
};
const initialState: TypeInitialState = {
    profile: {} as ProfileType,
    successStatusForSnackBar: '',
    errorForSnackBar: null,
    isLoading: false

};
const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setNewName(state, action: PayloadAction<{ name: string }>) {
            state.profile.name = action.payload.name;
        },
        setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
            state.profile = action.payload.profile;
        },
        clearProfileData: (state) => {
            state.profile = {} as ProfileType;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.errorForSnackBar = action.payload.error
        },
        setSuccessStatusForSnackBar(state, action: PayloadAction<{ success: string }>) {
            state.successStatusForSnackBar = action.payload.success
        },
        setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        }
    },
});

export const profileSlice = slice.reducer;
export const { setProfile, setNewName, clearProfileData, setError, setSuccessStatusForSnackBar, setIsLoading } = slice.actions;


/*export const logOutThunk = (): TypedThunk => async (dispatch) => {
    dispatch(setIsAppInProgress({ appStatus: true }));
    try {
        await profileApi.logOut();
        dispatch(setIsAuth({ isAuthStatus: false }));
        dispatch(clearProfileData())
        dispatch(setSuccessStatusForSnackBar({ success: 'you successfully logged out' }))
    } catch (e) {
        handleServerAppError(e, dispatch, setError)
    } finally {
        dispatch(setIsAppInProgress({ appStatus: false }));
    }
};*/
export const changeProfileDataThunk =
    (name: string): TypedThunk => async (dispatch) => {
        dispatch(setIsLoading({isLoading:true}))
        try {
            let res = await profileApi.changeProfileData(name);
            dispatch(setNewName({ name: res.data.updatedUser.name }));
            dispatch(setSuccessStatusForSnackBar({ success: 'Name was changed successfully' }))
        } catch (e) {
            handleServerAppError(e, dispatch, setError)
        } finally {
            dispatch(setIsLoading({isLoading:false}))
        }
    };


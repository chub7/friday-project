import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {profileApi} from "./profile-api";
import {setIsAppInProgress, setIsAuth} from "../../app/app-slice";
import {TypedThunk} from "../../app/store";

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
} ;
type TypeInitialState = {
    profile: ProfileType;
};
const initialState: TypeInitialState = {
    profile: {} as ProfileType,
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
    },
});

export const profileSlice = slice.reducer;
export const {setProfile, setNewName, clearProfileData} = slice.actions;


export const logOutThunk = (): TypedThunk => async (dispatch) => {
    dispatch(setIsAppInProgress({appStatus: true}));
    try {
        await profileApi.logOut();
        dispatch(setIsAuth({isAuthStatus: false}));
        dispatch(clearProfileData())
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsAppInProgress({appStatus: false}));
    }
};
export const changeProfileDataThunk =
    (name: string): TypedThunk => async (dispatch) => {
        try {
            let res = await profileApi.changeProfileData(name);
            dispatch(setNewName({name: res.data.updatedUser.name}));
        } catch (e) {
            console.log(e);
        } finally {
        }
    };

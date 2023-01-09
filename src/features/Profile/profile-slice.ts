import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";

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

}
type TypeInitialState = {
    profile: ProfileType | null
}
const initialState: TypeInitialState = {
    profile: null
}
const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{profile:ProfileType}>) => {
            state.profile = action.payload.profile
        },
    }

})

export const profileSlice = slice.reducer
export const {setProfile} = slice.actions


export const thunk = () => async (dispatch: any) => {

    try {

    } catch (e) {


    } finally {

    }
}


export type AppActionsType = any

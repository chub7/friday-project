import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {appSlice} from "./app-slice";
import {loginSlice} from "../features/Login/login-slice";
import {profileSlice} from "../features/Profile/profile-slice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        login: loginSlice,
        profile: profileSlice
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()




// @ts-ignore
window.store = store;

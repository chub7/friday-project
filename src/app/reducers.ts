import {combineReducers} from "@reduxjs/toolkit";
import {appSlice} from "./app-slice";
import {loginSlice} from "../features/Login/login-slice";
import {profileSlice} from "../features/Profile/profile-slice";
import {passwordSlice} from "../features/Login/PasswordTroubles/password-slice";

export const rootReducer = combineReducers({
    app: appSlice,
    login: loginSlice,
    profile: profileSlice,
    passwordData: passwordSlice
})

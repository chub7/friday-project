import {combineReducers} from "@reduxjs/toolkit";
import {appSlice} from "./app-slice";
import {loginSlice} from "../features/Login/login-slice";
import {profileSlice} from "../features/Profile/profile-slice";
import {passwordSlice} from "../features/Login/PasswordTroubles/password-slice";
import {packListSlice} from "../features/studies-page/pack-list/pack-slice";
import {cardsList} from "../features/studies-page/cards-list/cards-slice";

export const rootReducer = combineReducers({
    app: appSlice,
    login: loginSlice,
    profile: profileSlice,
    passwordData: passwordSlice,
    packList: packListSlice,
    cardList: cardsList
})

import {combineReducers} from "@reduxjs/toolkit";
import {appSlice} from "./app-slice";
import {loginSlice} from "../features/login/login-slice";
import {profileSlice} from "../features/profile/profile-slice";
import {passwordSlice} from "../features/login/password-troubles/password-slice";
import {packListSlice} from "../features/studies-page/packs/packs-slice";
import {cardsList} from "../features/studies-page/cards/cards-slice";
import { learnPage } from "../features/studies-page/learn/learn-page-slice";

export const rootReducer = combineReducers({
    app: appSlice,
    login: loginSlice,
    profile: profileSlice,
    passwordData: passwordSlice,
    packList: packListSlice,
    cardList: cardsList,
    learnPage: learnPage 
})

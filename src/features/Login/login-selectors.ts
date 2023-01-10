import {AppRootStateType} from "../../app/store";
import {RequestStatusType, ResultSignUpType} from "./login-slice";


export const isInProgressSelector = (state:AppRootStateType) : boolean => state.login.singUp.isInProgress
export const isAuthSelector = (state:AppRootStateType) : boolean => state.login.isAuth.status
export const appStatusSelector = (state:AppRootStateType) : RequestStatusType => state.login.appStatus
export const signUpResultSelector = (state:AppRootStateType) : ResultSignUpType => state.login.singUp.result
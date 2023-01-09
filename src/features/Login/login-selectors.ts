import {AppRootStateType} from "../../app/store";

export const isInProgressSelector = (state:AppRootStateType) : boolean => state.login.isInProgress
export const isAuthSelector = (state:AppRootStateType) : boolean => state.login.isAuth
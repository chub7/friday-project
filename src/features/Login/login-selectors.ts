import {AppRootStateType} from "../../app/store";

export const isProgressSelector = (state: AppRootStateType): boolean => state.login.isInProgress
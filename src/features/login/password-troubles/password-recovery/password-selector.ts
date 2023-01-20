import {AppRootStateType} from "../../../../app/store";

export const passwordLoadingSelector = (state: AppRootStateType):boolean=> state.passwordData.isLoading
export const passwordErrorSelector = (state: AppRootStateType):string|null=> state.passwordData.error
export const getEmailSelector= (state: AppRootStateType):string|null=> state.passwordData.email
export const isSuccessPasswordSelector= (state: AppRootStateType):boolean=> state.passwordData.isSuccess
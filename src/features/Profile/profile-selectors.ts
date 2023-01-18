import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./profile-slice";

export const getProfileSelector = (state: AppRootStateType): ProfileType  => state.profile.profile
export const getProfileAvatarSelector = (state: AppRootStateType): string | undefined  => state.profile.profile.avatar
export const getProfileEmailSelector = (state: AppRootStateType): string | undefined  => state.profile.profile.email
export const getProfileNameSelector = (state: AppRootStateType): string  => state.profile.profile.name
export const getAvatarSelector = (state: AppRootStateType): string | undefined  => state.profile.profile.avatar
export const getMyIdSelector = (state: AppRootStateType): string  => state.profile.profile._id
export const getErrorSelector = (state: AppRootStateType): string | null  => state.profile.errorForSnackBar
export const successStatusForSnackBarSelector = (state : AppRootStateType) => state.profile.successStatusForSnackBar
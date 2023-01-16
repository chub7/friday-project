import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./profile-slice";

export const getProfileSelector = (state: AppRootStateType): ProfileType  => state.profile.profile
export const getProfileNameSelector = (state: AppRootStateType): string  => state.profile.profile.name
export const getAvatarSelector = (state: AppRootStateType): string | undefined  => state.profile.profile.avatar